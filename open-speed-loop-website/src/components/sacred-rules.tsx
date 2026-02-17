const RULES = [
  {
    number: 1,
    title: "Output Integrity",
    desc: "Same inputs must produce same outputs. An optimization that changes behavior is a bug.",
  },
  {
    number: 2,
    title: "Verification Checkpoints",
    desc: "Every optimization must be measured. No merge without quantitative evidence.",
  },
  {
    number: 3,
    title: "Correctness Over Speed",
    desc: "A 10x speedup that produces wrong results is a failure. No \"close enough\" tolerance.",
  },
  {
    number: 4,
    title: "Test Isolation",
    desc: "Optimizations are tested in isolation before integration. Main codebase is never modified until verified.",
  },
  {
    number: 5,
    title: "One Per Iteration",
    desc: "Each iteration tests exactly one optimization. Isolate variables to understand what works.",
  },
  {
    number: 6,
    title: "Document Everything",
    desc: "Every iteration produces a hypothesis, implementation, measurements, analysis, and decision.",
  },
  {
    number: 7,
    title: "Rollback Readiness",
    desc: "Every change must be reversible. Version control rollback is always possible.",
  },
];

export function SacredRules() {
  return (
    <section className="mb-32">
      <div className="flex items-center gap-3 mb-8">
        <h2
          className="font-pixel-square text-xl font-normal tracking-wide"
        >
          SACRED RULES
        </h2>
        <div className="h-px bg-border flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {RULES.map((rule) => (
          <article
            key={rule.number}
            className="p-5 border border-border hover:border-muted-foreground/20 transition-colors duration-300 group"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span
                className="font-pixel-square text-2xl text-primary/60 group-hover:text-primary transition-colors"
              >
                {String(rule.number).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-medium">{rule.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              {rule.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
