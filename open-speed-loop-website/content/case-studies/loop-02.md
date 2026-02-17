---
title: "Loop 02: Parallel Query Execution"
loop: 02
status: "approved"
improvement: "20.4%"
baseline_ms: 1071
result_ms: 852
date: "2026-02-11"
tags: ["query", "infrastructure"]
---

# Loop 02: Parallel Query Execution

**Status:** Approved
**Improvement:** -20.4% (218.4ms saved)

## What changed

The two remaining database queries -- Query A and Query B -- were executed sequentially, each taking ~500ms. The pipeline was restructured to dispatch both queries concurrently, so total wall-clock time equals the slower of the two rather than their sum.

## Why we expected it to work

Sequential execution meant Query A waited idle while Query B completed. Both queries are independent with no data dependency. Running them in parallel should cut the query phase roughly in half.

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | 1071ms | 852ms | -20.4% |
| Min response time | 870ms | 801ms | -7.9% |
| Max response time | 1244ms | 976ms | -21.5% |

## Why it worked

The database handles concurrent connections well, and both queries executed simultaneously without contention. Initial testing flagged an apparent output inconsistency, but investigation revealed this was pre-existing system variability present in sequential execution as well -- the parallelization introduced no new inconsistencies.

## Cumulative impact

> Original: 1,829ms → After Loop 02: 852ms (53.4% total reduction)
