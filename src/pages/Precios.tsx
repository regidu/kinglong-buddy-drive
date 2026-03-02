import { useState } from "react";
import { DollarSign, Check, X, Phone, Info } from "lucide-react";
import unitPanelCerrada from "@/assets/unit-panel-cerrada.png";
import unitPanelVentanas from "@/assets/unit-panel-ventanas.png";
import unitPanelVentanasAA from "@/assets/unit-panel-ventanas-aa.png";
import unit16Pasajeros from "@/assets/unit-16-pasajeros.png";
import unitKingoEV from "@/assets/unit-kingo-ev.png";

const unidades = [
  {
    nombre: "Panel Cerrada",
    precio: 635900,
    imagen: unitPanelCerrada,
    specs: ["Motor 2.4 L", "ABS + EBD", "5 velocidades + reversa", "9.1 Km/L combinado", "Faros de niebla halógeno", "Sensor reversa auditivo", "Luces diurnas", "Carga 9.8 m³", "Cap. 1,175 Kg"],
  },
  {
    nombre: "Panel Ventanas",
    precio: 599900,
    imagen: unitPanelVentanas,
    specs: ["Motor 2.4 L", "ABS + EBD", "5 velocidades + reversa", "9.1 Km/L combinado", "Faros de niebla halógeno", "Sensor reversa auditivo", "Luces diurnas", "Carga 9.8 m³", "Cap. 1,175 Kg"],
  },
  {
    nombre: "Panel Ventanas A/A",
    precio: 624900,
    imagen: unitPanelVentanasAA,
    specs: ["Motor 2.4 L", "ABS + EBD", "5 velocidades + reversa", "9.1 Km/L combinado", "Faros de niebla halógeno", "Sensor reversa auditivo", "Luces diurnas", "Carga 9.8 m³", "Cap. 1,175 Kg", "A/C doble zona"],
  },
  {
    nombre: "16 Pasajeros",
    precio: 769900,
    imagen: unit16Pasajeros,
    specs: ["Motor 2.4 L", "ABS + EBD", "5 velocidades + reversa", "9.1 Km/L combinado", "Faros de niebla halógeno", "Sensor reversa auditivo", "Luces diurnas", "16 asientos", "A/C doble zona"],
  },
  {
    nombre: "Kingo EV",
    precio: 1449000,
    imagen: unitKingoEV,
    specs: ["Motor 258.15 HP", "ABS + EBD", "CATL 70.479 kWh", "≤2h carga rápida", "Faros de niebla halógeno", "Sensor reversa auditivo", "Luces diurnas", "16 asientos", "A/C doble zona"],
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
