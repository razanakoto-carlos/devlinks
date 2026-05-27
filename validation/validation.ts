import { z } from "zod";

export const LinkItemSchema = z.object({
  platform: z.enum(["github", "linkedin", "twitter", "website", "youtube"]),
  url: z.string().url("URL invalide").min(1),
});

export const UpdateLinksSchema = z.object({
  links: z.array(LinkItemSchema).max(6, "6 liens maximum"),
});

export type UpdateLinksInput = z.infer<typeof UpdateLinksSchema>;

export const SkillItemSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom de la compétence est requis")
    .max(50, "Le nom est trop long"),
  level: z
    .number()
    .int("Le niveau doit être un nombre entier")
    .min(1, "Le niveau minimum est 1")
    .max(5, "Le niveau maximum est 5")
    .default(1),
});

export const UpdateSkillsSchema = z.object({
  skills: z
    .array(SkillItemSchema)
    .max(15, "15 compétences maximum"), 
});

export type UpdateSkillsInput = z.infer<typeof UpdateSkillsSchema>;
export type SkillItemInput = z.infer<typeof SkillItemSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  
  title: z
    .string()
    .min(1, "Le titre est obligatoire.")
    .max(100, "Le titre ne doit pas dépasser 100 caractères."),
    
  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères.")
    .optional() 
    .or(z.literal("")),
    
  url: z
    .string()
    .url("L'URL du projet n'est pas valide (ex: https://monprojet.com).")
    .optional()
    .or(z.literal("")),
    
  imageUrl: z
    .string()
    .url("L'URL de l'image n'est pas valide.")
    .optional()
    .or(z.literal("")),
});

export const CreateProjectSchema = z.object({
  projects: z.array(ProjectSchema), 
});