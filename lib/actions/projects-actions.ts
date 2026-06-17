"use server"; // S'exécute exclusivement sur le serveur

import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../session";
import { revalidatePath } from "next/cache";
import { ActionState, ProjectItem } from "@/types";
import { CreateProjectSchema } from "@/validation/validation"; // Notre schéma qui attend { projects: [...] }

type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export async function createProject(data: CreateProjectInput): Promise<ActionState> {
  console.log("DATA REÇUE:", JSON.stringify(data, null, 2));
  const currentUser = await requireAuth();
  const parsed = CreateProjectSchema.safeParse(data);
  if (!parsed.success) {
    console.log("ERREURS ZOD:", JSON.stringify(parsed.error.flatten(), null, 2));
    return {
      success: false,
      message: "Validation échouée.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const { projects } = parsed.data;
  try {
    for (const project of projects) {
      if (project.url && project.url.trim() !== "") {
        const existingProject = await prisma.project.findFirst({
          where: {
            url: project.url,
            NOT: { id: project.id },
          },
        });
        if (existingProject) {
          return {
            success: false,
            message: `L'URL "${project.url}" est déjà utilisé par un autre projet.`,
          };
        }
      }
    }

    const savedProjects = await prisma.$transaction(async (tx) => {
      const activeIds: string[] = [];
      const saved: ProjectItem[] = [];

      for (const project of projects) {
        const existing = await tx.project.findFirst({
          where: { id: project.id, userId: currentUser.id },
        });
        if (existing) {
          await tx.project.update({
            where: { id: project.id },
            data: {
              title: project.title,
              description: project.description || null,
              url: project.url || null,
              imageUrl: project.imageUrl || null,
            },
          });
          activeIds.push(project.id);
          saved.push({ ...project });
        } else {
          const newProject = await tx.project.create({
            data: {
              title: project.title,
              description: project.description || null,
              url: project.url || null,
              imageUrl: project.imageUrl || null,
              userId: currentUser.id,
            },
          });
          activeIds.push(newProject.id);
          saved.push({
            id: newProject.id,
            title: newProject.title,
            description: newProject.description ?? "",
            url: newProject.url ?? "",
            imageUrl: newProject.imageUrl ?? "",
          });
        }
      }

      await tx.project.deleteMany({
        where: {
          userId: currentUser.id,
          id: { notIn: activeIds },
        },
      });

      return saved;
    });

    revalidatePath("/profile/projects");
    return {
      success: true,
      message: "Projets enregistrés avec succès !",
      data: { projects: savedProjects },
    };
  } catch (error) {
    console.error("[createProject]", error);
    return { success: false, message: "Erreur serveur. Réessaie." };
  }
}

export async function deleteProject(id: string): Promise<ActionState> {
  const currentUser = await requireAuth();

  try {
    const deleteResult = await prisma.project.deleteMany({
      where: {
        id,
        userId: currentUser.id, 
      },
    });

    if (deleteResult.count === 0) {
      return {
        success: false,
        message: "Projet introuvable ou vous n'avez pas l'autorisation de le supprimer.",
      };
    }

    revalidatePath("/profile/projects");
    return { success: true, message: "Projet supprimé avec succès !" };
  } catch (error) {
    console.error("[deleteProject]", error);
    return { success: false, message: "Erreur serveur. Impossible de supprimer." };
  }
}