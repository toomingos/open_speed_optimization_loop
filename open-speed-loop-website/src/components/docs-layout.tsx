"use client";

import { useState } from "react";
import type { TocEntry } from "@/lib/content";
import { TableOfContents } from "./toc";

interface DocsLayoutProps {
  sidebar: React.ReactNode;
  toc: TocEntry[];
  banner?: React.ReactNode;
  children: React.ReactNode;
}

export function DocsLayout({ sidebar, toc, banner, children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-[95rem] mx-auto px-4 lg:px-8">
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Mobile sidebar toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 left-4 z-50 bg-primary text-primary-foreground p-2.5 rounded-lg shadow-lg"
          aria-label="Toggle sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <title>Menu</title>
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          />
        )}

        {/* Left sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-[73px] left-0 z-40 lg:z-0 w-[260px] h-screen lg:h-[calc(100vh-73px)] overflow-y-auto border-r border-border bg-background pt-6 pb-8 px-4 transition-transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 px-4 lg:px-12 max-w-[800px]">
          {banner}
          {children}
        </main>

        {/* Right TOC */}
        <aside className="hidden xl:block w-[200px] shrink-0 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto py-8 pl-4">
          <TableOfContents entries={toc} />
        </aside>
      </div>
    </div>
  );
}
