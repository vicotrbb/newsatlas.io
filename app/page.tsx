"use client";

import Map from "./components/Map";
import { Navbar } from "./components/nav";
import { useState } from "react";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <section className="h-[calc(100vh-64px)]">
        <Map zoom={1} searchTerm={searchTerm} />
      </section>
    </>
  );
}
