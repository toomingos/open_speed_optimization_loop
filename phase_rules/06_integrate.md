# Phase 6: Integrate

**Objective**: Apply verified optimizations to the main codebase.

---

## Prerequisites

- Phase 5 complete
- Optimization APPROVED
- Output integrity verified
- Performance improvement confirmed

---

## Tasks

### 6.1 Pre-Integration Checklist

Before touching main codebase:

- [ ] Results document is complete
- [ ] All verifications passed
- [ ] Performance improvement is statistically significant
- [ ] Main branch is clean (no uncommitted changes)
- [ ] Tests pass on main branch

### 6.2 Create Integration Branch

```bash
git checkout main
git pull origin main
git checkout -b speed-loop-XX-integration
```

### 6.3 Apply Changes

Transfer changes from test environment to main:

```bash
# For each modified file
diff speed_loop/loop_XX/test_environment/path/to/file path/to/file
# Apply changes manually or with patch
```

**Important**: Do NOT copy checkpoint instrumentation unless requested.

### 6.4 Verify Main Build

```bash
# Adjust for your build system
[build command]
[test command]
```

All tests must pass.

### 6.5 Integration Testing

Run the same verification as Phase 5:

1. Start main environment with optimization
2. Run test request
3. Compare output with original baseline
4. Verify performance improvement persists

### 6.6 Create Commit

```bash
git add -A
git commit -m "$(cat <<'EOF'
Optimize [component]: [brief description]

Speed Loop XX optimization applied.
- [Change 1]
- [Change 2]

Performance improvement: X% reduction in [phase]
Verification: Output integrity confirmed
EOF
)"
```

### 6.7 Tag for Rollback

```bash
git tag speed-loop-XX-applied
```

---

## Outputs

- [ ] Integration branch created
- [ ] Changes applied to main codebase
- [ ] Build passes
- [ ] Tests pass
- [ ] Integration verification complete
- [ ] Commit created
- [ ] Tag applied

---

## Rollback Procedure

If issues are discovered after integration:

```bash
git revert HEAD  # If committed
# OR
git checkout main -- path/to/affected_file  # For specific files
```

---

## Archive Loop Artifacts

After successful integration:

```bash
# Move to archive
mv speed_loop/loop_XX speed_loop/archive/loop_XX

# Or keep for reference
# Loop artifacts remain for future reference
```

---

## Post-Integration Tasks

1. **Update baseline metrics**: New measurements become the baseline
2. **Update overview**: Document the improvement in fundamentals overview
3. **Plan next loop**: Identify next optimization target
4. **Clean up**: Remove any temporary files

---

## Integration Checklist

Final verification before closing the loop:

- [ ] Main environment runs correctly
- [ ] Output matches expectations
- [ ] Performance improvement is real
- [ ] No regressions introduced
- [ ] Changes are committed
- [ ] Tag is applied
- [ ] Documentation updated

---

## Task Management

At the end of this phase:

1. Mark optimization task as completed
2. Create new task for next loop (if continuing)
3. Update any affected documentation

---

## Loop Complete

The Speed Loop iteration is complete when:

1. Optimization is in main codebase
2. Verification confirms correctness
3. Performance improvement is documented
4. Artifacts are archived
5. Next iteration is planned (or optimization complete)

---

## Continuous Improvement

After completing a loop:

1. Review what worked well
2. Note any process improvements
3. Update phase rules if needed
4. Begin next loop with Phase 1

---

## Success Metrics

Track across all loops:

| Loop | Optimization | Impact | Cumulative |
|------|-------------|--------|------------|
| 01 | [desc] | X% | X% |
| 02 | [desc] | Y% | X+Y% |
| ... | | | |

Target: Achieve meaningful cumulative improvement while maintaining correctness.
