import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user_id: string;
  message: string;
  is_from_user: boolean;
  created_at: string;
}

const Soporte = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    fetchMessages();

    const channel = supabase
      .channel("support-messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "support_messages" }, (payload) => {
        const msg = payload.new as Message;
        if (msg.user_id === user.id) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("support_messages")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setMessages(data as Message[]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    setSending(true);

    const { error } = await supabase.from("support_messages").insert({
      user_id: user.id,
      message: newMessage.trim(),
      is_from_user: true,
    });

    if (error) {
      toast.error("Error al enviar mensaje");
    } else {
      setNewMessage("");
      // Auto-reply simulation
      setTimeout(async () => {
        await supabase.from("support_messages").insert({
          user_id: user.id,
          message: "¡Gracias por contactarnos! Un asesor King Long te responderá pronto. Horario de atención: Lun-Vie 9:00 - 18:00",
          is_from_user: false,
        });
      }, 1500);
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 pt-safe">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Soporte King Long
        </h1>
        <p className="text-xs text-muted-foreground">Chat con nuestro equipo</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-12">
            <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            Envía un mensaje para iniciar la conversación
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.is_from_user ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              msg.is_from_user
                ? "bg-gradient-gold text-white rounded-br-md"
                : "glass-card text-foreground rounded-bl-md"
            }`}>
              {msg.message}
              <p className="text-[10px] opacity-60 mt-1">
                {new Date(msg.created_at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="px-4 py-3 border-t border-border flex gap-2">
        <Input
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" className="bg-gradient-gold text-white" disabled={sending || !newMessage.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default Soporte;
