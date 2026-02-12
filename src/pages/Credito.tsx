import { useState } from "react";

const Credito = () => {
  const [monto, setMonto] = useState(500000);
  const [enganche, setEnganche] = useState(20);
  const [plazo, setPlazo] = useState(36);
  const tasa = 14.5;

  const montoFinanciado = monto * (1 - enganche / 100);
  const tasaMensual = tasa / 100 / 12;
  const pagoMensual =
    (montoFinanciado * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
    (Math.pow(1 + tasaMensual, plazo) - 1);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Simulador de Crédito</h1>
      <p className="text-muted-foreground mb-6">Calcula el financiamiento de tu nueva unidad</p>

      <div className="space-y-6">
        {/* Monto */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Precio de la unidad</label>
            <span className="text-primary font-bold">{formatMoney(monto)}</span>
          </div>
          <input
            type="range"
            min={300000}
            max={2000000}
            step={50000}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$300K</span><span>$2M</span>
          </div>
        </div>

        {/* Enganche */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Enganche</label>
            <span className="text-primary font-bold">{enganche}% ({formatMoney(monto * enganche / 100)})</span>
          </div>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={enganche}
            onChange={(e) => setEnganche(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10%</span><span>50%</span>
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
                key={p}
                onClick={() => setPlazo(p)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  plazo === p
                    ? "bg-gradient-gold text-primary-foreground shadow-[var(--shadow-gold)]"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="p-5 rounded-xl bg-card border border-primary/20 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Tu pago mensual estimado</p>
          <p className="text-4xl font-extrabold text-gradient-gold">{formatMoney(pagoMensual)}</p>
          <p className="text-xs text-muted-foreground">Tasa anual: {tasa}% · Monto a financiar: {formatMoney(montoFinanciado)}</p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Simulación con fines informativos. Sujeto a aprobación crediticia.
        </p>
      </div>
    </div>
  );
};

export default Credito;
