import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MissionThumbnail } from '../../data/visualAssets';
import { CheckCircle2, ArrowRight, Zap, Heart, FlaskConical, Lightbulb } from 'lucide-react';

export default function MissionSuccessModal({ isOpen, onClose, onContinue }) {
  const { state } = useGameState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-[#0b101d] border-2 border-emerald-500/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative shadow-glow-emerald">
        
        {/* Glowing Green Banner Header matching reference mockup */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white flex items-center justify-center gap-2 shadow-md">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-wider">
            MISSION SUCCESS!
          </h2>
        </div>

        {/* Modal Body: Left Thumbnail + Right Results */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: 3D Mars Base Outpost Thumbnail */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-space-700 shadow-md">
              <MissionThumbnail missionId={state.activeMissionId} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Success Narrative, Results & What You Learned */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-white">
              You successfully completed the mission objectives on Mars!
            </h3>

            {/* Results Box */}
            <div className="p-3.5 rounded-2xl bg-space-850 border border-space-700 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Mission Results:
              </span>
              <div className="flex items-center justify-between text-tech-emerald font-bold">
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Science Points:</span>
                </span>
                <span>+50 pts</span>
              </div>
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Base Power:</span>
                </span>
                <span>+10%</span>
              </div>
              <div className="flex items-center justify-between text-rose-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Crew Health:</span>
                </span>
                <span>+5%</span>
              </div>
            </div>

            {/* What You Learned Box */}
            <div className="p-3 rounded-xl bg-space-950 border border-space-700/80 text-xs text-slate-300 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">What You Learned:</strong>
                <span>Mars has ancient river beds, showing that water once flowed on the red planet!</span>
              </div>
            </div>

            {/* Orange Continue Journey Button matching reference mockup */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onContinue}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:brightness-110 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-glow-mars flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <span>Continue Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
