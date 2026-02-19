import { MapPin } from "lucide-react";

const Mapa = () => {
  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-gradient-gold">Mapa de Servicios</h1>
      </div>
      <p className="text-muted-foreground mb-4">Encuentra agencias, talleres y más cerca de ti</p>

      <div className="w-full rounded-xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1JP_95sv_6ikE5aB2SwmxwjSKdf-zB8w&ehbc=2E312F"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Mapa de servicios King Long"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Mapa;
