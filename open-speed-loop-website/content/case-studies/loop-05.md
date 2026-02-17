---
title: "Loop 05: PREWHERE Bot Filter"
loop: 05
status: "rejected"
improvement: "none"
baseline_ms: 1079
result_ms: 1095
date: "2026-02-14"
tags: ["query", "infrastructure"]
---

# Loop 05: PREWHERE Bot Filter

**Status:** Rejected
**Improvement:** No measurable gain

## What changed

Moved the default bot-exclusion filter from the WHERE clause into the PREWHERE clause across all query builders. When an explicit PREWHERE already exists, the database engine does not automatically promote additional WHERE conditions into it -- so the bot filter was being evaluated after full column reads instead of at the granule-scanning stage.

## Why we expected it to work

The bot column is a lightweight 1-byte integer. Evaluating it during the PREWHERE phase should allow the engine to skip reading heavier columns for bot-flagged rows before they reach the main filter stage. Bot traffic typically accounts for 2-10% of rows.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 1,079ms | 1,095ms | +1.5% |
| Min response time | 1,036ms | 1,018ms | -1.7% |
| Max response time | 1,126ms | 1,167ms | +3.6% |

## Why it didn't work

The bot ratio in the test dataset was too low to produce measurable I/O savings. With the vast majority of rows already passing the bot filter, almost no granules could be skipped. The +1.5% delta falls within normal variance. The execution bottleneck remains in aggregation and join logic, not row filtering.

## Cumulative impact

> Original: 1,829ms → After Loop 05: 852ms (53.4% total reduction, unchanged from Loop 02)
