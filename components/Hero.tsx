import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[88vh] flex flex-col items-center justify-center text-center px-6 bg-[#0d0f18] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(74,222,128,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-400/5 px-4 py-1.5 text-sm text-green-400 font-medium tracking-wide">
        <span className="text-green-400">✦</span>
        Annuaire de développeurs
      </div>
      <h1
        className="max-w-3xl text-[clamp(3rem,5.6vw,6rem)] font-black leading-[0.93] tracking-tight text-white"
        style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif" }}
      >
        Trouve le dev
        <br />
        qu&apos;il te faut
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #4ade80 0%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
          }}
        >
          maintenant
        </span>
      </h1>
      <p className="mt-6 max-w-sm text-slate-400 text-base leading-relaxed">
        Des profils vérifiés, des compétences réelles, une communauté qui
        construit.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/profil/creer"
          className="rounded-lg bg-green-400 px-6 py-2.5 text-sm font-semibold text-[#0d0f18] transition-all hover:bg-green-300 hover:scale-[1.02] active:scale-95"
        >
          Créer mon profil
        </Link>
        <Link
          href="/annuaire"
          className="rounded-lg border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/25 active:scale-95"
        >
          Explorer →
        </Link>
      </div>
    </section>
  );
}