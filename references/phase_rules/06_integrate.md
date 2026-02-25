# Phase 6: Integrate

**Objective**: Apply verified changes to main, commit with a rollback tag, write the handoff.

---

## Sacred Rules in Play
- **Rule 6** — `phase6_integrate.md` is the permanent record. It quotes Phase 5 authorization.
- **Rule 7** — `git tag speed-loop-XX-applied` is mandatory. This is the rollback target.

Commit message must reference: loop number, improvement %, commandment satisfied.

---

## Prerequisites

- `phase5_results.md` decision: APPROVED
- All 7 Sacred Rules compliance boxes checked
- Main branch clean, all tests passing

---

## Tasks

### 6.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments
- #2 Pre-integration checklist
- #3 Apply changes
- #4 Build and test
- #5 Post-integration output diff
- #6 Commit and tag
- #7 Write phase6_integrate.md and HANDOFF.md

### 6.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to this integration and cite them in `phase6_integrate.md`.

### 6.2 Pre-Integration Checklist

- [ ] `phase5_results.md` → APPROVED, all 7 rules checked
- [ ] `git status` clean
- [ ] Tests pass on main

### 6.3 Apply Changes

Diff and apply from `test_server/` to main. Do NOT copy checkpoint instrumentation or debug config.

```bash
diff speed_loop/loop_XX/test_server/path/to/file path/to/file
# Apply
```

### 6.4 Build and Test

```bash
[build command]
[test command]
```

If tests fail: STOP, revert, investigate.

### 6.5 Post-Integration Output Diff (Rule 1 on main)

Run the benchmark plan (`speed_loop/benchmark_plan.md`) against main after applying changes. Diff against baseline — same exclusions as Phase 5. Any diff → revert and re-investigate.

```bash
diff <(jq 'del(.processing_time,.timestamps)' speed_loop/loop_XX/benchmarks/baseline_output.json) \
     <(jq 'del(.processing_time,.timestamps)' speed_loop/loop_XX/benchmarks/integrated_output.json)
```

### 6.6 Commit and Tag

```bash
git add [modified source files only — not speed_loop/]
git commit -m "Optimize [component]: [description]

Speed Loop XX — Commandment #N: [name]
Improvement: X% (p50: Ams → Bms) | Rule 1 PASS | N runs"

git tag speed-loop-XX-applied
```

### 6.7 Write `phase6_integrate.md`

```markdown
# Loop XX: Integration Record

## Authorization (from phase5_results.md)
Rule 1: PASS | All 7 rules: COMPLIANT | Improvement: X%

## Changes Applied
| File | Change |
|------|--------|
| path/to/file | [description] |

## Build & Tests
PASS — N/N tests

## Post-Integration Diff
PASS

## Commit & Tag
- Hash: [hash]
- Tag: `speed-loop-XX-applied`
- Rollback: `git revert HEAD`

## New Baseline
Total: Yms (was Xms)
```

### 6.8 Write `HANDOFF.md`

```markdown
# Loop XX → Loop XX+1 Handoff

## New Baseline
Total: Yms (was Xms, −Z%)
| Component | Time | % |
|-----------|------|---|

## Cumulative Progress
| Loop | Optimization | Δ | Total |
|------|-------------|---|-------|

## Remaining Candidates
| Rank | Candidate | Expected % | Commandment | Risk |
|------|-----------|-----------|-------------|------|

## Do NOT Retry
| Candidate | Reason | Rejected in |
|-----------|--------|-------------|

## Strategic Notes
[Architectural insight — what levers remain?]

## Start Loop XX+1
1. Read this file
2. Follow `references/phase_rules/01_understand.md`
3. Phase 1 will delete and rebuild `speed_loop/fundamentals/`
4. First candidate: [rank 1 above]
```

---

## Outputs

- [ ] Changes applied, build + tests pass
- [ ] Post-integration diff PASS (Rule 1 on main)
- [ ] Commit with loop number, %, commandment reference
- [ ] `git tag speed-loop-XX-applied` (Rule 7 ✓)
- [ ] `phase6_integrate.md` written
- [ ] `HANDOFF.md` written
- [ ] `README.md`: "Loop XX COMPLETE — X% — see HANDOFF.md"
- [ ] `fundamentals/00_overview.md` updated with new baseline
