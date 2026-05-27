import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SkillsClientPage from "./SkillsClientPage";
import { SkillItemInput } from "@/validation/validation";
import { prisma } from "@/lib/prisma";
import { SkillItem } from "@/types";

async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = session.user;

   const initialSkills = (await prisma.skill.findMany({
      where: { userId: user.id },
      select: { id: true, name: true, level: true },
    })) as SkillItem[];

  const currentUser = {
    ...user,
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  };

  return <SkillsClientPage currentUser={currentUser} initialSkills={initialSkills} />;
}

export default Profile;
