import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAuthRedirectUrl } from "@/lib/deeplink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, LogIn, Eye, EyeOff, Check, X, Phone } from "lucide-react";
import logo from "@/assets/logo-kinglong.png";
import { toast } from "sonner";

const passwordRules = [
  { label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
  { label: "Un carácter especial (!@#$...)", test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allRulesPass = passwordRules.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !allRulesPass) {
      toast.error("La contraseña no cumple los requisitos de seguridad");
      return;
    }
    if (!isLogin && !passwordsMatch) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (!isLogin && (!acceptTerms || !acceptPrivacy)) {
      toast.error("Debes aceptar los términos y el aviso de privacidad");
      return;
    }
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("¡Bienvenido de vuelta!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Revisa tu correo para confirmar tu cuenta");
      }
    } catch (error: any) {
      toast.error(error.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <img src={logo} alt="King Long" className="h-16 mb-8" />

      <div className="w-full max-w-sm rounded-2xl p-6 space-y-6 bg-card border border-border shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-card-foreground">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Accede a tu cuenta King Long" : "Regístrate para comenzar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input type="tel" placeholder="Teléfono de contacto" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" required />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required minLength={8} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input type={showPassword ? "text" : "password"} placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10" required minLength={8} />
              {confirmPassword.length > 0 && (
                <span className="absolute right-3 top-3">
                  {passwordsMatch ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-destructive" />}
                </span>
              )}
            </div>
          )}

          {!isLogin && password.length > 0 && (
            <div className="space-y-1 text-xs">
              {passwordRules.map((rule) => {
                const pass = rule.test(password);
                return (
                  <div key={rule.label} className={`flex items-center gap-1.5 ${pass ? "text-green-500" : "text-muted-foreground"}`}>
                    {pass ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {rule.label}
                  </div>
                );
              })}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 accent-primary" />
                <span>
                  Acepto los{" "}
                  <Link to="/terminos" className="text-primary underline">Términos y Condiciones</Link>
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-0.5 accent-primary" />
                <span>
                  Acepto el{" "}
                  <Link to="/terminos?tab=privacidad" className="text-primary underline">Aviso de Privacidad</Link>
                </span>
              </label>
            </div>
          )}

          <Button type="submit" className="w-full bg-gradient-gold text-white font-semibold" disabled={loading || (!isLogin && (!allRulesPass || !acceptTerms || !acceptPrivacy || !passwordsMatch))}>
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </form>

        {isLogin && (
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>
        )}

        <div className="text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:underline">
            {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
