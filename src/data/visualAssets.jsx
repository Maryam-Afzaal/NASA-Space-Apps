import React from 'react';

// High-fidelity stylized SVG illustrations matching the reference UI mockup

export const RobotAssistant = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="robotHead" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>
      <linearGradient id="robotVisor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Body */}
    <rect x="36" y="78" width="48" height="32" rx="16" fill="url(#robotHead)" stroke="#64748b" strokeWidth="2" />
    <circle cx="60" cy="94" r="7" fill="#0284c7" />
    {/* Neck */}
    <rect x="52" y="70" width="16" height="10" rx="3" fill="#64748b" />
    {/* Antenna */}
    <line x1="60" y1="20" x2="60" y2="30" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="18" r="6" fill="#00d8f6" filter="url(#eyeGlow)" />
    {/* Head */}
    <rect x="22" y="28" width="76" height="46" rx="23" fill="url(#robotHead)" stroke="#64748b" strokeWidth="2.5" />
    {/* Screen Visor */}
    <rect x="30" y="34" width="60" height="34" rx="17" fill="#0b132b" />
    {/* Expressive Blue LED Eyes */}
    <ellipse cx="46" cy="51" rx="8" ry="7" fill="#00e5ff" filter="url(#eyeGlow)" />
    <ellipse cx="74" cy="51" rx="8" ry="7" fill="#00e5ff" filter="url(#eyeGlow)" />
    {/* Eye Pupils / Highlights */}
    <circle cx="44" cy="49" r="2.5" fill="#ffffff" />
    <circle cx="72" cy="49" r="2.5" fill="#ffffff" />
    {/* Cute Cheeks */}
    <ellipse cx="38" cy="58" rx="4" ry="2" fill="#38bdf8" opacity="0.6" />
    <ellipse cx="82" cy="58" rx="4" ry="2" fill="#38bdf8" opacity="0.6" />
  </svg>
);

export const MarsPlanetGraphic = ({ className = "w-36 h-36" }) => (
  <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="marsSphere" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ff8a50" />
        <stop offset="30%" stopColor="#ff5722" />
        <stop offset="70%" stopColor="#c83814" />
        <stop offset="95%" stopColor="#641606" />
        <stop offset="100%" stopColor="#2c0803" />
      </radialGradient>
      <filter id="marsAtmosphereGlow">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Atmosphere Outer Glow */}
    <circle cx="80" cy="80" r="72" fill="#ff7043" opacity="0.25" filter="url(#marsAtmosphereGlow)" />
    {/* Planet Base */}
    <circle cx="80" cy="80" r="66" fill="url(#marsSphere)" />
    {/* Surface Details (Craters and Basins) */}
    <ellipse cx="60" cy="55" rx="18" ry="9" fill="#8d250c" opacity="0.6" />
    <ellipse cx="105" cy="90" rx="24" ry="12" fill="#8d250c" opacity="0.5" />
    <ellipse cx="70" cy="110" rx="32" ry="10" fill="#6d1c07" opacity="0.6" />
    <ellipse cx="115" cy="60" rx="12" ry="6" fill="#8d250c" opacity="0.5" />
    {/* Polar Ice Cap (Carbon Dioxide and Water Ice) */}
    <ellipse cx="80" cy="18" rx="22" ry="6" fill="#ffffff" opacity="0.85" />
  </svg>
);

// 3D-styled expressive astronaut portraits matching the 5 crew members in the user's mockup
export const AstronautAvatar = ({ crewId, className = "w-full h-full" }) => {
  switch (crewId) {
    case 'commander':
    default:
      // Female Mission Commander: Ponytail, warm skin, brown hair, confident smile, orange collar
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgCommander" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff8a50" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
            <linearGradient id="suitCommander" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bgCommander)" />
          {/* Hair back (ponytail) */}
          <ellipse cx="68" cy="46" rx="14" ry="20" fill="#2d170c" />
          {/* Suit & Collar */}
          <path d="M20 98 C20 72 34 68 50 68 C66 68 80 72 80 98 Z" fill="url(#suitCommander)" />
          <path d="M35 72 C35 68 40 66 50 66 C60 66 65 68 65 72 Z" fill="#ff5722" />
          <rect x="44" y="78" width="12" height="4" rx="2" fill="#0284c7" />
          {/* Neck */}
          <rect x="42" y="55" width="16" height="14" rx="4" fill="#f0ab8d" />
          {/* Face */}
          <ellipse cx="50" cy="45" rx="18" ry="20" fill="#fbcfe8" opacity="0.3" />
          <ellipse cx="50" cy="44" rx="16" ry="18" fill="#f7b799" />
          {/* Hair front */}
          <path d="M32 40 C32 24 68 22 68 40 C62 30 52 32 46 32 C38 32 34 36 32 40 Z" fill="#3d1d10" />
          {/* Eyes */}
          <ellipse cx="44" cy="44" rx="2.5" ry="3.5" fill="#2d170c" />
          <ellipse cx="56" cy="44" rx="2.5" ry="3.5" fill="#2d170c" />
          <circle cx="43.2" cy="42.8" r="1" fill="#ffffff" />
          <circle cx="55.2" cy="42.8" r="1" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M41 38 Q44 36 47 38" stroke="#2d170c" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M53 38 Q56 36 59 38" stroke="#2d170c" strokeWidth="1.2" strokeLinecap="round" />
          {/* Nose & Smile */}
          <path d="M50 45 L50 49 L52 49" stroke="#d97757" strokeWidth="1" strokeLinecap="round" />
          <path d="M45 53 Q50 58 55 53" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'scientist':
      // Dr. Nia Patel: Astrobiologist, glasses, friendly dark eyes, wavy hair, blue suit collar
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgScientist" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bgScientist)" />
          {/* Hair back */}
          <circle cx="50" cy="40" r="24" fill="#1c1917" />
          {/* Suit */}
          <path d="M20 98 C20 72 34 68 50 68 C66 68 80 72 80 98 Z" fill="#e2e8f0" />
          <path d="M35 72 C35 68 40 66 50 66 C60 66 65 68 65 72 Z" fill="#0284c7" />
          {/* Neck */}
          <rect x="42" y="55" width="16" height="14" rx="4" fill="#d97745" />
          {/* Face */}
          <ellipse cx="50" cy="44" rx="16" ry="18" fill="#e08a5c" />
          {/* Hair front */}
          <path d="M30 42 C30 22 70 22 70 42 C64 28 54 30 50 30 C42 30 36 34 30 42 Z" fill="#1c1917" />
          {/* Glasses frame */}
          <rect x="38" y="39" width="10" height="9" rx="3" fill="none" stroke="#38bdf8" strokeWidth="1.6" />
          <rect x="52" y="39" width="10" height="9" rx="3" fill="none" stroke="#38bdf8" strokeWidth="1.6" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#38bdf8" strokeWidth="1.6" />
          {/* Eyes */}
          <ellipse cx="43" cy="43.5" rx="2" ry="2.8" fill="#1c1917" />
          <ellipse cx="57" cy="43.5" rx="2" ry="2.8" fill="#1c1917" />
          <circle cx="42.5" cy="42.5" r="0.8" fill="#ffffff" />
          <circle cx="56.5" cy="42.5" r="0.8" fill="#ffffff" />
          {/* Smile */}
          <path d="M46 53 Q50 57 54 53" stroke="#991b1b" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'engineer':
      // Alex Chen: Chief Engineer, glasses, neat dark hair, green suit collar
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgEngineer" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bgEngineer)" />
          {/* Suit */}
          <path d="M20 98 C20 72 34 68 50 68 C66 68 80 72 80 98 Z" fill="#e2e8f0" />
          <path d="M35 72 C35 68 40 66 50 66 C60 66 65 68 65 72 Z" fill="#059669" />
          {/* Neck */}
          <rect x="42" y="55" width="16" height="14" rx="4" fill="#f8cfad" />
          {/* Face */}
          <ellipse cx="50" cy="44" rx="16" ry="18" fill="#fad8be" />
          {/* Hair (side-part neat) */}
          <path d="M32 38 C32 20 68 20 68 36 C60 26 48 24 38 30 Z" fill="#18181b" />
          {/* Round glasses */}
          <circle cx="43" cy="43" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="57" cy="43" r="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#10b981" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="43" cy="43" r="2" fill="#18181b" />
          <circle cx="57" cy="43" r="2" fill="#18181b" />
          {/* Smile */}
          <path d="M46 54 Q50 58 54 54" stroke="#9a3412" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'pilot':
      // Zunaira: Confident female expedition pilot, purple suit collar
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgPilot" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bgPilot)" />
          {/* Hair back */}
          <circle cx="50" cy="42" r="22" fill="#2d170c" />
          {/* Suit */}
          <path d="M20 98 C20 72 34 68 50 68 C66 68 80 72 80 98 Z" fill="#e2e8f0" />
          <path d="M35 72 C35 68 40 66 50 66 C60 66 65 68 65 72 Z" fill="#7e22ce" />
          {/* Neck */}
          <rect x="42" y="55" width="16" height="14" rx="4" fill="#f4b595" />
          {/* Face */}
          <ellipse cx="50" cy="44" rx="16" ry="18" fill="#fbc7ab" />
          {/* Sleek pilot hair */}
          <path d="M30 38 C30 20 70 20 70 38 C64 28 52 26 42 28 C34 30 32 34 30 38 Z" fill="#3d1d10" />
          {/* Eyes */}
          <ellipse cx="44" cy="44" rx="2.5" ry="3" fill="#1c1917" />
          <ellipse cx="56" cy="44" rx="2.5" ry="3" fill="#1c1917" />
          <circle cx="43.2" cy="42.8" r="0.9" fill="#ffffff" />
          <circle cx="55.2" cy="42.8" r="0.9" fill="#ffffff" />
          {/* Confident Smile */}
          <path d="M45 53 Q50 57 55 53" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'medical':
      // Dr. Elena Ramos: Chief Medical Officer, friendly smile, dark curls, rose suit collar
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bgMedical" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" rx="16" fill="url(#bgMedical)" />
          {/* Hair back */}
          <circle cx="50" cy="42" r="23" fill="#1e1b18" />
          {/* Suit */}
          <path d="M20 98 C20 72 34 68 50 68 C66 68 80 72 80 98 Z" fill="#e2e8f0" />
          <path d="M35 72 C35 68 40 66 50 66 C60 66 65 68 65 72 Z" fill="#e11d48" />
          {/* Neck */}
          <rect x="42" y="55" width="16" height="14" rx="4" fill="#e59871" />
          {/* Face */}
          <ellipse cx="50" cy="44" rx="16" ry="18" fill="#f0a884" />
          {/* Hair front */}
          <path d="M30 40 C30 20 70 20 70 40 C62 30 54 32 46 32 C38 32 34 36 30 40 Z" fill="#1e1b18" />
          {/* Eyes */}
          <ellipse cx="44" cy="44" rx="2.5" ry="3.5" fill="#1e1b18" />
          <ellipse cx="56" cy="44" rx="2.5" ry="3.5" fill="#1e1b18" />
          {/* Smile */}
          <path d="M45 53 Q50 58 55 53" stroke="#9f1239" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
};

// 4 Realistic 3D Habitat Station Card Thumbnails
export const MissionThumbnail = ({ missionId, className = "w-full h-full object-cover" }) => {
  switch (missionId) {
    case 1:
    default:
      // M-01: Lander Touchdown & Inflatable Geodesic Dome
      return (
        <svg viewBox="0 0 200 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="50%" stopColor="#831843" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <radialGradient id="domeGlow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          <rect width="200" height="130" fill="url(#sky1)" />
          {/* Distant Hills */}
          <path d="M0 80 Q60 55 120 75 T200 70 L200 130 L0 130 Z" fill="#7c2d12" />
          <path d="M0 90 Q80 80 160 95 L200 90 L200 130 L0 130 Z" fill="#9a3412" />
          {/* Outpost Dome */}
          <ellipse cx="100" cy="98" rx="42" ry="32" fill="url(#domeGlow)" stroke="#334155" strokeWidth="2" />
          <ellipse cx="100" cy="85" rx="14" ry="7" fill="#00e5ff" opacity="0.9" />
          <circle cx="100" cy="66" r="3" fill="#ff4d28" />
          {/* Lander Legs */}
          <line x1="68" y1="98" x2="52" y2="114" stroke="#e2e8f0" strokeWidth="3" />
          <line x1="132" y1="98" x2="148" y2="114" stroke="#e2e8f0" strokeWidth="3" />
          {/* Ground */}
          <rect y="105" width="200" height="25" fill="#431407" />
        </svg>
      );

    case 2:
      // M-02: Solar Power Station in Dust Storm
      return (
        <svg viewBox="0 0 200 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e1008" />
              <stop offset="50%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          <rect width="200" height="130" fill="url(#sky2)" />
          {/* Dust Haze Particles */}
          <circle cx="45" cy="40" r="30" fill="#ea580c" opacity="0.2" filter="blur(10px)" />
          <circle cx="160" cy="50" r="40" fill="#ea580c" opacity="0.25" filter="blur(12px)" />
          {/* Ground */}
          <rect y="92" width="200" height="38" fill="#431407" />
          {/* Central Battery Substation */}
          <rect x="85" y="75" width="30" height="25" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <rect x="92" y="80" width="16" height="5" rx="2" fill="#f59e0b" />
          {/* Large Tilting Solar Panels */}
          <rect x="42" y="62" width="40" height="28" rx="2" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(5 42 62)" />
          <rect x="118" y="65" width="40" height="28" rx="2" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-5 118 65)" />
        </svg>
      );

    case 3:
      // M-03: Rover Telemetry Bay & Surface Rover
      return (
        <svg viewBox="0 0 200 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#431407" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
          </defs>
          <rect width="200" height="130" fill="url(#sky3)" />
          {/* Mountains */}
          <path d="M0 75 Q60 55 120 70 T200 65 L200 130 L0 130 Z" fill="#7c2d12" />
          <rect y="92" width="200" height="38" fill="#431407" />
          {/* Hangar Dome */}
          <ellipse cx="70" cy="95" rx="36" ry="24" fill="#64748b" stroke="#334155" strokeWidth="2" />
          <ellipse cx="70" cy="85" rx="10" ry="5" fill="#00d8f6" />
          {/* Satellite Dish on Roof */}
          <path d="M60 65 A12 12 0 0 1 80 65" stroke="#ffffff" strokeWidth="2.5" fill="none" />
          <line x1="70" y1="65" x2="70" y2="58" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Mars Rover */}
          <rect x="130" y="86" width="34" height="12" rx="3" fill="#f8fafc" stroke="#475569" />
          <circle cx="136" cy="100" r="4.5" fill="#1e293b" stroke="#94a3b8" />
          <circle cx="147" cy="100" r="4.5" fill="#1e293b" stroke="#94a3b8" />
          <circle cx="158" cy="100" r="4.5" fill="#1e293b" stroke="#94a3b8" />
          <line x1="154" y1="86" x2="154" y2="76" stroke="#475569" strokeWidth="1.5" />
          <circle cx="154" cy="76" r="2.5" fill="#00e5ff" />
        </svg>
      );

    case 4:
      // M-04: Aegis Regolith Radiation Bunker
      return (
        <svg viewBox="0 0 200 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#311025" />
              <stop offset="50%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
          </defs>
          <rect width="200" height="130" fill="url(#sky4)" />
          {/* Radiation CME Solar Wave in Sky */}
          <path d="M0 30 Q100 15 200 45" stroke="#f43f5e" strokeWidth="3" opacity="0.6" />
          <rect y="88" width="200" height="42" fill="#431407" />
          {/* Subterranean Bunker Mound */}
          <ellipse cx="100" cy="98" rx="48" ry="28" fill="#581c10" stroke="#7c2d12" strokeWidth="2" />
          {/* Titanium Blast Door */}
          <ellipse cx="100" cy="102" rx="20" ry="16" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
          <circle cx="100" cy="102" r="6" fill="#f43f5e" />
          {/* Radiation Sensor Mast */}
          <line x1="100" y1="70" x2="100" y2="52" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="100" cy="50" r="4" fill="#f43f5e" />
        </svg>
      );
  }
};
