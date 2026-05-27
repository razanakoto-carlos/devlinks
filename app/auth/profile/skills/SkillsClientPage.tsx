"use client";

import { useState } from "react";
import { Dev, SkillItem } from "@/types";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { updateSkills } from "@/lib/actions/skills-actions";

const SKILL_SUGGESTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Prisma",
  "GraphQL",
  "Docker",
  "Python",
  "Rust",
  "Go",
  "Vue.js",
  "Svelte",
  "AWS",
  "Figma",
  "MongoDB",
  "Redis",
  "Git",
];

const LEVELS = [
  { value: 1, label: "Débutant", color: "text-[#64748b]", bar: "bg-[#1e2a3a]" },
  { value: 2, label: "Notions", color: "text-blue-400", bar: "bg-blue-500/60" },
  {
    value: 3,
    label: "Intermédiaire",
    color: "text-amber-400",
    bar: "bg-amber-500/60",
  },
  {
    value: 4,
    label: "Avancé",
    color: "text-emerald-400",
    bar: "bg-emerald-500/70",
  },
  {
    value: 5,
    label: "Expert",
    color: "text-purple-400",
    bar: "bg-purple-500/70",
  },
];

interface SkillsClientPageProps {
  currentUser: Dev;
  initialSkills?: SkillItem[];
}

export default function SkillsClientPage({
  currentUser,
  initialSkills = [],
}: SkillsClientPageProps) {
  const [user] = useState<Dev>(currentUser);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const filtered =
    input.length > 0
      ? SKILL_SUGGESTIONS.filter(
          (s) =>
            s.toLowerCase().includes(input.toLowerCase()) &&
            !skills.find((sk) => sk.name.toLowerCase() === s.toLowerCase()),
        )
      : [];

  function addSkill(name: string) {
    if (!name.trim()) return;
    if (skills.find((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    setSkills((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: name.trim(), level: 3 },
    ]);
    setInput("");
  }

  function removeSkill(id: string) {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  function updateLevel(id: string, level: number) {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, level } : s)));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const result = await updateSkills({ skills });
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        console.error(result.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-[#0d0f18] pt-10 min-h-screen">
      <div className="max-w-275 px-6 py-10 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <ProfileSidebar user={user} />

          <div className="flex-1">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
              Compétences
            </p>
            <h1 className="mb-1 font-syne text-[26px] font-extrabold tracking-[-0.8px] text-[#e2e8f0]">
              Mes compétences
            </h1>
            <p className="mb-7 text-[13px] text-[#64748b]">
              Ajoute tes technologies et définis ton niveau pour chacune.
            </p>
            <div className="mb-4 rounded-xl border border-[#1e1e2e] bg-[#111118] p-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addSkill(input);
                  }}
                  placeholder="Tape une techno et appuie sur Entrée… (ex: React)"
                  className="w-full rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-4 py-2.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
                />
                {filtered.length > 0 && (
                  <div className="absolute z-10 top-full mt-1 w-full rounded-lg border border-[#1e1e2e] bg-[#111118] shadow-xl overflow-hidden">
                    {filtered.slice(0, 6).map((s) => (
                      <button
                        key={s}
                        onClick={() => addSkill(s)}
                        className="w-full px-4 py-2 text-left text-[13px] text-[#94a3b8] hover:bg-[#1a1a2e] hover:text-emerald-300 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SKILL_SUGGESTIONS.filter(
                  (s) =>
                    !skills.find(
                      (sk) => sk.name.toLowerCase() === s.toLowerCase(),
                    ),
                )
                  .slice(0, 8)
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className="rounded-md border border-[#1e1e2e] px-2.5 py-1 text-[11px] text-[#475569] hover:border-emerald-500/30 hover:text-emerald-300 transition-all"
                    >
                      + {s}
                    </button>
                  ))}
              </div>
            </div>
            {skills.length > 0 && (
              <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-4">
                <div className="flex flex-col gap-3">
                  {skills.map((skill) => {
                    const levelInfo =
                      LEVELS.find((l) => l.value === skill.level) ?? LEVELS[2];
                    return (
                      <div
                        key={skill.id}
                        className="flex items-center gap-4 rounded-lg border border-[#1e1e2e] bg-[#0d0f18] px-4 py-3"
                      >
                        <span className="w-28 shrink-0 text-[13px] font-semibold text-[#e2e8f0] truncate">
                          {skill.name}
                        </span>
                        <div className="flex flex-1 items-center gap-1">
                          {LEVELS.map((l) => (
                            <button
                              key={l.value}
                              onClick={() => updateLevel(skill.id, l.value)}
                              title={l.label}
                              className={`h-2 flex-1 rounded-full transition-all ${
                                skill.level >= l.value
                                  ? l.bar
                                  : "bg-[#1e1e2e] hover:bg-[#2a2a3e]"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`w-24 shrink-0 text-right text-[11px] font-medium ${levelInfo.color}`}
                        >
                          {levelInfo.label}
                        </span>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="text-[#334155] hover:text-red-400 transition-colors text-[18px] leading-none"
                          aria-label={`Supprimer ${skill.name}`}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || skills.length === 0}
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-[13px] font-semibold text-[#0d0f18] transition-all hover:bg-emerald-400 disabled:opacity-50"
              >
                {saving
                  ? "Enregistrement…"
                  : saved
                    ? "✓ Enregistré"
                    : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
