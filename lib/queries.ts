import { prisma } from "@/lib/prisma";
import { DevDashboard } from "@/types";

const ICONS: Record<string, string> = {
  github: "🐙",
  linkedin: "💼",
  twitter: "🐦",
  website: "🌐",
};

export async function getDeveloperByUsername(
  username: string
): Promise<DevDashboard | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { links: true, skills: true, projects: true },
  });

  if (!user) return null;

  return {
    name: user.name,
    username: user.username,
    email: user.email,
    slug: user.username,
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
    available: user.available,
    initials: `${user.name.split(" ")[0][0]}${user.name.split(" ")[1]?.[0] ?? ""}`.toUpperCase(),
    color: "#10b981",
    links: user.links.map((link) => ({
      label: link.platform,
      url: link.url,
      icon: ICONS[link.platform.toLowerCase()] ?? "🔗",
    })),
    skills: user.skills.map((s) => s.name),
    projects: user.projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      url: p.url,
      imageUrl: p.imageUrl,
    })),
  };
}