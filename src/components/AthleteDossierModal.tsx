import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  X, 
  User, 
  HeartPulse, 
  Activity, 
  ShieldCheck, 
  Save, 
  Archive, 
  RotateCcw, 
  Calendar, 
  Phone, 
  Mail, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  Plus, 
  History, 
  Scale,
  Clock,
  Zap,
  Dumbbell
} from 'lucide-react';
import type { Athlete, BiaCheckRecord } from '../types';
import { getMuscleGroupTheme } from '../utils/muscleThemes';

interface AthleteDossierModalProps {
  athlete: Athlete | null;
  onClose: () => void;
}

export const AthleteDossierModal: React.FC<AthleteDossierModalProps> = ({ athlete, onClose }) => {
  if (!athlete) return null;
  return <AthleteDossierModalContent key={athlete.id} athlete={athlete} onClose={onClose} />;
};

const AthleteDossierModalContent: React.FC<{ athlete: Athlete; onClose: () => void }> = ({ athlete, onClose }) => {
  const { 
    updateAthlete, 
    addBiaRecord, 
    archiveAthlete, 
    restoreAthlete, 
    isSlotLimitReached, 
    maxAthletes, 
    masterTemplates 
  } = useFitness();

  const [activeTab, setActiveTab] = useState<'anagrafica' | 'background' | 'anamnesi' | 'bia' | 'stato' | 'recupero'>('anagrafica');
  const [showAddBiaModal, setShowAddBiaModal] = useState(false);

  // Form state initialized with athlete data
  const [formData, setFormData] = useState<Athlete>({
    ...athlete,
    phone: athlete.phone || '+39 340 1234567',
    heightCm: athlete.heightCm || 178,
    bodyFatPercent: athlete.bodyFatPercent || 15.1,
    birthDate: athlete.birthDate || '1996-05-12',
    packageExpiryDate: athlete.packageExpiryDate || '2026-12-31',
    defaultRestSeconds: athlete.defaultRestSeconds || 90,
    assignedRoutine: athlete.assignedRoutine || masterTemplates.find(t => t.title === athlete.currentWorkoutPlan) || masterTemplates[0],
    pastSportExperience: athlete.pastSportExperience || '5 anni di calcio dilettantistico, 2 anni di sala pesi. Ottima mobilità caviglie.',
    dietaryHabits: athlete.dietaryHabits || 'Dieta normocalorica ~2.500 kcal, apporto proteico 2g/kg, bevitore regolare (3L acqua/die).',
    anamnesis: athlete.anamnesis || {
      cardiovascularIssues: false,
      jointPains: 'Lieve rigidità alla cuffia dei rotatori spalla destra a carichi pesanti.',
      pastSurgeries: 'Nessun intervento chirurgico maggiore.',
      dailyActivityLevel: 'Moderato'
    },
    bodyCompositionHistory: athlete.bodyCompositionHistory || []
  });

  const handleSetDefaultRest = (seconds: number) => {
    setFormData(prev => ({
      ...prev,
      defaultRestSeconds: seconds
    }));
  };

  const handleApplyRestToAllExercises = () => {
    const sec = formData.defaultRestSeconds || 90;
    setFormData(prev => {
      if (!prev.assignedRoutine) return prev;
      const updatedRoutine = { ...prev.assignedRoutine };
      if (updatedRoutine.splits && updatedRoutine.splits.length > 0) {
        updatedRoutine.splits = updatedRoutine.splits.map(split => ({
          ...split,
          exercises: split.exercises.map(ex => ({ ...ex, restSeconds: sec }))
        }));
        if (updatedRoutine.exercises) {
          updatedRoutine.exercises = updatedRoutine.exercises.map(ex => ({ ...ex, restSeconds: sec }));
        }
      } else if (updatedRoutine.exercises) {
        updatedRoutine.exercises = updatedRoutine.exercises.map(ex => ({ ...ex, restSeconds: sec }));
      }
      return {
        ...prev,
        assignedRoutine: updatedRoutine
      };
    });
  };

  const handleUpdateExerciseRest = (splitIndex: number | null, exerciseIndex: number, newSec: number) => {
    const sec = Math.max(15, newSec);
    setFormData(prev => {
      if (!prev.assignedRoutine) return prev;
      const updatedRoutine = { ...prev.assignedRoutine };
      if (splitIndex !== null && updatedRoutine.splits && updatedRoutine.splits[splitIndex]) {
        const splits = [...updatedRoutine.splits];
        const targetSplit = { ...splits[splitIndex] };
        const exercises = [...targetSplit.exercises];
        exercises[exerciseIndex] = { ...exercises[exerciseIndex], restSeconds: sec };
        targetSplit.exercises = exercises;
        splits[splitIndex] = targetSplit;
        updatedRoutine.splits = splits;
      } else if (updatedRoutine.exercises && updatedRoutine.exercises[exerciseIndex]) {
        const exercises = [...updatedRoutine.exercises];
        exercises[exerciseIndex] = { ...exercises[exerciseIndex], restSeconds: sec };
        updatedRoutine.exercises = exercises;
      }
      return {
        ...prev,
        assignedRoutine: updatedRoutine
      };
    });
  };

  // New BIA Form state
  const [newBiaWeight, setNewBiaWeight] = useState(formData.weightKg.toString());
  const [newBiaFatPercent, setNewBiaFatPercent] = useState(formData.bodyFatPercent?.toString() || '15.0');
  const [newBiaMuscleKg, setNewBiaMuscleKg] = useState('35.5');
  const [newBiaWaterPercent, setNewBiaWaterPercent] = useState('58.0');
  const [newBiaVisceral, setNewBiaVisceral] = useState('4');
  const [newBiaBmr, setNewBiaBmr] = useState('1800');
  const [newBiaWaist, setNewBiaWaist] = useState('81');
  const [newBiaNotes, setNewBiaNotes] = useState('Referto BIA Tanita MC-780');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAthlete(formData);
    onClose();
  };

  const handleAddBiaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newBiaWeight) || formData.weightKg;
    const fatPct = parseFloat(newBiaFatPercent) || 15;
    const fatKg = parseFloat(((w * fatPct) / 100).toFixed(1));

    const newRecord: Omit<BiaCheckRecord, 'id'> = {
      date: 'Oggi (Scan PT)',
      source: 'trainer_bia_scan',
      weightKg: w,
      fatMassPercent: fatPct,
      fatMassKg: fatKg,
      muscleMassKg: parseFloat(newBiaMuscleKg) || 35,
      totalBodyWaterPercent: parseFloat(newBiaWaterPercent) || 58,
      visceralFatRating: parseInt(newBiaVisceral) || 4,
      basalMetabolicRateKcal: parseInt(newBiaBmr) || 1800,
      waistCircumferenceCm: parseFloat(newBiaWaist) || 80,
      notes: newBiaNotes
    };

    addBiaRecord(formData.id, newRecord);

    // Update local form state view
    setFormData(prev => ({
      ...prev,
      weightKg: w,
      bodyFatPercent: fatPct,
      bodyCompositionHistory: [
        { ...newRecord, id: `bia-${Date.now()}` },
        ...(prev.bodyCompositionHistory || [])
      ]
    }));

    setShowAddBiaModal(false);
  };

  const handleToggleArchive = () => {
    if (formData.status === 'archived') {
      if (isSlotLimitReached) {
        alert(`Non puoi riattivare: hai raggiunto il limite massimo di ${maxAthletes} atleti attivi.`);
        return;
      }
      restoreAthlete(athlete.id);
      setFormData(prev => ({ ...prev, status: 'active' }));
    } else {
      archiveAthlete(athlete.id);
      setFormData(prev => ({ ...prev, status: 'archived' }));
    }
  };

  // Compute Delta between initial BIA and latest
  const biaList = formData.bodyCompositionHistory || [];
  const latestBia = biaList[0];
  const initialBia = biaList[biaList.length - 1];

  const deltaWeight = latestBia && initialBia ? (latestBia.weightKg - initialBia.weightKg).toFixed(1) : '0';
  const deltaFatKg = latestBia && initialBia ? (latestBia.fatMassKg - initialBia.fatMassKg).toFixed(1) : '0';
  const deltaMuscleKg = latestBia && initialBia ? (latestBia.muscleMassKg - initialBia.muscleMassKg).toFixed(1) : '0';
  const deltaFatPercent = latestBia && initialBia ? (latestBia.fatMassPercent - initialBia.fatMassPercent).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 flex flex-col">
        {/* Header with Avatar and Status */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/80 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-blue-600 p-0.5 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-tight truncate">{formData.name}</h3>
                <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  LIVELLO {formData.athleticLevel || 7}
                </span>
                {formData.status === 'active' && (
                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    ATTIVO
                  </span>
                )}
                {formData.status === 'inactive' && (
                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    INATTIVO
                  </span>
                )}
                {formData.status === 'archived' && (
                  <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    ARCHIVIO
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs font-mono text-slate-500 mt-0.5 truncate">
                Scheda: <strong className="text-blue-600">{formData.currentWorkoutPlan}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Navigation Tabs in Dossier */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 pt-2 sm:pt-3 border-b border-slate-200 bg-white overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('anagrafica')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${
              activeTab === 'anagrafica'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Dati & Contatti</span>
          </button>

          <button
            onClick={() => setActiveTab('background')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'background'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Passato & Abitudini</span>
          </button>

          <button
            onClick={() => setActiveTab('anamnesi')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'anamnesi'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Anamnesi & Salute</span>
          </button>

          <button
            onClick={() => setActiveTab('bia')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bia'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>BIA & Avanzamenti</span>
            {biaList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[9px] font-black font-mono border border-blue-200">
                {biaList.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recupero')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'recupero'
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Recupero & Timer Serie</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 text-[9px] font-black font-mono border border-amber-200">
              {formData.defaultRestSeconds || 90}s
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stato')}
            className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stato'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Stato & Slot PT</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 flex-1 bg-slate-50/50">
          {/* TAB 1: DATI & CONTATTI */}
          {activeTab === 'anagrafica' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Data di Nascita</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-600" /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-blue-600" /> Telefono / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Obiettivo Sportivo Principale</label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">
                  Scheda / Protocollo Assegnato (Libreria Master)
                </label>
                <select
                  value={formData.assignedRoutine?.title || formData.currentWorkoutPlan}
                  onChange={(e) => {
                    const selectedTmpl = masterTemplates.find(t => t.title === e.target.value);
                    if (selectedTmpl) {
                      setFormData(prev => ({
                        ...prev,
                        currentWorkoutPlan: selectedTmpl.title,
                        assignedRoutine: {
                          ...selectedTmpl,
                          assignedAthleteId: prev.id,
                          assignedAthleteName: prev.name
                        }
                      }));
                    } else {
                      setFormData(prev => ({ ...prev, currentWorkoutPlan: e.target.value }));
                    }
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {masterTemplates.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.targetGender === 'donna' ? '🌸 Donna: ' : t.targetGender === 'uomo' ? '⚡ Uomo: ' : '🌐 Unisex: '} {t.title}
                    </option>
                  ))}
                  <option value="Push A - Petto & Spalle">Push A - Petto & Spalle</option>
                  <option value="Pull A - Dorso & Bicipiti">Pull A - Dorso & Bicipiti</option>
                  <option value="Legs & Glutes Focus">Legs & Glutes Focus</option>
                </select>

                {formData.assignedRoutine && (
                  <div className="mt-2 p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-[11px] font-mono shadow-sm">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        formData.assignedRoutine.targetGender === 'donna'
                          ? 'bg-pink-50 text-pink-700 border border-pink-200'
                          : formData.assignedRoutine.targetGender === 'uomo'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {formData.assignedRoutine.targetGender === 'donna' ? '🌸 Focus Donna' : formData.assignedRoutine.targetGender === 'uomo' ? '⚡ Focus Uomo' : '🌐 Recomp'}
                      </span>
                      <span>{formData.assignedRoutine.exercises?.length || 0} esercizi • {formData.assignedRoutine.estimatedMinutes || 50} min</span>
                    </div>
                    <span className="text-blue-600 font-bold">{formData.assignedRoutine.difficultyLevel || 'Intermedio'}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PASSATO & ABITUDINI */}
          {activeTab === 'background' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-sky-800">
                <History className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
                <span>
                  Conoscere la storia sportiva e le abitudini alimentari permette di pianificare volumi e recuperi ideali.
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">
                  Passato Sportivo & Anzianità di Allenamento
                </label>
                <textarea
                  rows={3}
                  value={formData.pastSportExperience || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, pastSportExperience: e.target.value }))}
                  placeholder="Es. 5 anni di basket giovanile, 1 anno di crossfit, fermo da 6 mesi..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">
                  Abitudini Alimentari, Idratazione & Integrazione
                </label>
                <textarea
                  rows={3}
                  value={formData.dietaryHabits || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, dietaryHabits: e.target.value }))}
                  placeholder="Es. 3 pasti + 1 spuntino, beve 2L acqua, assume whey e creatina, intolleranza lattosio..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ANAMNESI & SALUTE */}
          {activeTab === 'anamnesi' && (
            <div className="space-y-3.5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  L'anamnesi previene infortuni guidando la scelta di ROM, macchinari ed esercizi alternativi.
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Dolori Articolari o Muscolari Noti</label>
                <textarea
                  rows={2}
                  value={formData.anamnesis?.jointPains || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    anamnesis: { ...prev.anamnesis, jointPains: e.target.value }
                  }))}
                  placeholder="Es. Fastidio spalla destra a inizio panca"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Interventi Chirurgici o Traumi Passati</label>
                <textarea
                  rows={2}
                  value={formData.anamnesis?.pastSurgeries || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    anamnesis: { ...prev.anamnesis, pastSurgeries: e.target.value }
                  }))}
                  placeholder="Es. Operazione menisco 2020"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Attività Quotidiana Fuori dalla Palestra</label>
                <select
                  value={formData.anamnesis?.dailyActivityLevel || 'Moderato'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    anamnesis: { 
                        ...prev.anamnesis, 
                      dailyActivityLevel: e.target.value as 'Sedentario' | 'Moderato' | 'Attivo' | 'Molto Attivo' 
                    }
                  }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Sedentario">Sedentario (Lavoro a computer / Ufficio)</option>
                  <option value="Moderato">Moderato (In piedi / Camminata leggera)</option>
                  <option value="Attivo">Attivo (Lavoro dinamico / Molti passi)</option>
                  <option value="Molto Attivo">Molto Attivo (Lavoro pesante / Multi-sportivo)</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 4: BIA & COMPOSIZIONE CORPOREA (AVANZAMENTI) */}
          {activeTab === 'bia' && (
            <div className="space-y-4">
              {/* Delta Comparison Banner (Prima vs Dopo) */}
              {biaList.length > 1 && (
                <div className="bg-gradient-to-r from-blue-50/50 via-indigo-50/40 to-slate-50 border border-slate-200 rounded-3xl p-4 shadow-sm">
                  <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-black mb-2 flex items-center justify-between">
                    <span>AVANZAMENTO COMPOSIZIONE CORPOREA (CHECK INIZIALE → ATTUALE)</span>
                    <span className="text-slate-500 font-normal">{biaList.length} scansioni</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Delta Peso</span>
                      <div className="text-base font-black font-mono text-slate-900 flex items-center justify-center gap-1">
                        {parseFloat(deltaWeight) < 0 ? (
                          <TrendingDown className="w-3.5 h-3.5 text-sky-600" />
                        ) : (
                          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        <span>{deltaWeight} kg</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Massa Grassa (FM)</span>
                      <div className="text-base font-black font-mono text-sky-600 flex items-center justify-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5 text-sky-600" />
                        <span>{deltaFatKg} kg ({deltaFatPercent}%)</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Massa Muscolare (FFM)</span>
                      <div className="text-base font-black font-mono text-blue-600 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                        <span>+{deltaMuscleKg} kg</span>
                      </div>
                    </div>

                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Grasso Viscerale</span>
                      <div className="text-base font-black font-mono text-amber-600">
                        Livello {latestBia?.visceralFatRating || 4}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hypertrophy Verdict Callout */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  <div>
                    <div className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-700">
                      VERDETTO IPERTROFIA: CRESCITA CONFERMATA (+{deltaMuscleKg} KG)
                    </div>
                    <div className="text-xs text-slate-700">
                      Rapporto massa magra aumentato: il muscolo costituisce il 45.4% del peso corporeo (+4.0% dall'inizio del percorso).
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono uppercase bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-2 py-1 rounded-lg shadow-sm">
                  ANABOLIC BOOST 🔥
                </span>
              </div>

              {/* Strength Progression Callout for PT */}
              {formData.strengthMetrics && (
                <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-blue-600 uppercase font-bold block">
                        SOVRACCARICO PROGRESSIVO // FORZA ACQUISITA
                      </span>
                      <span className="text-xs text-slate-700 font-medium">
                        Forza complessiva sui fondamentali: <strong className="text-blue-600">+{formData.strengthMetrics.totalStrengthGainKg} kg</strong> ({formData.strengthMetrics.comparisonPeriod.toLowerCase()})
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500 self-end sm:self-center">
                    Panca: <strong className="text-slate-900">82.5kg (+7.5kg)</strong> • Squat: <strong className="text-slate-900">105kg (+10kg)</strong>
                  </div>
                </div>
              )}

              {/* Action Button: Enter New BIA Scan */}
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Cronologia Referti BIA & Check-in</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddBiaModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-mono font-black uppercase tracking-wider shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Inserisci Referto BIA</span>
                </button>
              </div>

              {/* BIA Timeline Records */}
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {biaList.map((record) => {
                  const isAthleteSelf = record.source === 'athlete_self_check';

                  return (
                    <div
                      key={record.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-900">{record.date}</span>
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            isAthleteSelf 
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {isAthleteSelf ? 'SELF-CHECK ATLETA' : 'SCAN BIA PRO'}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-slate-900">
                          {record.weightKg} KG
                        </span>
                      </div>

                      {/* Metric pills */}
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-[11px] font-mono">
                        <div className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100">
                          <span className="text-slate-400 block text-[9px]">GRASSO</span>
                          <span className="font-bold text-sky-700">{record.fatMassPercent}% ({record.fatMassKg}kg)</span>
                        </div>

                        <div className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100">
                          <span className="text-slate-400 block text-[9px]">MUSCOLO</span>
                          <span className="font-bold text-blue-700">{record.muscleMassKg} kg</span>
                        </div>

                        <div className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100">
                          <span className="text-slate-400 block text-[9px]">ACQUA TBW</span>
                          <span className="font-bold text-slate-800">{record.totalBodyWaterPercent}%</span>
                        </div>

                        <div className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100">
                          <span className="text-slate-400 block text-[9px]">VISCERALE</span>
                          <span className="font-bold text-amber-700">Liv. {record.visceralFatRating}</span>
                        </div>

                        <div className="bg-slate-50 p-1.5 rounded-lg text-center border border-slate-100">
                          <span className="text-slate-400 block text-[9px]">METABOLISMO</span>
                          <span className="font-bold text-slate-800">{record.basalMetabolicRateKcal} kcal</span>
                        </div>
                      </div>

                      {record.notes && (
                        <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100 font-mono">
                          Note: {record.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: STATO UTENTE & GESTIONE SLOT */}
          {activeTab === 'stato' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <h4 className="text-xs font-mono font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Stato di Accesso & Consumo Slot PT</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Per disattivare un atleta che ha terminato il coaching o liberare uno slot nel tuo pacchetto, seleziona lo stato:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.status === 'active'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-900">ATLETA ATTIVO</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Accede normalmente all'app e occupa 1 slot del tuo pacchetto.
                    </p>
                  </div>

                  <div
                    onClick={() => setFormData(prev => ({ ...prev, status: 'archived' }))}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.status === 'archived'
                        ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="text-slate-900">DISATTIVATO / ARCHIVIO</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Accesso sospeso. <strong>Libera immediatamente 1 slot</strong> mantenendo al sicuro tutto lo storico.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1">Scadenza Abbonamento Coaching</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <input
                    type="date"
                    value={formData.packageExpiryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, packageExpiryDate: e.target.value }))}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleToggleArchive}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                    formData.status === 'archived'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  {formData.status === 'archived' ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Ripristina e Riattiva Atleta (Occupa Slot)</span>
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4" />
                      <span>Disattiva Ora per Liberare 1 Slot</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: RECUPERO & TIMER SERIE (CONFIGURABILE DAL PERSONAL TRAINER) */}
          {activeTab === 'recupero' && (
            <div className="space-y-4">
              {/* Technogym Live Hero Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-cyan-500 absolute top-0 left-0" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-black uppercase text-slate-900 font-mono tracking-tight">
                        Timer Recupero Tra le Serie per {formData.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Conto alla rovescia automatico avviato ad ogni serie confermata dall'atleta
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-800 font-mono font-black text-xs flex items-center gap-1.5 shadow-xs">
                    <span className="text-amber-400">⏱️</span>
                    <span>
                      {Math.floor((formData.defaultRestSeconds || 90) / 60)}m {(formData.defaultRestSeconds || 90) % 60}s
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  ⚡ <strong>Regola del Coach:</strong> Quando {formData.name} tocca la spunta verde per confermare una serie nella sua console, la schermata avvierà istantaneamente il conto alla rovescia per la serie successiva con questo tempo.
                </p>

                {/* Preset Chips */}
                <div className="space-y-2 pt-1">
                  <label className="text-[10px] font-mono uppercase text-slate-600 font-bold block">
                    Seleziona Tempo di Recupero Generale (Preset Rapidi):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[30, 45, 60, 75, 90, 120, 150, 180, 240].map((seconds) => {
                      const isSelected = (formData.defaultRestSeconds || 90) === seconds;
                      const mins = Math.floor(seconds / 60);
                      const remSec = seconds % 60;
                      const label = mins > 0 ? (remSec > 0 ? `${mins}m ${remSec}s` : `${mins} min`) : `${seconds}s`;

                      return (
                        <button
                          key={seconds}
                          type="button"
                          onClick={() => handleSetDefaultRest(seconds)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105 font-black ring-2 ring-blue-500/20'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                          }`}
                        >
                          <span>{seconds >= 120 ? '🏋️' : seconds >= 75 ? '⚡' : '🔥'}</span>
                          <span>{label}</span>
                          <span className={`text-[9px] ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>({seconds}s)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Stepper & Input */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase text-slate-600 font-bold">Tempo Personalizzato:</span>
                    <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleSetDefaultRest(Math.max(15, (formData.defaultRestSeconds || 90) - 15))}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold border border-slate-200 cursor-pointer shadow-xs"
                      >
                        -15
                      </button>
                      <input
                        type="number"
                        min="15"
                        max="600"
                        step="5"
                        value={formData.defaultRestSeconds || 90}
                        onChange={(e) => handleSetDefaultRest(Math.max(15, parseInt(e.target.value) || 90))}
                        className="w-16 bg-white border border-slate-200 rounded-lg py-1 text-center font-mono font-black text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-500 pr-1">SEC</span>
                      <button
                        type="button"
                        onClick={() => handleSetDefaultRest((formData.defaultRestSeconds || 90) + 15)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold border border-slate-200 cursor-pointer shadow-xs"
                      >
                        +15
                      </button>
                    </div>
                  </div>

                  {/* Mass apply button */}
                  <button
                    type="button"
                    onClick={handleApplyRestToAllExercises}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-blue-600 fill-current" />
                    <span>Applica {formData.defaultRestSeconds || 90}s a tutta la scheda</span>
                  </button>
                </div>
              </div>

              {/* Per-Exercise Fine Tuning on Assigned Routine */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <h4 className="text-xs font-mono font-black uppercase text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Dumbbell className="w-3.5 h-3.5 text-blue-600" />
                      Taratura Esercizio per Esercizio: {formData.currentWorkoutPlan}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      Personalizza i secondi di recupero specifici per ogni singolo esercizio di questo atleta
                    </span>
                  </div>
                </div>

                {/* If routine has splits */}
                {formData.assignedRoutine?.splits && formData.assignedRoutine.splits.length > 0 ? (
                  <div className="space-y-4">
                    {formData.assignedRoutine.splits.map((split, splitIdx) => {
                      const splitTheme = getMuscleGroupTheme(split.targetMuscleGroup || split.name);
                      return (
                        <div key={split.id || splitIdx} className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden">
                          <div className={`px-3.5 py-2 border-b border-slate-200 flex items-center justify-between bg-white`}>
                            <div className="flex items-center gap-2">
                              <span>{splitTheme.icon}</span>
                              <span className="text-xs font-black font-mono uppercase text-slate-900">{split.name}</span>
                              <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded border ${splitTheme.badgeBg}`}>
                                {split.targetMuscleGroup}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 font-bold">{split.exercises.length} esercizi</span>
                          </div>

                          <div className="p-3 space-y-2">
                            {split.exercises.map((ex, exIdx) => {
                              const exTheme = getMuscleGroupTheme(ex.muscle || ex.name);
                              const currentSec = ex.restSeconds || formData.defaultRestSeconds || 90;

                              return (
                                <div
                                  key={ex.exerciseId || exIdx}
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className={`w-6 h-6 rounded-lg text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 ${exTheme.lightStripe}`}>
                                      {exIdx + 1}
                                    </span>
                                    <div className="truncate">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-slate-900 truncate">{ex.name}</span>
                                        <span className={`text-[8px] font-mono font-bold px-1 rounded border shrink-0 ${exTheme.badgeBg}`}>
                                          {ex.muscle}
                                        </span>
                                      </div>
                                      <span className="text-[9px] font-mono text-slate-500">{ex.sets.length} serie programmate</span>
                                    </div>
                                  </div>

                                  {/* Rest Adjuster */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateExerciseRest(splitIdx, exIdx, currentSec - 15)}
                                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-200 cursor-pointer"
                                      title="Diminuisci 15 secondi"
                                    >
                                      -15
                                    </button>
                                    <div className="flex items-center gap-1 bg-slate-900 text-white px-2.5 py-1 rounded-xl border border-slate-800 shadow-xs">
                                      <input
                                        type="number"
                                        min="15"
                                        max="600"
                                        step="5"
                                        value={currentSec}
                                        onChange={(e) => handleUpdateExerciseRest(splitIdx, exIdx, parseInt(e.target.value) || 60)}
                                        className="w-10 bg-transparent text-right font-mono font-black text-white text-xs focus:outline-none"
                                      />
                                      <span className="text-[9px] text-amber-400 font-mono font-bold">SEC</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateExerciseRest(splitIdx, exIdx, currentSec + 15)}
                                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-200 cursor-pointer"
                                      title="Aumenta 15 secondi"
                                    >
                                      +15
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Fallback if single routine */
                  <div className="space-y-2">
                    {(formData.assignedRoutine?.exercises || []).map((ex, exIdx) => {
                      const exTheme = getMuscleGroupTheme(ex.muscle || ex.name);
                      const currentSec = ex.restSeconds || formData.defaultRestSeconds || 90;

                      return (
                        <div
                          key={ex.exerciseId || exIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{ex.name}</span>
                            <span className={`text-[8px] font-mono px-1 rounded border ${exTheme.badgeBg}`}>{ex.muscle}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1 bg-slate-900 text-white px-2.5 py-1 rounded-xl border border-slate-800">
                              <input
                                type="number"
                                min="15"
                                max="600"
                                value={currentSec}
                                onChange={(e) => handleUpdateExerciseRest(null, exIdx, parseInt(e.target.value) || 60)}
                                className="w-10 bg-transparent text-right font-mono font-black text-white text-xs focus:outline-none"
                              />
                              <span className="text-[9px] text-amber-400 font-mono font-bold">SEC</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer with Save Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-[10px] font-mono text-slate-400">ID ATLETA: {formData.id}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono uppercase font-bold text-slate-700 cursor-pointer transition-colors border border-slate-200"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salva Dossier & Recuperi</span>
              </button>
            </div>
          </div>
        </form>

        {/* Sub-modal: Inserimento Referto BIA */}
        {showAddBiaModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="text-base font-black font-mono uppercase text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <span>Nuovo Referto BIA (Bioimpedenziometria)</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddBiaModal(false)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddBiaSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Peso Corporeo (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newBiaWeight}
                      onChange={(e) => setNewBiaWeight(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Massa Grassa % (FM)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newBiaFatPercent}
                      onChange={(e) => setNewBiaFatPercent(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Massa Muscolare (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newBiaMuscleKg}
                      onChange={(e) => setNewBiaMuscleKg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Acqua Totale % (TBW)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newBiaWaterPercent}
                      onChange={(e) => setNewBiaWaterPercent(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Grasso Viscerale (1-12)</label>
                    <input
                      type="number"
                      value={newBiaVisceral}
                      onChange={(e) => setNewBiaVisceral(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">BMR (kcal)</label>
                    <input
                      type="number"
                      value={newBiaBmr}
                      onChange={(e) => setNewBiaBmr(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Circonferenza Vita (cm)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newBiaWaist}
                      onChange={(e) => setNewBiaWaist(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">Note Tecniche Referto</label>
                  <input
                    type="text"
                    value={newBiaNotes}
                    onChange={(e) => setNewBiaNotes(e.target.value)}
                    placeholder="Es. Misurazione ore 18:00 a digiuno da 3h"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddBiaModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer border border-slate-200"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    Salva Scansione BIA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
