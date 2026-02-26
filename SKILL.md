---
name: speed-loop
description: "Systematically optimizes a data processing flow through iterative speed loops. Use when the user wants to improve performance of a data pipeline, query, or processing endpoint. Invoke with the flow to optimize: /speed-loop path/to/file or /speed-loop describe the flow"
---

# Speed Loop

If `$ARGUMENTS` is empty, stop and ask: "What flow or file do you want to optimize?" Do not proceed until the user provides it.

The flow to optimize is: **$ARGUMENTS**

Read `references/start.md` now. The flow above is your `[FLOW]` throughout that document.

---

## File Locations

**Framework (read-only):** `references/`
- `start.md` — entry point
- `sacred_rules.md` — 7 inviolable rules
- `10_optimization_commandments_example.md` — commandments template
- `phase_rules/01_understand.md` → `06_integrate.md`

**Working directory (gitignored):** `speed_loop/` at project root
- `speed_loop/10_optimization_commandments.md` — project-specific commandments
- `speed_loop/fundamentals/` — architecture docs, rebuilt each loop
- `speed_loop/loop_01/`, `loop_02/`, ... — one directory per iteration

## Loop Directory Structure

```
loop_XX/
├── README.md               # status + navigation
├── phase1_understand.md
├── phase2_decompose.md
├── phase3_analysis.md
├── phase4_implement.md
├── phase5_results.md       # verification + decision
├── phase6_integrate.md     # only if APPROVED
├── HANDOFF.md
├── benchmarks/
│   ├── baseline.json
│   ├── optimized.json
│   └── comparison.md
└── test_server/
```

Always `lowercase_snake_case`. Never ALL_CAPS filenames.

## Sacred Rules

See `references/sacred_rules.md`. Always cite by number when justifying decisions.

1. **Output Integrity** — same inputs → identical outputs
2. **Verification Checkpoints** — every optimization measured quantitatively
3. **Correctness First** — wrong results = failure, regardless of speedup
4. **Test Environment Isolation** — changes only in `test_server/` until Phase 6
5. **One Optimization Per Iteration** — exactly one change per loop
6. **Document Everything** — hypothesis, implementation, measurements, decision
7. **Rollback Readiness** — every change reversible via git tag

## The 10 Commandments

See `references/10_optimization_commandments_example.md`. These are engineering principles — general best practices for building fast systems on this stack. Always cite by number (#1–#10) when documenting optimization decisions.
