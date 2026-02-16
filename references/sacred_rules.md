# Sacred Rules

These rules are **INVIOLABLE**. No optimization, no matter how impressive its speedup, may violate these constraints. They exist to ensure that speed improvements are real improvements, not regressions disguised as progress.

---

## Rule 1: Output Integrity Must Be Preserved

**The same inputs must produce the same outputs.**

This is the foundational rule. An optimization that changes behavior is not an optimization—it's a bug.

### What This Means

- Data structures must remain identical (entities, relationships, values)
- Computed results must match within acceptable tolerance (e.g., floating-point epsilon)
- Filtering logic must include/exclude the same elements
- Output formats must be byte-identical (excluding timing fields)

### Verification Protocol

1. Capture baseline output from current implementation
2. Apply optimization to test environment
3. Run identical request against test environment
4. Compare outputs using `diff` or semantic comparison
5. **REJECT** if any difference detected

---

## Rule 2: Verification Checkpoints Are Mandatory

**Every optimization must be measured.**

No optimization is merged without quantitative evidence of improvement.

### Required Measurements

| Metric | Baseline | After | Delta |
|--------|----------|-------|-------|
| Total processing time | Xms | Yms | (Y-X)/X % |
| Phase 1 time | Xms | Yms | (Y-X)/X % |
| Phase 2 time | Xms | Yms | (Y-X)/X % |
| Phase N time | Xms | Yms | (Y-X)/X % |
| Memory peak | X MB | Y MB | (Y-X)/X % |

### Checkpoint Logging Format

```
[CHECKPOINT] job_id={} phase={} elapsed_ms={} memory_mb={}
```

Checkpoints must be present at:
- Processing start
- Each phase completion
- Processing end

---

## Rule 3: Speed Gains Without Correctness Are Rejected

**A 10x speedup that produces wrong results is a failure.**

If during verification any output difference is detected:

1. **STOP** the integration process
2. Document the difference
3. Either:
   - Fix the optimization to produce correct output, OR
   - Abandon the optimization entirely

There is no "close enough" for algorithm output.

---

## Rule 4: Test Environment Isolation

**Optimizations are tested in isolation before integration.**

The main codebase is never modified until an optimization is:

1. Implemented in isolated test environment
2. Verified for output correctness
3. Measured for performance improvement
4. Documented in `results.md`

### Test Environment Requirements

- Complete copy of source with checkpoint instrumentation
- Independent configuration (different package name if applicable)
- Can run alongside main environment on different port
- No shared state with main environment

---

## Rule 5: One Optimization Per Iteration

**Isolate variables to understand what works.**

Each Speed Loop iteration tests exactly one optimization:

- Single change to test environment
- Measure impact in isolation
- Document specific improvement
- Understand why it helped (or didn't)

**Anti-pattern**: "I'll apply 5 optimizations and see if it's faster"
**Pattern**: "This optimization reduces Phase X time by 35%"

---

## Rule 6: Document Everything

**Future iterations depend on current documentation.**

Every Speed Loop iteration produces:

1. **Hypothesis**: What we expect to improve and why
2. **Implementation**: What code changed
3. **Measurements**: Before/after metrics
4. **Analysis**: Why did it work (or not work)?
5. **Decision**: Apply to main, iterate, or abandon

---

## Rule 7: Rollback Readiness

**Every change must be reversible.**

Before applying an optimization to main:

1. Commit current state
2. Apply optimization in single commit
3. Tag with appropriate markers
4. If issues arise, version control rollback is always possible

---

## Enforcement

These rules are enforced through:

1. **Phase gates**: Each phase rule document includes verification steps
2. **Comparison scripts**: Automated output comparison
3. **Checkpoint logging**: Quantitative measurement
4. **Review process**: Document review before main integration

---

## When Rules Conflict

If you believe a Sacred Rule should be bent for a specific case:

1. Document the conflict explicitly
2. Get explicit user approval
3. Add compensating verification (e.g., relaxed epsilon for floating point)
4. Document the exception in `results.md`

**Default**: When in doubt, follow the rules strictly.
