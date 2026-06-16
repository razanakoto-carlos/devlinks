"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Dev } from "@/types";
import { logout } from "@/lib/actions/auth-actions";

const navItems = [
  { href: "/auth/profile", label: "Mon profil", icon: "◈" },
  { href: "/auth/profile/links", label: "Mes liens", icon: "⌥" },
  { href: "/auth/profile/skills", label: "Compétences", icon: "◉" },
  { href: "/auth/profile/projects", label: "Projets", icon: "▣" },
  { href: "/auth/profile/avatar", label: "Avatar", icon: "◌" },
];

interface ProfileSidebarProps {
  user: Dev;
}

const handleLogOut = async () => {
  await logout();
  window.location.href = "/auth/login";
};
export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="w-full lg:w-55">
      <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#1e1e2e] bg-[#111118] p-3">
        <Avatar size="sm" />
        <div>
          <p className="text-[13px] font-semibold text-[#e2e8f0] capitalize">
            {user.name.split(" ")[0]}
          </p>
          <p className="text-[11px] text-[#64748b]">
            devlinks.app/{user.username}
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
              pathname === item.href
                ? "border border-[#1e1e2e] bg-[#111118] text-emerald-300"
                : "text-[#94a3b8] hover:bg-[#111118]/60 hover:text-[#e2e8f0]",
            )}
          >
            <span className="text-[14px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <hr className="my-2 border-[#1e1e2e]" />

        <button
          onClick={handleLogOut}
          className="cursor-pointer flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-red-400 transition-all hover:bg-red-400/10"
        >
          <span className="text-[14px]">⊘</span>
          Déconnexion
        </button>
      </nav>
    </aside>
  );
}
