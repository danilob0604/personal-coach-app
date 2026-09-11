import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import type { WorkoutRoutine, WorkoutExercise } from '../types';
import { ExerciseVideoModal } from './ExerciseVideoModal';
import { getMuscleGroupTheme } from '../utils/muscleThemes';
import { 
  translateExerciseName, 
  translateMuscleName, 
  translateRoutineTitle, 
  translateSplitName, 
  translateTrainerNotes 
} from '../i18n/translations';
import { 
  X, 
  Check, 
  UserCheck, 
  Dumbbell, 
  Clock, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Info,
  Layers,
  Video,
  Calendar
} from 'lucide-react';

interface RoutineDetailModalProps {
  routine: WorkoutRoutine | null;
  onClose: () => void;
  onEditInBuilder?: (routine: WorkoutRoutine) => void;
}

export const RoutineDetailModal: React.FC<RoutineDetailModalProps> = ({
  routine,
  onClose,
  onEditInBuilder
}) => {
  if (!routine) return null;
  return (
    <RoutineDetailModalContent
      key={routine.id}
      routine={routine}
      onClose={onClose}
      onEditInBuilder={onEditInBuilder}
    />
  );
};

interface RoutineDetailModalContentProps {
  routine: WorkoutRoutine;
  onClose: () => void;
  onEditInBuilder?: (routine: WorkoutRoutine) => void;
}

const RoutineDetailModalContent: React.FC<RoutineDetailModalContentProps> = ({
  routine,
  onClose,
  onEditInBuilder
}) => {
  const { 
    athletes, 
    assignRoutineToAthletes, 
    deleteMasterTemplate, 
    showToast,
    language,
    t
  } = useFitness();

  // Find athletes who currently have this routine assigned
  const currentlyAssignedAthletes = athletes.filter(
    a => a.assignedRoutine?.title === routine.title || a.currentWorkoutPlan === routine.title
  );

  // Selected athlete IDs for assignment
  const [selectedAthleteIds, setSelectedAthleteIds] = useState<string[]>(
    currentlyAssignedAthletes.map(a => a.id)
  );

  const [activeSubTab, setActiveSubTab] = useState<'exercises' | 'assign'>('assign');
  const [activeSplitIndex, setActiveSplitIndex] = useState(0);
  const [videoExercise, setVideoExercise] = useState<WorkoutExercise | null>(null);
  const [searchAthlete, setSearchAthlete] = useState('');

  const toggleAthleteSelection = (athleteId: string) => {
    setSelectedAthleteIds(prev => 
      prev.includes(athleteId) ? prev.filter(id => id !== athleteId) : [...prev, athleteId]
    );
  };

  const handleConfirmAssignment = () => {
    if (selectedAthleteIds.length === 0) {
      showToast(t.routineModal.selectAtLeastOneError);
      return;
    }
    assignRoutineToAthletes(selectedAthleteIds, routine);
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`${t.routineModal.deleteConfirm} "${translateRoutineTitle(routine.title, language)}"?`)) {
      deleteMasterTemplate(routine.id);
      onClose();
    }
  };

  const filteredAthletes = athletes.filter(a => {
    if (a.status === 'archived') return false;
    if (!searchAthlete.trim()) return true;
    return (
      a.name.toLowerCase().includes(searchAthlete.toLowerCase()) ||
      a.goals.toLowerCase().includes(searchAthlete.toLowerCase()) ||
      (a.currentWorkoutPlan && a.currentWorkoutPlan.toLowerCase().includes(searchAthlete.toLowerCase()))
    );
  });

  const isDonna = routine.targetGender === 'donna';
  const isUomo = routine.targetGender === 'uomo';

  const primarySplit = routine.splits?.[0];
  const routineTheme = getMuscleGroupTheme(primarySplit?.targetMuscleGroup || routine.category || routine.title, language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl text-slate-900 flex flex-col">
        
        {/* Top Accent Stripe */}
        <div className={`h-2.5 w-full ${routineTheme.lightStripe}`} />

        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/90 flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
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
                <span>{isDonna ? t.routineModal.focusWomen : isUomo ? t.routineModal.focusMen : t.routineModal.unisexRecomp}</span>
              </span>

              <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {translateMuscleName(routine.category, language)}
              </span>

              <span className="text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-blue-600" /> {routine.weeklyFrequency || routine.splits?.length || 1} {t.routineModal.perWeek}
              </span>

              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-bold">
                <Clock className="w-3 h-3 text-blue-600" /> {routine.estimatedMinutes || 50} {t.routineModal.minEstimated}
              </span>

              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-bold">
                <Dumbbell className="w-3 h-3 text-blue-600" /> {routine.splits ? routine.splits.reduce((acc, s) => acc + s.exercises.length, 0) : routine.exercises.length} {t.routineModal.totalExercises}
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-900 font-mono uppercase tracking-tight">
              {translateRoutineTitle(routine.title, language)}
            </h2>

            {routine.targetGoal && (
              <p className="text-xs text-slate-600 font-mono">
                <strong className="text-slate-800">{t.routineModal.goalProtocol}</strong> {routine.targetGoal}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactical Sub-Nav Tabs: Esercizi vs Assegnazione */}
        <div className="flex items-center border-b border-slate-200 px-5 bg-white">
          <button
            onClick={() => setActiveSubTab('assign')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'assign'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.routineModal.tabAssign} ({currentlyAssignedAthletes.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exercises')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeSubTab === 'exercises'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.routineModal.tabExercises} ({routine.exercises.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          
          {/* TAB 1: ASSEGNAZIONE ATLETI */}
          {activeSubTab === 'assign' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="text-[10px] font-mono uppercase text-blue-600 font-black tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    {t.routineModal.tabAssign.toUpperCase()}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 font-mono uppercase mt-0.5">
                    {t.routineModal.assignTitle}
                  </h4>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    {t.routineModal.assignSubtitle}
                  </p>
                </div>

                <div className="w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder={t.routineModal.searchPlaceholder}
                    value={searchAthlete}
                    onChange={(e) => setSearchAthlete(e.target.value)}
                    className="w-full sm:w-64 bg-slate-50 border border-slate-200 text-xs font-mono rounded-xl px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Athletes Selection Grid */}
              <div className="space-y-2.5">
                {filteredAthletes.map((ath) => {
                  const isAssignedToThis = ath.assignedRoutine?.title === routine.title || ath.currentWorkoutPlan === routine.title;
                  const isSelected = selectedAthleteIds.includes(ath.id);

                  return (
                    <div
                      key={ath.id}
                      onClick={() => toggleAthleteSelection(ath.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-50/60 border-blue-400 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-slate-100'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <img
                          src={ath.avatar}
                          alt={ath.name}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 p-0.5"
                        />

                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-black text-slate-900 uppercase font-mono">
                              {ath.name}
                            </h5>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                              {ath.weightKg} kg • BF {ath.bodyFatPercent || 15}%
                            </span>
                            {isAssignedToThis && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black border border-emerald-200 uppercase">
                                {t.routineModal.currentlyActive}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                            <strong className="text-slate-800">{t.routineModal.goalLabel}</strong> {ath.goals || 'Non specificato'}
                          </p>

                          {ath.injuriesOrNotes && (
                            <p className="text-[10px] text-amber-700 font-mono flex items-center gap-1 mt-0.5">
                              <Info className="w-3 h-3 shrink-0 text-amber-500" /> {ath.injuriesOrNotes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[9px] font-mono text-slate-400 uppercase block">{t.routineModal.todayRoutine}</span>
                        <span className="text-xs font-mono font-bold text-slate-800 block max-w-[160px] truncate">
                          {translateRoutineTitle(ath.assignedRoutine?.title || ath.currentWorkoutPlan || '', language) || t.routineModal.noRoutine}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DETTAGLIO ESERCIZI & SERIE */}
          {activeSubTab === 'exercises' && (
            <div className="space-y-4">
              {/* Split Selector Bar if routine has multiple splits */}
              {routine.splits && routine.splits.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase text-blue-600 tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {t.routineModal.splitStructure} ({routine.splits.length} {routine.splits.length === 1 ? t.routineModal.daySingular : t.routineModal.dayPlural})
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {t.routineModal.frequency} {routine.weeklyFrequency || routine.splits.length}x / {language === 'it' ? 'settimana' : language === 'es' ? 'semana' : 'week'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {routine.splits.map((split, sIdx) => {
                      const isSelected = activeSplitIndex === sIdx;
                      const sTheme = getMuscleGroupTheme(split.targetMuscleGroup || split.name, language);
                      return (
                        <button
                          key={split.id || sIdx}
                          onClick={() => setActiveSplitIndex(sIdx)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border ${
                            isSelected
                              ? `${sTheme.activeTabBg} border-transparent ring-2 ring-slate-900/10 scale-[1.02]`
                              : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <span>{sTheme.icon}</span>
                          <span>{translateSplitName(split.name, language)}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                            isSelected ? 'bg-white/20 text-white' : sTheme.badgeBg
                          }`}>
                            {split.exercises.length} ex
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Split Focus Info */}
                  {routine.splits[activeSplitIndex] && (
                    <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 uppercase">{translateSplitName(routine.splits[activeSplitIndex].name, language)}:</strong>{' '}
                        <span className="text-slate-600">{translateMuscleName(routine.splits[activeSplitIndex].targetMuscleGroup, language)}</span>
                      </div>
                      <span className="text-[10px] text-blue-600 font-bold">
                        ~{routine.splits[activeSplitIndex].estimatedMinutes || 50} {t.routineModal.minEstimated}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Render exercises for the active split or routine */}
              {((routine.splits && routine.splits[activeSplitIndex] ? routine.splits[activeSplitIndex].exercises : routine.exercises) || []).map((ex, exIdx) => {
                const exTheme = getMuscleGroupTheme(ex.muscle || ex.name, language);

                return (
                  <div
                    key={exIdx}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-0"
                  >
                    <div className={`h-1.5 w-full ${exTheme.lightStripe}`} />

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-7 h-7 rounded-xl text-white flex items-center justify-center font-mono font-black text-xs shadow-xs ${exTheme.lightStripe}`}>
                            0{exIdx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{translateExerciseName(ex.name, language)}</h4>
                              <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${exTheme.badgeBg}`}>
                                <span>{exTheme.icon}</span>
                                <span>{translateMuscleName(ex.muscle, language)}</span>
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase mt-0.5 block">
                              {t.routineModal.restSeconds} {ex.restSeconds} SEC • RPE {ex.targetRPE || 8}
                              {ex.tempo ? ` • TEMPO ${ex.tempo}` : ''}
                            </span>
                          </div>
                        </div>

                        {/* Coach Custom Video Button */}
                        <button
                          onClick={() => setVideoExercise(ex)}
                          className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase flex items-center gap-1.5 border transition-all cursor-pointer ${
                            ex.isCoachCustomVideo
                              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          <span>{ex.isCoachCustomVideo ? '📹 Coach' : `📹 ${t.athlete.videoGuide}`}</span>
                        </button>
                      </div>

                      {/* Technical cues */}
                      {ex.trainerNotes && (
                        <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{translateTrainerNotes(ex.trainerNotes, language)}</span>
                        </div>
                      )}

                      {/* Sets Table */}
                      <table className="w-full text-xs font-mono text-left">
                        <thead>
                          <tr className="text-slate-400 border-b border-slate-200 pb-1.5 text-[10px] uppercase">
                            <th className="py-1">{t.routineModal.setsCol}</th>
                            <th className="py-1">{t.routineModal.targetLoadCol}</th>
                            <th className="py-1">{t.routineModal.repsCol}</th>
                            <th className="py-1 text-right">{t.routineModal.setTypeCol}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {ex.sets.map((set, sIdx) => (
                            <tr key={sIdx} className="text-slate-700">
                              <td className="py-1.5 text-slate-500 font-bold">{t.routineModal.setWord} {set.setNumber}</td>
                              <td className="py-1.5 font-black text-slate-900">
                                {set.suggestedWeightKg} <span className="text-blue-600">KG</span>
                              </td>
                              <td className="py-1.5 font-black text-slate-900">
                                {set.suggestedReps} <span className="text-slate-500">{t.athlete.repsAbbr}</span>
                              </td>
                              <td className="py-1.5 text-right">
                                {set.isPR ? (
                                  <span className="text-[9px] font-mono uppercase bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-black border border-rose-200">
                                    {t.routineModal.prBadge}
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                                    {t.routineModal.standardBadge}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              title={t.routineModal.deleteBtn}
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t.routineModal.deleteBtn}</span>
            </button>

            {onEditInBuilder && (
              <button
                onClick={() => {
                  onEditInBuilder(routine);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>{t.routineModal.editBuilderBtn}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">
              <strong className="text-blue-600">{selectedAthleteIds.length}</strong> {t.routineModal.selectedCount}
            </span>
            <button
              onClick={handleConfirmAssignment}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.routineModal.confirmAssignBtn}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Coach Video & Technique Breakdown Modal */}
      {videoExercise && (
        <ExerciseVideoModal
          exercise={videoExercise}
          onClose={() => setVideoExercise(null)}
        />
      )}
    </div>
  );
};
