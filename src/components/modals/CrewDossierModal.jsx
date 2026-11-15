import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { X, Award, Quote } from 'lucide-react';

export default function CrewDossierModal() {
  const { state, dispatch } = useGameState();
  const crew = state.selectedCrewInspect;

  if (!crew) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-space-900 border-2 border-space-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-space-950 via-space-850 to-space-950 border-b border-space-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm border-2 shadow-sm ${crew.badgeColor}`}>
              {crew.callsign.substring(0, 2)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {crew.name}
              </h3>
              <p className="text-xs font-semibold text-tech-cyan">
                Callsign: {crew.callsign} • {crew.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'CLOSE_CREW_MODAL' })}
            className="p-2 rounded-xl hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          
          {/* Specialty */}
          <div className="p-3.5 rounded-2xl bg-space-850 border border-space-700">
            <span className="text-xs uppercase text-amber-400 font-bold block mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Specialty & Primary Domain
            </span>
            <p className="text-slate-100 font-medium">
              {crew.specialty}
            </p>
          </div>

          {/* Personality & Approach */}
          <div>
            <span className="text-xs uppercase text-slate-400 font-bold block mb-1">
              Mission Perspective:
            </span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {crew.personality}
            </p>
          </div>

          {/* Bio */}
          <div>
            <span className="text-xs uppercase text-slate-400 font-bold block mb-1">
              Astronaut Background:
            </span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {crew.bio}
            </p>
          </div>

          {/* Catchphrase */}
          {crew.catchphrase && (
            <div className="p-3 rounded-xl bg-space-950 border border-space-700 italic text-slate-200 flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-mars-orange shrink-0 mt-0.5" />
              <span>"{crew.catchphrase}"</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-space-950 border-t border-space-700/80 flex justify-end">
          <button
            onClick={() => dispatch({ type: 'CLOSE_CREW_MODAL' })}
            className="px-6 py-2.5 rounded-xl bg-space-800 hover:bg-space-750 border border-space-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
