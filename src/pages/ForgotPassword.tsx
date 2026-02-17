import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-kinglong.png";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Revisa tu correo electrónico");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <img src={logo} alt="King Long" className="h-16 mb-8" />
      <div className="w-full max-w-sm rounded-2xl p-6 space-y-6 bg-card border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-card-foreground">Recuperar Contraseña</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {sent ? "Te enviamos un enlace de recuperación" : "Ingresa tu correo para recibir un enlace"}
          </p>
        </div>
        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-gold text-white font-semibold" disabled={loading}>
              {loading ? "Enviando..." : "Enviar enlace"}
            </Button>
          </form>
        )}
        <Link to="/auth" className="flex items-center justify-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
