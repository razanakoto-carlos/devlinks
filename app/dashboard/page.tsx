import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DashboardClientPage from "./dashboardClientPage";
import { prisma } from "@/lib/prisma";
import { DevDashboard } from "@/types";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      links: true,
      skills: true,
      projects: true,
    },
  });

if (!fullUser) redirect("/");

const ICONS: Record<string, string> = {
  github: "🐙",
  linkedin: "💼",
  twitter: "🐦",
  website: "🌐",
}

const currentUser: DevDashboard = {
  name: fullUser.name,
  username: fullUser.username,
  email:fullUser.email,
  slug: fullUser.username,                   
  role: fullUser.role ?? "",
  location: fullUser.location ?? "",
  bio: fullUser.bio ?? "",
  image: fullUser.image ?? "",
  available: fullUser.available,

  initials: `${fullUser.name.split(" ")[0][0]}${fullUser.name.split(" ")[1]?.[0] ?? ""}`.toUpperCase(),
  color: "#10b981",

  links: fullUser.links.map((link) => ({
    label: link.platform,
    url: link.url,
    icon: ICONS[link.platform.toLowerCase()] ?? "🔗",
  })),

  skills: fullUser.skills.map((skill) => skill.name), // string[]

  projects: fullUser.projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    url: project.url,
    imageUrl: project.imageUrl,
  })),
}

return <DashboardClientPage currentUser={currentUser} />
}

export default Dashboard;
