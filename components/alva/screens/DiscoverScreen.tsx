'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, UserPlus, ChevronDown, X, Send } from 'lucide-react';

const mockCards = [
  {
    id: 1,
    storeName: 'El Rincón Gourmet',
    location: 'Zona Sur, La Paz',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    category: '🍔 Restaurante',
    coins: 50,
    likes: 2340,
    comments: 124,
    shares: 45,
  },
  {
    id: 2,
    storeName: 'Café Mirador',
    location: 'Sopocachi, La Paz',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
    category: '☕ Cafetería',
    coins: 30,
    likes: 891,
    comments: 67,
    shares: 23,
  },
  {
    id: 3,
    storeName: 'Sushi Andino',
    location: 'Calacoto, La Paz',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
    category: '🍱 Japonés',
    coins: 75,
    likes: 3210,
    comments: 198,
    shares: 89,
  },
  {
    id: 4,
    storeName: 'Pizza del Valle',
    location: 'Miraflores, La Paz',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    category: '🍕 Italiana',
    coins: 40,
    likes: 1567,
    comments: 89,
    shares: 34,
  },
];

const mockComments = [
  { id: 1, user: 'María G.', avatar: '👩', text: '¡La mejor hamburguesa de La Paz! 🔥', time: '2m' },
  { id: 2, user: 'Carlos R.', avatar: '👨', text: 'Fui ayer, increíble el servicio', time: '15m' },
  { id: 3, user: 'Ana P.', avatar: '👩‍🦱', text: 'Las alvitas que gané las usé de descuento 🪙', time: '1h' },
  { id: 4, user: 'Diego M.', avatar: '🧑', text: 'Recomendadísimo para el almuerzo', time: '2h' },
  { id: 5, user: 'Sofía L.', avatar: '👧', text: '¿Aceptan tarjeta? Pregunta real jaja', time: '3h' },
];

interface DiscoverScreenProps {
  isDark?: boolean;
}

export function DiscoverScreen({ isDark = true }: DiscoverScreenProps) {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [followed, setFollowed] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(mockCards.map((c) => [c.id, c.likes]))
  );
  const [commentOpen, setCommentOpen] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const wasLiked = prev[id];
      setLikeCounts((counts) => ({
        ...counts,
        [id]: counts[id] + (wasLiked ? -1 : 1),
      }));
      return { ...prev, [id]: !wasLiked };
    });
  };

  const formatCount = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory" style={{ scrollbarWidth: 'none' }}>
      {mockCards.map((card) => (
        <div
          key={card.id}
          className="relative w-full snap-start overflow-hidden"
          style={{ height: '100%' }}
        >
          {/* Imagen con object-position arriba para mostrar la comida */}
          <img
            src={card.imageUrl}
            alt={card.storeName}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />

          {/* Overlay degradado — más suave arriba, más oscuro abajo */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 45%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.95) 100%)',
            }}
          />

          {/* TOP BAR */}
          <div className="absolute top-10 left-4 right-4 flex items-center justify-between z-20">
            <span className="text-xl font-extrabold" style={{ color: '#bde635' }}>
              alva
            </span>
            {/* Alvitas badge — alejado del toggle */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(189,230,53,0.3)',
                color: '#bde635',
              }}
            >
              🪙 2,450
            </div>
          </div>

          {/* INFO TIENDA — bottom left */}
          <div className="absolute left-4 right-20 z-20" style={{ bottom: '90px' }}>
            {/* Follow + Category row */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: '#bde635', color: '#191c1e' }}
              >
                {card.category}
              </span>
              <button
                onClick={() => setFollowed(p => ({ ...p, [card.id]: !p[card.id] }))}
                className="text-xs font-bold px-3 py-1 rounded-full transition-all active:scale-95"
                style={{
                  background: followed[card.id] ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)',
                  color: followed[card.id] ? '#fff' : '#191c1e',
                  border: followed[card.id] ? '1px solid rgba(255,255,255,0.4)' : 'none',
                }}
              >
                {followed[card.id] ? '✓ Siguiendo' : '+ Seguir'}
              </button>
            </div>

            {/* Store name */}
            <h2 className="text-xl font-extrabold text-white mb-0.5 leading-tight">
              {card.storeName}
            </h2>

            {/* Location */}
            <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              📍 {card.location}
            </p>

            {/* Alvitas badge */}
            <div
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'rgba(189,230,53,0.15)',
                color: '#bde635',
                border: '1px solid rgba(189,230,53,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              🪙 Gana {card.coins} alvitas al visitar
            </div>
          </div>

          {/* SIDEBAR DERECHO */}
          <div
            className="absolute right-3 flex flex-col items-center gap-4 z-20"
            style={{ bottom: '95px' }}
          >
            {/* Like */}
            <button
              onClick={() => toggleLike(card.id)}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Heart
                  size={21}
                  className={liked[card.id] ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </div>
              <span className="text-white text-[11px] font-semibold">
                {formatCount(likeCounts[card.id])}
              </span>
            </button>

            {/* Comment — abre sheet */}
            <button
              onClick={() => setCommentOpen(card.id)}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <MessageCircle size={21} className="text-white" />
              </div>
              <span className="text-white text-[11px] font-semibold">{card.comments}</span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Share2 size={21} className="text-white" />
              </div>
              <span className="text-white text-[11px] font-semibold">{card.shares}</span>
            </button>

            {/* Coin */}
            <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-lg"
                style={{
                  background: 'linear-gradient(135deg, #bde635, #84cc16)',
                  boxShadow: '0 0 16px rgba(189,230,53,0.55)',
                }}
              >
                🪙
              </div>
              <span className="text-[11px] font-bold" style={{ color: '#bde635' }}>
                +{card.coins}
              </span>
            </button>
          </div>

          {/* Swipe hint */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5"
            style={{ bottom: '72px', opacity: 0.45 }}
          >
            <ChevronDown size={16} className="text-white" />
          </div>

          {/* COMMENTS BOTTOM SHEET */}
          {commentOpen === card.id && (
            <div className="absolute inset-0 z-50 flex flex-col justify-end">
              {/* Backdrop */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                onClick={() => setCommentOpen(null)}
              />

              {/* Sheet */}
              <div
                className="relative rounded-t-3xl flex flex-col"
                style={{
                  background: '#0f0f1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  maxHeight: '70%',
                  animation: 'slideUp 0.25s ease-out',
                }}
              >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-white font-bold text-sm">{card.comments} comentarios</span>
                  <button onClick={() => setCommentOpen(null)}>
                    <X size={18} color="rgba(255,255,255,0.5)" />
                  </button>
                </div>

                {/* Comments list */}
                <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
                  {mockComments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        {c.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-white text-xs font-semibold">{c.user}</span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.time}</span>
                        </div>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div
                  className="px-4 py-3 flex items-center gap-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                    style={{ background: 'rgba(189,230,53,0.2)' }}
                  >
                    😊
                  </div>
                  <div
                    className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <input
                      type="text"
                      placeholder="Escribe un comentario..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-white text-sm"
                      style={{ fontSize: '13px' }}
                    />
                    {commentText.length > 0 && (
                      <button onClick={() => setCommentText('')}>
                        <Send size={15} style={{ color: '#bde635' }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}