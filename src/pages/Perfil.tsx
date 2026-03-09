import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User, Save } from "lucide-react";
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

const Perfil = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("🐼");
  const [avatarBg, setAvatarBg] = useState("bg-red-100");

  useEffect(() => {
    if (!user) return;
    setAvatar(user.user_metadata?.avatar || "🐼");
    setAvatarBg(user.user_metadata?.avatar_bg || "bg-red-100");
    setLoading(false);
  }, [user]);

  const saveAvatar = async () => {
    await supabase.auth.updateUser({ data: { avatar, avatar_bg: avatarBg } });
    toast.success("Avatar actualizado");
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
        <p className="text-sm text-muted-foreground mb-1">{user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"}</p>
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

      <Button onClick={saveAvatar} className="w-full bg-gradient-gold text-white">
        <Save className="w-4 h-4 mr-2" /> Guardar avatar
      </Button>
    </div>
  );
};

export default Perfil;
