import { Shield, Phone } from "lucide-react";

const warranties = [
  { title: "Motor y tren motriz", coverage: "5 años o 100,000 km", desc: "Cubre motor, transmisión y componentes principales del tren motriz." },
  { title: "Carrocería y pintura", coverage: "3 años", desc: "Protección contra defectos de fabricación en carrocería y pintura." },
  { title: "Sistema eléctrico", coverage: "2 años o 50,000 km", desc: "Cubre arneses, alternador, módulos electrónicos y componentes eléctricos." },
  { title: "Suspensión y dirección", coverage: "2 años o 50,000 km", desc: "Amortiguadores, rótulas, brazos de dirección y componentes relacionados." },
  { title: "Aire acondicionado", coverage: "1 año o 20,000 km", desc: "Compresor, condensador y sistema de climatización." },
  { title: "Accesorios y acabados interiores", coverage: "1 año", desc: "Asientos, tapicería, panel de instrumentos y accesorios internos." },
];

const Garantias = () => (
  <div className="min-h-screen pb-24 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
      <Shield className="w-6 h-6" /> Garantías
    </h1>
    <p className="text-muted-foreground mb-6">Conoce la cobertura de tu unidad King Long</p>

    <a
      href="tel:8005550075,2"
      className="flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-gold text-white font-bold text-lg shadow-[var(--shadow-gold)] active:scale-[0.98] transition-transform mb-6"
    >
      <Phone className="w-5 h-5" />
      Reportar falla y hacer válida tu garantía
    </a>
    <p className="text-xs text-muted-foreground text-center mb-6">800 555 0075 ext. 2</p>

    <div className="space-y-3">
      {warranties.map((w) => (
        <div key={w.title} className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-card-foreground">{w.title}</h3>
            <span className="text-xs font-bold text-primary">{w.coverage}</span>
          </div>
          <p className="text-sm text-muted-foreground">{w.desc}</p>
        </div>
      ))}
    </div>

    <p className="text-xs text-muted-foreground text-center mt-6 italic">
      * Esta información es preliminar y será actualizada con los datos oficiales de garantía.
    </p>
  </div>
);

export default Garantias;
