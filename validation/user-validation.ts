import { z } from "zod";

export const UpdateUserSchema = z.object({
  name:      z.string().min(2).max(100),
  username:  z.string().min(3).max(30).regex(/^[a-z0-9_-]+$/, {
               message: "Lowercase letters, numbers, _ and - only",
             }),
  bio:       z.string().max(500).optional(),
  role:      z.string().max(100).optional(),
  location:  z.string().max(100).optional(),
  available: z.coerce.boolean().optional(),
});