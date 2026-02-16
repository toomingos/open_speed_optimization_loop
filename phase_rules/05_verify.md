# Phase 5: Verify

**Objective**: Verify that optimization preserves output integrity and achieves performance improvement.

---

## Prerequisites

- Phase 4 complete
- Test environment running with optimization
- Baseline output captured
- Test output captured

---

## Tasks

### 5.1 Output Integrity Verification

Compare outputs between baseline and optimized environments.

#### 5.1.1 Capture Baseline Output

```bash
# Run against main environment
curl -X POST http://localhost:MAIN_PORT/api/endpoint \
  -H "Content-Type: application/json" \
  -d @test_payload.json \
  > baseline_output.json

# Get result when complete
curl http://localhost:MAIN_PORT/api/endpoint/{request_id}/result \
  > baseline_result.json
```

#### 5.1.2 Capture Test Output

```bash
# Run against test environment
curl -X POST http://localhost:TEST_PORT/api/endpoint \
  -H "Content-Type: application/json" \
  -d @test_payload.json \
  > test_output.json

# Get result when complete
curl http://localhost:TEST_PORT/api/endpoint/{request_id}/result \
  > test_result.json
```

#### 5.1.3 Compare Results

```bash
# Remove timing fields for comparison (adjust field names)
jq 'del(.processing_time, .timestamps)' baseline_result.json > baseline_clean.json
jq 'del(.processing_time, .timestamps)' test_result.json > test_clean.json

# Compare
diff baseline_clean.json test_clean.json
```

**SACRED RULE**: Any difference here is a FAILURE. Do not proceed.

### 5.2 Semantic Comparison (if needed)

For floating-point values:

```python
import json

def compare_values(baseline, test, epsilon=1e-9):
    for key in baseline:
        b_val = baseline[key]
        t_val = test[key]
        if isinstance(b_val, float) and isinstance(t_val, float):
            if abs(b_val - t_val) > epsilon:
                return False, f"Value mismatch for {key}: {b_val} vs {t_val}"
        elif b_val != t_val:
            return False, f"Value mismatch for {key}: {b_val} vs {t_val}"
    return True, "All values match"
```

### 5.3 Performance Measurement

Compare checkpoint timings:

| Checkpoint | Baseline (ms) | Optimized (ms) | Delta | % Change |
|------------|---------------|----------------|-------|----------|
| phase_1 | | | | |
| phase_2 | | | | |
| phase_N | | | | |
| **total** | | | | |

Calculate:
- Delta = Optimized - Baseline (negative = improvement)
- % Change = (Delta / Baseline) × 100

### 5.4 Statistical Significance

Run multiple iterations (5-10) to account for variance:

```bash
for i in {1..10}; do
  ./run_benchmark.sh >> measurements.csv
done
```

Calculate:
- Mean improvement
- Standard deviation
- 95% confidence interval

###  Results

Update `5.5 Documentloop_XX/results.md`:

```markdown
# Loop XX Results

## Optimization
[Description of what was optimized]

## Output Verification
- [ ] Baseline captured
- [ ] Test captured
- [ ] Diff comparison: PASS/FAIL
- [ ] Semantic comparison: PASS/FAIL

## Performance Results

| Metric | Baseline | Optimized | Improvement |
|--------|----------|-----------|-------------|
| Total time | Xms | Yms | Z% |
| Phase 1 | Xms | Yms | Z% |
| ... | | | |

## Statistical Confidence
- Samples: N
- Mean improvement: X%
- Std deviation: Y%
- 95% CI: [A%, B%]

## Decision
- [ ] APPROVED for integration
- [ ] REJECTED (reason: ...)
- [ ] NEEDS ITERATION (reason: ...)
```

---

## Outputs

- [ ] Output comparison complete
- [ ] Performance measurements recorded
- [ ] Statistical analysis done
- [ ] Results document updated
- [ ] Decision made (approve/reject/iterate)

---

## Verification Checklist

Before approving for integration:

- [ ] Zero output differences (or within epsilon)
- [ ] Positive performance improvement (negative delta)
- [ ] Statistically significant results
- [ ] No regressions in any phase
- [ ] Edge cases tested

---

## Decision Matrix

| Output Match | Performance | Decision |
|--------------|-------------|----------|
| Match | Improved | **APPROVE** |
| Match | Same | Evaluate effort vs benefit |
| Match | Worse | REJECT |
| No Match | Any | **REJECT** |

---

## Task Management

At the end of this phase:

1. Update results document
2. Create integration task if approved
3. Create iteration task if needs work
4. Close task if rejected

---

## Next Phase Criteria

Phase 5 is complete when:

1. Output verification passes
2. Performance is measured
3. Decision is documented
4. Next steps are clear

**Proceed to**: [Phase 6: Integrate](./06_integrate.md) (if approved)
