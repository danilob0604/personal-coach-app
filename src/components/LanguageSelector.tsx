import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Globe } from 'lucide-react';
import type { Language } from '../i18n/translations';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useFitness();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
      <div className="px-1.5 text-slate-500 hidden sm:block">
        <Globe className="w-3.5 h-3.5 text-blue-600" />
      </div>
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
              language === lang.code
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title={lang.label}
          >
            <span>{lang.flag}</span>
            <span className="uppercase">{lang.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
