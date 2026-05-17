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
import { LoginScreen } from '@/components/alva/screens/LoginScreen'; // Importamos el nuevo módulo

function HomeContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('discover');
  
  // Estado global para controlar la sesión interactiva del Demo
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {/* Theme toggle siempre visible para interactividad */}
        <ThemeToggle />

        {/* Condicional: Si no está logueado, muestra el flujo de detección automática SIM */}
        {!isLoggedIn ? (
          <LoginScreen 
            isDark={isDark} 
            onLoginSuccess={() => setIsLoggedIn(true)} 
          />
        ) : (
          <>
            {/* Screen content de la Super App cuando el logueo automático fue exitoso */}
            <div className="h-full w-full overflow-hidden">
              {renderScreen()}
            </div>

            {/* Bottom navigation */}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} isDark={isDark} />
          </>
        )}
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