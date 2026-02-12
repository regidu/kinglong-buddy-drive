import { Lightbulb, ChevronRight } from "lucide-react";

const tips = [
  { title: "Revisión de aceite", content: "Cambia el aceite cada 5,000 km o 3 meses para mantener tu motor en óptimas condiciones." },
  { title: "Presión de llantas", content: "Verifica la presión cada 15 días. La presión correcta ahorra combustible y aumenta la vida útil." },
  { title: "Sistema de frenos", content: "Revisa pastillas y discos cada 20,000 km. No ignores ruidos o vibraciones al frenar." },
  { title: "Líquido refrigerante", content: "Mantén el nivel adecuado y cambia cada 40,000 km para evitar sobrecalentamientos." },
  { title: "Filtro de aire", content: "Un filtro limpio mejora el rendimiento. Cámbialo cada 15,000 km o antes en zonas con polvo." },
  { title: "Batería", content: "Revisa terminales y nivel de carga. La vida útil promedio es de 2 a 3 años." },
  { title: "Alineación y balanceo", content: "Realízalo cada 10,000 km para un manejo seguro y desgaste uniforme de llantas." },
  { title: "Luces y señalización", content: "Verifica todas las luces semanalmente. Tu seguridad y la de otros depende de ello." },
];

const Consejos = () => (
  <div className="min-h-screen pb-20 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2">Consejos</h1>
    <p className="text-muted-foreground mb-6">Mantén tu King Long en las mejores condiciones</p>

    <div className="space-y-3">
      {tips.map((tip, i) => (
        <details
          key={i}
          className="group rounded-xl bg-card border border-border overflow-hidden"
        >
          <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-white flex-shrink-0">
              <Lightbulb className="w-5 h-5" />
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
