import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { 
  UserPlus, 
  Search, 
  Archive, 
  RotateCcw, 
  Calendar, 
  Flame, 
  Sparkles, 
  Lock, 
  Activity, 
  FileText,
  Timer 
} from 'lucide-react';
import type { Athlete } from '../../types';
import { AthleteDossierModal } from '../../components/AthleteDossierModal';
import { translateRoutineTitle } from '../../i18n/translations';

export const TrainerAthletesTab: React.FC<{ onSelectAthlete: (athlete: Athlete) => void }> = () => {
  const { 
    athletes, 
    activeAthletesCount, 
    maxAthletes, 
    isSlotLimitReached, 
    addAthlete, 
    archiveAthlete, 
    restoreAthlete, 
    setUpgradeModalOpen, 
    currentPlan,
    t,
    language 
  } = useFitness();

  const [selectedAthleteForDossier, setSelectedAthleteForDossier] = useState<Athlete | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'inactive' | 'archived'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New athlete form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goals, setGoals] = useState('');
  const [weightKg, setWeightKg] = useState('75');

  const filteredAthletes = athletes.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                          a.email.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'all') return a.status !== 'archived';
    if (filter === 'archived') return a.status === 'archived';
    return a.status === filter;
  });

  const handleOpenAdd = () => {
    if (isSlotLimitReached) {
      setUpgradeModalOpen(true);
    } else {
      setShowAddModal(true);
    }
  };

  const handleSaveAthlete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const success = addAthlete({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      currentWorkoutPlan: 'Protocollo Forza Base',
      weightKg: parseFloat(weightKg) || 75,
      goals: goals || 'Obiettivi generali'
    });

    if (success) {
      setName('');
      setEmail('');
      setGoals('');
      setShowAddModal(false);
    }
  };

  const percentOccupied = Math.min(100, Math.round((activeAthletesCount / maxAthletes) * 100));

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Banner: Telemetry Slot Gatekeeper Gauge */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-600">
                {t.trainer.crm.gaugeTitle} {currentPlan.name.toUpperCase()}
              </span>
              {isSlotLimitReached && (
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3" /> {t.trainer.crm.allSlotsEngaged}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 mt-1 flex items-baseline gap-2 tracking-tight">
              <span>{activeAthletesCount} / {maxAthletes}</span>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">{t.trainer.crm.activeRoster}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-black uppercase tracking-wider text-slate-700 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.trainer.crm.upgradeTier}</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                isSlotLimitReached
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSlotLimitReached ? t.trainer.crm.slotsFull : t.trainer.crm.enrollAthlete}</span>
            </button>
          </div>
        </div>

        {/* Battery / Progress Gauge */}
        <div className="mt-4 sm:mt-5">
          <div className="w-full bg-slate-100 border border-slate-200 h-2.5 sm:h-3 rounded-xl overflow-hidden p-0.5">
            <div
              className={`h-full rounded-lg transition-all duration-500 ${
                percentOccupied >= 100
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-sm shadow-rose-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/50'
              }`}
              style={{ width: `${percentOccupied}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
            <span>{maxAthletes - activeAthletesCount} {t.trainer.crm.availableSlots}</span>
            <span>{percentOccupied}% {t.trainer.crm.capacityEngaged}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.trainer.crm.searchPlaceholder}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
              filter === 'all' ? 'bg-white text-blue-600 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.trainer.crm.filterAll} ({athletes.filter(a => a.status !== 'archived').length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
              filter === 'inactive' ? 'bg-rose-500 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.trainer.crm.filterInactive} ({athletes.filter(a => a.status === 'inactive').length})
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 rounded-lg font-bold uppercase transition-all cursor-pointer whitespace-nowrap text-center ${
              filter === 'archived' ? 'bg-slate-800 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.trainer.crm.filterArchived} ({athletes.filter(a => a.status === 'archived').length})
          </button>
        </div>
      </div>

      {/* Athletes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredAthletes.map((athlete) => {
          const isArchived = athlete.status === 'archived';

          return (
            <div
              key={athlete.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isArchived
                  ? 'bg-slate-100/60 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl object-cover border-2 border-slate-100 shadow-xs shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight truncate">{athlete.name}</h4>
                      {athlete.status === 'active' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title={language === 'it' ? 'Attivo' : language === 'es' ? 'Activo' : 'Active'} />
                      )}
                      {athlete.status === 'inactive' && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title={language === 'it' ? 'Inattivo da giorni' : language === 'es' ? 'Inactivo desde hace días' : 'Inactive for days'} />
                      )}
                      {athlete.status === 'expiring' && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title={language === 'it' ? 'Scadenza vicina' : language === 'es' ? 'Vencimiento cercano' : 'Expiring soon'} />
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 truncate">{athlete.email}</div>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                      <span className="text-[11px] text-blue-600 font-mono font-bold uppercase truncate max-w-[140px]">
                        {translateRoutineTitle(athlete.currentWorkoutPlan, language)}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-black shrink-0" title={language === 'it' ? 'Tempo di recupero standard configurato dal coach' : language === 'es' ? 'Tiempo de descanso estándar configurado por el entrenador' : 'Standard rest time configured by coach'}>
                        <Timer className="w-3 h-3 text-amber-600" />
                        {athlete.defaultRestSeconds || 90}s {language === 'it' ? 'rec' : language === 'es' ? 'desc' : 'rest'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setSelectedAthleteForDossier(athlete)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer shadow-xs flex items-center gap-1 text-xs font-mono font-bold"
                    title={t.trainer.crm.openDossierTitle}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.trainer.crm.dossierBtn}</span>
                  </button>

                  {isArchived ? (
                    <button
                      onClick={() => restoreAthlete(athlete.id)}
                      className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-colors cursor-pointer shadow-xs"
                      title={t.trainer.crm.restore}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.trainer.crm.restore}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => archiveAthlete(athlete.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-amber-600 border border-slate-200 transition-colors cursor-pointer shadow-xs"
                      title={t.trainer.crm.archive}
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Stats telemetry */}
              {!isArchived && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.trainer.crm.compliance} <strong className="text-slate-900 font-bold">{athlete.complianceRate}%</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {athlete.lastWorkoutDaysAgo === 0
                        ? t.trainer.crm.today
                        : `${athlete.lastWorkoutDaysAgo} ${t.trainer.crm.daysAgo}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{athlete.weightKg} KG</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Athlete Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl space-y-4">
            <div>
              <div className="text-[10px] font-mono text-blue-600 uppercase tracking-widest font-bold">{t.trainer.crm.rosterEnrollment}</div>
              <h3 className="text-lg font-black uppercase text-slate-900 mt-0.5">{t.trainer.crm.modalTitle}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.trainer.crm.modalSubtitle}
              </p>
            </div>

            <form onSubmit={handleSaveAthlete} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 font-bold">{t.trainer.crm.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rossi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 font-bold">{t.trainer.crm.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@athlete.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 font-bold">{t.trainer.crm.weightLabel}</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-600 block mb-1 font-bold">{t.trainer.crm.goalLabel}</label>
                  <input
                    type="text"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder={language === 'it' ? 'Es. Ipertrofia' : language === 'es' ? 'Ej. Hipertrofia' : 'E.g. Hypertrophy'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono uppercase font-bold text-slate-700 cursor-pointer border border-slate-200"
                >
                  {t.trainer.crm.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  {t.trainer.crm.submitEnroll}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Athlete Dossier & Anamnesis Modal */}
      {selectedAthleteForDossier && (
        <AthleteDossierModal
          athlete={selectedAthleteForDossier}
          onClose={() => setSelectedAthleteForDossier(null)}
        />
      )}
    </div>
  );
};
