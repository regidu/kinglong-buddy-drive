import { useNavigate, Link } from "react-router-dom";
import {
  Phone, ShoppingCart, Calculator, Lightbulb,
  MapPin, Fuel, AlertTriangle, BookOpen, Car, MessageCircle, Bell, LogOut, Shield, UserCircle, MessageSquare
} from "lucide-react";
import heroImage from "@/assets/hero-minivan.jpg";
import logo from "@/assets/logo-kinglong.png";
import ServiceCard from "@/components/ServiceCard";
import { useAuth } from "@/hooks/useAuth";

const quickServices = [
  { icon: <AlertTriangle className="w-5 h-5" />, title: "Asistencia Vial", desc: "Ayuda en el camino 24/7", path: "/asistencia" },
  { icon: <Car className="w-5 h-5" />, title: "Mi Unidad", desc: "Registra tu VIN", path: "/mi-unidad" },
  { icon: <ShoppingCart className="w-5 h-5" />, title: "Refacciones", desc: "Pide partes originales", path: "/refacciones" },
  { icon: <Calculator className="w-5 h-5" />, title: "Simula tu Crédito", desc: "Nueva unidad King Long", path: "/credito" },
  { icon: <Bell className="w-5 h-5" />, title: "Recordatorios", desc: "Mantenimiento programado", path: "/recordatorios" },
  { icon: <Fuel className="w-5 h-5" />, title: "Calculadora Gas", desc: "Calcula tu consumo", path: "/gasolina" },
  { icon: <MapPin className="w-5 h-5" />, title: "Mapa de Servicios", desc: "Talleres, vulcas y más", path: "/mapa" },
  { icon: <MessageCircle className="w-5 h-5" />, title: "Soporte", desc: "Chat con nuestro equipo", path: "/soporte" },
  { icon: <Lightbulb className="w-5 h-5" />, title: "Consejos", desc: "Tips para tu unidad", path: "/consejos" },
  { icon: <BookOpen className="w-5 h-5" />, title: "Historia", desc: "Conoce la marca King Long", path: "/historia" },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Sugerencias", desc: "Déjanos tu opinión", path: "/sugerencias" },
];

const Index = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen pb-20 pt-safe">
      {/* Logo + Profile + Logout */}
      <div className="flex items-center justify-between px-4 py-3 bg-background">
        <button onClick={() => navigate("/perfil")} className="text-muted-foreground hover:text-primary">
          <UserCircle className="w-6 h-6" />
        </button>
        <img src={logo} alt="King Long División Minivan México" className="h-14 object-contain" />
        <button onClick={signOut} className="text-muted-foreground hover:text-primary">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <img src={heroImage} alt="King Long Minivan" className="w-full h-full object-cover" />
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
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-gold text-white font-bold text-lg shadow-[var(--shadow-gold)] animate-pulse-gold active:scale-[0.98] transition-transform"
        >
          <Phone className="w-5 h-5" />
          Asistencia de Emergencia
        </button>
      </div>

      {/* Warranty Button */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate("/garantias")}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
        >
          <Shield className="w-5 h-5" />
          Garantía – Reportar falla
        </button>
      </div>

      {/* Services - Two columns */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Servicios</h2>
        <div className="grid grid-cols-2 gap-2">
          {quickServices.map((s) => (
            <ServiceCard
              key={s.path}
              icon={s.icon}
              title={s.title}
              description={s.desc}
              onClick={() => navigate(s.path)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Terms footer */}
      <div className="px-4 mt-8 mb-4 text-center">
        <Link to="/terminos" className="text-xs text-muted-foreground hover:text-primary underline">
          Términos y Condiciones
        </Link>
      </div>
    </div>
  );
};

export default Index;
