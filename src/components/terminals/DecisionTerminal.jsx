import React, { useState } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { AlertCircle, CheckCircle, ChevronRight, ShieldAlert, Sparkles, Zap, Heart, Wind, Check } from 'lucide-react';

export default function DecisionTerminal() {
  const { state, dispatch } = useGameState();
  const currentMission = MISSIONS.find(m => m.id === state.activeMissionId) || MISSIONS[0];
  const currentPhase = currentMission.phases[state.currentPhaseIndex] || currentMission.phases[0];

  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const selectedOption = currentPhase.decisionOptions.find(o => o.id === selectedOptionId);

  const handleExecute = () => {
    if (!selectedOption) return;
    dispatch({ type: 'SELECT_DECISION', payload: selectedOption });
    setSelectedOptionId(null);
  };

  return (
    <div className="w-full bg-space-900 border-2 border-space-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      
      {/* 1. Tactical Incident Alert Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-b border-space-700/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Crisis Alert • Mission Phase {state.currentPhaseIndex + 1}
            </span>
          </div>

          {currentPhase.nasaTelemetryTag && (
            <span className="text-[11px] font-medium text-tech-cyan bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
              🛰️ {currentPhase.nasaTelemetryTag.tag}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
          {currentPhase.situation}
        </p>
      </div>

      {/* 2. Clear Instruction Bar */}
      <div className="px-4 py-2 bg-space-850 border-b border-space-700/60 flex items-center justify-between text-xs font-medium text-slate-300">
        <span className="flex items-center gap-1.5 text-tech-cyan">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1: Select a protocol below to see its trade-offs</span>
        </span>
        <span className="text-slate-400 text-[11px] hidden sm:inline">
          Step 2: Press Confirm Orders to execute
        </span>
      </div>

      {/* 3. Decision Option Cards Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {currentPhase.decisionOptions.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelectedOptionId(option.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer relative group ${
                isSelected
                  ? 'bg-gradient-to-b from-space-800 to-space-850 border-tech-cyan shadow-glow-cyan ring-2 ring-tech-cyan/30 scale-[1.01]'
                  : 'bg-space-850/80 hover:bg-space-800 border-space-700/80 hover:border-slate-500'
              }`}
            >
              <div>
                {/* Option Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-tech-cyan text-space-950' : 'bg-space-700 text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {option.title}
                    </h4>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-tech-cyan flex items-center justify-center text-space-950 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {option.description}
                </p>
              </div>

              {/* Resource Impact Bar with Colorful Badges */}
              <div className="pt-2.5 border-t border-space-700/60 mt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Estimated Outcome:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-space-950 text-amber-300 border border-amber-500/40' : 'text-amber-400'
                  }`}>
                    {option.impactPreview}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Large Glowing Execution Footer */}
      <div className="px-4 py-3.5 bg-space-950 border-t border-space-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs font-medium text-slate-300">
          {selectedOption ? (
            <span className="flex items-center gap-1.5 text-tech-cyan">
              <CheckCircle className="w-4 h-4 text-tech-cyan" />
              <span>Ready: <strong>{selectedOption.title}</strong></span>
            </span>
          ) : (
            <span className="text-slate-400 italic">
              👈 Tap an option above to unlock the confirm button!
            </span>
          )}
        </div>

        <button
          onClick={handleExecute}
          disabled={!selectedOption}
          className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
            selectedOption
              ? 'bg-gradient-to-r from-mars-red via-mars-orange to-mars-glow hover:brightness-110 text-white shadow-glow-mars hover:scale-105 cursor-pointer animate-pulse'
              : 'bg-space-800 border border-space-700 text-slate-500 cursor-not-allowed opacity-50'
          }`}
        >
          <span>CONFIRM & EXECUTE PROTOCOL</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
