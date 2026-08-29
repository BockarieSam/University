import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, ShieldAlert } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { Label, Input, FieldError } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { attemptAdminLogin, isAdminAuthenticated } from "@/lib/adminAuth";
import logo from "@/assets/images/logo/logo.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const ok = await attemptAdminLogin(password);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Couldn't reach the server. Is it running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Admin Login" description="SSCTVET content dashboard login." />
      <div className="flex min-h-dvh items-center justify-center bg-navy-950 px-5">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex flex-col items-center text-center">
            <img src={logo} alt="SSCTVET" className="mb-4 h-14 w-14 rounded-full object-cover" />
            <h1 className="font-display text-lg font-extrabold text-navy-900">
              SSCTVET Content Dashboard
            </h1>
            <p className="mt-1 text-sm text-navy-700/60">Sign in to manage the website</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                <Input
                  id="password"
                  type="password"
                  autoFocus
                  className="pl-10"
                  placeholder="Enter password"
                  hasError={!!error}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <FieldError>{error}</FieldError>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? "Signing In…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-gold-500/10 p-3.5 text-xs leading-relaxed text-navy-700/80">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            Changes made here update the live site for everyone immediately. This login is a
            lightweight lock for trusted editors — see the project README before exposing this
            publicly.
          </div>
        </div>
      </div>
    </>
  );
}
