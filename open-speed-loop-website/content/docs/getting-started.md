---
title: "Getting Started"
description: "Install and run the Open Speed Loop skill for AI-powered performance optimization."
---

## Installation

```bash
npx skills add toomingos/open_speed_optimization_loop --skill speed-loop
```

Or install from [skills.sh/toomingos/open_speed_optimization_loop/speed-loop](https://skills.sh/toomingos/open_speed_optimization_loop/speed-loop).

## Quick Start

Once installed, tell your AI agent:

```
read references/start.md
```

The agent reads the skill definition, sacred rules, phase guides, and example optimization commandments — then follows the structured methodology automatically.

## The Loop

Open Speed Loop is a **six-phase continuous loop**. Each iteration targets exactly one optimization:

| Phase | Name | Purpose |
|-------|------|---------|
| 1 | **Understand** | Map every component, measure baseline, identify bottlenecks |
| 2 | **Decompose** | Break components into sub-parts, rank candidates by impact vs effort |
| 3 | **Analyze** | Deep-dive the top candidate, design a verification plan |
| 4 | **Implement** | Build the optimization in an isolated test environment |
| 5 | **Verify** | Compare outputs for correctness, measure performance with statistics |
| 6 | **Integrate** | Merge proven changes, update baseline, archive loop artifacts |

Before the first loop, the agent researches your system and produces a tailored set of **optimization commandments** that govern every decision.

## Sacred Rules

Seven rules that can never be violated, regardless of speedup magnitude:

1. **Output Integrity** — Same inputs must produce same outputs
2. **Verification Checkpoints** — Every optimization requires quantitative before-and-after measurements
3. **Correctness Over Speed** — A faster system that produces wrong results is a failed system
4. **Test Isolation** — Main codebase is never modified until verified in a separate environment
5. **One Per Iteration** — Each loop tests exactly one change to isolate causation
6. **Document Everything** — Every iteration produces a hypothesis, measurements, and decision
7. **Rollback Readiness** — Every change is committed and tagged for easy reversion

## Default Optimization Commandments

The agent creates project-specific commandments before loop 1. Defaults cover:

1. **Measure Percentiles, Not Averages** — Track p50, p95, p99
2. **Choose the Right Storage Engine** — Match storage to access pattern
3. **Design for Data Locality** — Co-locate related data
4. **Partition to Eliminate Hotspots** — Distribute load evenly
5. **Precompute Derived Data** — Trade storage for query-time computation
6. **Skip Data You Don't Need** — Filter early, prune columns
7. **Batch for Throughput, Stream for Latency** — Match processing model to requirements
8. **Use Replication Strategically** — Scale reads, reduce latency
9. **Encode Data Compactly** — Binary formats and compression
10. **Correctness Is Non-Negotiable** — Diff outputs before and after every change

## Directory Structure

```
speed_loop/
├── 10_optimization_commandments.md
├── sacred_rules.md
├── phase_rules/
│   ├── 01_understand.md
│   ├── 02_decompose.md
│   ├── 03_analyze.md
│   ├── 04_implement.md
│   ├── 05_verify.md
│   └── 06_integrate.md
├── fundamentals/
│   ├── 00_overview.md
│   └── 01_[component].md
├── loop_01/
│   ├── test_environment/
│   ├── benchmarks/
│   └── results.md
└── archive/
    └── ...
```

`fundamentals/` is rebuilt at the start of each loop. Each `loop_XX/` contains the isolated test environment and results. Completed loops move to `archive/`.

## Checkpoint Format

Every optimization emits structured checkpoint logs:

```
[CHECKPOINT] job_id={id} phase={phase_name} elapsed_ms={time} memory_mb={usage}
```

Minimum positions: processing start, each phase completion, processing end. These feed into verification measurements during Phase 5.
