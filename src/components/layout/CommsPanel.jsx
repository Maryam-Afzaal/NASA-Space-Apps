import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { CREW_MEMBERS } from '../../data/crewMembers';
import { Radio, Users, Sparkles, Info, MessageSquare } from 'lucide-react';

export default function CommsPanel() {
  const { state, dispatch } = useGameState();
  const currentMission = MISSIONS.find(m => m.id === state.activeMissionId) || MISSIONS[0];
  const currentPhase = currentMission.phases[state.currentPhaseIndex] || currentMission.phases[0];

  return (
    <div className="w-full h-full flex flex-col bg-space-900 border-2 border-space-700/80 rounded-2xl overflow-hidden shadow-xl">
      
      {/* Comms Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-space-950 to-space-900 border-b border-space-700/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-tech-cyan/20 border border-tech-cyan/50 flex items-center justify-center text-tech-cyan">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Crew Comms & Advice
            </h2>
            <span className="text-[10px] text-slate-400">
              Listen to your team before deciding
            </span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-tech-cyan bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
          Live Audio
        </span>
      </div>

      {/* Crew Dialogues List */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {currentPhase.crewDialogues.map((dialogue, idx) => {
          const crew = CREW_MEMBERS[dialogue.crewId] || CREW_MEMBERS.scientist;

          return (
            <div
              key={idx}
              className="bg-space-850 border border-space-700/80 hover:border-tech-cyan/50 transition-all rounded-xl p-3 shadow-sm group"
            >
              {/* Astronaut Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-sm ${crew.badgeColor}`}>
                    {crew.callsign.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {crew.name}
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400">
                      {crew.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'INSPECT_CREW', payload: crew })}
                  className="p-1 rounded-lg hover:bg-space-750 text-slate-400 hover:text-tech-cyan transition-colors cursor-pointer"
                  title="View full astronaut bio"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speech Bubble */}
              <div className="relative bg-space-950/80 border-l-4 border-mars-orange rounded-r-xl p-2.5">
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  "{dialogue.quote}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commander Tip Footer */}
      <div className="p-3 bg-space-950 border-t border-space-700/80 text-xs font-medium text-slate-400 flex items-center gap-2">
        <Users className="w-4 h-4 text-tech-cyan shrink-0" />
        <span>Commander: Specialists often disagree. Weigh their points carefully!</span>
      </div>

    </div>
  );
}
