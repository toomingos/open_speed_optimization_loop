---
title: "Loop 12: Group Boundary Simplification"
loop: 12
status: "rejected"
improvement: "none"
baseline_ms: 712
result_ms: 629
date: "2026-02-14"
tags: ["query", "algorithm"]
---

# Loop 12: Group Boundary Simplification

**Status:** Rejected
**Improvement:** No measurable gain (correctness failure)

## What changed

Replaced a descending row-number window function used for group boundary detection with a simpler max-timestamp comparison. Instead of identifying the final record in each group via a descending sort, the system checks whether each record's timestamp equals the group maximum. This targets the most expensive remaining window function: a full descending sort across every partition.

## Why we expected it to work

The descending row number is only ever checked for equality with 1 (identifying the final record). A max-timestamp comparison produces the same result without requiring a full sort pass, reducing the window function count and associated overhead. Initial benchmarks showed an 11.7% improvement.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Execution time | 712ms | 629ms | -11.7% |
| Output correctness | -- | -- | Incorrect |

## Why it didn't work

When multiple records share the exact same timestamp at a group boundary, the original approach assigns the boundary marker to exactly one record (arbitrary but singular). The max-timestamp approach marks all tied records, producing incorrect downstream output. This is not a rare edge case -- the test data contains batched records that arrive simultaneously. Output correctness is non-negotiable; the 11.7% gain does not justify incorrect results.

## Cumulative impact

> Original: 1,829ms →After Loop 09: ~500ms (72.7% total reduction, unchanged)
