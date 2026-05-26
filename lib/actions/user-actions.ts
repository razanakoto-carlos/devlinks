"use server";

import {z} from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../session";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";
import { UpdateUserSchema } from "@/validation/user-validation";


type UpdateUserInput = z.infer<typeof UpdateUserSchema>

export async function updateUser(data: UpdateUserInput): Promise<ActionState> {
  const currentUser = await requireAuth();

  const parsed = UpdateUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const existing = await prisma.user.findUnique({
    where: {
      username: parsed.data.username,
    },
    select: { id: true },
  });

  if (existing && existing.id !== currentUser.id) {
    return {
      success: false,
      message: "Username already taken.",
      errors: { username: ["This username is already in use."] },
    };
  }

  try {
    await prisma.user.update({
      where: { id: currentUser.id },
      data: parsed.data,
    });

    revalidatePath("/profile");
    revalidatePath(`/${parsed.data.username}`);
    return { success: true, message: "Profile updated!" };
  } catch (error) {
    console.error("[updateUser]", error);
    return { success: false, message: "Server error. Please try again." };
  }
}
