import { Droplets, Gauge, Disc3, Thermometer, Wind, BatteryCharging, CircleDot, Lightbulb, ChevronRight, AlertTriangle } from "lucide-react";

const tips = [
  { title: "Revisión de aceite", content: "Cambia el aceite cada 5,000 km o 3 meses para mantener tu motor en óptimas condiciones. Acude a tu taller autorizado más cercano para realizar el cambio con los insumos correctos.", icon: Droplets },
  { title: "Presión de llantas", content: "Verifica la presión cada 15 días. La presión correcta ahorra combustible y aumenta la vida útil. Además, verifica la alineación y rotación de tus llantas periódicamente en tu taller autorizado.", icon: Gauge },
  { title: "Sistema de frenos", content: "Acude a tu taller autorizado más cercano a revisar las pastillas y discos de freno cada 20,000 km. No ignores ruidos o vibraciones al frenar, es señal de que requieren atención inmediata.", icon: Disc3 },
  { title: "Líquido refrigerante", content: "Mantén el nivel adecuado para evitar sobrecalentamientos. Acude a tu taller autorizado más cercano para cambiar el líquido refrigerante cada 40,000 km.", icon: Thermometer },
  { title: "Filtro de aire", content: "Un filtro limpio mejora el rendimiento del motor. Acude a tu taller autorizado más cercano a cambiarlo cada 15,000 km o antes si circulas en zonas con mucho polvo.", icon: Wind },
  { title: "Batería", content: "Revisa terminales y nivel de carga. La vida útil promedio es de 2 a 3 años. Acude a tu taller autorizado para una revisión completa del sistema eléctrico.", icon: BatteryCharging },
  { title: "Alineación y balanceo", content: "Acude a tu taller autorizado más cercano a realizar la alineación y balanceo cada 10,000 km para un manejo seguro y desgaste uniforme de llantas.", icon: CircleDot },
  { title: "Luces y señalización", content: "Verifica todas las luces semanalmente. Tu seguridad y la de otros depende de ello. Si alguna falla, acude a tu taller autorizado a reemplazarla.", icon: Lightbulb },
];

const Consejos = () => (
  <div className="min-h-screen pb-20 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2">Consejos</h1>
    <p className="text-muted-foreground mb-4">Mantén tu King Long en las mejores condiciones</p>

    {/* Important notice */}
    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-foreground mb-1">⚠️ Importante</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Las recomendaciones de mantenimiento pueden variar de acuerdo al uso, condiciones de manejo, carga, clima y cuidado que le des a tu unidad. 
          Es necesario acudir regularmente a tu <strong className="text-foreground">taller autorizado más cercano</strong> para una revisión profesional y personalizada.
        </p>
      </div>
    </div>

    <div className="space-y-3">
      {tips.map((tip, i) => (
        <details key={i} className="group rounded-xl bg-card border border-border overflow-hidden">
          <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-white flex-shrink-0">
              <tip.icon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-card-foreground flex-1">{tip.title}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
          </summary>
          <div className="px-4 pb-4 pl-[4.25rem]">
            <p className="text-sm text-muted-foreground">{tip.content}</p>
          </div>
        </details>
      ))}
    </div>
  </div>
);

export default Consejos;
