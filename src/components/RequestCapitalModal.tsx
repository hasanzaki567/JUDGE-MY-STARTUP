import React, { useState } from 'react';

interface RequestCapitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestCapitalModal: React.FC<RequestCapitalModalProps> = ({ isOpen, onClose }) => {
  const [requestedAmount, setRequestedAmount] = useState('$2,500,000');
  const [valuation, setValuation] = useState('$15,000,000');
  const [useOfFunds, setUseOfFunds] = useState('Salaries for 6 senior AI engineers and 1 TikTok growth hacker.');
  const [rejection, setRejection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRejection(
      `REQUEST REJECTED BY OBSIDIAN CAPITAL INVESTMENT COMMITTEE.
Reason: Requesting ${requestedAmount} at ${valuation} valuation with negative ARR constitutes financial surrealism. Please re-apply after achieving positive gross margins or moving back into your parents' basement.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131a] border border-white/10 rounded-xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#c8c5ca] hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 bg-[#4edea3] rounded-full animate-pulse"></div>
          <span className="font-mono-custom text-xs text-[#4edea3] uppercase tracking-widest font-bold">
            INSTITUTIONAL CAPITAL PORTAL
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Request VC Investment</h2>
        <p className="text-[#c8c5ca] text-xs mb-6">
          Submit your term request directly to our partner committee. Response generated in real-time.
        </p>

        {rejection ? (
          <div className="p-4 bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 rounded text-[#ffb4ab] font-mono-custom text-xs leading-relaxed mb-6">
            <p className="font-bold mb-2">⚠️ REJECTION VERDICT:</p>
            <p>{rejection}</p>
          </div>
        ) : (
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Requested Funding Amount</label>
              <input
                type="text"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Proposed Valuation (Post-Money)</label>
              <input
                type="text"
                value={valuation}
                onChange={(e) => setValuation(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono-custom text-[#c8c5ca] mb-1">Primary Use of Capital</label>
              <textarea
                value={useOfFunds}
                onChange={(e) => setUseOfFunds(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white font-mono-custom text-xs focus:outline-none focus:border-[#a5e7ff]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#4edea3] text-[#003543] font-bold text-xs uppercase tracking-widest font-mono-custom hover:bg-white transition-all"
            >
              TRANSMIT CAPITAL REQUEST
            </button>
          </form>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 text-[#c8c5ca] font-mono-custom text-xs hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
