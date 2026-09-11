import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Sparkles, 
  Video, 
  Send
} from 'lucide-react';
import type { WorkoutExercise } from '../types';
import { useFitness } from '../context/FitnessContext';
import { translateExerciseName, translateMuscleName, translateTrainerNotes, type Language } from '../i18n/translations';

interface ExerciseVideoModalProps {
  exercise: WorkoutExercise | null;
  onClose: () => void;
  onSendVideoToCoach?: (exerciseName: string) => void;
}

export const ExerciseVideoModal: React.FC<ExerciseVideoModalProps> = ({
  exercise,
  onClose,
  onSendVideoToCoach
}) => {
  if (!exercise) return null;
  return (
    <ExerciseVideoModalContent
      key={exercise.exerciseId || exercise.name}
      exercise={exercise}
      onClose={onClose}
      onSendVideoToCoach={onSendVideoToCoach}
    />
  );
};

interface ExerciseVideoModalContentProps {
  exercise: WorkoutExercise;
  onClose: () => void;
  onSendVideoToCoach?: (exerciseName: string) => void;
}

const ExerciseVideoModalContent: React.FC<ExerciseVideoModalContentProps> = ({
  exercise,
  onClose,
  onSendVideoToCoach
}) => {
  const { language, t } = useFitness();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.5>(1);
  const [showCustomUpload, setShowCustomUpload] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState(exercise.videoUrl || '');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(
    exercise.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-44166-large.mp4'
  );
  const [isCoachVideo, setIsCoachVideo] = useState<boolean>(exercise.isCoachCustomVideo ?? true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Dynamic coaching cues based on exercise name and language
  const getCues = (name: string, lang: Language) => {
    const n = name.toLowerCase();
    if (lang === 'en') {
      if (n.includes('thrust')) {
        return [
          'Feet firmly planted, shins perpendicular to the floor at the peak.',
          '2-second isometric pause at top lockout, squeezing glutes.',
          'Tuck chin to chest, keep gaze forward to protect cervical spine.'
        ];
      }
      if (n.includes('panca') || n.includes('bench') || n.includes('press')) {
        return [
          'Scapulae fully retracted and depressed throughout the entire ROM.',
          'Elbows tucked at ~45° relative to torso (not flared at 90°).',
          '1-second chest pause with solid leg drive from the floor.'
        ];
      }
      if (n.includes('stacco') || n.includes('rumeno') || n.includes('deadlift')) {
        return [
          'Initiate movement by pushing hips straight back (hip hinge).',
          'Knees softly bent at 15-20°, do not turn it into a squat.',
          'Keep bar/dumbbells glued to legs to minimize the moment arm.'
        ];
      }
      if (n.includes('squat')) {
        return [
          'Drive all bodyweight through the mid-foot and heel.',
          'Slight torso lean (~15°) to fully engage posterior chain.',
          'Deep, controlled descent reaching below parallel.'
        ];
      }
      return [
        'Maximal voluntary muscular contraction at peak.',
        'Controlled eccentric phase (3 seconds down).',
        'Proper breathing: exhale on exertion, inhale on descent.'
      ];
    }
    if (lang === 'es') {
      if (n.includes('thrust')) {
        return [
          'Pies firmes en el suelo, espinillas perpendiculares en el punto máximo.',
          'Pausa isométrica de 2 segundos arriba apretando los glúteos.',
          'Barbilla al pecho y mirada al frente para proteger el cuello.'
        ];
      }
      if (n.includes('panca') || n.includes('bench') || n.includes('banca')) {
        return [
          'Escápulas retraídas y deprimidas en todo el recorrido.',
          'Codos a unos 45° respecto al torso (no abiertos a 90°).',
          'Pausa de 1 segundo en el pecho con empuje firme desde el suelo (leg drive).'
        ];
      }
      if (n.includes('stacco') || n.includes('rumeno') || n.includes('muerto')) {
        return [
          'Inicia el movimiento empujando la cadera hacia atrás (hip hinge).',
          'Rodillas flexionadas fijas a 15-20°, sin convertirlo en sentadilla.',
          'Barra o mancuernas pegadas a las piernas para reducir la palanca.'
        ];
      }
      if (n.includes('squat') || n.includes('sentadilla')) {
        return [
          'Todo el peso repartido en el centro del pie y talón.',
          'Torso ligeramente inclinado hacia adelante para activar glúteo.',
          'Descenso profundo y controlado por debajo del paralelo.'
        ];
      }
      return [
        'Contracción muscular voluntaria máxima en el punto de pico.',
        'Fase excéntrica (bajada) lenta y controlada en 3 segundos.',
        'Respiración adecuada: exhala en empuje/tirón, inhala en bajada.'
      ];
    }
    // Default Italian
    if (n.includes('thrust')) {
      return [
        'Piedi ben saldi al suolo, tibia perpendicolare al pavimento al massimo picco.',
        'Fermo isometrico di 2 secondi netti al soffitto strizzando i glutei.',
        'Mento al petto e sguardo in avanti per non sovraccaricare il collo.'
      ];
    }
    if (n.includes('panca')) {
      return [
        'Scapole addotte e depresse in tutto l\'arco del movimento.',
        'Gomiti inclinati a circa 45° rispetto al busto (non a 90°).',
        'Fermo al petto di 1 secondo con spinta decisa dal pavimento (leg drive).'
      ];
    }
    if (n.includes('stacco') || n.includes('rumeno')) {
      return [
        'Inizia il movimento spingendo il bacino all\'indietro (hip hinge).',
        'Ginocchia sbloccate ma fisse a 15-20°, non trasformarlo in uno squat.',
        'Bilanciere o manubri incollati alle gambe per azzerare il braccio di leva.'
      ];
    }
    if (n.includes('bulgarian') || n.includes('squat')) {
      return [
        'Tutto il peso corporeo caricato sul tallone della gamba anteriore.',
        'Busto leggermente inclinato in avanti a 15° per attivare il gluteo.',
        'Discesa profonda controllata fino a sfiorare il suolo col ginocchio dietro.'
      ];
    }
    return [
      'Contrazione muscolare volontaria massima al punto di picco.',
      'Fase eccentrica (discesa) lenta e controllata in 3 secondi.',
      'Respirazione corretta: espira in spinta/trazione, inspira in discesa.'
    ];
  };

  const getMistakes = (name: string, lang: Language) => {
    const n = name.toLowerCase();
    if (lang === 'en') {
      if (n.includes('thrust')) {
        return [
          'Hyperextending lumbar spine instead of tilting pelvis (posterior tilt).',
          'Pushing through toes instead of driving through heels.'
        ];
      }
      if (n.includes('panca') || n.includes('bench')) {
        return [
          'Bouncing barbell off sternum.',
          'Lifting glutes or feet off the bench during drive.'
        ];
      }
      return [
        'Using momentum or swinging with torso.',
        'Cutting range of motion to lift heavier weight.'
      ];
    }
    if (lang === 'es') {
      if (n.includes('thrust')) {
        return [
          'Hiperextender la zona lumbar en lugar de hacer retroversión pélvica.',
          'Empujar con las puntas de los pies en vez de con los talones.'
        ];
      }
      if (n.includes('panca') || n.includes('bench') || n.includes('banca')) {
        return [
          'Hacer rebotar la barra en el esternón.',
          'Despegar los glúteos o pies del banco durante el empuje.'
        ];
      }
      return [
        'Usar la inercia o balancear el tronco.',
        'Acortar el rango de recorrido para levantar más peso.'
      ];
    }
    // Default Italian
    if (n.includes('thrust')) {
      return [
        'Iperestendere la zona lombare invece di ruotare il bacino (retroversione).',
        'Spingere con le punte dei piedi anziché con i talloni.'
      ];
    }
    if (n.includes('panca')) {
      return [
        'Far rimbalzare il bilanciere sullo sterno.',
        'Staccare i glutei o i piedi dalla panca durante la spinta.'
      ];
    }
    return [
      'Usare l\'inerzia o oscillare con il tronco.',
      'Accorciare il raggio di movimento per sollevare più carico.'
    ];
  };

  const cues = getCues(exercise.name, language);
  const mistakes = getMistakes(exercise.name, language);

  const handleSaveCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrlInput.trim()) {
      setCurrentVideoUrl(videoUrlInput.trim());
      setIsCoachVideo(true);
      setShowCustomUpload(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-blue-700 font-black uppercase px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  {translateMuscleName(exercise.muscle, language)}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {t.videoModal.tempo} {exercise.tempo || '3-0-1-0'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase font-mono mt-0.5">
                {translateExerciseName(exercise.name, language)}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Section */}
        <div className="relative bg-black border-b border-slate-200 aspect-video w-full overflow-hidden flex items-center justify-center group">
          <video
            ref={videoRef}
            key={currentVideoUrl}
            src={currentVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Coach Certification Badge Overlay */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase text-white tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              {isCoachVideo ? t.videoModal.officialCoachVideo : t.videoModal.demoVideo}
            </span>
          </div>

          {/* Video Controls Bar Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/75 backdrop-blur-md p-2 rounded-xl border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-blue-600 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <span className="text-[11px] text-white/90">
                {t.videoModal.eccentricConcentric}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 0.5 : 1)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                  playbackSpeed === 0.5
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={playbackSpeed === 0.5 ? t.videoModal.normalSpeed : t.videoModal.slowMo}
              >
                {playbackSpeed === 0.5 ? t.videoModal.slowMo : t.videoModal.normalSpeed}
              </button>
            </div>
          </div>
        </div>

        {/* Coach Video Upload / Link Switcher */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <strong>{t.videoModal.gymClipTitle}</strong>
            </span>
            <button
              onClick={() => setShowCustomUpload(!showCustomUpload)}
              className="text-[10px] font-mono uppercase font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {showCustomUpload ? t.videoModal.cancel : t.videoModal.customUploadBtn}
            </button>
          </div>

          {showCustomUpload && (
            <form onSubmit={handleSaveCustomVideo} className="mt-2 space-y-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in">
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-600 block mb-1">
                  {t.videoModal.customUploadLabel}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder={t.videoModal.customUploadPlaceholder}
                    className="flex-1 bg-slate-50 border border-slate-200 text-xs font-mono rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-mono font-black uppercase cursor-pointer transition-all shadow-sm shadow-blue-500/25"
                  >
                    {t.videoModal.save}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                {t.videoModal.customUploadTip}
              </p>
            </form>
          )}
        </div>

        {/* Cues and Biomechanics Body */}
        <div className="p-5 space-y-4 flex-1 bg-slate-50/50">
          {/* Coaching Cues */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-blue-700 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t.videoModal.cuesTitle}
            </h4>
            <div className="space-y-2">
              {cues.map((cue, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-start gap-2.5 text-xs font-mono text-slate-700 shadow-sm">
                  <span className="w-5 h-5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{cue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-rose-700 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              {t.videoModal.mistakesTitle}
            </h4>
            <div className="space-y-2">
              {mistakes.map((m, idx) => (
                <div key={idx} className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs font-mono text-rose-800">
                  <span className="text-rose-600 font-bold shrink-0 mt-0.5">⚠️</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trainer Personal Notes if present */}
          {exercise.trainerNotes && (
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono text-blue-600 uppercase font-bold block">
                {t.videoModal.coachNoteTitle}
              </span>
              <p className="text-xs font-mono text-slate-700">
                "{translateTrainerNotes(exercise.trainerNotes, language)}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          {onSendVideoToCoach ? (
            <button
              onClick={() => {
                onSendVideoToCoach(exercise.name);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.videoModal.sendExecutionToCoach}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all shadow-md shadow-blue-500/25"
          >
            {t.videoModal.understoodReturn}
          </button>
        </div>

      </div>
    </div>
  );
};
