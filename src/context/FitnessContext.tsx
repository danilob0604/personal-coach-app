import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import type { 
  UserRole, 
  ViewportMode, 
  SubscriptionTier, 
  Athlete, 
  WorkoutRoutine, 
  LiveActivityFeedItem, 
  ChatMessage, 
  SubscriptionPlan,
  BiaCheckRecord 
} from '../types';
import { 
  SUBSCRIPTION_PLANS, 
  INITIAL_ATHLETES, 
  SAMPLE_WORKOUT_ROUTINE, 
  MASTER_ROUTINE_TEMPLATES,
  INITIAL_LIVE_FEED, 
  INITIAL_CHAT_MESSAGES 
} from '../data/mockData';
import { soundManager } from '../utils/audioFeedback';
import { wakeLockManager } from '../utils/wakeLock';
import { TRANSLATIONS, type Language, type Translations } from '../i18n/translations';
import { 
  initMultiDeviceSync, 
  subscribeToSync, 
  publishSyncEvent 
} from '../services/multiDeviceSync';
import {
  fetchAthletes,
  upsertAthlete,
  fetchMasterTemplates,
  upsertMasterTemplate,
  fetchFeedItems,
  saveWorkoutLog,
  saveFeedItem,
  saveChatMessage as persistChatMessage,
  subscribeToSupabaseRealtime
} from '../services/dbService';

interface FitnessContextType {
  // Language (i18n)
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  // Role & Viewport
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;

  // Subscription & Tier Gatekeeper
  subscriptionTier: SubscriptionTier;
  currentPlan: SubscriptionPlan;
  plans: SubscriptionPlan[];
  activeAthletesCount: number;
  maxAthletes: number;
  isSlotLimitReached: boolean;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  upgradeSubscription: (tier: SubscriptionTier) => void;

  // Athletes CRM & Active Profile Switcher
  athletes: Athlete[];
  activeAthleteId: string;
  setActiveAthleteId: (id: string) => void;
  activeAthlete: Athlete;
  addAthlete: (athlete: Omit<Athlete, 'id' | 'joinedDate' | 'complianceRate' | 'lastWorkoutDaysAgo'>) => boolean;
  updateAthlete: (athlete: Athlete) => void;
  archiveAthlete: (id: string) => void;
  restoreAthlete: (id: string) => boolean;
  addBiaRecord: (athleteId: string, record: Omit<BiaCheckRecord, 'id'>) => void;
  awardXp: (athleteId: string, amount: number, reason: string) => void;

  // Master Templates & Targeted Routine Assignment
  masterTemplates: WorkoutRoutine[];
  assignRoutineToAthlete: (athleteId: string, routine: WorkoutRoutine) => void;
  assignRoutineToAthletes: (athleteIds: string[], routine: WorkoutRoutine) => void;
  saveAsMasterTemplate: (routine: WorkoutRoutine) => void;
  updateMasterTemplate: (routine: WorkoutRoutine) => void;
  deleteMasterTemplate: (routineId: string) => void;

  // Workout Session (Athlete live execution)
  activeWorkout: WorkoutRoutine;
  setActiveWorkout: React.Dispatch<React.SetStateAction<WorkoutRoutine>>;
  setActiveSplit: (splitIndex: number) => void;
  toggleSetComplete: (exerciseIndex: number, setIndex: number) => void;
  updateSetValues: (exerciseIndex: number, setIndex: number, weight: number, reps: number) => void;
  setSetFeedback: (exerciseIndex: number, setIndex: number, tag: 'easy' | 'limit' | 'pain', note?: string) => void;
  finishWorkout: () => void;
  isWorkoutFinished: boolean;
  setIsWorkoutFinished: (done: boolean) => void;

  // Floating Rest Timer
  restTimer: {
    active: boolean;
    remaining: number;
    total: number;
    exerciseName: string;
    targetEndTime?: number;
  };
  dismissRestTimer: () => void;
  addRestTimerSeconds: (seconds: number) => void;
  startRestTimer: (seconds: number, exerciseName: string) => void;

  // Live Activity Feed
  feed: LiveActivityFeedItem[];
  markFeedReviewed: (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, includeVideo?: boolean) => void;

  // Quick Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Multi-Device QR & Live Sync
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (open: boolean) => void;
  syncConnected: boolean;

  // Platform Settings Modal
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const l = params.get('lang');
      if (l === 'it' || l === 'en' || l === 'es') return l as Language;
      const saved = localStorage.getItem('personal_coach_language');
      if (saved === 'it' || saved === 'en' || saved === 'es') return saved as Language;
    }
    return 'it';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('personal_coach_language', lang);
    }
    publishSyncEvent('SET_LANGUAGE', { language: lang });
  };

  const t = TRANSLATIONS[language];

  // Connect Devices QR Modal state & Live Sync
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [syncConnected, setSyncConnected] = useState(false);

  // Settings Modal state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Initialize Role based on URL query (?role=athlete / ?role=trainer), localStorage or screen width
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('role');
      if (r === 'athlete' || r === 'trainer') return r;
      const saved = localStorage.getItem('personal_coach_role');
      if (saved === 'athlete' || saved === 'trainer') return saved as UserRole;
      if (window.innerWidth < 640) return 'athlete';
    }
    return 'trainer';
  });

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('personal_coach_role', role);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('role', role);
        window.history.replaceState({}, '', url.toString());
      } catch {}
    }
  };

  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive_desktop');
  
  // Subscription state
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('starter');
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);
  const [athletes, setAthletes] = useState<Athlete[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('personal_coach_athletes_v2');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return INITIAL_ATHLETES;
  });

  // Active athlete profile for testing & multi-user simulation
  const [activeAthleteId, setActiveAthleteId] = useState<string>('ath-1');
  const activeAthlete = athletes.find(a => a.id === activeAthleteId) || athletes[0];

  // Master Templates library
  const [masterTemplates, setMasterTemplates] = useState<WorkoutRoutine[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('personal_coach_templates_v2');
      if (cached) {
        try { return JSON.parse(cached); } catch {}
      }
    }
    return MASTER_ROUTINE_TEMPLATES;
  });

  // Active workout in session (persisted so reload never loses progress)
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRoutine>(() => {
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('personal_coach_active_workout');
      if (savedSession) {
        try { return JSON.parse(savedSession); } catch {}
      }
    }
    const routine = activeAthlete?.assignedRoutine || SAMPLE_WORKOUT_ROUTINE;
    if (routine.splits && routine.splits.length > 0) {
      return {
        ...routine,
        activeSplitIndex: 0,
        exercises: routine.splits[0].exercises
      };
    }
    return routine;
  });
  const [isWorkoutFinished, setIsWorkoutFinished] = useState<boolean>(false);

  // Automatically update active workout when switching athletes or when athlete's routine is modified
  useEffect(() => {
    if (activeAthlete?.assignedRoutine) {
      const routine = activeAthlete.assignedRoutine;
      if (routine.splits && routine.splits.length > 0) {
        setActiveWorkout({
          ...routine,
          activeSplitIndex: 0,
          exercises: routine.splits[0].exercises
        });
      } else {
        setActiveWorkout(routine);
      }
      setIsWorkoutFinished(false);
    }
  }, [activeAthleteId, activeAthlete?.assignedRoutine]);

  // Save active workout to localStorage on every state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personal_coach_active_workout', JSON.stringify(activeWorkout));
    }
  }, [activeWorkout]);

  // Load latest data from Supabase on mount & connect to Realtime channel
  useEffect(() => {
    fetchAthletes().then(data => {
      if (data && data.length > 0) setAthletes(data);
    });
    fetchMasterTemplates().then(data => {
      if (data && data.length > 0) setMasterTemplates(data);
    });
    fetchFeedItems().then(data => {
      if (data && data.length > 0) setFeed(data);
    });

    const unsubscribeRealtime = subscribeToSupabaseRealtime({
      onNewWorkoutLog: (log) => {
        showToast(`⚡ [Supabase Realtime] Nuova sessione registrata da ${log.athlete_name}!`);
      },
      onNewFeedItem: (item) => {
        setFeed(prev => [item, ...prev]);
      },
      onNewChatMessage: (msg) => {
        setChatMessages(prev => {
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      },
      onAthleteUpdated: (updated) => {
        setAthletes(prev => prev.map(a => a.id === updated.id ? { ...a, ...updated } : a));
      }
    });

    return () => {
      unsubscribeRealtime?.();
    };
  }, []);

  // Rest Timer state with wall-clock targetEndTime for absolute accuracy on screen sleep
  const [restTimer, setRestTimer] = useState<{
    active: boolean;
    remaining: number;
    total: number;
    exerciseName: string;
    targetEndTime?: number;
  }>({
    active: false,
    remaining: 0,
    total: 90,
    exerciseName: '',
    targetEndTime: undefined
  });

  // Feed & Chat
  const [feed, setFeed] = useState<LiveActivityFeedItem[]>(INITIAL_LIVE_FEED);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Derived subscription variables
  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === subscriptionTier) || SUBSCRIPTION_PLANS[0];
  const activeAthletesCount = athletes.filter(a => a.status !== 'archived').length;
  const maxAthletes = currentPlan.maxAthletes;
  const isSlotLimitReached = activeAthletesCount >= maxAthletes;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Rest timer countdown effect: timestamp-based + Screen Wake Lock + resume on screen wake
  useEffect(() => {
    if (!restTimer.active || !restTimer.targetEndTime) {
      wakeLockManager.releaseWakeLock();
      return;
    }

    // Keep screen awake while rest timer is ticking
    wakeLockManager.requestWakeLock();

    const updateTimer = () => {
      if (!restTimer.targetEndTime) return;
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((restTimer.targetEndTime - now) / 1000));

      if (remaining <= 0) {
        soundManager.playTimerDone();
        showToast(`⏰ Recupero completato per ${restTimer.exerciseName}! Pronto per la prossima serie.`);
        setRestTimer(prev => ({ ...prev, active: false, remaining: 0, targetEndTime: undefined }));
        wakeLockManager.releaseWakeLock();
      } else {
        setRestTimer(prev => (prev.remaining !== remaining ? { ...prev, remaining } : prev));
      }
    };

    // Immediate check
    updateTimer();

    // High frequency interval (300ms) for smooth second transitions
    const interval = setInterval(updateTimer, 300);

    // If screen sleeps and wakes up, immediately recalculate remaining time from timestamp!
    const handleVisibilityOrFocus = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        updateTimer();
        wakeLockManager.requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
  }, [restTimer.active, restTimer.targetEndTime, restTimer.exerciseName]);

  // Multi-Device Cross-Sync over Local Wi-Fi (Server-Sent Events)
  useEffect(() => {
    initMultiDeviceSync(setSyncConnected);

    const unsubscribe = subscribeToSync((event) => {
      if (!event || !event.type) return;

      if (event.type === 'TOGGLE_SET') {
        const { exerciseIndex, setIndex, completed, weight, reps, exerciseName, restSec } = event.payload;
        setActiveWorkout(prev => {
          const updatedExercises = [...prev.exercises];
          if (!updatedExercises[exerciseIndex]) return prev;
          const targetEx = { ...updatedExercises[exerciseIndex] };
          const updatedSets = [...targetEx.sets];
          if (!updatedSets[setIndex]) return prev;
          updatedSets[setIndex] = { ...updatedSets[setIndex], completed, actualWeightKg: weight, actualReps: reps };
          targetEx.sets = updatedSets;
          updatedExercises[exerciseIndex] = targetEx;
          return { ...prev, exercises: updatedExercises };
        });

        if (completed) {
          soundManager.playSetComplete();
          showToast(`⚡ [Sync Wi-Fi] ${exerciseName}: serie ${setIndex + 1} confermata dallo Smartphone!`);

          setFeed(prev => [{
            id: `feed-sync-${Date.now()}`,
            athleteId: event.payload.athleteId || 'ath-1',
            athleteName: event.payload.athleteName || 'Atleta (Smartphone)',
            athleteAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            type: 'workout_completed',
            title: `Serie confermata: ${exerciseName} (${weight}kg × ${reps}) 🔥`,
            detail: `Confermata in diretta dallo smartphone dell'atleta.`,
            timestamp: 'Proprio ora',
            metric: `${weight} kg`
          }, ...prev]);

          if (restSec) {
            setRestTimer({
              active: true,
              remaining: restSec,
              total: restSec,
              exerciseName: exerciseName || 'Esercizio'
            });
          }
        }
      } else if (event.type === 'CHAT_MESSAGE') {
        const msg = event.payload;
        setChatMessages(prev => [...prev, msg]);
        showToast(`💬 Nuovo messaggio in chat da ${msg.senderName}!`);
        soundManager.playLevelUp();
      } else if (event.type === 'BIA_RECORD') {
        const { athleteId, record } = event.payload;
        setAthletes(prev => prev.map(a => {
          if (a.id !== athleteId) return a;
          const existing = a.bodyCompositionHistory || [];
          return {
            ...a,
            weightKg: record.weightKg,
            bodyFatPercent: record.fatMassPercent,
            bodyCompositionHistory: [record, ...existing]
          };
        }));
        showToast(`📊 Nuovo check-in corporeo ricevuto dallo smartphone!`);
      } else if (event.type === 'SET_LANGUAGE' && event.payload?.language) {
        setLanguageState(event.payload.language);
        if (typeof window !== 'undefined') {
          localStorage.setItem('personal_coach_language', event.payload.language);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Upgrade subscription
  const upgradeSubscription = (newTier: SubscriptionTier) => {
    setSubscriptionTier(newTier);
    setUpgradeModalOpen(false);
    const newPlan = SUBSCRIPTION_PLANS.find(p => p.id === newTier);
    soundManager.playPrFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast(`🎉 Abbonamento aggiornato a ${newPlan?.name}! Ora puoi gestire fino a ${newPlan?.maxAthletes} atleti.`);
  };

  // Add athlete with slot limit gatekeeper
  const addAthlete = (newAthleteData: Omit<Athlete, 'id' | 'joinedDate' | 'complianceRate' | 'lastWorkoutDaysAgo'>): boolean => {
    if (isSlotLimitReached) {
      setUpgradeModalOpen(true);
      showToast(`⚠️ Limite di ${maxAthletes} atleti raggiunto. Esegui l'upgrade del pacchetto per aggiungerne altri.`);
      return false;
    }

    const newAthlete: Athlete = {
      ...newAthleteData,
      id: `ath-${Date.now()}`,
      joinedDate: 'Oggi',
      complianceRate: 100,
      lastWorkoutDaysAgo: 0,
      assignedRoutine: SAMPLE_WORKOUT_ROUTINE
    };

    setAthletes(prev => [newAthlete, ...prev]);
    upsertAthlete(newAthlete);
    showToast(`✅ Atleta ${newAthlete.name} aggiunto con successo! Slot rimanenti: ${maxAthletes - (activeAthletesCount + 1)}.`);
    return true;
  };

  // Archive athlete to free up slot
  const archiveAthlete = (id: string) => {
    setAthletes(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status: 'archived' as const } : a);
      const target = updated.find(a => a.id === id);
      if (target) upsertAthlete(target);
      return updated;
    });
    showToast('📦 Atleta archiviato. Lo slot è stato liberato!');
  };

  // Restore athlete
  const restoreAthlete = (id: string): boolean => {
    if (isSlotLimitReached) {
      setUpgradeModalOpen(true);
      showToast(`⚠️ Impossibile ripristinare: hai raggiunto il limite massimo di ${maxAthletes} atleti.`);
      return false;
    }
    setAthletes(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status: 'active' as const } : a);
      const target = updated.find(a => a.id === id);
      if (target) upsertAthlete(target);
      return updated;
    });
    showToast('✅ Atleta ripristinato con successo.');
    return true;
  };

  // Update athlete details (anagrafica, anamnesi, biometric data, status)
  const updateAthlete = (updatedAthlete: Athlete) => {
    // If status changed to active from archived/inactive, verify slots
    const prev = athletes.find(a => a.id === updatedAthlete.id);
    if (prev && prev.status === 'archived' && updatedAthlete.status === 'active' && isSlotLimitReached) {
      setUpgradeModalOpen(true);
      showToast(`⚠️ Impossibile riattivare: hai raggiunto il limite di ${maxAthletes} atleti attivi.`);
      return;
    }

    setAthletes(current => current.map(a => a.id === updatedAthlete.id ? updatedAthlete : a));
    upsertAthlete(updatedAthlete);
    showToast(`✅ Anagrafica e cartella di ${updatedAthlete.name} aggiornata con successo!`);
  };

  // Gamification: Award XP, trigger Level-ups, sounds and celebration
  const awardXp = (athleteId: string, amount: number, reason: string) => {
    setAthletes(prev => prev.map(a => {
      if (a.id !== athleteId) return a;
      const currentXp = (a.currentXp || 0) + amount;
      const nextXp = a.nextLevelXp || 1000;
      if (currentXp >= nextXp) {
        const newLevel = (a.athleticLevel || 1) + 1;
        const remainderXp = currentXp - nextXp;
        soundManager.playLevelUp();
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.4 } });
        showToast(`⚡ NUOVO LIVELLO! ${a.name} è salito al LIVELLO ${newLevel}! Nuovi traguardi sbloccati (+${amount} Punti Esperienza - ${reason})!`);
        return {
          ...a,
          athleticLevel: newLevel,
          currentXp: remainderXp,
          nextLevelXp: Math.round(nextXp * 1.25)
        };
      }
      showToast(`⚡ +${amount} Punti Esperienza (${reason})! Totale: ${currentXp}/${nextXp}`);
      return {
        ...a,
        currentXp
      };
    }));
  };

  // Add BIA Body Composition check record
  const addBiaRecord = (athleteId: string, recordData: Omit<BiaCheckRecord, 'id'>) => {
    const newRecord: BiaCheckRecord = {
      ...recordData,
      id: `bia-${Date.now()}`
    };

    setAthletes(prev => prev.map(a => {
      if (a.id !== athleteId) return a;
      const history = a.bodyCompositionHistory || [];
      return {
        ...a,
        weightKg: newRecord.weightKg,
        bodyFatPercent: newRecord.fatMassPercent,
        bodyCompositionHistory: [newRecord, ...history]
      };
    }));

    if (recordData.source === 'athlete_self_check') {
      awardXp(athleteId, 50, 'Check-in corporeo');
      const targetAthlete = athletes.find(a => a.id === athleteId);
      const newFeedItem: LiveActivityFeedItem = {
        id: `feed-bia-${Date.now()}`,
        athleteId: athleteId,
        athleteName: targetAthlete?.name || 'Atleta',
        athleteAvatar: targetAthlete?.avatar || '',
        type: 'new_pr',
        title: 'Check Composizione Corporea Registrato ⚖️',
        detail: `Peso aggiornato a ${newRecord.weightKg} kg (Massa Grassa: ${newRecord.fatMassPercent}%). Sincronizzato col Coach.`,
        timestamp: 'Proprio ora',
        metric: `${newRecord.weightKg} kg • ${newRecord.fatMassPercent}% BF`
      };
      setFeed(prev => [newFeedItem, ...prev]);
      soundManager.playPrFanfare();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }

    publishSyncEvent('BIA_RECORD', { athleteId, record: newRecord });
    showToast('⚖️ Nuova misurazione BIA e composizione corporea registrata!');
  };

  // Assign targeted routine to specific athlete (1-to-1 individual assignment)
  const assignRoutineToAthlete = (athleteId: string, routine: WorkoutRoutine) => {
    const targetAthlete = athletes.find(a => a.id === athleteId);
    if (!targetAthlete) return;

    const assignedRoutineWithMeta: WorkoutRoutine = {
      ...routine,
      id: `assigned-${athleteId}-${Date.now()}`,
      assignedAthleteId: athleteId,
      assignedAthleteName: targetAthlete.name
    };

    setAthletes(prev => prev.map(a => {
      if (a.id !== athleteId) return a;
      return {
        ...a,
        assignedRoutine: assignedRoutineWithMeta,
        currentWorkoutPlan: routine.title
      };
    }));

    if (athleteId === activeAthleteId) {
      setActiveWorkout(assignedRoutineWithMeta);
      setIsWorkoutFinished(false);
    }

    soundManager.playSetComplete();
    const newFeedItem: LiveActivityFeedItem = {
      id: `feed-assign-${Date.now()}`,
      athleteId: targetAthlete.id,
      athleteName: targetAthlete.name,
      athleteAvatar: targetAthlete.avatar,
      type: 'workout_completed',
      title: 'Nuova Scheda Assegnata dal Coach 🎯',
      detail: `Assegnato protocollo: "${routine.title}" personalizzato per ${targetAthlete.name}.`,
      timestamp: 'Proprio ora',
      metric: `${routine.exercises.length} esercizi • ${routine.estimatedMinutes} min`
    };
    setFeed(prev => [newFeedItem, ...prev]);

    showToast(`🎯 Scheda "${routine.title}" assegnata a ${targetAthlete.name} con successo!`);
  };

  // Assign routine to multiple athletes simultaneously
  const assignRoutineToAthletes = (athleteIds: string[], routine: WorkoutRoutine) => {
    if (athleteIds.length === 0) return;

    setAthletes(prev => prev.map(a => {
      if (!athleteIds.includes(a.id)) return a;
      return {
        ...a,
        assignedRoutine: {
          ...routine,
          id: `assigned-${a.id}-${Date.now()}`,
          assignedAthleteId: a.id,
          assignedAthleteName: a.name
        },
        currentWorkoutPlan: routine.title
      };
    }));

    if (athleteIds.includes(activeAthleteId)) {
      setActiveWorkout({
        ...routine,
        id: `assigned-${activeAthleteId}-${Date.now()}`,
        assignedAthleteId: activeAthleteId,
        assignedAthleteName: activeAthlete.name
      });
      setIsWorkoutFinished(false);
    }

    soundManager.playSetComplete();

    const targetNames = athletes.filter(a => athleteIds.includes(a.id)).map(a => a.name).join(', ');
    const newFeedItem: LiveActivityFeedItem = {
      id: `feed-assign-${Date.now()}`,
      athleteId: athleteIds[0],
      athleteName: targetNames,
      athleteAvatar: athletes.find(a => a.id === athleteIds[0])?.avatar || '',
      type: 'workout_completed',
      title: 'Scheda Assegnata 🎯',
      detail: `Assegnato protocollo "${routine.title}" a: ${targetNames}.`,
      timestamp: 'Proprio ora',
      metric: `${routine.exercises.length} esercizi • ${routine.estimatedMinutes} min`
    };
    setFeed(prev => [newFeedItem, ...prev]);

    showToast(`🎯 Scheda "${routine.title}" assegnata con successo a ${targetNames}!`);
  };

  // Save current routine to Master Templates library
  const saveAsMasterTemplate = (routine: WorkoutRoutine) => {
    const newTemplate: WorkoutRoutine = {
      ...routine,
      id: `template-${Date.now()}`,
      assignedAthleteId: undefined,
      assignedAthleteName: undefined
    };
    setMasterTemplates(prev => [newTemplate, ...prev]);
    upsertMasterTemplate(newTemplate);
    showToast(`💾 Modello "${routine.title}" salvato nella Libreria Master!`);
  };

  // Update existing template in library
  const updateMasterTemplate = (routine: WorkoutRoutine) => {
    setMasterTemplates(prev => prev.map(t => t.id === routine.id ? routine : t));
    upsertMasterTemplate(routine);
    showToast(`💾 Scheda "${routine.title}" aggiornata con successo!`);
  };

  // Delete template from library
  const deleteMasterTemplate = (routineId: string) => {
    setMasterTemplates(prev => prev.filter(t => t.id !== routineId));
    showToast(`🗑️ Scheda rimossa dalla libreria.`);
  };

  // Toggle set completed in workout session
  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    setActiveWorkout(prev => {
      const updatedExercises = [...prev.exercises];
      const targetExercise = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetExercise.sets];
      const currentSet = { ...updatedSets[setIndex] };

      // Once validated, the set cannot be unchecked
      if (currentSet.completed) {
        return prev;
      }

      currentSet.completed = true;
      updatedSets[setIndex] = currentSet;
      targetExercise.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetExercise;

      soundManager.playSetComplete();

      // If it's a Personal Record (PR)
        if (currentSet.isPR) {
          awardXp(activeAthlete.id, 100, 'Nuovo Record Personale');
          soundManager.playPrFanfare();
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
          showToast(`🏆 NUOVO RECORD PERSONALE! ${currentSet.actualWeightKg} kg su ${targetExercise.name}!`);
        }

        // Start automatic Rest Timer with time chosen by personal coach
        const restSec = targetExercise.restSeconds || activeAthlete?.defaultRestSeconds || 90;
        const targetEndTime = Date.now() + restSec * 1000;
        setRestTimer({
          active: true,
          remaining: restSec,
          total: restSec,
          exerciseName: targetExercise.name,
          targetEndTime
        });
        wakeLockManager.requestWakeLock();

        // Publish to other connected devices (e.g. tablet coach)
        publishSyncEvent('TOGGLE_SET', {
          athleteId: activeAthlete.id,
          athleteName: activeAthlete.name,
          exerciseIndex,
          setIndex,
          completed: true,
          weight: currentSet.actualWeightKg,
          reps: currentSet.actualReps,
          exerciseName: targetExercise.name,
          restSec
        });

        return { ...prev, exercises: updatedExercises };
      });
    };

  // Update set weight and reps
  const updateSetValues = (exerciseIndex: number, setIndex: number, weight: number, reps: number) => {
    setActiveWorkout(prev => {
      const updatedExercises = [...prev.exercises];
      const targetExercise = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetExercise.sets];
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        actualWeightKg: weight,
        actualReps: reps
      };
      targetExercise.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: updatedExercises };
    });
  };

  // Set feedback (easy / limit / pain)
  const setSetFeedback = (exerciseIndex: number, setIndex: number, tag: 'easy' | 'limit' | 'pain', note?: string) => {
    setActiveWorkout(prev => {
      const updatedExercises = [...prev.exercises];
      const targetExercise = { ...updatedExercises[exerciseIndex] };
      if (!targetExercise) return prev;
      const updatedSets = [...targetExercise.sets];
      if (!updatedSets[setIndex]) return prev;
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        feedbackTag: tag,
        feedbackNote: note
      };
      targetExercise.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetExercise;
      return { ...prev, exercises: updatedExercises };
    });

    if (tag === 'pain') {
      const painAlertItem: LiveActivityFeedItem = {
        id: `feed-pain-${Date.now()}`,
        athleteId: activeAthlete.id,
        athleteName: activeAthlete.name,
        athleteAvatar: activeAthlete.avatar,
        type: 'inactivity_alert',
        title: `🚨 SEGNALAZIONE DOLORE: ${activeWorkout.exercises[exerciseIndex]?.name || 'Esercizio'} (Serie ${setIndex + 1})`,
        detail: note ? `Nota Atleta: "${note}"` : 'Fastidio o dolore acuto riscontrato durante l\'esecuzione.',
        timestamp: 'Adesso',
        requiresReview: true
      };
      setFeed(prev => [painAlertItem, ...prev]);
      saveFeedItem(painAlertItem);
      showToast('⚠️ Allerta dolore inviata in diretta al tuo Personal Trainer.');
    } else if (tag === 'easy') {
      showToast('🟢 Serie registrata come facile! Il coach ne terrà conto.');
    } else {
      showToast('🟡 Serie al limite registrata!');
    }
  };

  // Switch active split for athlete workout session
  const setActiveSplit = (splitIndex: number) => {
    setActiveWorkout(prev => {
      if (!prev.splits || !prev.splits[splitIndex]) return prev;
      return {
        ...prev,
        activeSplitIndex: splitIndex,
        exercises: prev.splits[splitIndex].exercises
      };
    });
    const splitName = activeWorkout.splits?.[splitIndex]?.name || `Split ${splitIndex + 1}`;
    showToast(`🔄 Caricata sessione: ${splitName}`);
  };

  // Finish workout
  const finishWorkout = () => {
    setIsWorkoutFinished(true);
    awardXp(activeAthlete.id, 150, 'Sessione Completata');
    soundManager.playPrFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    const totalVolumeKg = activeWorkout.exercises.reduce((acc, ex) => {
      return acc + ex.sets.reduce((sAcc, s) => sAcc + (s.completed ? s.actualWeightKg * s.actualReps : 0), 0);
    }, 0);

    // Add event to live feed
    const newFeedItem: LiveActivityFeedItem = {
      id: `feed-${Date.now()}`,
      athleteId: activeAthlete.id,
      athleteName: activeAthlete.name,
      athleteAvatar: activeAthlete.avatar,
      type: 'workout_completed',
      title: 'Allenamento completato a pieni voti! 🔥',
      detail: `Completato "${activeWorkout.title}" con successo e sessione registrata.`,
      timestamp: 'Proprio ora',
      metric: totalVolumeKg > 0 ? `${totalVolumeKg.toLocaleString()} kg vol.` : `${activeWorkout.estimatedMinutes} min`
    };

    setFeed(prev => [newFeedItem, ...prev]);

    // Persist workout log & feed item to Supabase & cache
    saveWorkoutLog({
      id: `log-${Date.now()}`,
      athlete_id: activeAthlete.id,
      athlete_name: activeAthlete.name,
      routine_id: activeWorkout.id,
      routine_title: activeWorkout.title,
      split_index: activeWorkout.activeSplitIndex || 0,
      split_name: activeWorkout.splits?.[activeWorkout.activeSplitIndex || 0]?.name || 'Split Sessione',
      total_volume_kg: totalVolumeKg,
      exercises_data: activeWorkout.exercises,
      completed_at: new Date().toISOString()
    });
    saveFeedItem(newFeedItem);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('personal_coach_active_workout');
    }

    showToast('🚀 Allenamento salvato! Il tuo Personal Trainer ha ricevuto la notifica in tempo reale.');
  };

  // Dismiss / modify rest timer
  const dismissRestTimer = () => {
    setRestTimer(prev => ({ ...prev, active: false, remaining: 0, targetEndTime: undefined }));
    wakeLockManager.releaseWakeLock();
  };

  const addRestTimerSeconds = (seconds: number) => {
    setRestTimer(prev => {
      const newRemaining = Math.max(0, prev.remaining + seconds);
      const newTargetEndTime = Date.now() + newRemaining * 1000;
      return {
        ...prev,
        remaining: newRemaining,
        total: Math.max(newRemaining, prev.total + (seconds > 0 ? seconds : 0)),
        targetEndTime: newTargetEndTime
      };
    });
  };

  const startRestTimer = (seconds: number, exerciseName: string) => {
    const targetEndTime = Date.now() + seconds * 1000;
    setRestTimer({
      active: true,
      remaining: seconds,
      total: seconds,
      exerciseName,
      targetEndTime
    });
    wakeLockManager.requestWakeLock();
  };

  // Feed actions
  const markFeedReviewed = (id: string) => {
    setFeed(prev => prev.map(item => item.id === id ? { ...item, requiresReview: false } : item));
    showToast('Segnalazione verificata e contrassegnata come risolta.');
  };

  // Chat message
  const sendChatMessage = (text: string, includeVideo?: boolean) => {
    if (!text.trim() && !includeVideo) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: currentRole === 'trainer' ? 'trainer' : 'athlete',
      senderName: currentRole === 'trainer' ? 'Coach Alessandro' : activeAthlete.name,
      text: text,
      timestamp: 'Adesso',
      videoAttachment: includeVideo ? {
        duration: '0:12',
        thumbnail: activeAthlete.avatar,
        exerciseName: `Check esecuzione (${activeAthlete.name})`
      } : undefined
    };

    setChatMessages(prev => [...prev, newMsg]);
    persistChatMessage(newMsg);

    // If athlete sent video, notify trainer in feed
    if (includeVideo && currentRole === 'athlete') {
      const feedVideoAlert: LiveActivityFeedItem = {
        id: `feed-${Date.now()}-vid`,
        athleteId: activeAthlete.id,
        athleteName: activeAthlete.name,
        athleteAvatar: activeAthlete.avatar,
        type: 'video_submitted',
        title: 'Nuovo video esecuzione da verificare 📹',
        detail: `${activeAthlete.name} ha inviato un video per controllo tecnico`,
        timestamp: 'Adesso',
        requiresReview: true
      };
      setFeed(prev => [feedVideoAlert, ...prev]);
      saveFeedItem(feedVideoAlert);
    }

    publishSyncEvent('CHAT_MESSAGE', newMsg);
  };

  return (
    <FitnessContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRole,
        setCurrentRole,
        viewportMode,
        setViewportMode,
        subscriptionTier,
        currentPlan,
        plans: SUBSCRIPTION_PLANS,
        activeAthletesCount,
        maxAthletes,
        isSlotLimitReached,
        upgradeModalOpen,
        setUpgradeModalOpen,
        upgradeSubscription,
        athletes,
        activeAthleteId,
        setActiveAthleteId,
        activeAthlete,
        addAthlete,
        updateAthlete,
        archiveAthlete,
        restoreAthlete,
        addBiaRecord,
        awardXp,
        masterTemplates,
        assignRoutineToAthlete,
        assignRoutineToAthletes,
        saveAsMasterTemplate,
        updateMasterTemplate,
        deleteMasterTemplate,
        activeWorkout,
        setActiveWorkout,
        setActiveSplit,
        toggleSetComplete,
        updateSetValues,
        setSetFeedback,
        finishWorkout,
        isWorkoutFinished,
        setIsWorkoutFinished,
        restTimer,
        dismissRestTimer,
        addRestTimerSeconds,
        startRestTimer,
        feed,
        markFeedReviewed,
        chatMessages,
        sendChatMessage,
        toastMessage,
        showToast,
        isConnectModalOpen,
        setIsConnectModalOpen,
        syncConnected,
        isSettingsModalOpen,
        setIsSettingsModalOpen
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
