import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileClientPage from "./profileClientPage";

async function Profile(){
   const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  return (
    <ProfileClientPage />
  )
}

export default Profile;
