import React, { useState, useRef, useEffect } from 'react';
import { StartupPitch, Stage } from '../types';
import { SAMPLE_PITCHES } from '../data/presetStartups';

interface SubmissionPortalProps {
  onSubmitPitch: (pitch: StartupPitch) => void;
  isLoading: boolean;
}

export const SubmissionPortal: React.FC<SubmissionPortalProps> = ({
  onSubmitPitch,
  isLoading,
}) => {
  const [name, setName] = useState('Project Icarus');
  const [stage, setStage] = useState<Stage>('Series A');
  const [industry, setIndustry] = useState('Enterprise Software / AI');
  const [summary, setSummary] = useState(
    'Autonomous AI agent that creates pitch decks for founders by scraping twitter threads and generating 40-page PDFs nobody will read.'
  );
  const [tam, setTam] = useState('$500 Billion Global Startup Market');
  const [unitEconomics, setUnitEconomics] = useState('CAC: $450, LTV: $22 (negative gross margin)');
  const [moat, setMoat] = useState('Proprietary prompts and custom dark mode CSS theme.');
  const [burnRateMonthly, setBurnRateMonthly] = useState('$120,000');
  const [cashOnHand, setCashOnHand] = useState('$500,000');

  // Deck file upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [deckContent, setDeckContent] = useState<string>('');

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(120);
  const [transcript, setTranscript] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Loading animation state messages
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const loadingSteps = [
    'Parsing pitch thesis and unit economics...',
    'Simulating 10,000 failure scenarios in market downturn...',
    'Scanning for unvalidated TAM claims and LLM wrappers...',
    'Calculating Founder Delusion Index & Moat vulnerability...',
    'Synthesizing brutal VC verdict...'
  ];

  useEffect(() => {
    if (!isLoading) {
      setLoadingStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle Recording Timer
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsRecording(true);
      setRecordingSeconds(120);
      setTranscript(
        'We are building the definitive AI platform for automated founder decks. Market size is infinite. CAC is zero because of viral X threads.'
      );
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev <= 1) {
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setDeckContent(text || `Uploaded deck file: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setDeckContent(text || `Uploaded deck file: ${file.name}`);
      };
      reader.readAsText(file);
    }
  };

  // Load Preset
  const handleLoadPreset = (sample: StartupPitch) => {
    setName(sample.name);
    setStage(sample.stage);
    setIndustry(sample.industry);
    setSummary(sample.summary);
    setTam(sample.tam || '');
    setUnitEconomics(sample.unitEconomics || '');
    setMoat(sample.moat || '');
    setBurnRateMonthly(sample.burnRateMonthly || '');
    setCashOnHand(sample.cashOnHand || '');
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPitch({
      name,
      stage,
      industry,
      summary,
      tam,
      unitEconomics,
      moat,
      burnRateMonthly,
      cashOnHand,
      deckFileName: uploadedFileName || undefined,
      deckContent: deckContent || undefined,
      livePitchTranscript: transcript || undefined,
    });
  };

  const handleClear = () => {
    setSummary('');
    setTam('');
    setUnitEconomics('');
    setMoat('');
  };

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:pl-72 lg:pr-12 max-w-[1400px] mx-auto relative z-10">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#09090b]/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#a5e7ff] border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-[#a5e7ff]">
              <span className="material-symbols-outlined text-3xl animate-pulse">psychology</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Analyzing Pitch Thesis</h3>
          <p className="text-[#a5e7ff] font-mono-custom text-sm mb-6 max-w-md animate-pulse">
            {loadingSteps[loadingStepIndex]}
          </p>
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#a5e7ff] to-[#4edea3] transition-all duration-300"
              style={{ width: `${((loadingStepIndex + 1) / loadingSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="mb-8">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 mb-4 font-mono-custom text-xs text-[#a5e7ff] tracking-widest uppercase">
          SUBMISSION PORTAL
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Secure the bag.</h1>
        <p className="text-[#c8c5ca] text-base sm:text-lg max-w-2xl leading-relaxed">
          Upload your deck, refine your thesis, or record a live pitch. Our algorithms are cold, but fair.
        </p>

        {/* Quick Sample Selector */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#c8c5ca] font-mono-custom mr-2">Quick Test Presets:</span>
          {SAMPLE_PITCHES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleLoadPreset(sample)}
              className="px-3 py-1 bg-white/5 border border-white/10 hover:border-[#a5e7ff] hover:text-[#a5e7ff] text-xs font-mono-custom text-[#c8c5ca] transition-all rounded"
            >
              ⚡ Load {sample.name}
            </button>
          ))}
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Bento Submission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Upload Pitch Deck (Large Card) */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 flex flex-col justify-between rounded-xl group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 bg-[#a5e7ff]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#a5e7ff] text-3xl">cloud_upload</span>
                </div>
                <div className="flex gap-2 font-mono-custom text-xs">
                  <span className="px-2.5 py-1 bg-[#1e1f26] text-[#c8c5ca] rounded">.PDF</span>
                  <span className="px-2.5 py-1 bg-[#1e1f26] text-[#c8c5ca] rounded">.PPTX</span>
                  <span className="px-2.5 py-1 bg-[#1e1f26] text-[#c8c5ca] rounded">.TXT</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Upload Pitch Deck</h2>
              <p className="text-[#c8c5ca] text-sm mb-6">Drag your primary investment thesis or deck file here. Maximum 25MB.</p>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center bg-black/20 hover:border-[#a5e7ff]/50 transition-all cursor-pointer group/zone text-center"
              id="drop-zone"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.pptx,.txt,.md"
                className="hidden"
              />
              <div className="relative mb-4">
                <div className="absolute -inset-4 bg-[#a5e7ff]/20 blur-2xl rounded-full opacity-0 group-hover/zone:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-5xl text-[#c8c5ca] group-hover/zone:text-[#a5e7ff] transition-all relative">
                  {uploadedFileName ? 'check_circle' : 'file_present'}
                </span>
              </div>
              {uploadedFileName ? (
                <div>
                  <p className="text-[#4edea3] font-mono-custom text-sm font-bold">Attached: {uploadedFileName}</p>
                  <p className="text-xs text-[#c8c5ca] mt-1">Click to replace or drag new deck</p>
                </div>
              ) : (
                <p className="text-[#c8c5ca] text-sm">
                  Drop your files here or <span className="text-[#a5e7ff] underline underline-offset-4 font-semibold">browse</span>
                </p>
              )}
            </div>
          </div>

          {/* 2. Live Investor Pitch (Tall Card) */}
          <div className="lg:col-span-4 glass-card p-6 sm:p-8 flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#1a1b22] to-[#12131a]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-[#ffb4ab] animate-pulse' : 'bg-[#4edea3]'}`}></div>
                  <span className="font-mono-custom text-xs text-[#c8c5ca] tracking-widest uppercase">
                    {isRecording ? 'RECORDING LIVE' : 'RECORDING MODE'}
                  </span>
                </div>
                <div className="font-mono-custom text-xs text-[#a5e7ff] bg-black/40 px-3 py-1 rounded border border-white/5">
                  {formatTimer(recordingSeconds)}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center my-6 py-6">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all active:scale-95 mb-6 ${
                    isRecording
                      ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab] shadow-[0_0_30px_rgba(255,180,171,0.3)]'
                      : 'bg-white/5 border-white/10 text-[#c8c5ca] hover:bg-[#a5e7ff]/20 hover:border-[#a5e7ff] hover:text-[#a5e7ff]'
                  }`}
                  id="btn-live-mic"
                >
                  <span className="material-symbols-outlined text-3xl">
                    {isRecording ? 'stop' : 'mic'}
                  </span>
                </button>

                {/* Animated Waveform */}
                <div className="flex items-end gap-1.5 h-10">
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.3s' }}></div>
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.5s' }}></div>
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.2s' }}></div>
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.4s' }}></div>
                  <div className={`waveform-bar w-1 bg-[#a5e7ff] ${isRecording ? 'opacity-100' : 'opacity-30'}`} style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-1">Live Pitch</h2>
              <p className="text-[#c8c5ca] text-xs leading-relaxed mb-4">
                Record a 120-second elevator pitch. AI speech transcription & tone analysis enabled.
              </p>
              {transcript && (
                <div className="mb-4 p-2.5 bg-black/40 border border-white/5 rounded font-mono-custom text-xs text-[#4edea3]">
                  "{transcript}"
                </div>
              )}
              <button
                type="button"
                onClick={toggleRecording}
                className="w-full py-3 bg-white text-[#12131a] font-bold hover:bg-[#a5e7ff] transition-all text-sm tracking-wider uppercase"
                id="btn-start-session"
              >
                {isRecording ? 'STOP & SAVE' : 'START SESSION'}
              </button>
            </div>
          </div>

          {/* 3. Startup Thesis (Full Width Code Editor) */}
          <div className="lg:col-span-12 glass-card p-6 sm:p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Startup Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Project Icarus"
                  className="w-full bg-black/40 border border-white/10 rounded px-3.5 py-2.5 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as Stage)}
                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2.5 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
                  >
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Growth">Growth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. AI / Enterprise"
                    className="w-full bg-black/40 border border-white/10 rounded px-3.5 py-2.5 text-white font-mono-custom text-sm focus:outline-none focus:border-[#a5e7ff]"
                  />
                </div>
              </div>
            </div>

            {/* Financials & Moat inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">TAM Claim</label>
                <input
                  type="text"
                  value={tam}
                  onChange={(e) => setTam(e.target.value)}
                  placeholder="e.g. $500B Global Market"
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Unit Economics</label>
                <input
                  type="text"
                  value={unitEconomics}
                  onChange={(e) => setUnitEconomics(e.target.value)}
                  placeholder="e.g. CAC: $450, LTV: $22"
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Moat Claim</label>
                <input
                  type="text"
                  value={moat}
                  onChange={(e) => setMoat(e.target.value)}
                  placeholder="e.g. Proprietary dataset"
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-1">Monthly Burn</label>
                <input
                  type="text"
                  value={burnRateMonthly}
                  onChange={(e) => setBurnRateMonthly(e.target.value)}
                  placeholder="e.g. $120,000"
                  className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                />
              </div>
            </div>

            {/* Code Editor Style Thesis Textarea */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Startup Thesis / Executive Summary</h3>
                <p className="text-[#c8c5ca] text-xs">Concise, calculated, and high-conviction.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadPreset(SAMPLE_PITCHES[0])}
                  className="px-3 py-1.5 bg-[#1e1f26] text-[#c8c5ca] font-mono-custom text-xs hover:text-white transition-colors rounded"
                >
                  IMPORT FROM GIST
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 bg-[#1e1f26] text-[#c8c5ca] font-mono-custom text-xs hover:text-white transition-colors rounded"
                >
                  CLEAR
                </button>
              </div>
            </div>

            <div className="relative bg-black/50 border border-white/10 rounded-lg overflow-hidden focus-within:border-[#a5e7ff] transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-white/5 flex flex-col items-center pt-4 font-mono-custom text-xs text-[#c8c5ca]/30 select-none pointer-events-none">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
              </div>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="// Enter your executive summary here...
// Focus on TAM, Unit Economics, Moat, and why your team won't fail."
                rows={6}
                className="w-full bg-transparent border-none focus:ring-0 pl-14 pr-6 py-4 font-mono-custom text-xs sm:text-sm text-[#4edea3] resize-none placeholder:text-[#c8c5ca]/20 focus:outline-none"
                required
              />
              <div className="bottom-3 right-4 p-3 flex items-center justify-end gap-4 border-t border-white/5 bg-black/40">
                <span className="font-mono-custom text-xs text-[#c8c5ca]/50">
                  UTF-8 | WORD COUNT: {wordCount}
                </span>
                <div className="h-2 w-28 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4edea3] transition-all"
                    style={{ width: `${Math.min((wordCount / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Footer Actions */}
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
          <div className="flex items-center gap-3 text-[#c8c5ca]">
            <span className="material-symbols-outlined text-[#4edea3]">verified_user</span>
            <p className="text-xs sm:text-sm">End-to-end encrypted submission for institutional review.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              type="button"
              onClick={() => alert('Draft saved locally in session.')}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold hover:border-[#a5e7ff] hover:text-[#a5e7ff] transition-all text-sm tracking-wider uppercase active:scale-95"
            >
              SAVE AS DRAFT
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 bg-white text-[#12131a] font-bold hover:bg-[#a5e7ff] transition-all text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95 disabled:opacity-50"
              id="btn-submit-review"
            >
              {isLoading ? 'ANALYZING...' : 'SUBMIT FOR REVIEW'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};
