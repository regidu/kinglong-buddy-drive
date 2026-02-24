import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Plus, Trash2, Phone, Camera } from "lucide-react";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

interface Vehicle {
  id: string;
  vin: string;
  model: string | null;
  year: number | null;
  nickname: string | null;
}

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 2022 + 1 }, (_, i) => 2022 + i);

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
  const [vehiclePhotos, setVehiclePhotos] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("vehicle_photos");
    return saved ? JSON.parse(saved) : {};
  });
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoTargetVin, setPhotoTargetVin] = useState<string | null>(null);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !photoTargetVin) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...vehiclePhotos, [photoTargetVin]: reader.result as string };
      setVehiclePhotos(updated);
      localStorage.setItem("vehicle_photos", JSON.stringify(updated));
      toast.success("Foto actualizada");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
    setPhotoTargetVin(null);
  };

  if (loading) return <LoadingScreen />;

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
            <Input placeholder="Número VIN (17 caracteres) *" value={vin} onChange={(e) => setVin(e.target.value)} required maxLength={17} minLength={17} />
            <p className="text-xs text-muted-foreground -mt-2 ml-1">💡 El VIN se encuentra en la placa metálica del lado del copiloto (parte baja del parabrisas) o en la etiqueta de la puerta del conductor.</p>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
              <option value="">Selecciona modelo</option>
              <option value="Cargo A/A">Cargo A/A</option>
              <option value="Panel Ventanas">Panel Ventanas</option>
              <option value="Panel Ventanas A/A">Panel Ventanas A/A</option>
              <option value="Equipada 16 Pasajeros">Equipada 16 Pasajeros</option>
              <option value="Kingo EV">Kingo EV</option>
              <option value="Semi Equipada">Semi Equipada</option>
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
              <option value="">Selecciona año</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <Input placeholder="Apodo (ej: Mi Reina)" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <p className="text-xs text-muted-foreground">📷 Podrás agregar una foto después de registrar</p>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-gradient-gold text-white">Registrar</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        )}

        <input type="file" accept="image/*" ref={photoInputRef} className="hidden" onChange={handlePhotoUpload} />

        {vehicles.map((v) => (
          <div key={v.id} className="glass-card rounded-xl p-4 space-y-2">
            {vehiclePhotos[v.vin] && (
              <img src={vehiclePhotos[v.vin]} alt="Mi unidad" className="w-full h-32 object-cover rounded-lg" />
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">{v.nickname || v.model || "Mi Unidad"}</h3>
              <div className="flex gap-2">
                <button onClick={() => { setPhotoTargetVin(v.vin); photoInputRef.current?.click(); }} className="text-muted-foreground hover:text-primary">
                  <Camera className="w-4 h-4" />
                </button>
                <button onClick={() => deleteVehicle(v.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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
