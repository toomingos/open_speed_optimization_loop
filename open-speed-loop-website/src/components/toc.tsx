"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content";

interface TocProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const entry of entries) {
      const el = document.getElementById(entry.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground tracking-wider mb-3">
        ON THIS PAGE
      </p>
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={`#${entry.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`block text-xs leading-relaxed transition-colors ${
            entry.level === 3 ? "pl-3" : ""
          } ${
            activeId === entry.id
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {entry.text}
        </a>
      ))}
    </nav>
  );
}
