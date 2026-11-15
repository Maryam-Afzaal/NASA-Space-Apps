import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { Thermometer, Eye, ShieldAlert, Database } from 'lucide-react';

export default function EnvironmentalTelemetry() {
  const { state, dispatch } = useGameState();
  const isStorm = state.activeMissionId === 2;
  const isRadiationAlert = state.activeMissionId === 4;

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
      {/* Telemetry pill: Temperature */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-950/85 backdrop-blur-md border border-space-700 text-xs font-semibold text-slate-200 shadow-sm">
        <Thermometer className="w-4 h-4 text-tech-blue" />
        <span>{isStorm ? '-85°C (Extreme Cold)' : '-65°C'}</span>
      </div>

      {/* Telemetry pill: Dust Opacity (tau) */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-950/85 backdrop-blur-md border text-xs font-semibold shadow-sm ${
        isStorm 
          ? 'border-amber-500 text-amber-300 animate-pulse' 
          : 'border-space-700 text-slate-200'
      }`}>
        <Eye className="w-4 h-4 text-amber-400" />
        <span>Dust: {isStorm ? '3.20 tau (STORM)' : '0.45 tau (Clear)'}</span>
      </div>

      {/* Telemetry pill: Radiation Dose */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-950/85 backdrop-blur-md border text-xs font-semibold shadow-sm ${
        isRadiationAlert 
          ? 'border-rose-500 text-rose-300 animate-pulse' 
          : 'border-space-700 text-slate-200'
      }`}>
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <span>Rad: {isRadiationAlert ? '2.1 mSv/d (CME ALERT)' : '0.21 mSv/d'}</span>
      </div>

      {/* Interactive NASA Data Inspector Button */}
      <button
        onClick={() => dispatch({ type: 'INSPECT_NASA_DATA', payload: isRadiationAlert ? 'donki' : 'meda' })}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
        title="Inspect official NASA datasets powering this simulation"
      >
        <Database className="w-3.5 h-3.5" />
        <span>NASA Data Source</span>
      </button>
    </div>
  );
}
