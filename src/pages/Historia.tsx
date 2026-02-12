import { Building2, Globe, Award, Calendar } from "lucide-react";

const timeline = [
  { year: "1988", title: "Fundación", desc: "King Long United Automotive Industry Co., Ltd. se funda en Xiamen, provincia de Fujian, China." },
  { year: "1994", title: "Primer autobús", desc: "Se produce el primer autobús King Long, marcando el inicio de su camino en la industria automotriz." },
  { year: "2000", title: "Expansión internacional", desc: "King Long comienza a exportar sus vehículos a mercados internacionales, incluyendo el sudeste asiático y Medio Oriente." },
  { year: "2006", title: "Reconocimiento mundial", desc: "La marca alcanza presencia en más de 100 países y regiones, consolidándose como uno de los mayores fabricantes de autobuses de China." },
  { year: "2010", title: "Innovación verde", desc: "King Long lanza su línea de autobuses y vehículos eléctricos e híbridos, apostando por la movilidad sustentable." },
  { year: "2015", title: "Llegada a México", desc: "King Long ingresa al mercado mexicano con su línea de minivans y autobuses, estableciendo alianzas comerciales estratégicas." },
  { year: "2020", title: "División Minivan México", desc: "Se consolida la División Minivan México, ofreciendo vehículos de pasajeros de alta calidad para el transporte público y privado." },
  { year: "2024", title: "Liderazgo en el segmento", desc: "King Long se posiciona como líder en el segmento de minivans en México, con una red creciente de distribuidores y servicio postventa." },
];

const Historia = () => (
  <div className="min-h-screen pb-20 px-4 pt-6">
    <h1 className="text-2xl font-bold text-gradient-gold mb-2">Historia de King Long</h1>
    <p className="text-muted-foreground mb-6">Una marca china con visión global</p>

    {/* Brand overview */}
    <div className="grid grid-cols-3 gap-3 mb-8">
      <div className="p-3 rounded-xl bg-card border border-border text-center">
        <Building2 className="w-6 h-6 text-primary mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Fundada en</p>
        <p className="font-bold text-card-foreground">1988</p>
      </div>
      <div className="p-3 rounded-xl bg-card border border-border text-center">
        <Globe className="w-6 h-6 text-primary mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Presencia</p>
        <p className="font-bold text-card-foreground">130+ países</p>
      </div>
      <div className="p-3 rounded-xl bg-card border border-border text-center">
        <Award className="w-6 h-6 text-primary mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Sede</p>
        <p className="font-bold text-card-foreground">Xiamen</p>
      </div>
    </div>

    {/* About */}
    <div className="p-4 rounded-xl bg-card border border-border mb-8">
      <h2 className="font-semibold text-card-foreground mb-2">Sobre King Long</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        King Long United Automotive Industry Co., Ltd. es uno de los principales fabricantes de autobuses y vehículos comerciales de China. 
        Con sede en la ciudad costera de Xiamen, en la provincia de Fujian, la empresa ha crecido desde sus humildes inicios hasta convertirse 
        en un gigante de la industria del transporte con presencia en más de 130 países y regiones del mundo.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mt-3">
        En México, King Long ha ganado la confianza de operadores de transporte con su línea de minivans de alta calidad, 
        diseñadas para ofrecer confort, eficiencia y durabilidad. La División Minivan México se dedica a brindar soluciones 
        de movilidad confiables con respaldo técnico y servicio postventa de primer nivel.
      </p>
    </div>

    {/* Timeline */}
    <h2 className="text-lg font-semibold text-foreground mb-4">Línea del Tiempo</h2>
    <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
      {timeline.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full bg-gradient-gold border-2 border-background" />
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-bold text-primary">{item.year}</span>
          </div>
          <h3 className="font-semibold text-card-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Historia;
