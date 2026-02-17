import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudy,
  getCaseStudyFlow,
} from "@/lib/content";
import { DocsLayout } from "@/components/docs-layout";
import { SidebarNav } from "@/components/sidebar-nav";
import { CaseStudyFlowChart } from "@/components/case-study-flow";
import { IpBanner } from "@/components/ip-banner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getCaseStudy(slug);
    return {
      title: meta.title,
      description: `Speed Loop case study: ${meta.title}. ${meta.status === "approved" ? `${meta.improvement} improvement.` : meta.status === "skipped" ? "Skipped optimization." : "Rejected optimization."}`,
    };
  } catch {
    return { title: "Case Study" };
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "approved"
      ? "bg-primary/10 text-primary border-primary/20"
      : status === "rejected"
        ? "bg-muted text-muted-foreground/60 border-border"
        : status === "skipped"
          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
          : "bg-primary/5 text-primary/60 border-primary/15";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium border rounded ${styles}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  let study;
  try {
    study = await getCaseStudy(slug);
  } catch {
    notFound();
  }

  const flow = getCaseStudyFlow(slug);
  const allStudies = getAllCaseStudies();

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
          <p
            className="font-pixel-square text-xs font-medium tracking-wider text-muted-foreground mb-4 px-3"
          >
            CASE STUDIES
          </p>
          <SidebarNav items={sidebarItems} basePath="/case-studies" />
        </div>
      }
      toc={study.toc}
      banner={<IpBanner />}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <StatusBadge status={study.meta.status} />
          <span className="text-xs text-muted-foreground">{study.meta.date}</span>
          {study.meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1
          className="font-pixel-square text-2xl lg:text-3xl font-normal tracking-wide mb-2"
        >
          {study.meta.title}
        </h1>
        <div className="flex items-baseline gap-4 text-sm">
          {study.meta.improvement !== "none" &&
            study.meta.improvement !== "pending" && (
              <span className="text-primary font-medium">
                {study.meta.improvement.startsWith("-") || study.meta.improvement.startsWith("~")
                  ? study.meta.improvement
                  : `-${study.meta.improvement}`}
              </span>
            )}
          {study.meta.baseline_ms && (
            <span className="text-muted-foreground text-xs">
              {study.meta.baseline_ms}ms
              {study.meta.result_ms != null && ` → ${study.meta.result_ms}ms`}
            </span>
          )}
        </div>
      </div>

      {/* Skipped warning */}
      {study.meta.status === "skipped" && (
        <div className="mb-8 border border-orange-500/20 bg-orange-500/5 rounded p-4">
          <p className="text-orange-400 text-sm font-medium mb-1">Skipped</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            This loop was skipped because it wasn&apos;t a true algorithmic improvement. The application already had caching implemented at the application layer, so adding a server-side query cache on the web analytics database was redundant.
          </p>
        </div>
      )}

      {/* Flow chart */}
      {flow && (
        <div className="mb-8">
          <CaseStudyFlowChart flow={flow} status={study.meta.status} />
        </div>
      )}

      {/* Markdown content */}
      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: study.html }}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t border-border">
        {(() => {
          const idx = allStudies.findIndex((s) => s.slug === slug);
          const prev = idx > 0 ? allStudies[idx - 1] : null;
          const next = idx < allStudies.length - 1 ? allStudies[idx + 1] : null;
          return (
            <>
              {prev ? (
                <a
                  href={`/case-studies/${prev.slug}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {prev.title}
                </a>
              ) : (
                <div />
              )}
              {next ? (
                <a
                  href={`/case-studies/${next.slug}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {next.title} →
                </a>
              ) : (
                <div />
              )}
            </>
          );
        })()}
      </div>
    </DocsLayout>
  );
}
