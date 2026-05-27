"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../session";
import { revalidatePath } from "next/cache";
import { ActionState } from "@/types";
import { UpdateSkillsSchema } from "@/validation/validation";

type UpdateSkillsInput = z.infer<typeof UpdateSkillsSchema>;

export async function updateSkills(data: UpdateSkillsInput): Promise<ActionState> {
  const currentUser = await requireAuth();
  const parsed = UpdateSkillsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation échouée.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { skills } = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      for (const skill of skills) {
        await tx.skill.upsert({
          where: {
            userId_name: {
              userId: currentUser.id,
              name: skill.name,
            },
          },
          update: { level: skill.level }, 
          create: {
            userId: currentUser.id,
            name: skill.name,
            level: skill.level,
          },
        });
      }
      const submittedNames = skills.map((s) => s.name);
      await tx.skill.deleteMany({
        where: {
          userId: currentUser.id,
          name: { notIn: submittedNames },
        },
      });
    });

    revalidatePath("/profile/skills");
    return { success: true, message: "Compétences enregistrées !" };

  } catch (error) {
    console.error("[updateSkills]", error);
    return { success: false, message: "Erreur serveur. Réessaie." };
  }
}