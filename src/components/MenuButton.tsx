import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuButtonProps {
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white border border-white/10 backdrop-blur-md z-50 ${className}`}
      aria-label="Abrir configuracoes"
    >
      <MoreHorizontal className="h-6 w-6" />
    </Button>
  );
};
