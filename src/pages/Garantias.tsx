import { Shield, Phone } from "lucide-react";

const coverageGroups = [
  {
    period: "3 meses u 8,000 km",
    items: [
      "Marcha de ignición", "Amortiguadores", "Balatas de frenos", "Bandas", "Baterías",
      "Baleros", "Relevadores", "Fusibles", "Filtros", "Focos", "Compresor de AC",
      "Motor de limpiaparabrisas", "Pluma de limpiaparabrisas", "Bomba de chisgueteros",
      "Alineación", "Balanceo de ruedas", "Ruidos de suspensión", "Habitáculo", "Bomba de combustible",
    ],
  },
  {
    period: "12 meses o 30,000 km",
    items: [
      "Alternador", "Sellos de aceite", "Componentes de suspensión", "Micas", "Faros",
      "Collarín y componentes", "Inyectores", "Radiador", "Soporte de radiador", "Barras",
      "Termostato", "Mecanismo de asientos (no incluye daños provocados como: cortes, manchas o rupturas)",
      "Válvulas eléctricas (componentes eléctricos)", "Potenciómetros", "Sensor de reversa",
      "Elevador de cristales", "Puertos USB", "Moto ventiladores", "Resistencias de AC",
      "Interruptores (luces, direccionales, intermitentes, etc.)", "Corrosión por pintura",
      "Crucetas (por defecto de fabricación y no de desgaste natural)",
    ],
  },
  {
    period: "24 meses o 120,000 km",
    items: ["Válvulas de motor y diferencial"],
  },
  {
    period: "3 años o 120,000 km",
    items: [
      "Componentes de motor (con excepción de válvulas)",
      "Transmisión",
      "ECU (por defecto de fabricación y no de algún desgaste natural)",
    ],
  },
];

const Garantias = () => (
  <div className="min-h-screen pb-24 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
      <Shield className="w-6 h-6" /> Garantías
    </h1>
    <p className="text-muted-foreground mb-6">Cobertura oficial de tu unidad King Long</p>

    <a
      href="tel:8005550075,2"
      className="flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-gold text-white font-bold text-lg shadow-[var(--shadow-gold)] active:scale-[0.98] transition-transform mb-6"
    >
      <Phone className="w-5 h-5" />
      Reportar falla y hacer válida tu garantía
    </a>
    <p className="text-xs text-muted-foreground text-center mb-6">800 555 0075 ext. 2</p>

    <div className="space-y-4">
      {coverageGroups.map((g) => (
        <div key={g.period} className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="px-4 py-3 bg-primary/5 border-b border-border">
            <h3 className="font-bold text-primary text-sm">Cobertura: {g.period}</h3>
          </div>
          <ul className="px-4 py-3 space-y-1.5">
            {g.items.map((item) => (
              <li key={item} className="text-sm text-card-foreground flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Aviso importante:</strong> La aplicación de cada garantía está sujeta al dictamen técnico del taller autorizado King Long correspondiente. Cada caso es evaluado de forma individual conforme a las condiciones de uso, mantenimiento y desgaste de la unidad. King Long México se reserva el derecho de determinar la procedencia de cada reclamación de garantía.
      </p>
    </div>
  </div>
);

export default Garantias;
