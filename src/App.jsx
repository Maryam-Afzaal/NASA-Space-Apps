import React from 'react';
import { GameStateProvider, useGameState } from './context/GameStateContext';
import TitleScreen from './components/screens/TitleScreen';
import CrewIntroScreen from './components/screens/CrewIntroScreen';
import MissionSelectScreen from './components/screens/MissionSelectScreen';
import GameplayScreen from './components/screens/GameplayScreen';
import VictoryScreen from './components/screens/VictoryScreen';
import NASADatasetInspectorModal from './components/modals/NASADatasetInspectorModal';

function AppContent() {
  const { state } = useGameState();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'TITLE_SCREEN':
        return <TitleScreen />;
      case 'CREW_INTRO':
        return <CrewIntroScreen />;
      case 'MISSION_SELECT':
        return <MissionSelectScreen />;
      case 'GAMEPLAY':
        return <GameplayScreen />;
      case 'VICTORY':
        return <VictoryScreen />;
      default:
        return <TitleScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-mars-dark text-slate-100 font-exo">
      {renderScreen()}

      {/* Global Modals that can be accessed from any screen */}
      {state.currentScreen !== 'GAMEPLAY' && <NASADatasetInspectorModal />}
    </div>
  );
}

export default function App() {
  return (
    <GameStateProvider>
      <AppContent />
    </GameStateProvider>
  );
}
