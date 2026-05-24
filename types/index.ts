export type Dev = {
  id: string;
  skills?: string[];
  slug?: string;
  initials?: string;
  color?: string;
  name: string;
  username: string;
  role?: string;
  location?: string;
  bio?: string;
  available?: boolean;
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

export type AvatarColor =
  | "green"
  | "indigo"
  | "rose"
  | "amber"
  | "sky"
  | "violet";
