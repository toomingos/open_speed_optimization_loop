# Phase 3: Analyze

**Objective**: Deep analysis of top optimization candidates to determine implementation approach and expected impact.

---

## Prerequisites

- Phase 2 complete
- Fundamental documents written
- Optimization candidates prioritized

---

## Tasks

### 3.1 Select Top Candidates

From the prioritized list, select the top 3-5 candidates for this iteration:

| Candidate | Expected Impact | Effort | Risk |
|-----------|-----------------|--------|------|
| [Candidate A] | X-Y% | Low/Medium/High | Low/Medium/High |
| [Candidate B] | X-Y% | Low/Medium/High | Low/Medium/High |
| [Candidate C] | X-Y% | Low/Medium/High | Low/Medium/High |

### 3.2 Deep Dive Analysis

For each candidate, analyze:

#### 3.2.1 Current Implementation
- Read the exact code paths
- Understand data flow
- Identify allocation points
- Count iterations

#### 3.2.2 Proposed Changes
- Describe the optimization clearly
- Pseudocode or design sketch
- Identify affected files
- List required changes

#### 3.2.3 Risk Assessment
- What could break?
- What edge cases exist?
- How do we verify correctness?

#### 3.2.4 Effort Estimation
- Lines of code changed
- New dependencies required
- Testing complexity

### 3.3 Design Verification Approach

For each optimization chosen:

1. **Input capture**: How to capture test inputs
2. **Output comparison**: How to compare before/after
3. **Edge cases**: What unusual inputs to test
4. **Timing points**: Where to add checkpoints

### 3.4 Document Analysis

Create analysis document for each candidate:

```markdown
# Analysis: [Optimization Name]

## Current State
[Description of current implementation]

## Proposed Change
[Description of optimization]

## Expected Impact
- Time reduction: X-Y%
- Memory impact: +/-Z%

## Implementation Steps
1. Step 1
2. Step 2
...

## Verification Plan
- Test inputs: [description]
- Comparison method: [byte/semantic]
- Success criteria: [metrics]

## Risks and Mitigations
| Risk | Mitigation |
|------|------------|
| ... | ... |
```

---

## Outputs

- [ ] Top candidates selected
- [ ] Analysis document per candidate
- [ ] Verification plan per candidate
- [ ] Implementation order determined

---

## Analysis Checklist

For each optimization candidate:

- [ ] Current code fully understood
- [ ] Change clearly designed
- [ ] Impact estimated with reasoning
- [ ] Risks identified
- [ ] Verification approach defined
- [ ] Implementation steps listed

---

## Task Management

At the end of this phase:

1. Create implementation tasks for Phase 4
2. Order tasks by priority and dependencies
3. Assign verification requirements to each

---

## Next Phase Criteria

Phase 3 is complete when:

1. All selected candidates have analysis documents
2. Implementation order is determined
3. Verification plans are defined
4. Phase 4 tasks are created

**Proceed to**: [Phase 4: Implement](./04_implement.md)
