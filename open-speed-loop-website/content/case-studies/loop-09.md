---
title: "Loop 09: CTE Double-Reference Elimination (Third Pass)"
loop: 09
status: "approved"
improvement: "9.1%"
baseline_ms: 496
result_ms: 451
date: "2026-02-14"
tags: ["query", "caching"]
---

# Loop 09: CTE Double-Reference Elimination (Third Pass)

**Status:** Approved
**Improvement:** -9.1% (45ms saved)

## What changed

Replaced a GROUP BY aggregation with a window function to eliminate the last CTE double-reference in the query pipeline. A downstream CTE was referenced by two consumers, forcing the database to re-execute the entire upstream chain twice. Adding a window function inside the same CTE collapsed both references into one, removing the need for a separate aggregation step and its associated join.

## Why we expected it to work

The same CTE re-execution pattern had already yielded 33.3% and 22.1% gains in Loops 07 and 08. Pipeline analysis confirmed the upstream chain was still being duplicated: 8 table read operations where 4 would suffice, and 5 join operations where 2 were the structural minimum.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time (cold) | 496ms | 451ms | -9.1% |
| Table read operations | 8 | 4 | -50% |
| Join operations | 5 | 2 | -60% |
| Pipeline stages | 210 | 137 | -35% |

## Why it worked

Eliminating the double-reference halved the physical table reads and removed three join operators from the execution plan. The window function piggybacks on an existing partition pass, so it adds negligible cost while replacing an entire CTE that required its own GROUP BY, HAVING filter, and join back into the main chain. The gains are smaller than Loops 07-08 because this was the last and least expensive re-execution instance.

## Cumulative impact

> Original: 1,829ms →After Loop 09: ~500ms (72.7% total reduction)
