"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../session";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";
import { UpdateLinksSchema } from "@/validation/validation";

type UpdateLinksInput = z.infer<typeof UpdateLinksSchema>;

export async function updateLinks(data: UpdateLinksInput): Promise<ActionState> {
  const currentUser = await requireAuth();

  const parsed = UpdateLinksSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { links } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      for (const link of links) {
        await tx.link.upsert({
          where: {
            userId_platform: {
              userId: currentUser.id,
              platform: link.platform,
            },
          },
          update: { url: link.url },  
          create: {
            userId: currentUser.id,
            platform: link.platform,
            url: link.url,
          },
        });
      }

      const submittedPlatforms = links.map((l) => l.platform);
      await tx.link.deleteMany({
        where: {
          userId: currentUser.id,
          platform: { notIn: submittedPlatforms },
        },
      });
    });

    revalidatePath("/profile/links");
    return { success: true, message: "Liens enregistrés !" };

  } catch (error) {
    console.error("[updateLinks]", error);
    return { success: false, message: "Erreur serveur. Réessaie." };
  }
}