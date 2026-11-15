import React, { useState } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { Rocket, Play, Database, Users, Scale, Sparkles, X, ChevronRight, Award } from 'lucide-react';
import ChallengeDetailsModal from '../modals/ChallengeDetailsModal';

export default function TitleScreen() {
  const { dispatch } = useGameState();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showChallengeDetails, setShowChallengeDetails] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 bg-[#070b14] overflow-hidden select-none font-poppins">
      
      {/* 1. Cinematic Photorealistic Mars Background Image with Astronaut on Left */}
      <div 
        className="absolute inset-0 bg-cover bg-center sm:bg-[center_left] transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('/mars_hero_bg.jpg')`,
        }}
      >
        {/* Cinematic atmospheric overlays for optimal text readability on the right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#070b14]/50 to-[#070b14]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-[#070b14]/60" />
        
        {/* Soft orange ambient aura */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-mars-red/20 blur-[130px] rounded-full" />
      </div>

      {/* 2. Top Header Bar matching reference mockup */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pb-3">
        {/* Left: NASA Logo + Challenge Subtitle (Clickable for Challenge Guide) */}
        <div 
          onClick={() => setShowChallengeDetails(true)}
          className="flex items-center gap-3 cursor-pointer group"
          title="Click to view NASA Challenge Objectives & Judge Reference"
        >
          {/* NASA Meatball Logo */}
          <div className="w-11 h-11 rounded-full bg-[#0b3d91] border-2 border-white flex items-center justify-center font-black text-white text-[13px] tracking-tight shadow-xl shadow-blue-950/60 relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            {/* Red NASA Chevron vector */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#0b3d91" />
              <path d="M15 65 Q50 20 85 45 Q50 35 15 65 Z" fill="#fc3d21" />
              <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="24" fontFamily="sans-serif" letterSpacing="-1">NASA</text>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight group-hover:text-tech-cyan transition-colors">
                NASA Space Apps Challenge 2026
              </h2>
              <span className="text-[10px] bg-blue-900/60 border border-blue-400/40 text-blue-200 px-2 py-0.5 rounded-full hidden sm:inline">
                Judge Brief
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">
              Track: Build a Junior Astronaut Mission Trainer
            </p>
          </div>
        </div>

        {/* Right: NASA Open Data Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChallengeDetails(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-space-850/80 hover:bg-space-800 border border-space-700 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer backdrop-blur-md"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Challenge Objectives</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'INSPECT_NASA_DATA', payload: 'meda' })}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-850/80 hover:bg-space-800 border border-tech-cyan/60 hover:border-tech-cyan text-tech-cyan text-xs font-semibold shadow-md transition-all cursor-pointer backdrop-blur-md"
          >
            <Database className="w-3.5 h-3.5" />
            <span>NASA Open Data</span>
            <span className="text-[10px]">↗</span>
          </button>
        </div>
      </header>

      {/* 3. Main Center Hero Area (Text aligned right, Astronaut featured on left) */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left column spacer (lets the realistic astronaut and base shine through) */}
        <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[350px]">
          {/* Subtle indicator beacon */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-950/70 border border-mars-orange/50 text-mars-orange text-[11px] font-bold backdrop-blur-md mt-4 ml-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-mars-orange animate-ping" />
            <span>Ares Base Outpost • Jezero Basin</span>
          </div>
        </div>

        {/* Right column: Exact typography and buttons matching reference mockup */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-4 max-w-2xl mx-auto lg:mx-0 bg-space-950/40 lg:bg-transparent p-5 sm:p-0 rounded-3xl backdrop-blur-sm lg:backdrop-blur-none border border-space-700/40 lg:border-none shadow-2xl lg:shadow-none">
          
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-slate-100 block mb-0.5">
              MISSION:
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d28] via-[#ff6b3d] to-[#ff9e80] drop-shadow-[0_8px_25px_rgba(255,77,40,0.4)] leading-none">
              MARS FRONTIER
            </h1>
          </div>

          <h3 className="text-base sm:text-xl font-bold text-slate-100">
            Take Command. Explore Mars. Protect Your Crew.
          </h3>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
            Humanity’s first permanent Mars research outpost is counting on you. Lead your specialist crew through dangerous missions, make difficult decisions, and discover the science behind surviving on another planet.
          </p>

          {/* Action Buttons matching reference mockup */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
            {/* Big Orange START EXPEDITION Button */}
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', payload: 'CREW_INTRO' })}
              className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-[#ff4d28] via-[#ff6b3d] to-[#ff8a50] hover:brightness-110 transition-all duration-200 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-glow-mars flex items-center justify-center gap-3 cursor-pointer hover:scale-105"
            >
              <Rocket className="w-5 h-5 fill-white" />
              <span>START EXPEDITION</span>
            </button>

            {/* Translucent HOW TO PLAY Button */}
            <button
              onClick={() => setShowHowToPlay(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-space-850/80 hover:bg-space-800 border-2 border-space-600 hover:border-slate-300 text-slate-200 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Play className="w-4 h-4 fill-slate-300 text-slate-300" />
              <span>HOW TO PLAY</span>
            </button>
          </div>

        </div>

      </main>

      {/* 4. Bottom Feature Strip matching reference mockup */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-space-700/60 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs font-semibold text-slate-200">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/70 border border-space-700/60 backdrop-blur-md">
          <Users className="w-4 h-4 text-tech-cyan" />
          <span>Specialists</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/70 border border-space-700/60 backdrop-blur-md">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Real Trade-Offs</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/70 border border-space-700/60 backdrop-blur-md">
          <Database className="w-4 h-4 text-tech-emerald" />
          <span>NASA Science</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/70 border border-space-700/60 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-mars-orange" />
          <span>Ages 7–12</span>
        </div>
      </footer>

      {/* HOW TO PLAY MODAL */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0b101d] border-2 border-space-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-mars-orange/20 border border-mars-orange/50 flex items-center justify-center text-mars-orange font-bold">
                ▷
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">How To Play</h3>
                <p className="text-xs text-slate-400">Junior Astronaut Mission Trainer Guide</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="p-3 rounded-xl bg-space-850 border border-space-700">
                <strong className="text-tech-cyan block mb-0.5">1. Meet Your Crew</strong>
                Listen to advice from Maryam (Science), Abdullah (Engineering), Zunaira (Pilot), and Lawaiza (Medical).
              </div>
              <div className="p-3 rounded-xl bg-space-850 border border-space-700">
                <strong className="text-amber-400 block mb-0.5">2. Make Strategic Decisions</strong>
                Weigh trade-offs between Power, Oxygen, Health, and Science. Every choice matters!
              </div>
              <div className="p-3 rounded-xl bg-space-850 border border-space-700">
                <strong className="text-tech-emerald block mb-0.5">3. Learn Real NASA Planetary Science</strong>
                After every decision, read the Science Debrief to discover how real NASA rovers explore Mars.
              </div>
            </div>

            <button
              onClick={() => {
                setShowHowToPlay(false);
                dispatch({ type: 'NAVIGATE', payload: 'CREW_INTRO' });
              }}
              className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange text-white font-bold text-sm shadow-glow-mars cursor-pointer"
            >
              LET'S START!
            </button>
          </div>
        </div>
      )}

      {/* NASA CHALLENGE & JUDGE BRIEF MODAL */}
      <ChallengeDetailsModal
        isOpen={showChallengeDetails}
        onClose={() => setShowChallengeDetails(false)}
      />

    </div>
  );
}
