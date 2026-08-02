import React from 'react';

interface NavbarProps {
  activeTab: 'hero' | 'submit' | 'verdict' | 'portfolio' | 'burn' | 'terms';
  setActiveTab: (tab: 'hero' | 'submit' | 'verdict' | 'portfolio' | 'burn' | 'terms') => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenNotifications,
}) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#12131a]/80 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-4 sm:px-8 h-16 shadow-[0_0_40px_rgba(0,210,255,0.05)]">
      <div
        onClick={() => setActiveTab('hero')}
        className="font-bold tracking-tighter text-white text-xl sm:text-2xl cursor-pointer hover:text-[#a5e7ff] transition-colors flex items-center gap-3"
        id="nav-logo"
      >
        <img src="/logo.png" alt="Judge My Startup Logo" className="w-8 h-8 rounded-lg object-cover border border-white/10 shadow-[0_0_15px_rgba(165,231,255,0.2)]" />
        <span>JUDGE MY STARTUP</span>
      </div>

      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <button
          onClick={() => setActiveTab('hero')}
          className={`font-medium text-sm transition-colors duration-300 pb-1 ${
            activeTab === 'hero'
              ? 'text-[#a5e7ff] font-bold border-b-2 border-[#a5e7ff]'
              : 'text-[#c8c5ca] hover:text-[#a5e7ff]'
          }`}
          id="nav-hero"
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={`font-medium text-sm transition-colors duration-300 pb-1 ${
            activeTab === 'submit'
              ? 'text-[#a5e7ff] font-bold border-b-2 border-[#a5e7ff]'
              : 'text-[#c8c5ca] hover:text-[#a5e7ff]'
          }`}
          id="nav-submit"
        >
          Submission Portal
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`font-medium text-sm transition-colors duration-300 pb-1 ${
            activeTab === 'portfolio'
              ? 'text-[#a5e7ff] font-bold border-b-2 border-[#a5e7ff]'
              : 'text-[#c8c5ca] hover:text-[#a5e7ff]'
          }`}
          id="nav-portfolio"
        >
          Portfolio
        </button>
        <button
          onClick={() => setActiveTab('burn')}
          className={`font-medium text-sm transition-colors duration-300 pb-1 ${
            activeTab === 'burn'
              ? 'text-[#a5e7ff] font-bold border-b-2 border-[#a5e7ff]'
              : 'text-[#c8c5ca] hover:text-[#a5e7ff]'
          }`}
          id="nav-burn"
        >
          Burn Rate
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`font-medium text-sm transition-colors duration-300 pb-1 ${
            activeTab === 'terms'
              ? 'text-[#a5e7ff] font-bold border-b-2 border-[#a5e7ff]'
              : 'text-[#c8c5ca] hover:text-[#a5e7ff]'
          }`}
          id="nav-terms"
        >
          Term Sheets
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden lg:inline-block text-[#4edea3] font-mono-custom text-xs font-bold border border-[#4edea3]/20 bg-[#4edea3]/10 px-2.5 py-1 rounded tracking-wider">
          INVESTOR MODE: ACTIVE
        </span>

        <button
          onClick={onOpenNotifications}
          className="text-[#c8c5ca] hover:text-white transition-colors p-1"
          title="Notifications"
          id="btn-notifications"
        >
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="text-[#c8c5ca] hover:text-white transition-colors p-1"
          title="System Settings"
          id="btn-settings"
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer hover:border-[#a5e7ff] transition-all">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQJxmZGnsjIRclYub8yV041QJ4olloQcdBXSug1VmO9y2mRky6iTb6y-aB6hQL57oSWG0_hJdXThcNNAT6d6Xkww9KGYWTfSpYUCNZzwCBR5POGOLV57oTNz2Utfa4EWXcJnhRnQ5WIMnt2BcqpOwuvCclw413Mdb3zAJr-JjCWDjwrWrbRH_vpnOO1HeGUpKaB_A1LyUyiqqLcw-dxJ_OdLKH0AsWoxG0sKdR9-0BcmT41or4K9I"
            alt="VC Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};
