'use server'

import { auth } from "../auth";

export async function register(
  name: string,
  username: string,
  password: string,
  email: string,
) {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      username,
      password,
      email,
      callbackURL: "/dashboard",
    },
  });
  return result;
}

export async function login(password: string, email: string) {
  const result = await auth.api.signInEmail({
    body: {
      password,
      email,
      callbackURL: "/dashboard",
    },
  });

  return result;
}
