// NASA Open Datasets & Curated Scientific Telemetry with Strict Attribution Labels

export const NASA_DATASETS = {
  meda: {
    id: 'meda-perseverance',
    name: 'Mars Environmental Dynamics Analyzer (MEDA)',
    mission: 'NASA Mars 2020 (Perseverance Rover)',
    category: 'Archived Planetary Science',
    attributionType: 'ARCHIVED_MISSION_DATA',
    badgeText: 'NASA MEDA Archived Data',
    solReference: 'Sol 240 – Jezero Crater',
    description: 'Actual meteorological telemetry recorded on the Martian surface by the MEDA sensor suite aboard Perseverance.',
    measurements: {
      temperature: '-78°C (-108°F)',
      tempRange: 'Max: -14°C, Min: -83°C',
      pressure: '745 Pa (0.108 psi - ~0.7% of Earth sea level)',
      dustOpticalDepth: '0.45 tau (Nominal clarity)',
      windSpeed: '4.8 m/s (10.7 mph) from SE',
      uvRadiation: 'High (No ozone layer shielding)',
    },
    educationalContext: 'Mars has an atmosphere 100 times thinner than Earth, meaning it cannot trap heat. Temperatures plunge drastically as soon as the Sun sets.',
    sourceUrl: 'https://mars.nasa.gov/mars2020/mission/instruments/meda/',
    citation: 'NASA/JPL-Caltech/CAB(CSIC-INTA) Mars 2020 MEDA Data'
  },

  donki: {
    id: 'donki-space-weather',
    name: 'Space Weather Database Of Notifications, Knowledge, Information (DONKI)',
    mission: 'NASA Moon to Mars Space Weather Analysis Office (M2M) & CCMC',
    category: 'Curated Earth-Sun Space Weather Records',
    attributionType: 'CURATED_EVENT_DATA',
    badgeText: 'NASA DONKI Solar Record',
    eventReference: 'Event 2024-05-10T06:54:00-CME-001',
    description: 'Curated historical record of a Coronal Mass Ejection (CME) and associated X-Class Solar Flare observed propagating through the heliosphere toward planetary bodies.',
    measurements: {
      flareClassification: 'X5.8 Solar Flare',
      cmeSpeed: '1,420 km/s (3.17 million mph)',
      sourceActiveRegion: 'AR 3664',
      radiationWarning: 'High Solar Energetic Particle (SEP) flux',
    },
    educationalContext: 'DONKI monitors solar activity from Earth orbit and interplanetary probes. Coronal Mass Ejections blast billions of tons of magnetized plasma across space. When heading toward Mars, astronauts require shelter because Mars lacks Earth’s strong magnetic field.',
    clarificationNote: 'Note: DONKI measures space-weather events originating at the Sun and propagating through the Solar System. It is not a direct Mars surface sensor.',
    sourceUrl: 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
    citation: 'NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI)'
  },

  hirise: {
    id: 'hirise-jezero',
    name: 'High Resolution Imaging Science Experiment (HiRISE)',
    mission: 'NASA Mars Reconnaissance Orbiter (MRO)',
    category: 'Planetary Cartography & Orbital Imaging',
    attributionType: 'CURATED_GEOGRAPHIC_DATA',
    badgeText: 'NASA HiRISE Orbital Map',
    targetLocation: 'Jezero Crater (18.38°N, 77.58°E)',
    description: 'Topographic elevation mapping and mineral spectroscopy of an ancient river delta that filled a 45-km wide crater lake roughly 3.7 billion years ago.',
    measurements: {
      elevation: '-2,500 m relative to Martian datum',
      deltaDepositDepth: 'Over 60 meters of clay and carbonate sediments',
      terrainHazardRating: 'Moderate boulder field density (4.2%)',
    },
    educationalContext: 'HiRISE cameras take pictures so detailed they can spot a desk on Mars! NASA scientists used these images to find a safe, flat landing zone for Perseverance right next to ancient riverbeds where microbial life might have lived.',
    sourceUrl: 'https://www.uahirise.org/jezero/',
    citation: 'NASA/JPL-Caltech/University of Arizona HiRISE Camera'
  },

  curiosityRad: {
    id: 'curiosity-rad',
    name: 'Radiation Assessment Detector (RAD)',
    mission: 'NASA Mars Science Laboratory (Curiosity Rover)',
    category: 'Archived Surface Radiation Telemetry',
    attributionType: 'ARCHIVED_MISSION_DATA',
    badgeText: 'NASA Curiosity RAD Telemetry',
    measurements: {
      surfaceDoseRate: '0.21 mSv/day (GCR background)',
      stormPeakDoseRate: 'Up to 2.5 mSv/day during peak solar particle events',
      earthEquivalent: 'About 300 times higher than natural background on Earth',
    },
    educationalContext: 'Earth is protected by a thick atmosphere and a giant magnetic shield (magnetosphere). Mars has lost its global magnetosphere, so astronauts on Mars receive radiation from Galactic Cosmic Rays (GCR) and solar storms. Piling 1 to 2 meters of Martian regolith (dirt) over the habitat blocks over 90% of this radiation!',
    sourceUrl: 'https://mars.nasa.gov/msl/spacecraft/instruments/rad/',
    citation: 'NASA/JPL-Caltech/SwRI Mars Science Laboratory RAD Science Team'
  },

  osdr: {
    id: 'osdr-space-biology',
    name: 'NASA Open Science Data Repository (OSDR)',
    mission: 'Biological & Physical Sciences Division',
    category: 'Biological Ground & Spaceflight Reference',
    attributionType: 'RESEARCH_DATABASE',
    badgeText: 'NASA OSDR Research',
    description: 'Studies on cellular DNA repair, muscle retention, and bone density preservation during deep space analog simulations and ISS missions.',
    keyInsights: 'Shows that maintaining daily resistance exercise, shielding sleeping quarters, and balanced nutrition prevents astronaut fatigue and maintains immune resilience.',
    sourceUrl: 'https://osdr.nasa.gov/bio/',
    citation: 'NASA Open Science Data Repository (OSDR)'
  }
};
