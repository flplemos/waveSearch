import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewFormProps {
  locationSlug: string;
  onSuccess: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ locationSlug, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Surfista';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({ title: "Selecione uma nota", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Verifica se já existe avaliação HOJE deste usuário para este local
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const { data: existingReviews } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', user?.id)
        .eq('location', locationSlug)
        .gte('created_at', todayISO);

      if (existingReviews && existingReviews.length > 0) {
        toast({ 
          title: "Você já avaliou hoje!", 
          description: "Apenas um relato por dia é permitido para manter a qualidade.", 
          variant: "destructive" 
        });
        setIsSubmitting(false);
        return; // Para a execução aqui
      }

      // 2. Se não existe, prossegue com o INSERT
      const { error } = await supabase.from('reviews').insert({
        location: locationSlug,
        rating,
        comment,
        user_id: user?.id || null,
        user_name: userName,
      } as any);

      if (error) throw error;

      toast({ title: "Avaliação enviada!", description: "Obrigado por contribuir." });
      setRating(0);
      setComment('');
      onSuccess(); // Fecha o modal
    } catch (error: any) {
      toast({ title: "Erro ao enviar", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-gray-400">Como está o mar agora?</span>
        
        <span className="text-xs font-medium text-[#5EADED] bg-[#5EADED]/10 px-3 py-1 rounded-full border border-[#5EADED]/20">
          Comentando como: {userName}
        </span>

        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <Textarea
        placeholder="Ex: Ondas de 1m, sem vento, formação regular..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-white/5 border-white/10 text-white min-h-[100px] focus:border-[#5EADED]/50 transition-colors"
      />

      <Button 
        type="submit" 
        className="w-full bg-[#5EADED] hover:bg-[#4c9bd6] text-white font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Relato'}
      </Button>
    </form>
  );
};