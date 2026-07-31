import React, { useState } from 'react';

interface TermSheetSimulatorProps {
  onClose?: () => void;
}

export const TermSheetSimulator: React.FC<TermSheetSimulatorProps> = ({ onClose }) => {
  const [preMoney, setPreMoney] = useState(2.0); // $2.0M
  const [investment, setInvestment] = useState(1.0); // $1.0M
  const [optionPool, setOptionPool] = useState(15); // 15%
  const [liquidationPref, setLiquidationPref] = useState(2); // 2x
  const [founderShareInitial, setFounderShareInitial] = useState(80); // 80%

  const postMoney = preMoney + investment;
  const vcShare = (investment / postMoney) * 100;
  const optionPoolEffective = optionPool;
  const founderSharePost = Math.max(0, 100 - vcShare - optionPoolEffective);

  // Exit scenarios ($20M, $50M, $100M)
  const calculateExitPayout = (exitValue: number) => {
    // VC gets liquidation preference first
    const vcPrefPayout = Math.min(exitValue, investment * liquidationPref);
    const remainingVal = Math.max(0, exitValue - vcPrefPayout);
    const vcProRata = (remainingVal * vcShare) / 100;
    const totalVc = vcPrefPayout + vcProRata;
    const totalFounder = (remainingVal * founderSharePost) / 100;
    return { vc: totalVc, founder: totalFounder };
  };

  const exit20 = calculateExitPayout(20);
  const exit50 = calculateExitPayout(50);
  const exit100 = calculateExitPayout(100);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12 max-w-[1400px] mx-auto relative z-10">
      <header className="mb-8 border-b border-white/5 pb-6 flex justify-between items-start">
        <div>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 mb-2 font-mono-custom text-xs text-[#a5e7ff] tracking-widest uppercase">
            SIMULATION TOOL
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Term Sheet & Dilution Modeler</h1>
          <p className="text-[#c8c5ca] text-sm mt-1">
            Model how predatory term sheets, liquidation preferences, and option pools decimate founder equity at exit.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 text-white font-mono-custom text-xs font-bold hover:bg-white/20 rounded"
          >
            ← Back to Verdict
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white border-b border-white/5 pb-3">Investment Parameters</h3>

          <div>
            <div className="flex justify-between text-xs font-mono-custom mb-1">
              <span className="text-[#c8c5ca]">Pre-Money Valuation</span>
              <span className="text-[#a5e7ff] font-bold">${preMoney.toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="10.0"
              step="0.1"
              value={preMoney}
              onChange={(e) => setPreMoney(parseFloat(e.target.value))}
              className="w-full accent-[#a5e7ff] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-custom mb-1">
              <span className="text-[#c8c5ca]">Investment Amount</span>
              <span className="text-[#4edea3] font-bold">${investment.toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={investment}
              onChange={(e) => setInvestment(parseFloat(e.target.value))}
              className="w-full accent-[#4edea3] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-custom mb-1">
              <span className="text-[#c8c5ca]">Option Pool Shuffle (Unallocated)</span>
              <span className="text-[#ffb4ab] font-bold">{optionPool}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={optionPool}
              onChange={(e) => setOptionPool(parseInt(e.target.value))}
              className="w-full accent-[#ffb4ab] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-custom mb-1">
              <span className="text-[#c8c5ca]">Liquidation Preference</span>
              <span className="text-[#ffb4ab] font-bold">{liquidationPref}x Participating</span>
            </div>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => setLiquidationPref(val)}
                  className={`flex-1 py-2 font-mono-custom text-xs font-bold border rounded transition-all ${
                    liquidationPref === val
                      ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]'
                      : 'bg-white/5 border-white/10 text-[#c8c5ca]'
                  }`}
                >
                  {val}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Ownership Breakdown Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Post-Money Cap Table</h3>

            <div className="grid grid-cols-3 gap-3 mb-6 font-mono-custom">
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[10px] text-[#c8c5ca] block">Post-Money Val</span>
                <span className="text-lg font-bold text-white">${postMoney.toFixed(2)}M</span>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[10px] text-[#c8c5ca] block">VC Equity</span>
                <span className="text-lg font-bold text-[#4edea3]">{vcShare.toFixed(1)}%</span>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[10px] text-[#c8c5ca] block">Founder Equity</span>
                <span className="text-lg font-bold text-[#a5e7ff]">{founderSharePost.toFixed(1)}%</span>
              </div>
            </div>

            {/* Ownership Visual Bar */}
            <div className="h-6 w-full bg-white/5 rounded flex overflow-hidden mb-6">
              <div
                className="h-full bg-[#a5e7ff] flex items-center justify-center text-[10px] font-mono-custom font-bold text-black"
                style={{ width: `${founderSharePost}%` }}
              >
                Founder ({founderSharePost.toFixed(0)}%)
              </div>
              <div
                className="h-full bg-[#4edea3] flex items-center justify-center text-[10px] font-mono-custom font-bold text-black"
                style={{ width: `${vcShare}%` }}
              >
                VC ({vcShare.toFixed(0)}%)
              </div>
              <div
                className="h-full bg-[#ffb4ab] flex items-center justify-center text-[10px] font-mono-custom font-bold text-black"
                style={{ width: `${optionPoolEffective}%` }}
              >
                Pool ({optionPoolEffective}%)
              </div>
            </div>
          </div>

          {/* Exit Payout Scenarios Table */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Payout At M&A / IPO Exit</h3>

            <div className="space-y-4">
              <div className="p-4 bg-black/40 border border-white/5 rounded">
                <div className="flex justify-between items-center mb-2 font-mono-custom">
                  <span className="text-white font-bold">$20M Exit</span>
                  <span className="text-xs text-[#c8c5ca]">Liquidation Preference: {liquidationPref}x (${(investment * liquidationPref).toFixed(1)}M off top)</span>
                </div>
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-[#a5e7ff]">Founder Takes: <strong className="text-white">${exit20.founder.toFixed(2)}M</strong></span>
                  <span className="text-[#4edea3]">VC Takes: <strong className="text-white">${exit20.vc.toFixed(2)}M</strong></span>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/5 rounded">
                <div className="flex justify-between items-center mb-2 font-mono-custom">
                  <span className="text-white font-bold">$50M Exit</span>
                  <span className="text-xs text-[#c8c5ca]">Mid-Tier Unicorn</span>
                </div>
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-[#a5e7ff]">Founder Takes: <strong className="text-white">${exit50.founder.toFixed(2)}M</strong></span>
                  <span className="text-[#4edea3]">VC Takes: <strong className="text-white">${exit50.vc.toFixed(2)}M</strong></span>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/5 rounded">
                <div className="flex justify-between items-center mb-2 font-mono-custom">
                  <span className="text-white font-bold">$100M Exit</span>
                  <span className="text-xs text-[#4edea3]">Major Liquidation Event</span>
                </div>
                <div className="flex justify-between text-xs font-mono-custom">
                  <span className="text-[#a5e7ff]">Founder Takes: <strong className="text-white">${exit100.founder.toFixed(2)}M</strong></span>
                  <span className="text-[#4edea3]">VC Takes: <strong className="text-white">${exit100.vc.toFixed(2)}M</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
