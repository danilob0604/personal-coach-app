import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Plus, Minus, X, Zap } from 'lucide-react';

export const RestTimerModal: React.FC = () => {
  const { restTimer, dismissRestTimer, addRestTimerSeconds, currentRole, t } = useFitness();

  // If in athlete view, the countdown HUD is integrated directly in the Athlete App interface
  if (currentRole === 'athlete') return null;
  if (!restTimer.active || restTimer.remaining <= 0) return null;

  const minutes = Math.floor(restTimer.remaining / 60);
  const seconds = restTimer.remaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate circular stroke offset
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = (restTimer.remaining / restTimer.total);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="bg-white/95 backdrop-blur-2xl border-2 border-blue-500/30 rounded-3xl p-4 shadow-xl shadow-slate-300/60 w-84 text-slate-900">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-600">
              {t.restTimer.tag}
            </span>
          </div>
          <button
            onClick={dismissRestTimer}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Chronometer Display */}
        <div className="my-3 flex items-center justify-center gap-5">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-blue-600 transition-all duration-1000 ease-linear"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black font-mono tracking-tighter text-slate-900">
                {formattedTime}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase">{t.restTimer.targetEx}</div>
            <div className="text-xs font-bold text-slate-900 truncate mt-0.5 max-w-[140px]">
              {restTimer.exerciseName}
            </div>
            <div className="text-[10px] text-blue-600 font-mono mt-1 font-bold">
              {t.restTimer.atpRecharge} {Math.round((1 - progress) * 100)}%
            </div>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <button
            onClick={() => addRestTimerSeconds(-15)}
            className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-2 rounded-xl text-xs font-mono font-bold transition-colors border border-slate-200 cursor-pointer"
          >
            <Minus className="w-3 h-3" />
            <span>15s</span>
          </button>
          <button
            onClick={() => addRestTimerSeconds(30)}
            className="flex-1 flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-2 rounded-xl text-xs font-mono font-bold transition-colors border border-slate-200 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>30s</span>
          </button>
          <button
            onClick={dismissRestTimer}
            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-2 rounded-xl text-xs font-mono tracking-wider transition-all shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{t.restTimer.readyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
