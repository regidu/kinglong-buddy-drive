import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle, RotateCcw, ExternalLink, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-kinglong.png";

const WA_URL = "https://wa.me/528711377115?text=Hola,%20vengo%20del%20chat%20de%20la%20app%20y%20necesito%20ayuda%20personalizada.";

interface ChatNode {
  message: string;
  options: { label: string; next: string }[];
  navLink?: { label: string; path: string };
}

const chatTree: Record<string, ChatNode> = {
  root: {
    message: "¡Hola! 👋 Soy Killy, tu asistente virtual King Long. ¿En qué puedo ayudarte?",
    options: [
      { label: "🚐 Unidades y Precios", next: "unidades" },
      { label: "🔧 Servicio y Mantenimiento", next: "servicio" },
      { label: "📋 Garantías", next: "garantias" },
      { label: "💰 Simular Crédito", next: "credito" },
      { label: "🆘 Asistencia Vial", next: "asistencia" },
      { label: "👤 Hablar con un asesor", next: "whatsapp" },
    ],
  },
  unidades: {
    message: "Tenemos una línea completa de unidades King Long. ¿Cuál te interesa?",
    options: [
      { label: "Panel Ventanas A/A 5.5 m - $729,900", next: "unit_panel_aa_55" },
      { label: "Panel Ventanas A/A 6 m - $789,900", next: "unit_panel_aa_6" },
      { label: "Equipada 16 Pasajeros - $769,900", next: "unit_16" },
      { label: "Equipada 16 Pas. 5.5 m - $829,900", next: "unit_16_55" },
      { label: "Equipada 19 Pas. 6 m - $889,900", next: "unit_19_6" },
      { label: "Kingo EV - $1,449,000", next: "unit_ev" },
    ],
    navLink: { label: "Ver catálogo de precios", path: "/precios" },
  },
  unit_panel_aa_55: {
    message: "🚐 Panel Ventanas A/A 5.5 m — $729,900 IVA incluido\n\n• Motor 3TZ 2.7L — 161 hp\n• ABS + EBD\n• 5 vel. + reversa\n• Rendimiento 10 km/l combinado\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  unit_panel_aa_6: {
    message: "🚐 Panel Ventanas A/A 6 m — $789,900 IVA incluido\n\n• Motor 3TZ 2.7L — 161 hp\n• ABS + EBD\n• 5 vel. + reversa\n• Carga: 1,615 kg\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  unit_16: {
    message: "🚐 Equipada 16 Pasajeros — $769,900 IVA incluido\n\n• Motor 2.4L — 137 hp, EURO 5\n• ABS + EBD + ESC\n• 2 airbags, TPMS, ISOFIX\n• Rendimiento 9.1 km/l\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  unit_16_55: {
    message: "🚐 Equipada 16 Pasajeros 5.5 m — $829,900 IVA incluido\n\n• Motor 3TZ 2.7L — 161 hp\n• ABS + EBD\n• 5 vel. + reversa\n• Rendimiento 10 km/l combinado\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  unit_19_6: {
    message: "🚐 Equipada 19 Pasajeros 6 m — $889,900 IVA incluido\n\n• Motor 3TZ 2.7L — 161 hp\n• ABS + EBD\n• 5 vel. + reversa\n• Carga: 1,615 kg\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  unit_ev: {
    message: "⚡ Kingo EV — $1,449,000 IVA incluido\n\n• Motor síncrono 60/120 kW\n• Batería CATL 70.479 kWh\n• Autonomía ≥ 280 km\n• Carga rápida < 2 hrs\n• 16 pasajeros\n\nPrecios sujetos a cambios.",
    options: [{ label: "💰 Simular crédito", next: "credito" }, { label: "👤 Hablar con asesor", next: "whatsapp" }],
    navLink: { label: "Ir al simulador de crédito", path: "/credito" },
  },
  servicio: {
    message: "¿Qué necesitas sobre servicio y mantenimiento?",
    options: [
      { label: "📅 Agendar mantenimiento", next: "agendar" },
      { label: "🗺️ Buscar taller cercano", next: "taller" },
      { label: "🔩 Pedir refacciones", next: "refacciones" },
      { label: "📖 Ver manual de uso", next: "manual" },
    ],
  },
  agendar: {
    message: "Para agendar tu mantenimiento, puedes hacerlo desde la sección de Recordatorios en la app, o contacta directamente a tu taller autorizado más cercano.",
    options: [{ label: "📞 Contactar taller", next: "whatsapp" }],
    navLink: { label: "Ir a Recordatorios", path: "/recordatorios" },
  },
  taller: {
    message: "Encuentra tu taller autorizado en la sección Mapa de Servicios de la app. Ahí verás talleres, vulcanizadoras y puntos de venta cercanos.",
    options: [{ label: "👤 Necesito más ayuda", next: "whatsapp" }],
    navLink: { label: "Ir al Mapa de Servicios", path: "/mapa" },
  },
  refacciones: {
    message: "Consulta nuestro Catálogo de Refacciones en la app. Cada producto tiene un enlace directo a Mercado Libre para su compra.",
    options: [{ label: "👤 Necesito ayuda", next: "whatsapp" }],
    navLink: { label: "Ir a Refacciones", path: "/refacciones" },
  },
  manual: {
    message: "Accede al manual de tu unidad en la sección Manual de Uso:\n• Manual KINGO — Modelos 2025 en adelante\n• Manual FOURGO — Modelos 2022-2024",
    options: [{ label: "👤 Más información", next: "whatsapp" }],
    navLink: { label: "Ir al Manual", path: "/manual" },
  },
  garantias: {
    message: "Tu garantía King Long cubre componentes principales. Para reportar una falla:\n\n1. Ve a Garantías en la app\n2. Describe el problema\n3. Un asesor te contactará",
    options: [{ label: "📝 Reportar falla", next: "whatsapp" }],
    navLink: { label: "Ir a Garantías", path: "/garantias" },
  },
  credito: {
    message: "Usa el Simulador de Crédito en la app para calcular tus mensualidades. Selecciona tu unidad y ajusta el enganche y plazo.\n\n¿Quieres que un asesor financiero te contacte?",
    options: [{ label: "👤 Sí, contactar asesor", next: "whatsapp" }],
    navLink: { label: "Ir al Simulador de Crédito", path: "/credito" },
  },
  asistencia: {
    message: "🆘 Para Asistencia Vial de Emergencia, usa el botón rojo en la pantalla principal de la app o contacta directamente:",
    options: [{ label: "📞 Llamar ahora", next: "whatsapp" }],
    navLink: { label: "Ir a Asistencia Vial", path: "/asistencia" },
  },
  whatsapp: {
    message: "Te conectaremos con un asesor King Long por WhatsApp. Toca el botón para iniciar la conversación. 👇",
    options: [],
  },
};

interface BubbleMsg {
  from: "bot" | "user";
  text: string;
  navLink?: { label: string; path: string };
}

const Soporte = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<BubbleMsg[]>([
    { from: "bot", text: chatTree.root.message },
  ]);
  const [currentNode, setCurrentNode] = useState("root");
  const bottomRef = useRef<HTMLDivElement>(null);
  const avatar = user?.user_metadata?.avatar || null;
  const avatarBg = user?.user_metadata?.avatar_bg || "bg-red-100";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOption = (label: string, next: string) => {
    const node = chatTree[next];
    if (!node) return;
    setMessages((prev) => [...prev, { from: "user", text: label }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: node.message, navLink: node.navLink }]);
      setCurrentNode(next);
    }, 400);
  };

  const resetChat = () => {
    setMessages([{ from: "bot", text: chatTree.root.message }]);
    setCurrentNode("root");
  };

  const node = chatTree[currentNode];

  return (
    <div className="min-h-screen flex flex-col pb-20 pt-safe">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <img src={logo} alt="Killy" className="w-8 h-8 rounded-full bg-card border border-border object-contain" />
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Killy — Asistente King Long
          </h1>
          <p className="text-xs text-muted-foreground">Tu asistente virtual inteligente</p>
        </div>
        <button onClick={resetChat} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.from === "bot" && (
              <img src={logo} alt="Killy" className="w-7 h-7 rounded-full object-contain bg-card border border-border shrink-0" />
            )}
            <div className="max-w-[80%] space-y-1.5">
              <div className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line ${
                m.from === "user"
                  ? "bg-gradient-gold text-white rounded-br-md"
                  : "glass-card text-foreground rounded-bl-md"
              }`}>
                {m.text}
              </div>
              {m.navLink && (
                <button
                  onClick={() => navigate(m.navLink!.path)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline px-1"
                >
                  <ArrowRight className="w-3 h-3" />
                  {m.navLink.label}
                </button>
              )}
            </div>
            {m.from === "user" && (
              avatar ? (
                <div className={`w-7 h-7 rounded-full ${avatarBg} flex items-center justify-center text-sm shrink-0`}>{avatar}</div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-xs text-muted-foreground">Tú</span>
                </div>
              )
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Options */}
      <div className="px-4 py-3 border-t border-border space-y-1.5 max-h-56 overflow-y-auto">
        {node?.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOption(opt.label, opt.next)}
            className="w-full text-left text-sm px-3 py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-colors active:scale-[0.98]"
          >
            {opt.label}
          </button>
        ))}

        {currentNode === "whatsapp" && (
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-sm px-3 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors active:scale-[0.98]"
          >
            <ExternalLink className="w-4 h-4" /> Contactar por WhatsApp
          </a>
        )}

        {currentNode !== "root" && (
          <button
            onClick={resetChat}
            className="w-full text-center text-xs text-muted-foreground hover:text-primary py-1"
          >
            ↩ Regresar al inicio
          </button>
        )}
      </div>
    </div>
  );
};

export default Soporte;
