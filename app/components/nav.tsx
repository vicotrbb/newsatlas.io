import Link from "next/link";
import { Search } from "./search";

export function Navbar({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  return (
    <aside className="mb-4 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-2 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <Link
            href="/"
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
          >
            <h3 className="text-xl font-bold">News Atlas</h3>
          </Link>
          <Search onSearch={onSearch} />
        </nav>
      </div>
    </aside>
  );
}
