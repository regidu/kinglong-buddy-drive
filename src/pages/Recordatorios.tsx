import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Check, Calendar, Car, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

const generateICS = (r: { title: string; description: string | null; due_date: string }) => {
  const date = r.due_date.replace(/-/g, "");
  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${date}
SUMMARY:${r.title}
DESCRIPTION:${r.description || "Recordatorio King Long"}
END:VEVENT
END:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${r.title.replace(/\s/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

interface Vehicle { id: string; nickname: string | null; model: string | null; }
interface Reminder {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  due_km: number | null;
  completed: boolean;
  vehicle_id: string;
}

const Recordatorios = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueKm, setDueKm] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    if (user) { fetchReminders(); fetchVehicles(); }
  }, [user]);

  const fetchVehicles = async () => {
    const { data } = await supabase.from("vehicles").select("id, nickname, model");
    if (data) setVehicles(data as Vehicle[]);
  };

  const fetchReminders = async () => {
    const { data } = await supabase
      .from("maintenance_reminders")
      .select("*")
      .order("due_date", { ascending: true });
    if (data) setReminders(data as Reminder[]);
  };

  const addReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !vehicleId) return;

    const { error } = await supabase.from("maintenance_reminders").insert({
      user_id: user.id,
      vehicle_id: vehicleId,
      title,
      description: description || null,
      due_date: dueDate,
      due_km: dueKm ? parseInt(dueKm) : null,
    });

    if (error) { toast.error("Error al crear recordatorio"); return; }
    toast.success("Recordatorio creado");
    setTitle(""); setDescription(""); setDueDate(""); setDueKm(""); setShowForm(false);
    fetchReminders();
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await supabase.from("maintenance_reminders").update({ completed: !completed }).eq("id", id);
    fetchReminders();
  };

  const deleteReminder = async (id: string) => {
    const { error } = await supabase.from("maintenance_reminders").delete().eq("id", id);
    if (error) { toast.error("Error al eliminar"); return; }
    toast.success("Recordatorio eliminado");
    fetchReminders();
  };

  const isOverdue = (date: string) => new Date(date) < new Date();

  return (
    <div className="min-h-screen pb-24 pt-safe">
      <div className="px-4 pt-4 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Recordatorios
          </h1>
          <Button size="sm" onClick={() => setShowForm(!showForm)} className="bg-gradient-gold text-white">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {vehicles.length === 0 && (
          <div className="glass-card rounded-xl p-4 text-center text-muted-foreground text-sm">
            <Car className="w-8 h-8 mx-auto mb-2 opacity-50" />
            Registra una unidad primero para crear recordatorios
          </div>
        )}

        {showForm && vehicles.length > 0 && (
          <form onSubmit={addReminder} className="glass-card rounded-xl p-4 space-y-3">
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Selecciona unidad</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.nickname || v.model || "Unidad"}</option>
              ))}
            </select>
            <Input placeholder="Título (ej: Cambio de aceite)" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input placeholder="Descripción (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <Input placeholder="Km programado (opcional)" type="number" value={dueKm} onChange={(e) => setDueKm(e.target.value)} />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-gradient-gold text-white">Crear</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        )}

        {reminders.length === 0 && vehicles.length > 0 && !showForm && (
          <div className="glass-card rounded-xl p-6 text-center space-y-3">
            <Bell className="w-10 h-10 mx-auto text-primary/40" />
            <p className="text-muted-foreground text-sm">No tienes recordatorios aún.</p>
            <Button size="sm" onClick={() => setShowForm(true)} className="bg-gradient-gold text-white">
              <Plus className="w-4 h-4 mr-1" /> Crear mi primer recordatorio
            </Button>
          </div>
        )}

        {reminders.length > 0 && (
          <>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2">
              <Download className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toca el icono de descarga en cada recordatorio para guardarlo en el calendario de tu celular.
              </p>
            </div>

            <div className="space-y-2">
              {reminders.map((r) => (
                <div key={r.id} className={`glass-card rounded-xl p-4 flex items-start gap-3 ${r.completed ? "opacity-50" : ""}`}>
                  <button onClick={() => toggleComplete(r.id, r.completed)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      r.completed ? "bg-primary border-primary" : "border-muted-foreground"
                    }`}>
                    {r.completed && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${r.completed ? "line-through" : "text-foreground"}`}>{r.title}</p>
                    {r.description && <p className="text-xs text-muted-foreground">{r.description}</p>}
                    <div className="flex gap-3 mt-1 text-xs">
                      <span className={`flex items-center gap-1 ${!r.completed && isOverdue(r.due_date) ? "text-destructive" : "text-muted-foreground"}`}>
                        <Calendar className="w-3 h-3" />
                        {new Date(r.due_date).toLocaleDateString("es-MX")}
                      </span>
                      {r.due_km && <span className="text-muted-foreground">{r.due_km.toLocaleString()} km</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button onClick={() => generateICS(r)} className="text-muted-foreground hover:text-primary" title="Agregar al calendario">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteReminder(r.id)} className="text-muted-foreground hover:text-destructive" title="Eliminar recordatorio">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recordatorios;
