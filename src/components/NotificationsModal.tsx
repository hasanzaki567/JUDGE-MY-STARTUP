import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      time: '10m ago',
      title: 'New High-Risk Submission Detected',
      desc: '"ChainBrew" attempted to claim coffee frothing requires a proof-of-stake blockchain.',
      type: 'ALERT'
    },
    {
      id: 2,
      time: '1h ago',
      title: 'Market Pulse Update',
      desc: 'Silicon Valley Fear Index rose to Extreme following tech earnings calls.',
      type: 'MARKET'
    },
    {
      id: 3,
      time: '3h ago',
      title: 'Term Sheet Revoked',
      desc: 'VC partner canceled term sheet after detecting ChatGPT-generated financial projections.',
      type: 'INFO'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131a] border border-white/10 rounded-xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#c8c5ca] hover:text-white text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">VC Intelligence Alerts</h2>
        <p className="text-[#c8c5ca] text-xs mb-6">Real-time terminal notifications and market shifts.</p>

        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.id} className="p-4 bg-black/40 border border-white/5 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono-custom text-xs font-bold text-[#a5e7ff]">{item.title}</span>
                <span className="text-[10px] font-mono-custom text-[#c8c5ca]">{item.time}</span>
              </div>
              <p className="text-[#c8c5ca] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 text-[#c8c5ca] font-mono-custom text-xs hover:text-white"
          >
            Clear Alerts
          </button>
        </div>
      </div>
    </div>
  );
};
