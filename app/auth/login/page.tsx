import { auth } from "@/lib/auth"
import LoginClientPage from "./loginClientPage"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(session){
    redirect("/")
  }

  return (
    <LoginClientPage />
  )
}

export default LoginPage