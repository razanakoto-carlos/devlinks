"use client";

import DevCard from "./DevCard";
import type { DevPage } from "@/types";

type Props = { devs: DevPage[] };
export default function DevList({ devs }: Props) {
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