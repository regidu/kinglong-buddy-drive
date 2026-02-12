import { useNavigate } from "react-router-dom";
import {
  Phone, ShoppingCart, Calculator, Lightbulb,
  MapPin, Fuel, Wrench, AlertTriangle } from
"lucide-react";
import heroImage from "@/assets/hero-minivan.jpg";
import ServiceCard from "@/components/ServiceCard";

const quickServices = [
{ icon: <AlertTriangle className="w-5 h-5" />, title: "Asistencia Vial", desc: "Ayuda en el camino 24/7", path: "/asistencia" },
{ icon: <ShoppingCart className="w-5 h-5" />, title: "Refacciones", desc: "Pide partes originales", path: "/refacciones" },
{ icon: <Calculator className="w-5 h-5" />, title: "Simula tu Crédito", desc: "Nueva unidad King Long", path: "/credito" },
{ icon: <Fuel className="w-5 h-5" />, title: "Calculadora Gas", desc: "Calcula tu consumo", path: "/gasolina" },
{ icon: <MapPin className="w-5 h-5" />, title: "Mapa de Servicios", desc: "Talleres, vulcas y más", path: "/mapa" },
{ icon: <Lightbulb className="w-5 h-5" />, title: "Consejos", desc: "Tips para tu unidad", path: "/consejos" }];


const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={heroImage}
          alt="King Long Minivan"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold">
            <span className="text-gradient-gold">King Long </span>
          </h1>
          <p className="text-sm text-foreground/80 mt-1">Tu compañero de viaje</p>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="px-4 -mt-4 relative z-10">
        <button
          onClick={() => navigate("/asistencia")}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-gold text-primary-foreground font-bold text-lg shadow-[var(--shadow-gold)] animate-pulse-gold active:scale-[0.98] transition-transform">

          <Phone className="w-5 h-5" />
          Asistencia de Emergencia
        </button>
      </div>

      {/* Services */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Servicios</h2>
        <div className="space-y-2">
          {quickServices.map((s) =>
          <ServiceCard
            key={s.path}
            icon={s.icon}
            title={s.title}
            description={s.desc}
            onClick={() => navigate(s.path)} />

          )}
        </div>
      </div>
    </div>);

};

export default Index;