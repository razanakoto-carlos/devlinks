import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProjectsClientPage from "./ProjectsClientPage";
import { ProjectItem } from "@/types";
import { prisma } from "@/lib/prisma";

async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = session.user;
  
  const initialProjects = (await prisma.project.findMany({
      where: { userId: user.id },
      select: { id: true, title: true, description: true ,url:true, imageUrl:true},
    })) as ProjectItem[];

  const currentUser = {
    ...user,
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  };

  return <ProjectsClientPage currentUser={currentUser} initialProjects={initialProjects} />;
}

export default Profile;
