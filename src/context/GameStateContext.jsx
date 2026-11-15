import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MISSIONS } from '../data/missionsData';
import { sound } from '../utils/audioSystem';
import confetti from 'canvas-confetti';

const GameStateContext = createContext();

const initialState = {
  currentScreen: 'TITLE_SCREEN', // TITLE_SCREEN, CREW_INTRO, MISSION_SELECT, GAMEPLAY, VICTORY
  activeMissionId: 1,
  currentPhaseIndex: 0,
  resources: {
    power: 80,
    oxygen: 90,
    health: 95,
    sciencePoints: 10,
  },
  missionFlags: [],
  unlockedMissions: [1],
  earnedBadges: [],
  history: [],
  activeDebrief: null,
  activeConsequence: null,
  isEmergencyOverrideOpen: false,
  emergencyReason: '',
  selectedDatasetModal: null,
  selectedCrewInspect: null,
  audioMuted: false,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE': {
      sound.playClick();
      return { ...state, currentScreen: action.payload };
    }

    case 'START_MISSION': {
      sound.playClick();
      const mission = MISSIONS.find(m => m.id === action.payload);
      if (!mission) return state;

      // Start ambient wind on gameplay start
      sound.startMartianWind();

      return {
        ...state,
        activeMissionId: mission.id,
        currentPhaseIndex: 0,
        resources: { ...mission.startingResources },
        history: [],
        activeDebrief: null,
        activeConsequence: null,
        isEmergencyOverrideOpen: false,
        currentScreen: 'GAMEPLAY',
      };
    }

    case 'SELECT_DECISION': {
      const decision = action.payload;
      sound.playExecute();

      // Snapshot previous state for Emergency Rewind
      const snapshot = {
        phaseIndex: state.currentPhaseIndex,
        resources: { ...state.resources },
        missionFlags: [...state.missionFlags],
      };

      // Calculate new resources, clamped between 0 and 100 (except science which can go higher)
      const newPower = Math.max(0, Math.min(100, state.resources.power + (decision.deltas.power || 0)));
      const newOxygen = Math.max(0, Math.min(100, state.resources.oxygen + (decision.deltas.oxygen || 0)));
      const newHealth = Math.max(0, Math.min(100, state.resources.health + (decision.deltas.health || 0)));
      const newScience = Math.max(0, state.resources.sciencePoints + (decision.deltas.sciencePoints || 0));

      const updatedFlags = [...state.missionFlags, ...(decision.setFlags || [])];

      // Check for Critical Failure (any essential survival resource hits 0)
      if (newPower <= 0 || newOxygen <= 0 || newHealth <= 0) {
        sound.playHazardAlarm();
        let reason = '';
        if (newPower <= 0) reason = 'Base power grid collapsed! Habitat systems entered emergency freeze mode.';
        else if (newOxygen <= 0) reason = 'Life-support oxygen reserves depleted! Crew pressure suits compromised.';
        else reason = 'Crew physical stamina exhausted! Severe medical danger detected by Flight Surgeon.';

        return {
          ...state,
          resources: { power: newPower, oxygen: newOxygen, health: newHealth, sciencePoints: newScience },
          history: [...state.history, snapshot],
          isEmergencyOverrideOpen: true,
          emergencyReason: reason,
        };
      }

      // Check for mission badges
      const newBadges = [...state.earnedBadges];
      if (newScience >= 100 && !newBadges.includes('badge-science-hero')) {
        newBadges.push('badge-science-hero');
      }

      return {
        ...state,
        resources: {
          power: newPower,
          oxygen: newOxygen,
          health: newHealth,
          sciencePoints: newScience,
        },
        missionFlags: updatedFlags,
        history: [...state.history, snapshot],
        earnedBadges: newBadges,
        activeConsequence: decision.consequenceText,
        activeDebrief: decision.scienceDebrief,
      };
    }

    case 'DISMISS_DEBRIEF': {
      sound.playClick();
      const currentMission = MISSIONS.find(m => m.id === state.activeMissionId);
      const nextPhaseIndex = state.currentPhaseIndex + 1;

      // Check if more phases exist in current mission
      if (currentMission && nextPhaseIndex < currentMission.phases.length) {
        return {
          ...state,
          currentPhaseIndex: nextPhaseIndex,
          activeDebrief: null,
          activeConsequence: null,
        };
      }

      // Mission Completed!
      sound.playSuccessFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // no-op if unavailable
      }

      const unlocked = [...state.unlockedMissions];
      const nextMissionId = state.activeMissionId + 1;
      if (nextMissionId <= 4 && !unlocked.includes(nextMissionId)) {
        unlocked.push(nextMissionId);
      }

      const updatedBadges = [...state.earnedBadges];
      if (state.activeMissionId === 1 && !updatedBadges.includes('badge-arrival')) updatedBadges.push('badge-arrival');
      if (state.activeMissionId === 2 && !updatedBadges.includes('badge-power')) updatedBadges.push('badge-power');
      if (state.activeMissionId === 3 && !updatedBadges.includes('badge-rover')) updatedBadges.push('badge-rover');
      if (state.activeMissionId === 4 && !updatedBadges.includes('badge-radiation')) updatedBadges.push('badge-radiation');

      // If all 4 missions cleared, show Victory Screen
      if (state.activeMissionId === 4) {
        return {
          ...state,
          unlockedMissions: unlocked,
          earnedBadges: updatedBadges,
          activeDebrief: null,
          activeConsequence: null,
          currentScreen: 'VICTORY',
        };
      }

      // Return to Mission Select hub with next mission ready
      return {
        ...state,
        unlockedMissions: unlocked,
        earnedBadges: updatedBadges,
        activeDebrief: null,
        activeConsequence: null,
        currentScreen: 'MISSION_SELECT',
      };
    }

    // Rewind mechanic for Earth Command Emergency Override (costs science points)
    case 'REWIND_DECISION': {
      sound.playRadioChime();
      if (state.history.length === 0) {
        // Reset to mission start if no snapshot exists
        const mission = MISSIONS.find(m => m.id === state.activeMissionId);
        return {
          ...state,
          currentPhaseIndex: 0,
          resources: { ...mission.startingResources },
          isEmergencyOverrideOpen: false,
          emergencyReason: '',
        };
      }

      const lastSnapshot = state.history[state.history.length - 1];
      const remainingHistory = state.history.slice(0, -1);

      // Rewind penalty: Deduct 15 science points (min 0) or restore resources to baseline safety
      const restoredPower = Math.max(40, lastSnapshot.resources.power);
      const restoredOxygen = Math.max(50, lastSnapshot.resources.oxygen);
      const restoredHealth = Math.max(45, lastSnapshot.resources.health);
      const penalizedScience = Math.max(0, lastSnapshot.resources.sciencePoints - 15);

      return {
        ...state,
        currentPhaseIndex: lastSnapshot.phaseIndex,
        resources: {
          power: restoredPower,
          oxygen: restoredOxygen,
          health: restoredHealth,
          sciencePoints: penalizedScience,
        },
        missionFlags: [...lastSnapshot.missionFlags],
        history: remainingHistory,
        isEmergencyOverrideOpen: false,
        emergencyReason: '',
        activeDebrief: null,
        activeConsequence: null,
      };
    }

    case 'RESTART_CURRENT_SOL': {
      sound.playClick();
      const mission = MISSIONS.find(m => m.id === state.activeMissionId);
      return {
        ...state,
        currentPhaseIndex: 0,
        resources: { ...mission.startingResources },
        history: [],
        isEmergencyOverrideOpen: false,
        emergencyReason: '',
        activeDebrief: null,
        activeConsequence: null,
      };
    }

    case 'INSPECT_NASA_DATA': {
      sound.playRadioChime();
      return { ...state, selectedDatasetModal: action.payload };
    }

    case 'CLOSE_NASA_MODAL': {
      sound.playClick();
      return { ...state, selectedDatasetModal: null };
    }

    case 'INSPECT_CREW': {
      sound.playRadioChime();
      return { ...state, selectedCrewInspect: action.payload };
    }

    case 'CLOSE_CREW_MODAL': {
      sound.playClick();
      return { ...state, selectedCrewInspect: null };
    }

    case 'TOGGLE_AUDIO': {
      const isEnabled = sound.toggleSound();
      return { ...state, audioMuted: !isEnabled };
    }

    default:
      return state;
  }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Play radio beep when phase changes
  useEffect(() => {
    if (state.currentScreen === 'GAMEPLAY') {
      sound.playRadioChime();
    }
  }, [state.currentPhaseIndex, state.currentScreen]);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
