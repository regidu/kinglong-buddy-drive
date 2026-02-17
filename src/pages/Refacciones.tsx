import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

const partsCategories = [
  { name: "Motor", count: 45 },
  { name: "Frenos", count: 28 },
  { name: "Suspensión", count: 32 },
  { name: "Eléctrico", count: 19 },
  { name: "Carrocería", count: 56 },
  { name: "Transmisión", count: 22 },
];

const featuredParts = [
  { name: "Pastillas de Freno", sku: "KL-BRK-001", price: "$1,250" },
  { name: "Filtro de Aceite", sku: "KL-FLT-003", price: "$380" },
  { name: "Amortiguador Delantero", sku: "KL-SUS-012", price: "$2,800" },
  { name: "Bujía de Encendido", sku: "KL-ENG-007", price: "$180" },
];

const Refacciones = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Refacciones</h1>
      <p className="text-muted-foreground mb-4">Partes originales King Long</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar refacción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categorías</h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {partsCategories.map((cat) => (
          <button
            key={cat.name}
            className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 text-center transition-all"
          >
            <span className="block text-sm font-semibold text-card-foreground">{cat.name}</span>
            <span className="text-xs text-muted-foreground">{cat.count} partes</span>
          </button>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Más Solicitadas</h2>
      <div className="space-y-2">
        {featuredParts.map((part) => (
          <div key={part.sku} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div>
              <h3 className="font-semibold text-card-foreground">{part.name}</h3>
              <p className="text-xs text-muted-foreground">{part.sku}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold">{part.price}</span>
              <button className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center text-white">
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-card border border-border text-center space-y-2">
        <p className="text-sm text-muted-foreground">¿Necesitas ayuda con refacciones?</p>
        <a
          href="https://wa.me/528712200830?text=Hola, necesito información sobre refacciones King Long"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gold text-white font-semibold text-sm"
        >
          <ShoppingCart className="w-4 h-4" /> Contactar refacciones
        </a>
      </div>
    </div>
  );
};

export default Refacciones;
