"use client";

import DevCard from "./DevCard";
import type { Dev } from "@/types";

const DEVS: Dev[] = [
  {
    id: "1",
    name: "Carlos Razanakoto",
    role: "Fullstack JavaScript",
    location: "Madagascar",
    bio: "Développeur fullstack passionné par les architectures propres et les produits qui ont un impact réel.",
    skills: ["React", "Next.js", "Laravel", "TypeScript", "PostgreSQL"],
    available: true,
    github: "#",
    portfolio: "#",
    slug: "carlos",
    initials: "C",
    color: "bg-teal-700",
  },
  {
    id: "2",
    name: "Sofia Andriamaro",
    role: "Frontend Engineer",
    location: "Antananarivo",
    bio: "Spécialiste UI/UX avec une obsession pour les animations fluides et les interfaces accessibles.",
    skills: ["Vue.js", "Nuxt", "Figma", "GSAP"],
    available: true,
    github: "#",
    slug: "sofia",
    initials: "S",
    color: "bg-slate-600",
  },
  {
    id: "3",
    name: "Marc Ravoavy",
    role: "Backend Engineer",
    location: "Remote",
    bio: "Architecte API REST et microservices, fan de clean code et de tests automatisés.",
    skills: ["Node.js", "NestJS", "Docker", "Redis"],
    available: false,
    github: "#",
    linkedin: "#",
    slug: "marc",
    initials: "M",
    color: "bg-violet-700",
  },
  {
    id: "4",
    name: "Lena Rakotondrabe",
    role: "Mobile Developer",
    location: "Fianarantsoa",
    bio: "React Native et Flutter, je construis des apps mobiles performantes pour Android et iOS.",
    skills: ["React Native", "Flutter", "Firebase"],
    available: true,
    github: "#",
    slug: "lena",
    initials: "L",
    color: "bg-amber-700",
  },
  {
    id: "5",
    name: "Tsiory Randria",
    role: "DevOps · Cloud Engineer",
    location: "Remote",
    bio: "Infrastructure as Code, CI/CD et Kubernetes. Je fais en sorte que vos apps ne tombent jamais.",
    skills: ["Kubernetes", "Terraform", "AWS", "GitHub Actions"],
    available: false,
    github: "#",
    linkedin: "#",
    slug: "tsiory",
    initials: "T",
    color: "bg-sky-700",
  },
  {
    id: "6",
    name: "Haja Rabetokotany",
    role: "Fullstack PHP",
    location: "Toamasina",
    bio: "Laravel et Livewire, je construis des apps web robustes avec une attention particulière à la sécurité.",
    skills: ["Laravel", "Livewire", "MySQL", "PHP"],
    available: false,
    github: "#",
    slug: "haja",
    initials: "H",
    color: "bg-rose-700",
  },
];

type Props = { devs?: Dev[] };

export default function DevList({ devs = DEVS }: Props) {
  return (
    <section className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[#e8eaf0] font-bold text-lg">Développeurs</h2>
        <span className="text-[#6b7a99] text-sm">{devs.length} profils</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devs.map((dev) => (
          <DevCard key={dev.id} dev={dev} />
        ))}
      </div>
    </section>
  );
}