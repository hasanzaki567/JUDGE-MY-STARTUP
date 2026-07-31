import React, { useState } from 'react';
import { RoastResult } from '../types';
import { RECENT_ROASTS_LIST } from '../data/presetStartups';

interface PortfolioRoastGalleryProps {
  onSelectRoast: (roast: RoastResult) => void;
  customRoasts: RoastResult[];
}

export const PortfolioRoastGallery: React.FC<PortfolioRoastGalleryProps> = ({
  onSelectRoast,
  customRoasts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'REJECTED' | 'PASSED'>('ALL');

  const allRoasts = [...customRoasts, ...RECENT_ROASTS_LIST];

  const filteredRoasts = allRoasts.filter((r) => {
    const matchesSearch =
      r.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.healthSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'REJECTED' && r.outcome === 'REJECTED') ||
      (filter === 'PASSED' && r.outcome !== 'REJECTED');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12 max-w-[1400px] mx-auto relative z-10">
      <header className="mb-8 border-b border-white/5 pb-6">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 mb-2 font-mono-custom text-xs text-[#a5e7ff] tracking-widest uppercase">
          COMMUNITY HALL OF SHAME
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">Portfolio & Recent Roasts</h1>
        <p className="text-[#c8c5ca] text-base max-w-2xl">
          Browse recent AI VC evaluations, failure diagnoses, and rare passed term sheets.
        </p>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups, stages, or roasts..."
            className="bg-black/40 border border-white/10 rounded px-4 py-2.5 text-white font-mono-custom text-xs w-full sm:w-80 focus:outline-none focus:border-[#a5e7ff]"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 font-mono-custom text-xs font-bold rounded border transition-all ${
                filter === 'ALL' ? 'bg-[#a5e7ff]/20 border-[#a5e7ff] text-[#a5e7ff]' : 'bg-white/5 border-white/10 text-[#c8c5ca]'
              }`}
            >
              All ({allRoasts.length})
            </button>
            <button
              onClick={() => setFilter('REJECTED')}
              className={`px-4 py-2 font-mono-custom text-xs font-bold rounded border transition-all ${
                filter === 'REJECTED' ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]' : 'bg-white/5 border-white/10 text-[#c8c5ca]'
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => setFilter('PASSED')}
              className={`px-4 py-2 font-mono-custom text-xs font-bold rounded border transition-all ${
                filter === 'PASSED' ? 'bg-[#4edea3]/20 border-[#4edea3] text-[#4edea3]' : 'bg-white/5 border-white/10 text-[#c8c5ca]'
              }`}
            >
              Passed
            </button>
          </div>
        </div>
      </header>

      {/* Roasts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoasts.map((roast) => {
          const isRejected = roast.outcome === 'REJECTED';
          return (
            <div
              key={roast.id}
              onClick={() => onSelectRoast(roast)}
              className="glass-card p-6 rounded-xl hover:scale-[1.02] cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-2.5 py-0.5 border font-mono-custom text-[10px] font-bold uppercase rounded ${
                      isRejected ? 'text-[#ffb4ab] border-[#ffb4ab]/30 bg-[#ffb4ab]/10' : 'text-[#4edea3] border-[#4edea3]/30 bg-[#4edea3]/10'
                    }`}
                  >
                    {roast.outcome}
                  </span>
                  <span className="text-xs font-mono-custom text-[#c8c5ca]">{roast.stage}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#a5e7ff] transition-colors">
                  {roast.startupName}
                </h3>

                <p className="text-[#c8c5ca] text-xs leading-relaxed mb-6 line-clamp-3 font-sans">
                  "{roast.healthSummary}"
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#c8c5ca] font-mono-custom">Score:</span>
                  <span className={`font-mono-custom font-bold text-sm ${isRejected ? 'text-[#ffb4ab]' : 'text-[#4edea3]'}`}>
                    {roast.healthScore}/100
                  </span>
                </div>
                <span className="text-xs font-mono-custom text-[#a5e7ff] group-hover:underline flex items-center gap-1">
                  Inspect Verdict →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
