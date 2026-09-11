import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  Settings, 
  X, 
  Globe, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Wifi, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import type { Language } from '../i18n/translations';
import { soundManager } from '../utils/audioFeedback';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { 
    language, 
    setLanguage, 
    showToast,
    setIsConnectModalOpen,
    t
  } = useFitness();

  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!isOpen) return null;

  const languages: { 
    code: Language; 
    name: string; 
    flag: string; 
    desc: string; 
    tag: string 
  }[] = [
    {
      code: 'it',
      name: 'Italiano',
      flag: '🇮🇹',
      desc: t.settings.languages.itDesc,
      tag: t.settings.languages.itTag
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      desc: t.settings.languages.enDesc,
      tag: t.settings.languages.enTag
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
      desc: t.settings.languages.esDesc,
      tag: t.settings.languages.esTag
    }
  ];

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    const langNames: Record<Language, string> = {
      it: 'Italiano 🇮🇹',
      en: 'English 🇬🇧',
      es: 'Español 🇪🇸'
    };
    showToast(`${t.settings.langUpdated}: ${langNames[code]}`);
  };

  const handleTestSound = () => {
    soundManager.playSetComplete();
    showToast(t.settings.soundPlayedToast);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg uppercase font-mono tracking-tight flex items-center gap-2">
                {t.settings.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {t.settings.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            title={t.settings.closeTitle}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section: Language / Lingua */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-700 tracking-wider">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>{t.settings.appLanguage}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {t.settings.current}: <strong className="text-blue-600 uppercase font-bold">{language}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              {t.settings.langDescription}
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left p-3 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className={`font-mono text-sm font-black uppercase tracking-tight ${
                          isSelected ? 'text-blue-950' : 'text-slate-900'
                        }`}>
                          {lang.name}
                        </span>
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {isSelected ? t.settings.activeBadge : lang.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {lang.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section: Sound Feedback */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-700 tracking-wider">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>{t.settings.soundTitle}</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  soundEnabled 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
                title={soundEnabled ? t.settings.soundDisable : t.settings.soundEnable}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              {t.settings.soundDescription}
            </p>

            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.settings.soundTestTitle}</span>
              </div>
              <button
                onClick={handleTestSound}
                className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-blue-700 border border-slate-300 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                {t.settings.soundPlayBtn}
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Section: Devices & Multi-Device Sync */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-700 tracking-wider">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>{t.settings.devicesTitle}</span>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-xl sm:rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.settings.wifiLocal}: 192.168.0.64:5174</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-bold">
                  {t.settings.sseActive}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                {t.settings.devicePhone}<br />
                {t.settings.deviceTablet}
              </p>
              <button
                onClick={() => {
                  onClose();
                  setIsConnectModalOpen(true);
                }}
                className="w-full mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.settings.openQrBtn}</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* System Info */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.settings.suiteTitle}</span>
            </span>
            <span>{t.settings.reactiveArch}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-black uppercase transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {t.settings.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
