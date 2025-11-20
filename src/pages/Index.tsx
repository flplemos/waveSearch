import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/search');
      } else {
        navigate('/auth');
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgba(45,45,45,1)]">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  );
};

export default Index;
