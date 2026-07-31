import React, { useState } from 'react';
import { BackgroundShader } from './components/BackgroundShader';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroScreen } from './components/HeroScreen';
import { SubmissionPortal } from './components/SubmissionPortal';
import { VerdictDashboard } from './components/VerdictDashboard';
import { PortfolioRoastGallery } from './components/PortfolioRoastGallery';
import { TermSheetSimulator } from './components/TermSheetSimulator';
import { BurnRateCalculator } from './components/BurnRateCalculator';
import { RequestCapitalModal } from './components/RequestCapitalModal';
import { ShareRoastModal } from './components/ShareRoastModal';
import { SettingsModal } from './components/SettingsModal';
import { NotificationsModal } from './components/NotificationsModal';

import { StartupPitch, RoastResult } from './types';
import { ICARUS_ROAST } from './data/presetStartups';

export default function App() {
  const [activeTab, setActiveTab] = useState<'hero' | 'submit' | 'verdict' | 'portfolio' | 'burn' | 'terms'>('hero');
  const [currentRoast, setCurrentRoast] = useState<RoastResult>(ICARUS_ROAST);
  const [customRoasts, setCustomRoasts] = useState<RoastResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [strictness, setStrictness] = useState('cold');

  // Modal states
  const [isRequestCapitalOpen, setIsRequestCapitalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Handle Pitch Submission via Express + Gemini 3.6 Flash Server API
  const handleSubmitPitch = async (pitch: StartupPitch) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pitch, strictness }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result: RoastResult = await response.json();
      setCurrentRoast(result);
      setCustomRoasts((prev) => [result, ...prev]);
      setActiveTab('verdict');
    } catch (err: any) {
      console.error('Failed to submit pitch:', err);
      // Fallback local roast generation if offline
      const fallbackResult: RoastResult = {
        id: `roast-err-${Date.now()}`,
        startupName: pitch.name || 'Project Unnamed',
        stage: pitch.stage || 'Seed',
        caseId: `#VC-${Math.floor(1000 + Math.random() * 9000)}-ALPHA`,
        outcome: 'REJECTED',
        healthScore: 12,
        healthSummary: `Your pitch for ${pitch.name} in ${pitch.industry || 'Tech'} exhibits critical operational defects. Unit economics are purely theoretical and burn rate leads straight to insolvency.`,
        riskLevelPercentage: 98,
        riskVerdict: 'EXTREME',
        riskQuote: '"Investing here is less like a \'gamble\' and more like a \'sacrifice\'."',
        moatScore: 0.2,
        moatRoast: 'ROAST: YOUR MOAT APPEARS TO BE A LOGIN PAGE.',
        delusionIndex: 'MAX',
        selfAwareness: '-- ERROR --',
        tamHallucination: 'High',
        egoInflation: '12.4x',
        burnPredictionMonths: 3.4,
        burnDepletionDate: 'Oct 14, 2026',
        chips: ['Negative EBITDA', 'High Churn', 'No CAC Efficiency'],
        investorFeed: [
          {
            id: 'err-tw-1',
            author: 'Navalita G.',
            handle: '@angel_logic',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDauYoBTzPFzWDawIUw0C1-NkQ_KWwSm4lhZ06m_ESycNrpL61td7-WOXS5j3QWI6bjvgjUMDHXlY-oHYT212Nl7D0nwdnSs2FlHGl_kqNhtY3hERcjJdhpcwz9x38QbeqVT8FXJooaoGxpk2lnuN_BvpRdtu-Qn4c2sIxU0aPmCGzZK0hDMck7IT3BEnLoh_wEIGjxWivjQYoGb7JWYye6v15qXPWSyTpY2WyZqf48rc8VINgAr8I',
            time: 'Just now',
            text: `Just reviewed ${pitch.name}. The unit economics make WeWork look like a savings account.`
          }
        ],
        breakingNews: {
          title: 'Founder Spotted Crying In Metaverse',
          text: 'Witnesses say avatar threw digital disruption tokens into a virtual ocean after today\'s pitch failure.'
        },
        termSheetData: {
          preMoney: '$1.0M',
          exitFee: '25%',
          boardControl: 'Total',
          vesting: '10 Years'
        },
        brutalBreakdown: [
          { category: 'Unit Economics', critique: 'Losing money on every active user with no clear path to scale.', severity: 'CRITICAL' }
        ],
        createdAt: new Date().toISOString()
      };
      setCurrentRoast(fallbackResult);
      setCustomRoasts((prev) => [fallbackResult, ...prev]);
      setActiveTab('verdict');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRoastFromGallery = (roast: RoastResult) => {
    setCurrentRoast(roast);
    setActiveTab('verdict');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#e3e1ec] relative font-sans selection:bg-[#a5e7ff] selection:text-[#003543]">
      {/* Background WebGL Shader Canvas */}
      <BackgroundShader />

      {/* Navigation Bars */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRequestCapital={() => setIsRequestCapitalOpen(true)}
      />

      {/* Main View Router */}
      <main className="relative z-10 min-h-[calc(100vh-64px)]">
        {activeTab === 'hero' && (
          <HeroScreen
            onStartRoast={() => setActiveTab('submit')}
            onViewRecentRoasts={() => setActiveTab('portfolio')}
            onSelectSampleRoast={handleSelectRoastFromGallery}
            latestRoast={currentRoast}
          />
        )}

        {activeTab === 'submit' && (
          <SubmissionPortal
            onSubmitPitch={handleSubmitPitch}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'verdict' && (
          <VerdictDashboard
            roast={currentRoast}
            onShareRoast={() => setIsShareOpen(true)}
            onNewPitch={() => setActiveTab('submit')}
            onOpenTermSheetSim={() => setActiveTab('terms')}
            onOpenBurnCalc={() => setActiveTab('burn')}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioRoastGallery
            customRoasts={customRoasts}
            onSelectRoast={handleSelectRoastFromGallery}
          />
        )}

        {activeTab === 'terms' && (
          <TermSheetSimulator onClose={() => setActiveTab('verdict')} />
        )}

        {activeTab === 'burn' && (
          <BurnRateCalculator onClose={() => setActiveTab('verdict')} />
        )}
      </main>

      {/* Interactive Modals */}
      <RequestCapitalModal
        isOpen={isRequestCapitalOpen}
        onClose={() => setIsRequestCapitalOpen(false)}
      />

      <ShareRoastModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        roast={currentRoast}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        strictness={strictness}
        setStrictness={setStrictness}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
