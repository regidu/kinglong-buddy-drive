import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, UserCircle, Settings, MessageSquare, CircleUserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AppSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const avatar = user?.user_metadata?.avatar || null;
  const avatarBg = user?.user_metadata?.avatar_bg || "bg-red-100";

  // Only show on home page
  if (location.pathname !== "/") return null;

  const items = [
    { icon: UserCircle, label: "Mi Perfil", path: "/perfil" },
    { icon: CreditCard, label: "Mi Cuenta", path: "/mi-cuenta" },
    { icon: Settings, label: "Configuración", path: "/configuracion" },
    { icon: MessageSquare, label: "Sugerencias", path: "/sugerencias" },
  ];

  const go = (path: string) => { navigate(path); setOpen(false); };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-[60] w-9 h-9 rounded-lg bg-card/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] bg-black/40" onClick={() => setOpen(false)} />
      )}

      <div className={`fixed top-0 left-0 h-full w-64 z-[80] bg-background border-r border-border transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            {avatar ? (
              <div className={`w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center text-lg`}>{avatar}</div>
            ) : (
              <UserCircle className="w-8 h-8 text-muted-foreground" />
            )}
            <span className="font-semibold text-foreground text-sm truncate">
              {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"}
            </span>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-2 py-3 space-y-1">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              <item.icon className="w-5 h-5 text-primary" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AppSidebar;
