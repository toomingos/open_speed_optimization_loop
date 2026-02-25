# Phase 5: Verify

**Objective**: Confirm output integrity first, then measure performance.

---

## Sacred Rules in Play
- **Rule 1** — diff outputs before looking at any performance numbers. Any difference = REJECTED. No exceptions.
- **Rule 2** — every performance claim backed by checkpoint logs across ≥5 runs.
- **Rule 3** — output difference means REJECTED regardless of speedup.

---

## Tasks

### 5.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments
- #2 Output diff (Rule 1 — must be first)
- #3 Performance measurement
- #4 Statistical significance
- #5 Write results

### 5.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to this verification and cite them in `phase5_results.md`. Correctness result goes first — never lead with speed.

### 5.2 Output Diff (Rule 1 — do this FIRST)

```bash
jq 'del(.processing_time, .timestamps, .duration_ms)' \
  speed_loop/loop_XX/benchmarks/baseline_output.json > /tmp/baseline_clean.json
jq 'del(.processing_time, .timestamps, .duration_ms)' \
  speed_loop/loop_XX/benchmarks/test_output.json > /tmp/test_clean.json
diff /tmp/baseline_clean.json /tmp/test_clean.json
```

Any diff output → write REJECTED in `phase5_results.md` and stop.

If your output contains floating-point values, use epsilon comparison (threshold: 1e-9) instead of byte diff to avoid false failures from rounding.

### 5.3 Performance Measurement (only if 5.2 passed)

Run ≥5 iterations against each environment using `speed_loop/benchmark_plan.md`. Collect checkpoint logs.

| Checkpoint | Baseline p50 | Optimized p50 | Δ | % |
|------------|-------------|---------------|---|---|
| stage_N    | Xms | Yms | | |
| **total**  | **Xms** | **Yms** | | |

Record p95/p99 for total. Save to `benchmarks/comparison.md`.

### 5.4 Statistical Significance

- Mean improvement %, std deviation, 95% CI (mean ± 1.96 × σ / √n)
- **Reject if mean improvement <2%** — exception: correctness fixes integrate at any gain.

### 5.5 Write `phase5_results.md`

```markdown
# Loop XX: Results

## Optimization
[What was optimized — cite Commandment #N]

## Output Integrity (Rule 1 — FIRST)
- Excluded fields: [list]
- Diff: PASS / FAIL
- **Rule 1: COMPLIANT / VIOLATION → REJECTED**

## Performance (Rule 2)
| | Baseline p50 | Optimized p50 | Δ | % |
|--|--|--|--|--|
| Total | | | | |

p95: Xms → Yms | p99: Xms → Yms

## Statistics
Samples: N | Mean: X% | σ: Y% | 95% CI: [A%, B%] | Threshold (2%): PASS/FAIL

## Sacred Rules Compliance
- [ ] Rule 1: diff PASS
- [ ] Rule 2: ≥5 runs measured
- [ ] Rule 3: no correctness regression
- [ ] Rule 4: changes in test_server/
- [ ] Rule 5: one optimization
- [ ] Rule 6: documentation complete
- [ ] Rule 7: rollback tag pending (Phase 6)

## Decision
- [ ] APPROVED
- [ ] REJECTED — [reason]
- [ ] NEEDS ITERATION — [reason]
```

All 7 rules must be checked before Phase 6.

---

## Outputs

- [ ] Diff run and documented (Rule 1 cited)
- [ ] p50/p95/p99 measured ≥5 runs (Rule 2 cited)
- [ ] `phase5_results.md` written — correctness before performance
- [ ] All 7 rules checked
- [ ] Decision documented
- [ ] `README.md` updated with decision

## Next Steps

- **APPROVED** → create Phase 6 task
- **REJECTED** → mark candidate rejected in `phase2_decompose.md`, begin next loop
- **NEEDS ITERATION** → create Phase 4 retry task with specific fix

**Proceed to**: `references/phase_rules/06_integrate.md` (APPROVED only)
