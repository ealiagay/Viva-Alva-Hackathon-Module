'use client';

import { Users } from 'lucide-react';

interface CommunityScreenProps {
  isDark?: boolean;
}

export function CommunityScreen({ isDark = true }: CommunityScreenProps) {
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  const textColor = isDark ? 'text-white' : 'text-[#191c1e]';
  
  return (
    <div className="h-full flex flex-col pb-24 items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="text-center space-y-4">
        <Users size={48} className="mx-auto opacity-80" style={{ color: isDark ? 'white' : '#191c1e' }} />
        <h2 className="text-2xl font-bold" style={{ color: isDark ? 'white' : '#191c1e' }}>
          Próximamente 🚀
        </h2>
      </div>
    </div>
  );
}
