import { useState } from "react";
import { Calculator, Check, Info, X, Phone } from "lucide-react";
import unitPanelVentanas from "@/assets/unit-panel-ventanas.png";
import unitPanelVentanasAA from "@/assets/unit-panel-ventanas-aa.png";
import unit16Pasajeros from "@/assets/unit-16-pasajeros.png";
import unitKingoEV from "@/assets/unit-kingo-ev.png";

const unidades = [
  {
    nombre: "Panel Ventanas A/A 5.5 m",
    precio: 729900,
    imagen: unitPanelVentanasAA,
    specs: ["Motor 3TZ 2.7L — 161 hp", "ABS + EBD", "5 vel. + reversa", "Rendimiento 10 km/l combinado", "Dirección asistencia eléctrica", "5.470 × 1.885 × 2.285 m"],
  },
  {
    nombre: "Panel Ventanas A/A 6 m",
    precio: 789900,
    imagen: unitPanelVentanas,
    specs: ["Motor 3TZ 2.7L — 161 hp", "ABS + EBD", "5 vel. + reversa", "Rendimiento 10 km/l combinado", "Carga: 1,615 kg", "5.998 × 1.885 × 2.290 m"],
  },
  {
    nombre: "Equipada 16 Pasajeros",
    precio: 769900,
    imagen: unit16Pasajeros,
    specs: ["Motor 2.4L — 137 hp, EURO 5", "ABS + EBD + ESC", "2 airbags, TPMS, ISOFIX", "Rendimiento 9.1 km/l combinado", "Rines de aluminio, parrilla cromada", "5.470 × 1.880 × 2.285 m"],
  },
  {
    nombre: "Equipada 16 Pasajeros 5.5 m",
    precio: 829900,
    imagen: unit16Pasajeros,
    specs: ["Motor 3TZ 2.7L — 161 hp", "ABS + EBD", "5 vel. + reversa", "Rendimiento 10 km/l combinado", "Dirección asistencia eléctrica", "5.470 × 1.885 × 2.285 m"],
  },
  {
    nombre: "Equipada 19 Pasajeros 6 m",
    precio: 889900,
    imagen: unit16Pasajeros,
    specs: ["Motor 3TZ 2.7L — 161 hp", "ABS + EBD", "5 vel. + reversa", "Rendimiento 10 km/l combinado", "Carga: 1,615 kg", "5.998 × 1.885 × 2.290 m"],
  },
  {
    nombre: "Kingo EV",
    precio: 1449000,
    imagen: unitKingoEV,
    specs: ["Motor síncrono 60/120 kW", "Batería CATL 70.479 kWh", "Autonomía ≥ 280 km", "Carga rápida < 2 hrs", "16 pasajeros", "TPMS, ISOFIX, OBD, Airbags"],
  },
];

const Credito = () => {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [monto, setMonto] = useState(600000);
  const [enganche, setEnganche] = useState(20);
  const [plazo, setPlazo] = useState(36);
  const [tasa, setTasa] = useState(14.5);
  const [infoUnit, setInfoUnit] = useState<number | null>(null);

  const precio = selectedUnit !== null ? unidades[selectedUnit].precio : monto;
  const montoFinanciado = precio * (1 - enganche / 100);
  const tasaMensual = tasa / 100 / 12;
  const pagoMensual =
    (montoFinanciado * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
    (Math.pow(1 + tasaMensual, plazo) - 1);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gradient-gold">Simulador de Crédito</h1>
      </div>
      <p className="text-muted-foreground mb-6">Selecciona tu unidad y calcula tu financiamiento</p>

      <div className="space-y-6">
        {/* Unit Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Elige tu unidad</label>
          <div className="grid grid-cols-1 gap-2">
            {unidades.map((u, i) => (
              <button
                key={i}
                onClick={() => setSelectedUnit(i)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  selectedUnit === i
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={u.imagen} alt={u.nombre} className="w-16 h-10 object-contain rounded flex-shrink-0" />
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${selectedUnit === i ? "text-primary" : "text-card-foreground"}`}>{u.nombre}</p>
                    <p className="text-xs text-muted-foreground">IVA incluido</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`font-bold text-sm ${selectedUnit === i ? "text-primary" : "text-foreground"}`}>{formatMoney(u.precio)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setInfoUnit(i); }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {selectedUnit === i && <Check className="w-4 h-4 text-primary" />}
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            ⚠️ Precios sujetos a cambios sin previo aviso. Consulta con tu asesor de ventas para confirmar el precio vigente.
          </p>
          <div className="mt-2 text-center">
            <a href="https://wa.me/528712196410?text=Hola, quiero confirmar el precio de una unidad King Long" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
              <Phone className="w-3 h-3" /> Llamar a un asesor de ventas
            </a>
          </div>
        </div>

        {/* Manual price if no unit selected */}
        {selectedUnit === null && (
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Precio personalizado</label>
              <span className="text-primary font-bold">{formatMoney(monto)}</span>
            </div>
            <input type="range" min={450000} max={2000000} step={50000} value={monto} onChange={(e) => setMonto(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$450K</span><span>$2M</span>
            </div>
          </div>
        )}

        {/* Enganche */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Enganche</label>
            <span className="text-primary font-bold">{enganche}% ({formatMoney(precio * enganche / 100)})</span>
          </div>
          <input type="range" min={20} max={80} step={5} value={enganche} onChange={(e) => setEnganche(Number(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>20%</span><span>80%</span>
          </div>
        </div>

        {/* Plazo */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Plazo</label>
            <span className="text-primary font-bold">{plazo} meses</span>
          </div>
          <div className="flex gap-2">
            {[12, 24, 36, 48, 60].map((p) => (
              <button
                key={p} onClick={() => setPlazo(p)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  plazo === p
                    ? "bg-gradient-gold text-primary-foreground shadow-[var(--shadow-gold)]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* Tasa */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Tasa de interés anual</label>
            <span className="text-primary font-bold">{tasa}%</span>
          </div>
          <input type="range" min={8} max={25} step={0.5} value={tasa} onChange={(e) => setTasa(Number(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8%</span><span>25%</span>
          </div>
        </div>

        {/* Result */}
        <div className="p-5 rounded-xl bg-card border border-primary/20 text-center space-y-1">
          {selectedUnit !== null && (
            <p className="text-xs font-semibold text-primary mb-1">{unidades[selectedUnit].nombre}</p>
          )}
          <p className="text-sm text-muted-foreground">Tu pago mensual estimado</p>
          <p className="text-4xl font-extrabold text-gradient-gold">{formatMoney(pagoMensual)}</p>
          <p className="text-xs text-muted-foreground">Tasa anual: {tasa}% · Financiar: {formatMoney(montoFinanciado)}</p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Simulación con fines informativos. Sujeto a aprobación crediticia. Los precios pueden variar sin previo aviso; contacta a un asesor de ventas para confirmar.
        </p>
      </div>

      {/* Info Modal */}
      {infoUnit !== null && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setInfoUnit(null)}>
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-5 space-y-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setInfoUnit(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <img src={unidades[infoUnit].imagen} alt={unidades[infoUnit].nombre} className="w-full h-32 object-contain" />
            <h3 className="text-lg font-bold text-foreground text-center">{unidades[infoUnit].nombre}</h3>
            <p className="text-2xl font-extrabold text-gradient-gold text-center">{formatMoney(unidades[infoUnit].precio)}</p>
            <p className="text-xs text-muted-foreground text-center">IVA incluido</p>
            <ul className="space-y-1.5">
              {unidades[infoUnit].specs.map((s, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground text-center">⚠️ Precios sujetos a cambios. Consulta con tu asesor.</p>
            <a
              href={`https://wa.me/528712196410?text=Hola, me interesa la unidad ${unidades[infoUnit].nombre} (${formatMoney(unidades[infoUnit].precio)})`}
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

export default Credito;
