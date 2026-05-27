export type Dev = {
  name: string;
  username: string;
  role?: string;
  location?: string;
  bio?: string;
  available?: boolean | null;
};

export interface LinkItem {
  id: string;
  platform: AllowedPlatform;
  url: string;
}

export type AllowedPlatform = "github" | "linkedin" | "twitter" | "website" | "youtube";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface SkillItem {
  id: string
  name: string
  level: number
}

export interface ProjectItem {
  id: string
  title: string
  description?: string
  url?: string
  imageUrl?: string
}
