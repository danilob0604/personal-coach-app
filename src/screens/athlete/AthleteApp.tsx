import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { 
  Play, 
  Check, 
  Trophy, 
  Flame, 
  Video, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  Zap, 
  Dumbbell,
  Scale,
  TrendingDown,
  TrendingUp,
  Activity,
  Plus,
  Minus,
  Sparkles,
  Calendar,
  Droplets,
  Moon,
  Shield,
  Crown,
  X,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { WorkoutExercise } from '../../types';
import { ExerciseVideoModal } from '../../components/ExerciseVideoModal';
import { PlateCalculatorModal } from '../../components/PlateCalculatorModal';
import { SetFeedbackModal, type SetFeedbackTag } from '../../components/SetFeedbackModal';
import { getMuscleGroupTheme } from '../../utils/muscleThemes';
import { 
  translateExerciseName, 
  translateMuscleName, 
  translateRoutineTitle, 
  translateSplitName, 
  translateTrainerNotes 
} from '../../i18n/translations';

export const AthleteApp: React.FC = () => {
  const { 
    activeWorkout, 
    setActiveSplit,
    toggleSetComplete, 
    updateSetValues, 
    setSetFeedback,
    finishWorkout, 
    isWorkoutFinished, 
    setIsWorkoutFinished, 
    chatMessages, 
    sendChatMessage,
    athletes,
    activeAthleteId,
    setActiveAthleteId,
    activeAthlete,
    addBiaRecord,
    showToast,
    restTimer,
    dismissRestTimer,
    addRestTimerSeconds,
    setIsSettingsModalOpen,
    language,
    t 
  } = useFitness();

  const athlete = activeAthlete || athletes.find(a => a.id === activeAthleteId) || athletes[0];

  const [inWorkoutSession, setInWorkoutSession] = useState(false);
  const [activeTab, setActiveTab] = useState<'workout' | 'checkin' | 'chat'>('workout');
  const [chatInput, setChatInput] = useState('');
  const [videoModalExercise, setVideoModalExercise] = useState<WorkoutExercise | null>(null);
  const [isTimerMinimized, setIsTimerMinimized] = useState(false);

  // Plate Calculator Modal state
  const [plateModal, setPlateModal] = useState<{
    isOpen: boolean;
    targetWeightKg: number;
    exerciseName: string;
  } | null>(null);

  // Set Feedback & Pain Alert Modal state
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    exerciseIndex: number;
    setIndex: number;
    exerciseName: string;
    setNumber: number;
    currentTag?: SetFeedbackTag;
    currentNote?: string;
  } | null>(null);

  // Self Check-in Form state
  const [prevAthleteId, setPrevAthleteId] = useState(athlete?.id);
  const [checkinWeight, setCheckinWeight] = useState<number>(athlete?.weightKg || 74.8);
  const [checkinWaist, setCheckinWaist] = useState<number>(81);
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [sleepQuality, setSleepQuality] = useState<string>('Ottimo (7-8 ore)');
  const [waterIntake, setWaterIntake] = useState<string>('3L Ottimale');
  const [checkinNotes, setCheckinNotes] = useState<string>('');

  // Sync checkin default weight during render when switching athletes
  if (athlete && athlete.id !== prevAthleteId) {
    setPrevAthleteId(athlete.id);
    setCheckinWeight(athlete.weightKg);
  }

  // Deltas from BIA history
  const biaList = athlete?.bodyCompositionHistory || [];
  const latestBia = biaList[0];
  const initialBia = biaList[biaList.length - 1];

  const deltaWeight = latestBia && initialBia ? (latestBia.weightKg - initialBia.weightKg).toFixed(1) : '0';
  const deltaFatKg = latestBia && initialBia ? (latestBia.fatMassKg - initialBia.fatMassKg).toFixed(1) : '0';
  const deltaMuscleKg = latestBia && initialBia ? (latestBia.muscleMassKg - initialBia.muscleMassKg).toFixed(1) : '0';
  const strength = athlete?.strengthMetrics;

  const handleAthleteCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athlete) return;

    const w = checkinWeight || athlete.weightKg;
    const lastFatPct = latestBia?.fatMassPercent ?? (athlete.bodyFatPercent || 15.1);
    const fatKg = parseFloat(((w * lastFatPct) / 100).toFixed(1));
    const muscleKg = latestBia?.muscleMassKg || 35.5;

    addBiaRecord(athlete.id, {
      date: 'Oggi (Self Check-in)',
      source: 'athlete_self_check',
      weightKg: w,
      fatMassPercent: lastFatPct,
      fatMassKg: fatKg,
      muscleMassKg: muscleKg,
      totalBodyWaterPercent: latestBia?.totalBodyWaterPercent || 58.5,
      visceralFatRating: latestBia?.visceralFatRating || 4,
      basalMetabolicRateKcal: latestBia?.basalMetabolicRateKcal || 1810,
      waistCircumferenceCm: checkinWaist,
      notes: `Check-in Atleta: Livello Energia ${energyLevel}/5, Sonno: ${sleepQuality}, Idratazione: ${waterIntake}.${checkinNotes ? ` Note: "${checkinNotes}"` : ''}`
    });

    setCheckinNotes('');
    showToast(t.athlete.checkinSuccessToast);
  };

  // Total sets calculation
  const totalSets = activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = activeWorkout.exercises.reduce(
    (acc, ex) => acc + ex.sets.filter(s => s.completed).length, 
    0
  );
  const progressPercent = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  const handleSendVideoCheck = () => {
    const firstExName = activeWorkout.exercises[0]?.name || 'Squat';
    sendChatMessage(`Ecco il video della serie pesante su ${firstExName} come concordato! Come ti sembra la profondità e l'assetto?`, true);
    setActiveTab('chat');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-4 py-1.5 sm:py-4 space-y-2 sm:space-y-3.5">
      {/* Unified Compact Athletic Header: Profile, Level, Switcher & Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xs space-y-2.5">
        {/* Top Profile Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={athlete?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={athlete?.name || 'Profilo Atleta'}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-blue-600 p-0.5 shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-blue-700 font-black px-1.5 py-0.2 rounded bg-blue-50 border border-blue-200">
                  {t.athlete.levelLabel} {athlete?.athleticLevel || 7}
                </span>
                <span className="text-amber-600 font-mono font-bold flex items-center gap-0.5 text-[10px]">
                  <Flame className="w-3 h-3 fill-current" /> {t.athlete.streakBadge}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase italic tracking-tight truncate">
                {athlete?.name || 'Marco Rossi'}
              </h2>
            </div>
          </div>

          {/* Quick Athlete Switcher (Compact) */}
          <div className="flex items-center gap-1 shrink-0">
            <select
              value={activeAthleteId}
              onChange={(e) => setActiveAthleteId(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 font-mono font-bold text-[10px] sm:text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs max-w-[120px] sm:max-w-none"
            >
              {athletes.filter(a => a.status !== 'archived').map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors cursor-pointer shadow-xs"
              title="Impostazioni di Sistema"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Switcher: Workout vs Check-in vs Coach Chat */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg sm:rounded-xl border border-slate-200 gap-1">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs ${
              activeTab === 'workout'
                ? 'bg-white text-blue-600 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Workout Tracker"
          >
            <Dumbbell className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="font-mono uppercase font-bold text-[11px]">{t.athlete.routineTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs ${
              activeTab === 'checkin'
                ? 'bg-white text-blue-600 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Check-in Corporeo & BIA"
          >
            <Scale className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="font-mono uppercase font-bold text-[11px]">{t.athlete.checkinTab}</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs ${
              activeTab === 'chat'
                ? 'bg-white text-blue-600 font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Chat con il Coach"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="font-mono uppercase font-bold text-[11px]">{t.athlete.coachTab}</span>
          </button>
        </div>

        {/* Micro XP Progress Line */}
        <div className="pt-0.5">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1 font-bold">
            <span className="text-slate-600">⚡ {t.athlete.expLabel}: {athlete?.currentXp || 740} / {athlete?.nextLevelXp || 1000} {t.athlete.pointsLabel}</span>
            <span className="text-blue-600 font-black">{Math.round(((athlete?.currentXp || 740) / (athlete?.nextLevelXp || 1000)) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round(((athlete?.currentXp || 740) / (athlete?.nextLevelXp || 1000)) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Tab: WORKOUT */}
      {activeTab === 'workout' && (
        <>
          {/* If Not in Active Workout Mode: High-Impact Protocol Hero */}
          {!inWorkoutSession ? (
            <div className="space-y-2 sm:space-y-3.5">
              {/* Anabolic Growth Status Banner */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-blue-700 font-black flex items-center gap-1 truncate">
                      {t.athlete.anabolicState.replace('{val}', parseFloat(deltaMuscleKg) > 0 ? deltaMuscleKg : '1.2')}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-700 font-medium truncate">
                      {strength?.topLifts && strength.topLifts[0] ? (
                        <>{t.athlete.progressiveOverloadOn} <strong className="text-slate-900">{translateExerciseName(strength.topLifts[0].exerciseName, language)}</strong> ({strength.topLifts[0].currentMaxKg} kg)!</>
                      ) : (
                        `${t.athlete.sessionText} ${translateRoutineTitle(activeWorkout.title, language)}`
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('checkin')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono uppercase font-bold cursor-pointer transition-colors shadow-xs shrink-0"
                >
                  {t.athlete.radarBtn}
                </button>
              </div>

              {/* Technogym Live Workout Protocol Card */}
              {(() => {
                const currentSplit = activeWorkout.splits && activeWorkout.splits[activeWorkout.activeSplitIndex ?? 0];
                const currentSplitTheme = getMuscleGroupTheme(currentSplit?.targetMuscleGroup || activeWorkout.title, language);

                return (
                  <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 shadow-xs space-y-0">
                    {/* Muscle Group Top Glow Stripe */}
                    <div className={`h-2 w-full ${currentSplitTheme.lightStripe}`} />

                    <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between relative z-10">
                        <span className={`text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${currentSplitTheme.badgeBg}`}>
                          <span>{currentSplitTheme.icon}</span>
                          <span>{t.athlete.todayProtocol} • {currentSplitTheme.name}</span>
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          ⏱ {activeWorkout.estimatedMinutes} MIN
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-lg sm:text-2xl font-black italic tracking-tighter uppercase text-slate-900 leading-tight">
                          {translateRoutineTitle(activeWorkout.title, language)}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                          {t.athlete.activeProtocolDescription}
                        </p>
                      </div>

                      {/* MULTI-SPLIT SELECTION BAR (SCORREVOLE SU SMARTPHONE) */}
                      {activeWorkout.splits && activeWorkout.splits.length > 1 && (
                        <div className="bg-slate-100/80 border border-slate-200 rounded-lg sm:rounded-xl p-2 sm:p-2.5 space-y-1 relative z-10">
                          <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase text-slate-500 px-0.5">
                            <span className="flex items-center gap-1 text-slate-800 font-black">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              {t.athlete.splitSelection}
                            </span>
                            <span className="text-blue-600 font-bold sm:hidden flex items-center gap-0.5 text-[8px]">
                              {t.athlete.swipe}
                            </span>
                            <span className="text-slate-600 hidden sm:inline">{activeWorkout.weeklyFrequency || activeWorkout.splits.length}{t.athlete.weeklyFreq}</span>
                          </div>

                          {/* Scrollable track on mobile, grid on tablet/desktop */}
                          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 sm:grid sm:grid-cols-3 sm:gap-2.5 scroll-smooth">
                            {activeWorkout.splits.map((split, sIdx) => {
                              const isSelected = (activeWorkout.activeSplitIndex ?? 0) === sIdx;
                              const splitTheme = getMuscleGroupTheme(split.targetMuscleGroup || split.name, language);
                              return (
                                <button
                                  key={split.id || sIdx}
                                  onClick={() => setActiveSplit(sIdx)}
                                  className={`min-w-[160px] sm:min-w-0 flex-1 shrink-0 p-2 sm:p-2.5 rounded-lg text-left font-mono transition-all cursor-pointer border relative overflow-hidden ${
                                    isSelected
                                      ? `${splitTheme.activeTabBg} border-transparent ring-2 ring-slate-900/10 scale-[1.01] shadow-xs`
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm">{splitTheme.icon}</span>
                                    <span className={`text-[8px] uppercase font-mono font-bold px-1.5 py-0.2 rounded border ${
                                      isSelected ? 'bg-white/20 text-white border-white/30' : splitTheme.badgeBg
                                    }`}>
                                      {splitTheme.name}
                                    </span>
                                  </div>
                                  <div className="text-xs uppercase font-black tracking-tight truncate">{translateSplitName(split.name, language)}</div>
                                  <div className={`text-[9px] truncate mt-0.5 font-medium ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                                    {split.exercises.length} {t.athlete.exercises}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* THE 1-TAP GIANT TACTICAL START BUTTON (Prominent & immediately reachable) */}
                      <button
                        onClick={() => setInWorkoutSession(true)}
                        className={`w-full py-3.5 sm:py-4 rounded-xl text-white font-black text-xs sm:text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all relative z-10 cursor-pointer ${currentSplitTheme.lightStripe}`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{t.athlete.initWorkout}</span>
                      </button>

                      {/* Exercises preview cards */}
                      <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-100 relative z-10">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500 px-0.5 font-bold">
                          <span>
                            {t.athlete.scheduledExercises} ({activeWorkout.exercises.length}):
                          </span>
                          {activeWorkout.splits && activeWorkout.splits[activeWorkout.activeSplitIndex || 0] && (
                            <span className={`font-bold px-1.5 py-0.2 rounded text-[9px] flex items-center gap-1 border ${currentSplitTheme.badgeBg}`}>
                              <span>{currentSplitTheme.icon}</span>
                              <span>{translateMuscleName(activeWorkout.splits[activeWorkout.activeSplitIndex || 0].targetMuscleGroup, language)}</span>
                            </span>
                          )}
                        </div>
                        {activeWorkout.exercises.map((ex, idx) => {
                          const exTheme = getMuscleGroupTheme(ex.muscle || ex.name, language);
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs bg-slate-50/90 hover:bg-white py-1.5 px-2.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 transition-all shadow-xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-black text-[10px] text-white shadow-xs shrink-0 ${exTheme.lightStripe}`}>
                                  {idx + 1}
                                </span>
                                <div className="min-w-0">
                                  <span className="font-bold text-slate-900 block text-xs truncate">{translateExerciseName(ex.name, language)}</span>
                                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                                    <span className={`uppercase font-bold px-1 py-0.2 rounded border ${exTheme.badgeBg}`}>
                                      {translateMuscleName(ex.muscle, language)}
                                    </span>
                                    <span>• {ex.sets.length} {t.athlete.sets}</span>
                                    {ex.tempo && <span>• {ex.tempo}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => setVideoModalExercise(ex)}
                                  className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-black uppercase flex items-center gap-1 border transition-all cursor-pointer ${
                                    ex.isCoachCustomVideo
                                      ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                  }`}
                                  title={ex.isCoachCustomVideo ? 'Video Coach' : t.athlete.videoGuide}
                                >
                                  <Video className="w-3 h-3" />
                                  <span>{ex.isCoachCustomVideo ? 'Coach' : t.athlete.videoGuide}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Fast video check banner */}
              <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200 shadow-xs shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider truncate">{t.athlete.postureCardTitle}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{t.athlete.postureCardDesc}</p>
                  </div>
                </div>
                <button
                  onClick={handleSendVideoCheck}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  {t.athlete.recVideoBtn}
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE WORKOUT SESSION TRACKER (COMPACT & MOBILE-FIRST) */
            <div className={`space-y-2 sm:space-y-3.5 ${restTimer.active && restTimer.remaining > 0 ? 'pb-36' : ''}`}>
              {/* Sticky Top Session Progress HUD */}
              <div className="bg-white/95 border border-slate-200 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 backdrop-blur-md sticky top-[46px] sm:top-14 z-30 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => setInWorkoutSession(false)}
                      className="p-1 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 cursor-pointer shadow-xs shrink-0"
                      title="Pausa allenamento"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-tight block truncate max-w-[150px] sm:max-w-xs">
                        {activeWorkout.title}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block truncate">
                        {activeWorkout.splits?.[activeWorkout.activeSplitIndex || 0]?.name || t.athlete.sessionRecording}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black font-mono text-blue-600">
                      {completedSets}/{totalSets} {t.athlete.setLabel}
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono">{progressPercent}% {t.athlete.doneRatio}</div>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Exercises List with High Information Density */}
              <div className="space-y-2 sm:space-y-3.5">
                {activeWorkout.exercises.map((exercise, exIndex) => {
                  const exTheme = getMuscleGroupTheme(exercise.muscle || exercise.name, language);
                  const lift = strength?.topLifts?.find(l => 
                    exercise.name.toLowerCase().includes('panca') && l.exerciseName.toLowerCase().includes('panca') ||
                    exercise.name.toLowerCase().includes('inclinata') && l.exerciseName.toLowerCase().includes('inclinata') ||
                    exercise.name.toLowerCase().includes('military') && l.exerciseName.toLowerCase().includes('military')
                  );

                  const isExerciseCompleted = exercise.sets.length > 0 && exercise.sets.every(s => s.completed);

                  return (
                    <div
                      key={exercise.exerciseId}
                      className={`bg-white border rounded-xl sm:rounded-2xl overflow-hidden shadow-xs space-y-0 transition-all ${
                        isExerciseCompleted 
                          ? 'border-emerald-400 ring-1 ring-emerald-400/30 shadow-emerald-500/10' 
                          : 'border-slate-200'
                      }`}
                    >
                      {/* Technogym Live Muscle Top Stripe */}
                      <div className={`h-1.5 w-full ${isExerciseCompleted ? 'bg-emerald-500' : exTheme.lightStripe}`} />

                      <div className="p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5">
                        {/* Exercise Header */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-black text-[10px] shrink-0 shadow-xs ${
                                isExerciseCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                              }`}>
                                0{exIndex + 1}
                              </span>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight truncate">{translateExerciseName(exercise.name, language)}</h4>
                                <span className={`text-[8px] sm:text-[9px] font-mono uppercase font-black px-1.5 py-0.2 rounded border shrink-0 ${exTheme.badgeBg}`}>
                                  {translateMuscleName(exercise.muscle, language)}
                                </span>
                                {isExerciseCompleted && (
                                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-0.5 shrink-0 shadow-xs">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    <span>{language === 'it' ? 'VALIDATO' : language === 'es' ? 'VALIDADO' : 'VALIDATED'}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Coach Video Trigger */}
                            <button
                              onClick={() => setVideoModalExercise(exercise)}
                              className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-black uppercase flex items-center gap-1 border transition-all cursor-pointer shrink-0 ${
                                exercise.isCoachCustomVideo
                                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 shadow-xs'
                                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 shadow-xs'
                              }`}
                            >
                              <Video className="w-3 h-3" />
                              <span>{exercise.isCoachCustomVideo ? 'Coach' : t.athlete.videoGuide}</span>
                            </button>
                          </div>

                          <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider font-medium">
                            {t.athlete.recoveryLabel} {exercise.restSeconds || athlete?.defaultRestSeconds || 90} SEC • {t.athlete.rpeLabel} {exercise.targetRPE || 8}
                            {exercise.tempo ? ` • TEMPO ${exercise.tempo}` : ''}
                          </div>

                          {/* Unified Strength Gain & Coach Cue Strip (Compact) */}
                          {(lift || exercise.trainerNotes) && (
                            <div className="bg-slate-50/90 border border-slate-200/90 rounded-lg p-1.5 text-xs space-y-0.5 mt-1">
                              {lift && (
                                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-blue-700 font-bold truncate">
                                  <TrendingUp className="w-3 h-3 text-blue-600 shrink-0" />
                                  <span>{t.athlete.strengthGain}: +{lift.deltaKg} KG ({t.athlete.maxLift}: {lift.currentMaxKg} kg)</span>
                                </div>
                              )}
                              {exercise.trainerNotes && (
                                <div className="flex items-start gap-1 text-[10px] sm:text-[11px] text-slate-600 font-medium">
                                  <Zap className="w-3 h-3 text-blue-600 shrink-0 mt-0.5 fill-current" />
                                  <span><strong className="text-blue-700 font-mono text-[9px] uppercase">{t.athlete.coachBadge}:</strong> {translateTrainerNotes(exercise.trainerNotes, language)}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Sets List with Biostrength High-Contrast Console Inputs */}
                        <div className="space-y-1 sm:space-y-1.5">
                          {exercise.sets.map((set, setIndex) => (
                            <div
                              key={set.setNumber}
                              className={`flex items-center justify-between py-1 px-1.5 sm:p-2.5 rounded-lg border transition-all ${
                                set.completed
                                  ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {/* Set number & Record badge */}
                              <div className="flex items-center gap-1 w-14 sm:w-16 shrink-0">
                                <span className="text-[10px] sm:text-xs font-mono font-black text-slate-700">
                                  {t.athlete.setLabel} {set.setNumber}
                                </span>
                                {set.isPR && (
                                  <span className="text-[8px] font-mono font-black uppercase text-rose-600" title={t.athlete.prTarget}>
                                    🔥
                                  </span>
                                )}
                              </div>

                              {/* Console Inputs (High contrast dark pods) */}
                              <div className="flex items-center gap-1 sm:gap-1.5">
                                <div className={`flex items-center gap-1 text-white px-1.5 sm:px-2 py-1 rounded-md border shadow-xs ${
                                  set.completed ? 'bg-slate-950 border-emerald-500/40' : 'bg-slate-900 border-slate-800'
                                }`}>
                                  <input
                                    type="number"
                                    value={set.actualWeightKg}
                                    readOnly={set.completed}
                                    onChange={(e) =>
                                      !set.completed &&
                                      updateSetValues(
                                        exIndex,
                                        setIndex,
                                        parseFloat(e.target.value) || 0,
                                        set.actualReps
                                      )
                                    }
                                    className={`w-9 sm:w-11 bg-transparent text-right font-mono font-black text-xs sm:text-sm focus:outline-none ${
                                      set.completed ? 'text-emerald-400 cursor-default select-none' : 'text-white'
                                    }`}
                                  />
                                  <span className="text-[8px] sm:text-[9px] text-amber-400 font-mono font-black">KG</span>
                                </div>

                                {/* Plate Calculator Barbell Button */}
                                <button
                                  type="button"
                                  onClick={() => setPlateModal({
                                    isOpen: true,
                                    targetWeightKg: set.actualWeightKg,
                                    exerciseName: exercise.name
                                  })}
                                  className="p-1 sm:p-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors cursor-pointer shadow-xs shrink-0"
                                  title="Calcola dischi per bilanciere"
                                >
                                  <Dumbbell className="w-3 h-3" />
                                </button>

                                <span className="text-slate-400 font-mono text-xs font-black">×</span>

                                <div className={`flex items-center gap-1 text-white px-1.5 sm:px-2 py-1 rounded-md border shadow-xs ${
                                  set.completed ? 'bg-slate-950 border-emerald-500/40' : 'bg-slate-900 border-slate-800'
                                }`}>
                                  <input
                                    type="number"
                                    value={set.actualReps}
                                    readOnly={set.completed}
                                    onChange={(e) =>
                                      !set.completed &&
                                      updateSetValues(
                                        exIndex,
                                        setIndex,
                                        set.actualWeightKg,
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                    className={`w-7 sm:w-8 bg-transparent text-center font-mono font-black text-xs sm:text-sm focus:outline-none ${
                                      set.completed ? 'text-emerald-400 cursor-default select-none' : 'text-white'
                                    }`}
                                  />
                                  <span className="text-[8px] sm:text-[9px] text-cyan-400 font-mono font-black">{t.athlete.repsAbbr}</span>
                                </div>

                                {/* Sensation / Pain Alert Memo Button */}
                                <button
                                  type="button"
                                  onClick={() => setFeedbackModal({
                                    isOpen: true,
                                    exerciseIndex: exIndex,
                                    setIndex,
                                    exerciseName: exercise.name,
                                    setNumber: set.setNumber,
                                    currentTag: set.feedbackTag,
                                    currentNote: set.feedbackNote
                                  })}
                                  className={`p-1 sm:p-1.5 rounded-md border transition-all cursor-pointer shadow-xs shrink-0 ${
                                    set.feedbackTag === 'pain'
                                      ? 'bg-rose-500/20 text-rose-600 border-rose-400 ring-1 ring-rose-400/30 animate-pulse'
                                      : set.feedbackTag === 'limit'
                                      ? 'bg-amber-500/20 text-amber-600 border-amber-400'
                                      : set.feedbackTag === 'easy'
                                      ? 'bg-emerald-500/20 text-emerald-600 border-emerald-400'
                                      : 'bg-white hover:bg-slate-100 text-slate-400 border-slate-300'
                                  }`}
                                  title={set.feedbackTag ? `Sensazione: ${set.feedbackTag}` : "Aggiungi sensazione / segnala fastidio"}
                                >
                                  {set.feedbackTag === 'pain' ? (
                                    <span className="text-[10px] leading-none font-bold">🚨</span>
                                  ) : set.feedbackTag === 'limit' ? (
                                    <span className="text-[10px] leading-none font-bold">🔥</span>
                                  ) : set.feedbackTag === 'easy' ? (
                                    <span className="text-[10px] leading-none font-bold">🟢</span>
                                  ) : (
                                    <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                  )}
                                </button>
                              </div>

                              {/* THE TACTICAL CHECKMARK BUTTON (Once validated, permanently locked) */}
                              <button
                                disabled={set.completed}
                                onClick={() => !set.completed && toggleSetComplete(exIndex, setIndex)}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-150 shadow-xs shrink-0 ${
                                  set.completed
                                    ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/30 cursor-default ring-2 ring-emerald-400/40 select-none'
                                    : 'bg-white hover:bg-slate-100 text-slate-400 border border-slate-300 active:scale-90 cursor-pointer'
                                }`}
                                title={
                                  set.completed
                                    ? (language === 'it' ? 'Serie convalidata ✓ (Non modificabile)' : language === 'es' ? 'Serie validada ✓ (No modificable)' : 'Set validated ✓ (Locked)')
                                    : (language === 'it' ? 'Tocca per convalidare la serie' : language === 'es' ? 'Toca para validar la serie' : 'Tap to validate set')
                                }
                              >
                                <Check className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[3] ${set.completed ? 'text-white' : 'text-slate-400'}`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Conclude Workout Button */}
              <div className="pt-2 pb-4">
                <button
                  onClick={finishWorkout}
                  className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  <span>{t.athlete.concludeSync}</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Tab: CHECK-IN CORPOREO & TELEMETRIA BIA (Inserimento Atleta & Avanzamenti) */}
      {activeTab === 'checkin' && (
        <div className="space-y-4">
          {/* Telemetry Overview & Deltas Hero */}
          <div className="relative overflow-hidden bg-white border-2 border-blue-200 rounded-2xl p-5 text-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                {t.athlete.checkinTelemetryTitle}
              </span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1 font-bold">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {latestBia?.date || t.athlete.today}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900">
                {t.athlete.checkinHeroTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {t.athlete.checkinHeroDesc}
              </p>
            </div>

            {/* Current Metrics 4-Grid with Technogym Live Color Accents */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-slate-50 p-3 rounded-xl border-t-2 border-t-slate-800 border-x border-b border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">{t.athlete.bodyWeight}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-slate-900">{athlete?.weightKg || 74.8}</span>
                  <span className="text-xs text-slate-500 font-mono font-bold">KG</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border-t-2 border-t-rose-500 border-x border-b border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-rose-600 block font-bold">{t.athlete.bodyFatPct}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-rose-600">
                    {latestBia?.fatMassPercent || athlete?.bodyFatPercent || 15.1}%
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border-t-2 border-t-blue-600 border-x border-b border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-blue-600 block font-bold">{t.athlete.muscleMass}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-blue-600">
                    {latestBia?.muscleMassKg || 35.5}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">KG</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border-t-2 border-t-amber-500 border-x border-b border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-amber-600 block font-bold">{t.athlete.waistCirc}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-black font-mono text-amber-600">
                    {latestBia?.waistCircumferenceCm || 81}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">CM</span>
                </div>
              </div>
            </div>

            {/* Deltas from beginning */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[11px] text-slate-600 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> {t.athlete.totalProgress}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold bg-white text-slate-700 border border-slate-200 shadow-xs">
                  {t.athlete.bodyWeight}: {parseFloat(deltaWeight) > 0 ? `+${deltaWeight}` : deltaWeight} kg
                </span>
                <span className={`px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 ${
                  parseFloat(deltaFatKg) <= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  <TrendingDown className="w-3 h-3" /> {deltaFatKg} kg {t.athlete.fat}
                </span>
                <span className={`px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 ${
                  parseFloat(deltaMuscleKg) >= 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  <TrendingUp className="w-3 h-3" /> +{deltaMuscleKg} kg {t.athlete.muscle}
                </span>
              </div>
            </div>

            {/* Goal reminder */}
            <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span>{t.athlete.athleteGoal} <strong className="text-slate-900">{athlete?.goals || (language === 'it' ? 'Ricomposizione & Ipertrofia' : language === 'es' ? 'Recomposición e Hipertrofia' : 'Recomp & Hypertrophy')}</strong></span>
              <span className="text-[10px] font-mono text-blue-600 font-bold">{t.athlete.autoSyncOn}</span>
            </div>
          </div>

          {/* 1. VERDETTO ANABOLICO & CRESCITA MUSCOLARE (Indisputable Proof of Progress) */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-700">
                  {t.athlete.anabolicVerdictTitle}
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-black">
                {t.athlete.anabolicVerdictBadge}
              </span>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-black italic uppercase tracking-tight text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                {t.athlete.massIncreasingTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                {t.athlete.massIncreasingDesc}
              </p>
            </div>

            {/* 4 Proof Highlights */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-slate-50 p-3 rounded-xl border border-blue-200 relative overflow-hidden">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">{t.athlete.pureMuscle}</div>
                <div className="text-2xl font-black font-mono text-blue-600 mt-1">+1.6 KG</div>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">+4.7% {t.athlete.contractileTissue}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-rose-200 relative overflow-hidden">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">{t.athlete.fatLost}</div>
                <div className="text-2xl font-black font-mono text-rose-600 mt-1">-4.2 KG</div>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{t.athlete.fatDropped}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-sky-200 relative overflow-hidden">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">{t.athlete.muscleDensity}</div>
                <div className="text-2xl font-black font-mono text-sky-600 mt-1">45.4%</div>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{t.athlete.ofYourBody}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative overflow-hidden">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">{t.athlete.metabolicBoost}</div>
                <div className="text-2xl font-black font-mono text-slate-900 mt-1">+70 KCAL</div>
                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{t.athlete.burnedAtRest}</span>
              </div>
            </div>

            {/* Coach Quote */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5 text-xs">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Coach Alessandro"
                className="w-8 h-8 rounded-xl object-cover border border-blue-500/40 shrink-0 mt-0.5 shadow-xs"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase block">
                  {t.athlete.coachAnalysisTitle}
                </span>
                <p className="text-slate-600 italic text-[11px] leading-relaxed font-medium">
                  "{t.athlete.coachQuote}"
                </p>
              </div>
            </div>
          </div>

          {/* 2. GRAFICO TELEMETRICO COMPARATIVO (Curva Muscolo vs Grasso) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase text-blue-600 font-black tracking-widest flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> {t.athlete.radarTitle}
                </div>
                <h4 className="text-sm font-black italic uppercase text-slate-900">
                  {t.athlete.radarSubtitle}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold">
                <span className="flex items-center gap-1 text-blue-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> {t.athlete.muscle}
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {t.athlete.fat}
                </span>
              </div>
            </div>

            {/* Custom SVG Telemetry Chart */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="h-44 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 360 140">
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="340" y2="20" stroke="#cbd5e1" strokeDasharray="3,3" />
                  <line x1="20" y1="65" x2="340" y2="65" stroke="#cbd5e1" strokeDasharray="3,3" />
                  <line x1="20" y1="110" x2="340" y2="110" stroke="#cbd5e1" strokeDasharray="3,3" />

                  {/* Muscle Line (Rising: 34.0kg -> 34.8kg -> 35.6kg) */}
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="50,105 180,68 310,30"
                  />
                  {/* Muscle Dots */}
                  <circle cx="50" cy="105" r="5" fill="#2563eb" />
                  <circle cx="180" cy="68" r="5" fill="#2563eb" />
                  <circle cx="310" cy="30" r="7" fill="#2563eb" className="animate-pulse" />

                  {/* Muscle Labels */}
                  <text x="50" y="93" fill="#2563eb" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">34.0 kg</text>
                  <text x="180" y="56" fill="#2563eb" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">34.8 kg</text>
                  <text x="310" y="18" fill="#1d4ed8" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">35.6 kg 🏆</text>

                  {/* Fat Line (Plunging: 16.0kg -> 13.8kg -> 11.8kg) */}
                  <polyline
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4,2"
                    points="50,35 180,75 310,115"
                  />
                  {/* Fat Dots */}
                  <circle cx="50" cy="35" r="4.5" fill="#e11d48" />
                  <circle cx="180" cy="75" r="4.5" fill="#e11d48" />
                  <circle cx="310" cy="115" r="5.5" fill="#e11d48" className="animate-pulse" />

                  {/* Fat Labels */}
                  <text x="50" y="50" fill="#e11d48" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">16.0 kg</text>
                  <text x="180" y="90" fill="#e11d48" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">13.8 kg</text>
                  <text x="310" y="130" fill="#be123c" fontSize="11" fontWeight="900" fontFamily="monospace" textAnchor="middle">11.8 kg 🔥</text>

                  {/* Date labels at bottom */}
                  <text x="50" y="138" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">15 GEN</text>
                  <text x="180" y="138" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">15 FEB</text>
                  <text x="310" y="138" fill="#2563eb" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{t.athlete.today.toUpperCase()}</text>
                </svg>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600 font-medium">
                <span className="flex items-center gap-1 text-blue-600 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" /> {t.athlete.muscleTrend}
                </span>
                <span className="flex items-center gap-1 text-rose-600 font-bold">
                  <TrendingDown className="w-3.5 h-3.5" /> {t.athlete.fatTrend}
                </span>
              </div>
            </div>
          </div>

          {/* 3. BACHECA TRAGUARDI & TROFEI SBLOCCABILI (Gamification & Dopamine) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase text-blue-600 font-black tracking-widest flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-blue-600" /> {t.athlete.palmaresTitle}
                </div>
                <h4 className="text-sm font-black italic uppercase text-slate-900">
                  {t.athlete.achievementsTitle}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-white font-black bg-blue-600 px-2.5 py-0.5 rounded-full shadow-xs">
                {t.athlete.unlockedRatio}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(athlete?.badges || []).map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    badge.unlocked
                      ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-70'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 ${
                    badge.unlocked
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {badge.category === 'hypertrophy' && <Zap className="w-5 h-5 fill-current" />}
                    {badge.category === 'fat_loss' && <Flame className="w-5 h-5 fill-current" />}
                    {badge.category === 'consistency' && <Trophy className="w-5 h-5 fill-current" />}
                    {badge.category === 'strength' && <Crown className="w-5 h-5 fill-current" />}
                    {badge.category === 'telemetry' && <Shield className="w-5 h-5 fill-current" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-xs font-black uppercase italic truncate ${
                        badge.unlocked ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {badge.title}
                      </h5>
                      {badge.unlocked ? (
                        <span className="text-[9px] font-mono text-blue-600 font-bold">{t.athlete.unlockedBadge}</span>
                      ) : (
                        <span className="text-[9px] font-mono text-slate-500 font-bold">{badge.progressPercent}%</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-tight font-medium">
                      {badge.description}
                    </p>
                    {!badge.unlocked && (
                      <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${badge.progressPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. GUADAGNO FORZA & SOVRACCARICO PROGRESSIVO (Mese Precedente vs Attuale) */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase text-blue-600 font-black tracking-widest flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-blue-600" /> {t.athlete.overloadTitle}
                </div>
                <h4 className="text-sm sm:text-base font-black italic uppercase text-slate-900">
                  {t.athlete.strengthGainTitle}
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-blue-600 text-white font-black px-2.5 py-1 rounded-full shadow-xs">
                {t.athlete.maxStrengthBadge}
              </span>
            </div>

            {/* Big Headline Banner */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-700 font-bold block">
                  {t.athlete.totalStrengthGainBanner}
                </span>
                <div className="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-slate-900 mt-0.5">
                  +{strength?.totalStrengthGainKg || 22.5} KG <span className="text-xs font-mono text-slate-500 font-normal">{t.athlete.gained}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                  {t.athlete.strengthGainDesc}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-right shrink-0 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">{t.athlete.sessionVolume}</span>
                <span className="text-lg font-black font-mono text-blue-600">{strength?.sessionVolumeKg || 4450} KG</span>
                <span className="text-[10px] font-mono text-sky-600 block font-bold">+{strength?.volumeDeltaKg || 650} kg (+17.1%)</span>
              </div>
            </div>

            {/* Lifts Comparison List */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center justify-between px-1">
                <span>{t.athlete.keyExercise}</span>
                <span>{t.athlete.loadProgression}</span>
              </div>

              {(strength?.topLifts || []).map((lift) => (
                <div
                  key={lift.exerciseId}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-mono font-black text-xs shrink-0">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase tracking-tight">
                        {translateExerciseName(lift.exerciseName, language)}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {translateMuscleName(lift.muscle, language)} • {language === 'it' ? 'Rilevato' : language === 'es' ? 'Registrado' : 'Recorded'}: {lift.lastDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.athlete.prevMonth}</span>
                      <span className="font-bold text-slate-600">{lift.previousMonthMaxKg} kg</span>
                    </div>

                    <span className="text-slate-400 font-bold">➔</span>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.athlete.today}</span>
                      <span className="font-black text-slate-900">{lift.currentMaxKg} kg</span>
                    </div>

                    <div className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs flex items-center gap-1 shadow-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>+{lift.deltaKg} kg</span>
                      <span className="text-[9px] text-blue-600/70">({lift.deltaPercent > 0 ? `+${lift.deltaPercent}%` : `${lift.deltaPercent}%`})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Self Check-in Interactive Form */}
          <form onSubmit={handleAthleteCheckin} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[10px] font-mono uppercase text-blue-600 font-black tracking-widest flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> {t.athlete.directCheckinTitle}
                </div>
                <h4 className="text-base font-black italic uppercase text-slate-900">
                  {t.athlete.recordMeasurement}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 font-medium">
                {t.athlete.quickCheckinTime}
              </span>
            </div>

            {/* Step 1: Weight input with quick stepper buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 flex items-center justify-between">
                <span>{t.athlete.weightLabelStep}</span>
                <span className="text-[10px] text-slate-500 lowercase">{t.athlete.valueInKg}</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCheckinWeight(prev => parseFloat((Math.max(30, prev - 0.5)).toFixed(1)))}
                  className="px-2.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold border border-slate-200 cursor-pointer active:scale-95 shadow-xs"
                >
                  -0.5
                </button>
                <button
                  type="button"
                  onClick={() => setCheckinWeight(prev => parseFloat((Math.max(30, prev - 0.1)).toFixed(1)))}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer active:scale-95 shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="number"
                    step="0.1"
                    value={checkinWeight}
                    onChange={(e) => setCheckinWeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-center font-mono font-black text-2xl text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs font-mono font-bold text-slate-400">KG</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckinWeight(prev => parseFloat((prev + 0.1).toFixed(1)))}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-600 border border-slate-200 cursor-pointer active:scale-95 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCheckinWeight(prev => parseFloat((prev + 0.5).toFixed(1)))}
                  className="px-2.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-600 font-mono text-xs font-bold border border-slate-200 cursor-pointer active:scale-95 shadow-xs"
                >
                  +0.5
                </button>
              </div>
            </div>

            {/* Step 2: Waist Circumference */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 flex items-center justify-between">
                <span>{t.athlete.waistLabelStep}</span>
                <span className="text-[10px] text-slate-500">{t.athlete.waistMeasuredAt}</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCheckinWaist(prev => Math.max(40, prev - 1))}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 cursor-pointer shadow-xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  step="0.5"
                  value={checkinWaist}
                  onChange={(e) => setCheckinWaist(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-center font-mono font-bold text-base text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setCheckinWaist(prev => prev + 1)}
                  className="p-2.5 rounded-xl bg-slate-100 text-blue-600 border border-slate-200 hover:bg-slate-200 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-slate-500 font-bold">CM</span>
              </div>
            </div>

            {/* Step 3: Energy level (1 to 5) */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 block">
                {t.athlete.energyLabelStep}
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setEnergyLevel(lvl)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      energyLevel === lvl
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${energyLevel === lvl ? 'fill-white' : ''}`} />
                    <span>{lvl}/5</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 px-1">
                <span>{t.athlete.fatigued}</span>
                <span>{t.athlete.fullStrength}</span>
              </div>
            </div>

            {/* Step 4: Sleep and Hydration selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase text-slate-600 flex items-center gap-1">
                  <Moon className="w-3 h-3 text-blue-600" /> {t.athlete.sleepQuality}
                </label>
                <select
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                >
                  <option value="Ottimo (7-8 ore)">{t.athlete.sleepOptimal}</option>
                  <option value="Discreto (6 ore)">{t.athlete.sleepFair}</option>
                  <option value="Interrotto / Meno di 5h">{t.athlete.sleepPoor}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase text-slate-600 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-600" /> {t.athlete.hydrationYesterday}
                </label>
                <select
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
                >
                  <option value="3L Ottimale">{t.athlete.hydrationOptimal}</option>
                  <option value="2L Normale">{t.athlete.hydrationNormal}</option>
                  <option value="<1.5L Bassa">{t.athlete.hydrationLow}</option>
                </select>
              </div>
            </div>

            {/* Step 5: Notes for coach */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase text-slate-700 block">
                {t.athlete.notesForCoach}
              </label>
              <textarea
                rows={2}
                value={checkinNotes}
                onChange={(e) => setCheckinNotes(e.target.value)}
                placeholder={t.athlete.notesPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
              />
            </div>

            {/* Submit check-in button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{t.athlete.sendCheckinBtn}</span>
            </button>
          </form>

          {/* Past History & BIA Scans Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-black italic uppercase text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                {t.athlete.historyTitle}
              </h4>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {biaList.length} {t.athlete.readingsCount}
              </span>
            </div>

            <div className="space-y-2.5">
              {biaList.map((record) => {
                const isPtScan = record.source === 'trainer_bia_scan';
                return (
                  <div
                    key={record.id}
                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-900 font-bold">{record.date}</span>
                        <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold border ${
                          isPtScan
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {isPtScan ? t.athlete.clinicalBiaBadge : t.athlete.selfCheckinBadge}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-black text-slate-900">
                        {record.weightKg} <span className="text-[10px] text-slate-500 font-normal">KG</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center bg-white py-2 px-1 rounded-lg border border-slate-200 text-[11px] font-mono shadow-xs">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.athlete.fatShort}</span>
                        <span className="font-bold text-rose-600">{record.fatMassPercent}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.athlete.muscleShort}</span>
                        <span className="font-bold text-blue-600">{record.muscleMassKg}kg</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">{language === 'it' ? 'Acqua' : language === 'es' ? 'Agua' : 'Water'}</span>
                        <span className="font-bold text-slate-700">{record.totalBodyWaterPercent}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">{t.athlete.waistShort}</span>
                        <span className="font-bold text-amber-600">{record.waistCircumferenceCm}cm</span>
                      </div>
                    </div>

                    {record.notes && (
                      <p className="text-[11px] text-slate-600 italic font-medium">
                        "{record.notes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CHAT CON IL COACH */}
      {activeTab === 'chat' && (
        <div className="bg-white border border-slate-200 rounded-2xl flex flex-col h-[620px] shadow-sm overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Coach Alessandro"
                className="w-10 h-10 rounded-xl object-cover border border-blue-200 shadow-xs"
              />
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Coach Alessandro</h4>
                <span className="text-[10px] text-blue-600 font-mono flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t.athlete.telemetryOnline}
                </span>
              </div>
            </div>
            <button
              onClick={handleSendVideoCheck}
              className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t.athlete.sendVideo}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
            {chatMessages.map((msg) => {
              const isMe = msg.sender === 'athlete';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-xs rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-500/15'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs font-medium'
                    }`}
                  >
                    {msg.videoAttachment && (
                      <div className="mb-2 rounded-xl overflow-hidden border border-slate-800 bg-black/80">
                        <img
                          src={msg.videoAttachment.thumbnail}
                          alt="Video thumbnail"
                          className="w-full h-28 object-cover"
                        />
                        <div className="p-2 text-[10px] bg-black/90 flex justify-between items-center text-white font-mono">
                          <span className="truncate">{translateExerciseName(msg.videoAttachment.exerciseName, language)}</span>
                          <span className="text-sky-400">{msg.videoAttachment.duration}</span>
                        </div>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.athlete.chatPlaceholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Workout Finished Celebration Modal */}
      {isWorkoutFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-2 border-blue-500 rounded-2xl max-w-sm w-full p-6 text-center text-slate-900 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 animate-bounce">
              <Trophy className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div>
              <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">
                {t.athlete.missionAccomplished}
              </div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 mt-1">
                {t.athlete.protocolCompleted}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {t.athlete.syncSuccessDesc}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-left shadow-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">{t.athlete.totalVolume}</span>
                  <span className="text-lg font-black font-mono text-blue-600">4.450 KG</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block font-bold">{t.athlete.newRecord}</span>
                  <span className="text-sm font-black font-mono text-rose-600">{translateExerciseName('Panca Piana', language).toUpperCase()} 82.5KG 🏆</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-blue-600 font-bold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{language === 'it' ? 'Forza aumentata di +22.5 kg rispetto al mese precedente! 🔥' : language === 'es' ? '¡Fuerza aumentada en +22.5 kg respecto al mes anterior! 🔥' : 'Strength increased by +22.5 kg compared to previous month! 🔥'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsWorkoutFinished(false);
                setInWorkoutSession(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs font-mono uppercase tracking-widest shadow-md shadow-blue-500/25 cursor-pointer"
            >
              {t.athlete.returnToHub}
            </button>
          </div>
        </div>
      )}

      {/* Exercise Video & Technique Modal */}
      {videoModalExercise && (
        <ExerciseVideoModal
          exercise={videoModalExercise}
          onClose={() => setVideoModalExercise(null)}
          onSendVideoToCoach={(exName) => {
            sendChatMessage(`Ecco il video della mia esecuzione su ${exName}! Come ti sembra l'assetto e la traiettoria?`, true);
            setActiveTab('chat');
            setVideoModalExercise(null);
          }}
        />
      )}

      {/* Plate Calculator Barbell Modal */}
      {plateModal && plateModal.isOpen && (
        <PlateCalculatorModal
          targetWeightKg={plateModal.targetWeightKg}
          exerciseName={plateModal.exerciseName}
          onClose={() => setPlateModal(null)}
        />
      )}

      {/* Set Feedback & Pain Alert Modal */}
      {feedbackModal && feedbackModal.isOpen && (
        <SetFeedbackModal
          exerciseName={feedbackModal.exerciseName}
          setNumber={feedbackModal.setNumber}
          initialTag={feedbackModal.currentTag}
          initialNote={feedbackModal.currentNote}
          onSave={(tag, note) => {
            setSetFeedback(feedbackModal.exerciseIndex, feedbackModal.setIndex, tag, note);
            setFeedbackModal(null);
          }}
          onClose={() => setFeedbackModal(null)}
        />
      )}

      {/* 🚀 FOREGROUND TACTICAL REST TIMER HUD (ALWAYS IN FOREGROUND & STAYS VISIBLE ON ALL EXERCISES) */}
      {restTimer.active && restTimer.remaining > 0 && (() => {
        const minutes = Math.floor(restTimer.remaining / 60);
        const seconds = restTimer.remaining % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const total = restTimer.total || 90;
        const progressRatio = Math.min(1, Math.max(0, restTimer.remaining / total));
        const percentRemaining = Math.round(progressRatio * 100);
        const atpRecharge = 100 - percentRemaining;
        const isUrgent = restTimer.remaining <= 5;

        if (isTimerMinimized) {
          return (
            <div className="fixed bottom-3 inset-x-2 sm:inset-x-auto sm:right-6 sm:w-84 z-50 animate-in slide-in-from-bottom-3 duration-200">
              <div
                onClick={() => setIsTimerMinimized(false)}
                className={`bg-slate-950/95 backdrop-blur-xl border-2 rounded-2xl px-3.5 py-2.5 text-white flex items-center justify-between shadow-2xl cursor-pointer transition-all ${
                  isUrgent ? 'border-rose-500 animate-pulse shadow-rose-500/30' : 'border-amber-400 shadow-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isUrgent ? 'bg-rose-500 animate-ping' : 'bg-amber-400 animate-ping'}`} />
                  <span className="text-lg font-black font-mono tracking-tight text-amber-400">
                    {formattedTime}
                  </span>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[130px]">
                    {translateExerciseName(restTimer.exerciseName, language)}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsTimerMinimized(false); }}
                    className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                    title="Espandi"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); dismissRestTimer(); }}
                    className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                    title="Chiudi"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="fixed bottom-3 inset-x-2 sm:inset-x-auto sm:right-6 sm:w-[380px] z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className={`rounded-2xl p-3 sm:p-3.5 transition-all duration-300 shadow-2xl border-2 text-white relative overflow-hidden backdrop-blur-2xl ${
              isUrgent
                ? 'bg-gradient-to-r from-amber-950/95 via-slate-950/95 to-amber-950/95 border-rose-500 animate-pulse shadow-rose-500/30'
                : 'bg-slate-950/95 border-amber-400 shadow-amber-500/20'
            }`}>
              {/* Technogym Live Top Accent Stripe */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                isUrgent ? 'bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500' : 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400'
              }`} />

              {/* Top Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isUrgent ? 'bg-rose-500 animate-ping' : 'bg-amber-400 animate-ping'}`} />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-amber-400 truncate">
                    {isUrgent ? t.athlete.timerUrgent : t.athlete.timerRest} • {translateExerciseName(restTimer.exerciseName, language)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsTimerMinimized(true)}
                    className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Riduci a icona"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={dismissRestTimer}
                    className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={t.athlete.closeTimer}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Digital Countdown & ATP Status */}
              <div className="flex items-center justify-between gap-3 py-1">
                <div className="flex items-baseline gap-2">
                  <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight leading-none ${
                    isUrgent ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {formattedTime}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    SEC
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-cyan-400 font-bold flex items-center justify-end gap-1">
                    <span>{t.restTimer.atpRecharge}</span>
                    <span className="text-white font-black">{atpRecharge}%</span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    {t.athlete.coachLabel} {total}s
                  </div>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700/60 my-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-linear ${
                    isUrgent 
                      ? 'bg-gradient-to-r from-rose-500 to-amber-400' 
                      : 'bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400'
                  }`}
                  style={{ width: `${percentRemaining}%` }}
                />
              </div>

              {/* Interactive Controls & 1-Tap Skip Button */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={() => addRestTimerSeconds(-15)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-black uppercase flex items-center justify-center gap-0.5 transition-all cursor-pointer active:scale-95"
                  title={t.athlete.sub15}
                >
                  <Minus className="w-3 h-3" />
                  <span>15s</span>
                </button>

                <button
                  onClick={() => addRestTimerSeconds(15)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-black uppercase flex items-center justify-center gap-0.5 transition-all cursor-pointer active:scale-95"
                  title={t.athlete.add15}
                >
                  <Plus className="w-3 h-3" />
                  <span>15s</span>
                </button>

                {!inWorkoutSession && (
                  <button
                    onClick={() => setInWorkoutSession(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-black uppercase flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>{language === 'it' ? 'Vai' : language === 'es' ? 'Ir' : 'Go'} ➔</span>
                  </button>
                )}

                {/* Tactical Skip/Start Now Button */}
                <button
                  onClick={dismissRestTimer}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{t.athlete.startNow}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
