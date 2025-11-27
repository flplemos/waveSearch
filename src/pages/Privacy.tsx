import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Shield, Database, Globe, UserRound, Lock, Bell } from "lucide-react";

const Privacy = () => {
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
      title: "Dados que coletamos",
      icon: Database,
      items: [
        "Localizacao (GPS ou aproximada) para sugerir praias proximas",
        "Dados de conta (email, nome) para login e preferencias",
        "Uso do app (interacoes e telas) para melhorar a experiencia",
      ],
    },
    {
      title: "Como usamos",
      icon: Globe,
      items: [
        "Mostrar previsoes de ondas, mar e clima perto de voce",
        "Salvar praias favoritas e ajustes de idioma/tema (quando disponivel)",
        "Aprimorar precisao das sugestoes e desempenho do app",
      ],
    },
    {
      title: "Compartilhamento",
      icon: Shield,
      items: [
        "Fornecedores de infraestrutura e analytics para manter o servico",
        "Nao vendemos seus dados; compartilhamos apenas o necessario para operar",
      ],
    },
    {
      title: "Seus controles",
      icon: UserRound,
      items: [
        "Revogar GPS nas configuracoes do dispositivo a qualquer momento",
        "Solicitar exclusao de conta e dados via suporte",
        "Optar por nao receber comunicacoes (quando oferecidas)",
      ],
    },
    {
      title: "Seguranca",
      icon: Lock,
      items: [
        "Criptografia em transito (HTTPS)",
        "Acesso interno restrito ao necessario",
      ],
    },
    {
      title: "Contato",
      icon: Bell,
      items: [
        "Envie duvidas para suporte@wavesearch.app",
      ],
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
          <h1 className="text-2xl font-semibold">Privacidade de dados</h1>
          <div className="h-12 w-12" aria-hidden />
        </div>

        <p className="text-white/80 mb-6">
          Sua privacidade e prioridade. Esta pagina descreve como coletamos, usamos e protegemos seus dados no WaveSearch, app de previsao de ondas e clima para surfistas.
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
                <ul className="space-y-2 text-sm text-white/80">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[rgba(94,173,237,1)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Privacy;
