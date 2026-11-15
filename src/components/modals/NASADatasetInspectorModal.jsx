import React from 'react';
import { useGameState } from '../../context/GameStateContext';
import { NASA_DATASETS } from '../../data/nasaDatasets';
import { Database, ExternalLink, X, ShieldCheck, AlertCircle } from 'lucide-react';

export default function NASADatasetInspectorModal() {
  const { state, dispatch } = useGameState();
  const activeKey = state.selectedDatasetModal || 'meda';
  const dataset = NASA_DATASETS[activeKey] || NASA_DATASETS.meda;

  if (!state.selectedDatasetModal) return null;

  const datasetKeys = Object.keys(NASA_DATASETS);

  const getAttributionBadge = (type) => {
    switch (type) {
      case 'ARCHIVED_MISSION_DATA':
        return { label: 'Archived Planetary Mission Data', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-700' };
      case 'CURATED_EVENT_DATA':
        return { label: 'Curated Heliospheric Solar Record', color: 'bg-amber-950/80 text-amber-300 border-amber-700' };
      case 'CURATED_GEOGRAPHIC_DATA':
        return { label: 'Authentic Mars Orbital Cartography', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-700' };
      case 'RESEARCH_DATABASE':
        return { label: 'NASA Space Biology Research', color: 'bg-purple-950/80 text-purple-300 border-purple-700' };
      default:
        return { label: 'Simulated Educational Model', color: 'bg-space-800 text-slate-300 border-space-600' };
    }
  };

  const badgeInfo = getAttributionBadge(dataset.attributionType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-space-900 border-2 border-blue-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-space-950 via-blue-950/50 to-space-950 border-b border-space-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-tech-cyan">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-tech-cyan font-bold block">
                NASA Open Science Data Inspector
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {dataset.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'CLOSE_NASA_MODAL' })}
            className="p-2 rounded-xl hover:bg-space-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dataset Selector Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-space-950 border-b border-space-700/80 overflow-x-auto">
          {datasetKeys.map((key) => {
            const item = NASA_DATASETS[key];
            const isSelected = key === activeKey;

            return (
              <button
                key={key}
                onClick={() => dispatch({ type: 'INSPECT_NASA_DATA', payload: key })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-space-850 text-slate-400 hover:text-slate-200 hover:bg-space-800'
                }`}
              >
                {item.badgeText}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed">
          
          {/* Attribution Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-2xl bg-space-850 border border-space-700">
            <div>
              <span className="text-xs text-slate-400 block mb-1">DATA ATTRIBUTION TYPE:</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeInfo.color}`}>
                {badgeInfo.label}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-1">MISSION REFERENCE:</span>
              <span className="text-xs sm:text-sm font-bold text-white">{dataset.mission}</span>
            </div>
          </div>

          {/* Clarification Note if present */}
          {dataset.clarificationNote && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/50 flex items-start gap-3 text-amber-200 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{dataset.clarificationNote}</span>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Dataset Overview
            </h4>
            <p className="text-slate-200 font-normal leading-relaxed">
              {dataset.description}
            </p>
          </div>

          {/* Telemetry Points */}
          {dataset.measurements && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-tech-cyan mb-2">
                Recorded Telemetry Points
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(dataset.measurements).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-space-950 border border-space-700/80 text-xs">
                    <span className="text-slate-400 uppercase text-[10px] font-bold block mb-0.5">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-bold text-white text-xs sm:text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Takeaway */}
          <div className="p-4 rounded-2xl bg-space-850 border border-space-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-tech-emerald mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-tech-emerald" />
              <span>Key Scientific Takeaway for Junior Astronauts</span>
            </h4>
            <p className="text-slate-300 leading-relaxed font-normal">
              {dataset.educationalContext || dataset.keyInsights}
            </p>
          </div>

          {/* Official Citation */}
          <div className="text-xs text-slate-400 border-t border-space-700/80 pt-3">
            <span className="font-bold text-slate-300">Citation: </span>
            {dataset.citation}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-space-950 border-t border-space-700/80 flex items-center justify-between">
          <a
            href={dataset.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-tech-cyan hover:underline font-semibold transition-colors"
          >
            <span>Visit NASA Science Data Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => dispatch({ type: 'CLOSE_NASA_MODAL' })}
            className="px-6 py-2.5 rounded-xl bg-space-800 hover:bg-space-750 border border-space-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
