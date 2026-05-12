"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function register(
  name: string,
  username: string,
  password: string,
  email: string,
) {
  const existingEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existingEmail) throw new Error("EMAIL_TAKEN");

  const existingUsername = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  if (existingUsername) throw new Error("USERNAME_TAKEN");

  await auth.api.signUpEmail({
    body: { name, username, password, email, callbackURL: "/dashboard" },
  });

  redirect("/dashboard");
}

export async function login(password: string, email: string) {
  const result = await auth.api.signInEmail({
    body: {
      password,
      email,
      callbackURL: "/dashboard",
    },
  });
  if (!result?.user) {
    return { error: "Email ou mot de passe invalide" };
  }

  redirect("/dashboard");
}

export async function loginSocial(provider: "github" | "google") {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
  });
  if (url) {
    redirect(url);
  }
}

export async function logout() {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
}
