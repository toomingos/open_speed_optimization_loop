# Phase 4: Implement

**Objective**: Implement optimizations in the isolated test environment.

---

## Prerequisites

- Phase 3 complete
- Analysis documents exist
- Verification plans defined
- Test environment created

---

## Tasks

### 4.1 Set Up Test Environment

Create isolated test environment:

```
speed_loop/loop_XX/test_environment/
├── [config files]
├── [source copy]
└── [start script]
```

Configuration:
- Different configuration to avoid conflicts
- Different port than main (if applicable)
- Same environment variables needed

### 4.2 Add Checkpoint Instrumentation

Add timing checkpoints to key processing files:

```typescript
// Example (adjust for your language/framework)
const checkpoints = {
  start: Date.now(),
  phases: {} as Record<string, number>
};

function checkpoint(name: string) {
  checkpoints.phases[name] = Date.now() - checkpoints.start;
  console.log(`[CHECKPOINT] phase=${name} elapsed_ms=${checkpoints.phases[name]}`);
}
```

### 4.3 Implement One Optimization

**SACRED RULE**: One optimization per iteration.

Implementation checklist:
- [ ] Understand the change completely
- [ ] Make minimal code changes
- [ ] Preserve all public interfaces
- [ ] Add any necessary tests
- [ ] Verify compilation

### 4.4 Run Test Environment

```bash
# Adjust for your setup
cd speed_loop/loop_XX/test_environment
[build command]
[run command]
```

### 4.5 Capture Checkpoint Logs

Run test request and capture output:

```bash
# Adjust for your API endpoint
curl -X POST http://localhost:TEST_PORT/api/endpoint \
  -H "Content-Type: application/json" \
  -d @test_payload.json \
  | tee loop_XX/benchmarks/test_output.json

# Capture logs
[log capture command] > loop_XX/benchmarks/checkpoints.log
```

---

## Outputs

- [ ] Test environment running
- [ ] Checkpoint instrumentation added
- [ ] Optimization implemented
- [ ] Test output captured
- [ ] Checkpoint logs captured

---

## Implementation Guidelines

### DO:
- Keep changes minimal and focused
- Comment any non-obvious optimizations
- Preserve existing behavior exactly
- Log timing at each checkpoint

### DON'T:
- Refactor unrelated code
- Change public APIs
- Modify multiple components at once
- Skip checkpoint logging

---

## Checkpoint Locations

Required checkpoints:

1. **processing_start**: When processing begins
2. **phase_1_complete**: After first phase
3. **phase_2_complete**: After second phase
4. **phase_N_complete**: After each subsequent phase
5. **processing_complete**: Before returning result

---

## Task Management

At the end of this phase:

1. Update task with implementation status
2. Create verification task for Phase 5
3. Record any unexpected findings

---

## Next Phase Criteria

Phase 4 is complete when:

1. Test environment compiles and runs
2. Checkpoints produce timing logs
3. Optimization is implemented
4. Test output is captured

**Proceed to**: [Phase 5: Verify](./05_verify.md)
