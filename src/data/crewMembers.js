// Astronaut Crew Profiles and Domain Perspectives

export const CREW_MEMBERS = {
  commander: {
    id: 'commander',
    name: 'You (Mission Commander)',
    role: 'Expedition Commander',
    callsign: 'Ares-Lead',
    specialty: 'Strategic Leadership & Mission Final Decisions',
    badgeColor: 'border-amber-400 text-amber-400 bg-amber-400/10',
    avatarSvg: 'commander',
    personality: 'Calm under pressure, fair, decisive, and responsible for all human lives and mission science.',
    bio: 'Selected by NASA to command the first permanent Martian research settlement. Every tough call lands on your desk.'
  },

  scientist: {
    id: 'scientist',
    name: 'Maryam',
    role: 'Lead Astrobiologist & Planetary Geologist',
    callsign: 'Discovery-1',
    specialty: 'Mars Soil Samples, Ancient Water Signs, Atmospheric Chemistry',
    badgeColor: 'border-cyan-400 text-cyan-400 bg-cyan-400/10',
    avatarSvg: 'scientist',
    personality: 'Passionate, endlessly curious, and always advocating for bold scientific exploration.',
    catchphrase: "Commander, this could be the discovery of the century! We can't turn back now!",
    bio: 'Renowned planetary researcher and astrobiologist. Her dream is to discover the first fossilized Martian microbes.'
  },

  engineer: {
    id: 'engineer',
    name: 'Abdullah',
    role: 'Chief Base Engineer & Systems Architect',
    callsign: 'Wrench-1',
    specialty: 'Solar Power Grids, Batteries, Life Support Scrubbers, Rover Hardware',
    badgeColor: 'border-emerald-400 text-emerald-400 bg-emerald-400/10',
    avatarSvg: 'engineer',
    personality: 'Methodical, cautious, protective of hardware, hates pushing engines past their safety limits.',
    catchphrase: "Numbers don't lie, Commander. If the battery bank dies, everything dies.",
    bio: 'Robotics expert and systems architect who designed the habitat power grid. Keeps backup tools in every pocket.'
  },

  pilot: {
    id: 'pilot',
    name: 'Zunaira',
    role: 'Expedition Pilot & EVA Specialist',
    callsign: 'Vector-1',
    specialty: 'Descent Guidance, Rover Driving, Field Navigation, Surface Repairs',
    badgeColor: 'border-indigo-400 text-indigo-400 bg-indigo-400/10',
    avatarSvg: 'pilot',
    personality: 'Bold, direct, hands-on, loves driving rovers over rocky Martian craters.',
    catchphrase: "Give me the wheel, Commander! I can steer us through any boulder field.",
    bio: 'Veteran aerospace test pilot who logged hundreds of hours in flight simulators and desert lunar rover analogs.'
  },

  medical: {
    id: 'medical',
    name: 'Lawaiza',
    role: 'Chief Medical & Environmental Systems Officer',
    callsign: 'Life-1',
    specialty: 'Crew Health, Radiation Dosimetry, Oxygen Scrubbers (ECLSS), Morale',
    badgeColor: 'border-rose-400 text-rose-400 bg-rose-400/10',
    avatarSvg: 'medical',
    personality: 'Empathetic, vigilant, fiercely protective of the team’s physical health and stamina.',
    catchphrase: "Equipment can be rebuilt, Commander. Human lives cannot.",
    bio: 'Flight surgeon and space habitat biologist. Monitors crew heart rates, sleep cycles, and radiation exposure 24/7.'
  }
};
