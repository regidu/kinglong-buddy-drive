import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Asistencia from "./pages/Asistencia";
import Refacciones from "./pages/Refacciones";
import Credito from "./pages/Credito";
import Consejos from "./pages/Consejos";
import Gasolina from "./pages/Gasolina";
import Mapa from "./pages/Mapa";
import Historia from "./pages/Historia";
import MiUnidad from "./pages/MiUnidad";
import Soporte from "./pages/Soporte";
import Recordatorios from "./pages/Recordatorios";
import Perfil from "./pages/Perfil";
import Terminos from "./pages/Terminos";
import Garantias from "./pages/Garantias";
import Sugerencias from "./pages/Sugerencias";
import Manual from "./pages/Manual";
import Precios from "./pages/Precios";
import KingoRunner from "./pages/KingoRunner";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();

  return (
    <div className="max-w-lg mx-auto min-h-screen relative">
      <Routes>
        <Route path="/auth" element={user && !loading ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/asistencia" element={<ProtectedRoute><Asistencia /></ProtectedRoute>} />
        <Route path="/refacciones" element={<ProtectedRoute><Refacciones /></ProtectedRoute>} />
        <Route path="/credito" element={<ProtectedRoute><Credito /></ProtectedRoute>} />
        <Route path="/consejos" element={<ProtectedRoute><Consejos /></ProtectedRoute>} />
        <Route path="/gasolina" element={<ProtectedRoute><Gasolina /></ProtectedRoute>} />
        <Route path="/mapa" element={<ProtectedRoute><Mapa /></ProtectedRoute>} />
        <Route path="/historia" element={<ProtectedRoute><Historia /></ProtectedRoute>} />
        <Route path="/mi-unidad" element={<ProtectedRoute><MiUnidad /></ProtectedRoute>} />
        <Route path="/soporte" element={<ProtectedRoute><Soporte /></ProtectedRoute>} />
        <Route path="/recordatorios" element={<ProtectedRoute><Recordatorios /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/garantias" element={<ProtectedRoute><Garantias /></ProtectedRoute>} />
        <Route path="/sugerencias" element={<ProtectedRoute><Sugerencias /></ProtectedRoute>} />
        <Route path="/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />
        <Route path="/precios" element={<ProtectedRoute><Precios /></ProtectedRoute>} />
        <Route path="/juego" element={<ProtectedRoute><KingoRunner /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {user && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
