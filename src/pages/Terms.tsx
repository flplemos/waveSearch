import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ClipboardList, Waves, MapPinned, ShieldCheck, Bell, AlertTriangle } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const playExit = (action: () => void) => {
    if (leaving) return;
    setLeaving(true);
    setMounted(false);
    setTimeout(action, 220);
  };

  const isVisible = mounted && !leaving;

  const sections = [
    {
      title: "Objetivo do app",
      icon: Waves,
      text: "O WaveSearch oferece previsoes de ondas, mare e clima para surfistas. Nao garantimos precisao absoluta; use sempre seu julgamento local e condicoes de seguranca.",
    },
    {
      title: "Uso permitido",
      icon: ClipboardList,
      text: "Voce pode usar o app para fins pessoais e nao comerciais. Nao e permitido revender, copiar ou distribuir dados e conteudos sem autorizacao.",
    },
    {
      title: "Localizacao",
      icon: MapPinned,
      text: "O app pode solicitar GPS para sugerir praias proximas. A permissao e opcional e pode ser revogada a qualquer momento nas configuracoes do dispositivo.",
    },
    {
      title: "Privacidade e dados",
      icon: ShieldCheck,
      text: "Tratamos seus dados conforme a pagina de Privacidade. Dados podem ser usados para melhorar o servico e mantidos conforme necessidade operacional.",
    },
    {
      title: "Alertas e comunicacoes",
      icon: Bell,
      text: "Podemos enviar notificacoes ou mensagens sobre atualizacoes ou servicos (quando habilitado). Voce pode optar por nao receber essas comunicacoes.",
    },
    {
      title: "Isencao de responsabilidade",
      icon: AlertTriangle,
      text: "Surf e atividades nauticas envolvem riscos. Verifique condicoes locais, limites pessoais e regras de seguranca. Nao somos responsaveis por danos decorrentes do uso do app.",
    },
  ];

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#0a0f14]">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        alt="Fundo mar"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/82 to-black/90" />

      <div
        className={`relative z-10 max-w-3xl mx-auto px-5 pt-6 pb-24 transition-all duration-400 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => playExit(() => navigate(-1))}
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur"
            aria-label="Voltar"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Termos de uso</h1>
          <div className="h-12 w-12" aria-hidden />
        </div>

        <p className="text-white/80 mb-6">
          Leia os termos basicos de uso do WaveSearch, app de previsao de ondas e clima voltado a surfistas.
        </p>

        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className={`rounded-2xl border border-white/15 bg-white/8 backdrop-blur shadow-lg px-4 py-3 transition-all duration-400 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-10 w-10 rounded-xl bg-white/12 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[rgba(94,173,237,1)]" />
                  </span>
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{section.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Terms;
