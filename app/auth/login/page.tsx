"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, GitBranch } from "lucide-react";
import { login } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { password, email } = form;
      const result = await login(password, email);
      if (!result.user) {
        setError("Invalid email or password");
      }
      setForm({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0f18] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
            <span className="text-[#e8eaf0] font-bold text-xl tracking-tight">
              DevLinks
            </span>
          </div>
          <p className="text-[#6b7a99] text-sm">
            Connecte-toi à ta communauté de devs
          </p>
        </div>
        <Card className="bg-[#161b27] border-[#1e2535]">
          <CardHeader className="pb-4">
            <h1 className="text-[#e8eaf0] font-bold text-lg text-center">
              Connexion
            </h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-[#1e2535] border-[#2a3347] text-[#e8eaf0] hover:bg-[#2a3347] hover:text-white gap-2"
            >
              <GitBranch className="h-4 w-4" />
              Continuer avec GitHub
            </Button>
            <div className="flex items-center gap-3">
              <Separator className="flex-1 bg-[#1e2535]" />
              <span className="text-[#4a5568] text-xs">ou</span>
              <Separator className="flex-1 bg-[#1e2535]" />
            </div>
            {error && <p>{error}</p>}
            <div className="space-y-1.5">
              <Label className="text-[#8892a4] text-sm">Email</Label>
              <Input
                onChange={handleForm}
                value={form.email}
                name="email"
                type="email"
                placeholder="toi@exemple.com"
                className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[#8892a4] text-sm">Mot de passe</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#6b7a99] hover:text-green-400 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  onChange={handleForm}
                  value={form.password}
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] pr-10 focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8892a4] transition-colors"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-400 text-[#0d0f18] font-semibold hover:bg-green-300 transition-colors"
            >
              {isLoading ? "Chargement..." : "Se connecter"}
            </Button>
          </CardContent>
          <CardFooter className="bg-[#161b27] justify-center pt-0">
            <p className="text-[#6b7a99] text-sm">
              Pas encore de compte ?{" "}
              <Link
                href="/auth/register"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
