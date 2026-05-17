'use client';

import { useState } from 'react';
import { Users, UserPlus, Shield, Trophy, Zap, Share2, CheckCircle2 } from 'lucide-react';

interface CommunityScreenProps {
  isDark?: boolean;
}

export function CommunityScreen({ isDark = false }: CommunityScreenProps) {
  // Estados para simular interactividad en la Demo sin backend
  const [clanMembers, setClanMembers] = useState([
    { id: 1, name: 'Tú', role: 'Líder', active: true, initials: 'VU' },
    { id: 2, name: 'Efraín B.', role: 'Miembro', active: true, initials: 'EB' },
    { id: 3, name: 'Nezareth A.', role: 'Miembro', active: true, initials: 'NA' },
  ]);
  const [currentProgress, setCurrentProgress] = useState(620); // MBs actuales
  const [isElite, setIsElite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const targetProgress = 1000; // Meta del Clan

  // Función para simular invitar un nuevo amigo (Crecimiento Orgánico)
  const handleInviteFriend = () => {
    if (clanMembers.length < 5) {
      const names = ['Edwin A.', 'Christian L.', 'Yoel T.'];
      const nextName = names[clanMembers.length - 3] || 'Invitado';
      const initials = nextName.split(' ').map(n => n[0]).join('');
      
      setClanMembers([...clanMembers, {
        id: clanMembers.length + 1,
        name: nextName,
        role: 'Miembro',
        active: true,
        initials: initials
      }]);
      
      // Simular que el nuevo miembro aporta datos al progreso de atención activa
      setCurrentProgress(prev => Math.min(prev + 130, targetProgress));
    }
  };

  // Función para simular simular el botón de pánico / simular meta completada instantánea
  const handleSimulateProgress = () => {
    setCurrentProgress(targetProgress);
    setIsElite(true);
  };

  // Configuración dinámica de estilos respetando el Theme
  const bgMain = isDark ? '#0f0f1a' : '#f8f9fb';
  const bgCard = isDark ? '#1a1a2e' : '#ffffff';
  const textTitle = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const textSub = isDark ? 'text-[#8a8f98]' : 'text-[#5a5f66]';

  return (
    <div className="h-full w-full overflow-y-auto pb-28 p-4 font-sans selection:bg-[#c4d82e]" style={{ backgroundColor: bgMain }}>
      
      {/* HEADER PRINCIPAL */}
      <div className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className={`text-2xl font-black tracking-tight ${textTitle}`}>VIVA Clanes</h1>
          <p className={`text-xs ${textSub}`}>Multiplica tus recompensas en comunidad</p>
        </div>
        <div className="flex items-center gap-2 bg-[#6e3ff3]/10 px-3 py-1.5 rounded-full border border-[#6e3ff3]/20">
          <Trophy size={16} className="text-[#6e3ff3]" />
          <span className="text-xs font-bold text-[#6e3ff3]">1,250 VAVIs</span>
        </div>
      </div>

      {/* TARJETA DE RANGO / NIVEL */}
      <div className="p-4 rounded-2xl mb-6 shadow-sm border transition-all duration-300" 
           style={{ backgroundColor: bgCard, borderColor: isDark ? '#2a2a40' : '#eef0f3' }}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isElite ? 'bg-[#c4d82e]/20' : 'bg-[#6e3ff3]/10'}`}>
              <Shield size={20} className={isElite ? 'text-[#c4d82e]' : 'text-[#6e3ff3]'} />
            </div>
            <div>
              <span className={`text-xs font-medium block ${textSub}`}>Tu Rango Actual</span>
              <span className={`font-black text-base ${isElite ? 'text-[#c4d82e]' : 'text-[#6e3ff3]'}`}>
                {isElite ? 'NIVEL ÉLITE 🌟' : 'NIVEL BÁSICO'}
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider bg-[#8a8f98]/10 px-2.5 py-1 rounded-md font-bold" style={{ color: isDark ? '#8a8f98' : '#1e1e1e' }}>
            {isElite ? 'Anuncios Premium Activos' : 'Falta poco'}
          </span>
        </div>
        
        <p className={`text-xs mb-3 ${textSub}`}>
          {isElite 
            ? '¡Felicidades! Tu clan alcanzó el nivel Élite. Ahora ganan 2x más por atención verificada.' 
            : 'Completen la meta colectiva de ahorro de megas del mes para ascender todos a Élite.'}
        </p>

        {/* BARRA DE PROGRESO */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span style={{ color: isDark ? '#8a8f98' : '#1e1e1e' }}>Progreso del Clan</span>
            <span className="text-[#6e3ff3]">{currentProgress} / {targetProgress} MB</span>
          </div>
          <div className="w-full h-3 bg-[#8a8f98]/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6e3ff3] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentProgress / targetProgress) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* MÓDULO: INTEGRANTES DEL CLAN */}
      <div className="p-4 rounded-2xl mb-6 shadow-sm border"
           style={{ backgroundColor: bgCard, borderColor: isDark ? '#2a2a40' : '#eef0f3' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`font-bold text-sm uppercase tracking-wider ${textTitle}`}>Tu Clan de Ahorro</h2>
          <span className="text-xs font-bold text-[#6e3ff3]">{clanMembers.length}/5 Integrantes</span>
        </div>

        {/* FILA DE AVATARES INTERACTIVOS */}
        <div className="flex items-center gap-3 mb-5">
          {clanMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-1 group relative">
              <div className="w-12 h-12 rounded-full bg-[#6e3ff3] text-white font-bold text-sm flex items-center justify-center border-2 border-[#f8f9fb] shadow-md relative transition-transform group-hover:scale-105">
                {member.initials}
                {member.role === 'Líder' && (
                  <span className="absolute -top-1 -right-1 bg-[#c4d82e] text-[#1e1e1e] p-0.5 rounded-full text-[8px] font-black">👑</span>
                )}
              </div>
              <span className={`text-[10px] font-medium truncate w-12 text-center ${textSub}`}>{member.name}</span>
            </div>
          ))}

          {/* ESPACIOS VACÍOS SIMULADOS */}
          {Array.from({ length: 5 - clanMembers.length }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 opacity-50">
              <button 
                onClick={handleInviteFriend}
                className="w-12 h-12 rounded-full border-2 border-dashed border-[#8a8f98] flex items-center justify-center text-[#8a8f98] hover:border-[#6e3ff3] hover:text-[#6e3ff3] transition-colors cursor-pointer"
              >
                <UserPlus size={18} />
              </button>
              <span className="text-[10px] font-bold text-[#8a8f98]">Unirse</span>
            </div>
          ))}
        </div>

        {/* BOTÓN DE ACCIÓN PRINCIPAL (VERDE VIVA) */}
        <button 
          onClick={handleInviteFriend}
          disabled={clanMembers.length >= 5}
          className="w-full bg-[#c4d82e] text-[#1e1e1e] font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 size={16} />
          {clanMembers.length >= 5 ? '¡Clan Completado!' : 'Invitar Amigo al Clan'}
        </button>
      </div>

      {/* RETOS DIARIOS DEL BARRIO (COMPLEMENTO ECONOMÍA LOCAL) */}
      <h3 className={`font-black text-xs uppercase tracking-widest mb-3 ml-1 ${textSub}`}>Retos de tu Barrio</h3>
      <div className="space-y-3">
        
        {/* RETO 1 */}
        <div className="p-4 rounded-xl flex justify-between items-center border transition-transform hover:translate-x-1"
             style={{ backgroundColor: bgCard, borderColor: isDark ? '#2a2a40' : '#eef0f3' }}>
          <div className="flex gap-3 items-center">
            <div className="bg-[#c4d82e]/10 p-2 rounded-lg text-[#c4d82e]">
              <Zap size={18} />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${textTitle}`}>Farmacia El Sol (200m)</h4>
              <p className="text-[11px] text-[#6e3ff3] font-extrabold">+50 VAVIs & 10% OFF con Pocket</p>
            </div>
          </div>
          <span className="text-xs bg-[#8a8f98]/10 text-[#8a8f98] px-3 py-1 rounded-md font-bold">A pie</span>
        </div>

        {/* RETO 2 */}
        <div className="p-4 rounded-xl flex justify-between items-center border transition-transform hover:translate-x-1"
             style={{ backgroundColor: bgCard, borderColor: isDark ? '#2a2a40' : '#eef0f3' }}>
          <div className="flex gap-3 items-center">
            <div className="bg-[#6e3ff3]/10 p-2 rounded-lg text-[#6e3ff3]">
              <Users size={18} />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${textTitle}`}>Pensión Doña María</h4>
              <p className="text-[11px] text-[#6e3ff3] font-extrabold">+100 VAVIs por Almuerzo de Clan</p>
            </div>
          </div>
          <span className="text-xs bg-[#c4d82e]/20 text-[#1e1e1e] font-black px-3 py-1 rounded-md">Grupal</span>
        </div>
      </div>

      {/* PANEL SECRETO PARA EL PITCH DE LA HACKATHON */}
      <div className="mt-8 p-3 rounded-xl border border-dashed border-[#8a8f98]/30 bg-black/5 text-center">
        <span className="text-[10px] font-black text-[#8a8f98] block mb-2">HERRAMIENTAS PARA EL DEMO EN VIVO</span>
        <div className="flex gap-2 justify-center">
          <button 
            onClick={handleSimulateProgress} 
            className="text-[10px] bg-[#6e3ff3] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#6e3ff3]/80 transition-colors"
          >
            🚀 Forzar Meta Élite
          </button>
          <button 
            onClick={() => {
              setClanMembers([
                { id: 1, name: 'Tú', role: 'Líder', active: true, initials: 'VU' },
                { id: 2, name: 'Efraín B.', role: 'Miembro', active: true, initials: 'EB' },
                { id: 3, name: 'Nezareth A.', role: 'Miembro', active: true, initials: 'NA' },
              ]);
              setCurrentProgress(620);
              setIsElite(false);
            }} 
            className="text-[10px] bg-[#8a8f98] text-white px-3 py-1.5 rounded-lg font-bold hover:opacity-80 transition-colors"
          >
            🔄 Reiniciar Demo
          </button>
        </div>
      </div>

    </div>
  );
}