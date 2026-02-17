---
title: "Loop 04: CTE Pipeline Reduction"
loop: 04
status: "rejected"
improvement: "none"
baseline_ms: 1061
result_ms: 1047
date: "2026-02-11"
tags: ["query"]
---

# Loop 04: CTE Pipeline Reduction

**Status:** Rejected
**Improvement:** No measurable gain (-1.3%, within noise)

## What changed

The query pipeline used 11 chained common table expressions (CTEs). Two adjacent CTEs -- each applying a formatting transformation -- were merged into a single CTE using nested conditional expressions, reducing the pipeline to 10 stages.

## Why we expected it to work

Each CTE stage potentially triggers intermediate result materialization in the database. Eliminating one stage should remove one materialization pass over ~5,000-10,000 rows, saving an estimated 10-40ms per query.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 1061ms | 1047ms | -1.3% |
| Min response time | 1019ms | 1013ms | -0.6% |
| Max response time | 1096ms | 1097ms | +0.1% |

## Why it didn't work

The database query optimizer already inlines single-reference CTEs automatically. The merged CTE was never materialized as an intermediate result set in the first place, so removing it had no effect on the execution plan. The 14ms delta falls well within the 80ms measurement variance. Query-structure optimizations have reached diminishing returns after Loops 01 and 02.

## Cumulative impact

> Original: 1,829ms → After Loop 04: 852ms (53.4% total reduction, unchanged)
