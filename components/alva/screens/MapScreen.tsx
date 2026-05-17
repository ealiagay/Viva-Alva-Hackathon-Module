'use client';

import { useState, useEffect } from 'react';
import { Search, Navigation, X, Star } from 'lucide-react';

const mockStores = [
  { id: 1, name: 'Burger Palace', emoji: '🍔', x: 20, y: 20, VAVIs: 50, category: 'Restaurante', distance: '120m', rating: 4.8 },
  { id: 2, name: 'Coffee Corner', emoji: '☕', x: 72, y: 18, VAVIs: 30, category: 'Cafetería', distance: '280m', rating: 4.5 },
  { id: 3, name: 'Fashion Hub', emoji: '🛍️', x: 50, y: 44, VAVIs: 75, category: 'Tienda', distance: '95m', rating: 4.9 },
  { id: 4, name: 'Pizza Place', emoji: '🍕', x: 78, y: 62, VAVIs: 60, category: 'Restaurante', distance: '340m', rating: 4.6 },
  { id: 5, name: 'Taco Stand', emoji: '🌮', x: 15, y: 65, VAVIs: 40, category: 'Comida', distance: '210m', rating: 4.3 },
  { id: 6, name: 'Sushi Go', emoji: '🍱', x: 60, y: 28, VAVIs: 80, category: 'Japonés', distance: '180m', rating: 4.9 },
];

interface MapScreenProps {
  isDark?: boolean;
}

export function MapScreen({ isDark = true }: MapScreenProps) {
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 100), 50);
    return () => clearInterval(id);
  }, []);

  const filtered = mockStores.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const selected = mockStores.find(s => s.id === selectedStore);

  // Ripple animado por store (desfasado)
  const getRipple = (storeId: number) => {
    const offset = (storeId * 18) % 100;
    return ((tick + offset) % 100) / 100;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative" style={{ background: '#060b12' }}>

      {/* ===== MAPA SVG ===== */}
      <div className="absolute inset-0" style={{ bottom: '130px' }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 390 680"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Fondo base degradado */}
            <radialGradient id="bgGrad" cx="50%" cy="55%" r="60%">
              <stop offset="0%" stopColor="#0d1f35" />
              <stop offset="100%" stopColor="#060b12" />
            </radialGradient>

            {/* Glow del jugador */}
            <radialGradient id="playerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </radialGradient>

            {/* Glow zona central */}
            <radialGradient id="centerGlow" cx="50%" cy="55%" r="40%">
              <stop offset="0%" stopColor="#7a4c8e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7a4c8e" stopOpacity="0" />
            </radialGradient>

            {/* Glow de calles */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base */}
          <rect width="390" height="680" fill="url(#bgGrad)" />

          {/* ── BLOQUES DE CIUDAD variados ── */}
          {/* Zona norte */}
          <rect x="8"   y="8"   width="68"  height="45"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="85"  y="8"   width="95"  height="30"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="190" y="8"   width="60"  height="50"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="260" y="8"   width="55"  height="35"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="325" y="8"   width="57"  height="55"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Zona norte-media */}
          <rect x="8"   y="68"  width="45"  height="60"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="63"  y="55"  width="110" height="45"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="185" y="65"  width="75"  height="55"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="270" y="48"  width="50"  height="70"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="330" y="68"  width="52"  height="50"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Parque norte (verde oscuro) */}
          <rect x="85"  y="105" width="90"  height="65"  rx="8" fill="#091a10" stroke="#0f2918" strokeWidth="0.5" />
          {/* Árboles en el parque */}
          {[[105,125],[135,118],[158,130],[120,148],[148,152]].map(([px,py],i) => (
            <circle key={i} cx={px} cy={py} r="5" fill="#0d2a14" opacity="0.9" />
          ))}
          {[[105,125],[135,118],[158,130],[120,148],[148,152]].map(([px,py],i) => (
            <circle key={`t${i}`} cx={px} cy={py} r="3" fill="#122e18" opacity="0.7" />
          ))}

          {/* Zona media */}
          <rect x="8"   y="140" width="55"  height="80"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="190" y="130" width="65"  height="55"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="265" y="125" width="55"  height="65"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="328" y="125" width="54"  height="75"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Zona centro */}
          <rect x="8"   y="235" width="70"  height="70"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="88"  y="220" width="55"  height="90"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="255" y="210" width="60"  height="80"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="325" y="215" width="57"  height="70"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Parque central */}
          <rect x="155" y="225" width="90"  height="75"  rx="10" fill="#091a10" stroke="#0f2918" strokeWidth="0.5" />
          {[[175,248],[200,240],[225,252],[185,268],[212,270]].map(([px,py],i) => (
            <circle key={`cp${i}`} cx={px} cy={py} r="6" fill="#0d2a14" opacity="0.85" />
          ))}

          {/* Zona sur-media */}
          <rect x="8"   y="320" width="65"  height="75"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="82"  y="318" width="60"  height="60"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="155" y="310" width="85"  height="55"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="252" y="300" width="65"  height="70"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="328" y="292" width="54"  height="80"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Zona sur */}
          <rect x="8"   y="408" width="70"  height="85"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="90"  y="390" width="55"  height="70"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="158" y="378" width="80"  height="60"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="250" y="382" width="65"  height="75"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="328" y="385" width="54"  height="65"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* Zona más sur */}
          <rect x="8"   y="505" width="60"  height="165" rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="80"  y="472" width="65"  height="100" rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="155" y="450" width="85"  height="80"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="252" y="468" width="65"  height="90"  rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />
          <rect x="328" y="462" width="54"  height="100" rx="6" fill="#0e1c2e" stroke="#152236" strokeWidth="0.5" />

          {/* ── CALLES PRINCIPALES (Electric Lime glow) ── */}
          {/* Horizontales principales */}
          {[53, 175, 305, 460].map((y, i) => (
            <line key={`h${i}`} x1="0" y1={y} x2="390" y2={y}
              stroke="#bde635" strokeWidth={i===1||i===2 ? "1.8" : "1.2"}
              opacity={i===1||i===2 ? "0.55" : "0.35"}
              filter="url(#glow)" />
          ))}
          {/* Verticales principales */}
          {[73, 153, 247, 320].map((x, i) => (
            <line key={`v${i}`} x1={x} y1="0" x2={x} y2="680"
              stroke="#bde635" strokeWidth={i===1||i===2 ? "1.8" : "1.2"}
              opacity={i===1||i===2 ? "0.55" : "0.35"}
              filter="url(#glow)" />
          ))}

          {/* Calles secundarias */}
          {[148, 390, 540].map((y, i) => (
            <line key={`hs${i}`} x1="0" y1={y} x2="390" y2={y}
              stroke="#bde635" strokeWidth="0.6" opacity="0.18" />
          ))}
          {[113, 200, 285].map((x, i) => (
            <line key={`vs${i}`} x1={x} y1="0" x2={x} y2="680"
              stroke="#bde635" strokeWidth="0.6" opacity="0.18" />
          ))}

          {/* Intersecciones brillantes */}
          {[53,175,305].flatMap(y =>
            [73,153,247,320].map(x => (
              <circle key={`i${x}${y}`} cx={x} cy={y} r="2.5"
                fill="#bde635" opacity="0.4" filter="url(#softGlow)" />
            ))
          )}

          {/* Overlay de profundidad */}
          <rect width="390" height="680" fill="url(#centerGlow)" />

          {/* ── PINES DE TIENDAS ── */}
          {filtered.map((store) => {
            const isSelected = selectedStore === store.id;
            const r = getRipple(store.id);
            const sx = (store.x / 100) * 390;
            const sy = (store.y / 100) * 680;

            return (
              <g
                key={store.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedStore(isSelected ? null : store.id)}
              >
                {/* Ripple 1 */}
                <circle cx={sx} cy={sy}
                  r={18 + r * 22}
                  fill="none"
                  stroke={isSelected ? '#fbd400' : '#bde635'}
                  strokeWidth="1"
                  opacity={Math.max(0, 0.55 - r * 0.55)}
                />
                {/* Ripple 2 desfasado */}
                <circle cx={sx} cy={sy}
                  r={18 + ((r + 0.45) % 1) * 22}
                  fill="none"
                  stroke={isSelected ? '#fbd400' : '#bde635'}
                  strokeWidth="0.6"
                  opacity={Math.max(0, 0.3 - ((r + 0.45) % 1) * 0.3)}
                />

                {/* Sombra del pin */}
                <circle cx={sx} cy={sy} r="20"
                  fill={isSelected ? 'rgba(251,212,0,0.15)' : 'rgba(189,230,53,0.12)'}
                  filter="url(#softGlow)"
                />

                {/* Pin fondo */}
                <circle cx={sx} cy={sy} r="18"
                  fill={isSelected
                    ? 'url(#goldPin)'
                    : '#1a2a0a'}
                  stroke={isSelected ? '#fbd400' : '#bde635'}
                  strokeWidth={isSelected ? "2" : "1.5"}
                />

                {/* Emoji */}
                <text x={sx} y={sy + 7}
                  textAnchor="middle"
                  fontSize="18"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  {store.emoji}
                </text>

                {/* VAVIs badge sobre el pin */}
                {!isSelected && (
                  <g>
                    <rect
                      x={sx - 18} y={sy - 30}
                      width="36" height="14"
                      rx="7"
                      fill="#0a1a05"
                      stroke="#bde635"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <text
                      x={sx} y={sy - 20}
                      textAnchor="middle"
                      fontSize="7"
                      fill="#bde635"
                      fontWeight="bold"
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      🪙{store.VAVIs}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* ── PUNTO DEL JUGADOR ── */}
          {/* Glow grande */}
          <circle cx="195" cy="374" r="35" fill="url(#playerGlow)" />
          {/* Radio de alcance */}
          <circle cx="195" cy="374" r="55"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.3"
          />
          {/* Punto */}
          <circle cx="195" cy="374" r="9" fill="#1d4ed8" opacity="0.3" />
          <circle cx="195" cy="374" r="7" fill="#3b82f6" />
          <circle cx="195" cy="374" r="7" fill="none" stroke="white" strokeWidth="1.5" />
          {/* Brillo */}
          <circle cx="193" cy="371" r="2" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Popup tienda seleccionada */}
      {selected && (
        <div
          className="absolute z-40"
          style={{
            left: `${Math.min(Math.max(selected.x, 22), 72)}%`,
            top: `${Math.max(selected.y - 3, 12)}%`,
            transform: 'translate(-50%, -100%)',
            animation: 'popUp 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div
            className="rounded-2xl p-3 relative"
            style={{
              background: 'rgba(6,11,18,0.97)',
              border: '1px solid rgba(251,212,0,0.5)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 0 30px rgba(251,212,0,0.08)',
              minWidth: '170px',
            }}
          >
            <button
              onClick={() => setSelectedStore(null)}
              className="absolute top-2 right-2"
            >
              <X size={13} color="rgba(255,255,255,0.4)" />
            </button>

            <div className="text-2xl mb-2">{selected.emoji}</div>
            <div className="text-white font-bold text-sm mb-0.5">{selected.name}</div>
            <div className="flex items-center gap-1 mb-1">
              <Star size={10} fill="#fbd400" color="#fbd400" />
              <span className="text-xs font-semibold" style={{ color: '#fbd400' }}>{selected.rating}</span>
              <span className="text-xs" style={{ color: '#6b7280' }}>· {selected.distance}</span>
            </div>
            <div className="text-xs mb-3" style={{ color: '#6b7280' }}>{selected.category}</div>

            <div
              className="flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded-xl"
              style={{ background: 'rgba(189,230,53,0.08)', border: '1px solid rgba(189,230,53,0.2)' }}
            >
              <span className="text-sm">🪙</span>
              <span className="font-bold text-sm" style={{ color: '#bde635' }}>
                {selected.VAVIs} VAVIs
              </span>
              <span className="text-xs ml-auto" style={{ color: '#6b7280' }}>al visitar</span>
            </div>

            <button
              className="w-full py-2 rounded-full text-xs font-bold active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #bde635, #84cc16)',
                color: '#191c1e',
              }}
            >
              Ver tienda →
            </button>

            {/* Triangulito dorado */}
            <div style={{
              position: 'absolute', bottom: '-8px', left: '50%',
              transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(251,212,0,0.5)',
            }} />
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: 'rgba(6,11,18,0.88)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(189,230,53,0.2)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}
        >
          <Search size={14} color="#bde635" />
          <input
            type="text"
            placeholder="Buscar tiendas cerca..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-white"
          />
          <span
            className="text-xs px-2 py-1 rounded-full font-semibold shrink-0"
            style={{ background: 'rgba(189,230,53,0.1)', color: '#bde635', border: '1px solid rgba(189,230,53,0.2)' }}
          >
            {filtered.length} tiendas
          </span>
        </div>
      </div>

      {/* Botón ubicación */}
      <button
        className="absolute right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform"
        style={{
          bottom: '145px',
          background: 'rgba(6,11,18,0.9)',
          border: '1px solid rgba(189,230,53,0.25)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <Navigation size={15} color="#bde635" />
      </button>

      {/* Bottom sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pt-8 pb-3"
        style={{
          background: 'linear-gradient(to top, rgba(6,11,18,1) 80%, transparent)',
        }}
      >
        <p className="text-xs mb-2 font-semibold" style={{ color: '#4b5563' }}>
          📍 {filtered.length} tiendas cerca de ti
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {filtered.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store.id === selectedStore ? null : store.id)}
              className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all active:scale-95"
              style={{
                background: selectedStore === store.id
                  ? 'rgba(189,230,53,0.1)'
                  : 'rgba(255,255,255,0.04)',
                border: selectedStore === store.id
                  ? '1px solid rgba(189,230,53,0.4)'
                  : '1px solid rgba(255,255,255,0.06)',
                minWidth: '130px',
              }}
            >
              <span style={{ fontSize: '16px' }}>{store.emoji}</span>
              <div className="text-left">
                <p className="text-white text-xs font-semibold">{store.name}</p>
                <p className="text-xs" style={{ color: '#bde635' }}>🪙{store.VAVIs} · {store.distance}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes popUp {
          from { opacity:0; transform: translate(-50%, -85%) scale(0.85); }
          to   { opacity:1; transform: translate(-50%, -100%) scale(1); }
        }
      `}</style>
    </div>
  );
}