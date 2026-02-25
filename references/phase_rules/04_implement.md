# Phase 4: Implement

**Objective**: Implement the one selected optimization inside `test_server/`.

---

## Sacred Rules in Play
- **Rule 4** — every change goes in `test_server/` ONLY. If you're editing outside it, STOP.
- **Rule 5** — exactly one change. New improvements found during implementation go in `phase4_implement.md` under "Future Candidates" — not in code.
- **Rule 7** — confirm main branch is clean before starting.

Write at the top of `phase4_implement.md`: "Isolated to `test_server/` (Rule 4). One optimization only (Rule 5)."

---

## Tasks

### 4.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments
- #2 Set up test environment
- #3 Add checkpoint instrumentation
- #4 Implement
- #5 Capture output

### 4.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to this implementation and cite them in `phase4_implement.md`.

### 4.2 Set Up Test Environment

Populate `speed_loop/loop_XX/test_server/` as a runnable copy:
- Different port than main
- Same env vars and database connections
- Independent package name if your stack requires it

### 4.3 Add Checkpoint Instrumentation

Add timing logs at entry, each major stage, and exit — in both main and test environments. Adapt the log format to your stack's logging conventions, but ensure start/stage/complete markers exist. These logs are the evidence for Phase 5.

### 4.4 Implement

- [ ] Change fully understood before writing
- [ ] Minimal, focused changes — no unrelated cleanup
- [ ] All public interfaces preserved
- [ ] Non-obvious changes commented with rationale
- [ ] Code compiles / passes linter

### 4.5 Capture Output

Both environments must be running. Use the benchmark plan from `speed_loop/benchmark_plan.md`. Run each and save:
- `speed_loop/loop_XX/benchmarks/baseline_output.json` — main environment
- `speed_loop/loop_XX/benchmarks/test_output.json` — test environment
- `speed_loop/loop_XX/benchmarks/baseline.json` and `optimized.json` — timing data

Write findings to `phase4_implement.md`: files modified, checkpoint locations, build status (PASS/FAIL), future candidates discovered (if any).

---

## Outputs

- [ ] `test_server/` running (Rule 4 ✓)
- [ ] Checkpoints in both environments
- [ ] One optimization implemented (Rule 5 ✓)
- [ ] `benchmarks/baseline_output.json` and `test_output.json` captured
- [ ] `phase4_implement.md` written with isolation confirmation
- [ ] `README.md` updated

## Tasks to Create

One Phase 5 task: output file paths, checkpoint log paths, note "Rule 1 — any diff = REJECT."

**Proceed to**: `references/phase_rules/05_verify.md`
