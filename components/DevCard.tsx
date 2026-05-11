"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GitBranch, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dev } from "@/types";

type Props = { dev: Dev };

export default function DevCard({ dev }: Props) {
  return (
    <Card className="relative flex flex-col bg-[#161b27] border-[#1e2535] hover:border-[#2e3a50] transition-colors">
      {dev.available && (
        <div className="absolute top-4 right-4">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full bg-green-400/10 border-green-400/30 text-green-400 text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Disponible
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3 pr-28">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center",
              "text-white font-bold text-base shrink-0",
              dev.color
            )}
          >
            {dev.initials}
          </div>
          <div>
            <p className="font-bold text-[#e8eaf0] leading-snug">{dev.name}</p>
            <p className="text-[#6b7a99] text-sm mt-0.5">
              {dev.role} · {dev.location}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <p className="text-[#8892a4] text-sm leading-relaxed line-clamp-2">
          {dev.bio}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {dev.skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="text-xs font-medium bg-[#1e2535] border-[#2a3347] text-[#8892a4]"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="bg-[#1e2535] flex flex-col gap-0 pt-0 px-6 pb-5">
        <Separator className="mb-4 bg-[#1e2535]" />

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {dev.github && (
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#6b7a99] hover:text-[#e8eaf0] transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {dev.portfolio && (
              <a
                href={dev.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#6b7a99] hover:text-[#e8eaf0] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> Portfolio
              </a>
            )}
            {dev.linkedin && (
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#6b7a99] hover:text-[#e8eaf0] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
          </div>
          <span className="text-xs text-[#4a5568] font-mono">
            /{dev.slug}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}