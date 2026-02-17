---
title: "Loop 07: CTE Re-execution Elimination"
loop: 07
status: "approved"
improvement: "33.3%"
baseline_ms: 1049
result_ms: 700
date: "2026-02-14"
tags: ["query", "algorithm"]
---

# Loop 07: CTE Re-execution Elimination

**Status:** Approved
**Improvement:** -33.3% (349ms saved on cold queries)

## What changed

Replaced a common table expression (CTE) that was referenced twice in the query tree -- causing the database engine to re-execute the entire upstream chain (two full table scans plus a join) at each reference point. A window function now computes a derived flag in a single pass over the base data set, reducing the CTE reference structure from a tree to a linear chain.

## Why we expected it to work

Pipeline analysis revealed 32 table-read operations where the engine inlined CTEs at every reference point. The base CTE was referenced twice -- once for each of two downstream processing stages -- doubling the entire I/O and join workload. Collapsing both references into one pass should halve table reads.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time (cold) | 1,049ms | 700ms | -33.3% |
| Mean response time (cached) | 176ms | 192ms | comparable |

## Why it worked

The window function piggybacks on an existing partition sort, adding negligible overhead while eliminating a full DISTINCT operation and an INNER JOIN. Every cold run showed improvement (227ms to 478ms faster), even with the test server disadvantaged by running first on each date range (no page cache warming). Cached runs are unaffected because the query cache returns stored results without re-executing SQL.

## Cumulative impact

> Original: 1,829ms → After Loop 07 (cold): ~700ms (61.7% total reduction)
