import { Link, useLocation } from "react-router-dom";
import { Home, Phone, Car, MessageCircle, Bell } from "lucide-react";

const navItems = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: Car, label: "Mi Unidad", path: "/mi-unidad" },
  { icon: Phone, label: "Asistencia", path: "/asistencia" },
  { icon: MessageCircle, label: "Soporte", path: "/soporte" },
  { icon: Bell, label: "Recordar", path: "/recordatorios" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border pb-safe">
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
              <Icon className={`w-5 h-5 ${active ? "drop-shadow-[0_0_6px_hsl(0,73%,42%)]" : ""}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
