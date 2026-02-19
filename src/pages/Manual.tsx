import { BookOpen, Download } from "lucide-react";

const Manual = () => (
  <div className="min-h-screen pb-24 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2 flex items-center gap-2">
      <BookOpen className="w-6 h-6" /> Manual de Uso
    </h1>
    <p className="text-muted-foreground mb-4">Programa de mantenimiento — Modelos 2025 en adelante</p>

    <a
      href="/manual-kingo-2025.pdf"
      download
      className="flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-primary text-primary font-semibold active:scale-[0.98] transition-transform"
    >
      <Download className="w-5 h-5" />
      Descargar PDF
    </a>
  </div>
);

export default Manual;
