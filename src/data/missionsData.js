// Modular Mission Definitions, Multi-Phase Decision Trees, and Science Debriefs

export const MISSIONS = [
  {
    id: 1,
    code: 'M-01',
    title: 'Arrival on Mars: Touchdown & Base Setup',
    subtitle: 'Sol 01 to Sol 05 — Jezero Basin Expedition',
    briefing: 'The Ares-V lander has entered Martian orbit. As Mission Commander, your first major duties are selecting the optimal landing coordinate in Jezero Crater, executing atmospheric entry burns, and deploying your core research outpost before nightfall.',
    startingResources: {
      power: 80,
      oxygen: 90,
      health: 95,
      sciencePoints: 10,
    },
    phases: [
      {
        id: '1-1',
        phaseNumber: 1,
        title: 'Phase 1: Landing Site Selection',
        hazardLevel: 'caution',
        situation: 'The Ares-V lander is in descent orbit. Orbital telemetry from HiRISE presents two certified landing target ellipses. You must choose where humanity sets foot.',
        nasaTelemetryTag: {
          source: 'NASA HiRISE Camera (MRO)',
          tag: 'Jezero Crater Delta Topography',
          details: 'Elevation: -2,500m | Ancient Delta Clay Deposits detected'
        },
        crewDialogues: [
          {
            crewId: 'scientist',
            quote: 'Commander, target the River Delta fan! Those clay deposits were formed in ancient river water. We could find fossilized Martian micro-life right on Sol 1!',
            mood: 'enthusiastic'
          },
          {
            crewId: 'engineer',
            quote: 'Hold on, Maryam. The delta fan is littered with jagged boulders. Isidis Planitia flat plains are 100% safer for our landing legs and solar panels.',
            mood: 'cautious'
          },
          {
            crewId: 'pilot',
            quote: 'The Delta is tight, but I have simulated the terrain avoidance thrusters 400 times. With steady hands on the controls, I can slip us right into the science zone.',
            mood: 'confident'
          },
          {
            crewId: 'medical',
            quote: 'A hard landing could cause concussions or damage our primary oxygen recyclers. Ensure our descent g-forces stay within safe human limits, Commander.',
            mood: 'protective'
          }
        ],
        decisionOptions: [
          {
            id: '1-1-A',
            title: 'Option A: Jezero River Delta (Near Ancient Sediments)',
            description: 'Steer for the fossil river delta. Higher terrain challenge with boulders, but immediate proximity to ancient lakebed science.',
            impactPreview: '⚡ -15% Power | ❤️ -10% Crew Strain | 🔬 +25 Science Data',
            deltas: { power: -15, oxygen: 0, health: -10, sciencePoints: 25 },
            setFlags: ['LANDED_JEZERO_DELTA'],
            consequenceText: 'Touchdown confirmed on the edge of Jezero Delta! The thrusters fired hard to avoid a 3-meter boulder. The crew felt a heavy jolt, but Maryam is already cheering at the riverbed clay right outside the viewport!',
            scienceDebrief: {
              title: 'Why did NASA choose Jezero Crater for the Perseverance Rover?',
              whatHappened: 'You chose the river delta, taking a rougher landing for massive scientific reward.',
              realMarsScience: 'Billions of years ago, Mars was warmer and had liquid water. Jezero Crater was once filled with a deep lake fed by an active river. As the river flowed into the lake, it slowed down and dropped rich mud sediments (a delta). On Earth, river deltas are prime spots for preserving ancient fossils!',
              nasaConnection: 'NASA landed the Perseverance rover in Jezero Crater on February 18, 2021 for this exact reason. Perseverance drills rock cores from these ancient delta layers to search for biosignatures (clues of past microscopic life).',
              datasetKey: 'hirise'
            }
          },
          {
            id: '1-1-B',
            title: 'Option B: Isidis Smooth Flat Plains (Safe Distance)',
            description: 'Touch down on the ultra-flat safety zone 12 kilometers out. Eliminates boulder hazards at the cost of having to drive further for science.',
            impactPreview: '⚡ -5% Power | ❤️ +5% Crew Morale | 🔬 +10 Science Data',
            deltas: { power: -5, oxygen: 0, health: 5, sciencePoints: 10 },
            setFlags: ['LANDED_SMOOTH_PLAINS'],
            consequenceText: 'Gentle touchdown on the flat basalt plain! Zero equipment damage, landing legs perfectly seated, and the crew enjoyed a buttery-smooth descent. We will need to drive further to reach delta clay, but our habitat base is 100% secure.',
            scienceDebrief: {
              title: 'Why do space missions prioritize flat landing zones?',
              whatHappened: 'You chose the safe, flat plains. The crew arrived without injury or equipment stress.',
              realMarsScience: 'Landing on Mars is notoriously difficult—engineers call it the "Seven Minutes of Terror." Spacecraft must drop from 12,000 mph (20,000 km/h) to zero in thin air. A single boulder higher than 40 cm could tip over a lander or puncture fuel tanks.',
              nasaConnection: 'For earlier missions like Viking 1 and InSight, NASA chose extremely flat plains like Elysium Planitia to ensure a safe landing without having to dodge obstacles.',
              datasetKey: 'hirise'
            }
          }
        ]
      },
      {
        id: '1-2',
        phaseNumber: 2,
        title: 'Phase 2: Atmospheric Descent Brake Timing',
        hazardLevel: 'caution',
        situation: 'Passing 8,000 meters altitude at supersonic speed. Martian atmosphere is 1% the density of Earth. You must decide the parachute trigger and retro-thruster profile.',
        nasaTelemetryTag: {
          source: 'NASA MEDA Atmospheric Sensor (Perseverance)',
          tag: 'Atmospheric Density Telemetry',
          details: 'Surface Pressure: 745 Pa (~0.7% Earth sea-level)'
        },
        crewDialogues: [
          {
            crewId: 'pilot',
            quote: 'Martian air is too thin to slow us down by parachutes alone. We need to cut the chute at 1,500m and burn retro-thrusters hard for pinpoint accuracy!',
            mood: 'confident'
          },
          {
            crewId: 'engineer',
            quote: 'A long retro-rocket burn will burn 30% of our reserve propellant and drain the lander battery. Cut throttle early and let the shock-absorbing landing struts do their job.',
            mood: 'cautious'
          },
          {
            crewId: 'medical',
            quote: 'High-g deceleration pushes blood from the brain. If we brake too aggressively, the crew could experience tunnel vision.',
            mood: 'warning'
          }
        ],
        decisionOptions: [
          {
            id: '1-2-A',
            title: 'Option A: Active Powered Sky-Crane Descent',
            description: 'Fire retro-rockets all the way to 5 meters altitude, hovering softly onto the surface.',
            impactPreview: '⚡ -20% Power | ❤️ +10% Comfort | 🔬 +10 Precision Navigation',
            deltas: { power: -20, oxygen: 0, health: 10, sciencePoints: 10 },
            setFlags: ['SKYCRANE_DEPLOYED'],
            consequenceText: 'Sky-crane hover was flawless! Touchdown was so soft the coffee cups in the cabin did not even rattle. Battery reserves took a hit from the extended engine burn, but the base hardware is pristine.',
            scienceDebrief: {
              title: 'How does NASA land heavy rovers on Mars?',
              whatHappened: 'You used rocket-powered hovering descent for a soft landing.',
              realMarsScience: 'Because Mars has an atmosphere too thin for heavy parachutes alone, but too thick to ignore, NASA invented the "Sky Crane" system for Curiosity and Perseverance. A rocket-powered backpack slows the rover, then gently lowers it on nylon cables before flying away!',
              nasaConnection: 'Both Curiosity (2012) and Perseverance (2021) landed using the Sky Crane system without a single scratch on their scientific instruments.',
              datasetKey: 'meda'
            }
          },
          {
            id: '1-2-B',
            title: 'Option B: Aerobrake & Shock Strut Touchdown',
            description: 'Cut retro-rockets at 15 meters, letting the hydraulic heavy-duty struts absorb the final drop to save battery power.',
            impactPreview: '⚡ +10% Power Saved | ❤️ -15% Crew Shakeup | 🔬 0 Science',
            deltas: { power: 10, oxygen: 0, health: -15, sciencePoints: 0 },
            setFlags: ['HARD_STRUT_LANDING'],
            consequenceText: 'BAM! The lander hit the surface with a teeth-rattling thud. The hydraulic struts hissed and absorbed the shock. Power supplies are preserved at high levels, but Lawaiza is handing out ice packs for bruised shoulders.',
            scienceDebrief: {
              title: 'Why is braking so hard in thin Martian air?',
              whatHappened: 'You conserved battery fuel by allowing a harder mechanical touchdown.',
              realMarsScience: 'On Earth, a parachute can easily slow skydivers or capsules to a gentle stop. On Mars, the atmosphere has less than 1% the pressure of Earth. That means parachutes cannot slow heavy payloads enough to avoid crashing—rockets or giant airbags are required!',
              nasaConnection: 'NASA used giant clusters of bouncing airbags for the Mars Pathfinder and Spirit & Opportunity rovers, bouncing up to 15 times before rolling to a stop.',
              datasetKey: 'meda'
            }
          }
        ]
      },
      {
        id: '1-3',
        phaseNumber: 3,
        title: 'Phase 3: Outpost Initialization & Nightfall Prep',
        hazardLevel: 'critical',
        situation: 'The lander is safely down! Martian sunset is approaching in 2 hours. Nighttime temperatures will plummet to -80°C (-112°F). What is your crew’s first operational priority?',
        nasaTelemetryTag: {
          source: 'NASA MEDA Environmental Station',
          tag: 'Diurnal Temperature Range',
          details: 'Day: -15°C | Night Projection: -82°C'
        },
        crewDialogues: [
          {
            crewId: 'engineer',
            quote: 'Commander, unfold the solar arrays immediately! If the solar batteries freeze overnight without a full charge, the lithium cells could rupture.',
            mood: 'cautious'
          },
          {
            crewId: 'medical',
            quote: 'I disagree! Pressurize the inflatable habitat dome and seal the life-support air scrubbers first. If the crew spends the night in cramped spacesuits, hypothermia risk spikes.',
            mood: 'protective'
          },
          {
            crewId: 'scientist',
            quote: 'While you deploy modules, let me activate the exterior soil spectrometer to capture pristine, un-contaminated ground baseline readings!',
            mood: 'enthusiastic'
          }
        ],
        decisionOptions: [
          {
            id: '1-3-A',
            title: 'Option A: Deploy Main Solar Arrays & Grid First',
            description: 'Prioritize electrical energy and battery warming systems before the sun drops behind the crater rim.',
            impactPreview: '⚡ +25% Power Grid | 🫧 +0% O2 | ❤️ -5% Fatigue | 🔬 +5 Science',
            deltas: { power: 25, oxygen: 0, health: -5, sciencePoints: 5 },
            setFlags: ['SOLAR_DEPLOYED_EARLY'],
            consequenceText: 'The twin 10-meter solar wings whirred open just as golden sunlight bathed the red desert. The battery banks surged to full charge, ensuring heating systems will run hot through the bitter Martian night.',
            scienceDebrief: {
              title: 'Why do Mars batteries need constant warmth?',
              whatHappened: 'You prioritized charging and warming the electrical power grid before nightfall.',
              realMarsScience: 'Martian nights reach -80°C (-112°F). Chemical reactions inside batteries slow down drastically when freezing, and liquid electrolytes can crystalize, permanently ruining the battery.',
              nasaConnection: 'NASA rovers like Spirit, Opportunity, and Perseverance use electrical survival heaters and radioisotope heater units (RHUs) containing small pellets of decaying plutonium to keep internal computers and batteries warm every night.',
              datasetKey: 'meda'
            }
          },
          {
            id: '1-3-B',
            title: 'Option B: Pressurize Habitat & Life-Support Scrubbers First',
            description: 'Focus all crew efforts on inflating the habitat module and testing oxygen circulation so the team can sleep safely.',
            impactPreview: '⚡ -10% Power | 🫧 +20% O2 System | ❤️ +20% Rest & Warmth',
            deltas: { power: -10, oxygen: 20, health: 20, sciencePoints: 0 },
            setFlags: ['HABITAT_WARMED_FIRST'],
            consequenceText: 'The habitat inflated with a satisfying hiss! Lawaiza calibrated the CO2 scrubbers and verified nominal 78% Nitrogen, 21% Oxygen mix. The astronauts took off their helmets and took their first breath inside their new Mars home.',
            scienceDebrief: {
              title: 'How do astronauts breathe inside a Mars habitat?',
              whatHappened: 'You ensured the habitat life-support system (ECLSS) was pressurized and scrubbed.',
              realMarsScience: 'The Martian atmosphere is 95% carbon dioxide (CO2) and is poisonous to humans. Life-support systems (ECLSS) must pump in nitrogen and oxygen at human-safe pressures while continuously filtering out exhaled carbon dioxide using chemical scrubbers.',
              nasaConnection: 'NASA tested a machine called MOXIE on the Perseverance rover that successfully extracted breathable oxygen directly out of the thin Martian carbon dioxide atmosphere—a huge milestone for future human explorers!',
              datasetKey: 'osdr'
            }
          }
        ]
      }
    ]
  },

  {
    id: 2,
    code: 'M-02',
    title: 'The Power Crisis: Regional Dust Storm',
    subtitle: 'Sol 14 to Sol 18 — Atmospheric Obscuration Event',
    briefing: 'Orbiting weather satellites detect a massive regional dust storm swirling from Hellas Basin toward Jezero Crater. Fine reddish dust is blanketing the sky, cutting solar illumination by 70%. Your habitat power grid is facing a severe brownout.',
    startingResources: {
      power: 65,
      oxygen: 85,
      health: 80,
      sciencePoints: 35,
    },
    phases: [
      {
        id: '2-1',
        phaseNumber: 1,
        title: 'Phase 1: Dust Storm Onset & Solar Defense',
        hazardLevel: 'critical',
        situation: 'The sky is turning from butterscotch to deep twilight as towering dust clouds blot out the Sun. Optical depth (tau) has spiked to 3.2. Solar power generation has plummeted.',
        nasaTelemetryTag: {
          source: 'NASA MEDA Atmospheric Optical Sensor',
          tag: 'Dust Optical Depth (tau)',
          details: 'Dust Opacity: 3.2 tau (Severely obscured sunlight)'
        },
        crewDialogues: [
          {
            crewId: 'engineer',
            quote: 'Commander, shut down all non-essential equipment! Angle our panels vertically so dust slides off instead of piling up.',
            mood: 'cautious'
          },
          {
            crewId: 'scientist',
            quote: 'Wait! The friction in Martian dust storms generates intense electrostatic sparks. If we keep our atmospheric sensors running, we will capture unique scientific data never before recorded!',
            mood: 'enthusiastic'
          },
          {
            crewId: 'medical',
            quote: 'Do not cut habitat heater power below 18°C. Cold stress weakens astronaut immune systems and causes respiratory vulnerabilities.',
            mood: 'protective'
          }
        ],
        decisionOptions: [
          {
            id: '2-1-A',
            title: 'Option A: Power Conservation & Vertical Panel Tilt',
            description: 'Tilt panels vertically to prevent dust accumulation. Put science lab into standby sleep mode.',
            impactPreview: '⚡ +10% Stored Energy | 🫧 -5% Air Flow | 🔬 0 Science',
            deltas: { power: 10, oxygen: -5, health: 5, sciencePoints: 0 },
            setFlags: ['VERTICAL_PANEL_STOW'],
            consequenceText: 'Panels tilted vertically. Fine dust particles blew past the glass without settling. Energy generation is low due to the dark skies, but our battery reserves remain healthy.',
            scienceDebrief: {
              title: 'Why do dust storms endanger solar-powered spacecraft?',
              whatHappened: 'You protected panels from dust buildup by tilting them out of the wind.',
              realMarsScience: 'Martian dust particles are microscopic—as fine as cigarette smoke—and electrostatically charged. When they stick to solar panel glass, they block sunlight from reaching the photovoltaic cells.',
              nasaConnection: 'In June 2018, a planet-encircling dust storm blocked sunlight for months, ending the historic 14-year mission of NASA’s Opportunity rover when its batteries finally drained.',
              datasetKey: 'meda'
            }
          },
          {
            id: '2-1-B',
            title: 'Option B: Active Electrostatic Science Observation',
            description: 'Keep the sensor towers and spectrometers running full blast to analyze dust electric charge.',
            impactPreview: '⚡ -25% Power | ❤️ -10% Strain | 🔬 +35 Breakthrough Science',
            deltas: { power: -25, oxygen: 0, health: -10, sciencePoints: 35 },
            setFlags: ['ELECTROSTATIC_STUDY_ACTIVE'],
            consequenceText: 'Sensors detected crackling electrostatic discharges in the dust cloud! Maryam beamed back 4 Gigabytes of groundbreaking planetary data to Earth Control, though our battery gauge is now flashing amber.',
            scienceDebrief: {
              title: 'Does Martian dust have static electricity?',
              whatHappened: 'You risked valuable power to measure electrical activity in the dust storm.',
              realMarsScience: 'Yes! Because Mars is extremely dry, grains of sand rubbing together in high winds build up substantial static electricity—similar to rubbing a balloon on your hair. This electricity can produce small lightning-like glows called triboelectric charging.',
              nasaConnection: 'NASA scientists study Martian static electricity because it could affect electronic equipment, rover wheels, and astronaut spacesuits during future manned missions.',
              datasetKey: 'meda'
            }
          }
        ]
      },
      {
        id: '2-2',
        phaseNumber: 2,
        title: 'Phase 2: The Brownout Allocation Protocol',
        hazardLevel: 'critical',
        situation: 'The storm is at peak intensity and will last at least another 48 hours. Available battery power is dwindling. As Commander, you must choose which habitat subsystem to throttle down.',
        nasaTelemetryTag: {
          source: 'NASA Curiosity RAD / MEDA',
          tag: 'Habitat Interior Telemetry',
          details: 'Internal Temp: 16°C | Air Scrubber Load: 88%'
        },
        crewDialogues: [
          {
            crewId: 'medical',
            quote: 'Keep the oxygen scrubbers at full capacity! Fine dust particles are getting trapped in the exterior filters. If scrubbers slow down, CO2 will build up.',
            mood: 'warning'
          },
          {
            crewId: 'engineer',
            quote: 'If we throttle the water recyclers and lower habitat temperature to 10°C (50°F), we can stretch our battery power for 3 full Sols.',
            mood: 'cautious'
          },
          {
            crewId: 'pilot',
            quote: 'I can connect the rover’s auxiliary battery pack into the habitat power bus to give us a 15-kilowatt boost!',
            mood: 'confident'
          }
        ],
        decisionOptions: [
          {
            id: '2-2-A',
            title: 'Option A: Tap Rover Auxiliary Battery Pack',
            description: 'Link the expedition rover into the base power grid as an emergency generator.',
            impactPreview: '⚡ +25% Power | 🫧 +0% | 🔬 -10% Rover mobility delayed',
            deltas: { power: 25, oxygen: 0, health: 5, sciencePoints: -10 },
            setFlags: ['ROVER_BATTERY_LINKED'],
            consequenceText: 'Zunaira and Abdullah ran high-voltage umbilical cables from the rover garage into the main bus. The habitat lights flickered and stabilized at 100% brightness. Base systems are secure!',
            scienceDebrief: {
              title: 'Can space vehicles share electrical power?',
              whatHappened: 'You used the rover as an emergency battery bank for the habitat.',
              realMarsScience: 'In space exploration, modular redundancy is life. Designing rovers, landers, and habitat domes with compatible power plugs and voltages allows astronauts to transfer energy during life-threatening crises.',
              nasaConnection: 'During Apollo 13 in 1970, astronauts survived when they transferred electrical power and oxygen between the Lunar Module and the crippled Command Module.',
              datasetKey: 'osdr'
            }
          },
          {
            id: '2-2-B',
            title: 'Option B: Implement Deep Energy Hibernation',
            description: 'Lower habitat thermostat to 12°C, dim lighting, and put astronauts into insulated cold-weather thermal suits.',
            impactPreview: '⚡ +15% Power Saved | ❤️ -15% Shivering & Fatigue | 🔬 0 Science',
            deltas: { power: 15, oxygen: 0, health: -15, sciencePoints: 0 },
            setFlags: ['DEEP_HIBERNATION'],
            consequenceText: 'The habitat grew chilly and quiet. The crew bundled into thermal parkas and sipped warm broth. Energy consumption dropped by 50%, safeguarding base batteries through the long storm.',
            scienceDebrief: {
              title: 'How does cold affect human performance in space?',
              whatHappened: 'You traded physical comfort to conserve vital electrical power.',
              realMarsScience: 'When humans get cold, shivering burns extra calories and fine motor skills degrade. Shivering astronauts make more mistakes when typing commands or calibrating delicate life-support equipment.',
              nasaConnection: 'NASA’s Human Research Program (HRP) studies thermal comfort in simulated space habitats like HERA to design spacesuits and habitats that keep explorers at peak mental sharpness.',
              datasetKey: 'osdr'
            }
          }
        ]
      },
      {
        id: '2-3',
        phaseNumber: 3,
        title: 'Phase 3: Clearing the Dust & Restoring the Arrays',
        hazardLevel: 'caution',
        situation: 'The storm winds are finally dying down, revealing a pinkish-orange sky. However, a thick layer of fine rust-red dust blankets the solar panels, reducing output to 25%.',
        nasaTelemetryTag: {
          source: 'NASA InSight Mars Lander Telemetry',
          tag: 'Solar Cell Efficiency Reduction',
          details: 'Dust Layer Thickness: ~0.8 mm | Generation Efficiency: 28%'
        },
        crewDialogues: [
          {
            crewId: 'pilot',
            quote: 'Suit me up! Abdullah and I can go outside on an EVA with electrostatic brushes and wipe every panel clean in two hours.',
            mood: 'confident'
          },
          {
            crewId: 'engineer',
            quote: 'Wait, Zunaira. We have high-pressure compressed CO2 air nozzles built into the panel frames. We can blast the dust off with zero EVA risk.',
            mood: 'cautious'
          },
          {
            crewId: 'medical',
            quote: 'Martian dust is sharp like broken glass. An EVA right after a storm risks bringing dangerous dust into our airlock.',
            mood: 'warning'
          }
        ],
        decisionOptions: [
          {
            id: '2-3-A',
            title: 'Option A: Spacewalk (EVA) Manual Brush Cleaning',
            description: 'Send Zunaira and Abdullah outside in spacesuits to scrub the glass arrays by hand.',
            impactPreview: '⚡ +35% Power Restored | ❤️ -15% EVA Exhaustion & Dust Contamination',
            deltas: { power: 35, oxygen: -5, health: -15, sciencePoints: 10 },
            setFlags: ['EVA_MANUAL_CLEAN'],
            consequenceText: 'Zunaira and Abdullah scrubbed the solar arrays sparkling clean! Solar generation jumped straight to 95%. But their spacesuits tracking red dust into the airlock gave Lawaiza extra filtration work.',
            scienceDebrief: {
              title: 'Why is Mars dust dangerous for astronaut lungs?',
              whatHappened: 'You sent astronauts on a physical spacewalk to clean the solar panels.',
              realMarsScience: 'Martian dust contains toxic perchlorates and fine silicate particles with jagged microscopic edges (unlike Earth sand, which is rounded by water). If breathed in, it irritates lungs and damages spacesuit fabric seals.',
              nasaConnection: 'Apollo astronauts on the Moon experienced "lunar hay fever" from abrasive dust sticking to their suits. NASA is designing special exterior suit-ports where suits stay outside the habitat so dust never enters.',
              datasetKey: 'osdr'
            }
          },
          {
            id: '2-3-B',
            title: 'Option B: Automated Compressed Gas Cleaning Pulse',
            description: 'Fire the panel frame CO2 gas jets to blow dust away automatically without sending astronauts into the hazard.',
            impactPreview: '⚡ +20% Power Restored | 🫧 -10% Gas Reserves | ❤️ +10% Safe Crew',
            deltas: { power: 20, oxygen: -10, health: 10, sciencePoints: 0 },
            setFlags: ['AUTO_GAS_CLEAN'],
            consequenceText: 'Puff! The compressed gas jets blasted plumes of red dust into the sky. Panels are 75% clear without risking a single astronaut outdoors. Power is flowing again!',
            scienceDebrief: {
              title: 'How can robots clean solar panels on Mars?',
              whatHappened: 'You used automated gas jets to clear dust safely.',
              realMarsScience: 'Because mechanical wipers can scratch solar glass, engineers test ultrasonic vibrations, compressed gas puffs, and electrostatic repulsion screens to slide dust off without physical contact.',
              nasaConnection: 'NASA’s InSight lander cleverly used its robotic scoop to trickle coarse sand near the solar panels on windy days—the wind carried the heavy sand grains across the panels, knocking away fine dust and boosting power by 5%!',
              datasetKey: 'meda'
            }
          }
        ]
      }
    ]
  },

  {
    id: 3,
    code: 'M-03',
    title: 'The Lost Rover: Comms Blackout & Data Recovery',
    subtitle: 'Sol 28 to Sol 31 — Crater Rim Exploration',
    briefing: 'The autonomous science rover "Curiosity-Junior" was dispatched 8 km away to drill for subsurface ice. A sudden terrain obstruction has severed radio communications. You must re-establish contact and recover its invaluable geological data.',
    startingResources: {
      power: 70,
      oxygen: 85,
      health: 85,
      sciencePoints: 50,
    },
    phases: [
      {
        id: '3-1',
        phaseNumber: 1,
        title: 'Phase 1: Analyzing the Radio Silence',
        hazardLevel: 'caution',
        situation: 'The telemetry carrier signal flatlined 22 minutes ago. Last ping indicated the rover was navigating a rocky gully near the crater rim.',
        nasaTelemetryTag: {
          source: 'NASA Deep Space Network & MRO Relay',
          tag: 'Ultra-High Frequency (UHF) Telemetry',
          details: 'Signal Strength: -120 dBm (Carrier Drop)'
        },
        crewDialogues: [
          {
            crewId: 'pilot',
            quote: 'The crater wall is blocking line-of-sight! If we boost our habitat radio transmitter to maximum broadcast wattage, we can bounce a signal off the rim.',
            mood: 'confident'
          },
          {
            crewId: 'scientist',
            quote: 'Mars Reconnaissance Orbiter passes overhead in 3 hours. Let’s queue an orbital relay ping instead of burning our local base power.',
            mood: 'enthusiastic'
          },
          {
            crewId: 'engineer',
            quote: 'What if the rover hit a rock and its wheels are spinning in loose sand? An orbital ping won’t help if its batteries run dry while waiting.',
            mood: 'cautious'
          }
        ],
        decisionOptions: [
          {
            id: '3-1-A',
            title: 'Option A: High-Power Direct Radio Transmission Pulse',
            description: 'Overdrive the habitat comms dish with emergency battery power to re-establish an instant link.',
            impactPreview: '⚡ -20% Power | 🔬 +20 Rapid Signal Lock',
            deltas: { power: -20, oxygen: 0, health: 0, sciencePoints: 20 },
            setFlags: ['DIRECT_RADIO_BOOST'],
            consequenceText: 'BEEP! The high-power transmission sliced through the crater shadow. The rover responded with full diagnostic packets—its navigation computer had paused safely after sensing a steep 25° incline.',
            scienceDebrief: {
              title: 'Why is communication with Mars rovers delayed?',
              whatHappened: 'You boosted radio transmission power to overcome terrain blockage.',
              realMarsScience: 'Radio signals travel at the speed of light (300,000 km/s). Because Earth and Mars orbit at different distances from the Sun, radio messages take between 4 and 24 minutes one-way! Rovers must have "autonomous brains" to stop themselves if they sense danger.',
              nasaConnection: 'NASA rovers do not have joy-stick drivers on Earth. Instead, engineers plan a route, upload a list of instructions, and the rover’s computer uses stereo cameras and hazard avoidance algorithms (AutoNav) to navigate on its own.',
              datasetKey: 'hirise'
            }
          },
          {
            id: '3-1-B',
            title: 'Option B: Wait for Mars Reconnaissance Orbiter (MRO) Pass',
            description: 'Conserve base power and wait for the NASA satellite to fly overhead and relay commands.',
            impactPreview: '⚡ 0 Power Conserved | 🔬 -10 Data Delay',
            deltas: { power: 5, oxygen: 0, health: 0, sciencePoints: -10 },
            setFlags: ['MRO_ORBITAL_RELAY'],
            consequenceText: 'Three hours later, the MRO orbiter passed overhead at 300 km altitude, capturing the rover’s beacon and downlinking its coordinates. We saved base energy, though the delay cost valuable research time.',
            scienceDebrief: {
              title: 'How do Mars orbiters help surface rovers?',
              whatHappened: 'You used an orbiting satellite to relay messages between base and rover.',
              realMarsScience: 'Because Mars is a curved sphere with towering volcanoes and crater ridges, surface rovers frequently lose direct line-of-sight to base. Satellites orbiting high above Mars act as celestial Wi-Fi routers.',
              nasaConnection: 'Over 90% of all data from NASA’s Perseverance and Curiosity rovers is sent to Earth through relay orbiters like Mars Reconnaissance Orbiter (MRO), Odyssey, and MAVEN rather than direct-to-Earth dishes.',
              datasetKey: 'hirise'
            }
          }
        ]
      },
      {
        id: '3-2',
        phaseNumber: 2,
        title: 'Phase 2: Rover Extraction Strategy',
        hazardLevel: 'critical',
        situation: 'Rover cameras reveal its left-middle wheel is bogged down in soft, powdery volcanic ash on a 20° slope. If the wheel spins in place, it will dig itself deeper.',
        nasaTelemetryTag: {
          source: 'NASA Mars Exploration Rover Archive',
          tag: 'Wheel Slip Coefficient',
          details: 'Slip Ratio: 85% (Critical sinkage danger)'
        },
        crewDialogues: [
          {
            crewId: 'engineer',
            quote: 'Do NOT floor the throttle! We must reverse the wheel rotation in tiny 5-degree increments and use the robotic arm to push against bedrock for leverage.',
            mood: 'cautious'
          },
          {
            crewId: 'pilot',
            quote: 'Or I can pilot our crew rover out there in 30 minutes, hook up a tow winch, and pull it free with zero wheel risk!',
            mood: 'confident'
          },
          {
            crewId: 'medical',
            quote: 'Driving 8 km across boulder fields in a crew rover risks getting our human astronauts stranded too. Try the robotic remote solution first.',
            mood: 'protective'
          }
        ],
        decisionOptions: [
          {
            id: '3-2-A',
            title: 'Option A: Remote Robotic Arm Leverage Extraction',
            description: 'Command the rover to press its drill arm against firm rock to lift and back out of the sand trap.',
            impactPreview: '⚡ -5% Power | 🔬 +25 Engineering Ingenuity | ❤️ +5 No human risk',
            deltas: { power: -5, oxygen: 0, health: 5, sciencePoints: 25 },
            setFlags: ['ROBOTIC_ARM_EXTRACTION'],
            consequenceText: 'Brilliant engineering! The titanium robotic arm pressed firmly against an exposed basalt slab, taking weight off the stuck wheel. The rover rolled safely backwards onto firm bedrock!',
            scienceDebrief: {
              title: 'How do rovers escape Martian sand traps?',
              whatHappened: 'You used the rover’s robotic arm as a crutch to escape the sand trap.',
              realMarsScience: 'Martian sand in crater dunes can be as fluffy as flour with very little traction. In 2009, NASA’s Spirit rover became permanently stuck in hidden soft soil named "Troy" when its wheels broke through a crust of bright sulfate salts.',
              nasaConnection: 'To prevent rovers from getting stuck, NASA engineers created the "Scarecrow"—a full-scale test rover without computers—and tested it in a giant indoor sandbox on Earth at the Jet Propulsion Laboratory (JPL) to develop escape maneuvers.',
              datasetKey: 'hirise'
            }
          },
          {
            id: '3-2-B',
            title: 'Option B: Manned Crew Rover Rescue Mission',
            description: 'Zunaira and Lawaiza drive out in the pressurized crew rover to physically retrieve the trapped vehicle.',
            impactPreview: '⚡ -20% Vehicle Fuel | ❤️ -15% Fatigue | 🔬 +15 Field Rescue',
            deltas: { power: -20, oxygen: -5, health: -15, sciencePoints: 15 },
            setFlags: ['MANNED_RESCUE_DRIVE'],
            consequenceText: 'Zunaira expertly navigated the rocky terrain and hooked a heavy tow cable to the robotic rover, pulling it free. Both rovers returned to base, but the expedition burned fuel and exhausted the crew.',
            scienceDebrief: {
              title: 'What are the dangers of long-distance Mars driving?',
              whatHappened: 'You mounted an astronaut rescue drive across the Martian surface.',
              realMarsScience: 'Driving on Mars involves driving through uncharted territory with zero roads, GPS satellites, or gas stations. Boulders, sharp volcanic rocks that shred aluminum wheels, and hidden sand dunes present constant hazards.',
              nasaConnection: 'Apollo 15, 16, and 17 astronauts used the Lunar Roving Vehicle (LRV) on the Moon, but they had strict "walk-back limits"—they were never allowed to drive further than the distance they could safely walk back on foot if the rover broke down.',
              datasetKey: 'osdr'
            }
          }
        ]
      },
      {
        id: '3-3',
        phaseNumber: 3,
        title: 'Phase 3: Subsurface Ice Sample Prioritization',
        hazardLevel: 'caution',
        situation: 'The rover has returned to safety! Its drill holds a pristine frozen core sample containing 40% water ice mixed with ancient sulfates. How should we process it?',
        nasaTelemetryTag: {
          source: 'NASA Mars Odyssey Gamma Ray Spectrometer',
          tag: 'Subsurface Water-Equivalent Hydrogen',
          details: 'Core Sample: 42% H2O content by mass'
        },
        crewDialogues: [
          {
            crewId: 'scientist',
            quote: 'Analyze the ice chemistry for amino acids immediately! This could prove ancient life existed here.',
            mood: 'enthusiastic'
          },
          {
            crewId: 'engineer',
            quote: 'Wait! If we melt and purify that ice into drinking water and rocket fuel (liquid hydrogen/oxygen), we secure our base survival reserves!',
            mood: 'cautious'
          }
        ],
        decisionOptions: [
          {
            id: '3-3-A',
            title: 'Option A: Pure Astrobiology Spectrometry Analysis',
            description: 'Dedicate the sample to the mass spectrometer to detect organic molecules and ancient biosignatures.',
            impactPreview: '🔬 +40 Major Scientific Breakthrough | ⚡ -15% Power',
            deltas: { power: -15, oxygen: 0, health: 0, sciencePoints: 40 },
            setFlags: ['BIOSIGNATURE_DISCOVERY'],
            consequenceText: 'SPECTROMETER BREAKTHROUGH! The sample registered complex carbon chains and amino acid precursors preserved inside the ancient ice crystals! NASA Earth Mission Control erupted in cheers.',
            scienceDebrief: {
              title: 'Why is ice on Mars so exciting for scientists?',
              whatHappened: 'You tested the ice core for ancient biological signatures.',
              realMarsScience: 'Where there is water on Earth, there is virtually always life. Pure ice on Mars acts as a time capsule, freezing ancient atmospheric gases, volcanic dust, and potential microscopic organic molecules for billions of years.',
              nasaConnection: 'In 2008, NASA’s Phoenix lander dug into Martian Arctic dirt and scraped up bright white chunks that evaporated over 4 days—confirming for the first time pure water ice just inches below the surface!',
              datasetKey: 'osdr'
            }
          },
          {
            id: '3-3-B',
            title: 'Option B: Extract, Purify, and Electrolyze for Life Support',
            description: 'Melt the ice to produce clean drinking water and split it into pure oxygen for our habitat scrubbers.',
            impactPreview: '🫧 +30% Fresh Oxygen | ❤️ +15% Health & Hydration | 🔬 +15 Resource Science',
            deltas: { power: -10, oxygen: 30, health: 15, sciencePoints: 15 },
            setFlags: ['IN_SITU_RESOURCE_UTILIZATION'],
            consequenceText: 'The ice melted and passed through ceramic filters into the main habitat cisterns. The electrolysis unit split water molecules into crisp, fresh oxygen. The crew toasted with clean Martian water!',
            scienceDebrief: {
              title: 'What is In-Situ Resource Utilization (ISRU)?',
              whatHappened: 'You converted Martian ice into drinking water and breathable oxygen.',
              realMarsScience: 'Launching heavy supplies like water and oxygen from Earth costs tens of thousands of dollars per kilogram. "Living off the land"—called In-Situ Resource Utilization (ISRU)—is essential for establishing permanent human settlements on other worlds.',
              nasaConnection: 'NASA plans for Artemis astronauts on the Moon and future explorers on Mars rely on mining water ice at the planetary poles to manufacture rocket fuel (Liquid H2 and O2) for the return flight home!',
              datasetKey: 'osdr'
            }
          }
        ]
      }
    ]
  },

  {
    id: 4,
    code: 'M-04',
    title: 'Radiation Alert: Space Weather & Solar Flare',
    subtitle: 'Sol 45 to Sol 48 — Heliospheric Storm Interception',
    briefing: 'Deep space weather monitors detect an immense X-Class Solar Flare accompanied by a fast Coronal Mass Ejection (CME) moving across interplanetary space. With Mars lacking a global magnetic field, a wave of high-energy Solar Energetic Particles (SEPs) is 6 hours away.',
    startingResources: {
      power: 75,
      oxygen: 90,
      health: 85,
      sciencePoints: 80,
    },
    phases: [
      {
        id: '4-1',
        phaseNumber: 1,
        title: 'Phase 1: Solar Proton Storm Warning',
        hazardLevel: 'critical',
        situation: 'Orbital satellite DONKI telemetry records an X5.8 Solar Flare from Sunspot AR 3664. A cloud of protons traveling at 1,400 km/s will strike Jezero Crater in under 4 hours.',
        nasaTelemetryTag: {
          source: 'NASA DONKI Space Weather Database',
          tag: 'CME Propagation Intercept (Event 2024-05-10)',
          details: 'Speed: 1,420 km/s | X5.8 Flare | SEP Flux Alert'
        },
        crewDialogues: [
          {
            crewId: 'medical',
            quote: 'This is not a drill! Solar energetic particles can penetrate standard habitat walls. Everyone must retreat into the reinforced storm shelter immediately!',
            mood: 'warning'
          },
          {
            crewId: 'pilot',
            quote: 'Wait! Zunaira and I left our rover drill samples 100 meters away outside. Give me 20 minutes to sprint out and haul them inside before the storm hits.',
            mood: 'confident'
          },
          {
            crewId: 'scientist',
            quote: 'The Curiosity RAD sensor showed surface radiation can jump 10 times higher during peak solar flares. We must shield ourselves first!',
            mood: 'cautious'
          }
        ],
        decisionOptions: [
          {
            id: '4-1-A',
            title: 'Option A: Immediate Base Lock-In & Storm Shelter Evacuation',
            description: 'Order all astronauts into the reinforced storm shelter module instantly. Zero surface exposure.',
            impactPreview: '❤️ +20% Crew Protection | 🔬 0 Outside Samples Left',
            deltas: { power: -5, oxygen: 0, health: 20, sciencePoints: 5 },
            setFlags: ['SHELTER_EVACUATED_EARLY'],
            consequenceText: 'Airlock sealed! All five astronauts stepped into the inner core storm shelter and sealed the blast hatches with 2 hours to spare. Crew radiation dosimeters remain well below danger limits.',
            scienceDebrief: {
              title: 'Why does Mars have more radiation than Earth?',
              whatHappened: 'You prioritized human safety by locking the crew in the storm shelter.',
              realMarsScience: 'Earth has a molten iron core that creates a massive magnetic bubble called the magnetosphere, which deflects dangerous cosmic rays and solar flares. Mars lost its global magnetic shield billions of years ago when its core cooled down!',
              nasaConnection: 'NASA monitors space weather through satellites like SOHO, SDO, and the DONKI alert system. Astronauts on the Moon and Mars must always have access to radiation storm shelters.',
              datasetKey: 'donki'
            }
          },
          {
            id: '4-1-B',
            title: 'Option B: Rapid 20-Minute Exterior Sample Recovery Sprint',
            description: 'Authorize Zunaira for a rapid 15-minute EVA sprint to grab the external drill samples before locking down.',
            impactPreview: '🔬 +25 Secured Samples | ❤️ -20 Radiation Dose Risk',
            deltas: { power: -10, oxygen: -5, health: -20, sciencePoints: 25 },
            setFlags: ['EVA_SAMPLE_RECOVERY'],
            consequenceText: 'Zunaira dashed out, grabbed the titanium sample cylinders, and tumbled through the airlock just as particle detectors began chirping. The precious samples are safe, but Zunaira received an elevated radiation dose.',
            scienceDebrief: {
              title: 'How does radiation affect human cells?',
              whatHappened: 'You took a calculated risk to retrieve samples before the storm hit.',
              realMarsScience: 'High-energy solar protons act like microscopic bullets. When they pass through the human body, they can break strands of DNA inside cells. If damage is severe, cells cannot repair themselves, causing radiation sickness.',
              nasaConnection: 'NASA’s Open Science Data Repository (OSDR) collects biological research from astronauts and deep space organisms to study how cells repair DNA and test medicines that protect human tissues from cosmic radiation.',
              datasetKey: 'osdr'
            }
          }
        ]
      },
      {
        id: '4-2',
        phaseNumber: 2,
        title: 'Phase 2: Habitat Regolith Shielding Strategy',
        hazardLevel: 'critical',
        situation: 'The crew is inside the storm shelter, but particle levels are rising. You must enhance radiation shielding using base resources.',
        nasaTelemetryTag: {
          source: 'NASA Curiosity RAD Instrument',
          tag: 'Surface Radiation Dose Rate',
          details: 'Current Exposure: 1.8 mSv/day (Elevated Solar Storm Level)'
        },
        crewDialogues: [
          {
            crewId: 'engineer',
            quote: 'We can use the rover’s robotic bulldozer blade to scoop 1.5 meters of Martian regolith (dirt) over our storm shelter roof. Regolith is dense and blocks protons!',
            mood: 'cautious'
          },
          {
            crewId: 'medical',
            quote: 'Or we can pump our life-support greywater reserves into the hollow wall jackets of the shelter. Water contains hydrogen atoms, which are the #1 best radiation shield!',
            mood: 'protective'
          }
        ],
        decisionOptions: [
          {
            id: '4-2-A',
            title: 'Option A: Regolith Bulldozing over Habitat Roof',
            description: 'Remotely operate the rover to pile heavy Martian soil and rock over the storm bunker.',
            impactPreview: '⚡ -20% Power | ❤️ +25% Superb Soil Shielding | 🔬 +10 Engineering',
            deltas: { power: -20, oxygen: 0, health: 25, sciencePoints: 10 },
            setFlags: ['REGOLITH_SHIELD_DEPLOYED'],
            consequenceText: 'The rover pushed piles of red dirt over the habitat shell. The dosimeters inside clicked slower and slower—the thick layer of Martian soil absorbed 85% of incoming cosmic radiation!',
            scienceDebrief: {
              title: 'Can Martian dirt protect astronauts from space radiation?',
              whatHappened: 'You buried the storm shelter under Martian regolith to block radiation.',
              realMarsScience: 'Martian soil (regolith) is made of minerals rich in iron, silicon, and aluminum. Piling 1 to 2 meters of Martian regolith over living quarters provides the same radiation protection as Earth’s atmosphere!',
              nasaConnection: 'NASA architects designing future Mars bases use 3D printers that mix Martian regolith with polymers to print thick protective domes over inflatable astronaut living pods.',
              datasetKey: 'curiosityRad'
            }
          },
          {
            id: '4-2-B',
            title: 'Option B: Water-Wall Hydrogen Shield Configuration',
            description: 'Pump habitat life-support water into the ceiling panels to create a hydrogen barrier.',
            impactPreview: '🫧 -15% Water Reserves Strained | ❤️ +20% Clean Shielding',
            deltas: { power: -10, oxygen: -15, health: 20, sciencePoints: 5 },
            setFlags: ['WATER_WALL_SHIELD'],
            consequenceText: 'Water was pumped into the overhead baffles. Hydrogen atoms in the H2O molecules bounced incoming protons harmlessly away. Radiation inside the cabin dropped to normal levels.',
            scienceDebrief: {
              title: 'Why is water one of the best space shields?',
              whatHappened: 'You surrounded the crew quarters with water tanks.',
              realMarsScience: 'High-energy solar protons have almost the exact same mass as the nucleus of a hydrogen atom. When a cosmic ray hits a hydrogen atom in water, it transfers its energy like two billiard balls colliding, stopping the radiation cold without producing harmful secondary radiation.',
              nasaConnection: 'Spaceships traveling to Mars may place astronaut sleeping quarters right inside the center of the spacecraft, surrounded by their food and water supplies for natural radiation shielding.',
              datasetKey: 'curiosityRad'
            }
          }
        ]
      },
      {
        id: '4-3',
        phaseNumber: 3,
        title: 'Phase 3: Storm Passing & Mission Victory',
        hazardLevel: 'nominal',
        situation: 'The solar proton wave has swept past Mars into the outer solar system. Surface radiation monitors have returned to nominal green levels. The mission is a triumphant success!',
        nasaTelemetryTag: {
          source: 'NASA DONKI & Curiosity RAD',
          tag: 'Heliospheric Telemetry: All Clear',
          details: 'Surface Radiation: 0.22 mSv/day (Baseline Nominal)'
        },
        crewDialogues: [
          {
            crewId: 'scientist',
            quote: 'Commander, we survived the storm, saved the rover, and gathered more planetary science than any mission in human history!',
            mood: 'enthusiastic'
          },
          {
            crewId: 'engineer',
            quote: 'Our power grid is holding strong, our batteries survived, and the habitat is fully operational.',
            mood: 'confident'
          },
          {
            crewId: 'medical',
            quote: 'All five astronauts are in prime health. You guided this crew with wisdom and courage, Commander.',
            mood: 'protective'
          },
          {
            crewId: 'pilot',
            quote: 'Ares Base is officially open for business. Mars is now our second home!',
            mood: 'confident'
          }
        ],
        decisionOptions: [
          {
            id: '4-3-A',
            title: 'Declare Ares Base Fully Operational & Transmit Science to Earth',
            description: 'Transmit the complete mission log, sample catalog, and base telemetry to NASA Earth Control.',
            impactPreview: '🏆 Complete Expedition & Unlock Master Commander Certificate',
            deltas: { power: 0, oxygen: 0, health: 10, sciencePoints: 50 },
            setFlags: ['MISSION_ACCOMPLISHED'],
            consequenceText: 'Telemetry beam transmitted across 225 million kilometers to Earth. NASA Mission Control erupts in a standing ovation. You are officially certified as a Master Mars Commander!',
            scienceDebrief: {
              title: 'Humanity on Mars: The Next Giant Leap',
              whatHappened: 'You successfully completed the 4 foundational missions of the Mars Frontier Expedition.',
              realMarsScience: 'Establishing a permanent research base on Mars requires mastering power generation, environmental life support, autonomous robotics, and radiation protection. Through your decisions, you demonstrated the balance and teamwork real astronauts practice every day.',
              nasaConnection: 'Under NASA’s Moon to Mars architecture, the lessons learned on the Moon during the Artemis missions will prepare the first human astronauts to travel to, live on, and explore Mars in the 2030s and beyond!',
              datasetKey: 'donki'
            }
          }
        ]
      }
    ]
  }
];
