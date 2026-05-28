import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LinksClientPage from "./LinksClientPage";
import { prisma } from "@/lib/prisma";
import { LinkItem } from "@/types";

async function Links() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = session.user;

  const initialLinks = (await prisma.link.findMany({
    where: { userId: user.id },
    select: { id: true, platform: true, url: true },
  })) as LinkItem[];

  const currentUser = {
    ...user,
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  };

  return (
    <LinksClientPage currentUser={currentUser} initialLinks={initialLinks} />
  );
}

export default Links;
