import { auth } from "@/lib/auth";
import RegisterClientPage from "./registerClientPage";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return <RegisterClientPage />;
}

export default RegisterPage;
