import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { 
  Send, 
  Video, 
  Play, 
  ShieldCheck 
} from 'lucide-react';
import { translateRoutineTitle, translateExerciseName } from '../../i18n/translations';

export const TrainerChatTab: React.FC = () => {
  const { chatMessages, sendChatMessage, athletes, activeAthleteId, setActiveAthleteId, activeAthlete, t, language } = useFitness();
  const [inputText, setInputText] = useState('');

  const currentChatAthlete = activeAthlete || athletes.find(a => a.id === activeAthleteId) || athletes[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl flex flex-col h-[calc(100vh-280px)] min-h-[460px] sm:h-[650px] shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={currentChatAthlete?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={currentChatAthlete?.name || (language === 'en' ? "Athlete" : "Atleta")}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border-2 border-blue-600 shadow-xs"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <select
                value={currentChatAthlete?.id}
                onChange={(e) => setActiveAthleteId(e.target.value)}
                className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-tight bg-transparent border-none cursor-pointer focus:outline-none"
              >
                {athletes.filter(a => a.status !== 'archived').map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <span className="text-[8px] sm:text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hidden xs:inline-block">
                ROSTER
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 truncate">{translateRoutineTitle(currentChatAthlete?.currentWorkoutPlan || 'Protocollo Base', language)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-600 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 shadow-xs shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">{t.trainer.chat.encryptedChannel}</span>
          <span className="sm:hidden">{t.trainer.chat.secureShort}</span>
        </div>
      </div>

      {/* Messages stream */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/40">
        {chatMessages.map((msg) => {
          const isTrainer = msg.sender === 'trainer';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isTrainer ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-mono font-bold text-slate-500">{msg.senderName}</span>
                <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed ${
                  isTrainer
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-500/15'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs font-medium'
                }`}
              >
                {/* Video Check preview if attached */}
                {msg.videoAttachment && (
                  <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 bg-black/90 relative group">
                    <img
                      src={msg.videoAttachment.thumbnail}
                      alt="Thumbnail video"
                      className="w-full h-38 object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-mono font-bold">
                      <div className="flex items-center gap-2 truncate">
                        <Video className="w-3.5 h-3.5 text-sky-400" />
                        <span className="truncate">{translateExerciseName(msg.videoAttachment.exerciseName, language)}</span>
                      </div>
                      <span className="text-sky-400">{msg.videoAttachment.duration}</span>
                    </div>
                  </div>
                )}

                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2.5">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.trainer.chat.inputPlaceholder}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white font-mono"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black disabled:opacity-40 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
