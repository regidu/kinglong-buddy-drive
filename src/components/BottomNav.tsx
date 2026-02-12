import { Link, useLocation } from "react-router-dom";
import { Home, Phone, ShoppingCart, Calculator, MapPin } from "lucide-react";

const navItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: Phone, label: "Asistencia", path: "/asistencia" },
  { icon: ShoppingCart, label: "Refacciones", path: "/refacciones" },
  { icon: Calculator, label: "Crédito", path: "/credito" },
  { icon: MapPin, label: "Mapa", path: "/mapa" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "drop-shadow-[0_0_6px_hsl(40,90%,55%)]" : ""}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
