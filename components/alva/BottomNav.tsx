'use client';

import { Compass, Map, QrCode, Users, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark?: boolean;
}

export function BottomNav({ activeTab, onTabChange, isDark = true }: BottomNavProps) {
  const tabs = [
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'wallet', icon: null, label: null, isCenter: true },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'viva-friday', icon: Sparkles, label: 'Viva Friday' },
  ];

  const bgColor = isDark ? 'black' : 'white';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const navBgColor = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)';
  const textColor = isDark ? '#999' : '#666';
  const activeColor = '#bde635';

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30" style={{ backgroundColor: bgColor, borderTop: `1px solid ${borderColor}` }}>
      <div className="glass rounded-none border-0 flex items-center justify-around px-2 py-3 relative" style={{ 
        backgroundColor: navBgColor,
        borderTop: `1px solid ${borderColor}`
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-primary via-primary to-primary shadow-lg shadow-primary/50 flex items-center justify-center text-black transition-all duration-300 hover:shadow-primary/70 hover:scale-110"
              >
                <QrCode size={28} />
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-300"
              style={{
                color: isActive ? activeColor : textColor,
                backgroundColor: isActive ? (isDark ? 'rgba(189, 230, 53, 0.2)' : 'rgba(189, 230, 53, 0.15)') : 'transparent'
              }}
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
