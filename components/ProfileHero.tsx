import { DevDashboard } from "@/types";
import { SkillTag } from "./SkillTag";
import { AvatarDisplay } from "./AvatarDisplay";

interface ProfileHeroProps {
  developer: DevDashboard;
}

export function ProfileHero({ developer }: ProfileHeroProps) {
  return (
    <div className="grid grid-cols-1 gap-12 pb-10 pt-15 lg:grid-cols-[1fr_320px]">
      <div>
        <AvatarDisplay
          src={developer.image ?? null}
          name={developer.name}
          size={48}
        />

        <h1 className="capitalize my-1.5 font-syne text-[36px] font-extrabold leading-none tracking-[-1.5px] text-[#e2e8f0]">
          {developer.name}
        </h1>

        <p className="mb-4 text-[15px] font-medium text-emerald-300">
          {developer.role}
        </p>

        <p className="mb-6 max-w-130 text-[15px] font-light leading-[1.7] text-[#94a3b8]">
          {developer.bio}
        </p>

        <div className="flex flex-wrap gap-2.5">
          {developer.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a2a3e] bg-[#111118] px-3.5 py-2 text-[13px] text-[#94a3b8] transition-all hover:border-emerald-300/50 hover:text-emerald-300"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
      <aside>
        <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
            Compétences
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {developer.skills.map((skill) => (
              <SkillTag key={skill}>{skill}</SkillTag>
            ))}
          </div>

          <hr className="mb-4 border-[#1e1e2e]" />
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
            Localisation
          </p>
          <p className="mb-4 text-[13px] text-[#94a3b8]">
            📍 {developer.location}
          </p>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
            Disponibilité
          </p>
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            Disponible pour missions
          </span>

          <hr className="mb-4 border-[#1e1e2e]" />
          <a
            className="w-full rounded-lg px-4 bg-emerald-300 py-2.5 text-[13px] font-semibold text-[#0a0a0f] transition-all hover:-translate-y-px hover:bg-emerald-200 hover:shadow-[0_4px_20px_rgba(110,231,183,0.3)]"
            href={`mailto:${developer.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacter
          </a>
        </div>
      </aside>
    </div>
  );
}
