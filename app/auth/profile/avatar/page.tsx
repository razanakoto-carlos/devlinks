import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AvatarClientPage from "./AvatarClientPage";

async function Links() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  const user = session.user;

  const currentUser = {
    ...user,
    role: user.role ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    image: user.image ?? "",
  };

  return (
    <AvatarClientPage
      currentUser={currentUser}
    />
  );
}

export default Links;
