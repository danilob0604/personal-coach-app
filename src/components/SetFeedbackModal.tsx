import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, Flame, Send } from 'lucide-react';

export type SetFeedbackTag = 'easy' | 'limit' | 'pain';

interface SetFeedbackModalProps {
  exerciseName: string;
  setNumber: number;
  initialTag?: SetFeedbackTag;
  initialNote?: string;
  onSave: (tag: SetFeedbackTag, note?: string) => void;
  onClose: () => void;
}

export const SetFeedbackModal: React.FC<SetFeedbackModalProps> = ({
  exerciseName,
  setNumber,
  initialTag,
  initialNote = '',
  onSave,
  onClose
}) => {
  const [selectedTag, setSelectedTag] = useState<SetFeedbackTag | undefined>(initialTag);
  const [note, setNote] = useState<string>(initialNote);

  const handleTagClick = (tag: SetFeedbackTag) => {
    setSelectedTag(tag);
    // If not pain, save immediately or let them confirm
    if (tag !== 'pain') {
      onSave(tag, undefined);
      onClose();
    }
  };

  const handlePainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTag) return;
    onSave(selectedTag, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-sm bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl p-5 text-white shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              Sensazioni Serie {setNumber}
            </span>
            <h3 className="text-sm font-black uppercase text-white truncate max-w-[240px]">
              {exerciseName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Color Tag Selectors */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
            Come è andata questa serie?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Tag 1: Ottimo / Facile */}
            <button
              type="button"
              onClick={() => handleTagClick('easy')}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                selectedTag === 'easy'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/10 scale-105'
                  : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/50 text-slate-300'
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-black uppercase">Ottimo</span>
              <span className="text-[9px] text-slate-400 font-medium">Carico facile</span>
            </button>

            {/* Tag 2: Al Limite / Cedimento */}
            <button
              type="button"
              onClick={() => handleTagClick('limit')}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                selectedTag === 'limit'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10 scale-105'
                  : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-300'
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500/30 text-amber-400 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-black uppercase">Al Limite</span>
              <span className="text-[9px] text-slate-400 font-medium">RPE 9-10</span>
            </button>

            {/* Tag 3: Dolore / Fastidio */}
            <button
              type="button"
              onClick={() => setSelectedTag('pain')}
              className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                selectedTag === 'pain'
                  ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-md shadow-rose-500/20 scale-105'
                  : 'bg-slate-800/80 border-slate-700 hover:border-rose-500/50 text-slate-300'
              }`}
            >
              <div className="w-7 h-7 rounded-xl bg-rose-500/30 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-black uppercase">Dolore</span>
              <span className="text-[9px] text-slate-400 font-medium">Fastidio fisico</span>
            </button>
          </div>
        </div>

        {/* Automatic Note Field when DOLORE is selected */}
        {selectedTag === 'pain' && (
          <form onSubmit={handlePainSubmit} className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-mono font-black uppercase tracking-wider">
                  Allerta Personal Trainer
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Descrivi cosa hai avvertito per permettere al Coach di rimodulare l'esercizio:
              </p>
              <textarea
                autoFocus
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Es. Fitta acuta alla spalla sinistra durante la fase di discesa..."
                className="w-full bg-slate-900 border border-rose-500/30 focus:border-rose-400 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={!note.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 disabled:opacity-40 text-white font-black text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all cursor-pointer active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invia Segnalazione al Coach</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
