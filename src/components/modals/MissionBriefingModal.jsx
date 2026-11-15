import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { RobotAssistant, MissionThumbnail } from '../../data/visualAssets';
import { Activity, ArrowRight, X, Star } from 'lucide-react';

export default function MissionBriefingModal({ missionId, isOpen, onClose, onLaunch }) {
  if (!isOpen) return null;

  const mission = MISSIONS.find(m => m.id === missionId) || MISSIONS[0];

  const missionObjectives = {
    1: ['Select a landing site', 'Deploy the habitat', 'Allocate initial resources'],
    2: ['Defend solar arrays', 'Manage power brownout', 'Restore clean panels'],
    3: ['Locate rover telemetry', 'Extract trapped rover', 'Sample subsurface water ice'],
    4: ['Intercept space weather warning', 'Reinforce regolith shield', 'Transmit mission discoveries'],
  };

  const objectives = missionObjectives[mission.id] || ['Complete all objectives'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0b101d] border-2 border-space-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
        
        {/* Header matching reference mockup */}
        <div className="px-6 py-4 bg-space-900 border-b border-space-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-tech-cyan animate-pulse" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Mission Briefing
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Visual + Right Narrative matching reference mockup */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: 3D Mars Base Thumbnail + Cute Robot Assistant */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full h-36 rounded-2xl overflow-hidden border border-space-700 shadow-md mb-3">
              <MissionThumbnail missionId={mission.id} className="w-full h-full object-cover" />
            </div>

            {/* Cute Robot Assistant with Speech Bubble */}
            <div className="flex items-center gap-3 w-full bg-space-950/80 p-2.5 rounded-2xl border border-space-700/80">
              <RobotAssistant className="w-14 h-14 shrink-0" />
              <div className="text-[11px] text-slate-200 leading-snug font-medium">
                "Commander, the data suggests several potential sites. What's your call?"
              </div>
            </div>
          </div>

          {/* Right: Mission Info, Objectives & Let's Go Button */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-mars-orange uppercase tracking-wider block mb-0.5">
                {mission.code}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {mission.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {mission.briefing}
            </p>

            {/* Objectives List with Stars */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
                Objectives:
              </span>
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Star className="w-3.5 h-3.5 text-mars-orange fill-mars-orange shrink-0" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>

            {/* Big Orange LET'S GO Button matching reference mockup */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onLaunch}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:brightness-110 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-glow-mars flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <span>LET'S GO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
