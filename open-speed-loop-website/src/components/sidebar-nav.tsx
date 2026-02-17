"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  slug: string;
  title: string;
  loop?: number;
  status?: string;
}

interface SidebarNavProps {
  items: SidebarItem[];
  basePath: string;
}

function StatusDot({ status }: { status?: string }) {
  if (!status) return null;
  const color =
    status === "approved"
      ? "bg-emerald-500"
      : status === "rejected"
        ? "bg-red-400"
        : status === "skipped"
          ? "bg-orange-400"
          : "bg-amber-400";
  return <span className={`w-1.5 h-1.5 rounded-full ${color} shrink-0`} />;
}

export function SidebarNav({ items, basePath }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5">
      {items.map((item) => {
        const href = item.slug ? `${basePath}/${item.slug}` : basePath;
        const isActive = pathname === href;
        return (
          <Link
            key={item.slug || "__summary"}
            href={href}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-colors ${
              isActive
                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <StatusDot status={item.status} />
            <span className="truncate">
              {item.loop != null
                ? `${String(item.loop).padStart(2, "0")}. ${item.title.replace(/^Loop \d+:\s*/, "")}`
                : item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
