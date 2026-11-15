import React, { useRef, useEffect } from 'react';
import { useGameState } from '../../context/GameStateContext';

export default function MarsCanvas2D() {
  const canvasRef = useRef(null);
  const { state } = useGameState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle high DPI
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for Martian dust
    const isStorm = state.activeMissionId === 2;
    const particleCount = isStorm ? 180 : 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (isStorm ? 2.5 : 1.2) + 0.5,
      speedX: (Math.random() * (isStorm ? 5 : 1.5) + 0.5),
      speedY: (Math.random() * (isStorm ? 1.8 : 0.6) - 0.3),
      alpha: Math.random() * (isStorm ? 0.6 : 0.25) + 0.1,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Sky Gradient: Butterscotch Mars sky or dark storm haze
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isStorm) {
        skyGrad.addColorStop(0, '#1a0906');
        skyGrad.addColorStop(0.5, '#40170e');
        skyGrad.addColorStop(1, '#682819');
      } else {
        skyGrad.addColorStop(0, '#0f0914');
        skyGrad.addColorStop(0.35, '#2b1218');
        skyGrad.addColorStop(0.7, '#6b2d1c');
        skyGrad.addColorStop(1, '#c85a32');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars in upper sky (if not in a blinding dust storm)
      if (!isStorm) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let i = 0; i < 40; i++) {
          const starX = (Math.sin(i * 99) * 0.5 + 0.5) * width;
          const starY = (Math.cos(i * 47) * 0.5 + 0.5) * (height * 0.45);
          const starSize = (i % 3 === 0) ? 1.5 : 1.0;
          ctx.fillRect(starX, starY, starSize, starSize);
        }

        // Faint Martian Sun (Appears smaller than from Earth)
        ctx.save();
        const sunX = width * 0.72;
        const sunY = height * 0.28;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 32);
        sunGrad.addColorStop(0, 'rgba(255, 250, 240, 0.9)');
        sunGrad.addColorStop(0.3, 'rgba(230, 200, 170, 0.4)');
        sunGrad.addColorStop(1, 'rgba(200, 90, 50, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Distant Crater Mountains (Parallax Layer 1)
      ctx.fillStyle = isStorm ? '#3b140b' : '#4f1e14';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.62);
      for (let x = 0; x <= width; x += 30) {
        const y = height * 0.62 + Math.sin(x * 0.005) * 28 + Math.cos(x * 0.012) * 14;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // 3. Midground Dunes & Crater Rim (Parallax Layer 2)
      ctx.fillStyle = isStorm ? '#5c2012' : '#8c351e';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.74);
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.74 + Math.sin(x * 0.008 + 1) * 22 + Math.sin(x * 0.02) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // 4. Foreground Martian Plain (Layer 3)
      const groundGrad = ctx.createLinearGradient(0, height * 0.82, 0, height);
      groundGrad.addColorStop(0, isStorm ? '#6e2716' : '#b24424');
      groundGrad.addColorStop(1, isStorm ? '#361108' : '#73230f');
      ctx.fillStyle = groundGrad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.83);
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.83 + Math.sin(x * 0.015) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Scatter rocks & boulders
      ctx.fillStyle = '#3a1107';
      const rockLocations = [0.12, 0.28, 0.44, 0.62, 0.85, 0.94];
      rockLocations.forEach((pct, idx) => {
        const rx = width * pct;
        const ry = height * 0.85 + (idx % 3) * 14;
        const rSize = 6 + (idx % 4) * 3;
        ctx.beginPath();
        ctx.ellipse(rx, ry, rSize * 1.6, rSize, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Inflatable Research Habitat Outpost (Ares Base Dome)
      const habX = width * 0.32;
      const habY = height * 0.81;
      const habRadius = Math.min(width * 0.12, 75);

      // Main dome structure
      ctx.save();
      const domeGrad = ctx.createRadialGradient(habX, habY - habRadius * 0.4, 10, habX, habY, habRadius);
      domeGrad.addColorStop(0, '#f1f5f9');
      domeGrad.addColorStop(0.6, '#94a3b8');
      domeGrad.addColorStop(1, '#475569');
      ctx.fillStyle = domeGrad;
      ctx.beginPath();
      ctx.arc(habX, habY, habRadius, Math.PI, 0, false);
      ctx.fill();

      // Habitat seams & observation viewports
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Illuminated observation window (Warm glow inside)
      ctx.fillStyle = 'rgba(0, 212, 255, 0.85)';
      ctx.beginPath();
      ctx.ellipse(habX, habY - habRadius * 0.5, habRadius * 0.25, habRadius * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flashing comms beacon atop the dome
      const beaconAlpha = Math.sin(time * 4) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 68, 68, ${beaconAlpha})`;
      ctx.beginPath();
      ctx.arc(habX, habY - habRadius - 6, 4, 0, Math.PI * 2);
      ctx.fill();

      // 6. Solar Panel Wings (Left & Right)
      const panelTilt = state.activeMissionId === 2 ? 0.3 : 0.05; // Tilted during storm!
      const panelWidth = habRadius * 0.7;
      const panelHeight = habRadius * 0.35;

      // Left solar wing
      ctx.save();
      ctx.translate(habX - habRadius - 15, habY - 10);
      ctx.rotate(panelTilt);
      ctx.fillStyle = '#1e3a8a'; // Deep photovoltaic blue
      ctx.fillRect(-panelWidth, -panelHeight / 2, panelWidth, panelHeight);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-panelWidth, -panelHeight / 2, panelWidth, panelHeight);
      ctx.restore();

      // Right solar wing
      ctx.save();
      ctx.translate(habX + habRadius + 15, habY - 10);
      ctx.rotate(-panelTilt);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, -panelHeight / 2, panelWidth, panelHeight);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0, -panelHeight / 2, panelWidth, panelHeight);
      ctx.restore();

      // 7. Exploration Rover (Junior Curiosity)
      const roverX = width * 0.68 + Math.sin(time * 0.5) * 4;
      const roverY = height * 0.84;
      
      // Rover chassis
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(roverX - 22, roverY - 16, 44, 14);

      // Instrument mast and stereo camera eyes
      ctx.fillStyle = '#475569';
      ctx.fillRect(roverX + 12, roverY - 30, 4, 16);
      ctx.fillStyle = '#00d4ff';
      ctx.beginPath();
      ctx.arc(roverX + 14, roverY - 30, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 6-wheel rocker-bogie chassis wheels
      ctx.fillStyle = '#1e293b';
      const wheelOffsets = [-18, -4, 14];
      wheelOffsets.forEach(ox => {
        ctx.beginPath();
        ctx.arc(roverX + ox, roverY + 2, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 8. Animated Dust Particle System
      ctx.fillStyle = isStorm ? 'rgba(230, 110, 60, 0.7)' : 'rgba(255, 170, 110, 0.35)';
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = height * 0.4;
        if (p.y < height * 0.4) p.y = height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // CRT scanlines overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [state.activeMissionId]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
