export type UserRole = 'trainer' | 'athlete';

export type ViewportMode = 'responsive_desktop' | 'tablet_frame' | 'mobile_frame';

export type SubscriptionTier = 'starter' | 'pro' | 'studio';

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  monthlyPrice: number;
  maxAthletes: number;
  badge: string;
  features: string[];
  recommended?: boolean;
}

export interface BiaCheckRecord {
  id: string;
  date: string;
  source: 'trainer_bia_scan' | 'athlete_self_check';
  weightKg: number;
  fatMassPercent: number; // Massa Grassa %
  fatMassKg: number;     // Massa Grassa kg
  muscleMassKg: number;  // Massa Muscolare kg
  totalBodyWaterPercent: number; // Acqua Corporea % (TBW)
  visceralFatRating: number;     // Livello Grasso Viscerale (1-12)
  basalMetabolicRateKcal: number;// BMR kcal
  waistCircumferenceCm?: number; // Circonferenza Vita cm
  armCircumferenceCm?: number;   // Circonferenza Braccio cm
  notes?: string;
}

export interface AthleteBadge {
  id: string;
  title: string;
  category: 'hypertrophy' | 'fat_loss' | 'consistency' | 'strength' | 'telemetry';
  icon: string; // e.g. Trophy, Flame, Zap, Shield, Sparkles
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  progressPercent: number;
}

export interface Athlete {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  status: 'active' | 'inactive' | 'expiring' | 'archived';
  lastWorkoutDaysAgo: number;
  currentWorkoutPlan: string;
  complianceRate: number; // percentage, e.g. 94%
  weightKg: number;
  heightCm?: number;
  bodyFatPercent?: number;
  birthDate?: string;
  joinedDate: string;
  packageExpiryDate?: string;
  goals: string;
  injuriesOrNotes?: string;
  pastSportExperience?: string; // Anzianità di allenamento, sport praticati
  dietaryHabits?: string;       // Abitudini nutrizionali, integratori
  anamnesis?: {
    cardiovascularIssues?: boolean;
    jointPains?: string;
    pastSurgeries?: string;
    dailyActivityLevel?: 'Sedentario' | 'Moderato' | 'Attivo' | 'Molto Attivo';
  };
  bodyCompositionHistory?: BiaCheckRecord[];
  athleticLevel?: number; // e.g. 7
  athleticRankTitle?: string; // e.g. 'TITAN PROTOCOL'
  currentXp?: number; // e.g. 740
  nextLevelXp?: number; // e.g. 1000
  badges?: AthleteBadge[];
  strengthMetrics?: StrengthMetrics;
  assignedRoutine?: WorkoutRoutine;
  defaultRestSeconds?: number; // Tempo di recupero personalizzato tra le serie scelto dal personal trainer (es. 60, 90, 120s)
}

export interface StrengthProgressRecord {
  exerciseId: string;
  exerciseName: string;
  muscle: string;
  previousMonthMaxKg: number;
  currentMaxKg: number;
  deltaKg: number;
  deltaPercent: number;
  repsAtMax: number;
  lastDate: string;
}

export interface StrengthMetrics {
  totalStrengthGainKg: number; // e.g. +22.5 kg
  comparisonPeriod: string; // e.g. "Rispetto al mese precedente"
  sessionVolumeKg: number; // e.g. 4.450 kg
  previousMonthVolumeKg: number; // e.g. 3.800 kg
  volumeDeltaKg: number; // e.g. +650 kg (+17.1%)
  topLifts: StrengthProgressRecord[];
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  muscle: 'Petto' | 'Dorso' | 'Spalle' | 'Gambe' | 'Braccia' | 'Core';
  defaultRestSec: number;
  videoPlaceholder: string;
  cues: string[];
}

export interface ExerciseSet {
  setNumber: number;
  suggestedWeightKg: number;
  suggestedReps: number;
  actualWeightKg: number;
  actualReps: number;
  completed: boolean;
  isPR?: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  muscle: string;
  sets: ExerciseSet[];
  restSeconds: number;
  targetRPE?: number;
  trainerNotes?: string;
  tempo?: string; // e.g. "3-0-1-0"
  videoUrl?: string; // Video girato dal coach o clip HD
  isCoachCustomVideo?: boolean;
  coachVideoAuthor?: string;
}

export interface WorkoutSplit {
  id: string;
  name: string; // e.g. "Split A", "Split B", "Split C", "Seduta Unica"
  targetMuscleGroup: string; // e.g. "Focus Glutei Pesanti & Quadricipiti", "Upper Body & Postura"
  suggestedDayOfWeek?: string; // e.g. "Lunedì", "Mercoledì", "Venerdì"
  estimatedMinutes: number;
  exercises: WorkoutExercise[];
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: 'Spinta (Push)' | 'Tirata (Pull)' | 'Gambe (Legs)' | 'Full Body' | 'Upper' | 'Multisplit A-B-C' | 'Multisplit A-B';
  targetGender?: 'donna' | 'uomo' | 'unisex';
  targetGoal?: string; // e.g. 'Glutei & Catena Posteriore', 'Ipertrofia Upper', 'Dimagrimento', 'Forza'
  difficultyLevel?: 'Principiante' | 'Intermedio' | 'Avanzato';
  estimatedMinutes: number;
  assignedAthleteId?: string;
  assignedAthleteName?: string;
  weeklyFrequency?: number; // 1, 2, 3, 4, 5 volte a settimana
  activeSplitIndex?: number; // Per tracciare quale split è attivo
  splits?: WorkoutSplit[];   // I diversi giorni/split all'interno della stessa scheda!
  exercises: WorkoutExercise[]; // Esercizi dello split attivo (o default)
}

export interface LiveActivityFeedItem {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteAvatar: string;
  type: 'workout_completed' | 'new_pr' | 'inactivity_alert' | 'video_submitted';
  title: string;
  detail: string;
  timestamp: string;
  metric?: string;
  requiresReview?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'trainer' | 'athlete';
  senderName: string;
  text: string;
  timestamp: string;
  videoAttachment?: {
    duration: string;
    thumbnail: string;
    exerciseName: string;
  };
}
