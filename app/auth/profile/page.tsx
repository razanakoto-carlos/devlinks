import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileClientPage from "./profileClientPage";

async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = session.user;

  const currentUser = {
    ...user,
    slug: user.username,
    initials:
      `${user.name.split(" ")[0][0]}${user.name.split(" ")[1]?.[0] ?? ""}`.toUpperCase(),
    color: "#10b981",
    skills: [],
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  };

  return <ProfileClientPage currentUser={currentUser} />;
}

export default Profile;
