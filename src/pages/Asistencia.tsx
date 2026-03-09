import { Phone, MapPin, AlertTriangle, Truck } from "lucide-react";

const emergencyOptions = [
  { icon: <Truck className="w-6 h-6" />, title: "Grúa", desc: "Solicitar servicio de grúa (ext. 5)", phone: "tel:8005550075,5" },
  { icon: <AlertTriangle className="w-6 h-6" />, title: "Falla Mecánica", desc: "Reportar falla en el camino", phone: "tel:8005550075" },
  { icon: <MapPin className="w-6 h-6" />, title: "Llanta Ponchada", desc: "Asistencia para cambio de llanta (ext. 5)", phone: "tel:8005550075,5" },
  { icon: <Phone className="w-6 h-6" />, title: "Línea Directa", desc: "Hablar con un asesor", phone: "tel:+528711377115" },
];

const Asistencia = () => (
  <div className="min-h-screen pb-20 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2">Asistencia Vial</h1>
    <p className="text-muted-foreground mb-2">Disponible 24/7 para ayudarte en el camino</p>

    <div className="mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
      <p className="text-xs text-primary font-bold">⚠️ Condiciones del servicio:</p>
      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
        <li>Disponible únicamente para modelos <strong>2025 en adelante</strong>.</li>
        <li>Máximo <strong>2 servicios de grúa al año</strong>.</li>
        <li>Cobertura de hasta <strong>100 km de distancia del punto de venta</strong>.</li>
      </ul>
    </div>

    <div className="space-y-3">
      {emergencyOptions.map((opt) => (
        <a
          key={opt.title}
          href={opt.phone}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center text-white shadow-[var(--shadow-gold)]">
            {opt.icon}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{opt.title}</h3>
            <p className="text-sm text-muted-foreground">{opt.desc}</p>
          </div>
        </a>
      ))}
    </div>

    <div className="mt-8 p-4 rounded-xl bg-card border border-border">
      <h3 className="font-semibold text-card-foreground mb-2">¿Qué hacer en caso de emergencia?</h3>
      <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Estaciona tu unidad en un lugar seguro</li>
        <li>Enciende las luces intermitentes</li>
        <li>Coloca los triángulos de seguridad</li>
        <li>Llama a nuestra línea de asistencia</li>
      </ol>
    </div>
  </div>
);

export default Asistencia;
