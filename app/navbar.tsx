"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const active = "text-red-500";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4">
      <Link href="/" className={path === "/" ? active : ""}>
        Taskly
      </Link>
      <Link href="/tasks" className={path.startsWith("/tasks") ? active : ""}>
        Tasks
      </Link>
    </nav>
  );
}
