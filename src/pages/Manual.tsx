import { BookOpen, Download } from "lucide-react";

const Manual = () => (
  <div className="min-h-screen pb-24 px-4 pt-6 space-y-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
      <BookOpen className="w-6 h-6" /> Manuales de Uso
    </h1>
    <p className="text-muted-foreground text-sm">
      Selecciona el manual correspondiente al año de tu unidad.
    </p>

    {/* 2025+ */}
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h2 className="font-semibold text-card-foreground">Modelos 2025 en adelante</h2>
      <p className="text-xs text-muted-foreground">Programa de mantenimiento actualizado para la generación más reciente del Kingo.</p>
      <a
        href="/manual-kingo-2025.pdf"
        download
        className="flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
      >
        <Download className="w-5 h-5" />
        Descargar PDF — 2025+
      </a>
    </div>

    {/* 2022-2024 */}
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h2 className="font-semibold text-card-foreground">Modelos 2022, 2023 y 2024</h2>
      <p className="text-xs text-muted-foreground">Manual de uso y mantenimiento para unidades de generación anterior.</p>
      <a
        href="/manual-kingo-2022-2024.pdf"
        download
        className="flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
      >
        <Download className="w-5 h-5" />
        Descargar PDF — 2022 a 2024
      </a>
    </div>
  </div>
);

export default Manual;
