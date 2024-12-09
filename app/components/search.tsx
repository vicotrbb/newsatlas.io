"use client";

import { useState } from "react";

export function Search({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative flex items-center ml-4">
      <input
        type="text"
        placeholder="Search locations..."
        className="px-4 py-1 text-sm bg-transparent border rounded-md border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          onSearch(value);
        }}
      />
    </div>
  );
}
