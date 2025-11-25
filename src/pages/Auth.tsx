import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { SocialLoginButton } from '@/components/SocialLoginButton';
import { Provider } from '@supabase/supabase-js';

// Schema de validação atualizado com Nome opcional (pois login não precisa)
const authSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().optional(), 
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Estado para o nome
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/search');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = authSchema.parse({ email, password, name });
      let error = null;

      if (isLogin) {
        // --- LOGIN (Igual ao anterior) ---
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: validatedData.email,
          password: validatedData.password,
        });
        error = signInError;
      } else {
        // --- CADASTRO (Agora salvando o Nome!) ---
        if (!validatedData.name) {
          throw new Error("Por favor, digite seu nome para criar a conta.");
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: validatedData.email,
          password: validatedData.password,
          options: {
            data: {
              name: validatedData.name, // Salva o nome nos metadados do usuário
            }
          }
        });
        error = signUpError;
      }
      
      if (error) {
        toast({
          title: 'Erro',
          description: error.message === "Invalid login credentials" ? "Email ou senha incorretos" : error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: isLogin ? 'Login realizado!' : 'Verifique seu email!',
          description: isLogin ? 'Bem-vindo de volta' : 'Enviamos um link de confirmação.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Atenção',
        description: error instanceof z.ZodError ? error.errors[0].message : error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${window.location.origin}/search`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({ title: 'Erro no login social', description: error.message, variant: 'destructive' });
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen bg-[rgba(45,45,45,1)]">
      <img src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80" className="absolute h-full w-full object-cover inset-0" alt="Ocean background" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(45,45,45,0.6)] to-[rgba(45,45,45,0.8)]" />
      
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 z-10 w-full py-12">
        <div className="bg-[rgba(45,45,45,0.95)] backdrop-blur-md rounded-[20px] p-6 sm:p-8 w-full max-w-md border border-[rgba(255,255,255,0.1)]">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl sm:text-4xl font-semibold">
              <span className="text-white">Wav</span><span className="text-[rgba(94,173,237,1)]">e</span>
            </h1>
            <h2 className="text-white text-3xl sm:text-4xl font-semibold mt-2">
              <span className="text-white">S</span><span className="text-[rgba(94,173,237,1)]">e</span><span className="text-white">arch</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* CAMPO DE NOME: Só aparece se for Cadastro (!isLogin) */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Seu Nome (ex: Gabriel Medina)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[rgba(65,65,65,1)] px-4 sm:px-5 py-3 sm:py-4 rounded-[15px] text-[rgba(203,203,203,1)] placeholder-[rgba(203,203,203,0.7)] outline-none focus:ring-2 focus:ring-[rgba(94,173,237,1)] transition-all"
              />
            )}

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

          <div className="flex flex-col items-center gap-2 mt-6 w-full">
            <div className="relative w-full flex items-center justify-center mb-2">
              <div className="absolute w-full border-t border-white/10"></div>
              <span className="relative bg-[#2d2d2d] px-2 text-xs text-gray-400 uppercase">Ou continue com</span>
            </div>
            <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} disabled={loading} />
          </div>

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