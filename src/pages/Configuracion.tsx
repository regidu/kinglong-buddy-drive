import { useState, useEffect } from "react";
import { Settings, Bell, Moon, Sun, Megaphone, Lightbulb, Gamepad2, Wrench } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface NotifPrefs {
  ofertas: boolean;
  consejos: boolean;
  recordatorios: boolean;
  entretenimiento: boolean;
}

const Configuracion = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(() => {
    const saved = localStorage.getItem("notif_prefs");
    return saved ? JSON.parse(saved) : { ofertas: true, consejos: true, recordatorios: true, entretenimiento: true };
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const togglePref = (key: keyof NotifPrefs) => {
    setNotifPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("notif_prefs", JSON.stringify(updated));
      return updated;
    });
  };

  const categories = [
    { key: "ofertas" as const, icon: <Megaphone className="w-5 h-5 text-primary" />, label: "Ofertas y Novedades", desc: "Promociones, nuevos productos y descuentos" },
    { key: "consejos" as const, icon: <Lightbulb className="w-5 h-5 text-primary" />, label: "Consejos Diarios", desc: "Tips de mantenimiento y cuidado vehicular" },
    { key: "recordatorios" as const, icon: <Wrench className="w-5 h-5 text-primary" />, label: "Recordatorios", desc: "Mantenimiento programado y servicios pendientes" },
    { key: "entretenimiento" as const, icon: <Gamepad2 className="w-5 h-5 text-primary" />, label: "Entretenimiento", desc: "Datos curiosos, chistes y contenido divertido" },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-6 flex items-center gap-2">
        <Settings className="w-6 h-6" /> Configuración
      </h1>

      {/* Dark mode */}
      <div className="p-4 rounded-xl bg-card border border-border mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            <div>
              <p className="font-semibold text-card-foreground">Modo Oscuro</p>
              <p className="text-xs text-muted-foreground">Cambia la apariencia de la app</p>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      {/* Notification preferences */}
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <Bell className="w-5 h-5 text-primary" /> Notificaciones
      </h2>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.key} className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {cat.icon}
                <div>
                  <p className="font-semibold text-card-foreground text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
              <Switch checked={notifPrefs[cat.key]} onCheckedChange={() => togglePref(cat.key)} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Las notificaciones se mostrarán según tus preferencias al abrir la app.
      </p>
    </div>
  );
};

export default Configuracion;
