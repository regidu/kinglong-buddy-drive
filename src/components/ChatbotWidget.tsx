import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, RotateCcw, ExternalLink } from "lucide-react";
import logo from "@/assets/logo-kinglong.png";

interface ChatNode {
  message: string;
  options: { label: string; next: string }[];
}

const WA_URL = "https://wa.me/528711377115?text=Hola,%20vengo%20del%20chat%20de%20la%20app%20y%20necesito%20ayuda%20personalizada.";

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
      { label: "Panel Cerrada - $635,900", next: "unit_panel_cerrada" },
      { label: "Panel Ventanas - $599,900", next: "unit_panel_ventanas" },
      { label: "Panel Ventanas A/A - $624,900", next: "unit_panel_aa" },
      { label: "16 Pasajeros - $769,900", next: "unit_16" },
      { label: "Kingo EV - $1,449,000", next: "unit_ev" },
    ],
  },
  unit_panel_cerrada: {
    message: "🚐 **Panel Cerrada** — $635,900 IVA incluido\n\n• Motor 2.4L\n• ABS + EBD\n• 5 velocidades + reversa\n• Rendimiento 9.1 Km/L\n• Área de carga 9.8m³\n• Capacidad 1,175 Kg\n\n*Precios sujetos a cambios. Consulta a tu asesor.*",
    options: [
      { label: "💰 Simular crédito", next: "credito" },
      { label: "👤 Hablar con asesor", next: "whatsapp" },
    ],
  },
  unit_panel_ventanas: {
    message: "🚐 **Panel Ventanas** — $599,900 IVA incluido\n\n• Motor 2.4L\n• ABS + EBD\n• 5 velocidades + reversa\n• Rendimiento 9.1 Km/L\n• Área de carga 9.8m³\n• Capacidad 1,175 Kg\n\n*Precios sujetos a cambios.*",
    options: [
      { label: "💰 Simular crédito", next: "credito" },
      { label: "👤 Hablar con asesor", next: "whatsapp" },
    ],
  },
  unit_panel_aa: {
    message: "🚐 **Panel Ventanas A/A** — $624,900 IVA incluido\n\n• Motor 2.4L\n• ABS + EBD\n• 5 velocidades + reversa\n• A/C doble zona\n• Área de carga 9.8m³\n• Capacidad 1,175 Kg\n\n*Precios sujetos a cambios.*",
    options: [
      { label: "💰 Simular crédito", next: "credito" },
      { label: "👤 Hablar con asesor", next: "whatsapp" },
    ],
  },
  unit_16: {
    message: "🚐 **16 Pasajeros** — $769,900 IVA incluido\n\n• Motor 2.4L\n• ABS + EBD\n• 16 asientos con seguridad\n• A/C doble zona\n• Rendimiento 9.1 Km/L\n\n*Precios sujetos a cambios.*",
    options: [
      { label: "💰 Simular crédito", next: "credito" },
      { label: "👤 Hablar con asesor", next: "whatsapp" },
    ],
  },
  unit_ev: {
    message: "⚡ **Kingo EV** — $1,449,000 IVA incluido\n\n• Motor 258.15 HP\n• CATL 70.479 kWh\n• Carga rápida ≤2 hrs\n• 16 asientos\n• A/C doble zona\n• ABS + EBD\n\n*Precios sujetos a cambios.*",
    options: [
      { label: "💰 Simular crédito", next: "credito" },
      { label: "👤 Hablar con asesor", next: "whatsapp" },
    ],
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
    message: "Para agendar tu mantenimiento, puedes hacerlo desde la sección de **Recordatorios** en la app, o contacta directamente a tu taller autorizado más cercano.",
    options: [{ label: "📞 Contactar taller", next: "whatsapp" }],
  },
  taller: {
    message: "Encuentra tu taller autorizado en la sección **Mapa de Servicios** de la app. Ahí verás talleres, vulcanizadoras y puntos de venta cercanos.",
    options: [{ label: "👤 Necesito más ayuda", next: "whatsapp" }],
  },
  refacciones: {
    message: "Consulta nuestro **Catálogo de Refacciones** en la app. Cada producto tiene un enlace directo a Mercado Libre para su compra.",
    options: [{ label: "👤 Necesito ayuda", next: "whatsapp" }],
  },
  manual: {
    message: "Accede al manual de tu unidad en la sección **Manual de Uso**:\n• **Manual KINGO** — Modelos 2025 en adelante\n• **Manual FOURGO** — Modelos 2022-2024",
    options: [{ label: "👤 Más información", next: "whatsapp" }],
  },
  garantias: {
    message: "Tu garantía King Long cubre componentes principales. Para reportar una falla:\n\n1. Ve a **Garantías** en la app\n2. Describe el problema\n3. Un asesor te contactará\n\n¿Necesitas reportar algo ahora?",
    options: [
      { label: "📝 Reportar falla", next: "whatsapp" },
      { label: "ℹ️ Más info de garantía", next: "whatsapp" },
    ],
  },
  credito: {
    message: "Usa el **Simulador de Crédito** en la app para calcular tus mensualidades. Selecciona tu unidad y ajusta el enganche y plazo.\n\n¿Quieres que un asesor financiero te contacte?",
    options: [
      { label: "👤 Sí, contactar asesor", next: "whatsapp" },
    ],
  },
  asistencia: {
    message: "🆘 Para **Asistencia Vial de Emergencia**, usa el botón rojo en la pantalla principal de la app o contacta directamente:",
    options: [
      { label: "📞 Llamar ahora", next: "whatsapp" },
    ],
  },
  whatsapp: {
    message: "Te conectaremos con un asesor King Long por WhatsApp. Toca el botón para iniciar la conversación. 👇",
    options: [],
  },
};

interface BubbleMsg {
  from: "bot" | "user";
  text: string;
}

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<BubbleMsg[]>([]);
  const [currentNode, setCurrentNode] = useState("root");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: chatTree.root.message }]);
      setCurrentNode("root");
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOption = (label: string, next: string) => {
    const userMsg: BubbleMsg = { from: "user", text: label };
    const node = chatTree[next];
    if (!node) return;
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: node.message }]);
      setCurrentNode(next);
    }, 400);
  };

  const resetChat = () => {
    setMessages([{ from: "bot", text: chatTree.root.message }]);
    setCurrentNode("root");
  };

  const node = chatTree[currentNode];

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-gradient-gold text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-16 right-2 left-2 z-50 max-w-sm mx-auto flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-gold text-white">
            <img src={logo} alt="Killy" className="w-7 h-7 rounded-full bg-white/20 object-contain" />
            <div className="flex-1">
              <p className="font-bold text-sm">Killy</p>
              <p className="text-[10px] opacity-80">Asistente virtual King Long</p>
            </div>
            <button onClick={resetChat} className="p-1 hover:bg-white/20 rounded-full"><RotateCcw className="w-4 h-4" /></button>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-full"><X className="w-4 h-4" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2" style={{ minHeight: 200 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                  m.from === "user"
                    ? "bg-gradient-gold text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Options */}
          <div className="px-3 py-3 border-t border-border space-y-1.5 max-h-48 overflow-y-auto">
            {node?.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOption(opt.label, opt.next)}
                className="w-full text-left text-sm px-3 py-2 rounded-xl border border-border bg-card hover:bg-muted transition-colors active:scale-[0.98]"
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
      )}
    </>
  );
};

export default ChatbotWidget;
