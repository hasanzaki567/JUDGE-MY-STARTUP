import React, { useState } from 'react';

interface BurnRateCalculatorProps {
  onClose?: () => void;
}

export const BurnRateCalculator: React.FC<BurnRateCalculatorProps> = ({ onClose }) => {
  const [cashInBank, setCashInBank] = useState(450000); // $450,000
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000); // $15,000
  const [grossMargin, setGrossMargin] = useState(65); // 65%
  const [payroll, setPayroll] = useState(85000); // $85,000
  const [cloudCosts, setCloudCosts] = useState(18000); // $18,000
  const [marketing, setMarketing] = useState(22000); // $22,000
  const [legalOther, setLegalOther] = useState(8000); // $8,000

  const netRevenue = monthlyRevenue * (grossMargin / 100);
  const totalOperatingExpenses = payroll + cloudCosts + marketing + legalOther;
  const netBurnRate = totalOperatingExpenses - netRevenue;

  const runwayMonths = netBurnRate > 0 ? (cashInBank / netBurnRate) : 999;

  // Calculate projected date
  const now = new Date();
  const deathDate = new Date(now.getTime() + (runwayMonths > 120 ? 120 : runwayMonths) * 30 * 24 * 60 * 60 * 1000);
  const deathDateStr = deathDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12 max-w-[1400px] mx-auto relative z-10">
      <header className="mb-8 border-b border-white/5 pb-6 flex justify-between items-start">
        <div>
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 mb-2 font-mono-custom text-xs text-[#ffb4ab] tracking-widest uppercase">
            CALCULATOR TOOL
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Burn Rate & Death Date Modeler</h1>
          <p className="text-[#c8c5ca] text-sm mt-1">
            Simulate cash depletion, payroll scaling, and exact date when your startup runs out of money.
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
        {/* Controls */}
        <div className="lg:col-span-5 space-y-5 glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white border-b border-white/5 pb-3">Financial Inputs</h3>

          <div>
            <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Cash in Bank ($)</label>
            <input
              type="number"
              value={cashInBank}
              onChange={(e) => setCashInBank(Number(e.target.value))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Monthly Revenue ($)</label>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Gross Margin (%)</label>
              <input
                type="number"
                value={grossMargin}
                onChange={(e) => setGrossMargin(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Monthly Payroll / Salaries ($)</label>
            <input
              type="number"
              value={payroll}
              onChange={(e) => setPayroll(Number(e.target.value))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Server & API Costs ($)</label>
              <input
                type="number"
                value={cloudCosts}
                onChange={(e) => setCloudCosts(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Marketing / CAC ($)</label>
              <input
                type="number"
                value={marketing}
                onChange={(e) => setMarketing(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-xl border-l-4 border-[#ffb4ab]">
            <div className="text-xs font-mono-custom text-[#ffb4ab] uppercase tracking-widest mb-1">
              FINANCIAL DEATH DATE PROLECTION
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {runwayMonths > 120 ? 'Infinite (Profitable)' : `${runwayMonths.toFixed(1)} Months`}
            </div>
            <p className="text-[#c8c5ca] font-mono-custom text-sm mb-6">
              Estimated Insolvency Date: <strong className="text-[#ffb4ab]">{deathDateStr}</strong>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-custom text-xs">
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Monthly Net Burn</span>
                <span className="text-base font-bold text-[#ffb4ab]">${netBurnRate.toLocaleString()}/mo</span>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Total Expenses</span>
                <span className="text-base font-bold text-white">${totalOperatingExpenses.toLocaleString()}/mo</span>
              </div>
              <div className="p-3 bg-black/40 rounded border border-white/5">
                <span className="text-[#c8c5ca] block text-[10px]">Net Margin</span>
                <span className="text-base font-bold text-[#4edea3]">${netRevenue.toLocaleString()}/mo</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Expense Breakdown</h3>
            <div className="space-y-3 font-mono-custom text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[#c8c5ca]">Payroll & Salaries</span>
                  <span className="text-white">${payroll.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded overflow-hidden">
                  <div className="h-full bg-[#a5e7ff]" style={{ width: `${(payroll / totalOperatingExpenses) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[#c8c5ca]">Cloud / Server Infrastructure</span>
                  <span className="text-white">${cloudCosts.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded overflow-hidden">
                  <div className="h-full bg-[#4edea3]" style={{ width: `${(cloudCosts / totalOperatingExpenses) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[#c8c5ca]">Marketing & Customer Acquisition</span>
                  <span className="text-white">${marketing.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded overflow-hidden">
                  <div className="h-full bg-[#ffb4ab]" style={{ width: `${(marketing / totalOperatingExpenses) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
