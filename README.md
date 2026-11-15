# Mission: Mars Frontier 🚀
### NASA Space Apps Challenge 2026 — Junior Astronaut Mission Trainer (Ages 7–12)

**Mission: Mars Frontier** is an interactive, browser-based planetary mission-command simulator designed for children aged 7–12. The player assumes the role of **Mission Commander**, leading a specialist team of 4 astronauts on the surface of Mars to establish and sustain a scientific research settlement in Jezero Crater.

---

## 🌟 Key Features

1. **Authentic Mission Leadership (Not Just a Quiz):**
   - The player directs a team of 4 specialist astronauts who offer distinct, domain-specific advice during crises.
   - Every decision shifts dynamic mission resources (⚡ Power, 🫧 Oxygen / ECLSS, ❤️ Crew Health, 🔬 Science Points).
2. **4 Full Playable Missions:**
   - **Mission 1: Arrival on Mars** (Jezero Crater landing site selection, descent braking, base initialization).
   - **Mission 2: The Power Crisis** (Martian regional dust storm, solar array protection, battery brownouts).
   - **Mission 3: The Lost Rover** (Communications blackout, rover sand trap extraction, ancient water ice analysis).
   - **Mission 4: Radiation Alert** (DONKI solar flare warning, regolith habitat shielding, mission completion).
3. **NASA Open Data Integration & Transparent Attribution:**
   - **NASA MEDA (Perseverance Rover):** Real surface temperature, atmospheric pressure, and dust opacity ($\tau$).
   - **NASA DONKI:** Curated Coronal Mass Ejection (CME) and X-Class solar flare space weather events.
   - **NASA HiRISE:** Jezero Crater orbital elevation and ancient river delta cartography.
   - **NASA Curiosity RAD:** Surface radiation dosimeter measurements for shelter education.
   - **NASA OSDR:** Spaceflight biological research on human DNA repair and fatigue.
4. **Kid-Friendly Failure Handling:**
   - Features the **Earth Command Emergency Override** system. Critical failures trigger a supportive message from Houston with a **Rewind Decision** option costing Science Points, teaching accountability without frustrating permadeath.
5. **Polished Visuals & Web Audio API:**
   - 2.5D/3D hybrid Mars canvas with animated dust particle physics, habitat modules, and rover.
   - Built-in zero-dependency Web Audio API synthesizer for NASA Quindar comms chirps, alarms, and ambient Martian wind.
   - Beautiful, kid-friendly typography using **Poppins** and high-contrast cosmic colors.

---

## 👨‍🚀 Astronaut Crew Roster

| Call-Sign | Character | Role | Primary Domain |
|---|---|---|---|
| **Ares-Lead** | **You (Player)** | Mission Commander | Strategic Leadership & Final Decisions |
| **Discovery-1** | **Maryam** | Lead Astrobiologist | Soil Samples, Ancient Water Signs, Geology |
| **Wrench-1** | **Abdullah** | Chief Base Engineer | Power Grid, Solar Panels, Rover Hardware |
| **Vector-1** | **Zunaira** | Expedition Pilot | Navigation, Rover Driving, Spacewalks (EVA) |
| **Life-1** | **Lawaiza** | Chief Medical Officer | Life Support (ECLSS), Radiation Safety, Health |

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite 6
- **Styling:** Tailwind CSS (custom cosmic theme + Poppins typography)
- **Icons:** Lucide React
- **Audio:** Web Audio API (real-time sound synthesizer)
- **Effects:** Canvas-confetti, HTML5 Canvas 2D Particle Engine

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📜 License
Developed for the **NASA Space Apps Challenge 2026**. Open source under the MIT License.
