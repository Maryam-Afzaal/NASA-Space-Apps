import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { Zap, Wind, Heart, Sparkles, Volume2, VolumeX, Compass, Database } from 'lucide-react';

export default function TopHUD() {
  const { state, dispatch } = useGameState();
  const currentMission = MISSIONS.find(m => m.id === state.activeMissionId) || MISSIONS[0];
  const currentPhase = currentMission.phases[state.currentPhaseIndex] || currentMission.phases[0];

  const { power, oxygen, health, sciencePoints } = state.resources;

  return (
    <header className="w-full bg-space-950/95 backdrop-blur-md border-b border-space-700/80 px-4 py-2.5 z-20 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Mission Title & Phase Progress Steps */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', payload: 'MISSION_SELECT' })}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-800 hover:bg-space-750 border border-space-600 hover:border-tech-cyan text-slate-200 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            title="Return to Mars Mission Selection Hub"
          >
            <Compass className="w-4 h-4 text-tech-cyan" />
            <span className="hidden sm:inline">Missions</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-mars-red/20 text-mars-orange border border-mars-red/50">
                {currentMission.code}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
                {currentMission.title}
              </h1>
            </div>

            {/* Visual Step Dots */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-slate-400">
                Phase {state.currentPhaseIndex + 1} of {currentMission.phases.length}:
              </span>
              <span className="text-xs font-semibold text-tech-cyan truncate max-w-[200px] sm:max-w-xs">
                {currentPhase.title}
              </span>
              <div className="flex items-center gap-1 ml-1">
                {currentMission.phases.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === state.currentPhaseIndex
                        ? 'w-6 bg-tech-cyan shadow-glow-cyan'
                        : idx < state.currentPhaseIndex
                        ? 'w-2 bg-tech-emerald'
                        : 'w-2 bg-space-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Large, Engaging, Easy-to-Read Resource Bars */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 md:pb-0">
          
          {/* ⚡ Power (Battery) */}
          <div className="flex items-center gap-2 bg-space-850 border border-space-700/80 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className={`w-4 h-4 ${power <= 25 ? 'animate-bounce text-rose-400' : 'text-amber-400'}`} />
            </div>
            <div className="w-20 sm:w-24">
              <div className="flex justify-between text-[11px] font-semibold leading-tight mb-1">
                <span className="text-slate-300">Power</span>
                <span className={`font-bold ${power <= 25 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                  {power}%
                </span>
              </div>
              <div className="w-full bg-space-750 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    power <= 25 ? 'bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  }`}
                  style={{ width: `${Math.max(5, power)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 🫧 Oxygen (Life Support) */}
          <div className="flex items-center gap-2 bg-space-850 border border-space-700/80 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Wind className={`w-4 h-4 ${oxygen <= 25 ? 'animate-bounce text-rose-400' : 'text-tech-cyan'}`} />
            </div>
            <div className="w-20 sm:w-24">
              <div className="flex justify-between text-[11px] font-semibold leading-tight mb-1">
                <span className="text-slate-300">Oxygen</span>
                <span className={`font-bold ${oxygen <= 25 ? 'text-rose-400 animate-pulse' : 'text-tech-cyan'}`}>
                  {oxygen}%
                </span>
              </div>
              <div className="w-full bg-space-750 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    oxygen <= 25 ? 'bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-cyan-500 to-blue-400'
                  }`}
                  style={{ width: `${Math.max(5, oxygen)}%` }}
                />
              </div>
            </div>
          </div>

          {/* ❤️ Health (Astronaut Stamina) */}
          <div className="flex items-center gap-2 bg-space-850 border border-space-700/80 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Heart className={`w-4 h-4 ${health <= 25 ? 'animate-bounce text-rose-500' : 'text-rose-400'}`} />
            </div>
            <div className="w-20 sm:w-24">
              <div className="flex justify-between text-[11px] font-semibold leading-tight mb-1">
                <span className="text-slate-300">Health</span>
                <span className={`font-bold ${health <= 25 ? 'text-rose-400 animate-pulse' : 'text-rose-400'}`}>
                  {health}%
                </span>
              </div>
              <div className="w-full bg-space-750 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    health <= 25 ? 'bg-rose-600 animate-pulse' : 'bg-gradient-to-r from-rose-500 to-pink-400'
                  }`}
                  style={{ width: `${Math.max(5, health)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 🔬 Science Points */}
          <div className="flex items-center gap-2 bg-space-850 border border-space-700/80 rounded-xl px-3 py-1.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Science</span>
              <span className="text-sm font-extrabold text-tech-emerald mt-0.5">{sciencePoints} pts</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-space-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={state.audioMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {state.audioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-mars-orange" />}
          </button>

        </div>

      </div>
    </header>
  );
}
