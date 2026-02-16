# Phase 1: Understand

**Objective**: Establish a complete understanding of the fundamental pieces that comprise the data processing pipeline.

Use sub-agents as needed.

---

## Prerequisites (First Loop)

- Speed Loop framework created
- 10 Commandments document exists
- Sacred Rules document exists
- Read them all
- Create or update speed_loop/fundamentals folder

### Prerequisites (>1 Loops)

- Read 10 Commandments and Sacred Rules documents
- Delete speed_loop/fundamentals folder
- According to  Speed Loop framework, 10 Commandments and Sacred Rules use sub agents to rewrite speed_loop/fundamentals with updated architecture

---

## Tasks

### 1.1 Identify Fundamental Pieces

List all major components that contribute to processing time in your system.

### 1.2 Read Current Implementation

For each fundamental piece, read the relevant source files.

### 1.3 Establish Baseline Metrics

Run the current implementation using a canonical test payload and record:

```bash
# Adjust for your API endpoint and port
curl -X POST http://localhost:PORT/api/endpoint \
  -H "Content-Type: application/json" \
  -d @test_payload.json
```

Test payload should be a representative real-world request for your system.

Record:
- Total processing time per job/request
- Time spent in each phase
- Memory usage patterns
- Database query statistics (if applicable)

### 1.4 Document Current State

Create/update `speed_loop/fundamentals/00_overview.md` with:

- List of fundamental pieces
- Estimated time distribution
- Known bottlenecks
- Current architecture diagram (if applicable)

---

## Outputs

- [ ] `speed_loop/fundamentals/00_overview.md` - Overview document
- [ ] Baseline metrics recorded
- [ ] Source files identified for each piece

---

## Task Management

At the end of this phase:

1. Create tasks for Phase 2 decomposition
2. One task per fundamental piece
3. Each task should specify files to analyze

---

## Next Phase Criteria

Phase 1 is complete when:

1. All fundamental pieces are identified
2. Overview document is written
3. Baseline metrics are captured
4. Phase 2 tasks are created

**Proceed to**: [Phase 2: Decompose](./02_decompose.md)
