import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  strictness: string;
  setStrictness: (val: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  strictness,
  setStrictness,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131a] border border-white/10 rounded-xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#c8c5ca] hover:text-white text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">System Configuration</h2>
        <p className="text-[#c8c5ca] text-xs mb-6">Configure AI Investor tone, API endpoints, and sound effects.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono-custom text-[#c8c5ca] uppercase mb-2">
              VC AI Roast Persona Strictness
            </label>
            <div className="grid grid-cols-2 gap-2 font-mono-custom text-xs">
              {[
                { id: 'cold', label: 'Coldly Analytical' },
                { id: 'gekko', label: 'Wall St. Gordon Gekko' },
                { id: 'academic', label: 'Skeptical MIT Professor' },
                { id: 'brutal', label: 'Nuclear Roast' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setStrictness(opt.id)}
                  className={`p-3 border rounded text-left transition-all ${
                    strictness === opt.id
                      ? 'bg-[#a5e7ff]/20 border-[#a5e7ff] text-[#a5e7ff] font-bold'
                      : 'bg-black/40 border-white/10 text-[#c8c5ca]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
            <div className="flex justify-between items-center text-xs font-mono-custom mb-1">
              <span className="text-white font-bold">GEMINI 3.6 FLASH INTEGRATION</span>
              <span className="text-[#4edea3]">● ONLINE</span>
            </div>
            <p className="text-[#c8c5ca] text-[11px] leading-relaxed">
              Server-side GenAI SDK route `/api/roast` active. API keys managed securely via secrets environment.
            </p>
          </div>

          <div className="flex justify-between items-center border-t border-white/5 pt-4">
            <span className="text-xs font-mono-custom text-[#c8c5ca]">Terminal Sound FX</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-1.5 font-mono-custom text-xs font-bold rounded border ${
                soundEnabled ? 'bg-[#4edea3]/20 border-[#4edea3] text-[#4edea3]' : 'bg-white/5 border-white/10 text-[#c8c5ca]'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-[#12131a] font-bold text-xs uppercase font-mono-custom"
          >
            Save & Exit
          </button>
        </div>
      </div>
    </div>
  );
};
