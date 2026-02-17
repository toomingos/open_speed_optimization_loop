import { TypingText, InstallCommand } from "@/components/hero-client";
import { AgentIcons } from "@/components/agent-icons";
import { SpeedLoopFlow } from "@/components/speed-loop-flow";
import { BentoGrid } from "@/components/bento-grid";
import { CaseStudyChart } from "@/components/case-study-chart";
import { getAllCaseStudies } from "@/lib/content";

export default function Home() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="min-h-screen">
      <div className="max-w-[95rem] mx-auto px-8 py-20 lg:py-32">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          <div className="flex flex-col justify-center">
            <h1 className="font-pixel-square text-4xl lg:text-5xl font-normal leading-tight tracking-wide max-w-[600px] mb-6">
              OPEN SPEED OPTIMISATION LOOP
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed font-light mb-8 max-w-xl">
              A reusable speed optimization framework for AI agents. Proven
              patterns that turn any codebase faster, one loop at a time.
            </p>

            <InstallCommand />

            <div className="flex items-center gap-4 mt-4">
              <span className="text-muted-foreground text-xs">Works with</span>
              <AgentIcons />
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/docs/getting-started"
                className="px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 text-sm font-medium"
              >
                Get Started →
              </a>
              <a
                href="https://github.com/toomingos/open_speed_optimization_loop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-border hover:border-muted-foreground/40 hover:bg-secondary transition-all duration-200 text-sm"
              >
                GitHub →
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-border p-4 space-y-4">
              <div>
                <p className="font-pixel-square text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3">
                  Setup
                </p>

                <div className="border border-border rounded p-3">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground/30 mb-2">
                    <span className="w-2 h-2 rounded-full bg-border" />
                    <span className="w-2 h-2 rounded-full bg-border" />
                    <span className="w-2 h-2 rounded-full bg-border" />
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-muted-foreground">$ </span>
                    <TypingText text="read references/start.txt" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="animate-bounce text-muted-foreground/20"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>

              <div>
                <p className="font-pixel-square text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2">
                  Speed Loop
                </p>
                <div className="border border-border rounded p-2">
                  <SpeedLoopFlow />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Features + Sacred Rules + Speed Gain */}
        <BentoGrid caseStudies={caseStudies} />

        {/* Case Study Chart */}
        <CaseStudyChart data={caseStudies} />

        <div className="bg-dotted h-[45px] w-full mb-20" />

        {/* CTA */}
        <section className="text-center space-y-8 pb-12">
          <div className="space-y-3 max-w-lg mx-auto">
            <h2 className="font-pixel-square text-2xl font-normal tracking-wide">
              GET STARTED
            </h2>
            <p className="text-muted-foreground text-sm font-light">
              Read the docs, explore the methodology, and start optimizing.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/docs/getting-started"
              className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 text-sm font-medium"
            >
              Read the Docs →
            </a>
            <a
              href="https://github.com/toomingos/open_speed_optimization_loop"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border hover:border-muted-foreground/40 hover:bg-secondary transition-all duration-200 text-sm"
            >
              View on GitHub →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
