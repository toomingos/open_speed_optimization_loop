# Phase 2: Decompose

**Objective**: Break down each fundamental piece into sub-components to identify specific optimization targets.

Use sub-agents as needed.

---

## Prerequisites

- Phase 1 complete
- Overview document exists
- Baseline metrics captured

---

## Tasks

### 2.1 Decompose Each Fundamental Piece

For each fundamental piece, create a detailed analysis document following this structure:

#### [Component A] (`fundamentals/01_component_a.md`)

Sub-components (customize based on your system):
- Data ingestion/loading
- Processing/transformations
- Storage/retrieval
- Output/serialization

#### [Component B] (`fundamentals/02_component_b.md`)

Sub-components (customize based on your system):
- Initialization/setup
- Core algorithm execution
- Result aggregation
- Error handling

Continue for all fundamental pieces.

### 2.2 Identify Sub-component Costs

For each sub-component, estimate:

| Metric | Value | Method |
|--------|-------|--------|
| Time % | X% | Profiling/estimation |
| Complexity | O(?) | Code analysis |
| Allocations | Many/Few | Code analysis |
| Data size | N items | Runtime observation |

### 2.3 Rank Optimization Opportunities

Create a prioritized list:

```
Priority = (Potential Improvement) × (Likelihood of Success) / (Implementation Effort)
```

Categories:
- **High Impact**: >20% improvement potential
- **Medium Impact**: 5-20% improvement potential
- **Low Impact**: <5% improvement potential

---

## Outputs

- [ ] `fundamentals/01_[component].md` (one per component)
- [ ] Prioritized optimization list

---

## Document Template

Each fundamental document should follow this structure:

```markdown
# [Component Name]

## Overview
Brief description of what this component does.

## Sub-components

### [Sub-component 1]
- **Purpose**: What it does
- **Implementation**: How it's currently done
- **Complexity**: Big-O analysis
- **Cost**: Estimated time/memory contribution

### [Sub-component 2]
...

## Current Bottlenecks
Identified performance issues.

## Optimization Candidates
Potential improvements with estimated impact.

## Dependencies
What this component depends on, what depends on it.
```

---

## Task Management

At the end of this phase:

1. Update tasks with optimization priorities
2. Create tasks for Phase 3 analysis
3. Assign impact ratings to each candidate

---

## Next Phase Criteria

Phase 2 is complete when:

1. All fundamental documents are written
2. Sub-components are identified and costed
3. Optimization candidates are prioritized
4. Phase 3 tasks are created

**Proceed to**: [Phase 3: Analyze](./03_analyze.md)
