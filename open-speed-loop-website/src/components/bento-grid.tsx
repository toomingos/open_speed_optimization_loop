import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/content";

const RULES = [
  { number: 1, title: "Output Integrity", desc: "Same inputs, same outputs." },
  { number: 2, title: "Verification Checkpoints", desc: "No merge without evidence." },
  { number: 3, title: "Correctness Over Speed", desc: "Wrong results = failed system." },
  { number: 4, title: "Test Isolation", desc: "Verify before integration." },
  { number: 5, title: "One Per Iteration", desc: "Isolate causation." },
  { number: 6, title: "Document Everything", desc: "Hypothesis, measurements, decision." },
  { number: 7, title: "Rollback Readiness", desc: "Every change is reversible." },
];

const PHASES = [
  { name: "Understand", desc: "Map & measure" },
  { name: "Decompose", desc: "Prioritize candidates" },
  { name: "Analyze", desc: "Deep-dive" },
  { name: "Implement", desc: "Build isolated" },
  { name: "Verify", desc: "Compare & prove" },
  { name: "Integrate", desc: "Merge & archive" },
];

interface BentoGridProps {
  caseStudies: CaseStudyMeta[];
}

export function BentoGrid({ caseStudies }: BentoGridProps) {
  const firstBaseline = caseStudies[0]?.baseline_ms ?? 0;
  const lastApproved = [...caseStudies]
    .filter((d) => d.status === "approved" && d.result_ms != null)
    .pop();
  const finalMs = lastApproved?.result_ms ?? firstBaseline;
  const reductionPct = firstBaseline > 0
    ? Math.round(((firstBaseline - finalMs) / firstBaseline) * 100)
    : 0;

  return (
    <section className="mb-16 sm:mb-32">
      {/*
        Desktop (lg): 4-column, 2-row grid
        Row 1: Sacred Rules (2 cols, 2 rows) | Speed Gain (2 cols)
        Row 2: Sacred Rules (cont.)          | Six-Phase Loop (2 cols)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {/* Sacred Rules — tall left card */}
        <div className="sm:col-span-2 lg:row-span-2 bg-background p-6 lg:p-8 flex flex-col">
          <p className="font-pixel-square text-xs tracking-[0.2em] text-muted-foreground uppercase mb-8">
            Sacred Rules
          </p>
          <div className="space-y-6 flex-1">
            {RULES.map((rule) => (
              <div key={rule.number} className="flex gap-4">
                <span className="font-pixel-square text-lg text-primary shrink-0 leading-none mt-0.5 tabular-nums">
                  {String(rule.number).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-medium leading-snug">
                    {rule.title}
                  </p>
                  <p className="text-muted-foreground text-xs font-light mt-1 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/docs/getting-started"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-6 inline-flex items-center gap-1"
          >
            Read the full methodology →
          </Link>
        </div>

        {/* Speed Gain — hero stat */}
        <div className="sm:col-span-2 bg-background p-6 lg:p-8 flex flex-col justify-between">
          <p className="font-pixel-square text-xs tracking-[0.2em] text-muted-foreground uppercase mb-4">
            Case Study
          </p>
          <div>
            <span className="font-pixel-square text-4xl sm:text-5xl lg:text-6xl font-normal text-primary tracking-tight">
              {reductionPct}%
            </span>
            <span className="text-xl text-muted-foreground ml-2">faster</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="inline-flex items-center px-2.5 py-1 border border-border rounded text-sm tabular-nums text-muted-foreground">
              {firstBaseline.toLocaleString()}ms
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="inline-flex items-center px-2.5 py-1 border border-primary/30 rounded text-sm tabular-nums text-primary font-medium">
              {finalMs.toLocaleString()}ms
            </span>
            <Link
              href="/case-studies/loop-01"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              {caseStudies.length} loops →
            </Link>
          </div>
        </div>

        {/* Six-Phase Loop */}
        <div className="sm:col-span-2 bg-background p-5 lg:p-6 flex flex-col">
          <h3 className="text-sm font-medium mb-4">Six-Phase Loop</h3>
          <div className="grid grid-cols-3 gap-px bg-border">
            {PHASES.map((phase, i) => (
              <div key={phase.name} className="bg-background p-3 flex flex-col gap-1">
                <span className="font-pixel-square text-xs text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{phase.name}</span>
                <span className="text-muted-foreground text-xs font-light">{phase.desc}</span>
              </div>
            ))}
          </div>
          <Link
            href="/docs/getting-started"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-4 inline-flex items-center gap-1"
          >
            Learn the methodology →
          </Link>
        </div>
      </div>
    </section>
  );
}
