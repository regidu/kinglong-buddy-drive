import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terminos = () => (
  <div className="min-h-screen pb-20 px-4 pt-6">
    <Link to="/" className="flex items-center gap-1 text-primary text-sm mb-4">
      <ArrowLeft className="w-4 h-4" /> Volver
    </Link>
    <h1 className="text-2xl font-bold text-gradient-gold mb-4">Términos y Condiciones</h1>
    <div className="prose prose-sm text-muted-foreground space-y-4">
      <p>Última actualización: Febrero 2026</p>
      <h2 className="text-foreground font-semibold">1. Aceptación de los términos</h2>
      <p>Al utilizar esta aplicación, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo, por favor no utilice la aplicación.</p>
      <h2 className="text-foreground font-semibold">2. Uso de la aplicación</h2>
      <p>Esta aplicación es para uso exclusivo de propietarios y operadores de unidades King Long en México.</p>
      <h2 className="text-foreground font-semibold">3. Privacidad</h2>
      <p>Sus datos personales serán tratados conforme a nuestra política de privacidad y la legislación mexicana aplicable.</p>
      <h2 className="text-foreground font-semibold">4. Limitación de responsabilidad</h2>
      <p>King Long México no se hace responsable por el uso indebido de la información proporcionada en esta aplicación.</p>
      <p className="text-xs text-muted-foreground italic">* Estos términos son preliminares y serán actualizados con la información oficial.</p>
    </div>
  </div>
);

export default Terminos;
