import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Shield, Users, BarChart3, MessageSquare, Activity, Edit, Trash2, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ADMIN_EMAIL = "auxiliar@kinglong.mx";
const COLORS = ["hsl(0,73%,42%)", "hsl(36,63%,55%)", "hsl(210,60%,50%)", "hsl(150,50%,45%)", "hsl(280,50%,55%)"];

type Tab = "usuarios" | "metricas" | "resenas" | "actividad" | "edicion";

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("usuarios");
  const [users, setUsers] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || user.email !== ADMIN_EMAIL)) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch users via edge function
      const { data: fnData } = await supabase.functions.invoke("admin-users", {
        body: null,
        headers: {},
      });
      // Use GET with query params
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?action=list_users`, {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      });
      const usersData = await res.json();
      if (usersData.users) setUsers(usersData.users);

      const { data: profilesData } = await supabase.from("profiles").select("*");
      if (profilesData) setProfiles(profilesData);

      const { data: reviewsData } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (reviewsData) setReviews(reviewsData);

      const { data: actData } = await supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(200);
      if (actData) setActivityLogs(actData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reseña eliminada");
  };

  if (authLoading || (user?.email === ADMIN_EMAIL && loading)) return <LoadingScreen />;
  if (user?.email !== ADMIN_EMAIL) return null;

  const filteredUsers = users.filter((u) =>
    (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Metrics
  const sectionCounts: Record<string, number> = {};
  activityLogs.forEach((l) => { sectionCounts[l.section || "other"] = (sectionCounts[l.section || "other"] || 0) + 1; });
  const sectionData = Object.entries(sectionCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);

  const actionCounts: Record<string, number> = {};
  activityLogs.forEach((l) => { actionCounts[l.action || "click"] = (actionCounts[l.action || "click"] || 0) + 1; });
  const actionData = Object.entries(actionCounts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key: "usuarios", icon: Users, label: "Usuarios" },
    { key: "metricas", icon: BarChart3, label: "Métricas" },
    { key: "resenas", icon: MessageSquare, label: "Reseñas" },
    { key: "actividad", icon: Activity, label: "Actividad" },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gradient-gold flex items-center gap-2">
          <Shield className="w-6 h-6" /> Panel Admin
        </h1>
        <Button size="sm" variant="outline" onClick={loadData}><RefreshCw className="w-4 h-4" /></Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Users */}
      {tab === "usuarios" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar por correo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1" />
          </div>
          <p className="text-xs text-muted-foreground">{filteredUsers.length} usuarios registrados</p>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {filteredUsers.map((u) => {
              const profile = profiles.find((p) => p.user_id === u.id);
              return (
                <div key={u.id} className="p-3 rounded-xl bg-card border border-border">
                  <p className="text-sm font-medium text-card-foreground truncate">{u.email}</p>
                  <p className="text-xs text-muted-foreground">Nombre: {profile?.full_name || "—"}</p>
                  <p className="text-xs text-muted-foreground">Tel: {profile?.phone || "—"}</p>
                  <p className="text-xs text-muted-foreground">Registro: {new Date(u.created_at).toLocaleDateString("es-MX")}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Metrics */}
      {tab === "metricas" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-2xl font-bold text-primary">{users.length}</p>
              <p className="text-xs text-muted-foreground">Usuarios totales</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-2xl font-bold text-primary">{activityLogs.length}</p>
              <p className="text-xs text-muted-foreground">Interacciones</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-2xl font-bold text-primary">{reviews.length}</p>
              <p className="text-xs text-muted-foreground">Reseñas</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <p className="text-2xl font-bold text-primary">{Object.keys(sectionCounts).length}</p>
              <p className="text-xs text-muted-foreground">Secciones visitadas</p>
            </div>
          </div>

          {sectionData.length > 0 && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Secciones más visitadas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(0,73%,42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {actionData.length > 0 && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Acciones más frecuentes</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={actionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name }) => name}>
                    {actionData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {sectionData.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Aún no hay datos de interacción.</p>}
        </div>
      )}

      {/* Reviews */}
      {tab === "resenas" && (
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {reviews.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No hay reseñas aún.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="p-3 rounded-xl bg-card border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("es-MX")} · {r.section}</p>
                  <p className="text-sm text-card-foreground mt-1">{r.comment}</p>
                  <p className="text-xs text-primary mt-1">{"⭐".repeat(r.rating)}</p>
                </div>
                <button onClick={() => deleteReview(r.id)} className="text-destructive hover:text-destructive/80 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity */}
      {tab === "actividad" && (
        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {activityLogs.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No hay registros de actividad.</p>}
          {activityLogs.map((l) => (
            <div key={l.id} className="p-2 rounded-lg bg-card border border-border text-xs">
              <span className="text-muted-foreground">{new Date(l.created_at).toLocaleString("es-MX")}</span>
              <span className="mx-1 text-foreground font-medium">{l.action}</span>
              {l.section && <span className="text-primary">· {l.section}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
