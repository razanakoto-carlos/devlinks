"use client"

import { useState } from "react"
import { Dev, ProjectItem } from "@/types"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import ProjectCard from "@/components/ProjectCard"
import { createProject } from "@/lib/actions/projects-actions"

interface ProjectsClientPageProps {
  currentUser: Dev
  initialProjects?: ProjectItem[]
}

export default function ProjectsClientPage({ currentUser, initialProjects = [] }: ProjectsClientPageProps) {
  const [user] = useState<Dev>(currentUser)
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function addProject() {
    setProjects((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", description: "", url: "", imageUrl: "" },
    ])
  }

  function removeProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  function updateProject(id: string, field: keyof ProjectItem, value: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  async function handleSave() {
    setSaving(true)
    try {
      const result = await createProject({ projects });
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
     
      console.error(result.message); 
    }
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-[#0d0f18] pt-10 min-h-screen">
      <div className="max-w-275 px-6 py-10 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <ProfileSidebar user={user} />

          <div className="flex-1">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
              Projets
            </p>
            <h1 className="mb-1 font-syne text-[26px] font-extrabold tracking-[-0.8px] text-[#e2e8f0]">
              Mes projets
            </h1>
            <p className="mb-7 text-[13px] text-[#64748b]">
              Présente tes réalisations sur ton profil public.
            </p>
            <div className="flex flex-col gap-4">
              {projects.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#1e1e2e] py-14 text-center">
                  <span className="text-4xl text-[#1e2a3a]">▣</span>
                  <p className="mt-3 text-[13px] text-[#64748b]">Aucun projet pour l&apos;instant</p>
                  <p className="text-[12px] text-[#475569]">Clique sur « Ajouter un projet » pour commencer</p>
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onUpdate={updateProject}
                    onRemove={removeProject}
                  />
                ))
              )}
            </div>
            <button
              onClick={addProject}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#1e2a3a] py-3 text-[13px] text-[#64748b] transition-all hover:border-emerald-500/30 hover:text-emerald-300"
            >
              <span className="text-[16px] leading-none">+</span>
              Ajouter un projet
            </button>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || projects.length === 0}
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-[13px] font-semibold text-[#0d0f18] transition-all hover:bg-emerald-400 disabled:opacity-50"
              >
                {saving ? "Enregistrement…" : saved ? "✓ Enregistré" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
