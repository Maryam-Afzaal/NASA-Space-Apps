import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { ShieldAlert, RotateCcw, RefreshCw, AlertOctagon, Radio } from 'lucide-react';

export default function EmergencyOverrideModal() {
  const { state, dispatch } = useGameState();

  if (!state.isEmergencyOverrideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-space-900 border-2 border-rose-500/80 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
        
        {/* Emergency Alert Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-950 via-space-900 to-rose-950 border-b border-rose-800/80 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border-2 border-rose-500/60 flex items-center justify-center text-rose-400 animate-pulse">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-extrabold block">
              NASA Mission Control • Houston
            </span>
            <h3 className="text-lg font-extrabold text-white">
              Earth Command Emergency Override
            </h3>
          </div>
        </div>

        {/* Emergency Message Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-600/50 text-rose-200 leading-relaxed">
            <p className="font-bold mb-1 text-sm">Critical Telemetry Alert:</p>
            <p>{state.emergencyReason}</p>
          </div>

          <div className="p-4 rounded-2xl bg-space-850 border border-space-700 text-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Radio className="w-4 h-4 text-amber-400" />
              Earth Flight Director Transmission:
            </div>
            <p className="leading-relaxed">
              "Commander, automated sensors detected a life-support or power emergency. Earth Mission Control has triggered emergency safety reserves to stabilize your base. You can rethink your previous choice, but re-allocating satellite bandwidth costs science points!"
            </p>
          </div>

          {/* Meaningful Penalty Warning */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-950/40 border border-amber-700/60 text-amber-200 text-xs font-semibold">
            <span>Override Protocol Cost:</span>
            <span className="font-extrabold text-rose-400">-15 Science Points Telemetry Fee</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-space-950 border-t border-space-700/80 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => dispatch({ type: 'RESTART_CURRENT_SOL' })}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-space-700 hover:bg-space-800 text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart This Sol</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'REWIND_DECISION' })}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-950" />
            <span>ACCEPT OVERRIDE & REWIND</span>
          </button>
        </div>

      </div>
    </div>
  );
}
