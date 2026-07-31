export type Stage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Growth';

export interface StartupPitch {
  id?: string;
  name: string;
  tagline?: string;
  stage: Stage;
  industry: string;
  summary: string;
  tam?: string;
  unitEconomics?: string;
  moat?: string;
  burnRateMonthly?: string;
  cashOnHand?: string;
  deckFileName?: string;
  deckContent?: string;
  livePitchTranscript?: string;
}

export interface InvestorFeedItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  text: string;
}

export interface RoastResult {
  id: string;
  startupName: string;
  stage: string;
  caseId: string;
  outcome: 'REJECTED' | 'CONDITIONALLY_PASSED' | 'PASSED';
  healthScore: number; // 0 - 100
  healthSummary: string;
  riskLevelPercentage: number; // e.g. 98
  riskVerdict: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  riskQuote: string;
  moatScore: number; // e.g. 0.2
  moatRoast: string;
  delusionIndex: 'LOW' | 'MODERATE' | 'HIGH' | 'MAX';
  selfAwareness: string;
  tamHallucination: string;
  egoInflation: string;
  burnPredictionMonths: number;
  burnDepletionDate: string;
  chips: string[];
  investorFeed: InvestorFeedItem[];
  breakingNews: {
    title: string;
    text: string;
    image?: string;
  };
  termSheetData: {
    preMoney: string;
    exitFee: string;
    boardControl: string;
    vesting: string;
  };
  brutalBreakdown: Array<{
    category: string;
    critique: string;
    severity: 'CRITICAL' | 'WARNING' | 'MINOR';
  }>;
  createdAt: string;
}

export interface TermSheetSimState {
  preMoney: number; // Millions
  investmentAmount: number; // Millions
  optionPool: number; // %
  liquidationPref: number; // 1x, 2x, 3x
  boardSeatsVc: number;
  boardSeatsFounder: number;
  vestingYears: number;
}
