'use client';

import { useState } from 'react';
import { QrCode, X, ArrowDownLeft } from 'lucide-react';

const transactions = [
  { id: 1, store: 'El Rincón Gourmet', coins: 50, date: '15 May 2025' },
  { id: 2, store: 'Café Mirador', coins: 30, date: '14 May 2025' },
  { id: 3, store: 'Sushi Andino', coins: 75, date: '12 May 2025' },
  { id: 4, store: 'Pizza del Valle', coins: 40, date: '10 May 2025' },
  { id: 5, store: 'Burger Andino', coins: 60, date: '8 May 2025' },
];

interface WalletScreenProps {
  isDark?: boolean;
}

export function WalletScreen({ isDark = true }: WalletScreenProps) {
  const [showScanner, setShowScanner] = useState(false);
  const bg = isDark ? '#0f0f1a' : '#f8f9fb';
  const text = isDark ? '#ffffff' : '#191c1e';
  const card = isDark ? '#1a1a2e' : '#ffffff';
  const sub = isDark ? '#9ca3af' : '#6b7280';

  return (
    <div
      className="h-full overflow-y-auto pb-24 px-4 pt-6"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* Header */}
      <h1 className="text-xl font-bold text-center mb-6">Mi Billetera</h1>

      {/* Balance card */}
      <div
        className="rounded-2xl p-6 text-center mb-6"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #7a4c8e 100%)',
          boxShadow: '0 4px 30px rgba(189,230,53,0.15)',
        }}
      >
        <div className="text-4xl mb-2">🪙</div>
        <div
          className="text-6xl font-extrabold mb-1"
          style={{ color: '#bde635' }}
        >
          1,250
        </div>
        <div className="text-white text-base font-medium opacity-80">Alvitas</div>
      </div>

      {/* QR Button */}
      {!showScanner ? (
        <button
          onClick={() => setShowScanner(true)}
          className="w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 mb-6 transition-transform active:scale-95"
          style={{
            background: '#bde635',
            color: '#191c1e',
            boxShadow: '0 4px 20px rgba(189,230,53,0.4)',
          }}
        >
          <QrCode size={20} />
          Escanear QR para ganar
        </button>
      ) : (
        /* QR Scanner */
        <div className="mb-6">
          <div
            className="relative rounded-2xl overflow-hidden mb-3"
            style={{ background: '#000', aspectRatio: '1' }}
          >
            {/* Corner brackets */}
            <div className="absolute inset-6 z-10">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: '#bde635' }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: '#bde635' }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: '#bde635' }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: '#bde635' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Apunta al QR de la tienda</p>
            </div>
          </div>
          <button
            onClick={() => setShowScanner(false)}
            className="w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
            style={{ background: card, color: sub, border: `1px solid ${sub}30` }}
          >
            <X size={16} />
            Cerrar escáner
          </button>
        </div>
      )}

      {/* Transaction history */}
      <div>
        <h2 className="text-base font-bold mb-3" style={{ color: text }}>
          Historial reciente
        </h2>
        <div className="flex flex-col gap-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: card }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(189,230,53,0.15)' }}
                >
                  <ArrowDownLeft size={16} style={{ color: '#bde635' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: text }}>
                    {tx.store}
                  </p>
                  <p className="text-xs" style={{ color: sub }}>
                    {tx.date}
                  </p>
                </div>
              </div>
              <span className="font-bold text-sm" style={{ color: '#bde635' }}>
                +{tx.coins} 🪙
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}