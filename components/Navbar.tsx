"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type Session = typeof auth.$Infer.Session;

function Navbar({ session }: { session: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1117] border-b border-white/5">
      {/* Barre principale */}
      <div className="h-14 px-4 sm:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
          <span className="text-white font-bold text-base tracking-tight">
            DevLinks
          </span>
        </div>

        {/* Boutons desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {session ? (
            <>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white cursor-pointer"
                >
                  Annuaire
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-transparent border-white/20 text-slate-200 hover:border-green-500 hover:text-green-500 text-sm h-9 cursor-pointer"
                >
                  Tableau de bord
                </Button>
              </Link>
              <Link href="/auth/profile">
                <Button className="bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9 cursor-pointer">
                  Mon profil
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <Button
                  variant="outline"
                  className="cursor-pointer border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white"
                >
                  Annuaire
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="cursor-pointer border-white/20 bg-transparent text-slate-200 hover:bg-transparent hover:border-green-500 hover:text-green-500 text-sm h-9"
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="cursor-pointer bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9">
                  Créer un compte
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Bouton hamburger mobile */}
        <button
          className="sm:hidden text-slate-200 hover:text-white p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-1 px-4 pb-4 bg-[#0f1117] border-t border-white/5">
          {session ? (
            <>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white cursor-pointer"
                >
                  Annuaire
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-transparent border-white/20 text-slate-200 hover:border-green-500 hover:text-green-500 text-sm h-9 cursor-pointer"
                >
                  Tableau de bord
                </Button>
              </Link>
              <Link href="/auth/profile" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9 cursor-pointer">
                  Mon profil
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white"
                >
                  Annuaire
                </Button>
              </Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer border-white/20 bg-transparent text-slate-200 hover:bg-transparent hover:border-green-500 hover:text-green-500 text-sm h-9"
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                <Button className="w-full cursor-pointer bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9">
                  Créer un compte
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;