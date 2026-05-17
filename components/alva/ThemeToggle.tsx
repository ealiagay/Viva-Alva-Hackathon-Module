'use client';

import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="absolute top-4 right-4 z-40 transition-all active:scale-90"
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: isDark
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(0,0,0,0.08)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(0,0,0,0.1)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}