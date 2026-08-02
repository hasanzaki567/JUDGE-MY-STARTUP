import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize Gemini SDK safely on demand
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Roast Generation Endpoint
app.post('/api/roast', async (req, res) => {
  try {
    const pitch = req.body;
    const { name, stage, industry, summary, tam, unitEconomics, moat, burnRateMonthly, cashOnHand, deckContent, livePitchTranscript } = pitch;

    if (!name || !summary) {
      return res.status(400).json({ error: 'Startup name and summary are required.' });
    }

    const ai = getGeminiClient();

    // If Gemini key is available, generate real AI roast using gemini-3.6-flash
    if (ai) {
      const prompt = `
You are an elite, cold, calculating, brutally witty Tier-1 Venture Capital Partner evaluating a startup pitch.
You do NOT give fluff or polite encouragement. You roast the startup with lethal precision, sharp analytical comedy, and financial reality checks.

Startup Details:
- Name: ${name}
- Stage: ${stage || 'Seed'}
- Industry: ${industry || 'Tech'}
- Executive Summary / Thesis: ${summary}
- TAM Claim: ${tam || 'Unspecified'}
- Unit Economics: ${unitEconomics || 'Unspecified'}
- Moat Claim: ${moat || 'Unspecified'}
- Monthly Burn: ${burnRateMonthly || 'Unspecified'}
- Cash on Hand: ${cashOnHand || 'Unspecified'}
${deckContent ? `- Pitch Deck Excerpt: ${deckContent.slice(0, 2000)}` : ''}
${livePitchTranscript ? `- Live Pitch Audio Transcript: ${livePitchTranscript}` : ''}

Evaluate this pitch and return a JSON object with your brutal verdict.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are the JUDGE MY STARTUP AI Roast Engine (v4.2). Your tone is cold, dark luxury, hilarious, cynical, and hyper-analytical. You expose TAM hallucinations, CAC traps, zero-moat products, and burn rate disasters. Always produce valid JSON adhering strictly to the schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              outcome: { type: Type.STRING, description: 'REJECTED or CONDITIONALLY_PASSED or PASSED' },
              healthScore: { type: Type.INTEGER, description: 'Score between 1 and 99. Most fail below 30.' },
              healthSummary: { type: Type.STRING, description: '2-3 sentence brutal operational diagnosis.' },
              riskLevelPercentage: { type: Type.INTEGER, description: 'Risk percentage between 20 and 99.' },
              riskVerdict: { type: Type.STRING, description: 'LOW, MODERATE, HIGH, or EXTREME' },
              riskQuote: { type: Type.STRING, description: 'A punchy single-line witty quote in quotes.' },
              moatScore: { type: Type.NUMBER, description: 'Moat score out of 10 e.g. 0.2' },
              moatRoast: { type: Type.STRING, description: 'Caps single-line roast of their moat e.g. ROAST: YOUR MOAT APPEARS TO BE A LOGIN PAGE.' },
              delusionIndex: { type: Type.STRING, description: 'LOW, MODERATE, HIGH, or MAX' },
              selfAwareness: { type: Type.STRING, description: 'e.g. -- ERROR -- or 4%' },
              tamHallucination: { type: Type.STRING, description: 'e.g. Extreme or High or Moderate' },
              egoInflation: { type: Type.STRING, description: 'e.g. 14.2x' },
              burnPredictionMonths: { type: Type.NUMBER, description: 'Estimated months before running out of money e.g. 3.4' },
              burnDepletionDate: { type: Type.STRING, description: 'Estimated date e.g. Sept 14, 2026' },
              chips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 short caps tags e.g. ["Negative EBITDA", "Churn Rate: 42%", "No CAC Efficiency"]'
              },
              termSheetData: {
                type: Type.OBJECT,
                properties: {
                  preMoney: { type: Type.STRING },
                  exitFee: { type: Type.STRING },
                  boardControl: { type: Type.STRING },
                  vesting: { type: Type.STRING }
                },
                required: ['preMoney', 'exitFee', 'boardControl', 'vesting']
              },
              investorFeed: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    author: { type: Type.STRING },
                    handle: { type: Type.STRING },
                    time: { type: Type.STRING },
                    text: { type: Type.STRING }
                  },
                  required: ['author', 'handle', 'time', 'text']
                }
              },
              breakingNews: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ['title', 'text']
              },
              brutalBreakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    critique: { type: Type.STRING },
                    severity: { type: Type.STRING, description: 'CRITICAL, WARNING, or MINOR' }
                  },
                  required: ['category', 'critique', 'severity']
                }
              }
            },
            required: [
              'outcome', 'healthScore', 'healthSummary', 'riskLevelPercentage', 'riskVerdict',
              'riskQuote', 'moatScore', 'moatRoast', 'delusionIndex', 'selfAwareness',
              'tamHallucination', 'egoInflation', 'burnPredictionMonths', 'burnDepletionDate',
              'chips', 'termSheetData', 'investorFeed', 'breakingNews', 'brutalBreakdown'
            ]
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      const caseId = `#VC-${Math.floor(1000 + Math.random() * 9000)}-${['ALPHA', 'BETA', 'GAMMA', 'DELTA'][Math.floor(Math.random() * 4)]}`;

      // Attach avatars to tweets
      const defaultAvatars = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDauYoBTzPFzWDawIUw0C1-NkQ_KWwSm4lhZ06m_ESycNrpL61td7-WOXS5j3QWI6bjvgjUMDHXlY-oHYT212Nl7D0nwdnSs2FlHGl_kqNhtY3hERcjJdhpcwz9x38QbeqVT8FXJooaoGxpk2lnuN_BvpRdtu-Qn4c2sIxU0aPmCGzZK0hDMck7IT3BEnLoh_wEIGjxWivjQYoGb7JWYye6v15qXPWSyTpY2WyZqf48rc8VINgAr8I',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkS5RlPA_2dnHpcJWAIgAwpLEvQwEd5FJlcPHW_A_Y3iD8WzUA8q_5nqzKUG1KhIPfYajYL3WAaGwvLlzgxRfv9nIwf4eYQV6nHgVxcgq0Fz9gYpZXShDEqJjdUZcx3qoUJ646lSqwBQo1MvjeU3gNk4cq9FzdNe-SJ8Ams5XXGGhprqOZjF3gcR_QnmcR70NLNibLzeFreOqDUaVo-s9yMXHon4ugXVYYOyYa9bUTo_VsMgcRVY',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDq-S_XKFZlTyJlRfPS_4zPbIseMMHzVxAtfUOjBIZ_fGGzOc2oU7txIMFsPksBsYyRrCbYkQk_KQoyEW58KjPpN9RUG9JOx6LT5qfrqan5NuqquRSHvGxGLZTVxINd-UnQ-wtOOgRsdyjhDcHYF4449TGYUcLm6aHsl4nBjLZ7YvmUwnfJVUopf0bZWrDTUpM7DYXXL-cJ3ksriUcBhUGQtlN_F9vm6Y295N5PjkcuJN3z1VAAvks'
      ];

      const investorFeed = (parsed.investorFeed || []).map((tweet: any, index: number) => ({
        ...tweet,
        id: `gen-tweet-${index}`,
        avatar: defaultAvatars[index % defaultAvatars.length]
      }));

      const result = {
        id: `roast-${Date.now()}`,
        startupName: name,
        stage: stage || 'Seed',
        caseId,
        outcome: parsed.outcome || 'REJECTED',
        healthScore: typeof parsed.healthScore === 'number' ? parsed.healthScore : 18,
        healthSummary: parsed.healthSummary || 'Your operational metrics present an insurmountable hurdle for institutional capital.',
        riskLevelPercentage: parsed.riskLevelPercentage || 96,
        riskVerdict: parsed.riskVerdict || 'EXTREME',
        riskQuote: parsed.riskQuote || '"Investing here is less like a \'gamble\' and more like a \'sacrifice\'."',
        moatScore: typeof parsed.moatScore === 'number' ? parsed.moatScore : 0.4,
        moatRoast: parsed.moatRoast || 'ROAST: YOUR MOAT APPEARS TO BE A LOGIN PAGE.',
        delusionIndex: parsed.delusionIndex || 'HIGH',
        selfAwareness: parsed.selfAwareness || '2%',
        tamHallucination: parsed.tamHallucination || 'Extreme',
        egoInflation: parsed.egoInflation || '12.5x',
        burnPredictionMonths: typeof parsed.burnPredictionMonths === 'number' ? parsed.burnPredictionMonths : 3.5,
        burnDepletionDate: parsed.burnDepletionDate || 'Oct 15, 2026',
        chips: parsed.chips || ['Negative EBITDA', 'High Churn', 'No CAC Efficiency'],
        investorFeed: investorFeed.length > 0 ? investorFeed : [
          {
            id: 'gen-tw-1',
            author: 'Navalita G.',
            handle: '@angel_logic',
            avatar: defaultAvatars[0],
            time: '1h',
            text: `Just reviewed ${name}. The deck claims an unbounded TAM with zero CAC strategy. Silicon Valley is healing.`
          }
        ],
        breakingNews: {
          title: parsed.breakingNews?.title || `${name} Founder In Tears At Demo Day`,
          text: parsed.breakingNews?.text || 'Witnesses reported the founder attempted a pivot to AI mid-sentence during pitch questioning.',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBigKBcFGt9dCCOU21WU-YmJ_X37uqMsMNqqi8qOGxSs4-xdh42aw6FdegDorPZ2QLknd9EllYvYYcRitnMWxT7X5MWP6ijynvfE6qT0iVayj9-CPAegL9WXsHkqAiy_4PFgNLT74B9H6VRgDxpnGPsDB4GZJIC8DEtGWWl5XcT0YLYTdYcz86Kg2yA8KQD-Pla3-r9PHo-ixSatToC0EncEK8-uYKoDgWmd5JMb2-WH8hkBoiFvJo'
        },
        termSheetData: parsed.termSheetData || {
          preMoney: '$800K',
          exitFee: '25%',
          boardControl: 'Total',
          vesting: '10 Years'
        },
        brutalBreakdown: parsed.brutalBreakdown || [
          { category: 'Unit Economics', critique: 'You are losing money on every transaction with no scale mechanism.', severity: 'CRITICAL' }
        ],
        createdAt: new Date().toISOString()
      };

      return res.json(result);
    }

    // Fallback algorithmic roast if API key is not configured
    const caseId = `#VC-${Math.floor(1000 + Math.random() * 9000)}-BETA`;
    const fallbackResult = {
      id: `roast-fallback-${Date.now()}`,
      startupName: name,
      stage: stage || 'Pre-Seed',
      caseId,
      outcome: 'REJECTED',
      healthScore: Math.floor(8 + Math.random() * 18),
      healthSummary: `Your pitch for ${name} in ${industry || 'Tech'} exhibits severe operational fragility. Unit economics are purely theoretical and your burn rate accelerates toward insolvency.`,
      riskLevelPercentage: 97,
      riskVerdict: 'EXTREME',
      riskQuote: '"Investing here is less like a \'gamble\' and more like a \'sacrifice\'."',
      moatScore: 0.3,
      moatRoast: 'ROAST: YOUR MOAT APPEARS TO BE A LOGIN PAGE.',
      delusionIndex: 'MAX',
      selfAwareness: '-- ERROR --',
      tamHallucination: 'High',
      egoInflation: '14.2x',
      burnPredictionMonths: 3.8,
      burnDepletionDate: 'Oct 20, 2026',
      chips: ['Negative EBITDA', 'Churn Rate: 42%', 'No CAC Efficiency'],
      investorFeed: [
        {
          id: 'fb-tw-1',
          author: 'Navalita G.',
          handle: '@angel_logic',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDauYoBTzPFzWDawIUw0C1-NkQ_KWwSm4lhZ06m_ESycNrpL61td7-WOXS5j3QWI6bjvgjUMDHXlY-oHYT212Nl7D0nwdnSs2FlHGl_kqNhtY3hERcjJdhpcwz9x38QbeqVT8FXJooaoGxpk2lnuN_BvpRdtu-Qn4c2sIxU0aPmCGzZK0hDMck7IT3BEnLoh_wEIGjxWivjQYoGb7JWYye6v15qXPWSyTpY2WyZqf48rc8VINgAr8I',
          time: '2h',
          text: `Just saw a deck for ${name} where the Market Opportunity was literally the entire population of Earth including infants. We are so back. 📉`
        },
        {
          id: 'fb-tw-2',
          author: 'VC Intern #42',
          handle: '@coffee_runner',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrkS5RlPA_2dnHpcJWAIgAwpLEvQwEd5FJlcPHW_A_Y3iD8WzUA8q_5nqzKUG1KhIPfYajYL3WAaGwvLlzgxRfv9nIwf4eYQV6nHgVxcgq0Fz9gYpZXShDEqJjdUZcx3qoUJ646lSqwBQo1MvjeU3gNk4cq9FzdNe-SJ8Ams5XXGGhprqOZjF3gcR_QnmcR70NLNibLzeFreOqDUaVo-s9yMXHon4ugXVYYOyYa9bUTo_VsMgcRVY',
          time: '5h',
          text: 'Founder tried to pivot to AI during the 3rd minute of the demo when the app crashed. Respect the hustle, fear the burn rate.'
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
        { category: 'Unit Economics', critique: 'You lose $14 on every active user acquired. Volume won\'t save you.', severity: 'CRITICAL' },
        { category: 'Market Opportunity', critique: 'Claiming an astronomical TAM without distribution partners is immediate rejection.', severity: 'CRITICAL' }
      ],
      createdAt: new Date().toISOString()
    };

    return res.json(fallbackResult);
  } catch (error: any) {
    console.error('Error generating roast:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate startup roast.' });
  }
});

// Vite middleware for development vs static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JUDGE MY STARTUP Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
