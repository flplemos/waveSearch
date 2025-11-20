import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/search');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = authSchema.parse({ email, password });
      
      const success = await login(validatedData.email, validatedData.password);
      
      if (success) {
        toast({
          title: isLogin ? 'Login realizado!' : 'Conta criada!',
          description: isLogin ? 'Bem-vindo de volta' : 'Você já pode usar o app',
        });
        navigate('/search');
      } else {
        toast({
          title: 'Erro',
          description: 'Por favor, verifique seus dados',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro de validação',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro. Tente novamente.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen bg-[rgba(45,45,45,1)]">
      <img
        src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80"
        className="absolute h-full w-full object-cover inset-0"
        alt="Ocean background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,45,45,0.6)] to-[rgba(45,45,45,0.8)]" />
      
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 z-10 w-full py-12">
        <div className="bg-[rgba(45,45,45,0.95)] backdrop-blur-md rounded-[20px] p-6 sm:p-8 w-full max-w-md border border-[rgba(255,255,255,0.1)]">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl sm:text-4xl font-semibold">
              <span className="text-white">Wav</span>
              <span className="text-[rgba(94,173,237,1)]">e</span>
            </h1>
            <h2 className="text-white text-3xl sm:text-4xl font-semibold mt-2">
              <span className="text-white">S</span>
              <span className="text-[rgba(94,173,237,1)]">e</span>
              <span className="text-white">arch</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[rgba(65,65,65,1)] px-4 sm:px-5 py-3 sm:py-4 rounded-[15px] text-[rgba(203,203,203,1)] placeholder-[rgba(203,203,203,0.7)] outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] transition-all"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[rgba(65,65,65,1)] px-4 sm:px-5 py-3 sm:py-4 rounded-[15px] text-[rgba(203,203,203,1)] placeholder-[rgba(203,203,203,0.7)] outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgba(94,173,237,1)] text-white font-semibold py-3 sm:py-4 rounded-[15px] hover:bg-[rgba(84,163,227,1)] active:bg-[rgba(74,153,217,1)] disabled:opacity-50 transition-colors mt-4"
            >
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[rgba(203,203,203,1)] text-sm hover:text-[rgba(94,173,237,1)] transition-colors"
            >
              {isLogin ? 'Não tem conta? Criar uma' : 'Já tem conta? Fazer login'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
