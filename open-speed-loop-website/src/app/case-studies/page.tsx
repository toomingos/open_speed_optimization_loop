import type { Metadata } from "next";
import {
  getAllCaseStudies,
  getCaseStudySummary,
} from "@/lib/content";
import { DocsLayout } from "@/components/docs-layout";
import { SidebarNav } from "@/components/sidebar-nav";
import { CaseStudySummaryChart } from "@/components/case-study-summary-chart";
import { IpBanner } from "@/components/ip-banner";

export const metadata: Metadata = {
  title: "Case Studies — Open Speed Loop",
  description:
    "16 optimization loops reducing response time from 1,829ms to 352ms. Full pipeline transformation, structured results, and methodology breakdown.",
};

export default async function CaseStudiesSummary() {
  const allStudies = getAllCaseStudies();
  const summary = await getCaseStudySummary();

  const sidebarItems = [
    { slug: "", title: "Summary", status: undefined as string | undefined },
    ...allStudies.map((s) => ({
      slug: s.slug,
      title: s.title,
      loop: s.loop,
      status: s.status,
    })),
  ];

  return (
    <DocsLayout
      sidebar={
        <div>
          <p className="font-pixel-square text-xs font-medium tracking-wider text-muted-foreground mb-4 px-3">
            CASE STUDIES
          </p>
          <SidebarNav items={sidebarItems} basePath="/case-studies" />
        </div>
      }
      toc={summary.toc}
      banner={<IpBanner />}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-pixel-square text-2xl lg:text-3xl font-normal tracking-wide mb-4">
          Summary
        </h1>
        <p className="text-muted-foreground text-sm font-light max-w-xl">
          1,829ms → 352ms. 16 loops, 8 approved, 7 rejected, 1 skipped.
        </p>
      </div>

      {/* Chart */}
      <div className="mb-10">
        <CaseStudySummaryChart data={allStudies} />
      </div>

      {/* Markdown content (paragraph + table) */}
      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: summary.html }}
      />
    </DocsLayout>
  );
}
