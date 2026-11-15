import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { Play, Users, Settings, LogOut, Volume2, VolumeX } from 'lucide-react';

export default function PauseModal({ isOpen, onClose }) {
  const { state, dispatch } = useGameState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0b101d] border-2 border-space-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
        
        {/* Header matching reference mockup */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xl">⏸</span>
          <h3 className="text-xl font-extrabold text-white">
            Game Paused
          </h3>
        </div>

        {/* Menu Buttons matching reference mockup */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-mars-red to-mars-orange text-white font-extrabold text-sm shadow-glow-mars flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Resume Game</span>
          </button>

          <button
            onClick={() => {
              onClose();
              dispatch({ type: 'NAVIGATE', payload: 'CREW_INTRO' });
            }}
            className="w-full py-3 px-5 rounded-2xl bg-space-850 hover:bg-space-800 border border-space-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Users className="w-4 h-4 text-tech-cyan" />
            <span>View Crew</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
            className="w-full py-3 px-5 rounded-2xl bg-space-850 hover:bg-space-800 border border-space-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {state.audioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-tech-emerald" />}
            <span>Game Settings: {state.audioMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              dispatch({ type: 'NAVIGATE', payload: 'MISSION_SELECT' });
            }}
            className="w-full py-3 px-5 rounded-2xl bg-space-950 hover:bg-space-900 border border-space-800 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Exit to Hub</span>
          </button>
        </div>

      </div>
    </div>
  );
}
