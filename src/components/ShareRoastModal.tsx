import React, { useState } from 'react';
import { RoastResult } from '../types';

interface ShareRoastModalProps {
  roast: RoastResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareRoastModal: React.FC<ShareRoastModalProps> = ({ roast, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !roast) return null;

  const shareText = `🔥 My startup "${roast.startupName}" scored ${roast.healthScore}/100 on JUDGE MY STARTUP!
Outcome: ${roast.outcome}
Risk: ${roast.riskVerdict} (${roast.riskLevelPercentage}%)
Delusion Index: ${roast.delusionIndex}

Verdict: "${roast.healthSummary}"
Test your pitch: ${window.location.href}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131a] border border-white/10 rounded-xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#c8c5ca] hover:text-white text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Share Your Roast</h2>
        <p className="text-[#c8c5ca] text-xs mb-6">
          Expose your score to Twitter, LinkedIn, or send it to your co-founders.
        </p>

        {/* Share Card Preview */}
        <div className="p-5 bg-black/60 border border-white/10 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-white text-lg">{roast.startupName}</span>
            <span className="font-mono-custom text-xs font-bold text-[#ffb4ab] bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 px-2 py-0.5 rounded">
              SCORE: {roast.healthScore}/100
            </span>
          </div>
          <p className="text-[#c8c5ca] font-mono-custom text-xs italic mb-4">"{roast.riskQuote}"</p>
          <div className="text-[10px] font-mono-custom text-[#a5e7ff] uppercase">JUDGE MY STARTUP | VC REALITY CHECK</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 bg-[#a5e7ff] text-[#003543] font-bold text-xs uppercase tracking-wider font-mono-custom hover:bg-white transition-all rounded"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY SHARE CARD'}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider font-mono-custom transition-all rounded flex items-center justify-center"
          >
            POST TO X
          </a>
        </div>
      </div>
    </div>
  );
};
