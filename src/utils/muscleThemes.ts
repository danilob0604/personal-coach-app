import type { Language } from '../i18n/translations';

export interface MuscleTheme {
  name: string;
  code: 'legs' | 'push' | 'pull' | 'core' | 'full';
  gradient: string;
  lightStripe: string;
  badgeBg: string;
  activeTabBg: string;
  accentHex: string;
  textAccent: string;
  borderAccent: string;
  icon: string;
}

export const getMuscleGroupTheme = (muscleOrName: string = '', lang: Language = 'it'): MuscleTheme => {
  const m = (muscleOrName || '').toLowerCase();

  // Gambe & Glutei (Legs & Glutes) -> Sunset Coral
  if (
    m.includes('gamb') ||
    m.includes('glut') ||
    m.includes('squat') ||
    m.includes('femor') ||
    m.includes('leg') ||
    m.includes('thrust') ||
    m.includes('polpacc') ||
    m.includes('calf') ||
    m.includes('quadricip') ||
    m.includes('affondi') ||
    m.includes('lunge') ||
    m.includes('pressa')
  ) {
    const localizedName = lang === 'en' ? 'Legs & Glutes' : lang === 'es' ? 'Piernas y Glúteos' : 'Gambe & Glutei';
    return {
      name: localizedName,
      code: 'legs',
      gradient: 'from-rose-500 to-orange-500',
      lightStripe: 'bg-gradient-to-r from-rose-500 to-orange-500',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      activeTabBg: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md shadow-rose-500/25',
      accentHex: '#f43f5e',
      textAccent: 'text-rose-600',
      borderAccent: 'border-rose-300',
      icon: '🔥'
    };
  }

  // Core & Addome -> Energy Amber (check before Push/Pull to catch core keywords)
  if (
    m.includes('addom') ||
    m.includes('core') ||
    m.includes('plank') ||
    m.includes('crunch') ||
    m.includes('obliqu') ||
    m.includes('abs')
  ) {
    const localizedName = lang === 'en' ? 'Core & Abs' : lang === 'es' ? 'Core y Abdomen' : 'Core & Addome';
    return {
      name: localizedName,
      code: 'core',
      gradient: 'from-amber-500 to-orange-500',
      lightStripe: 'bg-gradient-to-r from-amber-500 to-orange-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      activeTabBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25',
      accentHex: '#f59e0b',
      textAccent: 'text-amber-600',
      borderAccent: 'border-amber-300',
      icon: '☀️'
    };
  }

  // Petto & Spalle / Spinta (Push) -> Electric Cobalt
  if (
    m.includes('pett') ||
    m.includes('spall') ||
    m.includes('panc') ||
    m.includes('push') ||
    m.includes('tricip') ||
    m.includes('chest') ||
    m.includes('shoulder') ||
    m.includes('bench') ||
    m.includes('deltoid') ||
    m.includes('dip')
  ) {
    const localizedName = lang === 'en' ? 'Chest & Shoulders' : lang === 'es' ? 'Pecho y Hombros' : 'Petto & Spalle';
    return {
      name: localizedName,
      code: 'push',
      gradient: 'from-blue-600 to-indigo-600',
      lightStripe: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      activeTabBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25',
      accentHex: '#2563eb',
      textAccent: 'text-blue-600',
      borderAccent: 'border-blue-300',
      icon: '⚡'
    };
  }

  // Dorso & Trazioni / Tirata (Pull) -> Ocean Cyan
  if (
    m.includes('dors') ||
    m.includes('bicip') ||
    m.includes('pull') ||
    m.includes('trazion') ||
    m.includes('stacc') ||
    m.includes('back') ||
    m.includes('lat') ||
    m.includes('remator') ||
    m.includes('row') ||
    m.includes('deadlift') ||
    m.includes('pulley')
  ) {
    const localizedName = lang === 'en' ? 'Back & Pull' : lang === 'es' ? 'Espalda y Tracción' : 'Dorso & Trazioni';
    return {
      name: localizedName,
      code: 'pull',
      gradient: 'from-cyan-600 to-blue-600',
      lightStripe: 'bg-gradient-to-r from-cyan-600 to-blue-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      activeTabBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25',
      accentHex: '#0891b2',
      textAccent: 'text-cyan-600',
      borderAccent: 'border-cyan-300',
      icon: '🌊'
    };
  }

  // Recomp / Full Body -> Emerald Mint
  const defaultName = lang === 'en' ? 'Full Body / Recomp' : lang === 'es' ? 'Cuerpo Completo' : 'Full Body / Recomp';
  return {
    name: defaultName,
    code: 'full',
    gradient: 'from-emerald-500 to-teal-600',
    lightStripe: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    activeTabBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25',
    accentHex: '#10b981',
    textAccent: 'text-emerald-600',
    borderAccent: 'border-emerald-300',
    icon: '💎'
  };
};
