"use client"

import { useState } from "react"
import { ProfileHero } from "@/components/ProfileHero"
import { cn } from "@/lib/utils"
import { DevDashboard } from "@/types"
import ProjectCardDashboard from "@/components/ProjectCardDashboard"

const TABS = ["Projets", "À propos"] as const
type Tab = (typeof TABS)[number]

export default function DashboardClientPage({currentUser}:{currentUser:DevDashboard}) {
  const [activeTab, setActiveTab] = useState<Tab>("Projets")

  return (
    <div className="pt-15 bg-[#0d0f18]">
    <div className="mx-auto max-w-275 px-6 pt-15 bg-[#0d0f18]" >
      <ProfileHero developer={currentUser} />
      <div className="mb-8 flex gap-1 border-b border-[#1e1e2e]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-t-lg border border-b-0 px-4 py-2 text-[13px] font-semibold tracking-wide transition-all duration-200",
              activeTab === tab
                ? "border-[#2a2a3e] bg-[#0a0a0f] text-emerald-300"
                : "border-[#1e1e2e] bg-[#111118] text-[#64748b] hover:text-[#e2e8f0]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Projets" && (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {currentUser.projects?.map((project) => (
            <ProjectCardDashboard key={project.id} project={project} />
          ))}
        </div>
      )}
      {activeTab === "À propos" && (
        <div className="max-w-[600px] pb-20">
          <p className="text-[15px] font-light leading-[1.7] text-[#94a3b8]">
            {currentUser.bio}
          </p>
        </div>
      )}
    </div>
    </div>
  )
}
