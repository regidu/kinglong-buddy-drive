import { useState } from "react";
import { Fuel } from "lucide-react";

const Gasolina = () => {
  const [distancia, setDistancia] = useState("");
  const [rendimiento, setRendimiento] = useState("10");
  const [precio, setPrecio] = useState("24.50");

  const dist = parseFloat(distancia) || 0;
  const rend = parseFloat(rendimiento) || 1;
  const prec = parseFloat(precio) || 0;

  const litros = dist / rend;
  const costo = litros * prec;

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Calculadora de Gasolina</h1>
      <p className="text-muted-foreground mb-6">Estima tu gasto de combustible</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Distancia (km)</label>
          <input
            type="number"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            placeholder="Ej: 350"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Rendimiento (km/L)</label>
          <input
            type="number"
            value={rendimiento}
            onChange={(e) => setRendimiento(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Precio por litro (MXN)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {dist > 0 && (
          <div className="p-5 rounded-xl bg-card border border-primary/20 space-y-3 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <Fuel className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Resultado</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Litros necesarios</p>
                <p className="text-2xl font-bold text-foreground">{litros.toFixed(1)} L</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Costo estimado</p>
                <p className="text-2xl font-bold text-gradient-gold">{formatMoney(costo)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-3 rounded-lg bg-muted border border-border">
        <p className="text-xs text-muted-foreground">
          ⚠️ <strong>Aviso:</strong> Esta calculadora ofrece únicamente una estimación. El consumo real puede variar dependiendo del peso de la carga, condiciones climáticas, temperatura, estado de la carretera, estilo de conducción y otros factores. King Long no se hace responsable de diferencias entre la estimación y el consumo real.
        </p>
      </div>
    </div>
  );
};

export default Gasolina;
