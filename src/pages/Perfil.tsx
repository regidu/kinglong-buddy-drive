import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, EyeOff, Save, Cake } from "lucide-react";
import { toast } from "sonner";

const Perfil = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(true);

  const [showPwSection, setShowPwSection] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      if (data) {
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      }
      setLoading(false);
    });
    // birthday from user metadata
    setBirthday(user.user_metadata?.birthday || "");
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ full_name: fullName, phone }).eq("user_id", user.id);
    if (error) { toast.error("Error al guardar"); return; }
    // save birthday to user metadata
    if (birthday) {
      await supabase.auth.updateUser({ data: { birthday } });
    }
    toast.success("Perfil actualizado");
  };

  const changePassword = async () => {
    if (newPassword.length < 8) { toast.error("Mínimo 8 caracteres"); return; }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Contraseña actualizada");
    setNewPassword("");
    setShowPwSection(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Cargando...</div>;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-6 flex items-center gap-2">
        <User className="w-6 h-6" /> Mi Perfil
      </h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Correo electrónico</label>
          <Input value={user?.email || ""} disabled className="mt-1 opacity-60" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Nombre completo</label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Teléfono</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" placeholder="+52..." />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground flex items-center gap-1">
            <Cake className="w-4 h-4" /> Cumpleaños (opcional)
          </label>
          <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="mt-1" />
        </div>

        <Button onClick={saveProfile} className="w-full bg-gradient-gold text-white">
          <Save className="w-4 h-4 mr-2" /> Guardar cambios
        </Button>

        <div className="border-t border-border pt-4 mt-4">
          <button onClick={() => setShowPwSection(!showPwSection)} className="text-sm text-primary hover:underline flex items-center gap-1">
            <Lock className="w-4 h-4" /> Cambiar contraseña
          </button>
          {showPwSection && (
            <div className="mt-3 space-y-3">
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button onClick={changePassword} disabled={pwLoading} variant="outline" className="w-full">
                {pwLoading ? "Guardando..." : "Actualizar contraseña"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
