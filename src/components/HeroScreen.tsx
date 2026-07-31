import React from 'react';
import { RoastResult } from '../types';

interface HeroScreenProps {
  onStartRoast: () => void;
  onViewRecentRoasts: () => void;
  onSelectSampleRoast: (roast: RoastResult) => void;
  latestRoast?: RoastResult;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({
  onStartRoast,
  onViewRecentRoasts,
  onSelectSampleRoast,
  latestRoast,
}) => {
  return (
    <div className="lg:ml-64 pt-24 sm:pt-28 px-4 sm:px-8 pb-16 relative z-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-block px-3.5 py-1 rounded-full border border-[#a5e7ff]/20 bg-[#a5e7ff]/5 text-[#a5e7ff] font-mono-custom text-xs mb-6 uppercase tracking-widest animate-pulse">
          System Status: Coldly Analytical
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter">
          Every founder thinks they're building the <span className="text-[#a5e7ff]">next unicorn.</span> Let's find out.
        </h1>

        <p className="text-lg sm:text-xl text-[#c8c5ca] mb-8 max-w-2xl mx-auto leading-relaxed">
          Pitch your startup to an AI investor that has absolutely no reason to be nice. No VC fluff, no polite rejections. Just the brutal truth.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            onClick={onStartRoast}
            className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#313032] font-bold text-lg sm:text-xl rounded-none hover:bg-[#a5e7ff] transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            id="btn-hero-judge"
          >
            <span>🔥</span>
            <span>Judge My Startup</span>
          </button>

          <button
            onClick={onViewRecentRoasts}
            className="px-8 sm:px-10 py-4 sm:py-5 border border-white/20 bg-transparent text-white font-bold text-lg sm:text-xl hover:bg-white/5 transition-all active:scale-95"
            id="btn-hero-view-roasts"
          >
            View Recent Roasts
          </button>
        </div>
      </section>

      {/* Live Roast Feed Ticker */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-10 sm:my-12">
        <div className="ticker-wrap py-3 bg-[#1a1b22]/80 backdrop-blur-sm">
          <div className="ticker-content flex gap-8 items-center">
            {/* Ticker items repeated for smooth infinite scroll */}
            {[1, 2].map((group) => (
              <div key={group} className="flex items-center gap-8">
                <span className="text-[#c8c5ca] font-mono-custom text-sm">
                  <span className="text-[#ffb4ab] font-bold">ROASTED:</span> "Uber for Goldfish" - Zero addressable market.
                </span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                <span className="text-[#c8c5ca] font-mono-custom text-sm">
                  <span className="text-[#ffb4ab] font-bold">ROASTED:</span> "Blockchain Coffee" - Solve a real problem.
                </span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                <span className="text-[#c8c5ca] font-mono-custom text-sm">
                  <span className="text-[#ffb4ab] font-bold">ROASTED:</span> "AI Prompt Agency" - Marginalized in 6 months.
                </span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                <span className="text-[#c8c5ca] font-mono-custom text-sm">
                  <span className="text-[#4edea3] font-bold">PASSED:</span> "Nuclear Waste Logistics" - High barrier, high reward.
                </span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                <span className="text-[#c8c5ca] font-mono-custom text-sm">
                  <span className="text-[#ffb4ab] font-bold">ROASTED:</span> "Tinder for Co-Founders" - Double rejection rate.
                </span>
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Card 1: Predictive Failure Modeling */}
        <div className="glass-card p-6 sm:p-8 flex flex-col col-span-1 md:col-span-2 relative overflow-hidden group rounded-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <span className="material-symbols-outlined text-8xl sm:text-9xl text-white">analytics</span>
          </div>
          <div className="text-[#4edea3] font-mono-custom text-xs mb-3 uppercase tracking-[0.2em] font-semibold">
            Institutional Analysis
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            Predictive Failure Modeling
          </h3>
          <p className="text-[#c8c5ca] text-base mb-8 max-w-lg leading-relaxed">
            We don't just tell you that your idea sucks. We simulate 10,000 market scenarios where your burn rate exceeds your ARR by 400%.
          </p>

          <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-[#12131a] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq-S_XKFZlTyJlRfPS_4zPbIseMMHzVxAtfUOjBIZ_fGGzOc2oU7txIMFsPksBsYyRrCbYkQk_KQoyEW58KjPpN9RUG9JOx6LT5qfrqan5NuqquRSHvGxGLZTVxINd-UnQ-wtOOgRsdyjhDcHYF4449TGYUcLm6aHsl4nBjLZ7YvmUwnfJVUopf0bZWrDTUpM7DYXXL-cJ3ksriUcBhUGQtlN_F9vm6Y295N5PjkcuJN3z1VAAvks"
                alt="Founder 1"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-[#12131a] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuB83DJGOTz5wAisjrXZg4nDBXADgOTNolYUp_tOhgS8TFsMKgF7_tSN2lhpCZL4WI2xTFJ2U7BUZvTJY-wXRihcGws7eELBJHIg0W8MzaNkEpGZ370SUpkE_VlqpMFBrSFvuQQFlUzIleXrfrNp2hofeq7K2YbeHvb4-rc6-oDfNiT8tYucFL7FtYozkehbQ1YT0F1HEjtsWZ3t17ZwpMl7SOT8q1eI-r3VKzP_7A38as_0es8TQ"
                alt="Founder 2"
              />
              <div className="w-10 h-10 rounded-full border-2 border-[#12131a] flex items-center justify-center text-xs font-mono-custom font-bold bg-[#a5e7ff]/20 text-[#a5e7ff]">
                +4k
              </div>
            </div>
            <span className="text-[#c8c5ca] font-mono-custom text-xs sm:text-sm">Founders Roasted Today</span>
          </div>
        </div>

        {/* Card 2: The Brutal Median Gauge */}
        <div className="glass-card p-6 sm:p-8 flex flex-col justify-center items-center text-center rounded-xl">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="6"></circle>
              <circle
                cx="50"
                cy="50"
                fill="none"
                r="42"
                stroke="#4edea3"
                strokeDasharray="264"
                strokeDashoffset="200"
                strokeLinecap="round"
                strokeWidth="6"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-bold text-[#4edea3]">2.4</span>
              <span className="text-[#c8c5ca] font-mono-custom uppercase text-[10px] tracking-widest mt-1">Avg. Score</span>
            </div>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">The Brutal Median</h4>
          <p className="text-[#c8c5ca] text-xs sm:text-sm leading-relaxed">
            Most startups fail here. If you score above 7.0, we'll actually connect you to a human. Maybe.
          </p>
        </div>

        {/* Card 3: Critical Reject Status */}
        <div className="glass-card p-6 sm:p-8 border-l-4 border-[#ffb4ab] rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-[#ffb4ab] text-3xl">gavel</span>
              <span className="bg-[#ffb4ab]/10 text-[#ffb4ab] text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider rounded">
                Critical Reject
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono-custom mb-1.5">
                  <span className="text-[#c8c5ca]">Arrogance Index</span>
                  <span className="text-[#ffb4ab] font-bold">94%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffb4ab] w-[94%] shadow-[0_0_10px_rgba(255,180,171,0.5)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono-custom mb-1.5">
                  <span className="text-[#c8c5ca]">Market Utility</span>
                  <span className="text-[#a5e7ff] font-bold">12%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a5e7ff] w-[12%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[#c8c5ca] font-mono-custom italic text-xs leading-relaxed">
            "I've seen better pitch decks from toddlers selling imaginary lemonade."
          </div>
        </div>

        {/* Card 4: Term Sheet Simulator */}
        <div className="glass-card p-6 sm:p-8 col-span-1 md:col-span-2 bg-gradient-to-br from-[#1e1f26]/40 to-transparent rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#a5e7ff] text-2xl">monitoring</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Term Sheet Simulator</h4>
              <p className="text-[#c8c5ca] text-xs sm:text-sm">Real-time dilution and liquidation preference modeling.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 bg-black/30 border border-white/5 rounded">
              <div className="text-[10px] text-[#c8c5ca] uppercase tracking-wider mb-1">Pre-Money</div>
              <div className="font-mono-custom text-[#a5e7ff] text-base sm:text-lg font-bold">$1.2M</div>
            </div>
            <div className="p-3.5 bg-black/30 border border-white/5 rounded">
              <div className="text-[10px] text-[#c8c5ca] uppercase tracking-wider mb-1">Exit Fee</div>
              <div className="font-mono-custom text-[#a5e7ff] text-base sm:text-lg font-bold">20%</div>
            </div>
            <div className="p-3.5 bg-black/30 border border-white/5 rounded">
              <div className="text-[10px] text-[#c8c5ca] uppercase tracking-wider mb-1">Board Control</div>
              <div className="font-mono-custom text-[#a5e7ff] text-base sm:text-lg font-bold">Total</div>
            </div>
            <div className="p-3.5 bg-black/30 border border-white/5 rounded">
              <div className="text-[10px] text-[#c8c5ca] uppercase tracking-wider mb-1">Vesting</div>
              <div className="font-mono-custom text-[#a5e7ff] text-base sm:text-lg font-bold">10 Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto mt-12 sm:mt-16 py-10 sm:py-12 text-center relative overflow-hidden px-6 sm:px-8 rounded-2xl border border-white/5 bg-[#1a1b22]/30 backdrop-blur-md">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#a5e7ff]/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#4edea3]/10 blur-[80px] rounded-full pointer-events-none"></div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready for the ego death?</h2>
        <p className="text-[#c8c5ca] text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Join 14,000 founders who took the roast and emerged with a slightly more realistic view of the market. Or just a bruised ego.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="relative group w-full sm:w-auto">
            <div className="absolute inset-0 bg-[#a5e7ff] blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded"></div>
            <button
              onClick={onStartRoast}
              className="relative w-full sm:w-auto px-10 py-4 bg-[#a5e7ff] text-[#003543] font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl"
              id="btn-ego-death-roast"
            >
              BEGIN THE ROAST
            </button>
          </div>
          <span className="text-[#c8c5ca] font-mono-custom text-xs">Cost: $0.00 (Your dignity only)</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 border-t border-white/5 pt-10 pb-12 grid grid-cols-1 md:grid-cols-4 gap-8 opacity-70 hover:opacity-100 transition-opacity">
        <div className="col-span-1 md:col-span-2">
          <div className="text-lg font-bold tracking-tighter text-white mb-3">JUDGE MY STARTUP</div>
          <p className="text-[#c8c5ca] text-xs sm:text-sm max-w-xs leading-relaxed">
            Built for the 1%. Not the 1% of earners, the 1% of founders who actually have a shot.
          </p>
        </div>

        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Protocol</h5>
          <ul className="space-y-2 text-[#c8c5ca] text-xs font-mono-custom">
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">Roast Engine v4.2</a></li>
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">Lying Detection</a></li>
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">VC Buzzword Filter</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Terminal</h5>
          <ul className="space-y-2 text-[#c8c5ca] text-xs font-mono-custom">
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">System Status</a></li>
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">Security Log</a></li>
            <li><a href="#" className="hover:text-[#a5e7ff] transition-colors">Legal Disclaimer</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
