'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Wifi, ArrowRight, Smartphone, CheckCircle } from 'lucide-react';

interface LoginScreenProps {
  isDark: boolean;
  onLoginSuccess: () => void;
}

export function LoginScreen({ isDark, onLoginSuccess }: LoginScreenProps) {
  const [status, setStatus] = useState<'scanning' | 'typing' | 'validating' | 'detected'>('scanning');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Simulación inicial de escaneo automático de red por 2.5 segundos
    const timer = setTimeout(() => {
      setStatus('typing');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleValidateNumber = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica de formato de celular en Bolivia (8 dígitos, empieza con 6 o 7)
    if (!/^[67]\d{7}$/.test(phoneNumber)) {
      setError('Introduce un número de celular VIVA válido (8 dígitos, inicia con 6 o 7).');
      return;
    }

    setStatus('validating');

    // 2. Simulación de validación criptográfica con la antena / HLR de VIVA
    setTimeout(() => {
      setStatus('detected');
    }, 1800);
  };

  // Autocompletado rápido para el Pitch de la Hackathon (Efecto WoW frente al jurado)
  const handleQuickFill = () => {
    setPhoneNumber('76543210');
    setError('');
  };

  const bgMain = isDark ? '#0f0f1a' : '#f8f9fb';
  const bgCard = isDark ? '#1a1a2e' : '#ffffff';
  const textTitle = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const textSub = isDark ? 'text-[#8a8f98]' : 'text-[#5a5f66]';
  const borderCard = isDark ? 'border-[#2a2a40]' : 'border-[#eef0f3]';

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 font-sans select-none" style={{ backgroundColor: bgMain }}>
      
      {/* SECCIÓN SUPERIOR: BRANDING */}
      <div className="flex flex-col items-center text-center mt-8 space-y-3">
        <div className="bg-[#6e3ff3]/10 p-4 rounded-3xl border border-[#6e3ff3]/20 animate-pulse">
          <ShieldCheck size={36} className="text-[#6e3ff3]" />
        </div>
        <div className="space-y-1">
          <h1 className={`text-3xl font-black tracking-tight ${textTitle}`}>
            VIVA <span className="text-[#6e3ff3]">ALVA</span>
          </h1>
          <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#6e3ff3]">
            Super App White Label
          </p>
        </div>
      </div>

      {/* SECCIÓN CENTRAL: LOGIN DINÁMICO & VALIDACIÓN */}
      <div className={`p-6 rounded-3xl border shadow-xl transition-all duration-500 ${bgCard} ${borderCard}`}>
        
        {/* ESTADO 1: ESCANEO INICIAL */}
        {status === 'scanning' && (
          <div className="space-y-4 py-6 text-center animate-fade-in">
            <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#c4d82e]/20 animate-ping" />
              <Cpu size={24} className="text-[#c4d82e] relative z-10" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-sm font-bold ${textTitle}`}>Protocolo Zero-Friction</h3>
              <p className={`text-xs ${textSub} animate-pulse`}>
                Sincronizando identidad con la red celular VIVA...
              </p>
            </div>
            <div className="flex justify-center items-center gap-1.5 text-[10px] bg-[#8a8f98]/10 text-[#8a8f98] font-bold px-3 py-1 rounded-full w-max mx-auto">
              <Wifi size={10} className="animate-bounce" /> Red Celular LTE Activa
            </div>
          </div>
        )}

        {/* ESTADO 2: SE FORMULA EL INGRESO DEL NÚMERO */}
        {status === 'typing' && (
          <form onSubmit={handleValidateNumber} className="space-y-4 animate-fade-in">
            <div className="text-center space-y-1 mb-2">
              <h3 className={`text-base font-bold ${textTitle}`}>Verificación de Línea SIM</h3>
              <p className={`text-xs ${textSub}`}>
                Ingresa tu número para validar tu chip de forma automática.
              </p>
            </div>

            <div className="space-y-2">
              <label className={`text-[11px] font-bold uppercase tracking-wider ${textSub} block`}>
                Número de Celular
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xs font-bold text-[#8a8f98] border-r border-[#8a8f98]/20 pr-2">
                  +591
                </span>
                <input
                  type="tel"
                  maxLength={8}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej. 76543210"
                  className={`w-full bg-[#8a8f98]/5 border text-sm font-bold py-3.5 pl-16 pr-4 rounded-xl outline-none transition-all ${
                    error ? 'border-red-500 text-red-500' : 'border-[#8a8f98]/20 focus:border-[#6e3ff3]'
                  } ${isDark ? 'text-white' : 'text-[#1e1e1e]'}`}
                />
              </div>
              {error && <p className="text-[10px] text-red-500 font-medium px-1">{error}</p>}
            </div>

            {/* BOTÓN DE VALIDACIÓN */}
            <button
              type="submit"
              className="w-full bg-[#6e3ff3] text-white font-bold py-3 px-4 rounded-xl text-xs hover:bg-[#6e3ff3]/90 transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Smartphone size={14} />
              Validar Chip SIM VIVA
            </button>

            {/* ATAJO RÁPIDO PARA EL PITCH DE LA HACKATHON */}
            <div className="pt-2 text-center border-t border-[#8a8f98]/10">
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-[#6e3ff3] font-bold hover:underline"
              >
                ⚡ Auto-completar con 76543210
              </button>
            </div>
          </form>
        )}

        {/* ESTADO 3: PROCESANDO CRIPTOGRAFÍA */}
        {status === 'validating' && (
          <div className="space-y-4 py-6 text-center animate-fade-in">
            <div className="w-10 h-10 border-4 border-[#6e3ff3]/20 border-t-[#6e3ff3] rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className={`text-xs font-bold ${textTitle}`}>Validando HLR Integrado</h3>
              <p className={`text-[11px] ${textSub}`}>
                Verificando propiedad física del chip SIM asignado a la línea +591 {phoneNumber}...
              </p>
            </div>
          </div>
        )}

        {/* ESTADO 4: EXCELENTE! APARECE EL BOTÓN ZERO-FRICTION */}
        {status === 'detected' && (
          <div className="space-y-5 py-2 text-center animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#c4d82e]/15 flex items-center justify-center border border-[#c4d82e]/40 shadow-inner">
              <CheckCircle size={24} className="text-[#c4d82e]" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-black tracking-widest text-white bg-[#6e3ff3] px-2.5 py-0.5 rounded-md shadow-sm">
                Chip SIM Validado 🇧🇴
              </span>
              <h2 className={`text-2xl font-black ${textTitle} tracking-tight pt-1.5`}>
                +591 {phoneNumber.replace(/(\d{4})(\d{4})/, '$1 $2')}
              </h2>
              <p className={`text-xs max-w-[245px] mx-auto ${textSub}`}>
                Identidad de red confirmada sin intermediarios ni SMS. Accede de forma directa a la Super App.
              </p>
            </div>

            {/* EL GRAN BOTÓN "INGRESAR EN UN CLIC ->" */}
            <button
              onClick={onLoginSuccess}
              className="w-full bg-[#c4d82e] text-[#1e1e1e] font-black py-4 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-[#c4d82e]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer animate-pulse"
            >
              Ingresar en un Clic
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>

      {/* SECCIÓN INFERIOR: MENSAJE COMPLEMENTARIO */}
      <div className="text-center mb-2">
        <p className={`text-[10px] font-medium max-w-[260px] mx-auto ${textSub}`}>
          Alva Core Architecture v3 · Conectividad asíncrona validada por Salamanca Solutions.
        </p>
      </div>

    </div>
  );
}