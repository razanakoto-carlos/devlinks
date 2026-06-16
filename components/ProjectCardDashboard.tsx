import { ProjectItem } from "@/types";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCardDashboard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-[#1e1e2e] bg-[#111118] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2a2a3e]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-syne text-[15px] font-bold leading-snug text-[#e2e8f0]">
          {project.title}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 shrink-0 text-[#64748b] transition-colors hover:text-emerald-300"
            aria-label={`Voir ${project.title}`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
      <p className="text-[13px] leading-relaxed text-[#94a3b8]">
        {project.description ?? (
          <span className="italic text-[#475569]">Aucune description.</span>
        )}
      </p>
    </div>
  );
}
