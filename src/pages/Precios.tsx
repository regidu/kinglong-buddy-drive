import { useState } from "react";
import { DollarSign, Check, X, Phone, Info } from "lucide-react";
import unitPanelVentanas from "@/assets/unit-panel-ventanas.png";
import unitPanelVentanasAA from "@/assets/unit-panel-ventanas-aa.png";
import unit16Pasajeros from "@/assets/unit-16-pasajeros.png";
import unitKingoEV from "@/assets/unit-kingo-ev.png";

const unidades = [
  {
    nombre: "Panel Ventanas A/A 5.5 m",
    precio: 729900,
    imagen: unitPanelVentanasAA,
    specs: [
      "Motor 3TZ 2.7L — 161 hp / 192 lb-ft",
      "4 cilindros, 16 válvulas, 2,693 cc",
      "Transmisión manual 5 vel. + reversa",
      "Tracción trasera",
      "Suspensión: doble horquilla / muelles",
      "Dirección con asistencia eléctrica",
      "Frenos: discos ventilados, ABS + EBD",
      "Dimensiones: 5.470 × 1.885 × 2.285 m",
      "Distancia entre ejes: 3.110 m",
      "Tanque: 70 L",
      "Rendimiento: 8.3 / 12.5 / 10 km/l",
    ],
  },
  {
    nombre: "Panel Ventanas A/A 6 m",
    precio: 789900,
    imagen: unitPanelVentanas,
    specs: [
      "Motor 3TZ 2.7L — 161 hp / 192 lb-ft",
      "4 cilindros, 16 válvulas, 2,693 cc",
      "Transmisión manual 5 vel. + reversa",
      "Tracción trasera",
      "Suspensión: doble horquilla / muelles",
      "Dirección con asistencia eléctrica",
      "Frenos: discos ventilados, ABS + EBD",
      "Dimensiones: 5.998 × 1.885 × 2.290 m",
      "Distancia entre ejes: 3.720 m",
      "Peso bruto vehicular: 3,850 kg",
      "Capacidad de carga: 1,615 kg",
      "Rendimiento: 8.3 / 12.5 / 10 km/l",
    ],
  },
  {
    nombre: "Equipada 16 Pasajeros",
    precio: 769900,
    imagen: unit16Pasajeros,
    specs: [
      "Motor XCE-4RB2 2.4L — 137 hp / 160 lb-ft",
      "4 cilindros, 16 válvulas, 2,438 cc, EURO 5",
      "Transmisión manual 5 vel. + reversa, tracción trasera",
      "Suspensión: doble horquilla / muelles, dirección hidráulica",
      "Frenos: discos ventilados, ABS + EBD + asistencia de frenado",
      "Dimensiones: 5.470 × 1.880 × 2.285 m",
      "Distancia entre ejes: 3.110 m",
      "Peso bruto vehicular: 3,380 kg — Carga: 1,360 kg",
      "Tanque: 70 L — Rendimiento: 7.0 / 11.0 / 9.1 km/l",
      "2 airbags, ESC, TPMS, ISOFIX, extintor",
      "Rines de aluminio, parrilla y manijas cromadas",
      "Espejos eléctricos abatibles con direccional",
      "Faros de lupa, DRL, faros de niebla halógeno",
      "Sensores de reversa auditivo",
    ],
  },
  {
    nombre: "Equipada 16 Pasajeros 5.5 m",
    precio: 829900,
    imagen: unit16Pasajeros,
    specs: [
      "Motor 3TZ 2.7L — 161 hp / 192 lb-ft",
      "4 cilindros, 16 válvulas, 2,693 cc",
      "Transmisión manual 5 vel. + reversa",
      "Tracción trasera",
      "Suspensión: doble horquilla / muelles",
      "Dirección con asistencia eléctrica",
      "Frenos: discos ventilados, ABS + EBD",
      "Dimensiones: 5.470 × 1.885 × 2.285 m",
      "Distancia entre ejes: 3.110 m",
      "Tanque: 70 L",
      "Rendimiento: 8.3 / 12.5 / 10 km/l",
    ],
  },
  {
    nombre: "Equipada 19 Pasajeros 6 m",
    precio: 889900,
    imagen: unit16Pasajeros,
    specs: [
      "Motor 3TZ 2.7L — 161 hp / 192 lb-ft",
      "4 cilindros, 16 válvulas, 2,693 cc",
      "Transmisión manual 5 vel. + reversa",
      "Tracción trasera",
      "Suspensión: doble horquilla / muelles",
      "Dirección con asistencia eléctrica",
      "Frenos: discos ventilados, ABS + EBD",
      "Dimensiones: 5.998 × 1.885 × 2.290 m",
      "Distancia entre ejes: 3.720 m",
      "Peso bruto vehicular: 3,850 kg",
      "Capacidad de carga: 1,615 kg",
      "Rendimiento: 8.3 / 12.5 / 10 km/l",
    ],
  },
  {
    nombre: "Kingo EV",
    precio: 1449000,
    imagen: unitKingoEV,
    specs: [
      "Motor síncrono de imanes permanentes",
      "Potencia: 60 / 120 kW — Torque: 160 / 360 Nm",
      "Batería CATL 70.479 kWh",
      "Autonomía: ≥ 280 km (NEDC)",
      "Carga rápida: menos de 2 horas",
      "Consumo: < 20 kWh / 100 km",
      "Suspensión: doble horquilla / resortes",
      "Frenos: disco / tambor, ABS + EBD",
      "Dimensiones: 5.470 × 1.885 × 2.285 m",
      "Capacidad: 16 pasajeros",
      "TPMS, ISOFIX, OBD, Airbags",
    ],
  },
];

const formatMoney = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

const Precios = () => {
  const [detailUnit, setDetailUnit] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gradient-gold">Precios de Unidades</h1>
      </div>
      <p className="text-muted-foreground mb-6">Conoce nuestras unidades King Long</p>

      <div className="space-y-3">
        {unidades.map((u, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <img src={u.imagen} alt={u.nombre} className="w-full h-36 object-contain bg-white p-2" />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-foreground text-lg">{u.nombre}</h3>
              <p className="text-2xl font-extrabold text-gradient-gold">{formatMoney(u.precio)}</p>
              <p className="text-xs text-muted-foreground">IVA incluido</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setDetailUnit(i)}
                  className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-primary/5 flex items-center justify-center gap-1"
                >
                  <Info className="w-4 h-4" /> Ver detalles
                </button>
                <a
                  href={`https://wa.me/528712196410?text=Hola, me interesa la unidad ${u.nombre} (${formatMoney(u.precio)})`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-gold text-white text-sm font-semibold flex items-center justify-center gap-1"
                >
                  <Phone className="w-4 h-4" /> Cotizar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        ⚠️ Precios sujetos a cambios sin previo aviso. No nos hacemos responsables por diferencias en los precios publicados. Consulta con tu asesor de ventas para confirmar el precio vigente.
      </p>
      <div className="mt-2 text-center">
        <a href="https://wa.me/528712196410?text=Hola, quiero confirmar precios de unidades King Long" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
          <Phone className="w-3 h-3" /> Llamar a un asesor de ventas
        </a>
      </div>

      {/* Detail Modal */}
      {detailUnit !== null && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setDetailUnit(null)}>
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-5 space-y-4 max-h-[85vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDetailUnit(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <img src={unidades[detailUnit].imagen} alt={unidades[detailUnit].nombre} className="w-full h-32 object-contain" />
            <h3 className="text-lg font-bold text-foreground text-center">{unidades[detailUnit].nombre}</h3>
            <p className="text-2xl font-extrabold text-gradient-gold text-center">{formatMoney(unidades[detailUnit].precio)}</p>
            <p className="text-xs text-muted-foreground text-center">IVA incluido</p>
            <ul className="space-y-1.5">
              {unidades[detailUnit].specs.map((s, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground text-center">⚠️ Precios sujetos a cambios. Consulta con tu asesor.</p>
            <a
              href={`https://wa.me/528712196410?text=Hola, me interesa la unidad ${unidades[detailUnit].nombre}`}
              target="_blank" rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-gradient-gold text-white font-semibold text-sm"
            >
              <Phone className="w-4 h-4 inline mr-1" /> Contactar asesor de ventas
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Precios;
