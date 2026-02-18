import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Star } from "lucide-react";
import { toast } from "sonner";

const ratingCategories = [
  { key: "app", label: "Experiencia en la app" },
  { key: "service", label: "Servicio al cliente" },
  { key: "comfort", label: "Confort de la camioneta" },
  { key: "performance", label: "Rendimiento y potencia" },
  { key: "durability", label: "Durabilidad y calidad" },
  { key: "value", label: "Relación calidad-precio" },
];

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} type="button" onClick={() => onChange(s)} className="p-0.5">
        <Star className={`w-6 h-6 transition-colors ${s <= value ? "fill-primary text-primary" : "text-border"}`} />
      </button>
    ))}
  </div>
);

const Sugerencias = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);

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

  const handleSurveySubmit = async () => {
    if (!user) return;
    const ratingText = ratingCategories.map((c) => `${c.label}: ${ratings[c.key] || 0}/5`).join(" | ");
    await supabase.from("support_messages").insert({
      user_id: user.id,
      message: `[ENCUESTA] ${ratingText}`,
      is_from_user: true,
    });
    toast.success("¡Gracias por calificar!");
    setSurveySubmitted(true);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" /> Comentarios y Sugerencias
      </h1>
      <p className="text-muted-foreground mb-4">Tu opinión nos ayuda a mejorar</p>

      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 mb-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Todos los comentarios y sugerencias son tomados en cuenta con total seriedad. De ser necesario, nos pondremos en contacto contigo para dar seguimiento a tu caso.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu comentario o sugerencia..."
          className="w-full min-h-[140px] p-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          required
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground text-right">{message.length}/1000</p>
        <Button type="submit" className="w-full bg-gradient-gold text-white" disabled={loading || !message.trim()}>
          <Send className="w-4 h-4 mr-2" /> {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>

      {/* Survey */}
      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Califica tu experiencia</h2>
        {surveySubmitted ? (
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="text-primary font-semibold">¡Gracias por tu calificación! 🎉</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ratingCategories.map((c) => (
              <div key={c.key} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
                <span className="text-sm font-medium text-foreground">{c.label}</span>
                <StarRating value={ratings[c.key] || 0} onChange={(v) => setRatings({ ...ratings, [c.key]: v })} />
              </div>
            ))}
            <Button
              onClick={handleSurveySubmit}
              className="w-full bg-gradient-gold text-white"
              disabled={Object.keys(ratings).length < ratingCategories.length}
            >
              Enviar calificación
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sugerencias;
