import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, EyeOff, Save, Cake, Check, X } from "lucide-react";
import { toast } from "sonner";
import LoadingScreen from "@/components/LoadingScreen";

const animalAvatars = [
  { emoji: "🐼", name: "Panda" }, { emoji: "🐉", name: "Dragón" }, { emoji: "🐅", name: "Tigre" },
  { emoji: "🐒", name: "Mono" }, { emoji: "🐍", name: "Serpiente" }, { emoji: "🐇", name: "Conejo" },
  { emoji: "🐓", name: "Gallo" }, { emoji: "🐖", name: "Cerdo" }, { emoji: "🐀", name: "Rata" },
  { emoji: "🐂", name: "Buey" }, { emoji: "🐴", name: "Caballo" }, { emoji: "🐑", name: "Cabra" },
];

const bgColors = [
  { value: "bg-red-100", label: "Rojo", ring: "ring-red-300" },
  { value: "bg-orange-100", label: "Naranja", ring: "ring-orange-300" },
  { value: "bg-yellow-100", label: "Amarillo", ring: "ring-yellow-300" },
  { value: "bg-green-100", label: "Verde", ring: "ring-green-300" },
  { value: "bg-blue-100", label: "Azul", ring: "ring-blue-300" },
  { value: "bg-purple-100", label: "Morado", ring: "ring-purple-300" },
  { value: "bg-pink-100", label: "Rosa", ring: "ring-pink-300" },
  { value: "bg-gray-100", label: "Gris", ring: "ring-gray-300" },
];

const ladaOptions = [
  { code: "+52", country: "🇲🇽 México" },
  { code: "+1", country: "🇺🇸 EE.UU." },
  { code: "+57", country: "🇨🇴 Colombia" },
  { code: "+54", country: "🇦🇷 Argentina" },
  { code: "+56", country: "🇨🇱 Chile" },
  { code: "+51", country: "🇵🇪 Perú" },
  { code: "+593", country: "🇪🇨 Ecuador" },
  { code: "+502", country: "🇬🇹 Guatemala" },
  { code: "+503", country: "🇸🇻 El Salvador" },
  { code: "+504", country: "🇭🇳 Honduras" },
  { code: "+34", country: "🇪🇸 España" },
];

const passwordRules = [
  { label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
  { label: "Un carácter especial", test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];

const Perfil = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [lada, setLada] = useState("+52");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("🐼");
  const [avatarBg, setAvatarBg] = useState("bg-red-100");

  const [showPwSection, setShowPwSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const allRulesPass = passwordRules.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      if (data) {
        setFullName(data.full_name || "");
        const savedPhone = data.phone || "";
        // Parse lada from saved phone
        const ladaMatch = ladaOptions.find((l) => savedPhone.startsWith(l.code));
        if (ladaMatch) {
          setLada(ladaMatch.code);
          setPhone(savedPhone.replace(ladaMatch.code, "").trim());
        } else {
          setPhone(savedPhone);
        }
      }
      setLoading(false);
    });
    setBirthday(user.user_metadata?.birthday || "");
    setAvatar(user.user_metadata?.avatar || "🐼");
    setAvatarBg(user.user_metadata?.avatar_bg || "bg-red-100");
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    const fullPhone = `${lada}${phone}`;
    const { error } = await supabase.from("profiles").update({ full_name: fullName, phone: fullPhone }).eq("user_id", user.id);
    if (error) { toast.error("Error al guardar"); return; }
    await supabase.auth.updateUser({ data: { birthday, avatar, avatar_bg: avatarBg } });
    toast.success("Perfil actualizado");
  };

  const changePassword = async () => {
    if (!currentPassword) { toast.error("Ingresa tu contraseña actual"); return; }
    if (!allRulesPass) { toast.error("La contraseña no cumple los requisitos"); return; }
    if (!passwordsMatch) { toast.error("Las contraseñas no coinciden"); return; }
    setPwLoading(true);
    // Verify current password by re-signing in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email || "",
      password: currentPassword,
    });
    if (signInError) {
      setPwLoading(false);
      toast.error("La contraseña actual es incorrecta");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Contraseña actualizada");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setShowPwSection(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-6 flex items-center gap-2">
        <User className="w-6 h-6" /> Mi Perfil
      </h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className={`w-20 h-20 rounded-full ${avatar ? avatarBg : "bg-muted"} flex items-center justify-center text-4xl mb-3 ring-2 ring-offset-2 ring-primary/30`}>
          {avatar || <User className="w-10 h-10 text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-sm font-medium text-foreground">Elige tu avatar</p>
          {avatar && (<button onClick={() => setAvatar("")} className="text-xs text-destructive hover:underline">Quitar avatar</button>)}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {animalAvatars.map((a) => (
            <button key={a.emoji} onClick={() => setAvatar(a.emoji)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${avatar === a.emoji ? "ring-2 ring-primary scale-110" : "hover:scale-105"}`} title={a.name}>
              {a.emoji}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-2">Color de fondo</p>
        <div className="flex gap-2">
          {bgColors.map((c) => (
            <button key={c.value} onClick={() => setAvatarBg(c.value)} className={`w-7 h-7 rounded-full ${c.value} transition-all ${avatarBg === c.value ? `ring-2 ${c.ring} scale-110` : "hover:scale-105"}`} title={c.label} />
          ))}
        </div>
      </div>

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
          <div className="flex gap-2 mt-1">
            <select value={lada} onChange={(e) => setLada(e.target.value)} className="w-32 h-10 rounded-md border border-input bg-background px-2 text-sm text-foreground">
              {ladaOptions.map((l) => (<option key={l.code} value={l.code}>{l.country} {l.code}</option>))}
            </select>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1" placeholder="Número" />
          </div>
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
                  type={showCurrentPw ? "text" : "password"}
                  placeholder="Contraseña actual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                  {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <Input type={showPw ? "text" : "password"} placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pr-10" minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="relative">
                <Input type={showPw ? "text" : "password"} placeholder="Confirmar nueva contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10" minLength={8} />
                {confirmPassword.length > 0 && (
                  <span className="absolute right-3 top-3">
                    {passwordsMatch ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-destructive" />}
                  </span>
                )}
              </div>
              {newPassword.length > 0 && (
                <div className="space-y-1 text-xs">
                  {passwordRules.map((rule) => {
                    const pass = rule.test(newPassword);
                    return (
                      <div key={rule.label} className={`flex items-center gap-1.5 ${pass ? "text-green-500" : "text-muted-foreground"}`}>
                        {pass ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
              <Button onClick={changePassword} disabled={pwLoading || !allRulesPass || !passwordsMatch || !currentPassword} variant="outline" className="w-full">
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
