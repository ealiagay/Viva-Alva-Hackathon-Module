'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface WalletScreenProps {
  isDark?: boolean;
}

export function WalletScreen({ isDark = true }: WalletScreenProps) {
  const alvitas = 1250;
  const [showQRScanner, setShowQRScanner] = useState(false);
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  const cardBg = isDark ? '#1a1a2e' : '#ffffff';
  const textColor = isDark ? 'text-white' : 'text-[#191c1e]';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';

  const transactions = [
    { store: 'Burger Palace', amount: '+50', date: '2 hours ago' },
    { store: 'Coffee Corner', amount: '+30', date: '5 hours ago' },
    { store: 'Fashion Hub', amount: '+75', date: '8 hours ago' },
    { store: 'Pizza Place', amount: '+60', date: '1 day ago' },
    { store: 'Taco Stand', amount: '+40', date: '2 days ago' },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-24 p-6" style={{ backgroundColor: bgColor }}>
      {/* Top: Alvitas total */}
      <div className="w-full flex flex-col items-center gap-4 mt-6">
        <div className="text-5xl">🪙</div>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-1" style={{ color: isDark ? 'white' : '#191c1e' }}>{alvitas}</h2>
          <p className="text-sm" style={{ color: isDark ? '#999' : '#666' }}>Alvitas</p>
        </div>
      </div>

      {/* QR Scan Button */}
      <button
        onClick={() => setShowQRScanner(true)}
        className="mt-8 mb-8 w-full glass px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all border"
        style={{
          backgroundColor: isDark ? 'rgba(189, 230, 53, 0.2)' : 'rgba(189, 230, 53, 0.15)',
          color: '#bde635',
          borderColor: isDark ? 'rgba(189, 230, 53, 0.5)' : 'rgba(189, 230, 53, 0.4)'
        }}
      >
        <span className="text-lg">📷</span>
        Escanear QR
      </button>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }}>
          <div className="glass rounded-2xl p-6 w-full max-w-sm animate-slide-up relative border border-primary/30" style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'
          }}>
            {/* Close button */}
            <button
              onClick={() => setShowQRScanner(false)}
              className="absolute top-4 right-4 transition-colors"
              style={{ color: isDark ? '#999' : '#666' }}
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-6 mt-4" style={{ color: isDark ? 'white' : '#191c1e' }}>Escanear QR</h2>

            {/* QR viewfinder square with lime corners */}
            <div className="w-full max-w-xs aspect-square relative mx-auto">
              <div className="absolute inset-0 border-2 border-transparent">
                {/* Top-left corner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                {/* Top-right corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                {/* Bottom-left corner */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                {/* Bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
              </div>
              {/* Dark background for viewfinder */}
              <div className="absolute inset-4 bg-black/80 rounded-lg flex items-center justify-center border border-white/10">
                <p className="text-xs text-gray-400">Apunta al QR</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom: Transaction history */}
      <div className="w-full space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: isDark ? '#999' : '#666' }}>Reciente</h3>
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="glass p-4 rounded-lg flex items-center justify-between transition-all border"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: isDark ? 'white' : '#191c1e' }}>{tx.store}</p>
              <p className="text-xs" style={{ color: isDark ? '#999' : '#666' }}>{tx.date}</p>
            </div>
            <p className="font-bold text-primary text-sm">{tx.amount} 🪙</p>
          </div>
        ))}
      </div>
    </div>
  );
}
