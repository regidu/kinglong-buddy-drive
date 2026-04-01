import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Plus, Trash2, Phone, Camera, X, AlertTriangle, Pencil } from "lucide-react";
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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeletePhoto, setConfirmDeletePhoto] = useState<string | null>(null);

  const [vehiclePhotos, setVehiclePhotos] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("vehicle_photos");
    return saved ? JSON.parse(saved) : {};
  });

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoTargetVin, setPhotoTargetVin] = useState<string | null>(null);

  useEffect(() => { if (user) fetchVehicles(); }, [user]);

  const fetchVehicles = async () => {
    const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
    if (!error && data) setVehicles(data as Vehicle[]);
    setLoading(false);
  };

  const addVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("vehicles").insert({
      user_id: user.id, vin: vin.toUpperCase(), model, year: year ? parseInt(year) : null, nickname: nickname || null,
    });
    if (error) { toast.error("Error al registrar unidad"); return; }
    toast.success("¡Unidad registrada exitosamente!");
    setVin(""); setModel(""); setYear(""); setNickname("");
    setShowForm(false);
    fetchVehicles();
  };

  const updateVehicle = async (id: string, updates: { model?: string; year?: number | null; nickname?: string | null }) => {
    const { error } = await supabase.from("vehicles").update(updates).eq("id", id);
    if (error) { toast.error("Error al actualizar"); return; }
    toast.success("Unidad actualizada");
    fetchVehicles();
  };

  const deleteVehicle = async (id: string) => {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (!error) { toast.success("Unidad eliminada"); setConfirmDeleteId(null); fetchVehicles(); }
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

  const deletePhoto = (vin: string) => {
    const updated = { ...vehiclePhotos };
    delete updated[vin];
    setVehiclePhotos(updated);
    localStorage.setItem("vehicle_photos", JSON.stringify(updated));
    toast.success("Foto eliminada");
    setConfirmDeletePhoto(null);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-24 pt-safe">
      <div className="px-4 py-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Car className="w-6 h-6 text-primary" /> Mi Unidad
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
              <option value="Panel Ventanas A/A 5.5 m">Panel Ventanas A/A 5.5 m</option>
              <option value="Panel Ventanas A/A 6 m">Panel Ventanas A/A 6 m</option>
              <option value="Equipada 16 Pasajeros">Equipada 16 Pasajeros</option>
              <option value="Equipada 16 Pasajeros 5.5 m">Equipada 16 Pasajeros 5.5 m</option>
              <option value="Equipada 19 Pasajeros 6 m">Equipada 19 Pasajeros 6 m</option>
              <option value="Kingo EV">Kingo EV</option>
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
              <option value="">Selecciona año</option>
              {yearOptions.map((y) => (<option key={y} value={y}>{y}</option>))}
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
          <VehicleCard
            key={v.id}
            vehicle={v}
            photo={vehiclePhotos[v.vin]}
            onUploadPhoto={() => { setPhotoTargetVin(v.vin); photoInputRef.current?.click(); }}
            onDeletePhoto={() => setConfirmDeletePhoto(v.vin)}
            onDelete={() => setConfirmDeleteId(v.id)}
            onUpdate={(updates) => updateVehicle(v.id, updates)}
          />
        ))}

        {vehicles.length > 0 && !showForm && (
          <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Agregar otra unidad
          </Button>
        )}
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setConfirmDeleteId(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-4 text-center" onClick={(e) => e.stopPropagation()}>
            <AlertTriangle className="w-10 h-10 text-destructive mx-auto" />
            <h3 className="font-bold text-foreground text-lg">¿Eliminar esta unidad?</h3>
            <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer. Se eliminará toda la información de esta unidad.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmDeleteId(null)}>Cancelar</Button>
              <Button variant="destructive" className="flex-1" onClick={() => deleteVehicle(confirmDeleteId)}>Sí, eliminar</Button>
            </div>
          </div>
        </div>
      )}

      {confirmDeletePhoto && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setConfirmDeletePhoto(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-4 text-center" onClick={(e) => e.stopPropagation()}>
            <Camera className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-foreground">¿Eliminar la foto?</h3>
            <p className="text-sm text-muted-foreground">La foto de tu unidad se eliminará.</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmDeletePhoto(null)}>Cancelar</Button>
              <Button variant="destructive" className="flex-1" onClick={() => deletePhoto(confirmDeletePhoto)}>Sí, eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VehicleCard = ({ vehicle, photo, onUploadPhoto, onDeletePhoto, onDelete, onUpdate }: {
  vehicle: Vehicle;
  photo?: string;
  onUploadPhoto: () => void;
  onDeletePhoto: () => void;
  onDelete: () => void;
  onUpdate: (updates: { model?: string; year?: number | null; nickname?: string | null }) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [tempModel, setTempModel] = useState(vehicle.model || "");
  const [tempYear, setTempYear] = useState(vehicle.year?.toString() || "");
  const [tempNickname, setTempNickname] = useState(vehicle.nickname || "");

  return (
    <div className="glass-card rounded-xl p-4 space-y-2">
      {photo && (
        <div className="relative">
          <img src={photo} alt="Mi unidad" className="w-full h-32 object-cover rounded-lg" />
          <button onClick={onDeletePhoto} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center text-destructive hover:bg-destructive hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">{vehicle.nickname || vehicle.model || "Mi Unidad"}</h3>
        <div className="flex gap-2">
          <button onClick={() => { setEditing(true); setTempModel(vehicle.model || ""); setTempYear(vehicle.year?.toString() || ""); setTempNickname(vehicle.nickname || ""); }} className="text-muted-foreground hover:text-primary"><Pencil className="w-4 h-4" /></button>
          <button onClick={onUploadPhoto} className="text-muted-foreground hover:text-primary"><Camera className="w-4 h-4" /></button>
          <button onClick={onDelete} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      {!editing ? (
        <>
          <p className="text-xs text-muted-foreground font-mono">VIN: {vehicle.vin}</p>
          {vehicle.model && <p className="text-sm text-foreground/80">Modelo: {vehicle.model}</p>}
          {vehicle.year && <p className="text-sm text-foreground/80">Año: {vehicle.year}</p>}
        </>
      ) : (
        <div className="space-y-2 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">VIN: {vehicle.vin}</p>
          <select value={tempModel} onChange={(e) => setTempModel(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
            <option value="">Selecciona modelo</option>
            <option value="Panel Cerrada">Panel Cerrada</option>
            <option value="Panel Ventanas">Panel Ventanas</option>
            <option value="Panel Ventanas A/A">Panel Ventanas A/A</option>
            <option value="16 Pasajeros">16 Pasajeros</option>
            <option value="Kingo EV">Kingo EV</option>
          </select>
          <select value={tempYear} onChange={(e) => setTempYear(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
            <option value="">Selecciona año</option>
            {yearOptions.map((y) => (<option key={y} value={y}>{y}</option>))}
          </select>
          <Input placeholder="Apodo" value={tempNickname} onChange={(e) => setTempNickname(e.target.value)} />
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-gradient-gold text-white" onClick={() => { onUpdate({ model: tempModel || undefined, year: tempYear ? parseInt(tempYear) : null, nickname: tempNickname || null }); setEditing(false); }}>Guardar</Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiUnidad;
