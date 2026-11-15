import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { CREW_MEMBERS } from '../../data/crewMembers';
import { AstronautAvatar } from '../../data/visualAssets';
import { ArrowLeft, Activity, ChevronRight } from 'lucide-react';

export default function CrewIntroScreen() {
  const { dispatch } = useGameState();

  const crewCards = [
    {
      id: 'commander',
      isYou: true,
      name: 'You',
      role: 'Mission Commander',
      domain: 'Strategic Leadership & Mission Decisions',
      quote: '"Calm, decisive, and responsible."',
      borderColor: 'border-amber-400 ring-2 ring-amber-400/40 shadow-glow-gold',
      badgeColor: 'bg-amber-400 text-space-950',
      titleColor: 'text-amber-400',
    },
    {
      id: 'scientist',
      isYou: false,
      name: 'Maryam',
      role: 'Lead Astrobiologist',
      domain: 'Mars Soil Samples, Ancient Water Signs',
      quote: '"This could be the discovery of the century!"',
      borderColor: 'border-blue-400 ring-1 ring-blue-400/30',
      badgeColor: 'bg-blue-500 text-white',
      titleColor: 'text-blue-400',
    },
    {
      id: 'engineer',
      isYou: false,
      name: 'Abdullah',
      role: 'Chief Engineer',
      domain: 'Power Systems, Life Support',
      quote: '"Numbers don\'t lie, Commander."',
      borderColor: 'border-emerald-400 ring-1 ring-emerald-400/30',
      badgeColor: 'bg-emerald-500 text-white',
      titleColor: 'text-emerald-400',
    },
    {
      id: 'pilot',
      isYou: false,
      name: 'Zunaira',
      role: 'Expedition Pilot',
      domain: 'Navigation & Rovers',
      quote: '"Give me the wheel!"',
      borderColor: 'border-purple-400 ring-1 ring-purple-400/30',
      badgeColor: 'bg-purple-500 text-white',
      titleColor: 'text-purple-400',
    },
    {
      id: 'medical',
      isYou: false,
      name: 'Lawaiza',
      role: 'Medical Officer',
      domain: 'Crew Health & Radiation Safety',
      quote: '"Safety first!"',
      borderColor: 'border-rose-400 ring-1 ring-rose-400/30',
      badgeColor: 'bg-rose-500 text-white',
      titleColor: 'text-rose-400',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#080c16] p-4 sm:p-6 flex flex-col justify-between select-none font-poppins overflow-hidden">
      
      {/* Cinematic Mars Landscape Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 transition-all duration-700"
        style={{ backgroundImage: `url('/mars_panorama.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c16]/95 via-[#080c16]/80 to-[#080c16]/95" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-mars-red/20 blur-[140px] rounded-full" />
      </div>

      {/* Header Bar matching reference mockup */}
      <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pb-3 border-b border-space-700/80">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', payload: 'TITLE_SCREEN' })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-850/90 hover:bg-space-800 border border-space-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-center">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            Expedition Roster • Ares Base Team
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Meet Your Mars Expedition Crew
          </p>
        </div>

        {/* Heart Rate / Telemetry ECG Graphic */}
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs">
          <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
          <span className="hidden sm:inline text-slate-400 text-[11px]">Telemetry Nominal</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4">
        
        {/* Intro Paragraph */}
        <p className="text-center text-xs sm:text-sm text-slate-200 max-w-3xl mx-auto mb-6 leading-relaxed font-normal bg-space-950/60 p-3 rounded-2xl border border-space-700/60 backdrop-blur-md">
          As <strong>Mission Commander</strong>, you lead a world-class team of specialists. When crises arise on Mars, each astronaut will advise you from their scientific perspective — but <strong>you make the final decisions</strong>.
        </p>

        {/* 5 Astronaut Cards in a Row matching reference mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {crewCards.map((crew) => (
            <div
              key={crew.id}
              className={`p-3.5 rounded-2xl bg-space-850/90 border-2 transition-all duration-200 flex flex-col justify-between shadow-2xl relative group hover:scale-[1.02] backdrop-blur-md ${crew.borderColor}`}
            >
              <div>
                {/* Star You Tag for Commander */}
                {crew.isYou && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-space-950 flex items-center gap-1 shadow-md">
                    ★ You
                  </span>
                )}

                {/* 3D Stylized Character Avatar Portrait */}
                <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3 bg-space-900 border border-space-700/80 shadow-inner flex items-center justify-center">
                  <AstronautAvatar crewId={crew.id} className="w-full h-full object-cover" />
                </div>

                {/* Name & Title */}
                <h3 className="text-sm font-bold text-white text-center mb-0.5">
                  {crew.name}
                </h3>
                <p className={`text-xs font-bold text-center mb-2.5 ${crew.titleColor}`}>
                  {crew.role}
                </p>

                {/* Primary Domain */}
                <div className="text-[11px] text-slate-300 text-center leading-snug mb-3">
                  <span className="font-semibold text-slate-400 block text-[10px] uppercase mb-0.5">
                    Primary Domain:
                  </span>
                  <span>{crew.domain}</span>
                </div>
              </div>

              {/* Character Quote */}
              <div className="p-2 rounded-xl bg-space-950/90 border border-space-700/60 text-center text-xs italic text-slate-200">
                {crew.quote}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer Navigation */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-space-700/80 flex justify-end">
        <button
          onClick={() => dispatch({ type: 'NAVIGATE', payload: 'MISSION_SELECT' })}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-mars-red via-mars-orange to-mars-glow hover:brightness-110 text-white font-extrabold text-sm tracking-wide shadow-glow-mars flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span>CONTINUE TO MISSION HUB</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
