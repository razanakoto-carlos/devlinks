"use client"

import { useState } from "react"
import { Dev } from "@/types"
import { ProfileForm } from "@/components/ProfileForm"
import { ProfileSidebar } from "@/components/ProfileSidebar"

export default function ProfileClientPage({currentUser}:{currentUser:Dev}) {
  const [user, setUser] = useState<Dev>(currentUser)

  function handleSave(updated: Partial<Dev>) {
    setUser((prev) => ({ ...prev, ...updated }))
   
  }

  return (
    <div className="bg-[#0d0f18] pt-10">
      <div className="max-w-275 px-6 py-10 mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <ProfileSidebar user={user} />
        <div className="flex-1">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-[#64748b]">
            Profile
          </p>
          <h1 className="mb-7 font-syne text-[26px] font-extrabold tracking-[-0.8px] text-[#e2e8f0]">
            Éditer mon profil
          </h1>
          <ProfileForm user={user} onSave={handleSave} />
        </div>
      </div>
      </div>
    </div>
  )
}
