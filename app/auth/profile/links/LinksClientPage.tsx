"use client";

import { useState } from "react";
import { AllowedPlatform, Dev, LinkItem } from "@/types";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { updateLinks } from "@/lib/actions/links-actions";

const PLATFORMS = [
  {
    id: "github",
    label: "GitHub",
    placeholder: "https://github.com/username",
    icon: "⌥",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/username",
    icon: "◈",
  },
  {
    id: "twitter",
    label: "Twitter/X",
    placeholder: "https://x.com/username",
    icon: "◉",
  },
  {
    id: "website",
    label: "Site web",
    placeholder: "https://monsite.dev",
    icon: "▣",
  },
  {
    id: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@channel",
    icon: "▶",
  },
];



interface LinksClientPageProps {
  currentUser: Dev;
  initialLinks?: LinkItem[];
}

export default function LinksClientPage({
  currentUser,
  initialLinks = [],
}: LinksClientPageProps) {
  const [user] = useState<Dev>(currentUser);
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function addLink() {
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), platform: "github", url: "" },
    ]);
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, field: keyof LinkItem, value: string) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
    const result = await updateLinks({ links });
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
              Liens
            </p>
            <h1 className="mb-1 font-syne text-[26px] font-extrabold tracking-[-0.8px] text-[#e2e8f0]">
              Mes liens
            </h1>
            <p className="mb-7 text-[13px] text-[#64748b]">
              Ajoute jusqu&apos;à 6 liens vers tes profils et réseaux.
            </p>
            <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-6">
              {links.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <span className="text-4xl text-[#1e2a3a]">⌥</span>
                  <p className="text-[13px] text-[#64748b]">
                    Aucun lien pour l&apos;instant
                  </p>
                  <p className="text-[12px] text-[#475569]">
                    Clique sur « Ajouter un lien » pour commencer
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {links.map((link, index) => {
                    const platform =
                      PLATFORMS.find((p) => p.id === link.platform) ??
                      PLATFORMS[0];
                    return (
                      <div
                        key={link.id}
                        className="group flex items-center gap-3 rounded-lg border border-[#1e1e2e] bg-[#0d0f18] p-3 transition-all hover:border-[#2a2a3e]"
                      >
                        <span className="text-[11px] font-mono text-[#334155] w-4 text-center select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <select
                          value={link.platform}
                          onChange={(e) =>
                            updateLink(link.id, "platform", e.target.value)
                          }
                          className="rounded-md border border-[#1e1e2e] bg-[#111118] px-2 py-1.5 text-[12px] text-[#94a3b8] outline-none focus:border-emerald-500/50 transition-colors"
                        >
                          {PLATFORMS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.icon} {p.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            updateLink(link.id, "url", e.target.value)
                          }
                          placeholder={platform.placeholder}
                          className="flex-1 rounded-md border border-[#1e1e2e] bg-transparent px-3 py-1.5 text-[13px] text-[#e2e8f0] placeholder:text-[#334155] outline-none focus:border-emerald-500/50 transition-colors"
                        />
                        <button
                          onClick={() => removeLink(link.id)}
                          className="text-[#334155] hover:text-red-400 transition-colors text-[18px] leading-none px-1"
                          aria-label="Supprimer ce lien"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {links.length < 6 && (
                <button
                  onClick={addLink}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#1e2a3a] py-2.5 text-[13px] text-[#64748b] transition-all hover:border-emerald-500/30 hover:text-emerald-300"
                >
                  <span className="text-[16px] leading-none">+</span>
                  Ajouter un lien
                  <span className="text-[11px] text-[#334155]">
                    ({links.length}/6)
                  </span>
                </button>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
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
