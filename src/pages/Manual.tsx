import { BookOpen, Download } from "lucide-react";

const Manual = () => (
  <div className="min-h-screen pb-24 px-4 pt-6 space-y-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
      <BookOpen className="w-6 h-6" /> Manuales de Uso
    </h1>
    <p className="text-muted-foreground text-sm">
      Selecciona el manual correspondiente al modelo de tu unidad.
    </p>

    {/* KINGO - 2025+ */}
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h2 className="font-bold text-lg text-card-foreground">Manual KINGO</h2>
      <p className="text-sm text-muted-foreground">Modelos 2025 en adelante</p>
      <p className="text-xs text-muted-foreground">Programa de mantenimiento actualizado para la generación más reciente.</p>
      <a
        href="/manual-kingo-2025.pdf"
        download
        className="flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
      >
        <Download className="w-5 h-5" />
        Descargar PDF — KINGO 2025+
      </a>
    </div>

    {/* FOURGO - 2022-2024 */}
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <h2 className="font-bold text-lg text-card-foreground">Manual FOURGO</h2>
      <p className="text-sm text-muted-foreground">Modelos 2022, 2023 y 2024</p>
      <p className="text-xs text-muted-foreground">Manual de uso y programa de mantenimiento para unidades de generación anterior.</p>
      <a
        href="/manual-kingo-2022-2024.pdf"
        download
        className="flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
      >
        <Download className="w-5 h-5" />
        Descargar PDF — FOURGO 2022-2024
      </a>
    </div>
  </div>
);

export default Manual;
