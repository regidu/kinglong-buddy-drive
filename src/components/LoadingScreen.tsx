import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const frases = [
  "Calentando motores…",
  "Apretando tuercas…",
  "Cambiando llantas…",
  "Cargando combustible…",
  "Llenando aceite…",
  "Revisando frenos…",
  "Ajustando espejos…",
  "Encendiendo luces…",
  "Inflando neumáticos…",
  "Puliendo carrocería…",
  "Calibrando motor…",
  "Preparando ruta…",
];

const LoadingScreen = () => {
  const [frase, setFrase] = useState(() => frases[Math.floor(Math.random() * frases.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrase(frases[Math.floor(Math.random() * frases.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-sm font-medium animate-pulse">{frase}</p>
    </div>
  );
};

export default LoadingScreen;
