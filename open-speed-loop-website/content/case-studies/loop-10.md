---
title: "Loop 10: INNER JOIN to IN Subquery"
loop: 10
status: "rejected"
improvement: "none"
baseline_ms: 481
result_ms: 462
date: "2026-02-14"
tags: ["query"]
---

# Loop 10: INNER JOIN to IN Subquery

**Status:** Rejected
**Improvement:** No measurable gain (-3.9%, within noise)

## What changed

Replaced INNER JOIN group filtering with an IN subquery across both legs of the UNION ALL in the base CTE. Instead of joining against a group list, the pipeline materializes the group IDs into a hash set and checks membership during the scan. This eliminated all join operators and halved table reads in the execution plan.

## Why we expected it to work

The join machinery (hash table construction, probing, deduplication) accounted for 6 operators in the pipeline. Replacing it with a pre-materialized set should reduce overhead, especially since the group list is small and the set lookup is O(1).

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time (cold) | 481ms | 462ms | -3.9% |
| Join operations | 2 | 0 | -100% |
| Table read operations | 4 | 2 | -50% |
| Pipeline stages | 137 | 110 | -20% |

## Why it didn't work

The database already optimizes small-table joins efficiently -- building and probing a hash table for a few thousand group IDs is fast. The IN subquery approach replaces this with set materialization, which has comparable overhead. The dominant cost (~80% of execution time) sits in the window function chain with partition-based sorts that no join strategy change can affect. The 19ms delta is within the ~50ms run-to-run variance of the shared infrastructure.

## Cumulative impact

> Original: 1,829ms →After Loop 09: ~500ms (72.7% total reduction, unchanged)
