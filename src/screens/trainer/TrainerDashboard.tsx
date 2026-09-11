import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { 
  Activity, 
  Users, 
  Dumbbell, 
  MessageSquare, 
  TrendingUp, 
  ShieldAlert, 
  Radio, 
  Cpu 
} from 'lucide-react';
import { TrainerFeedTab } from './TrainerFeedTab';
import { TrainerAthletesTab } from './TrainerAthletesTab';
import { TrainerWorkoutBuilderTab } from './TrainerWorkoutBuilderTab';
import { TrainerChatTab } from './TrainerChatTab';

interface TrainerDashboardProps {
  isMobileFramed?: boolean;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'athletes' | 'builder' | 'chat'>('feed');
  const { 
    activeAthletesCount, 
    maxAthletes, 
    currentPlan, 
    feed,
    t 
  } = useFitness();

  const pendingReviewsCount = feed.filter(f => f.requiresReview).length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-3.5 sm:space-y-6 pb-24 sm:pb-8">
      {/* Mobile Coach Header / Profile Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Coach"
              className="w-10 h-10 rounded-2xl object-cover border-2 border-blue-600 p-0.5 shadow-xs"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-black text-xs sm:text-sm text-slate-900 uppercase font-mono tracking-tight">COACH ALESSANDRO</h3>
              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">
              {currentPlan.name} • {activeAthletesCount}/{maxAthletes} {t.trainer.activeAthletes}
            </p>
          </div>
        </div>

        {/* Fast Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('athletes')}
            className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-mono font-black uppercase transition-colors cursor-pointer"
          >
            {t.trainer.addAthleteShort}
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] font-mono font-black uppercase transition-colors cursor-pointer"
          >
            {t.trainer.addRoutineShort}
          </button>
        </div>
      </div>

      {/* Top Cockpit Telemetry Hub - Desktop View */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Capacity & Tier */}
        <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-4 pt-5 shadow-md shadow-slate-300/40 hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-mono">
            <span className="uppercase text-[10px] tracking-wider text-slate-500 font-bold">
              {t.trainer.stats.rosterCapacity}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 tracking-tight mt-1">
            {activeAthletesCount} <span className="text-sm font-medium text-slate-400">/ {maxAthletes}</span>
          </div>
          <div className="text-[10px] font-mono text-blue-600 font-bold mt-1.5 flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>{t.trainer.stats.activeTier}: {currentPlan.name.split(' ')[0].toUpperCase()}</span>
          </div>
        </div>

        {/* Metric 2: Compliance */}
        <div className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-4 pt-5 shadow-md shadow-slate-300/40 hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-mono">
            <span className="uppercase text-[10px] tracking-wider text-slate-500 font-bold">
              {t.trainer.stats.fleetCompliance}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 tracking-tight mt-1">
            92.4%
          </div>
          <div className="text-[10px] font-mono text-emerald-600 font-bold mt-1.5">
            {t.trainer.stats.vsPrev}
          </div>
        </div>

        {/* Metric 3: Live Workouts */}
        <div className="bg-white border border-slate-200 hover:border-amber-400 rounded-3xl p-4 pt-5 shadow-md shadow-slate-300/40 hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 to-orange-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-mono">
            <span className="uppercase text-[10px] tracking-wider text-slate-500 font-bold">
              {t.trainer.stats.todayMissions}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shadow-amber-500/30">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 tracking-tight mt-1">
            6 <span className="text-sm font-medium text-slate-400">{t.trainer.stats.doneMissions}</span>
          </div>
          <div className="text-[10px] font-mono text-amber-600 font-bold mt-1.5">
            {t.trainer.stats.activeInGym}
          </div>
        </div>

        {/* Metric 4: Alerts */}
        <div className="bg-white border border-slate-200 hover:border-rose-400 rounded-3xl p-4 pt-5 shadow-md shadow-slate-300/40 hover:shadow-lg transition-all relative overflow-hidden group">
          <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 to-pink-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-mono">
            <span className="uppercase text-[10px] tracking-wider text-slate-500 font-bold">
              {t.trainer.stats.checksPending}
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm shadow-rose-500/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 tracking-tight mt-1">
            {pendingReviewsCount} <span className="text-sm font-medium text-slate-400">{t.trainer.stats.alertsCount}</span>
          </div>
          <div className="text-[10px] font-mono text-rose-600 font-bold mt-1.5">
            {t.trainer.stats.postureCheck}
          </div>
        </div>
      </div>

      {/* Top Cockpit Telemetry Hub - Mobile Compact View */}
      <div className="grid grid-cols-2 sm:hidden gap-2">
        {/* Metric 1: Capacity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs relative overflow-hidden">
          <div className="h-1 w-full bg-blue-600 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
            <span className="uppercase font-bold">{t.trainer.stats.rosterCapacity}</span>
            <Users className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
            {activeAthletesCount} <span className="text-xs text-slate-400 font-normal">/ {maxAthletes}</span>
          </div>
        </div>

        {/* Metric 2: Compliance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs relative overflow-hidden">
          <div className="h-1 w-full bg-emerald-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
            <span className="uppercase font-bold">{t.trainer.stats.fleetCompliance}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
            92.4%
          </div>
        </div>

        {/* Metric 3: Live in Gym */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs relative overflow-hidden">
          <div className="h-1 w-full bg-amber-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
            <span className="uppercase font-bold">{t.trainer.stats.todayMissions}</span>
            <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </div>
          <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
            6 <span className="text-xs text-slate-400 font-normal">{t.trainer.crm.today.toLowerCase()}</span>
          </div>
        </div>

        {/* Metric 4: Alerts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-xs relative overflow-hidden">
          <div className="h-1 w-full bg-rose-500 absolute top-0 left-0" />
          <div className="flex items-center justify-between text-slate-500 text-[9px] font-mono">
            <span className="uppercase font-bold">{t.trainer.stats.checksPending}</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
            {pendingReviewsCount} <span className="text-xs text-slate-400 font-normal">{t.trainer.stats.videoAbbr}</span>
          </div>
        </div>
      </div>

      {/* Main Tactical Navigation Tabs - Desktop View */}
      <div className="hidden sm:flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'feed'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.trainer.tabs.liveFeed}</span>
          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
        </button>

        <button
          onClick={() => setActiveTab('athletes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'athletes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.trainer.tabs.rosterCRM} ({activeAthletesCount}/{maxAthletes})</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'builder'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>{t.trainer.tabs.builder}</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25'
              : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.trainer.tabs.chat}</span>
          {pendingReviewsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-mono font-black">
              {pendingReviewsCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Top Segmented Tabs */}
      <div className="grid grid-cols-4 sm:hidden bg-slate-200/90 p-1 rounded-2xl gap-1 text-center font-mono">
        <button
          onClick={() => setActiveTab('feed')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all ${
            activeTab === 'feed'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab('athletes')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all ${
            activeTab === 'athletes'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.trainer.tabs.athletesShort}
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all ${
            activeTab === 'builder'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.trainer.tabs.routinesShort}
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all relative ${
            activeTab === 'chat'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Chat
          {pendingReviewsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'feed' && <TrainerFeedTab onOpenChat={() => setActiveTab('chat')} />}
      {activeTab === 'athletes' && <TrainerAthletesTab onSelectAthlete={() => setActiveTab('chat')} />}
      {activeTab === 'builder' && <TrainerWorkoutBuilderTab />}
      {activeTab === 'chat' && <TrainerChatTab />}

      {/* Mobile Floating Bottom Bar for 1-Thumb Native Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl shadow-slate-900/10">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'feed' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <Activity className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider">Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('athletes')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'athletes' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase tracking-wider">{t.trainer.tabs.athletesShort}</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'builder' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase tracking-wider">{t.trainer.tabs.routinesShort}</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'chat' ? 'text-blue-600 font-black' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {pendingReviewsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 px-1 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-mono font-black">
                {pendingReviewsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider">Chat</span>
        </button>
      </nav>
    </div>
  );
};
