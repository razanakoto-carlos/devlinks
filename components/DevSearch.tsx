"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = [
  "Tous", "React", "Next.js", "Laravel",
  "Node.js", "TypeScript", "PostgreSQL", "Docker",
];

export default function DevSearch() {
  const [active, setActive] = useState("Tous");

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7a99] pointer-events-none" />
          <Input
            placeholder="Rechercher un développeur, une compétence…"
            className="pl-9 bg-[#161b27] border-[#1e2535] text-[#e8eaf0] placeholder:text-[#6b7a99] focus-visible:ring-green-400/30 focus-visible:border-green-400/40"
          />
        </div>

        <Button
          variant="outline"
          className="gap-2 shrink-0 bg-[#161b27] border-[#1e2535] text-[#e8eaf0] hover:bg-[#1e2535] hover:text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtrer
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Badge
            key={f}
            variant="outline"
            onClick={() => setActive(f)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all select-none",
              active === f
                ? "bg-green-400/10 border-green-400/50 text-green-400 hover:bg-green-400/15"
                : "bg-transparent border-[#1e2535] text-[#6b7a99] hover:text-[#e8eaf0] hover:border-[#2e3a50]"
            )}
          >
            {f}
          </Badge>
        ))}
      </div>
    </div>
  );
}