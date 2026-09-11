import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Users, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import type { SubscriptionTier } from '../types';

export const UpgradeModal: React.FC = () => {
  const { 
    upgradeModalOpen, 
    setUpgradeModalOpen, 
    plans, 
    subscriptionTier, 
    upgradeSubscription, 
    activeAthletesCount, 
    maxAthletes,
    t 
  } = useFitness();

  if (!upgradeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-start justify-between relative bg-slate-50/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.upgrade.badge}</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase font-mono text-slate-900">
              {t.upgrade.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              {t.upgrade.desc}
            </p>
          </div>
          <button
            onClick={() => setUpgradeModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-4 bg-slate-50/60 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">{t.upgrade.statusTitle}</div>
              <div className="text-sm font-black font-mono text-slate-900">
                <span className="text-blue-600 text-base">{activeAthletesCount}</span> / {maxAthletes} {t.upgrade.registeredAthletes}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{t.upgrade.stripeB2BNotice}</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/30">
          {plans.map((plan) => {
            const isCurrent = subscriptionTier === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-5 flex flex-col justify-between border transition-all ${
                  isCurrent
                    ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20'
                    : plan.recommended
                    ? 'bg-white border-2 border-indigo-400 shadow-lg shadow-indigo-500/10 hover:border-indigo-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black font-mono uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {t.upgrade.coachFavorite}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                      {plan.badge}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {t.upgrade.activeBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black font-mono uppercase text-slate-900 mt-1.5">{plan.name}</h3>

                  <div className="my-4 flex items-baseline gap-1 font-mono">
                    <span className="text-3xl font-black text-slate-900">{plan.monthlyPrice} €</span>
                    <span className="text-xs text-slate-500 font-bold">{t.upgrade.perMonth}</span>
                  </div>

                  {/* Max athletes */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-4 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">{t.upgrade.capacityLabel}</span>
                    <span className="text-sm font-black font-mono text-blue-600">
                      {t.upgrade.upToAthletes.replace('{X}', plan.maxAthletes.toString())}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-xs font-mono font-bold cursor-default flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-blue-600" />
                      <span>{t.upgrade.currentPlanBtn}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => upgradeSubscription(plan.id as SubscriptionTier)}
                      className={`w-full py-3 px-3 rounded-xl text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                        plan.recommended
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25'
                          : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{t.upgrade.upgradeTierBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>REGOLA SCAGLIONI:</strong> {t.upgrade.gatekeeperRule}
            </span>
          </div>
          <button
            onClick={() => setUpgradeModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-mono text-xs font-bold uppercase cursor-pointer transition-colors border border-slate-200 shadow-sm"
          >
            {t.upgrade.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
