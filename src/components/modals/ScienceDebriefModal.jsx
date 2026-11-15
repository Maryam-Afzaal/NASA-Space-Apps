import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MarsPlanetGraphic } from '../../data/visualAssets';
import { FlaskConical, X, Check } from 'lucide-react';

export default function ScienceDebriefModal() {
  const { state, dispatch } = useGameState();
  const debrief = state.activeDebrief;

  if (!debrief) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-[#0b101d] border-2 border-space-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
        
        {/* Header matching reference mockup */}
        <div className="flex items-center justify-between pb-4 border-b border-space-700/80 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-tech-cyan">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              The Science Behind It
            </h3>
          </div>

          <button
            onClick={() => dispatch({ type: 'DISMISS_DEBRIEF' })}
            className="p-1.5 rounded-lg hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Left Mars Planet Graphic + Right Scientific Explanation */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          
          {/* Left: 3D Glowing Mars Planet Graphic */}
          <div className="sm:col-span-5 flex justify-center">
            <MarsPlanetGraphic className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl" />
          </div>

          {/* Right: Topic Title & Kid-Friendly Explanation */}
          <div className="sm:col-span-7 space-y-3">
            <h4 className="text-sm sm:text-base font-extrabold text-amber-400 leading-snug">
              {debrief.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {debrief.realMarsScience}
            </p>

            {/* Real NASA Mission Connection Fact */}
            <p className="text-xs text-slate-400 leading-relaxed italic border-t border-space-700/60 pt-2">
              💡 {debrief.nasaConnection}
            </p>

            {/* Blue "Got it!" button matching reference mockup */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => dispatch({ type: 'DISMISS_DEBRIEF' })}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Got it!
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
