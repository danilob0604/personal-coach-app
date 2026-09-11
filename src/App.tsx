import React, { useState } from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import { NavigationBanner } from './components/NavigationBanner';
import { RestTimerModal } from './components/RestTimerModal';
import { UpgradeModal } from './components/UpgradeModal';
import { ConnectDevicesModal } from './components/ConnectDevicesModal';
import { SettingsModal } from './components/SettingsModal';
import { Toast } from './components/Toast';
import { TrainerDashboard } from './screens/trainer/TrainerDashboard';
import { AthleteApp } from './screens/athlete/AthleteApp';
import { Tablet, RotateCw, Wifi, Copy, Check } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    currentRole, 
    viewportMode, 
    setViewportMode, 
    showToast,
    isConnectModalOpen,
    setIsConnectModalOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen
  } = useFitness();
  const [tabletOrientation, setTabletOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [copiedWifi, setCopiedWifi] = useState(false);

  const localWifiUrl = 'http://192.168.0.64:5174/';

  const handleCopyWifiUrl = () => {
    navigator.clipboard?.writeText(localWifiUrl);
    setCopiedWifi(true);
    showToast('📋 Indirizzo Wi-Fi copiato! Incollalo in Safari o Chrome sul tuo tablet.');
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  const toggleOrientation = () => {
    setTabletOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top HUD Banner with Switcher & Tier Gatekeeper */}
      <NavigationBanner />

      {/* Main Viewport Container */}
      <main className="flex-1">
        {viewportMode === 'tablet_frame' ? (
          /* =======================================================
             TABLET / IPAD SIMULATOR VIEW (PORTRAIT & LANDSCAPE)
             ======================================================= */
          <div className="py-4 px-2 sm:py-6 sm:px-4 flex flex-col items-center justify-center animate-in fade-in duration-300">
            {/* Tablet Control Bar & Info Banner */}
            <div className="w-full max-w-[1100px] mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-900 text-white border border-slate-800 shadow-sm inline-flex items-center gap-1.5">
                  <Tablet className="w-3.5 h-3.5 text-blue-400" />
                  <span>IPAD SIMULATOR // {tabletOrientation === 'portrait' ? '820 × 1180 PX (VERTICALE)' : '1180 × 820 PX (ORIZZONTALE)'}</span>
                </span>

                <button
                  onClick={toggleOrientation}
                  className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="Ruota tra orientamento Verticale e Orizzontale"
                >
                  <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ruota: {tabletOrientation === 'portrait' ? 'Passa a Orizzontale' : 'Passa a Verticale'}</span>
                </button>
              </div>

              {/* Wi-Fi Direct Access for Real Physical Tablet */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyWifiUrl}
                  className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Copia l'indirizzo per aprirlo sul tuo vero iPad o tablet"
                >
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Su vero tablet: <strong className="underline">192.168.0.64:5174</strong></span>
                  {copiedWifi ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3 text-emerald-600" />}
                </button>

                <button
                  onClick={() => setViewportMode('responsive_desktop')}
                  className="text-xs font-mono text-blue-600 hover:text-blue-700 font-bold uppercase underline cursor-pointer"
                >
                  [ Desktop ]
                </button>
              </div>
            </div>

            {/* iPad Chassis Frame */}
            <div
              className={`w-full transition-all duration-300 bg-slate-900 border-[8px] sm:border-[12px] border-slate-800 rounded-[38px] sm:rounded-[48px] shadow-2xl shadow-slate-900/50 p-2 sm:p-3 relative ${
                tabletOrientation === 'portrait' ? 'max-w-[820px]' : 'max-w-[1080px]'
              }`}
            >
              {/* Subtle iPad Front Camera Dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80 border border-slate-600/50 mx-auto mb-2" />

              {/* iPad Internal Glass Viewport */}
              <div className="bg-[#eef2f6] rounded-[26px] sm:rounded-[36px] overflow-hidden min-h-[760px] max-h-[84vh] overflow-y-auto">
                {currentRole === 'trainer' ? (
                  <TrainerDashboard />
                ) : (
                  <AthleteApp />
                )}
              </div>
            </div>
          </div>
        ) : viewportMode === 'mobile_frame' ? (
          /* =======================================================
             MOBILE SMARTPHONE FRAME VIEW
             ======================================================= */
          <div className="py-4 px-2 sm:py-6 sm:px-4 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="mb-2.5 text-center flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest px-3.5 py-1 rounded-full bg-white text-slate-800 border border-slate-300 shadow-sm inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                PERSONAL COACH // {currentRole === 'trainer' ? 'COACH MOBILE' : 'ATHLETE MOBILE'}
              </span>
              <button
                onClick={() => setViewportMode('responsive_desktop')}
                className="text-xs font-mono text-blue-600 hover:text-blue-700 font-bold uppercase underline cursor-pointer"
              >
                [ Desktop ]
              </button>
            </div>

            {/* Coach / Athlete Mobile Container */}
            <div className="w-full max-w-md bg-[#eef2f6] sm:border sm:border-slate-300/80 sm:rounded-[44px] sm:shadow-2xl sm:shadow-slate-400/30 overflow-hidden min-h-[720px]">
              {currentRole === 'trainer' ? (
                <TrainerDashboard isMobileFramed={true} />
              ) : (
                <AthleteApp />
              )}
            </div>
          </div>
        ) : (
          /* =======================================================
             FULL RESPONSIVE VIEW (TABLET REALE O DESKTOP)
             ======================================================= */
          <div className="animate-in fade-in duration-300">
            {currentRole === 'trainer' ? (
              <TrainerDashboard />
            ) : (
              <div className="w-full max-w-5xl mx-auto px-1 sm:px-4 py-1.5 sm:py-6">
                <AthleteApp />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="mt-auto pb-20 sm:pb-4 pt-3 px-4 border-t border-slate-200/80 bg-white/90 backdrop-blur-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block animate-pulse" />
            <span>Prodotto da <strong className="text-slate-800 font-bold">VortexTech soluzioni informatiche</strong></span>
          </div>
          <div className="text-[10px] text-slate-400">
            Personal Coach Pro Suite • Tutti i diritti riservati
          </div>
        </div>
      </footer>

      {/* Modals & Audio/Visual Feedbacks */}
      <RestTimerModal />
      <UpgradeModal />
      <ConnectDevicesModal 
        isOpen={isConnectModalOpen} 
        onClose={() => setIsConnectModalOpen(false)} 
      />
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <FitnessProvider>
      <MainAppContent />
    </FitnessProvider>
  );
}

export default App;
