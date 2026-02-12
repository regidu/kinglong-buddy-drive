import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Asistencia from "./pages/Asistencia";
import Refacciones from "./pages/Refacciones";
import Credito from "./pages/Credito";
import Consejos from "./pages/Consejos";
import Gasolina from "./pages/Gasolina";
import Mapa from "./pages/Mapa";
import Historia from "./pages/Historia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-lg mx-auto min-h-screen relative">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/asistencia" element={<Asistencia />} />
            <Route path="/refacciones" element={<Refacciones />} />
            <Route path="/credito" element={<Credito />} />
            <Route path="/consejos" element={<Consejos />} />
            <Route path="/gasolina" element={<Gasolina />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
