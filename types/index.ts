export type Dev = {
  name: string;
  username: string;
  role?: string;
  location?: string;
  bio?: string;
  available?: boolean | null;
  image?:string;
};


export type DevPage = {
  id: string;
  name: string;
  username: string;
  slug: string;
  role?: string;
  location?: string;
  bio?: string;
  available?: boolean;
  image?: string | null;
  initials: string;
  color: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
};

export type DevDashboard = Dev & {
  email?:string
  slug: string
  initials: string
  color: string
  links: {
    label: string
    url: string
    icon: string
  }[]
  skills: string[]
  projects: {
    id: string
    title: string
    description: string | null
    url: string | null
    imageUrl: string | null
  }[]
}

export interface LinkItem {
  id: string;
  platform: AllowedPlatform;
  url: string;
}

export type AllowedPlatform = "github" | "linkedin" | "twitter" | "website" | "youtube";

export interface ActionStateProjects {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  imageUrl?: string;
  data?: {
  projects?: Array<{
    id: string;
    title: string;
    description?: string | null;
    url?: string | null;
    imageUrl?: string | null;
  }>;
};
}
export interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  imageUrl?: string;
  data?: string | Record<string, unknown>;
}
 
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
  description?: string | null
  url?: string | null
  imageUrl?: string | null
}
