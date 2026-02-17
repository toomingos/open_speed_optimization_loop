---
title: "Loop 13: Arithmetic DESC Sort Elimination"
loop: 13
status: "rejected"
improvement: "none"
baseline_ms: 814
result_ms: 643
date: "2026-02-14"
tags: ["query", "algorithm"]
---

# Loop 13: Arithmetic DESC Sort Elimination

**Status:** Rejected
**Improvement:** No measurable gain (output correctness failure)

## What changed

The pipeline uses a descending window function to identify the last record in each group (a boundary marker). This loop replaced that descending sort with an arithmetic formula: subtract the ascending row number from the partition count to derive the equivalent descending position, eliminating one of two window function passes.

## Why we expected it to work

The descending sort duplicates work already done by the ascending sort. Mathematically, position-from-end equals total count minus position-from-start plus one. Removing the second window function should cut 5-15% from query execution time, which dominates the pipeline at 88% of total duration.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 814ms | 643ms | -21.0% |

## Why it didn't work

The formula is mathematically correct for unique values but breaks on duplicate timestamps. The database engine's internal tie-breaking within a sort direction is consistent, but the ascending and descending sorts resolve ties independently. Different records receive the boundary marker depending on sort direction, producing different downstream output. This is the same root cause that rejected Loop 12 -- duplicate timestamps make any single-pass replacement of the descending sort impossible without changing baseline output.

## Cumulative impact

> Original: 1,829ms → After Loop 13: ~500ms (72.7% total reduction, unchanged from Loop 09)
