import { useState, useEffect } from "react";
import { MapPin, Wrench, Fuel, UtensilsCrossed, Car, Store } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const categories = [
  { id: "all", label: "Todos", icon: MapPin },
  { id: "dealer", label: "Agencias", icon: Store },
  { id: "taller", label: "Talleres", icon: Wrench },
  { id: "gas", label: "Gasolineras", icon: Fuel },
  { id: "vulca", label: "Vulcanizadoras", icon: Car },
  { id: "food", label: "Restaurantes", icon: UtensilsCrossed },
];

const mockLocations = [
  { name: "King Long CDMX Centro", type: "dealer", address: "Av. Insurgentes Sur 1234, CDMX", lat: 19.3910, lng: -99.1676 },
  { name: "Taller Certificado Monterrey", type: "taller", address: "Blvd. Constitución 456, MTY", lat: 25.6866, lng: -100.3161 },
  { name: "Gasolinera BP Reforma", type: "gas", address: "Paseo de la Reforma 789, CDMX", lat: 19.4284, lng: -99.1672 },
  { name: "Vulcanizadora Express", type: "vulca", address: "Calle 5 de Febrero 321, GDL", lat: 20.6597, lng: -103.3496 },
  { name: "Restaurant La Parrilla", type: "food", address: "Carr. México-Puebla Km 45", lat: 19.2880, lng: -98.9886 },
  { name: "King Long Guadalajara", type: "dealer", address: "Av. López Mateos 890, GDL", lat: 20.6736, lng: -103.3440 },
  { name: "Taller Hermanos López", type: "taller", address: "Calle Morelos 567, PUE", lat: 19.0414, lng: -98.2063 },
  { name: "Gasolinera Shell Perisur", type: "gas", address: "Periférico Sur 2345, CDMX", lat: 19.3050, lng: -99.1900 },
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

      {/* Interactive Map */}
      <div className="h-52 rounded-xl overflow-hidden mb-4 border border-border">
        <MapContainer
          center={[20.5, -99.5]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((loc, i) => (
            <Marker key={i} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.name}</strong><br />
                {loc.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
                  ? "bg-gradient-gold text-white shadow-[var(--shadow-gold)]"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mapa;
