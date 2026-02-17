import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Plus, Trash2, Phone } from "lucide-react";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  vin: string;
  model: string | null;
  year: number | null;
  nickname: string | null;
}

const MiUnidad = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchVehicles();
  }, [user]);

  const fetchVehicles = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setVehicles(data as Vehicle[]);
    setLoading(false);
  };

  const addVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("vehicles").insert({
      user_id: user.id,
      vin: vin.toUpperCase(),
      model,
      year: year ? parseInt(year) : null,
      nickname: nickname || null,
    });

    if (error) {
      toast.error("Error al registrar unidad");
      return;
    }

    toast.success("¡Unidad registrada exitosamente!");
    setVin(""); setModel(""); setYear(""); setNickname("");
    setShowForm(false);
    fetchVehicles();
  };

  const deleteVehicle = async (id: string) => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (!error) {
      toast.success("Unidad eliminada");
      fetchVehicles();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Cargando...</div>;

  return (
    <div className="min-h-screen pb-24 pt-safe">
      <div className="px-4 py-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" />
          Mi Unidad
        </h1>

        {vehicles.length === 0 && !showForm && (
          <div className="glass-card rounded-xl p-6 text-center space-y-4">
            <Car className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No tienes unidades registradas</p>
            <div className="space-y-2">
              <Button onClick={() => setShowForm(true)} className="w-full bg-gradient-gold text-white">
                <Plus className="w-4 h-4 mr-2" /> Registrar mi unidad (VIN)
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.open("https://wa.me/528712196410?text=Hola, me interesa una unidad King Long", "_blank")}>
                <Phone className="w-4 h-4 mr-2" /> Hablar con un asesor de ventas
              </Button>
            </div>
          </div>
        )}

        {showForm && (
          <form onSubmit={addVehicle} className="glass-card rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-foreground">Registrar Unidad</h3>
            <Input placeholder="Número VIN *" value={vin} onChange={(e) => setVin(e.target.value)} required maxLength={17} minLength={17} />
            <Input placeholder="Modelo (ej: King Long C10)" value={model} onChange={(e) => setModel(e.target.value)} />
            <Input placeholder="Año" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            <Input placeholder="Apodo (ej: Mi Reina)" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-gradient-gold text-white">Registrar</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        )}

        {vehicles.map((v) => (
          <div key={v.id} className="glass-card rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">{v.nickname || v.model || "Mi Unidad"}</h3>
              <button onClick={() => deleteVehicle(v.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground font-mono">VIN: {v.vin}</p>
            {v.model && <p className="text-sm text-foreground/80">Modelo: {v.model}</p>}
            {v.year && <p className="text-sm text-foreground/80">Año: {v.year}</p>}
          </div>
        ))}

        {vehicles.length > 0 && !showForm && (
          <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Agregar otra unidad
          </Button>
        )}
      </div>
    </div>
  );
};

export default MiUnidad;
