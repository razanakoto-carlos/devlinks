import { deleteProject } from "@/lib/actions/projects-actions";
import { ProjectItem } from "@/types";

export default function ProjectCard({
  project,
  onUpdate,
  onRemove,
}: {
  project: ProjectItem;
  onUpdate: (id: string, field: keyof ProjectItem, value: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
          Projet
        </p>
        <button
          onClick={async () => {
            onRemove(project.id);
            const result = await deleteProject(project.id);
            if (!result.success) {
              console.error(result.message);
            }
          }}
          className="rounded-md px-2 py-1 text-[12px] text-[#475569] hover:bg-red-400/10 hover:text-red-400 transition-all"
        >
          Supprimer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-[#64748b]">
            Titre *
          </label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => onUpdate(project.id, "title", e.target.value)}
            placeholder="Mon super projet"
            className="rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-3 py-2.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-[#64748b]">
            URL du projet
          </label>
          <input
            type="url"
            value={project.url ?? ""}
            onChange={(e) => onUpdate(project.id, "url", e.target.value)}
            placeholder="https://monprojet.dev"
            className="rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-3 py-2.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-[#64748b]">
            Image (URL)
          </label>
          <input
            type="url"
            value={project.imageUrl ?? ""}
            onChange={(e) => onUpdate(project.id, "imageUrl", e.target.value)}
            placeholder="https://… ou laisse vide"
            className="rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-3 py-2.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
        {project.imageUrl && (
          <div className="flex items-end">
            <div className="h-[46px] w-[80px] overflow-hidden rounded-lg border border-[#1e1e2e]">
              <img
                src={project.imageUrl}
                alt="Aperçu"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <label className="text-[11px] font-medium text-[#64748b]">
          Description
        </label>
        <textarea
          value={project.description ?? ""}
          onChange={(e) => onUpdate(project.id, "description", e.target.value)}
          placeholder="Décris ce projet en quelques phrases…"
          rows={3}
          className="resize-none rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-3 py-2.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
        />
      </div>
    </div>
  );
}
