import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Terminos = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "privacidad" ? "privacidad" : "terminos";
  const [tab, setTab] = useState<"terminos" | "privacidad">(initialTab);

  return (
    <div className="min-h-screen pb-20 px-4 pt-6">
      <Link to="/" className="flex items-center gap-1 text-primary text-sm mb-4">
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("terminos")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "terminos" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Términos y Condiciones
        </button>
        <button
          onClick={() => setTab("privacidad")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "privacidad" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Aviso de Privacidad
        </button>
      </div>

      {tab === "terminos" && (
        <div className="prose prose-sm text-muted-foreground space-y-4">
          <h1 className="text-2xl font-bold text-gradient-gold">Términos y Condiciones</h1>
          <p>Última actualización: Febrero 2026</p>
          <h2 className="text-foreground font-semibold">1. Aceptación de los términos</h2>
          <p>Al utilizar esta aplicación, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo, por favor no utilice la aplicación.</p>
          <h2 className="text-foreground font-semibold">2. Uso de la aplicación</h2>
          <p>Esta aplicación es para uso exclusivo de propietarios y operadores de unidades King Long en México.</p>
          <h2 className="text-foreground font-semibold">3. Privacidad</h2>
          <p>Sus datos personales serán tratados conforme a nuestra política de privacidad y la legislación mexicana aplicable. Consulte nuestro Aviso de Privacidad Integral para más detalles.</p>
          <h2 className="text-foreground font-semibold">4. Limitación de responsabilidad</h2>
          <p>King Long México no se hace responsable por el uso indebido de la información proporcionada en esta aplicación.</p>
        </div>
      )}

      {tab === "privacidad" && (
        <div className="prose prose-sm text-muted-foreground space-y-4">
          <h1 className="text-2xl font-bold text-gradient-gold">Aviso de Privacidad Integral</h1>
          <p className="text-sm font-medium text-foreground">APP KING LONG</p>
          <p><strong className="text-foreground">Responsable:</strong> COMERCIALIZADORA GÓMEZ IBARRA DE LA LAGUNA S.A. DE C.V., con domicilio en Canatlán 142A, Parque Industrial, 35079 Gómez Palacio, Dgo.</p>

          <h2 className="text-foreground font-semibold">1. Datos Personales Recopilados</h2>
          <p>Para el funcionamiento de la App, solicitamos: Nombre, fecha de nacimiento, sexo, correo electrónico, teléfono, domicilio, ingreso mensual (para simulador de crédito). Asimismo, recabamos datos vinculados a su unidad: Número de Serie (VIN), modelo y datos de geolocalización en tiempo real.</p>

          <h2 className="text-foreground font-semibold">2. Finalidades del Tratamiento</h2>
          <p><strong className="text-foreground">Primarias:</strong> Prestar servicios de asesoría, atención personalizada, registro de unidad para garantías, gestión de asistencia vial y de emergencia, recordatorios de mantenimiento, acceso a manuales y soporte técnico.</p>
          <p><strong className="text-foreground">Secundarias:</strong> Fines mercadológicos, promociones, encuestas de satisfacción, participación en el juego "Kingo Runner" y evaluación de solicitudes para el programa "Sé Distribuidor".</p>

          <h2 className="text-foreground font-semibold">3. Transferencia de Datos</h2>
          <p>Sus datos podrán ser transferidos a:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Instituciones bancarias o financieras y aseguradoras (en caso de usar el simulador de crédito).</li>
            <li>Terceros proveedores de asistencia vial y soporte técnico.</li>
            <li>Empresas del mismo grupo para fines estadísticos y de calidad.</li>
          </ul>

          <h2 className="text-foreground font-semibold">4. Geolocalización</h2>
          <p>La App recopila datos de ubicación para permitir el funcionamiento del "Mapa de Servicios" y la "Asistencia de Emergencia". Estos datos se procesan en tiempo real y solo se almacenan si es necesario para la prestación del servicio solicitado.</p>

          <h2 className="text-foreground font-semibold">5. Seguridad de los Datos</h2>
          <p>Hemos implementado medidas técnicas para proteger su información (incluyendo el VIN y datos patrimoniales) contra destrucción, pérdida, alteración o acceso no autorizado. Los datos del juego "Kingo Runner" (puntuaciones) se almacenan localmente en su dispositivo.</p>

          <h2 className="text-foreground font-semibold">6. Derechos ARCO</h2>
          <p>Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición enviando un correo electrónico a: <a href="mailto:contacto@kinglong.mx" className="text-primary underline">contacto@kinglong.mx</a>.</p>

          <h2 className="text-foreground font-semibold">7. Consentimiento</h2>
          <p>Al registrar sus datos y utilizar las funciones de la App, usted otorga su consentimiento expreso para el tratamiento de sus datos personales conforme a este Aviso de Privacidad.</p>
        </div>
      )}
    </div>
  );
};

export default Terminos;
