import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { 
  Athlete, 
  WorkoutRoutine, 
  LiveActivityFeedItem, 
  ChatMessage,
  WorkoutLogSession
} from '../types';
import { 
  INITIAL_ATHLETES, 
  MASTER_ROUTINE_TEMPLATES,
  INITIAL_LIVE_FEED,
  INITIAL_WORKOUT_LOGS
} from '../data/mockData';

// Local storage keys for resilient offline-first caching
const STORAGE_KEYS = {
  ATHLETES: 'personal_coach_athletes_v2',
  TEMPLATES: 'personal_coach_templates_v2',
  FEED: 'personal_coach_feed_v2',
  CHAT: 'personal_coach_chat_v2',
  WORKOUT_LOGS: 'personal_coach_logs_v2'
};

export interface WorkoutLogItem {
  id: string;
  athlete_id: string;
  athlete_name: string;
  routine_id?: string;
  routine_title: string;
  split_index: number;
  split_name: string;
  total_volume_kg: number;
  exercises_data: any;
  completed_at: string;
}

// -----------------------------------------------------------------------------
// 1. ATHLETES CRM
// -----------------------------------------------------------------------------
export async function fetchAthletes(): Promise<Athlete[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('athletes').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped: Athlete[] = data.map(d => ({
          id: d.id,
          name: d.name,
          email: d.email || '',
          avatar: d.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          status: d.status || 'active',
          currentWorkoutPlan: d.current_workout_plan || 'Protocollo Forza',
          weightKg: Number(d.weight_kg) || 75,
          bodyFatPercent: d.body_fat_percent ? Number(d.body_fat_percent) : undefined,
          goals: d.goals || '',
          athleticLevel: d.athletic_level || 1,
          currentXp: d.current_xp || 0,
          nextLevelXp: d.next_level_xp || 1000,
          joinedDate: d.joined_date || 'Oggi',
          complianceRate: d.compliance_rate || 100,
          phone: d.phone || (d.id === 'ath-1' ? '+39 340 9876543' : d.id === 'ath-2' ? '+39 333 4455667' : '+39 338 5544332'),
          lastWorkoutDaysAgo: d.last_workout_days_ago !== undefined && d.last_workout_days_ago !== null ? d.last_workout_days_ago : (d.id === 'ath-2' || d.name?.includes('Sofia') ? 5 : 0),
          defaultRestSeconds: d.default_rest_seconds || 90,
          assignedRoutine: d.assigned_routine || undefined,
          bodyCompositionHistory: d.body_composition_history || []
        }));
        localStorage.setItem(STORAGE_KEYS.ATHLETES, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetchAthletes error, fallback to cache:', e);
    }
  }

  // Fallback to localStorage or INITIAL_ATHLETES
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.ATHLETES);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }
  return INITIAL_ATHLETES;
}

export async function upsertAthlete(athlete: Athlete): Promise<void> {
  // Update local cache immediately
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.ATHLETES);
      const list: Athlete[] = cached ? JSON.parse(cached) : INITIAL_ATHLETES;
      const idx = list.findIndex(a => a.id === athlete.id);
      if (idx >= 0) list[idx] = athlete;
      else list.unshift(athlete);
      localStorage.setItem(STORAGE_KEYS.ATHLETES, JSON.stringify(list));
    } catch {}
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('athletes').upsert({
        id: athlete.id,
        name: athlete.name,
        email: athlete.email,
        avatar: athlete.avatar,
        status: athlete.status,
        current_workout_plan: athlete.currentWorkoutPlan,
        weight_kg: athlete.weightKg,
        body_fat_percent: athlete.bodyFatPercent,
        goals: athlete.goals,
        athletic_level: athlete.athleticLevel || 1,
        current_xp: athlete.currentXp || 0,
        next_level_xp: athlete.nextLevelXp || 1000,
        joined_date: athlete.joinedDate,
        compliance_rate: athlete.complianceRate,
        last_workout_days_ago: athlete.lastWorkoutDaysAgo,
        default_rest_seconds: athlete.defaultRestSeconds || 90,
        assigned_routine: athlete.assignedRoutine,
        body_composition_history: athlete.bodyCompositionHistory || [],
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Supabase upsertAthlete error:', e);
    }
  }
}

// -----------------------------------------------------------------------------
// 2. MASTER ROUTINES / TEMPLATES
// -----------------------------------------------------------------------------
export async function fetchMasterTemplates(): Promise<WorkoutRoutine[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('workout_routines').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped: WorkoutRoutine[] = data.map(d => ({
          id: d.id,
          title: d.title,
          category: d.category,
          targetGender: d.target_gender,
          targetGoal: d.target_goal,
          difficultyLevel: d.difficulty_level,
          estimatedMinutes: d.estimated_minutes,
          weeklyFrequency: d.weekly_frequency,
          splits: d.splits || [],
          exercises: d.splits?.[0]?.exercises || []
        }));
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetchMasterTemplates error, fallback to cache:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }
  return MASTER_ROUTINE_TEMPLATES;
}

export async function upsertMasterTemplate(routine: WorkoutRoutine): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      const list: WorkoutRoutine[] = cached ? JSON.parse(cached) : MASTER_ROUTINE_TEMPLATES;
      const idx = list.findIndex(r => r.id === routine.id);
      if (idx >= 0) list[idx] = routine;
      else list.unshift(routine);
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(list));
    } catch {}
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('workout_routines').upsert({
        id: routine.id,
        title: routine.title,
        category: routine.category,
        target_gender: routine.targetGender,
        target_goal: routine.targetGoal,
        difficulty_level: routine.difficultyLevel,
        estimated_minutes: routine.estimatedMinutes,
        weekly_frequency: routine.weeklyFrequency,
        splits: routine.splits || [],
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Supabase upsertMasterTemplate error:', e);
    }
  }
}

// -----------------------------------------------------------------------------
// 3. WORKOUT LOGS & REALTIME SESSIONS
// -----------------------------------------------------------------------------
export async function fetchWorkoutLogs(athleteId?: string): Promise<WorkoutLogSession[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('workout_logs').select('*').order('completed_at', { ascending: false });
      if (athleteId) {
        query = query.eq('athlete_id', athleteId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const mapped: WorkoutLogSession[] = data.map(d => ({
          id: d.id,
          athleteId: d.athlete_id,
          athleteName: d.athlete_name,
          routineId: d.routine_id,
          routineTitle: d.routine_title,
          splitIndex: d.split_index,
          splitName: d.split_name,
          totalVolumeKg: Number(d.total_volume_kg) || 0,
          durationMinutes: d.duration_minutes || 50,
          exercisesData: d.exercises_data || [],
          completedAt: d.completed_at || d.created_at
        }));
        
        localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetchWorkoutLogs error, fallback to cache:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
    if (cached) {
      try {
        const parsed: WorkoutLogSession[] = JSON.parse(cached);
        if (athleteId) {
          const filtered = parsed.filter(p => p.athleteId === athleteId);
          if (filtered.length > 0) return filtered;
        } else if (parsed.length > 0) {
          return parsed;
        }
      } catch {}
    }
  }

  if (athleteId) {
    return INITIAL_WORKOUT_LOGS.filter(l => l.athleteId === athleteId);
  }
  return INITIAL_WORKOUT_LOGS;
}

export async function saveWorkoutLog(log: WorkoutLogSession | WorkoutLogItem): Promise<void> {
  const normalizedSession: WorkoutLogSession = 'athleteId' in log ? log : {
    id: log.id,
    athleteId: log.athlete_id,
    athleteName: log.athlete_name,
    routineId: log.routine_id,
    routineTitle: log.routine_title,
    splitIndex: log.split_index,
    splitName: log.split_name,
    totalVolumeKg: log.total_volume_kg,
    durationMinutes: 50,
    exercisesData: log.exercises_data,
    completedAt: log.completed_at
  };

  // Update local cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
      const list: WorkoutLogSession[] = cached ? JSON.parse(cached) : [...INITIAL_WORKOUT_LOGS];
      list.unshift(normalizedSession);
      localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(list));
    } catch {}
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('workout_logs').insert([{
        id: normalizedSession.id,
        athlete_id: normalizedSession.athleteId,
        athlete_name: normalizedSession.athleteName,
        routine_id: normalizedSession.routineId,
        routine_title: normalizedSession.routineTitle,
        split_index: normalizedSession.splitIndex,
        split_name: normalizedSession.splitName,
        total_volume_kg: normalizedSession.totalVolumeKg,
        exercises_data: normalizedSession.exercisesData,
        completed_at: normalizedSession.completedAt
      }]);
    } catch (e) {
      console.warn('Supabase saveWorkoutLog error:', e);
    }
  }
}

// -----------------------------------------------------------------------------
// 4. LIVE FEED & CHAT
// -----------------------------------------------------------------------------
export async function fetchFeedItems(): Promise<LiveActivityFeedItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('live_feed').select('*').order('created_at', { ascending: false }).limit(40);
      if (!error && data && data.length > 0) {
        const mapped: LiveActivityFeedItem[] = data.map(d => ({
          id: d.id,
          athleteId: d.athlete_id,
          athleteName: d.athlete_name,
          athleteAvatar: d.athlete_avatar,
          type: d.type,
          title: d.title,
          detail: d.detail,
          metric: d.metric,
          timestamp: 'Recente'
        }));
        localStorage.setItem(STORAGE_KEYS.FEED, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Supabase fetchFeedItems error, fallback to cache:', e);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.FEED);
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }
  }
  return INITIAL_LIVE_FEED;
}

export async function saveFeedItem(item: LiveActivityFeedItem): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.FEED);
      const list: LiveActivityFeedItem[] = cached ? JSON.parse(cached) : [...INITIAL_LIVE_FEED];
      list.unshift(item);
      localStorage.setItem(STORAGE_KEYS.FEED, JSON.stringify(list.slice(0, 50)));
    } catch {}
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('live_feed').insert([{
        id: item.id,
        athlete_id: item.athleteId,
        athlete_name: item.athleteName,
        athlete_avatar: item.athleteAvatar,
        type: item.type,
        title: item.title,
        detail: item.detail,
        metric: item.metric
      }]);
    } catch (e) {
      console.warn('Supabase saveFeedItem error:', e);
    }
  }
}

export async function saveChatMessage(msg: ChatMessage): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('chat_messages').insert([{
        id: msg.id,
        athlete_id: msg.athleteId || 'ath-1',
        sender: msg.sender,
        sender_name: msg.senderName,
        text: msg.text,
        video_attachment: msg.videoAttachment || null
      }]);
    } catch (e) {
      console.warn('Supabase saveChatMessage error:', e);
    }
  }
}

// -----------------------------------------------------------------------------
// 5. REALTIME SYNC CHANNEL SUBSCRIPTION
// -----------------------------------------------------------------------------
export function subscribeToSupabaseRealtime(callbacks: {
  onNewWorkoutLog?: (log: any) => void;
  onNewFeedItem?: (item: any) => void;
  onNewChatMessage?: (msg: any) => void;
  onAthleteUpdated?: (athlete: any) => void;
}) {
  const client = supabase;
  if (!isSupabaseConfigured || !client) return () => {};

  const channel = client.channel('personal-coach-realtime')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'workout_logs' }, payload => {
      callbacks.onNewWorkoutLog?.(payload.new);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_feed' }, payload => {
      const d = payload.new;
      if (d) {
        callbacks.onNewFeedItem?.({
          id: d.id,
          athleteId: d.athlete_id,
          athleteName: d.athlete_name,
          athleteAvatar: d.athlete_avatar,
          type: d.type,
          title: d.title,
          detail: d.detail,
          metric: d.metric,
          timestamp: 'Adesso'
        });
      }
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, payload => {
      const m = payload.new;
      if (m) {
        callbacks.onNewChatMessage?.({
          id: m.id,
          athleteId: m.athlete_id,
          sender: m.sender,
          senderName: m.sender_name,
          text: m.text,
          videoAttachment: m.video_attachment,
          timestamp: 'Adesso'
        });
      }
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'athletes' }, payload => {
      callbacks.onAthleteUpdated?.(payload.new);
    })
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}
