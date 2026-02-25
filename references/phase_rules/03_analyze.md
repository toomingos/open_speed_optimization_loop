# Phase 3: Analyze

**Objective**: Select one candidate, analyze it fully, and design a verification plan.

---

## Sacred Rules in Play
- **Rule 1** — every candidate needs a risk assessment for output changes before any code is written. Unmitigable risk = REJECTED here.
- **Rule 3** — no verification plan = not ready for Phase 4.
- **Rule 5** — select exactly ONE candidate. Two inseparable candidates = one optimization or two loops.

---

## Tasks

### 3.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments
- #2 Select candidate
- #3 Deep dive analysis (sub-agent)
- #4 Write verification plan

### 3.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to the selected candidate and why. Every section in `phase3_analysis.md` must cite: "Satisfies Commandment #N because [reason]."

### 3.2 Select the Single Candidate

Pick the top ≥5% candidate from Phase 2. Document the selection table:

| Candidate | Expected % | Commandment | Effort | Risk | Status |
|-----------|-----------|-------------|--------|------|--------|
| [Selected] | X–Y% | #N | Low | Low | **Selected** |
| [Deferred] | A–B% | #N | High | Med | Deferred — [reason] |

### 3.3 Deep Dive Analysis

Launch an Explore sub-agent to retrieve: exact code paths, file:line references, allocation points, and query calls for the selected candidate. Do not read source files yourself — wait for the sub-agent's findings.

Write to `speed_loop/loop_XX/phase3_analysis.md`:

**Current Implementation** — code paths and mechanics from sub-agent findings.

**Proposed Change** — before/after pseudocode, files to modify, any public interface changes (flag as risk).

**Risk Assessment (Rule 1)**
| Risk | Affected output fields | Mitigation |
|------|----------------------|------------|
| [risk] | [fields] | [mitigation] |

If any risk has no mitigation: STOP, choose the next candidate.

**Commandment Justification** — "Satisfies Commandment #N because [reason]."

**Effort** — files changed, LOC delta, new dependencies.

### 3.4 Verification Plan

- Benchmark plan: `speed_loop/benchmark_plan.md`
- Comparison: byte diff / epsilon=1e-9 for floats
- Fields to exclude: [timing fields, request IDs]
- Edge cases: ≥3 additional inputs
- Checkpoint locations: [where to add timing logs]
- Success criteria: measured ≥2%, expected ≥5%

---

## Outputs

- [ ] Single candidate selected with rationale
- [ ] `phase3_analysis.md` written (Rule 1 risk assessment + commandment justification)
- [ ] Verification plan complete with success criteria
- [ ] `README.md` updated with selected candidate name

## Tasks to Create

One Phase 4 task: files to modify, checkpoint locations, link to verification plan, note "Rule 5 — this change only."

**Proceed to**: `references/phase_rules/04_implement.md`
