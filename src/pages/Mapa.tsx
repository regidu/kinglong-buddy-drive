import { useState } from "react";
import { MapPin, Wrench, Fuel, UtensilsCrossed, Car, Store } from "lucide-react";

const categories = [
  { id: "all", label: "Todos", icon: MapPin },
  { id: "dealer", label: "Agencias", icon: Store },
  { id: "taller", label: "Talleres", icon: Wrench },
  { id: "gas", label: "Gasolineras", icon: Fuel },
  { id: "vulca", label: "Vulcanizadoras", icon: Car },
  { id: "food", label: "Restaurantes", icon: UtensilsCrossed },
];

const mockLocations = [
  { name: "King Long CDMX Centro", type: "dealer", address: "Av. Insurgentes Sur 1234, CDMX", distance: "2.3 km" },
  { name: "Taller Certificado Monterrey", type: "taller", address: "Blvd. Constitución 456, MTY", distance: "5.1 km" },
  { name: "Gasolinera BP Reforma", type: "gas", address: "Paseo de la Reforma 789, CDMX", distance: "0.8 km" },
  { name: "Vulcanizadora Express", type: "vulca", address: "Calle 5 de Febrero 321, GDL", distance: "1.5 km" },
  { name: "Restaurant La Parrilla", type: "food", address: "Carr. México-Puebla Km 45", distance: "3.2 km" },
  { name: "King Long Guadalajara", type: "dealer", address: "Av. López Mateos 890, GDL", distance: "4.7 km" },
  { name: "Taller Hermanos López", type: "taller", address: "Calle Morelos 567, PUE", distance: "6.3 km" },
  { name: "Gasolinera Shell Perisur", type: "gas", address: "Periférico Sur 2345, CDMX", distance: "1.1 km" },
];

const typeIcons: Record<string, typeof MapPin> = {
  dealer: Store,
  taller: Wrench,
  gas: Fuel,
  vulca: Car,
  food: UtensilsCrossed,
};

const Mapa = () => {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? mockLocations : mockLocations.filter((l) => l.type === active);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <h1 className="text-2xl font-bold text-gradient-gold mb-2">Mapa de Servicios</h1>
      <p className="text-muted-foreground mb-4">Encuentra lo que necesitas cerca de ti</p>

      {/* Map placeholder */}
      <div className="h-44 rounded-xl bg-card border border-border flex items-center justify-center mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted opacity-50" />
        <div className="relative text-center">
          <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Mapa interactivo próximamente</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                active === cat.id
                  ? "bg-gradient-gold text-primary-foreground shadow-[var(--shadow-gold)]"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Locations */}
      <div className="space-y-2">
        {filtered.map((loc, i) => {
          const Icon = typeIcons[loc.type] || MapPin;
          return (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-card-foreground text-sm">{loc.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{loc.address}</p>
              </div>
              <span className="text-xs text-primary font-semibold whitespace-nowrap">{loc.distance}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mapa;
