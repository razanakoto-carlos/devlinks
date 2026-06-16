import React from "react";
import { Badge } from "@/components/ui/badge";

interface SkillTagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function SkillTag({ children, className, variant = "secondary" }: SkillTagProps) {
  return (
    <Badge variant={variant} className={`px-3 py-1 font-medium ${className}`}>
      {children}
    </Badge>
  );
}