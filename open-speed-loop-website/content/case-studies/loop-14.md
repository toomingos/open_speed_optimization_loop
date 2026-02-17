---
title: "Loop 14: Map Signal Early Termination"
loop: 14
status: "approved"
improvement: "3.66%"
baseline_ms: 531
result_ms: 509
date: "2026-02-15"
tags: ["algorithm"]
---

# Loop 14: Map Signal Early Termination

**Status:** Approved
**Improvement:** -3.66% (22.6ms saved)

## What changed

The map signal algorithm previously ran a fixed number of iterations regardless of convergence state. This loop added convergence detection so the algorithm terminates as soon as signals stabilize, significantly reducing the average iteration count.

## Why we expected it to work

Iterative map signaling on small-to-medium maps typically converges well before the fixed iteration limit. Each unnecessary iteration processes the full map structure. Cutting iteration count significantly should translate directly to proportional time savings in the signaling phase.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 531.5ms | 508.9ms | -3.66% |
| Median response time | 504.0ms | 490.0ms | -2.8% |
| Signal iterations | reduced | ~60% fewer | -59% |

## Why it worked

The algorithm converged well before the fixed iteration limit, with signal changes dropping to negligible levels. The ~60% iteration reduction delivered a clear gain at the algorithm level, but the job-level improvement is modest because query execution consumes 88% of total time. Output integrity verified -- the eliminated iterations produced no meaningful signal changes.

## Cumulative impact

> Original: 1,829ms →After Loop 14: 509ms (72.2% total reduction)
