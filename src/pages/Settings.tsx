import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThumbsUp,
  UserRound,
  FileSignature,
  HelpCircle,
  Lock,
  FileText,
  LogOut,
  X,
} from "lucide-react";
import { SearchButton } from "@/components/SearchButton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type ActionItem = {
  label: string;
  description: string;
  icon: React.ElementType;
  variant?: "highlight";
  path?: string;
};

const actions: ActionItem[] = [
  {
    label: "Deixe seu feedback",
    description: "Conte o que achou do app",
    icon: ThumbsUp,
    variant: "highlight",
  },
  {
    label: "Conta",
    description: "Perfil e preferencias",
    icon: UserRound,
  },
  {
    label: "Assinaturas",
    description: "Gerencie seus planos",
    icon: FileSignature,
  },
  {
    label: "FAQ",
    description: "Perguntas mais comuns",
    icon: HelpCircle,
  },
  {
    label: "Privacidade de dados",
    description: "Permissoes e seguranca",
    icon: Lock,
    path: "/privacidade",
  },
  {
    label: "Termos de uso",
    description: "Leia as condicoes",
    icon: FileText,
    path: "/termos",
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleSignOut = () => {
    playExit(() => {
      signOut();
      navigate("/auth");
      toast({ title: "Logout realizado", description: "Ate a proxima!" });
    });
  };

  const handleBack = () => playExit(() => navigate(-1));

  const handleActionClick = (item: ActionItem) => {
    if (!item.path) {
      setModalOpen(true);
      return;
    }
    playExit(() => navigate(item.path!));
  };

  const isVisible = mounted && !leaving;

  const baseHover =
    "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 hover:border-white/30";

  return (
    <main className="relative min-h-screen bg-[rgba(30,35,40,1)] text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        alt="Ocean background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/78 to-black/85" />

      <div
        className={`relative z-10 max-w-md mx-auto px-5 pt-6 pb-24 flex flex-col gap-4 transition-all duration-400 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur"
            aria-label="Voltar"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Configuracoes</h1>
          <div className="h-12 w-12" aria-hidden />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {actions.map((item, index) => {
            const Icon = item.icon;
            const isHighlight = item.variant === "highlight";
            return (
              <button
                key={item.label}
                onClick={() => handleActionClick(item)}
                style={{ transitionDelay: `${index * 40}ms` }}
                className={`w-full rounded-2xl px-4 py-3 text-left flex items-center gap-3 border transition-all duration-400 ease-out shadow-lg ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                } ${
                  isHighlight
                    ? `bg-[rgba(94,173,237,0.24)] border-[rgba(94,173,237,0.45)] hover:bg-[rgba(94,173,237,0.3)] ${baseHover}`
                    : `bg-white/8 border-white/15 hover:bg-white/14 ${baseHover}`
                }`}
              >
                <span
                  className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    isHighlight ? "bg-[rgba(94,173,237,0.35)]" : "bg-white/12"
                  }`}
                >
                  <Icon className="w-5 h-5 text-[rgba(94,173,237,1)]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold">{item.label}</span>
                  <span className="text-xs text-white/75">{item.description}</span>
                </div>
              </button>
            );
          })}

          <button
            onClick={handleSignOut}
            className={`w-full rounded-2xl px-4 py-3 text-left flex items-center gap-3 border bg-white/8 border-white/15 hover:bg-white/14 transition-all duration-400 ease-out shadow-lg ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${baseHover}`}
            style={{ transitionDelay: `${actions.length * 40}ms` }}
          >
            <span className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/12">
              <LogOut className="w-5 h-5 text-white" />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-semibold">Sair</span>
              <span className="text-xs text-white/75">Encerrar sessao</span>
            </div>
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <SearchButton />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0f1116]/95 border border-white/15 shadow-2xl p-5 text-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Em breve</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center border border-white/15"
                aria-label="Fechar aviso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-white/80">
              Este recurso ainda est&aacute; em desenvolvimento. Fique de olho nas pr&oacute;ximas atualiza&ccedil;&otilde;es do WaveSearch.
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full h-11 rounded-xl bg-[rgba(94,173,237,0.2)] hover:bg-[rgba(94,173,237,0.3)] border border-[rgba(94,173,237,0.4)] text-white font-semibold transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Settings;
