"use server";

import {z} from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../session";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";
import { UpdateUserSchema } from "@/validation/user-validation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"


type UpdateUserInput = z.infer<typeof UpdateUserSchema>


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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


export async function updateAvatar(formData: FormData): Promise<ActionState> {
  try {
    const currentUser = await requireAuth()
    const file = formData.get("file") as File
    
    if (!file) {
      return { success: false, message: "Aucun fichier fourni." }
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error("Cloudinary n'a renvoyé aucun résultat."))
          resolve(result)
        }
      ).end(buffer)
    })

    const imageUrl = uploadResult.secure_url
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { image: imageUrl },
    })
    revalidatePath("/profile")
    revalidatePath(`/${currentUser.username}`)

    return { success: true, message: "Avatar mis à jour avec succès !", data: imageUrl }
  } catch (error) {
    console.error("[updateAvatar]", error)
    return { success: false, message: "Erreur serveur lors de l'envoi de l'avatar." }
  }
}