"use client"

import Image from "next/image"

interface AvatarDisplayProps {
  src: string | null
  name: string
  size: number
}

export function AvatarDisplay({ src, name, size }: AvatarDisplayProps) {
  const parts = name.trim().split(" ")
  const initials = `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase()

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border border-[#1e1e2e] bg-[#111118]"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div 
          className="flex h-full w-full items-center justify-center font-semibold text-emerald-400"
          style={{ fontSize: size * 0.3 }}
        >
          {initials}
        </div>
      )}
    </div>
  )
}