import React, { useState } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { CREW_MEMBERS } from '../../data/crewMembers';
import { AstronautAvatar } from '../../data/visualAssets';
import MarsCanvas2D from '../viewport/MarsCanvas2D';
import ScienceDebriefModal from '../modals/ScienceDebriefModal';
import MissionSuccessModal from '../modals/MissionSuccessModal';
import PauseModal from '../modals/PauseModal';
import EmergencyOverrideModal from '../modals/EmergencyOverrideModal';
import NASADatasetInspectorModal from '../modals/NASADatasetInspectorModal';
import CrewDossierModal from '../modals/CrewDossierModal';
import { Zap, Wind, Heart, FlaskConical, Pause, Sparkles, Check, Database } from 'lucide-react';

export default function GameplayScreen() {
  const { state, dispatch } = useGameState();
  const [isPaused, setIsPaused] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const currentMission = MISSIONS.find(m => m.id === state.activeMissionId) || MISSIONS[0];
  const currentPhase = currentMission.phases[state.currentPhaseIndex] || currentMission.phases[0];
  const { power, oxygen, health, sciencePoints } = state.resources;

  // Active speaking crew member for this phase
  const activeDialogue = currentPhase.crewDialogues[0] || { crewId: 'scientist', quote: 'Proceeding with telemetry.' };
  const speakerCrew = CREW_MEMBERS[activeDialogue.crewId] || CREW_MEMBERS.scientist;

  const handleSelectOption = (option) => {
    setSelectedOptionId(option.id);
    dispatch({ type: 'SELECT_DECISION', payload: option });
  };

  const handleContinueSuccess = () => {
    setIsSuccessModalOpen(false);
    dispatch({ type: 'NAVIGATE', payload: 'MISSION_SELECT' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#080c16] text-slate-100 select-none overflow-hidden font-poppins">
      
      {/* Cinematic Mars Landscape Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 transition-all duration-700"
        style={{ backgroundImage: `url('/mars_hero_bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c16]/95 via-[#080c16]/80 to-[#080c16]/95" />
      </div>

      {/* 1. TOP HUD BAR matching reference mockup */}
      <header className="relative z-20 w-full bg-[#0b101d]/90 backdrop-blur-md border-b border-space-700/80 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Mission Indicator on Left */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-mars-red/20 text-mars-orange border border-mars-red/40">
              {currentMission.code}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white hidden sm:inline">
              {currentMission.title.split(':')[0]}
            </span>
          </div>

          {/* Core Telemetry Meters matching reference mockup */}
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
            
            {/* ⚡ Power */}
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${power <= 25 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
              <div className="w-16 sm:w-24">
                <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-0.5">
                  <span>Power</span>
                  <span>{power}%</span>
                </div>
                <div className="w-full bg-space-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, power)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 🫧 Oxygen */}
            <div className="flex items-center gap-2">
              <Wind className={`w-4 h-4 ${oxygen <= 25 ? 'text-rose-400 animate-pulse' : 'text-tech-cyan'}`} />
              <div className="w-16 sm:w-24">
                <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-0.5">
                  <span>Oxygen</span>
                  <span>{oxygen}%</span>
                </div>
                <div className="w-full bg-space-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, oxygen)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ❤️ Health */}
            <div className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${health <= 25 ? 'text-rose-500 animate-pulse' : 'text-rose-400'}`} />
              <div className="w-16 sm:w-24">
                <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-0.5">
                  <span>Health</span>
                  <span>{health}%</span>
                </div>
                <div className="w-full bg-space-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, health)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 🧪 Science */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-950/80 border border-blue-500/50 text-blue-200 text-xs font-bold backdrop-blur-md">
              <FlaskConical className="w-3.5 h-3.5 text-tech-cyan" />
              <span>Science</span>
              <strong className="text-white">{sciencePoints} pts</strong>
            </div>

            {/* ⏸ Pause Button matching reference mockup */}
            <button
              onClick={() => setIsPaused(true)}
              className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-space-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Pause Game"
            >
              <Pause className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* 2. MAIN CENTRAL MARS VIEWPORT */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto my-auto p-3 sm:p-5 flex flex-col justify-between">
        
        {/* Realistic Mars Environment Canvas with Outpost Base */}
        <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[420px] rounded-3xl overflow-hidden border-2 border-space-700 shadow-2xl bg-black">
          <MarsCanvas2D />

          {/* NASA Telemetry Tag on top left */}
          {currentPhase.nasaTelemetryTag && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-950/85 backdrop-blur-md border border-space-700 text-xs font-semibold text-slate-200 shadow-sm">
              <Database className="w-3.5 h-3.5 text-tech-cyan" />
              <span>{currentPhase.nasaTelemetryTag.tag}</span>
            </div>
          )}
        </div>

        {/* 3. BOTTOM COMMS DIALOGUE & DECISION BAR matching reference mockup */}
        <div className="mt-3 space-y-3">
          
          {/* Astronaut Dialogue Speech Card */}
          <div className="p-3 sm:p-4 rounded-2xl bg-space-850/95 border-2 border-space-700 shadow-xl flex items-center gap-3.5 backdrop-blur-md">
            {/* Astronaut Avatar Portrait */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tech-cyan shrink-0 bg-space-900 shadow-md">
              <AstronautAvatar crewId={speakerCrew.id} className="w-full h-full object-cover" />
            </div>

            {/* Spoken Quote */}
            <div className="flex-1 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              <strong className="text-tech-cyan block mb-0.5">{speakerCrew.name}:</strong>
              <span>"{activeDialogue.quote}"</span>
            </div>
          </div>

          {/* Decision Pill Action Buttons matching reference mockup */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {currentPhase.decisionOptions.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`flex-1 min-w-[200px] py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md cursor-pointer text-center flex items-center justify-center gap-2 ${
                    idx === 0
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white shadow-glow-cyan border border-blue-400'
                      : 'bg-space-850/90 hover:bg-space-800 border-2 border-space-700 hover:border-slate-400 text-slate-200 backdrop-blur-md'
                  }`}
                >
                  <span>{option.title.split(':')[1]?.trim() || option.title}</span>
                </button>
              );
            })}
          </div>

        </div>

      </main>

      {/* MODALS */}
      <ScienceDebriefModal />
      <MissionSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onContinue={handleContinueSuccess}
      />
      <PauseModal
        isOpen={isPaused}
        onClose={() => setIsPaused(false)}
      />
      <EmergencyOverrideModal />
      <NASADatasetInspectorModal />
      <CrewDossierModal />

    </div>
  );
}
