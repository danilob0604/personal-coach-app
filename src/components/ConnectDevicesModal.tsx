import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Tablet, 
  Radio, 
  Wifi, 
  Check, 
  Copy, 
  Sparkles, 
  Zap, 
  Activity,
  ExternalLink 
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

interface ConnectDevicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectDevicesModal: React.FC<ConnectDevicesModalProps> = ({ isOpen, onClose }) => {
  const { showToast, syncConnected, t } = useFitness();
  const [copiedType, setCopiedType] = useState<'athlete' | 'tablet' | null>(null);

  if (!isOpen) return null;

  const localIp = '192.168.0.64';
  const port = '5174';
  const athleteUrl = `http://${localIp}:${port}/?role=athlete`;
  const tabletUrl = `http://${localIp}:${port}/?role=trainer`;

  const athleteQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(athleteUrl)}`;
  const tabletQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(tabletUrl)}`;

  const handleCopy = (url: string, type: 'athlete' | 'tablet') => {
    navigator.clipboard?.writeText(url);
    setCopiedType(type);
    showToast(t.connectDevices.linkCopiedToast);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl shadow-slate-950/40 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Top Gradient Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400" />

        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black font-mono uppercase text-slate-900 tracking-tight">
                  {t.connectDevices.title}
                </h3>
                <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {syncConnected ? t.connectDevices.syncActive : t.connectDevices.networkOk}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t.connectDevices.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title={t.connectDevices.closeTitle}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Wi-Fi Alert Pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Wifi className="w-4 h-4" />
              </span>
              <div>
                <span className="font-mono font-bold uppercase text-[11px] block text-slate-900">
                  {t.connectDevices.localWifi}: 192.168.0.x
                </span>
                <span className="text-[11px] text-slate-500">
                  {t.connectDevices.wifiTip}
                </span>
              </div>
            </div>
            <div className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shrink-0 hidden sm:block">
              {t.connectDevices.port}: {port}
            </div>
          </div>

          {/* 2 Device Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CARD 1: SMARTPHONE ANDROID (CONSOLE ATLETA) */}
            <div className="bg-gradient-to-b from-blue-50/50 via-white to-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                      <Smartphone className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-mono font-black text-xs uppercase text-slate-900 tracking-wider">
                        {t.connectDevices.phoneTitle}
                      </h4>
                      <span className="text-[10px] font-mono text-blue-600 font-bold block">
                        {t.connectDevices.phoneConsole}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    {t.connectDevices.athleteOnly}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t.connectDevices.phoneDesc}
                </p>

                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-200 shadow-inner">
                  <img
                    src={athleteQrUrl}
                    alt="QR Code Smartphone Atleta"
                    className="w-40 h-40 object-contain rounded-xl border border-slate-100"
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-2 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3 h-3 text-blue-600" /> {t.connectDevices.scanWithCamera}
                  </span>
                </div>
              </div>

              {/* URL & Action */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 truncate mr-2 font-medium">{athleteUrl}</span>
                  <a
                    href={athleteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 p-1 shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => handleCopy(athleteUrl, 'athlete')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  {copiedType === 'athlete' ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{t.connectDevices.linkCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>{t.connectDevices.copyPhoneLink}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CARD 2: TABLET ANDROID (COACH & ATLETA - ENTRAMBI) */}
            <div className="bg-gradient-to-b from-indigo-50/50 via-white to-white border-2 border-indigo-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                      <Tablet className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-mono font-black text-xs uppercase text-slate-900 tracking-wider">
                        {t.connectDevices.tabletTitle}
                      </h4>
                      <span className="text-[10px] font-mono text-indigo-600 font-bold block">
                        {t.connectDevices.tabletConsole}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {t.connectDevices.fullCockpit}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {t.connectDevices.tabletDesc}
                </p>

                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-200 shadow-inner">
                  <img
                    src={tabletQrUrl}
                    alt="QR Code Tablet Coach"
                    className="w-40 h-40 object-contain rounded-xl border border-slate-100"
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-2 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3 h-3 text-indigo-600" /> {t.connectDevices.scanWithCamera}
                  </span>
                </div>
              </div>

              {/* URL & Action */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 truncate mr-2 font-medium">{tabletUrl}</span>
                  <a
                    href={tabletUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 p-1 shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => handleCopy(tabletUrl, 'tablet')}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  {copiedType === 'tablet' ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{t.connectDevices.linkCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span>{t.connectDevices.copyTabletLink}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time sync explanation */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs mt-0.5">
              <Zap className="w-4 h-4 fill-current" />
            </span>
            <div className="text-xs text-emerald-950 space-y-1">
              <div className="font-mono font-black uppercase text-[11px] text-emerald-900 flex items-center gap-1.5">
                <span>{t.connectDevices.syncMagicTitle}</span>
                <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              </div>
              <p className="leading-relaxed font-medium">
                {t.connectDevices.syncMagicDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.connectDevices.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
