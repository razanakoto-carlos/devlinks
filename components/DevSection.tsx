"use client";
import { useState } from "react";
import DevSearch from "./DevSearch";
import DevList from "./DevList";
import type { DevPage } from "@/types";

type Props = { devs: DevPage[] };

export default function DevSection({ devs }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered = devs.filter((dev) => {
    const matchSearch =
      search === "" ||
      dev.name.toLowerCase().includes(search.toLowerCase()) ||
      dev.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchFilter =
      activeFilter === "Tous" ||
      dev.skills.some((s) => s.toLowerCase() === activeFilter.toLowerCase());

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      <DevSearch
        search={search}
        onSearch={setSearch}
        activeFilter={activeFilter}
        onFilter={setActiveFilter}
      />
      <DevList devs={filtered} />
    </div>
  );
}