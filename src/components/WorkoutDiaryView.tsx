import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Flame, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Dumbbell, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info
} from 'lucide-react';
import type { Athlete, WorkoutLogSession } from '../types';
import { fetchWorkoutLogs } from '../services/dbService';
import { getMuscleGroupTheme } from '../utils/muscleThemes';
import { useFitness } from '../context/FitnessContext';

interface WorkoutDiaryViewProps {
  athlete: Athlete;
  isCoachView?: boolean;
}

export const WorkoutDiaryView: React.FC<WorkoutDiaryViewProps> = ({ athlete, isCoachView = false }) => {
  const { language } = useFitness();
  const [logs, setLogs] = useState<WorkoutLogSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 8, 1)); // September 2026
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-11');
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>('Panca Piana con Bilanciere');

  // Fetch logs on mount or athlete change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchWorkoutLogs(athlete.id).then(data => {
      if (isMounted) {
        setLogs(data);
        if (data.length > 0) {
          // Default selected date to most recent log
          const latestLogDate = data[0].completedAt.split('T')[0];
          setSelectedDateStr(latestLogDate);
          
          // Find first available exercise
          const firstEx = data[0].exercisesData?.[0]?.name;
          if (firstEx) setSelectedExerciseName(firstEx);
        }
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [athlete.id]);

  // Aggregate stats
  const stats = useMemo(() => {
    const totalSessions = logs.length;
    const totalVolume = logs.reduce((sum, l) => sum + (l.totalVolumeKg || 0), 0);
    const totalMinutes = logs.reduce((sum, l) => sum + (l.durationMinutes || 50), 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
    
    // Streak: sessions in the last 30 days
    const streakWeeks = Math.max(3, athlete.athleticLevel || 1);
    
    return {
      totalSessions,
      totalVolume,
      totalHours,
      streakWeeks
    };
  }, [logs, athlete.athleticLevel]);

  // Set of dates with completed workouts (YYYY-MM-DD)
  const workoutDatesMap = useMemo(() => {
    const map = new Map<string, WorkoutLogSession[]>();
    logs.forEach(log => {
      const dateStr = log.completedAt.split('T')[0];
      const existing = map.get(dateStr) || [];
      existing.push(log);
      map.set(dateStr, existing);
    });
    return map;
  }, [logs]);

  // Selected session data
  const selectedSessions = useMemo(() => {
    return workoutDatesMap.get(selectedDateStr) || [];
  }, [workoutDatesMap, selectedDateStr]);

  // Calendar matrix generator
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon, ...
    // Adjust to Monday = 0
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days: Array<{
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      hasWorkout: boolean;
      splits: string[];
    }> = [];

    // Previous month padding
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const sessions = workoutDatesMap.get(dateStr) || [];
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        hasWorkout: sessions.length > 0,
        splits: sessions.map(s => s.splitName)
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const sessions = workoutDatesMap.get(dateStr) || [];
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        hasWorkout: sessions.length > 0,
        splits: sessions.map(s => s.splitName)
      });
    }

    // Next month padding (total cells divisible by 7)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const sessions = workoutDatesMap.get(dateStr) || [];
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        hasWorkout: sessions.length > 0,
        splits: sessions.map(s => s.splitName)
      });
    }

    return days;
  }, [currentMonth, workoutDatesMap]);

  // List of distinct exercises performed
  const distinctExercises = useMemo(() => {
    const set = new Set<string>();
    logs.forEach(log => {
      log.exercisesData?.forEach(ex => {
        if (ex.name) set.add(ex.name);
      });
    });
    return Array.from(set);
  }, [logs]);

  // Progression data for selected exercise
  const progressionData = useMemo(() => {
    if (!selectedExerciseName) return [];
    
    // Sort logs chronologically (oldest first)
    const sorted = [...logs].sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
    
    const points: Array<{
      date: string;
      displayDate: string;
      maxWeightKg: number;
      reps: number;
      totalVolume: number;
    }> = [];

    sorted.forEach(log => {
      const ex = log.exercisesData?.find(e => e.name === selectedExerciseName);
      if (ex && ex.sets && ex.sets.length > 0) {
        const completedSets = ex.sets.filter(s => s.completed || s.actualWeightKg > 0);
        if (completedSets.length > 0) {
          const maxWeight = Math.max(...completedSets.map(s => s.actualWeightKg || 0));
          const bestSet = completedSets.find(s => s.actualWeightKg === maxWeight) || completedSets[0];
          const totalExVol = completedSets.reduce((sum, s) => sum + (s.actualWeightKg * (s.actualReps || 0)), 0);
          
          const dObj = new Date(log.completedAt);
          const displayDate = dObj.toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short' });

          points.push({
            date: log.completedAt.split('T')[0],
            displayDate,
            maxWeightKg: maxWeight,
            reps: bestSet.actualReps || 8,
            totalVolume: totalExVol
          });
        }
      }
    });

    return points;
  }, [logs, selectedExerciseName, language]);

  // Overload delta calculation
  const overloadDelta = useMemo(() => {
    if (progressionData.length < 2) return null;
    const first = progressionData[0].maxWeightKg;
    const last = progressionData[progressionData.length - 1].maxWeightKg;
    const deltaKg = Math.round((last - first) * 10) / 10;
    const deltaPercent = first > 0 ? Math.round(((last - first) / first) * 1000) / 10 : 0;
    return {
      deltaKg,
      deltaPercent,
      isPositive: deltaKg >= 0
    };
  }, [progressionData]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthLabel = currentMonth.toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  if (loading) {
    return (
      <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
        <Activity className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
        <p className="text-xs font-mono text-slate-500">Caricamento diario presenze e progressi...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Banner for Coach View context if applicable */}
      {isCoachView && (
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={athlete.avatar} 
              alt={athlete.name} 
              className="w-10 h-10 rounded-xl object-cover border border-blue-400/40 shadow-xs" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">Dossier Presenze & Telemetria</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-black text-white">{athlete.name} — Diario di Bordo</h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-300 bg-blue-950/70 border border-blue-800 px-2.5 py-1 rounded-lg">
            {stats.totalSessions} Sessioni Archiviate
          </span>
        </div>
      )}

      {/* 1. Quick KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {/* Streak */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 shrink-0">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Costanza</span>
            <span className="text-sm sm:text-base font-black text-slate-900 truncate block">
              {stats.streakWeeks} Settimane
            </span>
          </div>
        </div>

        {/* Sessions Count */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Allenamenti</span>
            <span className="text-sm sm:text-base font-black text-slate-900 truncate block">
              {stats.totalSessions} Conclusi
            </span>
          </div>
        </div>

        {/* Total Volume */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Tonnellaggio</span>
            <span className="text-sm sm:text-base font-black text-slate-900 truncate block">
              {stats.totalVolume > 0 ? `${(stats.totalVolume / 1000).toFixed(1)}k kg` : '0 kg'}
            </span>
          </div>
        </div>

        {/* Gym Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Ore Totali</span>
            <span className="text-sm sm:text-base font-black text-slate-900 truncate block">
              {stats.totalHours}h Sala Pesi
            </span>
          </div>
        </div>
      </div>

      {/* 2. Monthly Attendance Calendar ("Pallini Verdi") */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
        {/* Calendar Header & Month Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight capitalize">
                {monthLabel}
              </h3>
              <p className="text-[10px] font-mono text-slate-500">
                Tocca un giorno con pallino verde per ispezionare la sessione
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Mese precedente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Mese successivo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center font-mono font-bold text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mer</span>
          <span>Gio</span>
          <span>Ven</span>
          <span>Sab</span>
          <span>Dom</span>
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {calendarDays.map((cell, idx) => {
            const isSelected = cell.dateStr === selectedDateStr;
            const isToday = cell.dateStr === '2026-09-11';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDateStr(cell.dateStr)}
                className={`min-h-[46px] sm:min-h-[54px] p-1 rounded-xl flex flex-col items-center justify-between border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-400/40 shadow-xs'
                    : cell.hasWorkout
                    ? 'bg-emerald-50/50 border-emerald-300 hover:border-emerald-400'
                    : cell.isCurrentMonth
                    ? 'bg-slate-50/60 border-slate-100 hover:border-slate-300 text-slate-700'
                    : 'bg-slate-50/20 border-transparent text-slate-300'
                }`}
              >
                {/* Day Number */}
                <div className="flex items-center justify-between w-full px-0.5">
                  <span className={`text-[10px] sm:text-xs font-mono font-bold ${
                    isSelected ? 'text-blue-700 font-black' : cell.isCurrentMonth ? 'text-slate-800' : 'text-slate-300'
                  }`}>
                    {cell.dayNumber}
                  </span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" title="Oggi" />
                  )}
                </div>

                {/* Workout Attendance Indicator (Emerald Glow / Dot) */}
                {cell.hasWorkout ? (
                  <div className="w-full flex items-center justify-center pb-0.5">
                    <div className="flex items-center gap-0.5 px-1 py-0.5 rounded-md bg-emerald-500 text-white shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[8px] sm:text-[9px] font-mono font-black uppercase tracking-tight">
                        {cell.splits[0]?.includes('Split B') ? 'B' : cell.splits[0]?.includes('Split C') ? 'C' : 'A'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-3" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
              <span>Sessione Eseguita</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Oggi</span>
            </div>
          </div>
          <span className="font-bold text-emerald-700">
            {logs.filter(l => l.completedAt.startsWith('2026-09')).length} allenamenti a Settembre
          </span>
        </div>
      </div>

      {/* 3. Curva Sovraccarico Progressivo (Interactive Overload Chart) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-md space-y-3">
        {/* Header & Exercise Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Curva Sovraccarico Progressivo
                </h3>
                {overloadDelta && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase ${
                    overloadDelta.isPositive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {overloadDelta.isPositive ? `+${overloadDelta.deltaKg} kg (+${overloadDelta.deltaPercent}%)` : `${overloadDelta.deltaKg} kg`}
                  </span>
                )}
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                Evoluzione del massimale effettivo sulle serie allenanti nel tempo
              </p>
            </div>
          </div>

          {/* Exercise Dropdown */}
          <select
            value={selectedExerciseName}
            onChange={(e) => setSelectedExerciseName(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer max-w-full sm:max-w-[220px]"
          >
            {distinctExercises.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>

        {/* SVG Graphic Curve Rendering */}
        {progressionData.length > 0 ? (
          <div className="space-y-2 pt-2">
            {/* SVG Chart Container */}
            <div className="relative h-44 sm:h-48 w-full bg-slate-950/60 rounded-xl border border-slate-800/80 p-3 flex flex-col justify-between">
              {/* Max & Min Y labels */}
              {(() => {
                const weights = progressionData.map(p => p.maxWeightKg);
                const minWeight = Math.min(...weights) - 2.5;
                const maxWeight = Math.max(...weights) + 2.5;
                const weightRange = maxWeight - minWeight || 1;

                // Generate points coordinates for SVG (viewBox 0 0 500 120)
                const width = 480;
                const height = 90;
                const paddingX = 25;
                const paddingY = 15;

                const coords = progressionData.map((pt, idx) => {
                  const x = paddingX + (idx / Math.max(1, progressionData.length - 1)) * (width - paddingX * 2);
                  const y = height - paddingY - ((pt.maxWeightKg - minWeight) / weightRange) * (height - paddingY * 2);
                  return { ...pt, x, y };
                });

                const polylinePoints = coords.map(c => `${c.x},${c.y}`).join(' ');
                const areaPoints = `${coords[0].x},${height} ` + polylinePoints + ` ${coords[coords.length - 1].x},${height}`;

                return (
                  <>
                    <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <polygon points={areaPoints} fill="url(#curveGradient)" />

                      {/* Horizontal Grid Guides */}
                      <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />

                      {/* Line Stroke */}
                      <polyline
                        points={polylinePoints}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Interactive Point Nodes */}
                      {coords.map((c, i) => (
                        <g key={i} className="cursor-pointer group">
                          {/* Outer glow */}
                          <circle cx={c.x} cy={c.y} r="6" fill="#0284c7" opacity="0.4" />
                          {/* Inner dot */}
                          <circle cx={c.x} cy={c.y} r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                          
                          {/* Text Value above point */}
                          <text 
                            x={c.x} 
                            y={c.y - 8} 
                            textAnchor="middle" 
                            fill="#e2e8f0" 
                            fontSize="9" 
                            fontFamily="monospace" 
                            fontWeight="bold"
                          >
                            {c.maxWeightKg}k
                          </text>

                          {/* X-axis Date label */}
                          <text 
                            x={c.x} 
                            y={height + 15} 
                            textAnchor="middle" 
                            fill="#94a3b8" 
                            fontSize="8" 
                            fontFamily="monospace"
                          >
                            {c.displayDate}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </>
                );
              })()}
            </div>

            {/* Bottom info ticker */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span>Carico di partenza: <strong className="text-white">{progressionData[0]?.maxWeightKg} kg</strong></span>
              <span>Carico attuale: <strong className="text-emerald-400">{progressionData[progressionData.length - 1]?.maxWeightKg} kg</strong></span>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500 font-mono text-xs">
            Nessun dato registrato per questo esercizio nello storico.
          </div>
        )}
      </div>

      {/* 4. Dettaglio Sessione Selezionata (Workout Log Breakdown) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                Resoconto Seduta: {new Date(selectedDateStr).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              <p className="text-[10px] font-mono text-slate-500">
                Dettaglio carichi effettivi, ripetizioni e feedback atleta
              </p>
            </div>
          </div>
        </div>

        {selectedSessions.length > 0 ? (
          <div className="space-y-3">
            {selectedSessions.map((session, sIdx) => (
              <div key={session.id || sIdx} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-2.5">
                {/* Session Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      {session.splitName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      {session.routineTitle}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black font-mono text-emerald-700 block">
                      {session.totalVolumeKg?.toLocaleString()} KG
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 block">Volume Totale</span>
                  </div>
                </div>

                {/* Exercises Executed */}
                <div className="space-y-2 pt-1">
                  {session.exercisesData?.map((ex, exIdx) => {
                    const theme = getMuscleGroupTheme(ex.muscle || ex.name, language);
                    return (
                      <div key={ex.exerciseId || ex.id || exIdx} className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${theme.badgeBg}`}>
                              {theme.name}
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              {ex.name}
                            </span>
                          </div>
                        </div>

                        {/* Sets Mini Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                          {ex.sets?.map((set, setIdx) => (
                            <div 
                              key={setIdx} 
                              className={`p-1.5 rounded-md border text-[10px] font-mono flex items-center justify-between ${
                                set.feedbackTag === 'pain' 
                                  ? 'bg-rose-50 border-rose-300 text-rose-800' 
                                  : set.feedbackTag === 'limit'
                                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              <span className="font-bold">Set {set.setNumber || setIdx + 1}</span>
                              <span className="font-black text-slate-900">{set.actualWeightKg} kg × {set.actualReps}</span>
                              {set.feedbackTag === 'pain' ? (
                                <span title={set.feedbackNote || 'Dolore segnalato'} className="text-rose-600 font-bold">🚨</span>
                              ) : set.feedbackTag === 'limit' ? (
                                <span title="Serie al limite" className="text-amber-500 font-bold">🔥</span>
                              ) : (
                                <span className="text-emerald-600 font-bold">✓</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* If any set had pain feedback with note, display coach alert box */}
                        {ex.sets?.some(s => s.feedbackTag === 'pain' && s.feedbackNote) && (
                          <div className="bg-rose-50 border border-rose-200 rounded-lg p-2 text-xs flex items-start gap-2 text-rose-800 mt-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold uppercase text-[9px] font-mono text-rose-700 block">
                                Nota Dolore Atleta:
                              </strong>
                              <p className="text-[11px] text-rose-900 italic">
                                "{ex.sets.find(s => s.feedbackTag === 'pain')?.feedbackNote}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center space-y-1 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Info className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-mono text-slate-600 font-bold">Nessun allenamento registrato in questa data ({selectedDateStr}).</p>
            <p className="text-[10px] text-slate-400">I giorni evidenziati con il pallino verde indicano le presenze effettive.</p>
          </div>
        )}
      </div>
    </div>
  );
};
