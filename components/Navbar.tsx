import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  const user = false;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1117] border-b border-white/5 h-14 px-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
        <span className="text-white font-bold text-base tracking-tight">
          DevLinks
        </span>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link href="/">
               <Button
                variant="outline"
                className="border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white"
              >
                Annuaire
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-transparent hover:bg-transparent border-white/20 text-slate-200 hover:border-green-500 hover:text-green-500 text-sm h-9"
              >
                Tableau de bord
              </Button>
            </Link>
            <Link href="/developers/z3r0">
              <Button className="bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9">
                Mon profil
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <Button
                variant="outline"
                className="border-none bg-transparent hover:bg-gray-800 text-slate-200 hover:border-white/20 text-sm h-9 hover:text-white"
              >
                Annuaire
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-slate-200 hover:bg-transparent hover:border-green-500 hover:text-green-500 text-sm h-9"
              >
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-green-500 text-[#0f1117] hover:bg-green-500 font-semibold text-sm h-9">
                Créer un compte
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
