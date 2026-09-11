import type { Athlete, ExerciseDefinition, LiveActivityFeedItem, SubscriptionPlan, WorkoutRoutine, ChatMessage, WorkoutLogSession } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Coach',
    monthlyPrice: 29,
    maxAthletes: 10,
    badge: 'Base',
    features: [
      'Fino a 10 Atleti attivi contemporanei',
      'Dashboard Web Desktop per PC & Mac',
      'App Mobile per iOS & Android inclusa',
      'Workout Builder & Libreria Esercizi',
      'Live Activity Feed atleti in tempo reale',
      'Timer recupero e log carichi per gli atleti',
      'Supporto standard via email'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Trainer',
    monthlyPrice: 59,
    maxAthletes: 25,
    badge: 'Più Popolare',
    recommended: true,
    features: [
      'Fino a 25 Atleti attivi contemporanei',
      'Tutte le funzionalità del piano Starter',
      'Video Check esecuzioni con correzione tecnica',
      'Alert automatico atleti a rischio inattività',
      'Analisi sovraccarico progressivo & volumi',
      'Chat diretta con caricamento file e video',
      'Supporto prioritario WhatsApp / Chat'
    ]
  },
  {
    id: 'studio',
    name: 'Elite Studio',
    monthlyPrice: 99,
    maxAthletes: 60,
    badge: 'Massima Scalabilità',
    features: [
      'Fino a 60 Atleti attivi contemporanei',
      'Tutte le funzionalità del piano Pro',
      'Multi-schede avanzate per periodizzazione',
      'Esportazione report atleti in PDF/Excel',
      'Dominio e branding personalizzato (opzionale)',
      'Account sub-trainer / assistente',
      'Onboarding dedicato 1-to-1'
    ]
  }
];

export const EXERCISE_CATALOG: ExerciseDefinition[] = [
  {
    id: 'ex-1',
    name: 'Panca Piana con Bilanciere',
    muscle: 'Petto',
    defaultRestSec: 90,
    videoPlaceholder: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80',
    cues: ['Scapole addotte e depresse', 'Gomiti a circa 45° rispetto al busto', 'Piede saldo al pavimento']
  },
  {
    id: 'ex-2',
    name: 'Spinte Manubri su Panca Inclinata',
    muscle: 'Petto',
    defaultRestSec: 75,
    videoPlaceholder: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
    cues: ['Inclinazione a 30° per enfasi fascio clavicolare', 'Controllo totale in fase eccentrica']
  },
  {
    id: 'ex-3',
    name: 'Military Press (Spalle)',
    muscle: 'Spalle',
    defaultRestSec: 90,
    videoPlaceholder: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80',
    cues: ['Glutei e addome contratti per bloccare il bacino', 'Barra che sfiora il naso in discesa']
  },
  {
    id: 'ex-4',
    name: 'Alzate Laterali Manubri',
    muscle: 'Spalle',
    defaultRestSec: 60,
    videoPlaceholder: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80',
    cues: ['Gomito leggermente flesso', 'Non superare l\'altezza delle spalle', 'Movimento controllato']
  },
  {
    id: 'ex-5',
    name: 'Squat con Bilanciere',
    muscle: 'Gambe',
    defaultRestSec: 120,
    videoPlaceholder: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
    cues: ['Piedi larghezza spalle, punte a 15-30°', 'Profondità sotto il parallelo', 'Spingi forte a centro piede']
  },
  {
    id: 'ex-6',
    name: 'Lat Machine Presa Inversa',
    muscle: 'Dorso',
    defaultRestSec: 75,
    videoPlaceholder: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&auto=format&fit=crop&q=80',
    cues: ['Deprimi le scapole prima di tirare', 'Tira i gomiti verso le anche', 'Trazione al petto alto']
  },
  {
    id: 'ex-7',
    name: 'Pulley Basso al Cavo',
    muscle: 'Dorso',
    defaultRestSec: 75,
    videoPlaceholder: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80',
    cues: ['Busto perpendicolare al suolo', 'Massimo allungamento dorsale in avanti', 'Spremitura scapole']
  },
  {
    id: 'ex-8',
    name: 'Dip alle Parallele',
    muscle: 'Braccia',
    defaultRestSec: 90,
    videoPlaceholder: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
    cues: ['Gomiti a 90°', 'Spalle basse lontane dalle orecchie', 'Spinta decisa al blocco articolare']
  },
  {
    id: 'ex-9',
    name: 'Curl con Bilanciere EZ',
    muscle: 'Braccia',
    defaultRestSec: 60,
    videoPlaceholder: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80',
    cues: ['Gomiti incollati ai fianchi', 'Nessuna oscillazione lombare', 'Picco di contrazione 1 secondo']
  },
  {
    id: 'ex-10',
    name: 'Plank Addominale',
    muscle: 'Core',
    defaultRestSec: 60,
    videoPlaceholder: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80',
    cues: ['Linea retta testa-talloni', 'Retroversione del bacino', 'Addome e glutei serrati al massimo']
  },
  {
    id: 'ex-11',
    name: 'Hip Thrust con Bilanciere',
    muscle: 'Gambe',
    defaultRestSec: 90,
    videoPlaceholder: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    cues: ['Fermo 2 secondi in contrazione al picco', 'Spinta decisa sui talloni', 'Sguardo in avanti, mento chiuso']
  },
  {
    id: 'ex-12',
    name: 'Stacco Rumeno con Manubri',
    muscle: 'Gambe',
    defaultRestSec: 75,
    videoPlaceholder: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=80',
    cues: ['Bacino spinto indietro (hip hinge)', 'Ginocchia sbloccate a 15°', 'Massimo allungamento femorali']
  },
  {
    id: 'ex-13',
    name: 'Bulgarian Split Squat',
    muscle: 'Gambe',
    defaultRestSec: 60,
    videoPlaceholder: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
    cues: ['Piede posteriore su panca', 'Busto leggermente flesso avanti per focus gluteo', 'Discesa profonda controllata']
  }
];

// ROUTINE 1: PUSH / PULL / LEGS (UOMO - 3X A SETTIMANA)
export const SAMPLE_WORKOUT_ROUTINE: WorkoutRoutine = {
  id: 'workout-push-a',
  title: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe (3x Settimana)',
  category: 'Multisplit A-B-C',
  targetGender: 'uomo',
  targetGoal: 'Ipertrofia Petto, Spalle, Dorso & Sovraccarico Progressivo',
  difficultyLevel: 'Avanzato',
  estimatedMinutes: 55,
  weeklyFrequency: 3,
  assignedAthleteId: 'ath-1',
  assignedAthleteName: 'Marco Rossi',
  activeSplitIndex: 0,
  splits: [
    {
      id: 'split-uomo-a',
      name: 'Split A (Lunedì)',
      targetMuscleGroup: 'Spinta: Petto, Spalle e Tricipiti',
      suggestedDayOfWeek: 'Lunedì',
      estimatedMinutes: 55,
      exercises: [
        {
          exerciseId: 'ex-1',
          name: 'Panca Piana con Bilanciere',
          muscle: 'Petto',
          restSeconds: 90,
          targetRPE: 8,
          tempo: '3-0-1-0',
          trainerNotes: 'Fermo al petto di 1 secondo. Gomiti a 45° rispetto al busto.',
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bench-presses-in-a-gym-44163-large.mp4',
          sets: [
            { setNumber: 1, suggestedWeightKg: 75, suggestedReps: 8, actualWeightKg: 75, actualReps: 8, completed: true },
            { setNumber: 2, suggestedWeightKg: 80, suggestedReps: 6, actualWeightKg: 80, actualReps: 6, completed: true },
            { setNumber: 3, suggestedWeightKg: 82.5, suggestedReps: 6, actualWeightKg: 82.5, actualReps: 6, completed: false, isPR: true },
            { setNumber: 4, suggestedWeightKg: 82.5, suggestedReps: 6, actualWeightKg: 82.5, actualReps: 6, completed: false }
          ]
        },
        {
          exerciseId: 'ex-2',
          name: 'Spinte Manubri su Panca Inclinata',
          muscle: 'Petto',
          restSeconds: 75,
          targetRPE: 8.5,
          tempo: '3-0-1-0',
          trainerNotes: 'Controllo eccentrico 3 secondi, esplosione controllata in spinta.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 26, suggestedReps: 10, actualWeightKg: 26, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 28, suggestedReps: 8, actualWeightKg: 28, actualReps: 8, completed: false },
            { setNumber: 3, suggestedWeightKg: 28, suggestedReps: 8, actualWeightKg: 28, actualReps: 8, completed: false }
          ]
        },
        {
          exerciseId: 'ex-3',
          name: 'Military Press con Bilanciere',
          muscle: 'Spalle',
          restSeconds: 0,
          targetRPE: 8,
          tempo: '2-0-1-0',
          trainerNotes: 'Non inarcare la zona lombare, serra i glutei. Subito in superset con alzate laterali!',
          supersetGroupId: 'ss-uomo-a1',
          supersetLabel: '03A',
          sets: [
            { setNumber: 1, suggestedWeightKg: 45, suggestedReps: 8, actualWeightKg: 45, actualReps: 8, completed: false },
            { setNumber: 2, suggestedWeightKg: 47.5, suggestedReps: 8, actualWeightKg: 47.5, actualReps: 8, completed: false },
            { setNumber: 3, suggestedWeightKg: 50, suggestedReps: 6, actualWeightKg: 50, actualReps: 6, completed: false }
          ]
        },
        {
          exerciseId: 'ex-4',
          name: 'Alzate Laterali Manubri',
          muscle: 'Spalle',
          restSeconds: 90,
          targetRPE: 9,
          tempo: '2-1-1-0',
          trainerNotes: 'Movimento continuo senza pause a carico controllato. Recupero completo al termine.',
          supersetGroupId: 'ss-uomo-a1',
          supersetLabel: '03B',
          sets: [
            { setNumber: 1, suggestedWeightKg: 10, suggestedReps: 12, actualWeightKg: 10, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 10, suggestedReps: 12, actualWeightKg: 10, actualReps: 12, completed: false },
            { setNumber: 3, suggestedWeightKg: 12, suggestedReps: 10, actualWeightKg: 12, actualReps: 10, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-uomo-b',
      name: 'Split B (Mercoledì)',
      targetMuscleGroup: 'Trazione: Dorso e Bicipiti',
      suggestedDayOfWeek: 'Mercoledì',
      estimatedMinutes: 50,
      exercises: [
        {
          exerciseId: 'ex-6',
          name: 'Lat Machine Presa Inversa',
          muscle: 'Dorso',
          restSeconds: 75,
          targetRPE: 8,
          tempo: '3-0-1-0',
          trainerNotes: 'Deprimi le scapole prima di tirare.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 55, suggestedReps: 10, actualWeightKg: 55, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 60, suggestedReps: 8, actualWeightKg: 60, actualReps: 8, completed: false }
          ]
        },
        {
          exerciseId: 'ex-7',
          name: 'Pulley Basso al Cavo',
          muscle: 'Dorso',
          restSeconds: 75,
          targetRPE: 8,
          tempo: '3-1-1-0',
          trainerNotes: 'Spremitura dorsale completa.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 55, suggestedReps: 10, actualWeightKg: 55, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-9',
          name: 'Curl con Bilanciere EZ',
          muscle: 'Braccia',
          restSeconds: 60,
          targetRPE: 8.5,
          tempo: '3-0-1-0',
          trainerNotes: 'Gomiti fermi ai fianchi.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 28, suggestedReps: 10, actualWeightKg: 28, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 30, suggestedReps: 8, actualWeightKg: 30, actualReps: 8, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-uomo-c',
      name: 'Split C (Venerdì)',
      targetMuscleGroup: 'Gambe & Addome: Squat e Glutei',
      suggestedDayOfWeek: 'Venerdì',
      estimatedMinutes: 55,
      exercises: [
        {
          exerciseId: 'ex-5',
          name: 'Squat con Bilanciere',
          muscle: 'Gambe',
          restSeconds: 120,
          targetRPE: 8.5,
          tempo: '3-1-1-0',
          trainerNotes: 'Discesa controllata sotto il parallelo, spinta sui talloni.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 95, suggestedReps: 6, actualWeightKg: 95, actualReps: 6, completed: false },
            { setNumber: 2, suggestedWeightKg: 105, suggestedReps: 5, actualWeightKg: 105, actualReps: 5, completed: false }
          ]
        },
        {
          exerciseId: 'ex-10',
          name: 'Plank Addominale',
          muscle: 'Core',
          restSeconds: 60,
          targetRPE: 8,
          trainerNotes: 'Bacino in retroversione, glutei serrati.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 0, suggestedReps: 60, actualWeightKg: 0, actualReps: 60, completed: false },
            { setNumber: 2, suggestedWeightKg: 0, suggestedReps: 60, actualWeightKg: 0, actualReps: 60, completed: false }
          ]
        }
      ]
    }
  ],
  get exercises() {
    return this.splits ? this.splits[0].exercises : [];
  }
};

// ROUTINE 2: FOCUS DONNA - GLUTEI & CATENA POSTERIORE (3X A SETTIMANA)
export const WOMAN_GLUTES_WORKOUT_ROUTINE: WorkoutRoutine = {
  id: 'routine-woman-glutes-1',
  title: 'Focus Donna - Glutei & Catena Posteriore (3x Settimana)',
  category: 'Multisplit A-B-C',
  targetGender: 'donna',
  targetGoal: 'Ipertrofia Glutei, Slancio & Tonificazione Gambe',
  difficultyLevel: 'Intermedio',
  estimatedMinutes: 50,
  weeklyFrequency: 3,
  assignedAthleteId: 'ath-2',
  assignedAthleteName: 'Elena Bianchi',
  activeSplitIndex: 0,
  splits: [
    {
      id: 'split-donna-a',
      name: 'Split A (Lunedì)',
      targetMuscleGroup: 'Focus Glutei Pesanti & Quadricipiti',
      suggestedDayOfWeek: 'Lunedì',
      estimatedMinutes: 50,
      exercises: [
        {
          exerciseId: 'ex-11',
          name: 'Hip Thrust con Bilanciere',
          muscle: 'Gambe',
          restSeconds: 90,
          targetRPE: 8.5,
          tempo: '3-0-1-0',
          trainerNotes: 'Fermo 2 secondi in massima estensione al soffitto. Spingi rigorosamente con i talloni.',
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-44166-large.mp4',
          sets: [
            { setNumber: 1, suggestedWeightKg: 75, suggestedReps: 12, actualWeightKg: 75, actualReps: 12, completed: true },
            { setNumber: 2, suggestedWeightKg: 85, suggestedReps: 10, actualWeightKg: 85, actualReps: 10, completed: true },
            { setNumber: 3, suggestedWeightKg: 90, suggestedReps: 8, actualWeightKg: 90, actualReps: 8, completed: false, isPR: true },
            { setNumber: 4, suggestedWeightKg: 90, suggestedReps: 8, actualWeightKg: 90, actualReps: 8, completed: false }
          ]
        },
        {
          exerciseId: 'ex-13',
          name: 'Bulgarian Split Squat',
          muscle: 'Gambe',
          restSeconds: 60,
          targetRPE: 8.5,
          tempo: '3-1-1-0',
          trainerNotes: 'Busto leggermente inclinato in avanti a 15° per scaricare quadricipite ed esaltare il gluteo.',
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          sets: [
            { setNumber: 1, suggestedWeightKg: 10, suggestedReps: 10, actualWeightKg: 10, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 12, suggestedReps: 10, actualWeightKg: 12, actualReps: 10, completed: false },
            { setNumber: 3, suggestedWeightKg: 12, suggestedReps: 10, actualWeightKg: 12, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-10',
          name: 'Plank Addominale Isometrico',
          muscle: 'Core',
          restSeconds: 60,
          targetRPE: 8,
          tempo: 'Isometria',
          trainerNotes: 'Ombelico risucchiato per attivare il muscolo trasverso, glutei serrati.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 0, suggestedReps: 45, actualWeightKg: 0, actualReps: 45, completed: false },
            { setNumber: 2, suggestedWeightKg: 0, suggestedReps: 45, actualWeightKg: 0, actualReps: 45, completed: false },
            { setNumber: 3, suggestedWeightKg: 0, suggestedReps: 60, actualWeightKg: 0, actualReps: 60, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-donna-b',
      name: 'Split B (Mercoledì)',
      targetMuscleGroup: 'Upper Body, Postura & Core',
      suggestedDayOfWeek: 'Mercoledì',
      estimatedMinutes: 45,
      exercises: [
        {
          exerciseId: 'ex-2',
          name: 'Spinte Manubri su Panca Inclinata',
          muscle: 'Petto',
          restSeconds: 75,
          targetRPE: 8,
          tempo: '3-0-1-0',
          trainerNotes: 'Panca a 30°, massima apertura toracica per migliorare la postura.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 12, suggestedReps: 12, actualWeightKg: 12, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 14, suggestedReps: 10, actualWeightKg: 14, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-6',
          name: 'Lat Machine Presa Inversa',
          muscle: 'Dorso',
          restSeconds: 60,
          targetRPE: 8,
          tempo: '3-0-1-0',
          trainerNotes: 'Spalle basse lontane dalle orecchie, deprimi le scapole.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 35, suggestedReps: 12, actualWeightKg: 35, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 40, suggestedReps: 10, actualWeightKg: 40, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-4',
          name: 'Alzate Laterali Manubri',
          muscle: 'Spalle',
          restSeconds: 60,
          targetRPE: 8.5,
          tempo: '2-1-1-0',
          trainerNotes: 'Tono spalla e forma a clessidra.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 6, suggestedReps: 15, actualWeightKg: 6, actualReps: 15, completed: false },
            { setNumber: 2, suggestedWeightKg: 8, suggestedReps: 12, actualWeightKg: 8, actualReps: 12, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-donna-c',
      name: 'Split C (Venerdì)',
      targetMuscleGroup: 'Femorali, Glutei Pump & Catena Posteriore',
      suggestedDayOfWeek: 'Venerdì',
      estimatedMinutes: 48,
      exercises: [
        {
          exerciseId: 'ex-12',
          name: 'Stacco Rumeno con Manubri',
          muscle: 'Gambe',
          restSeconds: 75,
          targetRPE: 8,
          tempo: '3-1-1-0',
          trainerNotes: 'Bacino spinto all\'indietro, ginocchia a 15°. Senti l\'allungamento puro sui femorali.',
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-44166-large.mp4',
          sets: [
            { setNumber: 1, suggestedWeightKg: 18, suggestedReps: 12, actualWeightKg: 18, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 20, suggestedReps: 10, actualWeightKg: 20, actualReps: 10, completed: false },
            { setNumber: 3, suggestedWeightKg: 20, suggestedReps: 10, actualWeightKg: 20, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-11',
          name: 'Hip Thrust con Bilanciere (Pump Set)',
          muscle: 'Gambe',
          restSeconds: 60,
          targetRPE: 8.5,
          tempo: '2-1-1-0',
          trainerNotes: 'Carico moderato, contrazioni dense al picco.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 70, suggestedReps: 12, actualWeightKg: 70, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 75, suggestedReps: 12, actualWeightKg: 75, actualReps: 12, completed: false }
          ]
        }
      ]
    }
  ],
  get exercises() {
    return this.splits ? this.splits[0].exercises : [];
  }
};

// ROUTINE 3: FULL BODY RICOMPOSIZIONE & FAT LOSS (1X A SETTIMANA - SEDUTA SINGOLA)
export const RECOMP_METABOLIC_ROUTINE: WorkoutRoutine = {
  id: 'routine-recomp-1',
  title: 'Full Body Metabolic Density (Seduta Singola 1x/Settimana)',
  category: 'Full Body',
  targetGender: 'unisex',
  targetGoal: 'Perdita Grasso, Densità Muscolare & Dispendio Calorico',
  difficultyLevel: 'Intermedio',
  estimatedMinutes: 50,
  weeklyFrequency: 1,
  assignedAthleteId: 'ath-3',
  assignedAthleteName: 'Matteo Ferrari',
  activeSplitIndex: 0,
  splits: [
    {
      id: 'split-recomp-single',
      name: 'Seduta Singola',
      targetMuscleGroup: 'Full Body High Density & Efficienza Totale',
      suggestedDayOfWeek: 'Sabato',
      estimatedMinutes: 50,
      exercises: [
        {
          exerciseId: 'ex-5',
          name: 'Squat con Bilanciere',
          muscle: 'Gambe',
          restSeconds: 60,
          targetRPE: 8,
          tempo: '2-0-1-0',
          trainerNotes: 'Cadenza controllata 2-0-1, recuperi serrati a 60 secondi.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 60, suggestedReps: 12, actualWeightKg: 60, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 65, suggestedReps: 10, actualWeightKg: 65, actualReps: 10, completed: false },
            { setNumber: 3, suggestedWeightKg: 65, suggestedReps: 10, actualWeightKg: 65, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-6',
          name: 'Lat Machine Presa Larga',
          muscle: 'Dorso',
          restSeconds: 60,
          targetRPE: 8,
          tempo: '3-0-1-0',
          trainerNotes: 'Petto in fuori, traiettoria continua.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 45, suggestedReps: 12, actualWeightKg: 45, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false }
          ]
        },
        {
          exerciseId: 'ex-8',
          name: 'Dip alle Parallele (o Push-up)',
          muscle: 'Braccia',
          restSeconds: 60,
          targetRPE: 8.5,
          tempo: '2-0-1-0',
          trainerNotes: 'Massimo allungamento al petto.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 0, suggestedReps: 12, actualWeightKg: 0, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 0, suggestedReps: 12, actualWeightKg: 0, actualReps: 12, completed: false }
          ]
        }
      ]
    }
  ],
  get exercises() {
    return this.splits ? this.splits[0].exercises : [];
  }
};

// ROUTINE 4: FORZA PURA & POWERLIFTING (2X A SETTIMANA)
export const POWER_STRENGTH_ROUTINE: WorkoutRoutine = {
  id: 'routine-power-1',
  title: 'Protocollo Forza Pura & Massimali 1RM (2x Settimana)',
  category: 'Multisplit A-B',
  targetGender: 'unisex',
  targetGoal: 'Incremento Massimali 1RM & Reclutamento Neurale',
  difficultyLevel: 'Avanzato',
  estimatedMinutes: 60,
  weeklyFrequency: 2,
  assignedAthleteId: 'ath-5',
  assignedAthleteName: 'Andrea Conti',
  activeSplitIndex: 0,
  splits: [
    {
      id: 'split-power-a',
      name: 'Split A (Lunedì)',
      targetMuscleGroup: 'Squat & Panca Pesante (Max Effort)',
      suggestedDayOfWeek: 'Lunedì',
      estimatedMinutes: 60,
      exercises: [
        {
          exerciseId: 'ex-5',
          name: 'Squat con Bilanciere',
          muscle: 'Gambe',
          restSeconds: 150,
          targetRPE: 9,
          tempo: '3-1-1-0',
          trainerNotes: 'Salita esplosiva, discesa controllata. Verifica video richiesta.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 100, suggestedReps: 5, actualWeightKg: 100, actualReps: 5, completed: false },
            { setNumber: 2, suggestedWeightKg: 110, suggestedReps: 4, actualWeightKg: 110, actualReps: 4, completed: false },
            { setNumber: 3, suggestedWeightKg: 115, suggestedReps: 3, actualWeightKg: 115, actualReps: 3, completed: false }
          ]
        },
        {
          exerciseId: 'ex-1',
          name: 'Panca Piana con Bilanciere',
          muscle: 'Petto',
          restSeconds: 120,
          targetRPE: 8.5,
          tempo: '3-1-1-0',
          trainerNotes: 'Fermo al petto 1.5s netto da regolamento.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 85, suggestedReps: 5, actualWeightKg: 85, actualReps: 5, completed: false },
            { setNumber: 2, suggestedWeightKg: 90, suggestedReps: 4, actualWeightKg: 90, actualReps: 4, completed: false },
            { setNumber: 3, suggestedWeightKg: 95, suggestedReps: 3, actualWeightKg: 95, actualReps: 3, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-power-b',
      name: 'Split B (Giovedì)',
      targetMuscleGroup: 'Stacco & Dorso Pesante',
      suggestedDayOfWeek: 'Giovedì',
      estimatedMinutes: 55,
      exercises: [
        {
          exerciseId: 'ex-6',
          name: 'Lat Machine Presa Inversa',
          muscle: 'Dorso',
          restSeconds: 90,
          targetRPE: 8.5,
          trainerNotes: 'Carico massimo controllato.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 65, suggestedReps: 6, actualWeightKg: 65, actualReps: 6, completed: false },
            { setNumber: 2, suggestedWeightKg: 70, suggestedReps: 5, actualWeightKg: 70, actualReps: 5, completed: false }
          ]
        }
      ]
    }
  ],
  get exercises() {
    return this.splits ? this.splits[0].exercises : [];
  }
};

// MASTER TEMPLATES LIBRARY (Libreria Modelli Master per il Trainer)
export const MASTER_ROUTINE_TEMPLATES: WorkoutRoutine[] = [
  {
    ...WOMAN_GLUTES_WORKOUT_ROUTINE,
    id: 'template-donna-glutei',
    assignedAthleteId: undefined,
    assignedAthleteName: undefined
  },
  {
    ...SAMPLE_WORKOUT_ROUTINE,
    id: 'template-uomo-push',
    targetGender: 'uomo',
    targetGoal: 'Ipertrofia Petto, Spalle & Sovraccarico Progressivo',
    difficultyLevel: 'Avanzato',
    assignedAthleteId: undefined,
    assignedAthleteName: undefined
  },
  {
    ...RECOMP_METABOLIC_ROUTINE,
    id: 'template-recomp-metabolic',
    assignedAthleteId: undefined,
    assignedAthleteName: undefined
  },
  {
    ...POWER_STRENGTH_ROUTINE,
    id: 'template-power-strength',
    assignedAthleteId: undefined,
    assignedAthleteName: undefined
  }
];

export const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Marco Rossi',
    email: 'marco.rossi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+39 340 9876543',
    status: 'active',
    lastWorkoutDaysAgo: 0,
    currentWorkoutPlan: 'Spinta A - Petto, Spalle e Tricipiti',
    complianceRate: 96,
    weightKg: 78.4,
    heightCm: 178,
    bodyFatPercent: 15.1,
    birthDate: '1996-05-12',
    joinedDate: '15 Gen 2026',
    packageExpiryDate: '2026-12-31',
    goals: 'Ipertrofia e incremento forza su panca piana (+10kg)',
    injuriesOrNotes: 'Lieve fastidio alla cuffia dei rotatori dx, scaldare bene prima della panca.',
    pastSportExperience: '5 anni di calcio a livello dilettantistico, 2 anni di sala pesi a singhiozzo. Buona coordinazione motoria.',
    dietaryHabits: 'Apporto calorico circa 2.500 kcal, ~150g proteine/die. Creatina monoidrato 5g/die. Beve ~2.5L acqua/die.',
    defaultRestSeconds: 90,
    assignedRoutine: SAMPLE_WORKOUT_ROUTINE,
    anamnesis: {
      cardiovascularIssues: false,
      jointPains: 'Fastidio cuffia rotatori spalla destra a carichi sub-massimali.',
      pastSurgeries: 'Nessun intervento chirurgico maggiore.',
      dailyActivityLevel: 'Moderato'
    },
    bodyCompositionHistory: [
      {
        id: 'bia-1',
        date: '15 Gen 2026',
        source: 'trainer_bia_scan',
        weightKg: 82.0,
        fatMassPercent: 19.5,
        fatMassKg: 16.0,
        muscleMassKg: 34.0,
        totalBodyWaterPercent: 54.2,
        visceralFatRating: 6,
        basalMetabolicRateKcal: 1740,
        waistCircumferenceCm: 88,
        armCircumferenceCm: 35.5,
        notes: 'Check iniziale Tanita MC-780. Ritenzione idrica moderata sul tronco.'
      },
      {
        id: 'bia-2',
        date: '15 Feb 2026',
        source: 'trainer_bia_scan',
        weightKg: 80.1,
        fatMassPercent: 17.2,
        fatMassKg: 13.8,
        muscleMassKg: 34.8,
        totalBodyWaterPercent: 56.0,
        visceralFatRating: 5,
        basalMetabolicRateKcal: 1775,
        waistCircumferenceCm: 84.5,
        armCircumferenceCm: 36.2,
        notes: 'Primo mese completato. Ottimo calo del grasso viscerale e guadagno di 800g di tessuto contrattile.'
      },
      {
        id: 'bia-3',
        date: 'Oggi (Self Check)',
        source: 'athlete_self_check',
        weightKg: 78.4,
        fatMassPercent: 15.1,
        fatMassKg: 11.8,
        muscleMassKg: 35.6,
        totalBodyWaterPercent: 58.1,
        visceralFatRating: 4,
        basalMetabolicRateKcal: 1810,
        waistCircumferenceCm: 81.0,
        armCircumferenceCm: 37.0,
        notes: 'Check settimanale registrato dall\'atleta. Massa muscolare in netta ascesa.'
      }
    ],
    athleticLevel: 7,
    athleticRankTitle: 'PROTOCOLLO TITANO',
    currentXp: 740,
    nextLevelXp: 1000,
    badges: [
      {
        id: 'badge-1',
        title: 'Crescita Muscolare',
        category: 'hypertrophy',
        icon: 'Zap',
        description: '+1.6 kg di Massa Muscolare certificata BIA',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      },
      {
        id: 'badge-2',
        title: 'Definizione Titano',
        category: 'fat_loss',
        icon: 'Flame',
        description: 'Riduzione Grasso Corporeo sotto il 16%',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      },
      {
        id: 'badge-3',
        title: 'Panca 80kg Club',
        category: 'strength',
        icon: 'Trophy',
        description: 'Superati gli 80 kg su Panca Piana con fermo',
        unlocked: true,
        unlockedDate: 'Ieri',
        progressPercent: 100
      },
      {
        id: 'badge-4',
        title: 'Costanza di Ferro',
        category: 'consistency',
        icon: 'Crown',
        description: '30 giorni consecutivi di aderenza al piano di allenamento',
        unlocked: false,
        progressPercent: 83
      },
      {
        id: 'badge-5',
        title: 'Telemetria Avanzata',
        category: 'telemetry',
        icon: 'Shield',
        description: '3 Scansioni BIA e check-in corporei sincronizzati',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      }
    ],
    strengthMetrics: {
      totalStrengthGainKg: 22.5,
      comparisonPeriod: 'Rispetto al mese precedente',
      sessionVolumeKg: 4450,
      previousMonthVolumeKg: 3800,
      volumeDeltaKg: 650,
      topLifts: [
        {
          exerciseId: 'ex-1',
          exerciseName: 'Panca Piana Bilanciere',
          muscle: 'Petto',
          previousMonthMaxKg: 75.0,
          currentMaxKg: 82.5,
          deltaKg: 7.5,
          deltaPercent: 10.0,
          repsAtMax: 6,
          lastDate: 'Oggi'
        },
        {
          exerciseId: 'ex-5',
          exerciseName: 'Squat con Bilanciere',
          muscle: 'Gambe',
          previousMonthMaxKg: 95.0,
          currentMaxKg: 105.0,
          deltaKg: 10.0,
          deltaPercent: 10.5,
          repsAtMax: 5,
          lastDate: '3 giorni fa'
        },
        {
          exerciseId: 'ex-3',
          exerciseName: 'Military Press Bilanciere',
          muscle: 'Spalle',
          previousMonthMaxKg: 47.5,
          currentMaxKg: 52.5,
          deltaKg: 5.0,
          deltaPercent: 10.5,
          repsAtMax: 6,
          lastDate: 'Oggi'
        },
        {
          exerciseId: 'ex-2',
          exerciseName: 'Spinte Manubri Inclinata',
          muscle: 'Petto',
          previousMonthMaxKg: 24.0,
          currentMaxKg: 28.0,
          deltaKg: 4.0,
          deltaPercent: 16.6,
          repsAtMax: 8,
          lastDate: 'Oggi'
        }
      ]
    }
  },
  {
    id: 'ath-2',
    name: 'Elena Bianchi',
    email: 'elena.b@outlook.it',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    phone: '+39 347 1122334',
    status: 'active',
    lastWorkoutDaysAgo: 0,
    currentWorkoutPlan: 'Focus Donna - Glutei & Catena Posteriore',
    complianceRate: 100,
    weightKg: 61.2,
    heightCm: 165,
    bodyFatPercent: 19.2,
    birthDate: '1998-09-22',
    joinedDate: '02 Feb 2026',
    packageExpiryDate: '2026-11-30',
    goals: 'Tonificazione glutei, definizione arti inferiori, addome compatto e postura',
    injuriesOrNotes: 'Lieve iperlordosi lombare: prediligere Hip Thrust e stacchi con schiena rigorosamente neutra.',
    pastSportExperience: '3 anni di danza contemporanea, 1 anno di pilates funzionale. Ottima flessibilità delle anche.',
    dietaryHabits: 'Circa 1.900 kcal/die, apporto proteico ~110g/die, bevitrice regolare (2.2L acqua/die). Integra con magnesio.',
    defaultRestSeconds: 75,
    assignedRoutine: WOMAN_GLUTES_WORKOUT_ROUTINE,
    anamnesis: {
      cardiovascularIssues: false,
      jointPains: 'Nessun dolore acuto, lieve affaticamento zona lombare se in piedi a lungo.',
      pastSurgeries: 'Nessun intervento chirurgico.',
      dailyActivityLevel: 'Attivo'
    },
    bodyCompositionHistory: [
      {
        id: 'bia-e-1',
        date: '02 Feb 2026',
        source: 'trainer_bia_scan',
        weightKg: 63.5,
        fatMassPercent: 21.8,
        fatMassKg: 13.8,
        muscleMassKg: 25.1,
        totalBodyWaterPercent: 53.0,
        visceralFatRating: 3,
        basalMetabolicRateKcal: 1390,
        waistCircumferenceCm: 68.0,
        armCircumferenceCm: 26.0,
        notes: 'Check BIA Tanita iniziale. Obiettivo ricomposizione con focus gluteo.'
      },
      {
        id: 'bia-e-2',
        date: '20 Feb 2026',
        source: 'trainer_bia_scan',
        weightKg: 62.1,
        fatMassPercent: 20.4,
        fatMassKg: 12.6,
        muscleMassKg: 25.4,
        totalBodyWaterPercent: 54.5,
        visceralFatRating: 2,
        basalMetabolicRateKcal: 1410,
        waistCircumferenceCm: 66.5,
        armCircumferenceCm: 26.2,
        notes: 'Progressivo miglioramento tonicità e perdita di 1.2kg di adipe su fianchi.'
      },
      {
        id: 'bia-e-3',
        date: 'Oggi (Self Check)',
        source: 'athlete_self_check',
        weightKg: 61.2,
        fatMassPercent: 19.2,
        fatMassKg: 11.7,
        muscleMassKg: 25.9,
        totalBodyWaterPercent: 55.8,
        visceralFatRating: 2,
        basalMetabolicRateKcal: 1435,
        waistCircumferenceCm: 65.0,
        armCircumferenceCm: 26.5,
        notes: 'Check settimanale atleta. Massa muscolare a +800g e grasso sceso sotto il 20%!'
      }
    ],
    athleticLevel: 6,
    athleticRankTitle: 'PROTOCOLLO GLUTEI PRO',
    currentXp: 620,
    nextLevelXp: 800,
    badges: [
      {
        id: 'badge-e-1',
        title: 'Record Glutei',
        category: 'strength',
        icon: 'Trophy',
        description: 'Hip Thrust superato il muro dei 90 kg (+15 kg nell\'ultimo mese)',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      },
      {
        id: 'badge-e-2',
        title: 'Sotto il 20% Grasso Corporeo',
        category: 'fat_loss',
        icon: 'Flame',
        description: 'Massa grassa ridotta al 19.2% con massa magra in salita',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      },
      {
        id: 'badge-e-3',
        title: 'Aderenza Perfetta 100%',
        category: 'consistency',
        icon: 'Crown',
        description: 'Tutte le sessioni del mese completate senza saltarne una',
        unlocked: true,
        unlockedDate: '3 giorni fa',
        progressPercent: 100
      },
      {
        id: 'badge-e-4',
        title: 'Telemetria Verificata',
        category: 'telemetry',
        icon: 'Shield',
        description: '3 Check-in BIA costanti registrati con il Coach',
        unlocked: true,
        unlockedDate: 'Oggi',
        progressPercent: 100
      }
    ],
    strengthMetrics: {
      totalStrengthGainKg: 28.5,
      comparisonPeriod: 'Rispetto al mese precedente',
      sessionVolumeKg: 3850,
      previousMonthVolumeKg: 3100,
      volumeDeltaKg: 750,
      topLifts: [
        {
          exerciseId: 'ex-11',
          exerciseName: 'Hip Thrust Bilanciere',
          muscle: 'Gambe / Glutei',
          previousMonthMaxKg: 75.0,
          currentMaxKg: 90.0,
          deltaKg: 15.0,
          deltaPercent: 20.0,
          repsAtMax: 8,
          lastDate: 'Oggi'
        },
        {
          exerciseId: 'ex-12',
          exerciseName: 'Stacco Rumeno Manubri',
          muscle: 'Gambe / Catena Post.',
          previousMonthMaxKg: 16.0,
          currentMaxKg: 20.0,
          deltaKg: 4.0,
          deltaPercent: 25.0,
          repsAtMax: 10,
          lastDate: 'Oggi'
        },
        {
          exerciseId: 'ex-5',
          exerciseName: 'Squat con Bilanciere',
          muscle: 'Gambe',
          previousMonthMaxKg: 55.0,
          currentMaxKg: 62.5,
          deltaKg: 7.5,
          deltaPercent: 13.6,
          repsAtMax: 6,
          lastDate: '2 giorni fa'
        },
        {
          exerciseId: 'ex-13',
          exerciseName: 'Bulgarian Split Squat',
          muscle: 'Glutei / Gambe',
          previousMonthMaxKg: 10.0,
          currentMaxKg: 12.0,
          deltaKg: 2.0,
          deltaPercent: 20.0,
          repsAtMax: 10,
          lastDate: 'Oggi'
        }
      ]
    }
  },
  {
    id: 'ath-3',
    name: 'Matteo Ferrari',
    email: 'm.ferrari@icloud.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+39 338 5544332',
    status: 'inactive',
    lastWorkoutDaysAgo: 5,
    currentWorkoutPlan: 'Full Body Densità Metabolica (Ricomposizione & Dimagrimento)',
    complianceRate: 58,
    weightKg: 84.0,
    heightCm: 180,
    bodyFatPercent: 22.4,
    joinedDate: '10 Dic 2025',
    goals: 'Ricomposizione corporea e perdita 5kg di massa grassa',
    injuriesOrNotes: 'Orari di lavoro variabili, monitorare costanza.',
    defaultRestSeconds: 60,
    assignedRoutine: RECOMP_METABOLIC_ROUTINE
  },
  {
    id: 'ath-4',
    name: 'Giulia Neri',
    email: 'giulia.neri@live.it',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+39 349 7788990',
    status: 'active',
    lastWorkoutDaysAgo: 1,
    currentWorkoutPlan: 'Focus Donna - Glutei & Catena Posteriore',
    complianceRate: 92,
    weightKg: 57.5,
    heightCm: 168,
    bodyFatPercent: 20.1,
    joinedDate: '20 Gen 2026',
    goals: 'Definizione muscolare e mobilità articolare',
    assignedRoutine: WOMAN_GLUTES_WORKOUT_ROUTINE
  },
  {
    id: 'ath-5',
    name: 'Andrea Conti',
    email: 'andrea.conti@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+39 320 6677889',
    status: 'active',
    lastWorkoutDaysAgo: 1,
    currentWorkoutPlan: 'Protocollo Forza Pura & Massimali 1RM',
    complianceRate: 90,
    weightKg: 88.3,
    heightCm: 182,
    bodyFatPercent: 16.5,
    joinedDate: '18 Gen 2026',
    goals: 'Test massimali Squat e Stacco a fine mese',
    injuriesOrNotes: 'Richiesto check video su profondità squat a carichi alti.',
    assignedRoutine: POWER_STRENGTH_ROUTINE
  },
  {
    id: 'ath-6',
    name: 'Sofia Moretti',
    email: 'sofia.m@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+39 333 4455667',
    status: 'active',
    lastWorkoutDaysAgo: 2,
    currentWorkoutPlan: 'Pull A - Dorso & Bicipiti',
    complianceRate: 88,
    weightKg: 64.1,
    heightCm: 170,
    joinedDate: '01 Feb 2026',
    goals: 'Aumento trazioni alla sbarra da 2 a 8 ripetizioni'
  },
  {
    id: 'ath-7',
    name: 'Davide Fontana',
    email: 'davide.fontana@yahoo.it',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    phone: '+39 345 8899001',
    status: 'inactive',
    lastWorkoutDaysAgo: 7,
    currentWorkoutPlan: 'Spinta / Trazione / Gambe Classic',
    complianceRate: 54,
    weightKg: 76.0,
    joinedDate: '11 Gen 2026',
    goals: 'Mantenimento e condizionamento metabolico',
    injuriesOrNotes: 'Inattivo da 7 giorni, ricontattare con priorità.'
  },
  {
    id: 'ath-8',
    name: 'Valentina Romano',
    email: 'v.romano@libero.it',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+39 348 2233445',
    status: 'active',
    lastWorkoutDaysAgo: 1,
    currentWorkoutPlan: 'Gambe & Addome Dinamico',
    complianceRate: 95,
    weightKg: 59.8,
    joinedDate: '28 Gen 2026',
    goals: 'Glutei e addominali per gara amatoriale'
  }
];

export const INITIAL_LIVE_FEED: LiveActivityFeedItem[] = [
  {
    id: 'feed-1',
    athleteId: 'ath-2',
    athleteName: 'Elena Bianchi',
    athleteAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    type: 'new_pr',
    title: 'Nuovo Record Personale! 🏆',
    detail: 'Ha appena completato Hip Thrust 90 kg x 8 rip. (+15 kg rispetto al mese scorso)',
    timestamp: '5 minuti fa',
    metric: '90 kg (+15 kg)'
  },
  {
    id: 'feed-2',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    athleteAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    type: 'workout_completed',
    title: 'Allenamento completato',
    detail: 'Sessione "Spinta A" portata a termine in 52 min con 100% serie completate',
    timestamp: '25 minuti fa',
    metric: '52 min • 4.450 kg vol.'
  },
  {
    id: 'feed-3',
    athleteId: 'ath-5',
    athleteName: 'Andrea Conti',
    athleteAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    type: 'video_submitted',
    title: 'Nuovo video esecuzione da verificare 📹',
    detail: 'Ha registrato l\'ultima serie di Squat 110 kg x 4 rip. per controllo profondità',
    timestamp: '1 ora fa',
    requiresReview: true
  },
  {
    id: 'feed-4',
    athleteId: 'ath-3',
    athleteName: 'Matteo Ferrari',
    athleteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    type: 'inactivity_alert',
    title: 'Radar Inattività: 5 giorni senza allenamento ⚠️',
    detail: 'Non apre la scheda da giovedì scorso. Consigliato invio promemoria motivazionale.',
    timestamp: 'Oggi alle 08:30',
    requiresReview: true
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'trainer',
    senderName: 'Coach Alessandro',
    text: 'Ciao! Ricordati di fare 5 min di riscaldamento specifico e attivazione prima dei carichi pesanti.',
    timestamp: 'Oggi, 09:15'
  },
  {
    id: 'msg-2',
    sender: 'athlete',
    senderName: 'Elena Bianchi',
    text: 'Tutto perfetto coach! Ho fatto l\'attivazione glutei con elastico e sentivo una spinta pazzesca.',
    timestamp: 'Oggi, 09:20'
  },
  {
    id: 'msg-3',
    sender: 'athlete',
    senderName: 'Elena Bianchi',
    text: 'Ho provato i 90kg su Hip Thrust: chiuse 8 ripetizioni con fermo 2 secondi in alto!',
    timestamp: 'Oggi, 10:12',
    videoAttachment: {
      duration: '0:15',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
      exerciseName: 'Hip Thrust 90kg x 8 rip.'
    }
  },
  {
    id: 'msg-4',
    sender: 'trainer',
    senderName: 'Coach Alessandro',
    text: 'Ho visto il video! Movimento compatto, estensione completa e bacino in asse perfetto. Complimenti per il nuovo record! 🔥',
    timestamp: 'Oggi, 10:25'
  }
];

export const INITIAL_WORKOUT_LOGS: WorkoutLogSession[] = [
  {
    id: 'log-hist-1',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 0,
    splitName: 'Split A (Lunedì) - Petto & Spalle',
    totalVolumeKg: 4280,
    durationMinutes: 52,
    completedAt: '2026-08-17T18:30:00.000Z',
    exercisesData: [
      {
        id: 'ex-1',
        name: 'Panca Piana con Bilanciere',
        muscle: 'Petto',
        restSeconds: 90,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 70, actualReps: 8, completed: true, feedbackTag: 'easy' },
          { setNumber: 2, targetReps: 6, actualWeightKg: 70, actualReps: 6, completed: true, feedbackTag: 'easy' },
          { setNumber: 3, targetReps: 6, actualWeightKg: 70, actualReps: 6, completed: true, feedbackTag: 'limit' }
        ]
      },
      {
        id: 'ex-2',
        name: 'Spinte Manubri su Panca Inclinata',
        muscle: 'Petto',
        restSeconds: 75,
        targetRPE: 8.5,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 22, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 24, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-2',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 1,
    splitName: 'Split B (Mercoledì) - Dorso & Braccia',
    totalVolumeKg: 4650,
    durationMinutes: 55,
    completedAt: '2026-08-19T19:00:00.000Z',
    exercisesData: [
      {
        id: 'ex-6',
        name: 'Lat Machine Avanti Presa Larga',
        muscle: 'Dorso',
        restSeconds: 75,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 60, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 65, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-3',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 2,
    splitName: 'Split C (Venerdì) - Gambe & Addome',
    totalVolumeKg: 5800,
    durationMinutes: 58,
    completedAt: '2026-08-21T18:15:00.000Z',
    exercisesData: [
      {
        id: 'ex-3',
        name: 'Squat con Bilanciere',
        muscle: 'Gambe',
        restSeconds: 120,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 95, actualReps: 8, completed: true },
          { setNumber: 2, targetReps: 6, actualWeightKg: 100, actualReps: 6, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-4',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 0,
    splitName: 'Split A (Lunedì) - Petto & Spalle',
    totalVolumeKg: 4420,
    durationMinutes: 50,
    completedAt: '2026-08-24T18:40:00.000Z',
    exercisesData: [
      {
        id: 'ex-1',
        name: 'Panca Piana con Bilanciere',
        muscle: 'Petto',
        restSeconds: 90,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 72.5, actualReps: 8, completed: true, feedbackTag: 'easy' },
          { setNumber: 2, targetReps: 6, actualWeightKg: 72.5, actualReps: 6, completed: true, feedbackTag: 'easy' },
          { setNumber: 3, targetReps: 6, actualWeightKg: 72.5, actualReps: 6, completed: true, feedbackTag: 'limit' }
        ]
      },
      {
        id: 'ex-2',
        name: 'Spinte Manubri su Panca Inclinata',
        muscle: 'Petto',
        restSeconds: 75,
        targetRPE: 8.5,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 24, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 24, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-5',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 1,
    splitName: 'Split B (Mercoledì) - Dorso & Braccia',
    totalVolumeKg: 4800,
    durationMinutes: 53,
    completedAt: '2026-08-26T19:15:00.000Z',
    exercisesData: [
      {
        id: 'ex-6',
        name: 'Lat Machine Avanti Presa Larga',
        muscle: 'Dorso',
        restSeconds: 75,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 65, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 70, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-6',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 2,
    splitName: 'Split C (Venerdì) - Gambe & Addome',
    totalVolumeKg: 6100,
    durationMinutes: 60,
    completedAt: '2026-08-28T18:00:00.000Z',
    exercisesData: [
      {
        id: 'ex-3',
        name: 'Squat con Bilanciere',
        muscle: 'Gambe',
        restSeconds: 120,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 100, actualReps: 8, completed: true },
          { setNumber: 2, targetReps: 6, actualWeightKg: 102.5, actualReps: 6, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-7',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 0,
    splitName: 'Split A (Lunedì) - Petto & Spalle',
    totalVolumeKg: 4620,
    durationMinutes: 52,
    completedAt: '2026-08-31T18:30:00.000Z',
    exercisesData: [
      {
        id: 'ex-1',
        name: 'Panca Piana con Bilanciere',
        muscle: 'Petto',
        restSeconds: 90,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 75, actualReps: 8, completed: true, feedbackTag: 'easy' },
          { setNumber: 2, targetReps: 6, actualWeightKg: 75, actualReps: 6, completed: true, feedbackTag: 'easy' },
          { setNumber: 3, targetReps: 6, actualWeightKg: 77.5, actualReps: 6, completed: true, feedbackTag: 'limit' }
        ]
      },
      {
        id: 'ex-2',
        name: 'Spinte Manubri su Panca Inclinata',
        muscle: 'Petto',
        restSeconds: 75,
        targetRPE: 8.5,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 26, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 26, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-8',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 1,
    splitName: 'Split B (Mercoledì) - Dorso & Braccia',
    totalVolumeKg: 4950,
    durationMinutes: 54,
    completedAt: '2026-09-02T19:00:00.000Z',
    exercisesData: [
      {
        id: 'ex-6',
        name: 'Lat Machine Avanti Presa Larga',
        muscle: 'Dorso',
        restSeconds: 75,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 70, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 72.5, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-9',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 2,
    splitName: 'Split C (Venerdì) - Gambe & Addome',
    totalVolumeKg: 6400,
    durationMinutes: 59,
    completedAt: '2026-09-04T18:10:00.000Z',
    exercisesData: [
      {
        id: 'ex-3',
        name: 'Squat con Bilanciere',
        muscle: 'Gambe',
        restSeconds: 120,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 102.5, actualReps: 8, completed: true },
          { setNumber: 2, targetReps: 6, actualWeightKg: 105, actualReps: 6, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-10',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 0,
    splitName: 'Split A (Lunedì) - Petto & Spalle',
    totalVolumeKg: 4980,
    durationMinutes: 53,
    completedAt: '2026-09-07T18:30:00.000Z',
    exercisesData: [
      {
        id: 'ex-1',
        name: 'Panca Piana con Bilanciere',
        muscle: 'Petto',
        restSeconds: 90,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 8, actualWeightKg: 77.5, actualReps: 8, completed: true, feedbackTag: 'easy' },
          { setNumber: 2, targetReps: 6, actualWeightKg: 80, actualReps: 6, completed: true, feedbackTag: 'limit' },
          { setNumber: 3, targetReps: 6, actualWeightKg: 82.5, actualReps: 6, completed: true, feedbackTag: 'limit' }
        ]
      },
      {
        id: 'ex-2',
        name: 'Spinte Manubri su Panca Inclinata',
        muscle: 'Petto',
        restSeconds: 75,
        targetRPE: 8.5,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 28, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 28, actualReps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-hist-11',
    athleteId: 'ath-1',
    athleteName: 'Marco Rossi',
    routineId: 'routine-1',
    routineTitle: 'Protocollo Uomo Ipertrofia Spinta/Trazione/Gambe',
    splitIndex: 1,
    splitName: 'Split B (Mercoledì) - Dorso & Braccia',
    totalVolumeKg: 5120,
    durationMinutes: 51,
    completedAt: '2026-09-09T19:00:00.000Z',
    exercisesData: [
      {
        id: 'ex-6',
        name: 'Lat Machine Avanti Presa Larga',
        muscle: 'Dorso',
        restSeconds: 75,
        targetRPE: 8,
        sets: [
          { setNumber: 1, targetReps: 10, actualWeightKg: 72.5, actualReps: 10, completed: true },
          { setNumber: 2, targetReps: 8, actualWeightKg: 75, actualReps: 8, completed: true }
        ]
      }
    ]
  }
];
