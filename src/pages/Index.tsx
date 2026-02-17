import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Phone, ShoppingCart, Calculator, Lightbulb,
  MapPin, Fuel, AlertTriangle, BookOpen, Car, MessageCircle, Bell, LogOut, Shield, UserCircle, MessageSquare, Handshake, Megaphone
} from "lucide-react";
import heroImage from "@/assets/hero-minivan.jpg";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.png";
import hero7 from "@/assets/hero-7.png";
import logo from "@/assets/logo-kinglong.png";
import ServiceCard from "@/components/ServiceCard";
import { useAuth } from "@/hooks/useAuth";

const heroImages = [heroImage, hero1, hero2, hero3, hero4, hero5, hero6, hero7];

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

const novedades = [
  { title: "Nuevo Kingo EV", desc: "Conoce la versión 100% eléctrica de King Long.", tag: "Novedad" },
  { title: "Promoción en Refacciones", desc: "20% de descuento en filtros y aceites este mes.", tag: "Oferta" },
  { title: "Mantenimiento Preventivo", desc: "Agenda tu servicio con costo preferencial.", tag: "Oferta" },
];

const Index = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-safe bg-background">
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

      {/* Hero Carousel */}
      <div className="relative h-48 overflow-hidden">
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`King Long ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold">
            <span className="text-gradient-gold">King Long </span>
          </h1>
          <p className="text-sm text-foreground/80 mt-1">Tu compañero de viaje</p>
        </div>
        {/* Dots */}
        <div className="absolute bottom-2 right-4 flex gap-1">
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setCurrentImage(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? "bg-primary w-4" : "bg-foreground/30"}`} />
          ))}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="px-4 -mt-4 relative z-10">
        <button
          onClick={() => navigate("/asistencia")}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-gold text-white font-bold text-lg shadow-[var(--shadow-gold)] active:scale-[0.98] transition-transform"
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

      {/* Distributor Button */}
      <div className="px-4 mt-3">
        <a
          href="https://kinglong.mx/distri/distribuidores.html?srsltid=AfmBOoql9BYW0GU0BXHqN8BxDJ7oI7mNs4A8fZbFbT7Nmr1330RWafTn"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-accent text-accent font-semibold active:scale-[0.98] transition-transform"
        >
          <Handshake className="w-5 h-5" />
          Sé Distribuidor King Long
        </a>
      </div>

      {/* Novedades y Ofertas */}
      <div className="px-4 mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          Novedades y Ofertas
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {novedades.map((n, i) => (
            <div key={i} className="min-w-[240px] p-4 rounded-xl border border-border bg-card space-y-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.tag === "Novedad" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                {n.tag}
              </span>
              <h3 className="font-semibold text-card-foreground text-sm">{n.title}</h3>
              <p className="text-xs text-muted-foreground">{n.desc}</p>
            </div>
          ))}
        </div>
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
