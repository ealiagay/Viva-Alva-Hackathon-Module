'use client';

import { useState } from 'react';
import { ScreenContainer } from '@/components/alva/ScreenContainer';
import { BottomNav } from '@/components/alva/BottomNav';
import { ThemeToggle } from '@/components/alva/ThemeToggle';
import { ThemeProvider, useTheme } from '@/components/alva/ThemeContext';
import { DiscoverScreen } from '@/components/alva/screens/DiscoverScreen';
import { MapScreen } from '@/components/alva/screens/MapScreen';
import { WalletScreen } from '@/components/alva/screens/WalletScreen';
import { CommunityScreen } from '@/components/alva/screens/CommunityScreen';
import { VivaFridayScreen } from '@/components/alva/screens/VivaFridayScreen';

function HomeContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('discover');

  const renderScreen = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverScreen isDark={isDark} />;
      case 'map':
        return <MapScreen isDark={isDark} />;
      case 'wallet':
        return <WalletScreen isDark={isDark} />;
      case 'community':
        return <CommunityScreen isDark={isDark} />;
      case 'viva-friday':
        return <VivaFridayScreen isDark={isDark} />;
      default:
        return <DiscoverScreen isDark={isDark} />;
    }
  };

  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  
  return (
    <ScreenContainer>
      <div className="relative h-full w-full" style={{ backgroundColor: bgColor }}>
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Screen content */}
        <div className="h-full w-full overflow-hidden">
          {renderScreen()}
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />
      </div>
    </ScreenContainer>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
