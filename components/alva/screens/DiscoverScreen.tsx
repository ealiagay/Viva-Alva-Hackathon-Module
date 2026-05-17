'use client';

import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

const mockCards = [
  {
    id: 1,
    title: 'Urban Sunset at Marina',
    location: 'San Francisco, CA',
    gradient: 'from-orange-500 via-pink-500 to-red-500',
    creator: 'Sarah Chen',
    likes: 2340,
    liked: false,
  },
  {
    id: 2,
    title: 'Mountain Peak Adventure',
    location: 'Colorado, USA',
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    creator: 'Alex Rivera',
    likes: 1892,
    liked: false,
  },
  {
    id: 3,
    title: 'Neon Tokyo Streets',
    location: 'Tokyo, Japan',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    creator: 'Jun Tanaka',
    likes: 3210,
    liked: true,
  },
];

interface DiscoverScreenProps {
  isDark?: boolean;
}

export function DiscoverScreen({ isDark = true }: DiscoverScreenProps) {
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  const textColor = isDark ? 'text-white' : 'text-[#191c1e]';
  
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory pb-24" style={{ backgroundColor: bgColor }}>
      {mockCards.map((card) => (
        <div
          key={card.id}
          className="relative w-full h-screen snap-start overflow-hidden"
        >
          {/* Background gradient - full bleed */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
          />

          {/* Dark overlay at bottom 40% only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 from-40% to-transparent" />

          {/* Creator info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{card.creator}</h2>
                <p className="text-sm text-gray-200">{card.title}</p>
              </div>
              <button className="glass-button bg-primary text-black font-semibold hover:bg-primary/90">
                Follow
              </button>
            </div>
          </div>

          {/* Right sidebar with actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">
            {/* Heart */}
            <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-all">
                <Heart
                  size={24}
                  className={card.liked ? 'fill-red-500 text-red-500' : ''}
                />
              </div>
              <span className="text-xs font-semibold">{card.likes}</span>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-all">
                <MessageCircle size={24} />
              </div>
              <span className="text-xs font-semibold">123</span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center hover:bg-white/30 transition-all">
                <Share2 size={24} />
              </div>
              <span className="text-xs font-semibold">45</span>
            </button>
          </div>

          {/* Scroll indicator on left */}
          <div className="absolute left-4 bottom-32 text-white text-xs font-medium opacity-50">
            ↓ Scroll
          </div>
        </div>
      ))}
    </div>
  );
}
