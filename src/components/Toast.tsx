import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Radio } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useFitness();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-18 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white/95 border border-slate-200 text-slate-900 px-4 py-3 rounded-2xl shadow-xl shadow-slate-200/80 flex items-center gap-3.5 max-w-md backdrop-blur-xl">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
          <Radio className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-xs font-mono font-bold text-slate-800 leading-snug">
          {toastMessage}
        </div>
      </div>
    </div>
  );
};
