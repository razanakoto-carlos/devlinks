import { prisma } from "@/lib/prisma";
import { DevPage } from "@/types";

const COLORS = [
  "bg-teal-700", "bg-slate-600", "bg-violet-700",
  "bg-amber-700", "bg-sky-700", "bg-rose-700",
];

export async function getDevs(): Promise<DevPage[]> {
  const users = await prisma.user.findMany({
    include: {
      skills: true,
      links: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user,index) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    slug: user.username,
    role: user.role ?? undefined,
    location: user.location ?? undefined,
    bio: user.bio ?? undefined,
    available: user.available,
    image: user.image ?? null,
    initials: user.name.slice(0, 1).toUpperCase(),
    color: COLORS[index % COLORS.length],
    skills: user.skills.map((s) => s.name),
    github: user.links.find((l) => l.platform === "github")?.url ?? "#",
    linkedin: user.links.find((l) => l.platform === "linkedin")?.url,
    portfolio: user.links.find((l) => l.platform === "portfolio")?.url,
  }));
}