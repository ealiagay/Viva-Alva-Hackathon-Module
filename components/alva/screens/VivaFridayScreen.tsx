'use client';

import { Sparkles } from 'lucide-react';

interface VivaFridayScreenProps {
  isDark?: boolean;
}

export function VivaFridayScreen({ isDark = true }: VivaFridayScreenProps) {
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  
  return (
    <div className="h-full flex flex-col pb-24 items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="text-center space-y-4">
        <Sparkles size={48} className="text-accent mx-auto opacity-80" />
        <h2 className="text-2xl font-bold text-accent">
          En proceso ⚡
        </h2>
      </div>
    </div>
  );
}
