---
title: "Loop 11: CTE Consolidation"
loop: 11
status: "rejected"
improvement: "none"
baseline_ms: 632
result_ms: 605
date: "2026-02-14"
tags: ["query"]
---

# Loop 11: CTE Consolidation

**Status:** Rejected
**Improvement:** No measurable gain (-4.2%, below threshold)

## What changed

Merged two CTEs into one by relocating a partitioned count window function into an upstream CTE that already operates on the same partition key. This eliminated 2 CTEs (from 9 to 7), removed 1 sort pass, and reduced 3 sorting operations in the execution plan. Two related transformations now happen in a single CTE instead of two sequential ones.

## Why we expected it to work

The merged window functions share the same partition key, so consolidating them should eliminate a redundant scatter-and-sort pass. Fewer CTEs also means fewer materialization boundaries for the query engine to manage.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time (cold, 14 runs) | 632ms | 605ms | -4.2% |
| Median response time | 620ms | 592ms | -2.6% |
| Sorting passes | 21 | 18 | -3 |
| CTEs | 9 | 7 | -2 |

## Why it didn't work

Two consecutive rejected loops (10 and 11) confirm the SQL-side optimization surface is exhausted. Structural pipeline improvements no longer translate to wall-clock gains because the query engine already handles CTE boundaries efficiently. The remaining ~600ms cold query time is dominated by irreducible computation: data reads, multiple window functions with partition sorts, and aggregation. Further gains require changes to the data model or pre-computation strategies, not SQL restructuring.

## Cumulative impact

> Original: 1,829ms →After Loop 09: ~500ms (72.7% total reduction, unchanged)
