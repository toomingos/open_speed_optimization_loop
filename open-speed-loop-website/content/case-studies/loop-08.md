---
title: "Loop 08: CTE Re-execution Elimination (Second Pass)"
loop: 08
status: "approved"
improvement: "22.1%"
baseline_ms: 961
result_ms: 749
date: "2026-02-14"
tags: ["query", "algorithm"]
---

# Loop 08: CTE Re-execution Elimination (Second Pass)

**Status:** Approved
**Improvement:** -22.1% (212ms saved on cold queries)

## What changed

Applied the same CTE linearization pattern from Loop 07 one level downstream. A downstream CTE was still referenced by two consumers -- an aggregation to find a derived position and a join to filter by that position. Replaced both with a single window function that computes the position in one pass, eliminating the double-reference.

## Why we expected it to work

Pipeline analysis still showed 4 Union blocks (2 logical re-executions) after Loop 07. The downstream CTE was referenced twice, causing the full upstream chain -- including multiple upstream operations -- to execute twice. Eliminating this duplication should halve the remaining re-executions.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time (cold) | 961ms | 749ms | -22.1% |
| MergeTreeSelect operations | ~16 | 8 | -50% |
| Pipeline Union blocks | 4 | 2 | -50% |

## Why it worked

Pipeline complexity dropped by half -- from 4 Union blocks to 2 (the irreducible minimum for pipeline parallelism). The GROUP BY plus JOIN was replaced by a window function that shares an existing partition, adding negligible compute while removing an entire re-execution of the upstream chain. Four of five cold runs showed 211-281ms improvement; the single near-tie run is attributable to shared infrastructure variance.

## Cumulative impact

> Original: 1,829ms → After Loop 08 (cold): ~550ms (70.0% total reduction)
