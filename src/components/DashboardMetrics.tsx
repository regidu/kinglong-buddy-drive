import { useEffect, useState } from "react";
import { Car, Bell, MessageCircle, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MetricCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const DashboardMetrics = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<MetricCard[]>([
    { label: "Vehículos", value: 0, icon: <Car className="w-5 h-5" />, color: "text-primary" },
    { label: "Recordatorios", value: 0, icon: <Bell className="w-5 h-5" />, color: "text-amber-500" },
    { label: "Soporte", value: 0, icon: <MessageCircle className="w-5 h-5" />, color: "text-blue-500" },
    { label: "Reseñas", value: 0, icon: <Star className="w-5 h-5" />, color: "text-yellow-500" },
  ]);

  useEffect(() => {
    if (!user) return;
    const fetchMetrics = async () => {
      const [vehicles, reminders, messages, reviews] = await Promise.all([
        supabase.from("vehicles").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("maintenance_reminders").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("support_messages").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("reviews").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setMetrics([
        { label: "Vehículos", value: vehicles.count ?? 0, icon: <Car className="w-5 h-5" />, color: "text-primary" },
        { label: "Recordatorios", value: reminders.count ?? 0, icon: <Bell className="w-5 h-5" />, color: "text-amber-500" },
        { label: "Soporte", value: messages.count ?? 0, icon: <MessageCircle className="w-5 h-5" />, color: "text-blue-500" },
        { label: "Reseñas", value: reviews.count ?? 0, icon: <Star className="w-5 h-5" />, color: "text-yellow-500" },
      ]);
    };
    fetchMetrics();
  }, [user]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m) => (
        <div key={m.label} className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-muted ${m.color}`}>{m.icon}</div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
