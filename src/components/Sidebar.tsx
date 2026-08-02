import React from 'react';

interface SidebarProps {
  activeTab: 'hero' | 'submit' | 'verdict' | 'portfolio' | 'burn' | 'terms';
  setActiveTab: (tab: 'hero' | 'submit' | 'verdict' | 'portfolio' | 'burn' | 'terms') => void;
  onRequestCapital: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onRequestCapital,
}) => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-[#0d0e15]/50 backdrop-blur-md border-r border-white/5 flex flex-col py-6 hidden lg:flex z-40">
      <div className="px-6 mb-6">
        <div className="font-bold text-lg text-white tracking-tight">MARKET PULSE</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse"></div>
          <span className="font-mono-custom text-xs text-[#ffb4ab] uppercase tracking-widest font-semibold">
            Fear Index: Extreme
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <button
          onClick={() => setActiveTab('hero')}
          className={`w-full flex items-center px-6 py-3 transition-all text-left group ${
            activeTab === 'hero'
              ? 'bg-[#33343c]/80 text-[#4edea3] font-bold border-l-2 border-[#4edea3]'
              : 'text-[#c8c5ca] hover:bg-white/5'
          }`}
          id="side-headlines"
        >
          <span className="material-symbols-outlined mr-3">newspaper</span>
          <span className="text-sm font-medium">Headlines</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`w-full flex items-center px-6 py-3 transition-all text-left group ${
            activeTab === 'portfolio'
              ? 'bg-[#33343c]/80 text-[#4edea3] font-bold border-l-2 border-[#4edea3]'
              : 'text-[#c8c5ca] hover:bg-white/5'
          }`}
          id="side-market-crash"
        >
          <span className="material-symbols-outlined mr-3">trending_down</span>
          <span className="text-sm font-medium">Market Crash</span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          className={`w-full flex items-center px-6 py-3 transition-all text-left group ${
            activeTab === 'submit'
              ? 'bg-[#33343c]/80 text-[#4edea3] font-bold border-l-2 border-[#4edea3]'
              : 'text-[#c8c5ca] hover:bg-white/5'
          }`}
          id="side-hype-cycle"
        >
          <span className="material-symbols-outlined mr-3">trending_up</span>
          <span className="text-sm font-medium">Hype Cycle</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`w-full flex items-center px-6 py-3 transition-all text-left group ${
            activeTab === 'terms'
              ? 'bg-[#33343c]/80 text-[#4edea3] font-bold border-l-2 border-[#4edea3]'
              : 'text-[#c8c5ca] hover:bg-white/5'
          }`}
          id="side-exit-strategy"
        >
          <span className="material-symbols-outlined mr-3">exit_to_app</span>
          <span className="text-sm font-medium">Exit Strategy</span>
        </button>
      </nav>

      <div className="px-6 mt-auto">
        <button
          onClick={onRequestCapital}
          className="w-full py-3 mb-6 bg-[#0d0e15] border border-[#4edea3]/40 text-[#4edea3] font-bold tracking-widest text-xs uppercase hover:bg-[#4edea3]/10 transition-all active:scale-95 shadow-[0_0_15px_rgba(78,222,166,0.1)]"
          id="btn-request-capital"
        >
          REQUEST CAPITAL
        </button>

        <div className="flex gap-4 pb-2 border-t border-white/5 pt-4">
          <div className="flex items-center text-[#c8c5ca] text-xs font-mono-custom">
            <span className="material-symbols-outlined text-sm mr-1 text-[#4edea3]">sensors</span> Status
          </div>
          <div className="flex items-center text-[#c8c5ca] text-xs font-mono-custom">
            <span className="material-symbols-outlined text-sm mr-1 text-[#a5e7ff]">code</span> API v4.2
          </div>
        </div>
      </div>
    </aside>
  );
};
