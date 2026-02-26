# Phase 2: Decompose

**Objective**: Break each fundamental piece into sub-components, cost them, and rank optimization candidates.

Use sub-agents
---

## Sacred Rules in Play
- **Rule 5** — only ONE candidate will proceed to Phase 4. The ranked list is not a to-do list.
- **Rule 6** — each component gets its own document; the priority list feeds all future loops.

---

## Tasks

### 2.0 Set Tasks

Create the following tasks before doing any other work:
- #1 Review commandments
- #2 Decompose components (sub-agents)
- #3 Cost each sub-component
- #4 Rank candidates

### 2.1 Review Commandments

Read `speed_loop/10_optimization_commandments.md`. List which commandments apply to this phase's work and why. These will be used to tag candidates in 2.4.

### 2.2 Decompose Each Fundamental Piece

Launch one Explore sub-agent per component from Phase 1. Each sub-agent should return: sub-components, what each does, its complexity, and any pattern that violates a commandment. Do not read source files yourself — wait for sub-agent findings.

For each component, write `speed_loop/fundamentals/0N_[component].md`:

```markdown
# [Component Name]

## Sub-components
### [Name]
- **Purpose / Implementation / Complexity / Cost**
- **Commandment violation**: #N — [reason]

## Optimization Candidates
| Candidate | Expected Impact | Commandment | Effort | Risk |
|-----------|-----------------|-------------|--------|------|
```

### 2.3 Cost Each Sub-component

| Metric | Value | Method |
|--------|-------|--------|
| Time % | X% | Baseline logs |
| Complexity | O(?) | Sub-agent findings |
| Data volume | N rows | Runtime observation |

### 2.4 Rank Candidates

Rank by expected improvement % descending, then by effort ascending. Tag each with the commandment(s) it violates.

- **High**: >20% — proceed to Phase 3
- **Medium**: 5–20% — proceed to Phase 3
- **Low**: <5% — mark deferred

**If all candidates are <5%**: pick the highest, proceed, and write: "All candidates LOW IMPACT. Proceeding with [X] per Rule 6 — expected: Y%."

Write summary and full priority list to `speed_loop/loop_XX/phase2_decompose.md`.

---

## Outputs

- [ ] `fundamentals/0N_[component].md` for each piece (commandments cited)
- [ ] Priority list with commandment tags and impact categories
- [ ] `phase2_decompose.md` written
- [ ] LOW IMPACT candidates marked deferred
- [ ] `README.md` updated

## Tasks to Create

Phase 3 tasks for ≥5% candidates only. Each must include: candidate name, expected %, commandment(s), risk.

**Proceed to**: `references/phase_rules/03_analyze.md`
