'use client';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-black to-[#1a1a1a] p-4">
      {/* Phone frame */}
      <div className="relative w-full max-w-[390px] h-screen max-h-screen md:max-h-[844px] bg-black rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-900">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 border-l border-r border-b border-gray-900" />
        
        {/* Content */}
        <div className="h-full overflow-hidden bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
