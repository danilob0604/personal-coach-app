import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Zap, 
  Smartphone, 
  Monitor, 
  Tablet,
  Sparkles, 
  Radio, 
  Shield,
  Settings 
} from 'lucide-react';

export const NavigationBanner: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    viewportMode, 
    setViewportMode, 
    currentPlan, 
    activeAthletesCount, 
    maxAthletes, 
    setUpgradeModalOpen,
    setIsSettingsModalOpen,
    t 
  } = useFitness();

  const isFull = activeAthletesCount >= maxAthletes;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 px-2 sm:px-4 py-1.5 sm:py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand Identity: Personal Coach */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="relative">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-md shadow-blue-500/30">
              <div className="w-full h-full bg-slate-900 rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400 fill-current" />
              </div>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-black text-xs sm:text-lg tracking-tight font-mono uppercase">
                <span className="text-white">PERSONAL</span>{' '}
                <span className="text-blue-400">COACH</span>
              </span>
              <span className="text-[7px] sm:text-[9px] font-mono uppercase tracking-widest px-1 sm:px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold hidden xs:inline-block">
                {t.nav.systemTag}
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-wide text-slate-400 uppercase hidden md:block">
              {t.nav.subTitle}
            </p>
          </div>
        </div>

        {/* Center: Tactical Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-0.5 sm:p-1 rounded-lg sm:rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setCurrentRole('trainer')}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono transition-all duration-200 cursor-pointer ${
              currentRole === 'trainer'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Personal Coach"
          >
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{t.nav.coachRole}</span>
          </button>
          <button
            onClick={() => setCurrentRole('athlete')}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono transition-all duration-200 cursor-pointer ${
              currentRole === 'athlete'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Atleta"
          >
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
            <span>{t.nav.athleteRole}</span>
          </button>
        </div>

        {/* Right Section: Android Connect QR, Language Selector, Telemetry Slot Cells & Viewport */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          {/* Dedicated System Settings Modal Trigger */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs font-mono font-bold text-slate-300 hover:text-white transition-all cursor-pointer group"
            title={t.nav.settings}
          >
            <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:rotate-45 transition-transform" />
            <span className="hidden md:inline">{t.nav.settings}</span>
          </button>

          {/* Tactical Slot Battery Meter (Trainer only) */}
          {currentRole === 'trainer' && (
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="flex items-center gap-1.5 sm:gap-3 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 px-2 sm:px-3.5 py-1.5 rounded-xl text-xs transition-all group shadow-sm cursor-pointer text-white"
              title="Gestione Scaglioni e Slot Atleti"
            >
              <div className="text-left">
                <div className="text-[8px] sm:text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1 font-bold">
                  <span>{currentPlan.name.split(' ')[0]}</span>
                  <Sparkles className="w-2.5 h-2.5 text-blue-400 hidden sm:inline" />
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-black text-white">
                  <span className={isFull ? 'text-rose-400' : 'text-blue-400'}>
                    {activeAthletesCount}
                  </span>
                  <span className="text-slate-400">/{maxAthletes}</span>
                </div>
              </div>

              {/* Futuristic Battery Segment Cells (Desktop only) */}
              <div className="hidden lg:flex items-center gap-0.5 bg-slate-950 p-1 rounded-md border border-slate-800">
                {Array.from({ length: 10 }).map((_, i) => {
                  const threshold = (i + 1) / 10;
                  const currentRatio = activeAthletesCount / maxAthletes;
                  const isFilled = currentRatio >= threshold - 0.05;

                  return (
                    <div
                      key={i}
                      className={`w-1 h-3.5 rounded-[1px] transition-colors ${
                        isFilled
                          ? isFull
                            ? 'bg-rose-500'
                            : 'bg-blue-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </button>
          )}

          {/* Viewport switch (Desktop only) */}
          <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-0.5">
            <button
              onClick={() => setViewportMode('responsive_desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'responsive_desktop'
                  ? 'bg-slate-800 text-blue-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.nav.desktopView}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('tablet_frame')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'tablet_frame'
                  ? 'bg-slate-800 text-blue-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.nav.tabletView}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('mobile_frame')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'mobile_frame'
                  ? 'bg-slate-800 text-blue-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.nav.mobileView}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
