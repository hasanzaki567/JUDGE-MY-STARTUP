import { RoastResult, StartupPitch } from '../types';

export const ICARUS_ROAST: RoastResult = {
  id: 'icarus-01',
  startupName: 'Project Icarus',
  stage: 'Series A',
  caseId: '#VC-9928-ALPHA',
  outcome: 'REJECTED',
  healthScore: 14,
  healthSummary: 'Your operational vitals are flatlining. The unit economics are fictional, and the retention curve resembles a waterfall. Seek medical attention or a bank loan immediately.',
  riskLevelPercentage: 98,
  riskVerdict: 'EXTREME',
  riskQuote: '"Investing here is less like a \'gamble\' and more like a \'sacrifice\'."',
  moatScore: 0.2,
  moatRoast: 'ROAST: YOUR MOAT APPEARS TO BE A LOGIN PAGE.',
  delusionIndex: 'MAX',
  selfAwareness: '-- ERROR --',
  tamHallucination: 'High',
  egoInflation: '11.4x',
  burnPredictionMonths: 4.2,
  burnDepletionDate: 'Sept 14, 2026',
  chips: ['Negative EBITDA', 'Churn Rate: 42%', 'No CAC Efficiency'],
  investorFeed: [
    {
      id: 'tweet-1',
      author: 'Navalita G.',
      handle: '@angel_logic',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDauYoBTzPFzWDawIUw0C1-NkQ_KWwSm4lhZ06m_ESycNrpL61td7-WOXS5j3QWI6bjvgjUMDHXlY-oHYT212Nl7D0nwdnSs2FlHGl_kqNhtY3hERcjJdhpcwz9x38QbeqVT8FXJooaoGxpk2lnuN_BvpRdtu-Qn4c2sIxU0aPmCGzZK0hDMck7IT3BEnLoh_wEIGjxWivjQYoGb7JWYye6v15qXPWSyTpY2WyZqf48rc8VINgAr8I',
      time: '2h',
      text: 'Just saw a deck where the "Market Opportunity" was literally the entire population of Earth including infants. We are so back. 📉'
    },
    {
      id: 'tweet-2',
      author: 'VC Intern #42',
      handle: '@coffee_runner',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkS5RlPA_2dnHpcJWAIgAwpLEvQwEd5FJlcPHW_A_Y3iD8WzUA8q_5nqzKUG1KhIPfYajYL3WAaGwvLlzgxRfv9nIwf4eYQV6nHgVxcgq0Fz9gYpZXShDEqJjdUZcx3qoUJ646lSqwBQo1MvjeU3gNk4cq9FzdNe-SJ8Ams5XXGGhprqOZjF3gcR_QnmcR70NLNibLzeFreOqDUaVo-s9yMXHon4ugXVYYOyYa9bUTo_VsMgcRVY',
      time: '5h',
      text: 'Founder tried to pivot to AI during the 3rd minute of the demo when the app crashed. Respect the hustle, fear the burn rate.'
    },
    {
      id: 'tweet-3',
      author: 'Garry T.',
      handle: '@yc_ghost',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq-S_XKFZlTyJlRfPS_4zPbIseMMHzVxAtfUOjBIZ_fGGzOc2oU7txIMFsPksBsYyRrCbYkQk_KQoyEW58KjPpN9RUG9JOx6LT5qfrqan5NuqquRSHvGxGLZTVxINd-UnQ-wtOOgRsdyjhDcHYF4449TGYUcLm6aHsl4nBjLZ7YvmUwnfJVUopf0bZWrDTUpM7DYXXL-cJ3ksriUcBhUGQtlN_F9vm6Y295N5PjkcuJN3z1VAAvks',
      time: '8h',
      text: 'If your "AI secret sauce" is an API key wrapper around GPT-4 with a dark mode toggle, you don\'t have a startup, you have a browser tab.'
    }
  ],
  breakingNews: {
    title: 'Local Founder Spotted Crying in Meta-Verse',
    text: 'Witnesses say the avatar was seen throwing digital \'disruption\' tokens into a virtual ocean after today\'s pitch failure.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBigKBcFGt9dCCOU21WU-YmJ_X37uqMsMNqqi8qOGxSs4-xdh42aw6FdegDorPZ2QLknd9EllYvYYcRitnMWxT7X5MWP6ijynvfE6qT0iVayj9-CPAegL9WXsHkqAiy_4PFgNLT74B9H6VRgDxpnGPsDB4GZJIC8DEtGWWl5XcT0YLYTdYcz86Kg2yA8KQD-Pla3-r9PHo-ixSatToC0EncEK8-uYKoDgWmd5JMb2-WH8hkBoiFvJo'
  },
  termSheetData: {
    preMoney: '$1.2M',
    exitFee: '20%',
    boardControl: 'Total',
    vesting: '10 Years'
  },
  brutalBreakdown: [
    {
      category: 'Unit Economics',
      critique: 'You lose $14 on every active user acquired. Volume won\'t save you; it just accelerates your bankruptcy.',
      severity: 'CRITICAL'
    },
    {
      category: 'Market Opportunity',
      critique: 'Claiming a $400B TAM because "everyone with a phone is a customer" is an automatic term sheet revocation.',
      severity: 'CRITICAL'
    },
    {
      category: 'Technical Defensibility',
      critique: 'Zero proprietary IP. Any weekend hackathon team can replicate your entire product before Sunday brunch.',
      severity: 'WARNING'
    }
  ],
  createdAt: '2026-07-31T10:00:00Z'
};

export const SAMPLE_PITCHES: StartupPitch[] = [
  {
    id: 'sample-1',
    name: 'Project Icarus',
    tagline: 'Autonomous AI VC Pitch Deck Synthesizer',
    stage: 'Series A',
    industry: 'Enterprise Software / AI',
    summary: 'Autonomous AI agent that creates pitch decks for founders by scraping twitter threads and generating 40-page PDFs nobody will read.',
    tam: '$500 Billion Global Startup Market',
    unitEconomics: 'CAC: $450, LTV: $22 (negative gross margin)',
    moat: 'Proprietary prompts and custom dark mode CSS theme.',
    burnRateMonthly: '$120,000',
    cashOnHand: '$500,000'
  },
  {
    id: 'sample-2',
    name: 'GoldfishAI',
    tagline: 'Uber for Goldfish & Aquatic Emotion Analytics',
    stage: 'Pre-Seed',
    industry: 'Pet Tech / Hardware',
    summary: 'Smart aquatic fishbowl with neural sensors tracking goldfish anxiety and offering on-demand goldfish walking via gig workers.',
    tam: '$80B Pet Care Market',
    unitEconomics: '$2 per ride, hardware cost $850 per unit.',
    moat: 'Patented water-proof Bluetooth fish collar.',
    burnRateMonthly: '$45,000',
    cashOnHand: '$90,000'
  },
  {
    id: 'sample-3',
    name: 'ChainBrew',
    tagline: 'Web3 Decentralized Espresso Protocol',
    stage: 'Seed',
    industry: 'Web3 / Beverage',
    summary: 'Tokenized espresso machines where coffee extraction requires staking $BREW tokens on-chain to unlock milk frothing capabilities.',
    tam: '$110B Specialty Coffee Market',
    unitEconomics: '$8 gas fee per double espresso shot.',
    moat: 'Liquidity pool for oat milk providers.',
    burnRateMonthly: '$80,000',
    cashOnHand: '$210,000'
  },
  {
    id: 'sample-4',
    name: 'NuclearWaste Logistics',
    tagline: 'Automated Transport & Storage for Clean Energy Byproducts',
    stage: 'Seed',
    industry: 'Clean Energy / Hardtech',
    summary: 'Standardized robotic cask transport protocol and regulatory compliance engine for modular nuclear reactor waste streams.',
    tam: '$42B Nuclear Lifecycle Management Market',
    unitEconomics: '72% Gross Margin per cask deployment, long-term government contracts.',
    moat: 'NRC regulatory approvals and deep nuclear physics engineering moat.',
    burnRateMonthly: '$150,000',
    cashOnHand: '$3,200,000'
  }
];

export const RECENT_ROASTS_LIST: RoastResult[] = [
  ICARUS_ROAST,
  {
    id: 'roast-02',
    startupName: 'GoldfishAI',
    stage: 'Pre-Seed',
    caseId: '#VC-8841-BETA',
    outcome: 'REJECTED',
    healthScore: 6,
    healthSummary: 'Your business model relies on goldfish having disposable income and gig workers carrying fish bowls on scooters in rainstorms.',
    riskLevelPercentage: 99,
    riskVerdict: 'EXTREME',
    riskQuote: '"This pitch makes WeWork look like Berkshire Hathaway."',
    moatScore: 0.1,
    moatRoast: 'ROAST: A FISH NET HAS A STRONGER MOAT THAN YOUR SOFTWARE.',
    delusionIndex: 'MAX',
    selfAwareness: '0%',
    tamHallucination: 'Extreme',
    egoInflation: '24.0x',
    burnPredictionMonths: 1.8,
    burnDepletionDate: 'August 28, 2026',
    chips: ['Negative Margin', 'Extreme Churn', 'Legal Liability'],
    investorFeed: [
      {
        id: 'tw-201',
        author: 'Silicon Valley Insider',
        handle: '@sv_leaks',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuB83DJGOTz5wAisjrXZg4nDBXADgOTNolYUp_tOhgS8TFsMKgF7_tSN2lhpCZL4WI2xTFJ2U7BUZvTJY-wXRihcGws7eELBJHIg0W8MzaNkEpGZ370SUpkE_VlqpMFBrSFvuQQFlUzIleXrfrNp2hofeq7K2YbeHvb4-rc6-oDfNiT8tYucFL7FtYozkehbQ1YT0F1HEjtsWZ3t17ZwpMl7SOT8q1eI-r3VKzP_7A38as_0es8TQ',
        time: '1d',
        text: 'A pitch deck just claimed Goldfish are an underserved $80B TAM because "they get lonely during zoom calls". VC partner left the room.'
      }
    ],
    breakingNews: {
      title: 'PETA Issues Cease & Desist To Goldfish Uber',
      text: 'Spokesperson states carrying bowls on e-scooters breaks both physics and animal rights.'
    },
    termSheetData: {
      preMoney: '$300K',
      exitFee: '50%',
      boardControl: 'Total',
      vesting: '20 Years'
    },
    brutalBreakdown: [
      { category: 'Feasibility', critique: 'Water splashes out of containers at 15mph.', severity: 'CRITICAL' },
      { category: 'Customer Need', critique: 'Goldfish memory lasts 3 seconds, meaning they forget your app immediately.', severity: 'CRITICAL' }
    ],
    createdAt: '2026-07-30T14:20:00Z'
  },
  {
    id: 'roast-03',
    startupName: 'NuclearWaste Logistics',
    stage: 'Seed',
    caseId: '#VC-1042-PASS',
    outcome: 'PASSED',
    healthScore: 82,
    healthSummary: 'High barrier to entry, real regulatory clearances, and strong unit margins. We hate that we actually like this.',
    riskLevelPercentage: 42,
    riskVerdict: 'MODERATE',
    riskQuote: '"Finally, someone solving a problem harder than building a todo list wrapper."',
    moatScore: 8.8,
    moatRoast: 'MOAT VERIFIED: HEAVY REGULATORY AND ENGINEERING BARRIERS.',
    delusionIndex: 'LOW',
    selfAwareness: 'High',
    tamHallucination: 'Realistic',
    egoInflation: '1.1x',
    burnPredictionMonths: 28.0,
    burnDepletionDate: 'Nov 12, 2028',
    chips: ['High Margin', '72% Gross Margin', 'Government Grants'],
    investorFeed: [
      {
        id: 'tw-301',
        author: 'Hardtech Weekly',
        handle: '@hardtech_vc',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATYlCTx0mTnnWkrsn3V_H8Q79dBE_E65654ziJUegWMOdczl-IwIuMdb3CqNHDNSBnaTiqDCF0lCA8FefPP7NJ5chdcB3yPwwlRL1QTadC3rTIna9HfYkXhv8RnFS3-TpFddUzVfbKYo5xFRA3G7i0VgHiSv__PgiiAiGf9FcNubiZ0VIEuS7zAItz2ds5VDHIjV8Fd_InigMHReVP6fDVWTe6pDRrVT5T7FD6d1po44f1guy6ik0',
        time: '2d',
        text: 'A rare 80+ score on Judge My Startup today. Real hardware, real physics, no LLM wrapper in sight.'
      }
    ],
    breakingNews: {
      title: 'Term Sheet Issued For Nuclear Waste Robotics',
      text: 'Lead investor grants $12M Series A at $45M valuation.'
    },
    termSheetData: {
      preMoney: '$45.0M',
      exitFee: '0%',
      boardControl: 'Standard (1 Seat)',
      vesting: '4 Years'
    },
    brutalBreakdown: [
      { category: 'Regulatory Horizon', critique: 'NRC approval timeline could slip by 12 months.', severity: 'WARNING' }
    ],
    createdAt: '2026-07-29T18:00:00Z'
  }
];
