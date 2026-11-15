import React from 'react';
import { X, Award, CheckCircle2, Database, Scale, Users, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function ChallengeDetailsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-poppins select-none">
      <div className="bg-[#0b101d] border-2 border-space-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-b border-space-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-tech-cyan">
              <Award className="w-5 h-5 text-tech-cyan" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-tech-cyan font-bold block">
                NASA Space Apps Challenge 2026
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Challenge Alignment & Judge Reference
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
          
          {/* Challenge Track Pill */}
          <div className="p-3.5 rounded-2xl bg-space-850 border border-space-700">
            <span className="text-xs uppercase font-extrabold text-amber-400 block mb-1">
              CHALLENGE STATEMENT: "BUILD A JUNIOR ASTRONAUT MISSION TRAINER"
            </span>
            <p className="text-slate-200 font-normal leading-relaxed text-xs">
              "Design and build an interactive game or app that lets students run a lunar or Martian outpost, balancing competing demands like life support, radiation shielding, power, and food production, so they experience firsthand the decisions that determine whether a mission fails or succeeds."
            </p>
          </div>

          {/* Key Alignment Criteria */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-tech-cyan flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tech-emerald" />
              <span>How Mission: Mars Frontier Directly Solves This Challenge</span>
            </h4>

            {/* 1. Real Trade-Offs */}
            <div className="p-3.5 rounded-2xl bg-space-850/80 border border-space-700">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm mb-1">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>1. Authentic Engineering Trade-Offs (No Safe Choices)</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Every mission presents genuine competing priorities across 4 dynamic resources: <strong>⚡ Power</strong>, <strong>🫧 Oxygen (ECLSS)</strong>, <strong>❤️ Crew Health & Radiation Safety</strong>, and <strong>🧪 Science Points</strong>.
                For example, in Mission 2 kids must choose whether to cut habitat heating to save battery banks, or burn power to study electrostatic storm charges.
              </p>
            </div>

            {/* 2. NASA Open Data Integration */}
            <div className="p-3.5 rounded-2xl bg-space-850/80 border border-space-700">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm mb-1">
                <Database className="w-4 h-4 text-tech-cyan" />
                <span>2. Grounded in Official NASA Open Datasets</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 mt-1 font-normal">
                <li>• <strong>NASA DONKI:</strong> Space weather records driving solar flare & CME alerts in Mission 4.</li>
                <li>• <strong>NASA MEDA (Perseverance Rover):</strong> Real surface atmospheric pressure (745 Pa), -78°C temperatures, and dust opacity.</li>
                <li>• <strong>NASA HiRISE:</strong> Jezero Crater river delta elevation & boulder field maps.</li>
                <li>• <strong>NASA Curiosity RAD:</strong> Real surface radiation dosimeter telemetry.</li>
                <li>• <strong>NASA OSDR:</strong> Human spaceflight biology & cellular DNA repair research.</li>
              </ul>
            </div>

            {/* 3. Designed for Kids 7-12 */}
            <div className="p-3.5 rounded-2xl bg-space-850/80 border border-space-700">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm mb-1">
                <Users className="w-4 h-4 text-tech-emerald" />
                <span>3. Accessible & Non-Punitive Educational Mechanics</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Uses <strong>Poppins typography</strong>, plain language, and responsive Web Audio sounds. Instead of frustrating permadeath, critical failures trigger an <strong>Earth Command Emergency Override</strong> where kids rewind a choice at the educational cost of Science Points.
              </p>
            </div>

            {/* 4. Team Dynamics */}
            <div className="p-3.5 rounded-2xl bg-space-850/80 border border-space-700">
              <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm mb-1">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>4. Specialist Crew Leadership</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                The player acts as Mission Commander, synthesizing conflicting domain advice from Maryam (Science), Abdullah (Engineering), Zunaira (Pilot), and Lawaiza (Medical).
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-space-950 border-t border-space-700/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs transition-all cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
