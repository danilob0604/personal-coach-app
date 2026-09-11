import React, { useState } from 'react';
import { X, Dumbbell, Sparkles } from 'lucide-react';

interface PlateCalculatorModalProps {
  targetWeightKg: number;
  exerciseName: string;
  onClose: () => void;
}

interface PlateStyle {
  color: string;
  textColor: string;
  bgHex: string;
  heightPx: number;
  widthPx: number;
  name: string;
}

const PLATE_STYLES: Record<number, PlateStyle> = {
  25: { color: 'bg-rose-600', textColor: 'text-white', bgHex: '#e11d48', heightPx: 96, widthPx: 22, name: 'Rosso' },
  20: { color: 'bg-blue-600', textColor: 'text-white', bgHex: '#2563eb', heightPx: 90, widthPx: 20, name: 'Blu' },
  15: { color: 'bg-amber-400', textColor: 'text-slate-950', bgHex: '#f59e0b', heightPx: 82, widthPx: 18, name: 'Giallo' },
  10: { color: 'bg-emerald-500', textColor: 'text-white', bgHex: '#10b981', heightPx: 74, widthPx: 16, name: 'Verde' },
  5:  { color: 'bg-slate-200', textColor: 'text-slate-900', bgHex: '#e2e8f0', heightPx: 60, widthPx: 14, name: 'Bianco' },
  2.5: { color: 'bg-slate-800', textColor: 'text-white', bgHex: '#1e293b', heightPx: 50, widthPx: 12, name: 'Nero' },
  1.25: { color: 'bg-cyan-200', textColor: 'text-cyan-950', bgHex: '#a5f3fc', heightPx: 42, widthPx: 10, name: 'Micro' }
};

export const PlateCalculatorModal: React.FC<PlateCalculatorModalProps> = ({
  targetWeightKg,
  exerciseName,
  onClose
}) => {
  const [barWeight, setBarWeight] = useState<number>(20);
  const [weight, setWeight] = useState<number>(targetWeightKg);

  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];

  // Calculate plates per side
  const calculatePlates = () => {
    let perSide = Math.max(0, (weight - barWeight) / 2);
    const platesList: { weight: number; count: number; style: PlateStyle }[] = [];
    const platesSequence: { weight: number; style: PlateStyle }[] = [];

    for (const p of availablePlates) {
      if (perSide >= p) {
        const count = Math.floor(perSide / p);
        perSide = parseFloat((perSide - count * p).toFixed(2));
        platesList.push({ weight: p, count, style: PLATE_STYLES[p] });
        for (let i = 0; i < count; i++) {
          platesSequence.push({ weight: p, style: PLATE_STYLES[p] });
        }
      }
    }

    return {
      perSideKg: Math.max(0, (weight - barWeight) / 2),
      platesList,
      platesSequence,
      remainder: perSide
    };
  };

  const { perSideKg, platesList, platesSequence, remainder } = calculatePlates();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl p-5 text-white shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Calcolatore Dischi
              </span>
              <h3 className="text-sm font-black uppercase text-white truncate max-w-[240px]">
                {exerciseName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Weight Pod & Bar Selectors */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">Carico Totale</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWeight(prev => Math.max(barWeight, parseFloat((prev - 2.5).toFixed(1))))}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-black border border-slate-700 cursor-pointer"
              >
                -2.5
              </button>
              <div className="flex items-baseline gap-1 min-w-[70px] justify-center">
                <span className="text-2xl font-black font-mono text-amber-400 tracking-tight">{weight}</span>
                <span className="text-xs font-mono font-bold text-slate-400">KG</span>
              </div>
              <button
                type="button"
                onClick={() => setWeight(prev => parseFloat((prev + 2.5).toFixed(1)))}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 font-mono text-xs font-black border border-slate-700 cursor-pointer"
              >
                +2.5
              </button>
            </div>
          </div>

          {/* Bar Type Selector */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400 font-bold">
              <span>Tara Bilanciere:</span>
              <span className="text-blue-400">{barWeight} KG</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { weight: 20, label: '20kg Olimpico' },
                { weight: 15, label: '15kg Tecnico' },
                { weight: 10, label: '10kg Sagomato EZ' }
              ].map(bar => (
                <button
                  key={bar.weight}
                  type="button"
                  onClick={() => setBarWeight(bar.weight)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                    barWeight === bar.weight
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-400'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {bar.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Barbell Sleeve Representation */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 text-center space-y-3 overflow-hidden">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center justify-between">
            <span>Schema Manicotto (1 Lato)</span>
            <span className="text-emerald-400 font-black font-mono">{perSideKg} KG / lato</span>
          </div>

          {/* Barbell graphic */}
          <div className="py-2 flex items-center justify-center min-h-[110px] relative overflow-x-auto">
            {/* The Bar Shaft (inside collar) */}
            <div className="w-8 h-4 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-l-xs shrink-0 shadow-inner" />
            {/* The Bar Collar */}
            <div className="w-3.5 h-16 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border border-slate-400 rounded-sm shrink-0 shadow-md" />
            
            {/* The Plates Sequence */}
            <div className="flex items-center gap-0.5 bg-slate-900/60 px-1 py-1 rounded-r-md border-r-4 border-slate-400">
              {platesSequence.length > 0 ? (
                platesSequence.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: `${p.style.heightPx}px`,
                      width: `${p.style.widthPx}px`,
                      backgroundColor: p.style.bgHex
                    }}
                    className="rounded-xs flex flex-col items-center justify-center shadow-lg border border-black/30 shrink-0 transition-transform active:scale-105"
                    title={`${p.weight} kg`}
                  >
                    <span className={`text-[8px] font-mono font-black leading-none ${p.style.textColor} rotate-90 select-none`}>
                      {p.weight}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-6 text-xs font-mono text-slate-500 italic">
                  Solo bilanciere scarico ({barWeight} kg)
                </div>
              )}
            </div>

            {/* Outside Sleeve Tip */}
            <div className="w-6 h-4 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-r-xs shrink-0" />
          </div>

          {/* Itemized badge list */}
          {platesList.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {platesList.map((item) => (
                <span
                  key={item.weight}
                  style={{ backgroundColor: item.style.bgHex }}
                  className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-lg ${item.style.textColor} border border-black/20 shadow-xs flex items-center gap-1`}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{item.count}× {item.weight} KG</span>
                </span>
              ))}
            </div>
          )}

          {remainder > 0 && (
            <div className="text-[10px] font-mono text-amber-400 pt-1">
              ⚠️ Rimanente non divisibile con dischi standard: {remainder * 2} kg totali
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs font-mono uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-98"
        >
          Ho Caricato il Bilanciere ✓
        </button>
      </div>
    </div>
  );
};
