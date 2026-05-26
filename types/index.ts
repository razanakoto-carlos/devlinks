export type Dev = {
  id: string;
  name: string;
  username: string;
  role?: string;
  location?: string;
  bio?: string;
  available?: boolean;
};

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

export interface Project {
  id: string;
  title: string;
  stack: string;
  description: string;
}