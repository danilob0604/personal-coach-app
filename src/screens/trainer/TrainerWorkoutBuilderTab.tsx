import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { EXERCISE_CATALOG } from '../../data/mockData';
import type { ExerciseDefinition, WorkoutExercise, WorkoutRoutine, WorkoutSplit } from '../../types';
import { RoutineDetailModal } from '../../components/RoutineDetailModal';
import { ExerciseVideoModal } from '../../components/ExerciseVideoModal';
import { getMuscleGroupTheme } from '../../utils/muscleThemes';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  Save, 
  ArrowRight, 
  Dumbbell, 
  Search, 
  FolderKanban, 
  Edit3, 
  CheckCircle2, 
  Clock,
  Video,
  Calendar
} from 'lucide-react';
import { 
  translateRoutineTitle, 
  translateExerciseName, 
  translateMuscleName, 
  translateSplitName 
} from '../../i18n/translations';

export const TrainerWorkoutBuilderTab: React.FC = () => {
  const { 
    athletes, 
    masterTemplates, 
    saveAsMasterTemplate, 
    updateMasterTemplate,
    showToast, 
    t,
    language 
  } = useFitness();

  // Navigation mode: 'gallery' (visualizzazione schede create) vs 'create' (creazione nuova scheda)
  const [viewMode, setViewMode] = useState<'gallery' | 'create'>('gallery');

  // Modal for inspecting a single routine & assigning it to athletes
  const [modalRoutine, setModalRoutine] = useState<WorkoutRoutine | null>(null);

  // Gallery Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'donna' | 'uomo' | 'unisex'>('all');

  // Builder Routine State (for creating or editing)
  const [editingRoutineId, setEditingRoutineId] = useState<string | null>(null);
  const [routineTitle, setRoutineTitle] = useState('Protocollo Personalizzato Multi-Split');
  const [routineCategory, setRoutineCategory] = useState<'Spinta (Push)' | 'Tirata (Pull)' | 'Gambe (Legs)' | 'Full Body' | 'Upper' | 'Multisplit A-B-C' | 'Multisplit A-B'>('Multisplit A-B-C');
  const [targetGender, setTargetGender] = useState<'donna' | 'uomo' | 'unisex'>('donna');
  const [targetGoal, setTargetGoal] = useState('Ipertrofia Glutei, Catena Posteriore & Tono Upper Body');
  const [difficultyLevel, setDifficultyLevel] = useState<'Principiante' | 'Intermedio' | 'Avanzato'>('Intermedio');
  const [estimatedMinutes, setEstimatedMinutes] = useState(50);
  const [weeklyFrequency, setWeeklyFrequency] = useState<number>(3);

  // Split management state
  const [splits, setSplits] = useState<WorkoutSplit[]>([
    {
      id: 'split-builder-a',
      name: 'Split A (Lunedì)',
      targetMuscleGroup: 'Gambe, Glutei & Quad',
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
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-44166-large.mp4',
          trainerNotes: 'Fermo 2 secondi in massima estensione al soffitto. Spinta decisa con i talloni.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 75, suggestedReps: 12, actualWeightKg: 75, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 85, suggestedReps: 10, actualWeightKg: 85, actualReps: 10, completed: false },
            { setNumber: 3, suggestedWeightKg: 90, suggestedReps: 8, actualWeightKg: 90, actualReps: 8, completed: false, isPR: true }
          ]
        },
        {
          exerciseId: 'ex-5',
          name: 'Squat con Bilanciere',
          muscle: 'Gambe',
          restSeconds: 90,
          targetRPE: 8,
          tempo: '3-0-1-0',
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          trainerNotes: 'Profondità sotto il parallelo, petto fiero.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false },
            { setNumber: 2, suggestedWeightKg: 55, suggestedReps: 10, actualWeightKg: 55, actualReps: 10, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-builder-b',
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
          trainerNotes: 'Spalle basse, deprimi le scapole.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 35, suggestedReps: 12, actualWeightKg: 35, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 40, suggestedReps: 10, actualWeightKg: 40, actualReps: 10, completed: false }
          ]
        }
      ]
    },
    {
      id: 'split-builder-c',
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
          isCoachCustomVideo: true,
          coachVideoAuthor: 'Coach Alessandro',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-44166-large.mp4',
          trainerNotes: 'Bacino spinto indietro, allungamento controllato dei femorali.',
          sets: [
            { setNumber: 1, suggestedWeightKg: 18, suggestedReps: 12, actualWeightKg: 18, actualReps: 12, completed: false },
            { setNumber: 2, suggestedWeightKg: 20, suggestedReps: 10, actualWeightKg: 20, actualReps: 10, completed: false }
          ]
        }
      ]
    }
  ]);
  const [activeSplitIndex, setActiveSplitIndex] = useState(0);
  const [videoModalExercise, setVideoModalExercise] = useState<WorkoutExercise | null>(null);

  const [selectedMuscle, setSelectedMuscle] = useState<'Petto' | 'Dorso' | 'Spalle' | 'Gambe' | 'Braccia' | 'Core'>('Gambe');

  // Active split and its exercises
  const currentActiveSplit = splits[activeSplitIndex] || splits[0];
  const currentExercises = currentActiveSplit?.exercises || [];

  // Add a new split to the program (e.g. Split D)
  const handleAddNewSplit = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const letter = letters[splits.length] || `Giorno ${splits.length + 1}`;
    const newSplit: WorkoutSplit = {
      id: `split-${Date.now()}`,
      name: `Split ${letter}`,
      targetMuscleGroup: 'Nuovo Focus Muscolare',
      suggestedDayOfWeek: 'Sabato',
      estimatedMinutes: 50,
      exercises: []
    };
    setSplits(prev => [...prev, newSplit]);
    setActiveSplitIndex(splits.length);
    setWeeklyFrequency(splits.length + 1);
    showToast(`➕ Nuovo Split ${letter} aggiunto al protocollo!`);
  };

  // Remove a split
  const handleRemoveSplit = (splitIdx: number) => {
    if (splits.length <= 1) {
      showToast('⚠️ La scheda deve avere almeno 1 split o seduta.');
      return;
    }
    setSplits(prev => prev.filter((_, i) => i !== splitIdx));
    setActiveSplitIndex(Math.max(0, splitIdx - 1));
    setWeeklyFrequency(Math.max(1, splits.length - 1));
    showToast('🗑️ Split rimosso.');
  };

  // Update current split details
  const handleUpdateActiveSplit = (field: keyof WorkoutSplit, value: any) => {
    setSplits(prev => {
      const updated = [...prev];
      if (!updated[activeSplitIndex]) return prev;
      updated[activeSplitIndex] = {
        ...updated[activeSplitIndex],
        [field]: value
      };
      return updated;
    });
  };

  // Load an existing routine into Builder for editing
  const handleEditRoutine = (routine: WorkoutRoutine) => {
    setEditingRoutineId(routine.id);
    setRoutineTitle(routine.title);
    setRoutineCategory(routine.category);
    setTargetGender(routine.targetGender || 'unisex');
    setTargetGoal(routine.targetGoal || '');
    setDifficultyLevel(routine.difficultyLevel || 'Intermedio');
    setEstimatedMinutes(routine.estimatedMinutes || 50);
    setWeeklyFrequency(routine.weeklyFrequency || routine.splits?.length || 1);

    if (routine.splits && routine.splits.length > 0) {
      setSplits(routine.splits);
    } else {
      setSplits([
        {
          id: `split-${routine.id || 'single'}-1`,
          name: 'Seduta Singola',
          targetMuscleGroup: routine.category,
          suggestedDayOfWeek: 'Lunedì',
          estimatedMinutes: routine.estimatedMinutes || 50,
          exercises: routine.exercises || []
        }
      ]);
    }
    setActiveSplitIndex(0);
    setViewMode('create');
    showToast(`✏️ Modifica della scheda "${routine.title}" attiva.`);
  };

  // Reset builder for a brand new routine
  const handleStartNewRoutine = () => {
    setEditingRoutineId(null);
    setRoutineTitle('Nuovo Protocollo Personalizzato Multi-Split');
    setRoutineCategory('Multisplit A-B-C');
    setTargetGender('unisex');
    setTargetGoal('Ricomposizione corporea e progressione sui carichi');
    setDifficultyLevel('Intermedio');
    setEstimatedMinutes(50);
    setWeeklyFrequency(3);
    setSplits([
      {
        id: `split-${Date.now()}-a`,
        name: 'Split A (Lunedì)',
        targetMuscleGroup: 'Gambe & Glutei',
        suggestedDayOfWeek: 'Lunedì',
        estimatedMinutes: 50,
        exercises: [
          {
            exerciseId: 'ex-5',
            name: 'Squat con Bilanciere',
            muscle: 'Gambe',
            restSeconds: 90,
            targetRPE: 8,
            tempo: '3-0-1-0',
            isCoachCustomVideo: true,
            coachVideoAuthor: 'Coach Alessandro',
            trainerNotes: 'Piedi larghezza spalle, profondità sotto il parallelo.',
            sets: [
              { setNumber: 1, suggestedWeightKg: 60, suggestedReps: 10, actualWeightKg: 60, actualReps: 10, completed: false },
              { setNumber: 2, suggestedWeightKg: 70, suggestedReps: 8, actualWeightKg: 70, actualReps: 8, completed: false },
              { setNumber: 3, suggestedWeightKg: 75, suggestedReps: 8, actualWeightKg: 75, actualReps: 8, completed: false }
            ]
          }
        ]
      },
      {
        id: `split-${Date.now()}-b`,
        name: 'Split B (Mercoledì)',
        targetMuscleGroup: 'Tirata & Dorso',
        suggestedDayOfWeek: 'Mercoledì',
        estimatedMinutes: 45,
        exercises: []
      },
      {
        id: `split-${Date.now()}-c`,
        name: 'Split C (Venerdì)',
        targetMuscleGroup: 'Spinta & Braccia',
        suggestedDayOfWeek: 'Venerdì',
        estimatedMinutes: 45,
        exercises: []
      }
    ]);
    setActiveSplitIndex(0);
    setViewMode('create');
  };

  const addExerciseFromCatalog = (ex: ExerciseDefinition) => {
    const newEx: WorkoutExercise = {
      exerciseId: ex.id,
      name: ex.name,
      muscle: ex.muscle,
      restSeconds: ex.defaultRestSec,
      targetRPE: 8,
      tempo: '3-0-1-0',
      isCoachCustomVideo: true,
      coachVideoAuthor: 'Coach Alessandro',
      trainerNotes: ex.cues.join('. '),
      sets: [
        { setNumber: 1, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false },
        { setNumber: 2, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false },
        { setNumber: 3, suggestedWeightKg: 50, suggestedReps: 10, actualWeightKg: 50, actualReps: 10, completed: false }
      ]
    };
    setSplits(prev => {
      const updated = [...prev];
      if (!updated[activeSplitIndex]) return prev;
      const targetSplit = { ...updated[activeSplitIndex] };
      targetSplit.exercises = [...targetSplit.exercises, newEx];
      updated[activeSplitIndex] = targetSplit;
      return updated;
    });
    showToast(`✅ Esercizio "${ex.name}" inserito nello ${currentActiveSplit.name}!`);
  };

  const removeExercise = (index: number) => {
    setSplits(prev => {
      const updated = [...prev];
      if (!updated[activeSplitIndex]) return prev;
      const targetSplit = { ...updated[activeSplitIndex] };
      targetSplit.exercises = targetSplit.exercises.filter((_, i) => i !== index);
      updated[activeSplitIndex] = targetSplit;
      return updated;
    });
  };

  const addSetToExercise = (exIndex: number) => {
    setSplits(prev => {
      const updated = [...prev];
      if (!updated[activeSplitIndex]) return prev;
      const targetSplit = { ...updated[activeSplitIndex] };
      const exercises = [...targetSplit.exercises];
      const target = { ...exercises[exIndex] };
      const lastSet = target.sets[target.sets.length - 1];
      const newSetNumber = target.sets.length + 1;
      target.sets = [
        ...target.sets,
        {
          setNumber: newSetNumber,
          suggestedWeightKg: lastSet ? lastSet.suggestedWeightKg : 50,
          suggestedReps: lastSet ? lastSet.suggestedReps : 8,
          actualWeightKg: lastSet ? lastSet.suggestedWeightKg : 50,
          actualReps: lastSet ? lastSet.suggestedReps : 8,
          completed: false
        }
      ];
      exercises[exIndex] = target;
      targetSplit.exercises = exercises;
      updated[activeSplitIndex] = targetSplit;
      return updated;
    });
  };

  const updateSetValues = (exIndex: number, sIndex: number, field: 'suggestedWeightKg' | 'suggestedReps', value: number) => {
    setSplits(prev => {
      const updated = [...prev];
      if (!updated[activeSplitIndex]) return prev;
      const targetSplit = { ...updated[activeSplitIndex] };
      const exercises = [...targetSplit.exercises];
      const target = { ...exercises[exIndex] };
      const sets = [...target.sets];
      sets[sIndex] = {
        ...sets[sIndex],
        [field]: value,
        actualWeightKg: field === 'suggestedWeightKg' ? value : sets[sIndex].actualWeightKg,
        actualReps: field === 'suggestedReps' ? value : sets[sIndex].actualReps
      };
      target.sets = sets;
      exercises[exIndex] = target;
      targetSplit.exercises = exercises;
      updated[activeSplitIndex] = targetSplit;
      return updated;
    });
  };

  // Save routine into Master Library
  const handleSaveRoutine = (openAssignModalAfter = false) => {
    const totalProgramMinutes = splits.reduce((acc, s) => acc + (s.estimatedMinutes || 50), 0);
    const avgDuration = splits.length > 0 ? Math.round(totalProgramMinutes / splits.length) : estimatedMinutes;

    const routineObject: WorkoutRoutine = {
      id: editingRoutineId || `routine-${Date.now()}`,
      title: routineTitle,
      category: routineCategory,
      targetGender: targetGender,
      targetGoal: targetGoal,
      difficultyLevel: difficultyLevel,
      estimatedMinutes: avgDuration,
      weeklyFrequency: weeklyFrequency,
      activeSplitIndex: 0,
      splits: splits,
      exercises: splits[0]?.exercises || []
    };

    if (editingRoutineId) {
      updateMasterTemplate(routineObject);
    } else {
      saveAsMasterTemplate(routineObject);
    }

    if (openAssignModalAfter) {
      setModalRoutine(routineObject);
    } else {
      setViewMode('gallery');
    }
  };

  // Filtered routines in gallery
  const filteredRoutines = masterTemplates.filter(tmpl => {
    if (genderFilter !== 'all' && tmpl.targetGender !== genderFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      tmpl.title.toLowerCase().includes(q) ||
      (tmpl.targetGoal && tmpl.targetGoal.toLowerCase().includes(q)) ||
      tmpl.category.toLowerCase().includes(q) ||
      tmpl.exercises.some(e => e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q))
    );
  });

  const filteredCatalog = EXERCISE_CATALOG.filter(e => e.muscle === selectedMuscle);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Header & Tactical View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t.trainer.builder.hubTitle}
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-mono uppercase tracking-tight">
            {t.trainer.builder.hubSubtitle}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
            {t.trainer.builder.hubDesc}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('gallery')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>{t.trainer.builder.routinesCount} ({masterTemplates.length})</span>
          </button>

          <button
            onClick={handleStartNewRoutine}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === 'create'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.trainer.builder.newRoutineBtn}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: SCHEDE CREATE & MODELLI (GALLERIA & ASSEGNAZIONE)                 */}
      {/* ========================================================================= */}
      {viewMode === 'gallery' && (
        <div className="space-y-4 sm:space-y-5">
          {/* Search & Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.trainer.builder.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Gender / Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setGenderFilter('all')}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  genderFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {t.trainer.builder.filterAll} ({masterTemplates.length})
              </button>
              <button
                onClick={() => setGenderFilter('donna')}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  genderFilter === 'donna'
                    ? 'bg-rose-500 text-white shadow-sm font-black'
                    : 'bg-slate-100 text-slate-600 hover:text-rose-600 border border-slate-200'
                }`}
              >
                {t.trainer.builder.filterWomen}
              </button>
              <button
                onClick={() => setGenderFilter('uomo')}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  genderFilter === 'uomo'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'bg-slate-100 text-slate-600 hover:text-blue-600 border border-slate-200'
                }`}
              >
                {t.trainer.builder.filterMen}
              </button>
              <button
                onClick={() => setGenderFilter('unisex')}
                className={`px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  genderFilter === 'unisex'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'bg-slate-100 text-slate-600 hover:text-emerald-600 border border-slate-200'
                }`}
              >
                {t.trainer.builder.filterRecomp}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredRoutines.map((routine) => {
              const isDonna = routine.targetGender === 'donna';
              const isUomo = routine.targetGender === 'uomo';
              const primarySplit = routine.splits?.[0];
              const routineTheme = getMuscleGroupTheme(primarySplit?.targetMuscleGroup || routine.category || routine.title);

              // Find athletes who have this routine
              const assignedAthletes = athletes.filter(
                a => a.assignedRoutine?.title === routine.title || a.currentWorkoutPlan === routine.title
              );

              return (
                <div
                  key={routine.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-md hover:shadow-lg group"
                >
                  {/* Technogym Live Top Muscle Accent Stripe */}
                  <div className={`h-2 w-full ${routineTheme.lightStripe}`} />

                  <div className="p-5 space-y-4 flex-1">
                    <div className="space-y-3">
                      {/* Header Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md border flex items-center gap-1 ${
                            isDonna
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : isUomo
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <span>{routineTheme.icon}</span>
                          <span>
                            {isDonna
                              ? (language === 'it' ? '🌸 Focus Donna' : language === 'es' ? '🌸 Foco Mujer' : '🌸 Women Focus')
                              : isUomo
                              ? (language === 'it' ? '⚡ Focus Uomo' : language === 'es' ? '⚡ Foco Hombre' : '⚡ Men Focus')
                              : (language === 'it' ? '🌐 Recomp / Forza' : language === 'es' ? '🌐 Recomp / Fuerza' : '🌐 Recomp / Strength')}
                          </span>
                        </span>

                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          <Clock className="w-3 h-3 text-blue-600" /> {routine.estimatedMinutes || 50} MIN
                        </span>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-base font-black text-slate-900 uppercase font-mono group-hover:text-blue-600 transition-colors leading-snug">
                          {translateRoutineTitle(routine.title, language)}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5 font-bold">
                          {routine.category} • {language === 'it' ? 'Livello' : language === 'es' ? 'Nivel' : 'Level'}: {routine.difficultyLevel || (language === 'it' ? 'Intermedio' : language === 'es' ? 'Intermedio' : 'Intermediate')}
                        </span>
                      </div>

                      {/* Goal Description */}
                      {routine.targetGoal && (
                        <p className="text-xs text-slate-700 font-mono line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                          {routine.targetGoal}
                        </p>
                      )}

                      {/* Split Structure Pill */}
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-slate-700 font-bold">
                          {routine.weeklyFrequency || routine.splits?.length || 1}x / {language === 'it' ? 'sett.' : language === 'es' ? 'sem.' : 'wk'}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-blue-600 font-bold">
                          {routine.splits && routine.splits.length > 1
                            ? `${routine.splits.length} ${language === 'it' ? 'Split Programmati' : language === 'es' ? 'Divisiones Programadas' : 'Scheduled Splits'}`
                            : (language === 'it' ? 'Seduta Singola' : language === 'es' ? 'Sesión Única' : 'Single Session')}
                        </span>
                      </div>

                      {/* Splits breakdown summary */}
                      {routine.splits && routine.splits.length > 0 ? (
                        <div className="space-y-1.5 bg-slate-50/90 p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                            {t.trainer.builder.daysDetail} ({routine.splits.length}):
                          </span>
                          <div className="space-y-1.5">
                            {routine.splits.map((s, sIdx) => {
                              const sTheme = getMuscleGroupTheme(s.targetMuscleGroup || s.name);
                              return (
                                <div key={sIdx} className="flex items-center justify-between text-[11px] font-mono">
                                  <span className="text-slate-900 font-bold truncate flex items-center gap-1.5">
                                    <span>{sTheme.icon}</span>
                                    <span>{translateSplitName(s.name, language)}</span>
                                  </span>
                                  <span className={`text-[9px] truncate max-w-[140px] font-bold px-1.5 py-0.5 rounded border ${sTheme.badgeBg}`}>
                                    {translateMuscleName(s.targetMuscleGroup, language)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Exercises Summary fallback */
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                            {t.trainer.builder.includedExercises} ({routine.exercises.length}):
                          </span>
                          <div className="space-y-1 text-xs font-mono text-slate-700">
                            {routine.exercises.slice(0, 3).map((ex, exIdx) => {
                              const exTheme = getMuscleGroupTheme(ex.muscle);
                              return (
                                <div key={exIdx} className="flex items-center justify-between text-[11px] truncate">
                                  <span className="truncate font-medium flex items-center gap-1">
                                    <span>{exTheme.icon}</span>
                                    <span>{translateExerciseName(ex.name, language)}</span>
                                  </span>
                                  <span className="text-slate-400 shrink-0">{ex.sets.length} {t.trainer.builder.setCol.toLowerCase()}</span>
                                </div>
                              );
                            })}
                            {routine.exercises.length > 3 && (
                              <div className="text-[10px] text-slate-400 italic">
                                + {language === 'it' ? `altri ${routine.exercises.length - 3} esercizi...` : language === 'es' ? `otros ${routine.exercises.length - 3} ejercicios...` : `${routine.exercises.length - 3} more exercises...`}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Athletes Assignment Status + Action Button */}
                  <div className="pt-3.5 border-t border-slate-100 space-y-3">
                    {/* Who is assigned to this routine? */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{t.trainer.builder.assignedStatus}</span>
                      {assignedAthletes.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <div className="flex -space-x-2">
                            {assignedAthletes.map(a => (
                              <img
                                key={a.id}
                                src={a.avatar}
                                alt={a.name}
                                title={a.name}
                                className="w-5 h-5 rounded-full border-2 border-white shadow-xs object-cover"
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-blue-600 font-bold">
                            {assignedAthletes.map(a => a.name.split(' ')[0]).join(', ')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          {t.trainer.builder.notAssignedYet}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEditRoutine(routine)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{t.trainer.builder.editBtn}</span>
                      </button>

                      <button
                        onClick={() => setModalRoutine(routine)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                      >
                        <span>{t.trainer.builder.openAssignBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRoutines.length === 0 && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-3 shadow-sm">
              <Dumbbell className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-black text-slate-900 uppercase font-mono">
                {t.trainer.builder.noRoutinesFound}
              </h4>
              <p className="text-xs text-slate-500 font-mono max-w-sm mx-auto">
                {language === 'it' ? 'Nessun protocollo corrisponde ai filtri di ricerca selezionati.' : language === 'es' ? 'Ningún protocolo coincide con los filtros de búsqueda seleccionados.' : 'No protocols match the selected search filters.'}
              </p>
              <button
                onClick={handleStartNewRoutine}
                className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase cursor-pointer transition-all shadow-md shadow-blue-500/20"
              >
                {t.trainer.builder.createNowBtn}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: CREA / MODIFICA SCHEDA (WORKOUT BUILDER)                          */}
      {/* ========================================================================= */}
      {viewMode === 'create' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Return Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
            <button
              onClick={() => setViewMode('gallery')}
              className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t.trainer.builder.returnToGallery}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleSaveRoutine(false)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.trainer.builder.saveBtn}</span>
              </button>

              <button
                onClick={() => handleSaveRoutine(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{t.trainer.builder.saveAndAssignBtn}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left 2 Cols: Active Routine Form & Exercises */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-3.5 sm:space-y-4">
                {/* Title */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1.5 font-bold">
                    {t.trainer.builder.routineTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={routineTitle}
                    onChange={(e) => setRoutineTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono font-black text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                {/* Split Category, Target Gender, Target Goal, Difficulty, Duration, Frequency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
                  {/* Category */}
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                      {t.trainer.builder.categoryLabel}
                    </label>
                    <select
                      value={routineCategory}
                      onChange={(e) => setRoutineCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                    >
                      <option value="Multisplit A-B-C">Multisplit A-B-C</option>
                      <option value="Multisplit A-B">Multisplit A-B</option>
                      <option value="Gambe (Legs)">{language === 'it' ? 'Gambe (Legs)' : language === 'es' ? 'Piernas (Legs)' : 'Legs'}</option>
                      <option value="Spinta (Push)">{language === 'it' ? 'Spinta (Push)' : language === 'es' ? 'Empuje (Push)' : 'Push'}</option>
                      <option value="Tirata (Pull)">{language === 'it' ? 'Tirata (Pull)' : language === 'es' ? 'Tracción (Pull)' : 'Pull'}</option>
                      <option value="Full Body">Full Body</option>
                      <option value="Upper">Upper</option>
                    </select>
                  </div>

                  {/* Weekly Frequency */}
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                      {t.trainer.builder.weeklyFreqLabel}
                    </label>
                    <select
                      value={weeklyFrequency}
                      onChange={(e) => setWeeklyFrequency(parseInt(e.target.value) || 3)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                    >
                      <option value={1}>1x / {language === 'it' ? 'sett. (Seduta Singola)' : language === 'es' ? 'sem. (Sesión Única)' : 'wk (Single Session)'}</option>
                      <option value={2}>2x / {language === 'it' ? 'sett. (2 Split)' : language === 'es' ? 'sem. (2 Splits)' : 'wk (2 Splits)'}</option>
                      <option value={3}>3x / {language === 'it' ? 'sett. (3 Split)' : language === 'es' ? 'sem. (3 Splits)' : 'wk (3 Splits)'}</option>
                      <option value={4}>4x / {language === 'it' ? 'sett. (4 Split)' : language === 'es' ? 'sem. (4 Splits)' : 'wk (4 Splits)'}</option>
                      <option value={5}>5x / {language === 'it' ? 'sett. (5 Split)' : language === 'es' ? 'sem. (5 Splits)' : 'wk (5 Splits)'}</option>
                    </select>
                  </div>

                  {/* Target Gender */}
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                      {t.trainer.builder.targetAnatomyLabel}
                    </label>
                    <select
                      value={targetGender}
                      onChange={(e) => setTargetGender(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                    >
                      <option value="donna">{language === 'it' ? '🌸 Focus Donna' : language === 'es' ? '🌸 Foco Mujer' : '🌸 Women Focus'}</option>
                      <option value="uomo">{language === 'it' ? '⚡ Focus Uomo' : language === 'es' ? '⚡ Foco Hombre' : '⚡ Men Focus'}</option>
                      <option value="unisex">🌐 Unisex</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                      {t.trainer.builder.difficultyLabel}
                    </label>
                    <select
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                    >
                      <option value="Principiante">{language === 'it' ? 'Principiante' : language === 'es' ? 'Principiante' : 'Beginner'}</option>
                      <option value="Intermedio">{language === 'it' ? 'Intermedio' : language === 'es' ? 'Intermedio' : 'Intermediate'}</option>
                      <option value="Avanzato">{language === 'it' ? 'Avanzato' : language === 'es' ? 'Avanzado' : 'Advanced'}</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                      {t.trainer.builder.durationLabel}
                    </label>
                    <input
                      type="number"
                      value={estimatedMinutes}
                      onChange={(e) => setEstimatedMinutes(parseInt(e.target.value) || 45)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Target Goal Description */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                    {t.trainer.builder.targetGoalLabel}
                  </label>
                  <input
                    type="text"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    placeholder={language === 'it' ? "es. Ipertrofia glutei e tonificazione catena posteriore" : language === 'es' ? "ej. Hipertrofia de glúteos y tonificación de cadena posterior" : "e.g. Glute hypertrophy & posterior chain strengthening"}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* INTERACTIVE MULTI-SPLIT ARCHITECTURE MANAGER */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-[10px] font-mono text-blue-600 uppercase font-black tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {language === 'it' ? 'STRUTTURA SPLIT SETTIMANALI' : language === 'es' ? 'ESTRUCTURA DE DIVISIONES SEMANALES' : 'WEEKLY SPLIT STRUCTURE'} ({splits.length} {splits.length === 1 ? (language === 'it' ? 'SEDUTA' : language === 'es' ? 'SESIÓN' : 'SESSION') : 'SPLIT'})
                    </div>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                      {language === 'it' ? 'Organizza le giornate settimanali. Clicca su uno Split per compilarne gli esercizi dedicati.' : language === 'es' ? 'Organiza los días de la semana. Haz clic en un split para configurar sus ejercicios.' : 'Organize your weekly days. Click on a split to configure its dedicated exercises.'}
                    </span>
                  </div>

                  <button
                    onClick={handleAddNewSplit}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono font-black text-xs uppercase flex items-center gap-1.5 shadow-sm shadow-blue-600/20 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Aggiungi Split</span>
                  </button>
                </div>

                {/* Split Navigation Tabs */}
                <div className="flex flex-wrap gap-2">
                  {splits.map((split, sIdx) => {
                    const isSelected = activeSplitIndex === sIdx;
                    const sTheme = getMuscleGroupTheme(split.targetMuscleGroup || split.name);
                    return (
                      <button
                        key={split.id || sIdx}
                        onClick={() => setActiveSplitIndex(sIdx)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                          isSelected
                            ? `${sTheme.activeTabBg} border-transparent ring-2 ring-slate-900/10 scale-[1.02]`
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 shadow-xs'
                        }`}
                      >
                        <span>{sTheme.icon}</span>
                        <span>{split.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-lg font-mono font-bold ${
                          isSelected ? 'bg-white/20 text-white' : sTheme.badgeBg
                        }`}>
                          {split.exercises.length} ex
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Split Customization Bar */}
                {currentActiveSplit && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center shadow-xs">
                    <div>
                      <label className="text-[9px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                        Nome Split (es. Split A)
                      </label>
                      <input
                        type="text"
                        value={currentActiveSplit.name}
                        onChange={(e) => handleUpdateActiveSplit('name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                        Giorno Consigliato
                      </label>
                      <select
                        value={currentActiveSplit.suggestedDayOfWeek || 'Lunedì'}
                        onChange={(e) => handleUpdateActiveSplit('suggestedDayOfWeek', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                      >
                        {['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica', 'Flessibile'].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase text-slate-600 block mb-1 font-bold">
                        Focus Muscolare dello Split
                      </label>
                      <input
                        type="text"
                        value={currentActiveSplit.targetMuscleGroup}
                        onChange={(e) => handleUpdateActiveSplit('targetMuscleGroup', e.target.value)}
                        placeholder="es. Gambe & Glutei"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    {splits.length > 1 && (
                      <div className="sm:col-span-3 flex justify-end pt-1">
                        <button
                          onClick={() => handleRemoveSplit(activeSplitIndex)}
                          className="text-[11px] font-mono text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Elimina {currentActiveSplit.name}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Exercises in current active split */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-mono uppercase text-slate-600 font-bold">
                    {language === 'it' ? 'Esercizi in' : language === 'es' ? 'Ejercicios en' : 'Exercises in'} <strong className="text-slate-900">{translateSplitName(currentActiveSplit.name, language)}</strong> ({currentExercises.length})
                  </span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">
                    {language === 'it' ? 'Focus:' : language === 'es' ? 'Enfoque:' : 'Focus:'} {translateMuscleName(currentActiveSplit.targetMuscleGroup, language)}
                  </span>
                </div>

                {currentExercises.length === 0 && (
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-xs">
                    <p className="text-xs font-mono text-slate-600 font-bold">
                      {language === 'it' ? 'Nessun esercizio inserito per questo split.' : language === 'es' ? 'No se han añadido ejercicios a este split.' : 'No exercises added to this split yet.'}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      {language === 'it' ? 'Usa il catalogo a destra per aggiungere esercizi a' : language === 'es' ? 'Usa el catálogo a la derecha para añadir ejercicios a' : 'Use the library on the right to add exercises to'} <strong>{translateSplitName(currentActiveSplit.name, language)}</strong>.
                    </p>
                  </div>
                )}

                {currentExercises.map((ex, exIdx) => {
                  const exTheme = getMuscleGroupTheme(ex.muscle || ex.name);

                  return (
                    <div
                      key={exIdx}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Technogym Live Muscle Accent Stripe */}
                      <div className={`h-1.5 w-full ${exTheme.lightStripe}`} />

                      <div className="p-5 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-mono font-black text-xs shadow-xs ${exTheme.lightStripe}`}>
                              0{exIdx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{translateExerciseName(ex.name, language)}</h4>
                                <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${exTheme.badgeBg}`}>
                                  <span>{exTheme.icon}</span>
                                  <span>{translateMuscleName(ex.muscle, language)}</span>
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-medium mt-0.5 block">
                                {t.trainer.builder.restLabel} {ex.restSeconds}S
                                {ex.tempo ? ` • TEMPO ${ex.tempo}` : ''}
                              </span>
                            </div>
                          </div>

                      <div className="flex items-center gap-2">
                        {/* Video Preview / Edit Button */}
                        <button
                          onClick={() => setVideoModalExercise(ex)}
                          className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase flex items-center gap-1.5 border transition-all cursor-pointer ${
                            ex.isCoachCustomVideo
                              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 shadow-xs'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Video"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>{ex.isCoachCustomVideo ? (language === 'it' ? '📹 Video del Coach' : language === 'es' ? '📹 Video del Coach' : '📹 Coach Video') : (language === 'it' ? '📹 Video Guida' : language === 'es' ? '📹 Video Guía' : '📹 Video Guide')}</span>
                        </button>

                        <button
                          onClick={() => removeExercise(exIdx)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Sets Table with editable target load and reps */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono text-left">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-100 pb-2">
                            <th className="py-1 uppercase text-[10px] font-bold">{t.trainer.builder.setCol}</th>
                            <th className="py-1 uppercase text-[10px] font-bold">{t.trainer.builder.loadCol} (KG)</th>
                            <th className="py-1 uppercase text-[10px] font-bold">{t.trainer.builder.repsCol}</th>
                            <th className="py-1 uppercase text-[10px] text-right font-bold">{language === 'it' ? 'RECORD' : language === 'es' ? 'RÉCORD' : 'RECORD'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {ex.sets.map((set, sIdx) => (
                            <tr key={sIdx} className="text-slate-800">
                              <td className="py-2 text-slate-500 font-bold">{t.trainer.builder.setCol} {set.setNumber}</td>
                              <td className="py-2">
                                <input
                                  type="number"
                                  value={set.suggestedWeightKg}
                                  onChange={(e) => updateSetValues(exIdx, sIdx, 'suggestedWeightKg', parseFloat(e.target.value) || 0)}
                                  className="w-16 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-900 font-mono font-black text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                                /> <span className="text-blue-600 font-bold">KG</span>
                              </td>
                              <td className="py-2">
                                <input
                                  type="number"
                                  value={set.suggestedReps}
                                  onChange={(e) => updateSetValues(exIdx, sIdx, 'suggestedReps', parseInt(e.target.value) || 0)}
                                  className="w-14 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-900 font-mono font-black text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                                /> <span className="text-slate-500">{language === 'it' ? 'RIP.' : language === 'es' ? 'REPS' : 'REPS'}</span>
                              </td>
                              <td className="py-2 text-right">
                                {set.isPR ? (
                                  <span className="text-[9px] font-mono uppercase bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-black border border-rose-200">
                                    🏆 {language === 'it' ? 'RECORD' : language === 'es' ? 'RÉCORD' : 'RECORD'}
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200 font-medium">
                                    STANDARD
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => addSetToExercise(exIdx)}
                        className="flex items-center gap-1.5 text-xs font-mono text-blue-600 hover:underline font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.trainer.builder.addSet}</span>
                      </button>
                      <span className="text-[11px] text-slate-500 font-mono truncate max-w-sm font-medium">
                        {ex.trainerNotes}
                      </span>
                    </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Right 1 Col: Exercise Library */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col h-[700px] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900">
                    {t.trainer.builder.exerciseDb}
                  </h3>
                </div>
                <Dumbbell className="w-4 h-4 text-slate-400" />
              </div>

              {/* Muscle Category Chips */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {(['Petto', 'Dorso', 'Spalle', 'Gambe', 'Braccia', 'Core'] as const).map((m) => {
                  const chipTheme = getMuscleGroupTheme(m);
                  const isChipSelected = selectedMuscle === m;
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedMuscle(m)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 border ${
                        isChipSelected
                          ? `${chipTheme.activeTabBg} border-transparent scale-105`
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                      }`}
                    >
                      <span>{chipTheme.icon}</span>
                      <span>{translateMuscleName(m, language)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Exercise Items List */}
              <div className="overflow-y-auto flex-1 space-y-2 pr-1">
                {filteredCatalog.map((ex) => {
                  const exTheme = getMuscleGroupTheme(ex.muscle);
                  return (
                    <div
                      key={ex.id}
                      className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-slate-300 hover:bg-white flex items-center justify-between gap-2 transition-all shadow-xs"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="text-xs font-bold text-slate-900 uppercase truncate">{translateExerciseName(ex.name, language)}</h5>
                          <span className={`text-[8px] font-mono uppercase font-bold px-1 rounded border shrink-0 ${exTheme.badgeBg}`}>
                            {exTheme.icon} {translateMuscleName(ex.muscle, language)}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 block mt-0.5">REST: {ex.defaultRestSec}S</span>
                        <div className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                          {ex.cues[0]}
                        </div>
                      </div>
                      <button
                        onClick={() => addExerciseFromCatalog(ex)}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 transition-all shrink-0 cursor-pointer shadow-xs"
                        title={language === 'it' ? "Aggiungi allo split" : language === 'es' ? "Añadir al split" : "Add to split"}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ROUTINE DETAIL & TARGETED ASSIGNMENT MODAL                                */}
      {/* ========================================================================= */}
      {modalRoutine && (
        <RoutineDetailModal
          routine={modalRoutine}
          onClose={() => setModalRoutine(null)}
          onEditInBuilder={(r) => handleEditRoutine(r)}
        />
      )}

      {/* Coach Video & Technique Breakdown Modal */}
      {videoModalExercise && (
        <ExerciseVideoModal
          exercise={videoModalExercise}
          onClose={() => setVideoModalExercise(null)}
        />
      )}
    </div>
  );
};
