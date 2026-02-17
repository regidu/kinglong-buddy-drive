import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const Sugerencias = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("support_messages").insert({
      user_id: user.id,
      message: `[SUGERENCIA] ${message.trim()}`,
      is_from_user: true,
    });
    setLoading(false);
    if (error) { toast.error("Error al enviar"); return; }
    toast.success("¡Gracias por tu comentario!");
    setMessage("");
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" /> Comentarios y Sugerencias
      </h1>
      <p className="text-muted-foreground mb-6">Tu opinión nos ayuda a mejorar</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu comentario o sugerencia..."
          className="w-full min-h-[160px] p-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          required
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground text-right">{message.length}/1000</p>
        <Button type="submit" className="w-full bg-gradient-gold text-white" disabled={loading || !message.trim()}>
          <Send className="w-4 h-4 mr-2" /> {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
};

export default Sugerencias;
