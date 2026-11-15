import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { BADGES } from '../../data/badges';
import { Award, Sparkles, Printer, ChevronRight } from 'lucide-react';

export default function VictoryScreen() {
  const { state, dispatch } = useGameState();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] p-4 sm:p-8 flex flex-col justify-between select-none font-poppins overflow-hidden">
      
      {/* Cinematic Mars Landscape Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 transition-all duration-700"
        style={{ backgroundImage: `url('/mars_hero_bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#070b14]/75 to-[#070b14]/95" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-mars-red/25 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-tech-emerald text-xs font-bold mb-3 shadow-glow-emerald backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-tech-emerald" />
          <span>ALL EXPEDITION OBJECTIVES COMPLETED</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
          CONGRATULATIONS, COMMANDER!
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          You successfully led the Ares-V expedition through touchdown, dust storm brownouts, rover rescue operations, and solar radiation emergencies!
        </p>
      </header>

      {/* Official Certificate Card */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto">
        <div className="p-6 sm:p-10 rounded-3xl bg-space-850/90 border-4 border-amber-400 shadow-2xl relative overflow-hidden text-center backdrop-blur-md">
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-mars-red to-mars-orange flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              NASA
            </div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Space Apps Challenge 2026 • Official Commendation
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            JUNIOR MARS EXPEDITION COMMANDER
          </h2>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Permanent Research Settlement Certification
          </p>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg mx-auto mb-6">
            This document certifies that the <strong>Mission Commander</strong> demonstrated exemplary resource management, scientific integrity, and astronaut leadership across Jezero Crater.
          </p>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-6 text-left">
            <div className="p-3 rounded-2xl bg-space-950/80 border border-space-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Science</span>
              <span className="text-base font-extrabold text-tech-emerald">{state.resources.sciencePoints} pts</span>
            </div>
            <div className="p-3 rounded-2xl bg-space-950/80 border border-space-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Power Grid</span>
              <span className="text-base font-extrabold text-amber-400">{state.resources.power}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-space-950/80 border border-space-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Life Support</span>
              <span className="text-base font-extrabold text-tech-cyan">{state.resources.oxygen}%</span>
            </div>
            <div className="p-3 rounded-2xl bg-space-950/80 border border-space-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Crew Health</span>
              <span className="text-base font-extrabold text-rose-400">{state.resources.health}%</span>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="border-t border-b border-space-700/80 py-4 mb-6">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-3">
              Specialist Badges Awarded
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {BADGES.map((badge) => {
                const isEarned = state.earnedBadges.includes(badge.id);
                if (!isEarned) return null;

                return (
                  <div key={badge.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-space-950/90 border border-amber-400/50 text-xs">
                    <span>{badge.icon}</span>
                    <span className="font-bold text-white">{badge.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Ares Base Outpost • Jezero Crater • Mars Planetary Datum
          </div>

        </div>
      </main>

      {/* Action Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full pt-6 border-t border-space-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-space-800 hover:bg-space-750 border border-space-600 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors backdrop-blur-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Certificate</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', payload: 'MISSION_SELECT' })}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:brightness-110 text-white font-bold text-xs tracking-wide shadow-glow-mars flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>MISSION SELECT HUB</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
