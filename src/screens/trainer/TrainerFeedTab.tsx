import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  Clock, 
  ArrowUpRight, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import type { LiveActivityFeedItem } from '../../types';

export const TrainerFeedTab: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  const { feed, markFeedReviewed, t, language } = useFitness();

  const getLocalizedFeed = (item: LiveActivityFeedItem) => {
    if (item.id === 'feed-1') {
      return {
        title: language === 'it' ? 'Nuovo Record Personale! 🏆' : language === 'es' ? '¡Nuevo Récord Personal! 🏆' : 'New Personal Record! 🏆',
        detail: language === 'it' ? 'Ha appena completato Hip Thrust 90 kg x 8 rip. (+15 kg rispetto al mese scorso)' : language === 'es' ? 'Acaba de completar Hip Thrust 90 kg x 8 reps (+15 kg respecto al mes anterior)' : 'Just completed Hip Thrust 90 kg x 8 reps (+15 kg compared to last month)',
        timestamp: language === 'it' ? '5 MINUTI FA' : language === 'es' ? 'HACE 5 MINUTOS' : '5 MINUTES AGO'
      };
    }
    if (item.id === 'feed-2') {
      return {
        title: language === 'it' ? 'Allenamento completato' : language === 'es' ? 'Entrenamiento completado' : 'Workout completed',
        detail: language === 'it' ? 'Sessione "Spinta A" portata a termine in 52 min con 100% serie completate' : language === 'es' ? 'Sesión "Empuje A" completada en 52 min con 100% series completadas' : 'Session "Push A" completed in 52 min with 100% sets done',
        timestamp: language === 'it' ? '25 MINUTI FA' : language === 'es' ? 'HACE 25 MINUTOS' : '25 MINUTES AGO'
      };
    }
    if (item.id === 'feed-3') {
      return {
        title: language === 'it' ? 'Nuovo video esecuzione da verificare 📹' : language === 'es' ? 'Nuevo video de ejecución para revisar 📹' : 'New form video to review 📹',
        detail: language === 'it' ? "Ha registrato l'ultima serie di Squat 110 kg x 4 rip. per controllo profondità" : language === 'es' ? "Grabó la última serie de Squat 110 kg x 4 reps para control de profundidad" : "Recorded last set of Squat 110 kg x 4 reps for depth check",
        timestamp: language === 'it' ? '1 ORA FA' : language === 'es' ? 'HACE 1 HORA' : '1 HOUR AGO'
      };
    }
    if (item.id === 'feed-4') {
      return {
        title: language === 'it' ? 'Radar Inattività: 5 giorni senza allenamento ⚠️' : language === 'es' ? 'Radar de Inactividad: 5 días sin entrenar ⚠️' : 'Inactivity Radar: 5 days without workout ⚠️',
        detail: language === 'it' ? 'Non apre la scheda da giovedì scorso. Consigliato invio promemoria motivazionale.' : language === 'es' ? 'No abre la rutina desde el jueves pasado. Se sugiere enviar recordatorio motivacional.' : 'Has not opened workout since last Thursday. Motivational reminder recommended.',
        timestamp: language === 'it' ? 'OGGI ALLE 08:30' : language === 'es' ? 'HOY A LAS 08:30' : 'TODAY AT 08:30'
      };
    }
    return {
      title: item.title,
      detail: item.detail,
      timestamp: item.timestamp.toUpperCase()
    };
  };

  const getFeedIcon = (type: LiveActivityFeedItem['type']) => {
    switch (type) {
      case 'new_pr':
        return (
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 shadow-sm">
            <Trophy className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      case 'workout_completed':
        return (
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      case 'inactivity_alert':
        return (
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
      case 'video_submitted':
        return (
          <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 shadow-sm">
            <Video className="w-5 h-5 stroke-[2.5]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-mono uppercase tracking-tight flex items-center gap-2.5">
            <span>{t.trainer.feed.title}</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            {t.trainer.feed.subTitle}
          </p>
        </div>
        <div className="text-xs text-slate-600 font-mono bg-white border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>{t.trainer.feed.socketConnected}</span>
        </div>
      </div>

      <div className="space-y-3">
        {feed.map((item) => {
          const localized = getLocalizedFeed(item);
          return (
          <div
            key={item.id}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
              item.requiresReview
                ? 'bg-rose-50/60 border-rose-200 shadow-sm'
                : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                {getFeedIcon(item.type)}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <img
                      src={item.athleteAvatar}
                      alt={item.athleteName}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">{item.athleteName}</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">• {localized.timestamp}</span>
                    {item.metric && (
                      <span className="text-[9px] sm:text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{localized.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">{localized.detail}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100/80 w-full sm:w-auto justify-end">
                {item.type === 'video_submitted' && (
                  <button
                    onClick={onOpenChat}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{t.trainer.feed.checkVideo}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {item.type === 'inactivity_alert' && (
                  <button
                    onClick={onOpenChat}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <span>{t.trainer.feed.alertCoach}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                {item.requiresReview && (
                  <button
                    onClick={() => markFeedReviewed(item.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors cursor-pointer shadow-xs"
                    title={t.trainer.feed.verifyMark}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
