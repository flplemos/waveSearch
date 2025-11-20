import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const MenuDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logout realizado',
      description: 'Até logo!',
    });
    navigate('/auth');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu options"
        className="w-[60px] h-[60px] bg-[rgba(70,70,70,0.9)] backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[rgba(80,80,80,0.9)] transition-colors border border-[rgba(255,255,255,0.1)]"
      >
        <div className="flex flex-col gap-[6px]">
          <div className="w-1 h-1 bg-[rgba(203,203,203,1)] rounded-full" />
          <div className="w-1 h-1 bg-[rgba(203,203,203,1)] rounded-full" />
          <div className="w-1 h-1 bg-[rgba(203,203,203,1)] rounded-full" />
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-[rgba(45,45,45,0.98)] backdrop-blur-md rounded-[15px] shadow-lg z-30 overflow-hidden border border-[rgba(255,255,255,0.15)]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[rgba(203,203,203,1)] hover:bg-[rgba(70,70,70,0.5)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
