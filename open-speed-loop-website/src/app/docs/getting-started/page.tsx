import type { Metadata } from "next";
import { getDocsPage } from "@/lib/content";
import { DocsLayout } from "@/components/docs-layout";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Learn how to install and use the Open Speed Loop skill for AI-powered performance optimization.",
};

const DOCS_NAV = [
  { slug: "getting-started", title: "Getting Started" },
];

export default async function GettingStartedPage() {
  const page = await getDocsPage("getting-started");

  return (
    <DocsLayout
      sidebar={
        <div>
          <p
            className="font-pixel-square text-xs font-medium tracking-wider text-muted-foreground mb-4 px-3"
          >
            DOCUMENTATION
          </p>
          <SidebarNav items={DOCS_NAV} basePath="/docs" />
        </div>
      }
      toc={page.toc}
    >
      <h1
        className="font-pixel-square text-2xl lg:text-3xl font-normal tracking-wide mb-2"
      >
        {page.meta.title.toUpperCase()}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">{page.meta.description}</p>

      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </DocsLayout>
  );
}
