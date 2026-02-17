---
title: "Loop 03: Batch Query with Shared CTEs"
loop: 03
status: "rejected"
improvement: "none"
baseline_ms: 1177
result_ms: 1205
date: "2026-02-11"
tags: ["query"]
---

# Loop 03: Batch Query with Shared CTEs

**Status:** Rejected
**Improvement:** No measurable gain (+2.4% regression)

## What changed

The two parallel queries shared identical common table expressions computed independently. This loop merged them into a single query using a discriminator column and UNION ALL, so the shared CTEs would be computed once instead of twice.

## Why we expected it to work

Both queries repeated the same expensive CTE chain. Computing those CTEs once and reusing them within a single statement should reduce total database CPU and potentially improve latency by 5-10%.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 1177ms | 1205ms | +2.4% |
| Min response time | 786ms | 1008ms | +28.2% |
| Max response time | 1726ms | 1689ms | -2.1% |

## Why it didn't work

The database processes independent parallel queries across multiple cores. Merging them into a single query with UNION ALL forced sequential processing of the final aggregation branches, negating the CTE-sharing benefit. Parallel execution from Loop 02 already leverages the database's native concurrency more effectively than any single-query restructuring can.

## Cumulative impact

> Original: 1,829ms → After Loop 03: 852ms (53.4% total reduction, unchanged)
