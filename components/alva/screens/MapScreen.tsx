'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const mockStores = [
  { id: 1, name: 'Burger Palace', emoji: '🍔', x: 30, y: 25, alvitas: 50 },
  { id: 2, name: 'Coffee Corner', emoji: '☕', x: 65, y: 35, alvitas: 30 },
  { id: 3, name: 'Fashion Hub', emoji: '🛍️', x: 45, y: 60, alvitas: 75 },
  { id: 4, name: 'Pizza Place', emoji: '🍕', x: 70, y: 70, alvitas: 60 },
  { id: 5, name: 'Taco Stand', emoji: '🌮', x: 25, y: 75, alvitas: 40 },
];

interface MapScreenProps {
  isDark?: boolean;
}

export function MapScreen({ isDark = true }: MapScreenProps) {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  const textColor = isDark ? 'text-white' : 'text-[#191c1e]';
  const inputBg = isDark ? 'bg-white/10' : 'bg-black/5';

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Header with search */}
      <div className="p-4 space-y-3 border-b" style={{ 
        backgroundColor: bgColor,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}>
        <h1 className="text-2xl font-bold" style={{ color: isDark ? 'white' : '#191c1e' }}>Map</h1>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: isDark ? '#999' : '#666' }}
          />
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full glass pl-10 pr-4 py-2.5 rounded-lg outline-none border"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: isDark ? 'white' : '#191c1e',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>

      {/* Map area - Pokémon GO style */}
      <div className="flex-1 relative overflow-hidden bg-[#0f0f1a]">
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" 
             style={{
               background: 'radial-gradient(circle at center, rgba(189, 230, 53, 0.1) 0%, rgba(122, 76, 142, 0.1) 100%)'
             }} />

        {/* City streets - glowing Electric Lime lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" style={{ mixBlendMode: 'screen' }}>
          {/* Horizontal streets */}
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#bde635" strokeWidth="2" opacity="0.6" />

          {/* Vertical streets */}
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#bde635" strokeWidth="2" opacity="0.6" />
        </svg>

        {/* Store pins with radar animation */}
        {mockStores.map((store) => (
          <div
            key={store.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${store.x}%`,
              top: `${store.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setSelectedPin(selectedPin === store.id ? null : store.id)}
          >
            {/* Emoji above pin */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl">
              {store.emoji}
            </div>

            {/* Animated ripple rings */}
            <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {/* Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-primary/60 animate-pulse"
                   style={{
                     animation: 'ping-ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                   }} />
              {/* Ring 2 */}
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse"
                   style={{
                     animation: 'ping-ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s'
                   }} />
              {/* Ring 3 */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"
                   style={{
                     animation: 'ping-ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s'
                   }} />
            </div>

            {/* Center dot - Electric Lime or Gold if selected */}
            <div className={`w-4 h-4 rounded-full shadow-lg ${
              selectedPin === store.id ? 'bg-accent shadow-accent/50' : 'bg-primary shadow-primary/50'
            }`} />

            {/* Selection card */}
            {selectedPin === store.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-20 animate-slide-up w-48">
                <div className="glass bg-black/90 border border-primary/50 p-4 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{store.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPin(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🪙</span>
                    <span className="font-bold text-primary">{store.alvitas}</span>
                    <span className="text-xs text-gray-400">Alvitas</span>
                  </div>
                  <button className="w-full glass bg-primary/20 text-primary px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary/30 transition-all border border-primary/30">
                    Ver tienda
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping-ripple {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
