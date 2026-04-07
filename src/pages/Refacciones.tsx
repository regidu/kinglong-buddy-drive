import { ExternalLink, Phone } from "lucide-react";

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Refacciones = () => {
  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Catálogo de Refacciones</h1>
      <p className="text-muted-foreground mb-6">Partes originales King Long</p>

      <button
        onClick={() => openExternal("https://www.mercadolibre.com.mx/pagina/cmbmx")}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FFE600] text-[#333] font-bold text-base hover:bg-[#FFD700] transition-colors active:scale-[0.98]"
      >
        <ExternalLink className="w-5 h-5" />
        Ver tienda completa en Mercado Libre
      </button>

      <div className="mt-4 p-4 rounded-xl bg-card border border-border text-center space-y-2">
        <p className="text-sm text-muted-foreground">¿No encuentras lo que buscas?</p>
        <button
          onClick={() => openExternal("https://wa.me/528712200830?text=Hola,%20necesito%20información%20sobre%20refacciones%20King%20Long")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gold text-white font-semibold text-sm"
        >
          <Phone className="w-4 h-4" /> Contactar refacciones
        </button>
      </div>
    </div>
  );
};

export default Refacciones;
