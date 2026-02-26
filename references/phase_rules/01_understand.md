# Phase 1: Understand

**Objective**: Map the pipeline, Establish a complete understanding of the fundamental pieces that comprise the data processing pipeline.

Use sub-agents.

---

## Sacred Rules in Play
- **Rule 2** — capture baseline metrics NOW. No phase proceeds without them.
- **Rule 6** — write all findings to `phase1_understand.md`.

---

## Tasks

### 1.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments and sacred rules
- #2 Create loop skeleton
- #3 Explore implementation (sub-agent)
- #4 Identify timing log locations
- #5 Add timing logs
- #6 Run benchmark plan (≥5 runs)
- #7 Document current state

### 1.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to this phase's work and why. Cite them by number in your outputs.

### 1.2 Create Loop Skeleton

Check `speed_loop/loop_*/` for the next loop number, then create:

```
speed_loop/loop_XX/
├── README.md       ← "# Loop XX\n\n**Status**: Phase 1 in progress"
├── benchmarks/
└── test_server/
```

**Loop N+1 only**: delete `speed_loop/fundamentals/` entirely and rebuild it fresh this phase.

### 1.3 Explore Implementation

Launch an Explore sub-agent to trace the data flow end-to-end through. It should return: every component that contributes to processing time, source file paths, and the sequence of operations from entry to response. Do not read source files yourself — wait for the sub-agent's findings.

### 1.4 Identify Timing Log Locations

Using the sub-agent's findings from 1.3, identify where to add timing logs: flow entry, the start and end of each major stage, and flow exit. List each location with its file and purpose before touching any code.

### 1.5 Add Timing Logs

Add a log line at each identified location. Adapt the format to your stack's logging conventions — the key requirement is that each log captures a label and elapsed time. Do not change any logic.

### 1.6 Run Benchmark Plan

Run the flow using the procedure defined in `speed_loop/benchmark_plan.md`. Run ≥5 times (Rule 2). Record from the logs: p50/p95/p99 total time, per-stage breakdown, and any observable resource signals (memory, query count).

### 1.7 Document Current State

Write `speed_loop/fundamentals/00_overview.md`:
- Components with time distribution %
- Bottlenecks ranked by contribution
- Architecture diagram (ASCII)

Write all findings and metrics to `speed_loop/loop_XX/phase1_understand.md`.

---

## Outputs

- [ ] Loop skeleton created
- [ ] `fundamentals/00_overview.md` written
- [ ] `phase1_understand.md` written with baseline p50/p95/p99 (Rule 2 cited)
- [ ] `README.md` updated with baseline summary

## Tasks to Create

One task per fundamental piece for Phase 2. Each task must include: component name, source file(s), time %.

**Proceed to**: `references/phase_rules/02_decompose.md`
