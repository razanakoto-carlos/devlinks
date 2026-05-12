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
import { AlertCircle, Eye, EyeOff, GitBranch } from "lucide-react";
import { loginSocial, register } from "@/lib/actions/auth-actions";

export default function RegisterClientPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): string {
    if (form.password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (form.password !== form.confirmPassword) {
      return "Les mots de passe ne correspondent pas";
    }
    if (form.username.length < 3) {
      return "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const { password, email, username } = form;
      const name = `${form.firstname} ${form.lastname}`;
      await register(name, username, password, email);
      setForm({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const msg = (err as Error)?.message?.toLowerCase() ?? "";

      if (msg.includes("username")) {
        setError("Ce nom d'utilisateur est déjà pris");
      } else if (msg.includes("email")) {
        setError("Un compte existe déjà avec cet email");
      } else {
        setError(
          "Un compte existe déjà avec cet email ou ce nom d'utilisateur",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialAuth(provider: "google" | "github") {
    setIsLoading(true);
    setError("");
    try {
      await loginSocial(provider);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="pt-14 min-h-screen bg-[#0d0f18] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
            <span className="text-[#e8eaf0] font-bold text-xl tracking-tight">
              DevLinks
            </span>
          </div>
          <p className="text-[#6b7a99] text-sm">
            Rejoins la communauté de devs malgaches
          </p>
        </div>
        <Card className="bg-[#161b27] border-[#1e2535]">
          <CardHeader className="pb-4">
            <h1 className="text-[#e8eaf0] font-bold text-lg text-center">
              Créer un compte
            </h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              onClick={() => handleSocialAuth("github")}
              variant="outline"
              className="w-full bg-[#1e2535] border-[#2a3347] text-[#e8eaf0] hover:bg-[#2a3347] hover:text-white gap-2"
            >
              <GitBranch className="h-4 w-4" />
              Continuer avec GitHub
            </Button>
            <Button
              onClick={() => handleSocialAuth("google")}
              variant="outline"
              className="w-full bg-[#1e2535] border-[#2a3347] text-[#e8eaf0] hover:bg-[#2a3347] hover:text-white gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </Button>
            <div className="flex items-center gap-3">
              <Separator className="flex-1 bg-[#1e2535]" />
              <span className="text-[#4a5568] text-xs">ou</span>
              <Separator className="flex-1 bg-[#1e2535]" />
            </div>
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[#8892a4] text-sm">Prénom</Label>
                  <Input
                    required
                    value={form.lastname}
                    onChange={handleForm}
                    name="lastname"
                    placeholder="John"
                    className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#8892a4] text-sm">Nom</Label>
                  <Input
                    required
                    onChange={handleForm}
                    name="firstname"
                    value={form.firstname}
                    placeholder="Doe"
                    className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#8892a4] text-sm">
                  Nom d&apos;utilisateur
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-sm select-none">
                    /
                  </span>
                  <Input
                    required
                    value={form.username}
                    onChange={handleForm}
                    name="username"
                    placeholder="z3r0"
                    className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] pl-6 font-mono focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#8892a4] text-sm">Email</Label>
                <Input
                  required
                  value={form.email}
                  onChange={handleForm}
                  name="email"
                  type="email"
                  placeholder="toi@exemple.com"
                  className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#8892a4] text-sm">Mot de passe</Label>
                <div className="relative">
                  <Input
                    required
                    value={form.password}
                    onChange={handleForm}
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
                  {form.password.length > 0 && form.password.length < 8 && (
                    <p className="text-xs text-amber-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {8 - form.password.length} caractère
                      {8 - form.password.length > 1 ? "s" : ""} manquant
                      {8 - form.password.length > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#8892a4] text-sm">
                  Confirmer le mot de passe
                </Label>
                <div className="relative">
                  <Input
                    required
                    name="confirmPassword"
                    onChange={handleForm}
                    value={form.confirmPassword}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#0d0f18] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#4a5568] pr-10 focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8892a4] transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {form.confirmPassword.length > 0 &&
                    form.password !== form.confirmPassword && (
                      <p className="text-xs text-amber-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Les mots de passe ne correspondent pas
                      </p>
                    )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-400 text-[#0d0f18] font-semibold hover:bg-green-300 transition-colors"
              >
                {isLoading ? "Chargement..." : "Créer mon profil"}
              </Button>
            </form>
            <p className="text-[#4a5568] text-xs text-center leading-relaxed">
              En créant un compte, tu acceptes les{" "}
              <Link
                href="/cgu"
                className="text-[#6b7a99] hover:text-green-400 transition-colors underline underline-offset-2"
              >
                conditions d&apos;utilisation
              </Link>
            </p>
          </CardContent>

          <CardFooter className="bg-[#161b27] justify-center pt-0">
            <p className="text-[#6b7a99] text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/auth/login"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
