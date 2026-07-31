import React from 'react';
import { RoastResult } from '../types';

interface VerdictDashboardProps {
  roast: RoastResult;
  onShareRoast: () => void;
  onNewPitch: () => void;
  onOpenTermSheetSim: () => void;
  onOpenBurnCalc: () => void;
}

export const VerdictDashboard: React.FC<VerdictDashboardProps> = ({
  roast,
  onShareRoast,
  onNewPitch,
  onOpenTermSheetSim,
  onOpenBurnCalc,
}) => {
  const isRejected = roast.outcome === 'REJECTED';
  const outcomeColor = isRejected ? 'text-[#ffb4ab] border-[#ffb4ab]/30 bg-[#ffb4ab]/10' : 'text-[#4edea3] border-[#4edea3]/30 bg-[#4edea3]/10';

  // SVG Gauge calculations
  const strokeDashoffset = 264 - (264 * roast.healthScore) / 100;

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12 max-w-[1400px] mx-auto relative z-10">
      {/* Top Header & Case ID */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`px-3 py-1 border font-mono-custom text-xs font-bold uppercase tracking-wider rounded ${outcomeColor}`}>
              {roast.outcome}
            </span>
            <span className="text-[#c8c5ca] font-mono-custom text-xs">
              CASE ID: <span className="text-white font-bold">{roast.caseId}</span>
            </span>
            <span className="text-[#c8c5ca] font-mono-custom text-xs">• {roast.stage} Pitch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Verdict: <span className="text-[#a5e7ff]">{roast.startupName}</span>
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onShareRoast}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider font-mono-custom transition-all flex items-center gap-2 border border-white/10"
            id="btn-share-roast"
          >
            <span className="material-symbols-outlined text-sm">share</span>
            <span>Share Roast</span>
          </button>

          <button
            onClick={onNewPitch}
            className="px-5 py-2.5 bg-[#a5e7ff] text-[#003543] font-bold text-xs uppercase tracking-wider font-mono-custom hover:bg-white transition-all flex items-center gap-2"
            id="btn-new-pitch"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>New Pitch</span>
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Column (Health Score + Stat Grid + Breakdown) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Health Score Gauge Card */}
          <div className="glass-card p-6 sm:p-8 rounded-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Circular Gauge */}
              <div className="relative w-40 h-40 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="8"></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="42"
                    stroke={isRejected ? '#ffb4ab' : '#4edea3'}
                    strokeDasharray="264"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="8"
                    className="gauge-ring"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-5xl font-bold ${isRejected ? 'text-[#ffb4ab]' : 'text-[#4edea3]'}`}>
                    {roast.healthScore}
                  </span>
                  <span className="text-[#c8c5ca] font-mono-custom text-[10px] uppercase tracking-widest mt-0.5">
                    Health Score
                  </span>
                </div>
              </div>

              {/* Health Summary Text & Chips */}
              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs font-mono-custom text-[#a5e7ff] uppercase tracking-widest mb-2 font-semibold">
                  OPERATIONAL DIAGNOSIS
                </div>
                <p className="text-white text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  {roast.healthSummary}
                </p>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {roast.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="roast-chip px-3 py-1 text-xs font-mono-custom text-[#ffb4ab] font-bold uppercase rounded"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk Level */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono-custom text-[#c8c5ca] uppercase">Risk Level</span>
                  <span className="text-xs font-mono-custom font-bold text-[#ffb4ab] bg-[#ffb4ab]/10 px-2 py-0.5 rounded">
                    {roast.riskVerdict}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{roast.riskLevelPercentage}%</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-[#ffb4ab] rounded-full shadow-[0_0_10px_rgba(255,180,171,0.5)]"
                    style={{ width: `${roast.riskLevelPercentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs font-mono-custom text-[#c8c5ca] italic border-t border-white/5 pt-3">
                {roast.riskQuote}
              </p>
            </div>

            {/* Moat Score */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono-custom text-[#c8c5ca] uppercase">Moat Rating</span>
                  <span className="text-xs font-mono-custom font-bold text-[#a5e7ff]">{roast.moatScore} / 10</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{roast.moatScore.toFixed(1)}</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-[#a5e7ff] rounded-full"
                    style={{ width: `${(roast.moatScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-[11px] font-mono-custom text-[#ffb4ab] uppercase font-bold border-t border-white/5 pt-3">
                {roast.moatRoast}
              </p>
            </div>

            {/* Delusion Index */}
            <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono-custom text-[#c8c5ca] uppercase">Delusion Index</span>
                  <span className="text-xs font-mono-custom font-bold text-[#ffb4ab]">{roast.delusionIndex}</span>
                </div>
                <div className="space-y-2 text-xs font-mono-custom">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-[#c8c5ca]">Self-Awareness:</span>
                    <span className="text-[#ffb4ab] font-bold">{roast.selfAwareness}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-[#c8c5ca]">TAM Hallucination:</span>
                    <span className="text-[#a5e7ff] font-bold">{roast.tamHallucination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#c8c5ca]">Ego Inflation:</span>
                    <span className="text-[#ffb4ab] font-bold">{roast.egoInflation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Burn Rate Prediction & Runway Chart */}
          <div className="glass-card p-6 sm:p-8 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <div className="text-xs font-mono-custom text-[#a5e7ff] uppercase tracking-widest mb-1">
                  CAPITAL DEPLETION PROJECTION
                </div>
                <h3 className="text-2xl font-bold text-white">Projected Runway & Death Date</h3>
              </div>
              <div className="bg-black/40 border border-white/10 px-4 py-2 rounded text-right">
                <span className="text-xs text-[#c8c5ca] font-mono-custom block">Runway Left</span>
                <span className="text-2xl font-bold font-mono-custom text-[#ffb4ab]">{roast.burnPredictionMonths} Months</span>
              </div>
            </div>

            <div className="p-4 bg-black/40 border border-white/5 rounded-lg mb-6">
              <div className="flex justify-between text-xs font-mono-custom mb-2">
                <span className="text-[#c8c5ca]">Estimated Death Date:</span>
                <span className="text-[#ffb4ab] font-bold">{roast.burnDepletionDate}</span>
              </div>
              {/* Visual Timeline Bar */}
              <div className="h-4 w-full bg-white/5 rounded flex overflow-hidden">
                <div className="h-full bg-[#4edea3] w-[35%] flex items-center justify-center text-[9px] font-mono-custom font-bold text-black">
                  CASH
                </div>
                <div className="h-full bg-[#ffb4ab] w-[65%] flex items-center justify-center text-[9px] font-mono-custom font-bold text-black animate-pulse">
                  BURN DEPLETION
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onOpenBurnCalc}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#a5e7ff] font-mono-custom text-xs font-bold border border-white/10 transition-all rounded"
              >
                📊 Open Burn Rate Modeler
              </button>
            </div>
          </div>

          {/* Brutal Breakdown Section */}
          <div className="glass-card p-6 sm:p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Brutal Critique Breakdown</h3>
            <div className="space-y-4">
              {roast.brutalBreakdown.map((item, idx) => (
                <div key={idx} className="p-4 bg-black/30 border-l-4 border-[#ffb4ab] rounded-r-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono-custom text-xs font-bold text-[#a5e7ff] uppercase">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono-custom px-2 py-0.5 bg-[#ffb4ab]/10 text-[#ffb4ab] font-bold uppercase rounded">
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-[#c8c5ca] text-sm leading-relaxed">{item.critique}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (Investor Feed, News, Term Sheet) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Term Sheet Quick Snapshot Card */}
          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-[#12131a] to-[#1e1f26]">
            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
              <span className="text-xs font-mono-custom text-[#a5e7ff] uppercase tracking-wider">
                Predatory Term Sheet
              </span>
              <button
                onClick={onOpenTermSheetSim}
                className="text-xs font-mono-custom text-white hover:text-[#a5e7ff] underline"
              >
                Modify
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono-custom">
              <div className="p-2.5 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Pre-Money</span>
                <span className="text-white font-bold text-sm">{roast.termSheetData.preMoney}</span>
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Exit Liquidation</span>
                <span className="text-[#ffb4ab] font-bold text-sm">{roast.termSheetData.exitFee}</span>
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Board Control</span>
                <span className="text-[#ffb4ab] font-bold text-sm">{roast.termSheetData.boardControl}</span>
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Founder Vesting</span>
                <span className="text-white font-bold text-sm">{roast.termSheetData.vesting}</span>
              </div>
            </div>

            <button
              onClick={onOpenTermSheetSim}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono-custom text-xs font-bold border border-white/10 transition-all uppercase rounded"
            >
              Simulate Dilution & Exit Payouts
            </button>
          </div>

          {/* Investor Feed (X/Twitter style) */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <span className="material-symbols-outlined text-[#a5e7ff] text-xl">forum</span>
              <h4 className="font-bold text-white text-base">VC Reaction Feed</h4>
            </div>

            <div className="space-y-4">
              {roast.investorFeed.map((tweet) => (
                <div key={tweet.id} className="p-3 bg-black/30 rounded border border-white/5 text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={tweet.avatar} alt={tweet.author} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-white block leading-none">{tweet.author}</span>
                      <span className="text-[10px] text-[#c8c5ca] font-mono-custom">{tweet.handle} • {tweet.time}</span>
                    </div>
                  </div>
                  <p className="text-[#c8c5ca] leading-relaxed font-sans">{tweet.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breaking Tech News Card */}
          <div className="glass-card p-6 rounded-xl">
            <div className="text-[10px] font-mono-custom text-[#ffb4ab] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
              BREAKING TECH NEWS
            </div>

            <h4 className="font-bold text-white text-base mb-2 leading-snug">{roast.breakingNews.title}</h4>
            <p className="text-[#c8c5ca] text-xs leading-relaxed mb-4">{roast.breakingNews.text}</p>

            {roast.breakingNews.image && (
              <img
                src={roast.breakingNews.image}
                alt="Breaking news"
                className="w-full h-32 object-cover rounded border border-white/5"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
