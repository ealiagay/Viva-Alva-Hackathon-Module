'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Heart, 
  Gift, 
  X, 
  ArrowLeft, 
  Flame 
} from 'lucide-react';

interface VivaFridayScreenProps {
  isDark?: boolean;
}

export function VivaFridayScreen({ isDark = true }: VivaFridayScreenProps) {
  // Manteniendo tu lógica de color de fondo dinámico
  const bgColor = isDark ? '#0f0f1a' : '#f8f9fb';
  const textColor = isDark ? 'text-white' : 'text-neutral-900';
  const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const cardBg = isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200';

  // Estado para controlar la visibilidad del Pop-up promocional inicial
  const [showPopup, setShowPopup] = useState(true);

  // Simulación de un contador regresivo real para el VIVA Day
  const [timeLeft, setTimeLeft] = useState({ horas: 12, minutos: 45, segundos: 14 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.segundos > 0) return { ...prev, segundos: prev.segundos - 1 };
        if (prev.minutos > 0) return { ...prev, minutos: prev.minutos - 1, segundos: 59 };
        if (prev.horas > 0) return { horas: prev.horas - 1, minutos: 59, segundos: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Datos mockeados
  const productos = [
    {
      id: 1,
      nombre: 'Camiseta Eco-Fundación',
      antes: '2.000',
      ahora: '1.000',
      quedan: 5,
      imagen: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600',
    },
    {
      id: 2,
      nombre: 'Termo Reutilizable',
      antes: '1.500',
      ahora: '750',
      quedan: 0,
      imagen: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600',
    },
    {
      id: 3,
      nombre: 'Kit de Cultivo Urbano',
      antes: '3.000',
      ahora: '1.500',
      quedan: 3,
      imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600',
    },
    {
      id: 4,
      nombre: 'Bolsa Artesanal',
      antes: '1.000',
      ahora: '500',
      quedan: 8,
      imagen: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600',
    },
  ];

  return (
    // CORRECCIÓN: h-full en lugar de min-h-screen. Ocultar scrollbar como en DiscoverScreen.
    <div 
      className="h-full w-full flex flex-col pb-24 overflow-y-auto font-sans transition-colors duration-300 relative" 
      style={{ backgroundColor: bgColor, scrollbarWidth: 'none' }}
    >
      {/* --- HEADER DE NAVEGACIÓN --- */}
      <div className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-800/10 dark:border-neutral-200/10 shrink-0">
        <div className="flex items-center gap-3">
          <button className={`p-2 -ml-2 rounded-full hover:bg-neutral-500/15 transition`}>
            <ArrowLeft className={`w-5 h-5 ${textColor}`} />
          </button>
          <div>
            <h1 className={`text-xl font-bold ${textColor}`}>VIVA Days</h1>
            <p className="text-xs text-lime-500 font-semibold tracking-wide">Beneficios ALVA</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="w-full px-4 mt-6 space-y-6">
        
        {/* BANNER PRINCIPAL */}
        <div className="w-full bg-[#8200f5] rounded-3xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col gap-4">
          <div className="space-y-1 z-10">
            <p className="text-[10px] text-purple-200 uppercase tracking-widest font-bold">Tu Perfil Unificado</p>
            <h2 className="text-2xl font-black tracking-tight">Tienes: 1.200 Pts</h2>
            <p className="text-sm text-lime-400 font-extrabold flex items-center gap-1">
              ¡Hoy valen como 2.400!
            </p>
            <div className="flex items-center gap-2 text-[11px] text-purple-100/80 pt-2 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              Poder de compra duplicado
            </div>
          </div>

          {/* Mini-contador integrado */}
          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center justify-center gap-2 z-10">
            <Clock className="w-4 h-4 text-lime-400" />
            <div className="flex gap-1 font-mono text-xs font-bold">
              <span>{String(timeLeft.horas).padStart(2, '0')}h</span>:
              <span>{String(timeLeft.minutos).padStart(2, '0')}m</span>:
              <span className="text-lime-400">{String(timeLeft.segundos).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN: PRODUCTOS --- */}
        <div className="space-y-3">
          <div>
            <h3 className={`text-base font-bold ${textColor}`}>Productos Disponibles</h3>
            <p className={`text-[11px] ${subTextColor}`}>Apoyan a la Fundación VIVA</p>
          </div>

          {/* CORRECCIÓN: Grid ajustado para móvil (2 columnas) */}
          <div className="grid grid-cols-2 gap-3">
            {productos.map((prod) => (
              <div 
                key={prod.id} 
                className={`rounded-2xl border ${cardBg} overflow-hidden shadow-sm flex flex-col justify-between`}
              >
                <div className="relative aspect-square w-full bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-lime-400 text-neutral-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    2X PTS
                  </span>
                  {prod.quedan > 0 ? (
                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-white" /> {prod.quedan}
                    </span>
                  ) : (
                    <span className="absolute top-1.5 right-1.5 bg-neutral-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Agotado
                    </span>
                  )}
                </div>

                <div className="p-2.5 flex flex-col flex-grow justify-between gap-2">
                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-bold leading-tight line-clamp-2 ${textColor}`}>
                      {prod.nombre}
                    </h4>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 line-through font-medium">{prod.antes} pts</span>
                      <span className="text-sm font-black text-[#8200f5] dark:text-purple-400">{prod.ahora} pts</span>
                    </div>
                  </div>

                  <button 
                    disabled={prod.quedan === 0}
                    className={`w-full py-1.5 rounded-lg font-bold text-[10px] transition-all ${
                      prod.quedan > 0 
                        ? 'bg-[#8200f5] text-white hover:bg-[#6c00d4] active:scale-95' 
                        : 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {prod.quedan > 0 ? 'Canjear' : 'Sin Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TARJETA IMPACTO SOCIAL --- */}
        <div className={`w-full rounded-2xl border ${cardBg} p-5 text-center flex flex-col items-center gap-2 mb-4`}>
          <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20">
            <Heart className="w-5 h-5 text-[#8200f5] dark:text-purple-400 fill-current" />
          </div>
          <div className="space-y-1">
            <h4 className={`text-sm font-bold ${textColor}`}>Impacto de mis puntos</h4>
            <p className={`text-[11px] leading-tight ${subTextColor}`}>
              Tus canjes ayudan a los programas de conservación.
            </p>
          </div>
        </div>

      </div>

      {/* CORRECCIÓN POP-UP: absolute inset-0 en lugar de fixed para que no se salga del celular */}
      {showPopup && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in">
          <div className="relative w-full bg-[#8200f5] rounded-3xl p-6 text-white text-center shadow-2xl border border-white/10 flex flex-col items-center gap-4">
            
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-1.5 bg-black/20 rounded-full active:scale-90"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mt-2">
              <Gift className="w-7 h-7 text-white animate-bounce" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black tracking-tight">
                ✨ ¡VIVA DAY! ✨
              </h2>
              <p className="text-xs text-purple-200 px-2 font-medium leading-tight">
                Tus puntos valen el <span className="text-lime-400 font-extrabold">DOBLE</span> por las próximas:
              </p>
            </div>

            <div className="bg-black/20 border border-white/10 w-full rounded-2xl p-3 flex justify-center items-center gap-3 font-mono">
              <div className="flex flex-col">
                <span className="text-2xl font-black">{String(timeLeft.horas).padStart(2, '0')}</span>
                <span className="text-[9px] text-purple-200 font-sans font-semibold">Horas</span>
              </div>
              <span className="text-xl font-black animate-pulse">:</span>
              <div className="flex flex-col">
                <span className="text-2xl font-black">{String(timeLeft.minutos).padStart(2, '0')}</span>
                <span className="text-[9px] text-purple-200 font-sans font-semibold">Min</span>
              </div>
              <span className="text-xl font-black animate-pulse">:</span>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-lime-400">{String(timeLeft.segundos).padStart(2, '0')}</span>
                <span className="text-[9px] text-purple-200 font-sans font-semibold">Seg</span>
              </div>
            </div>

            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#a3e635] text-neutral-900 font-black text-sm py-3 rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-wide mt-2"
            >
              Ir a Canjear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}