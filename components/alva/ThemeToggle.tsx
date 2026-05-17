'use client';

import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 z-40 px-4 py-2 rounded-full glass bg-white/20 hover:bg-white/30 transition-all text-white font-medium flex items-center gap-2"
      aria-label="Toggle theme"
    >
      <span>{isDark ? '☀️' : '🌙'}</span>
      <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
