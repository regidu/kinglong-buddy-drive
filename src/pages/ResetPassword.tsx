import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react";
import logo from "@/assets/logo-kinglong-optimized.png";
import { toast } from "sonner";

const passwordRules = [
  { label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Una letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
  { label: "Un carácter especial", test: (p: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allRulesPass = passwordRules.every((r) => r.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      toast.error("Enlace inválido");
      navigate("/auth");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRulesPass) { toast.error("La contraseña no cumple los requisitos"); return; }
    if (!passwordsMatch) { toast.error("Las contraseñas no coinciden"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Contraseña actualizada");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <img src={logo} alt="King Long" className="h-16 mb-8" />
      <div className="w-full max-w-sm rounded-2xl p-6 space-y-6 bg-card border border-border shadow-lg">
        <h1 className="text-2xl font-bold text-card-foreground text-center">Nueva Contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type={show ? "text" : "password"} placeholder="Nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required minLength={8} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type={show ? "text" : "password"} placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10" required minLength={8} />
            {confirmPassword.length > 0 && (
              <span className="absolute right-3 top-3">
                {passwordsMatch ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-destructive" />}
              </span>
            )}
          </div>
          {password.length > 0 && (
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
          <Button type="submit" className="w-full bg-gradient-gold text-white" disabled={loading || !allRulesPass || !passwordsMatch}>
            {loading ? "Guardando..." : "Actualizar contraseña"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
