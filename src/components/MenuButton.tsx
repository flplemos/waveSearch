import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MenuButtonProps {
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ className }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/auth");
    toast({
      title: "Logout realizado",
      description: "Até a próxima!",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Botão com z-index alto para garantir clique */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white border border-white/10 backdrop-blur-md z-50 ${className}`}
        >
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      
      {/* CONFIGURAÇÃO DE POSIÇÃO:
         side="top" -> Força o menu a abrir ACIMA do botão (na área livre).
         align="end" -> Alinha o menu com a borda direita do botão.
         sideOffset={8} -> Dá um pequeno espaço de respiro.
         z-[100] -> Garante que fique acima de qualquer outro elemento da tela.
      */}
      <DropdownMenuContent 
        side="top" 
        align="end" 
        sideOffset={8}
        className="w-48 bg-[#2a2a2a] border-white/10 text-white z-[100]" 
      >
        <div className="px-2 py-1.5 text-sm text-gray-400 border-b border-white/10 mb-1">
          {user?.name || 'Usuário'}
        </div>
        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};