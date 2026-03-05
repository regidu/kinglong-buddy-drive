import { Search, ExternalLink, Phone } from "lucide-react";
import { useState } from "react";

const refacciones = [
  { name: "Pastillas de Freno Delanteras", marca: "King Long Original", oem: "KL-BRK-001", imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Filtro de Aceite", marca: "King Long Original", oem: "KL-FLT-003", imagen: "https://images.unsplash.com/photo-1635784063416-2a2f13081d35?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Amortiguador Delantero", marca: "King Long Original", oem: "KL-SUS-012", imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Bujía de Encendido", marca: "King Long Original", oem: "KL-ENG-007", imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Filtro de Aire Motor", marca: "King Long Original", oem: "KL-AIR-015", imagen: "https://images.unsplash.com/photo-1635784063416-2a2f13081d35?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Disco de Freno Delantero", marca: "King Long Original", oem: "KL-BRK-022", imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Banda de Distribución", marca: "King Long Original", oem: "KL-ENG-031", imagen: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
  { name: "Bomba de Agua", marca: "King Long Original", oem: "KL-COO-009", imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop", url: "https://www.mercadolibre.com.mx" },
];

const Refacciones = () => {
  const [search, setSearch] = useState("");
  const filtered = refacciones.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.oem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Catálogo de Refacciones</h1>
      <p className="text-muted-foreground mb-4">Partes originales King Long</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por nombre o número de parte..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((part) => (
          <div key={part.oem} className="rounded-xl border border-border bg-card overflow-hidden">
            <img src={part.imagen} alt={part.name} className="w-full h-36 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-foreground">{part.name}</h3>
              <p className="text-sm text-muted-foreground">Marca: <span className="text-foreground font-medium">{part.marca}</span></p>
              <p className="text-sm text-muted-foreground">No. Parte (OEM): <span className="font-mono text-foreground font-medium">{part.oem}</span></p>
              <a
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#FFE600] text-[#333] font-bold text-sm hover:bg-[#FFD700] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver en Mercado Libre
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No se encontraron refacciones</p>
        </div>
      )}

      <div className="mt-6">
        <a
          href="https://www.mercadolibre.com.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FFE600] text-[#333] font-bold text-base hover:bg-[#FFD700] transition-colors active:scale-[0.98]"
        >
          <ExternalLink className="w-5 h-5" />
          Ver tienda completa en Mercado Libre
        </a>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-card border border-border text-center space-y-2">
        <p className="text-sm text-muted-foreground">¿No encuentras lo que buscas?</p>
        <a
          href="https://wa.me/528712200830?text=Hola, necesito información sobre refacciones King Long"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gold text-white font-semibold text-sm"
        >
          <Phone className="w-4 h-4" /> Contactar refacciones
        </a>
      </div>
    </div>
  );
};

export default Refacciones;
