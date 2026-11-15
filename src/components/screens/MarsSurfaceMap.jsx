import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../context/GameStateContext';
import { MISSIONS } from '../../data/missionsData';
import { sound } from '../../utils/audioSystem';
import { Lock, Play, Sparkles, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export default function MarsSurfaceMap({ selectedMissionId, onSelectMission }) {
  const { state, dispatch } = useGameState();
  const canvasRef = useRef(null);

  // Station waypoint positions (percentages of width & height)
  const stations = [
    {
      id: 1,
      name: 'Base Alpha: Touchdown Dome',
      code: 'HOUSE 1',
      subtitle: 'Landing & Living Dome',
      xPct: 0.16,
      yPct: 0.60,
      iconType: 'dome',
      accentColor: '#38bdf8', // Cyan
    },
    {
      id: 2,
      name: 'Base Beta: Helios Solar Station',
      code: 'HOUSE 2',
      subtitle: 'Power Grid & Battery Vault',
      xPct: 0.40,
      yPct: 0.38,
      iconType: 'solar',
      accentColor: '#f59e0b', // Amber
    },
    {
      id: 3,
      name: 'Base Gamma: Rover Telemetry Garage',
      code: 'HOUSE 3',
      subtitle: 'Comms Dish & Rover Bay',
      xPct: 0.65,
      yPct: 0.66,
      iconType: 'rover',
      accentColor: '#10b981', // Emerald
    },
    {
      id: 4,
      name: 'Base Delta: Aegis Radiation Bunker',
      code: 'HOUSE 4',
      subtitle: 'Deep Regolith Storm Shelter',
      xPct: 0.86,
      yPct: 0.40,
      iconType: 'bunker',
      accentColor: '#f43f5e', // Rose
    },
  ];

  // Astronaut current animated position
  const [astronautPos, setAstronautPos] = useState({
    xPct: stations[selectedMissionId - 1]?.xPct || stations[0].xPct,
    yPct: stations[selectedMissionId - 1]?.yPct || stations[0].yPct,
    targetX: stations[selectedMissionId - 1]?.xPct || stations[0].xPct,
    targetY: stations[selectedMissionId - 1]?.yPct || stations[0].yPct,
    isMoving: false,
    walkFrame: 0,
  });

  // Handle station click to move astronaut
  const handleStationClick = (station) => {
    sound.playClick();
    onSelectMission(station.id);

    setAstronautPos(prev => ({
      ...prev,
      targetX: station.xPct,
      targetY: station.yPct,
      isMoving: true,
    }));
  };

  // Smooth animation loop for astronaut movement and canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Update Astronaut Interpolation
      setAstronautPos(prev => {
        const dx = prev.targetX - prev.xPct;
        const dy = prev.targetY - prev.yPct;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.005) {
          return {
            ...prev,
            xPct: prev.xPct + dx * 0.07,
            yPct: prev.yPct + dy * 0.07,
            walkFrame: prev.walkFrame + 0.25,
            isMoving: true,
          };
        } else if (prev.isMoving) {
          sound.playRadioChime();
          return {
            ...prev,
            xPct: prev.targetX,
            yPct: prev.targetY,
            isMoving: false,
          };
        }
        return prev;
      });

      // 2. Realistic Mars Sky Gradient (Twilight Atmosphere)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0a0d18');
      skyGrad.addColorStop(0.35, '#241426');
      skyGrad.addColorStop(0.7, '#642618');
      skyGrad.addColorStop(1, '#b44626');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars in upper sky
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      for (let i = 0; i < 50; i++) {
        const sx = (Math.sin(i * 123) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 77) * 0.5 + 0.5) * (height * 0.42);
        ctx.fillRect(sx, sy, (i % 2 === 0 ? 1.5 : 1), (i % 2 === 0 ? 1.5 : 1));
      }

      // Distant Mars Moon: Phobos
      ctx.fillStyle = '#e2d4c0';
      ctx.beginPath();
      ctx.ellipse(width * 0.85, height * 0.16, 9, 7, 0.4, 0, Math.PI * 2);
      ctx.fill();

      // 3. Distant Jezero Crater Rim Mountains (Layer 1)
      ctx.fillStyle = '#451711';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.45);
      for (let x = 0; x <= width; x += 30) {
        const y = height * 0.45 + Math.sin(x * 0.004) * 35 + Math.cos(x * 0.01) * 16;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // 4. Midground Crater Ridges (Layer 2)
      ctx.fillStyle = '#782614';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.54);
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.54 + Math.sin(x * 0.008 + 1) * 26 + Math.sin(x * 0.02) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // 5. Foreground Martian Regolith Desert Surface (Layer 3)
      const groundGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
      groundGrad.addColorStop(0, '#a53c1d');
      groundGrad.addColorStop(0.4, '#c8532c');
      groundGrad.addColorStop(1, '#66220f');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, height * 0.58, width, height * 0.42);

      // 6. Connective Expedition Trail (Drawn road between the 4 houses)
      ctx.strokeStyle = 'rgba(255, 170, 120, 0.35)';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      stations.forEach((st, idx) => {
        const sx = st.xPct * width;
        const sy = st.yPct * height + 16;
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.setLineDash([]); // reset dash

      // 7. Render Rocks and Craters along the surface
      ctx.fillStyle = '#42140a';
      const rocks = [
        { x: 0.08, y: 0.75, r: 8 },
        { x: 0.28, y: 0.52, r: 6 },
        { x: 0.52, y: 0.78, r: 12 },
        { x: 0.74, y: 0.55, r: 7 },
        { x: 0.94, y: 0.82, r: 10 },
      ];
      rocks.forEach(rk => {
        ctx.beginPath();
        ctx.ellipse(rk.x * width, rk.y * height, rk.r * 1.5, rk.r, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // 8. Draw the 4 Realistic Habitat Houses
      stations.forEach((st) => {
        const sx = st.xPct * width;
        const sy = st.yPct * height;
        const isUnlocked = state.unlockedMissions.includes(st.id);
        const isSelected = selectedMissionId === st.id;
        const isCompleted = state.unlockedMissions.includes(st.id + 1) || (st.id === 4 && state.earnedBadges.includes('badge-radiation'));

        ctx.save();
        ctx.translate(sx, sy);

        // Ground Foundation Shadow / Landing Pad
        ctx.fillStyle = 'rgba(20, 10, 15, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0, 18, 48, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing Selection Ring when house is targeted
        if (isSelected) {
          const pulse = Math.sin(time * 4) * 4 + 52;
          ctx.strokeStyle = st.accentColor;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(0, 18, pulse, pulse * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // --- HOUSE 1: Geodesic Inflatable Touchdown Dome ---
        if (st.iconType === 'dome') {
          // Dome base shell
          const domeGrad = ctx.createRadialGradient(-6, -14, 5, 0, 0, 36);
          domeGrad.addColorStop(0, '#ffffff');
          domeGrad.addColorStop(0.5, '#cbd5e1');
          domeGrad.addColorStop(1, '#475569');
          ctx.fillStyle = domeGrad;
          ctx.beginPath();
          ctx.arc(0, 16, 36, Math.PI, 0, false);
          ctx.fill();
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Inflatable seams (hexagonal pattern)
          ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
          ctx.beginPath();
          ctx.moveTo(-24, 0); ctx.lineTo(24, 0);
          ctx.moveTo(-18, -12); ctx.lineTo(18, -12);
          ctx.moveTo(0, -20); ctx.lineTo(0, 16);
          ctx.stroke();

          // Illuminated Viewport Window
          ctx.fillStyle = 'rgba(56, 189, 248, 0.9)'; // Neon cyan
          ctx.beginPath();
          ctx.ellipse(0, -2, 10, 5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Airlock Tunnel Door
          ctx.fillStyle = '#ff6b3d';
          ctx.fillRect(-8, 8, 16, 10);
          ctx.strokeStyle = '#ffffff';
          ctx.strokeRect(-8, 8, 16, 10);

          // Top Flashing Beacon
          const bAlpha = Math.sin(time * 5) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(56, 189, 248, ${bAlpha})`;
          ctx.beginPath();
          ctx.arc(0, -23, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // --- HOUSE 2: Helios Solar Substation ---
        else if (st.iconType === 'solar') {
          // Central battery vault
          ctx.fillStyle = '#334155';
          ctx.fillRect(-14, -6, 28, 22);
          ctx.strokeStyle = '#64748b';
          ctx.strokeRect(-14, -6, 28, 22);

          // Glowing energy level bars
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(-10, -1, 20, 4);
          ctx.fillRect(-10, 6, 20, 4);

          // Left Solar Array Wing
          ctx.save();
          ctx.translate(-14, 0);
          ctx.fillStyle = '#1e3a8a'; // Photovoltaic blue
          ctx.fillRect(-26, -16, 26, 26);
          ctx.strokeStyle = '#38bdf8';
          ctx.strokeRect(-26, -16, 26, 26);
          // Solar grid lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(-13, -16); ctx.lineTo(-13, 10);
          ctx.moveTo(-26, -3); ctx.lineTo(0, -3);
          ctx.stroke();
          ctx.restore();

          // Right Solar Array Wing
          ctx.save();
          ctx.translate(14, 0);
          ctx.fillStyle = '#1e3a8a';
          ctx.fillRect(0, -16, 26, 26);
          ctx.strokeStyle = '#38bdf8';
          ctx.strokeRect(0, -16, 26, 26);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(13, -16); ctx.lineTo(13, 10);
          ctx.moveTo(0, -3); ctx.lineTo(26, -3);
          ctx.stroke();
          ctx.restore();

          // Beacon
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, -10, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // --- HOUSE 3: Rover Telemetry Bay & Hangar ---
        else if (st.iconType === 'rover') {
          // Metal Hangar arch
          const hangarGrad = ctx.createLinearGradient(-24, 0, 24, 0);
          hangarGrad.addColorStop(0, '#475569');
          hangarGrad.addColorStop(0.5, '#94a3b8');
          hangarGrad.addColorStop(1, '#334155');
          ctx.fillStyle = hangarGrad;
          ctx.beginPath();
          ctx.arc(0, 16, 30, Math.PI, 0, false);
          ctx.fill();

          // Open garage door entrance with hazard stripes
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-14, 2, 28, 14);
          ctx.fillStyle = '#eab308';
          ctx.fillRect(-14, 0, 28, 2);

          // Giant Parabolic Satellite Dish on Roof
          ctx.save();
          ctx.translate(0, -16);
          ctx.rotate(Math.sin(time * 0.8) * 0.2); // Slowly sweeps the sky!
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, 14, Math.PI * 1.15, Math.PI * 1.85);
          ctx.stroke();
          // Feed horn
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, 0); ctx.lineTo(0, -8);
          ctx.stroke();
          ctx.restore();
        }

        // --- HOUSE 4: Deep Regolith Shielded Radiation Bunker ---
        else if (st.iconType === 'bunker') {
          // Regolith soil mound (dark protective dirt)
          ctx.fillStyle = '#4a170d';
          ctx.beginPath();
          ctx.arc(0, 16, 38, Math.PI, 0, false);
          ctx.fill();

          // Reinforced Titanium Blast Door Core
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(0, 16, 22, Math.PI, 0, false);
          ctx.fill();
          ctx.strokeStyle = '#f43f5e'; // Warning rose
          ctx.lineWidth = 2;
          ctx.stroke();

          // Radiation Warning Symbol
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(0, 8, 4, 0, Math.PI * 2);
          ctx.fill();

          // Sensor Mast with Radiation Alert Flasher
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-2, -26, 4, 26);
          const radPulse = Math.sin(time * 6) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(244, 63, 94, ${radPulse})`;
          ctx.beginPath();
          ctx.arc(0, -28, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // House Badge Label / Title Floating above
        ctx.fillStyle = isSelected ? '#ffffff' : (isUnlocked ? '#cbd5e1' : '#64748b');
        ctx.font = 'bold 11px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(st.code, 0, -32);

        // Lock / Completed Status Icon
        if (!isUnlocked) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
          ctx.beginPath();
          ctx.arc(0, 4, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText('🔒', 0, 7.5);
        } else if (isCompleted) {
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(20, -18, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px sans-serif';
          ctx.fillText('✓', 20, -15);
        }

        ctx.restore();
      });

      // 9. Draw the Animated Traveling Astronaut Character!
      const ax = astronautPos.xPct * width;
      const ay = astronautPos.yPct * height + 16;
      const bob = astronautPos.isMoving ? Math.sin(astronautPos.walkFrame * 2) * 3 : 0;

      ctx.save();
      ctx.translate(ax, ay + bob);

      // Astronaut shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 16, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Footstep dust puffs when walking
      if (astronautPos.isMoving) {
        ctx.fillStyle = 'rgba(255, 120, 70, 0.4)';
        ctx.beginPath();
        ctx.arc(-8, 14, (time * 10) % 6, 0, Math.PI * 2);
        ctx.arc(8, 14, ((time * 10) + 3) % 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Life Support Backpack (ECLSS pack)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-10, -12, 5, 18);
      ctx.fillStyle = '#00e5ff'; // cyan battery light
      ctx.fillRect(-10, -8, 2, 4);

      // Spacesuit Torso (White pressurized suit)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(-7, -10, 14, 18, 4);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.stroke();

      // Mission Commander Badge on chest
      ctx.fillStyle = '#ff5722';
      ctx.fillRect(-3, -6, 6, 3);

      // Helmet & Visor
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -16, 8, 0, Math.PI * 2);
      ctx.fill();

      // Golden Reflective Sun Visor
      const visorGrad = ctx.createLinearGradient(0, -20, 0, -12);
      visorGrad.addColorStop(0, '#fbbf24');
      visorGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = visorGrad;
      ctx.beginPath();
      ctx.ellipse(2, -16, 5.5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs / Boots
      const legOffset = astronautPos.isMoving ? Math.sin(astronautPos.walkFrame) * 4 : 0;
      ctx.fillStyle = '#94a3b8';
      // Left leg
      ctx.fillRect(-5 + legOffset, 8, 4, 7);
      // Right leg
      ctx.fillRect(1 - legOffset, 8, 4, 7);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedMissionId, astronautPos.targetX, astronautPos.targetY, state.unlockedMissions]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden border-2 border-space-700/80 shadow-2xl bg-[#090d18] select-none">
      <canvas ref={canvasRef} className="block w-full h-full cursor-pointer" />

      {/* Floating Instructions & Legend Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded-xl bg-space-950/85 backdrop-blur-md border border-space-700 text-xs font-semibold text-slate-200 shadow-md flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-tech-cyan" />
          <span>Tap any Station House to walk your Astronaut there!</span>
        </div>
      </div>

      {/* Clickable Overlay Hotspots for Each House */}
      {stations.map((st) => {
        const isUnlocked = state.unlockedMissions.includes(st.id);
        const isSelected = selectedMissionId === st.id;

        return (
          <button
            key={st.id}
            onClick={() => handleStationClick(st)}
            style={{
              left: `${st.xPct * 100}%`,
              top: `${st.yPct * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-end pb-1 cursor-pointer transition-transform group hover:scale-110 focus:outline-none`}
            title={`Go to ${st.name}`}
          >
            {/* Visual Hover Badge */}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shadow-md transition-all ${
              isSelected
                ? 'bg-tech-cyan text-space-950 scale-105'
                : isUnlocked
                ? 'bg-space-900/90 text-white border border-space-700 group-hover:border-tech-cyan'
                : 'bg-space-950/90 text-slate-400 border border-rose-900'
            }`}>
              {st.code}
            </span>
          </button>
        );
      })}
    </div>
  );
}
