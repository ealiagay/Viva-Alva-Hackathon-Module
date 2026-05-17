 'use client';

import React from 'react';
import { Compass, Map, QrCode, Users, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark?: boolean;
}

export function BottomNav({ activeTab, onTabChange, isDark = true }: BottomNavProps) {
  type Tab = {
    id: string;
    icon?: React.ElementType | null;
    label?: string | null;
    isCenter?: boolean;
  };

  const tabs: Tab[] = [
    { id: 'discover', icon: Compass, label: 'Inicio' },
    { id: 'map', icon: Map, label: 'Mapa' },
    { id: 'wallet', icon: null, label: null, isCenter: true },
    { id: 'community', icon: Users, label: 'Comunidad' },
    { id: 'viva-friday', icon: Sparkles, label: 'Viva Friday' },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40"
      style={{
        background: isDark
          ? 'rgba(8,8,20,0.92)'
          : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(189,230,53,0.2)',
        boxShadow: '0 -4px 30px rgba(189,230,53,0.08)',
      }}
    >
      <div className="flex items-end justify-around px-2 pb-4 pt-2 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          // Botón central (wallet/QR)
          if (tab.isCenter) {
            return (
              <div key={tab.id} className="relative flex flex-col items-center" style={{ marginTop: '-24px' }}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center justify-center rounded-full transition-all active:scale-90"
                  style={{
                    width: '58px',
                    height: '58px',
                    background: 'linear-gradient(135deg, #bde635, #84cc16)',
                    boxShadow: activeTab === tab.id
                      ? '0 0 0 4px rgba(189,230,53,0.3), 0 0 30px rgba(189,230,53,0.6)'
                      : '0 0 20px rgba(189,230,53,0.5)',
                    border: '3px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <QrCode size={26} color="#191c1e" strokeWidth={2.5} />
                </button>
                <span
                  className="text-[9px] font-semibold mt-1.5"
                  style={{ color: activeTab === tab.id ? '#bde635' : isDark ? '#666' : '#999' }}
                >
                  VAVIs
                </span>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all active:scale-90"
              style={{ minWidth: '52px' }}
            >
              {/* Icono con fondo activo */}
              <div
                className="flex items-center justify-center rounded-xl transition-all"
                style={{
                  width: '38px',
                  height: '32px',
                  background: isActive
                    ? 'rgba(189,230,53,0.15)'
                    : 'transparent',
                }}
              >
                {Icon ? (
                  <Icon
                    size={20}
                    color={isActive ? '#bde635' : isDark ? '#555' : '#aaa'}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                ) : null}
              </div>

              {/* Label */}
              <span
                className="text-[9px] font-semibold transition-all"
                style={{ color: isActive ? '#bde635' : isDark ? '#555' : '#aaa' }}
              >
                {tab.label}
              </span>

              {/* Dot indicador activo */}
              {isActive && (
                <div
                  className="rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: '#bde635',
                    boxShadow: '0 0 6px #bde635',
                    marginTop: '-2px',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}