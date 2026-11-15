import React, { useState } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { MissionThumbnail } from '../../data/visualAssets';
import MissionBriefingModal from '../modals/MissionBriefingModal';
import { ArrowLeft, Star, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MissionSelectScreen() {
  const { state, dispatch } = useGameState();
  const [briefingMissionId, setBriefingMissionId] = useState(null);

  const handleOpenBriefing = (missionId) => {
    setBriefingMissionId(missionId);
  };

  const handleLaunchMission = () => {
    if (!briefingMissionId) return;
    dispatch({ type: 'START_MISSION', payload: briefingMissionId });
    setBriefingMissionId(null);
  };

  const missionSubtitles = {
    1: 'Find a safe landing site and establish base.',
    2: 'Survive the dust storm.',
    3: 'Recover the missing rover.',
    4: 'Weather the solar storm.',
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080c16] p-4 sm:p-6 flex flex-col justify-between select-none font-poppins overflow-hidden">
      
      {/* Cinematic Mars Landscape Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 transition-all duration-700"
        style={{ backgroundImage: `url('/mars_panorama.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c16]/95 via-[#080c16]/80 to-[#080c16]/95" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-mars-orange/20 blur-[130px] rounded-full" />
      </div>

      {/* Header Bar matching reference mockup */}
      <header className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between pb-4 border-b border-space-700/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', payload: 'TITLE_SCREEN' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-850/90 hover:bg-space-800 border border-space-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Mission Select Hub
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Choose your next mission
            </p>
          </div>
        </div>

        {/* Science Points Badge matching reference mockup */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-space-850/90 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-md backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Science Points: {state.resources.sciencePoints}</span>
        </div>
      </header>

      {/* Main 2x2 Mission Grid matching reference mockup */}
      <main className="relative z-10 max-w-6xl mx-auto w-full my-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MISSIONS.map((mission) => {
            const isUnlocked = state.unlockedMissions.includes(mission.id);
            const isCompleted = state.unlockedMissions.includes(mission.id + 1) || (mission.id === 4 && state.earnedBadges.includes('badge-radiation'));

            return (
              <div
                key={mission.id}
                className={`p-4 rounded-3xl border-2 transition-all duration-200 flex flex-col sm:flex-row items-center gap-4 shadow-2xl backdrop-blur-md ${
                  isUnlocked
                    ? 'bg-space-850/90 border-space-700 hover:border-mars-orange/80 shadow-glow-mars/10 ring-1 ring-mars-orange/20'
                    : 'bg-space-950/70 border-space-800 opacity-60'
                }`}
              >
                {/* 3D Realistic Thumbnail Visual */}
                <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden border border-space-700 shrink-0 shadow-md">
                  <MissionThumbnail missionId={mission.id} className="w-full h-full object-cover" />
                </div>

                {/* Mission Details */}
                <div className="flex-1 w-full flex flex-col justify-between h-full py-1">
                  <div>
                    {/* Mission Tag & Status */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-mars-red/20 text-mars-orange border border-mars-red/40">
                        {mission.code}
                      </span>

                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-tech-emerald">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Cleared</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                      {mission.title.split(':')[0]}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-300 mb-3">
                      {missionSubtitles[mission.id] || mission.subtitle}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isUnlocked ? (
                      <button
                        onClick={() => handleOpenBriefing(mission.id)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-mars-red to-mars-orange hover:brightness-110 text-white font-extrabold text-xs tracking-wide shadow-glow-mars flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                      >
                        <span>LAUNCH MISSION</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Complete Mission {mission.id - 1} first</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full pt-4 border-t border-space-700/80 text-center text-xs text-slate-400">
        Ares Base Expedition • Choose any available mission to train your crew.
      </footer>

      {/* Mission Briefing Modal Popup */}
      <MissionBriefingModal
        missionId={briefingMissionId}
        isOpen={!!briefingMissionId}
        onClose={() => setBriefingMissionId(null)}
        onLaunch={handleLaunchMission}
      />

    </div>
  );
}
