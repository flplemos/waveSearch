import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import LocationDetails from "./pages/LocationDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />

            {/* AQUI ESTÁ A CORREÇÃO: Rota dinâmica que aceita qualquer ID */}
            <Route path="/location/:id" element={
              <ProtectedRoute>
                <LocationDetails />
              </ProtectedRoute>
            } />

            {/* Redireciona o link antigo para um padrão, caso alguém acesse */}
            <Route path="/location-details" element={<Navigate to="/location/ponta-negra" replace />} />

            {/* Rota de erro 404 (qualquer coisa que não coincida com as acima cai aqui) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;