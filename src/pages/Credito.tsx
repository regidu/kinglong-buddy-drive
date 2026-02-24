import { useState } from "react";
import { Calculator, Check } from "lucide-react";

const unidades = [
  { nombre: "Kingo Cargo A/A", precio: 459900 },
  { nombre: "Kingo Panel Ventanas", precio: 449900 },
  { nombre: "Kingo Panel Ventanas A/A", precio: 469900 },
  { nombre: "Kingo Semi Equipada", precio: 489900 },
  { nombre: "Kingo Equipada 16 Pasajeros", precio: 529900 },
  { nombre: "Kingo EV (Eléctrica)", precio: 699900 },
  { nombre: "Fourgo Cargo", precio: 459900 },
];

const Credito = () => {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [monto, setMonto] = useState(500000);
  const [enganche, setEnganche] = useState(20);
  const [plazo, setPlazo] = useState(36);
  const [tasa, setTasa] = useState(14.5);

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
                <div>
                  <p className={`text-sm font-semibold ${selectedUnit === i ? "text-primary" : "text-card-foreground"}`}>{u.nombre}</p>
                  <p className="text-xs text-muted-foreground">Precio de lista</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${selectedUnit === i ? "text-primary" : "text-foreground"}`}>{formatMoney(u.precio)}</span>
                  {selectedUnit === i && <Check className="w-4 h-4 text-primary" />}
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Precios sujetos a cambios. Consulta kinglong.mx</p>
        </div>

        {/* Manual price if no unit selected */}
        {selectedUnit === null && (
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Precio personalizado</label>
              <span className="text-primary font-bold">{formatMoney(monto)}</span>
            </div>
            <input
              type="range" min={450000} max={2000000} step={50000}
              value={monto} onChange={(e) => setMonto(Number(e.target.value))}
              className="w-full accent-primary"
            />
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
          <input
            type="range" min={20} max={80} step={5}
            value={enganche} onChange={(e) => setEnganche(Number(e.target.value))}
            className="w-full accent-primary"
          />
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
          <input
            type="range" min={8} max={25} step={0.5}
            value={tasa} onChange={(e) => setTasa(Number(e.target.value))}
            className="w-full accent-primary"
          />
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
          * Simulación con fines informativos. Sujeto a aprobación crediticia.
        </p>
      </div>
    </div>
  );
};

export default Credito;
