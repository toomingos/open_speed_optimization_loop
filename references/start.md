# Speed Loop Start

Welcome to the Speed Loop. This framework provides a structured approach to optimizing complex data processing systems through systematic, one-optimization-at-a-time iterations.

## Getting Started

1. **Set Tasks**: Create the following tasks before doing any other work. Tasks 5 and 6 are loop 1 only — mark them skipped on subsequent loops.
   - #1 Explore the flow (sub-agent)
   - #2 Setup speed_loop/ directory
   - #3 Confirm git is clean
   - #4 Define benchmark plan
   - #5 Web research for stack (loop 1 only)
   - #6 Write 10 Optimization Commandments (loop 1 only)
   - #7 Read framework documents
   - #8 Start Phase 1

2. **Explore the Flow**: Launch an Explore sub-agent for `[FLOW]`. It should return: tech stack (language, databases, frameworks), main processing stages, entry point file(s), and data flow (what comes in, what goes out, what the heavy operations are). Do not read source files yourself — wait for the sub-agent's summary.

3. **Setup**: If `speed_loop/` does not exist at the project root, create it and add it to `.gitignore`. If it already exists, read `speed_loop/loop_[last]/HANDOFF.md` and skip to step 7.

4. **Define Benchmark Plan**: Ask the user: "How should I run this flow for benchmarking? Describe the steps to trigger one complete execution — e.g., a server request with parameters, a CLI command, a script, or a sequence of actions. Include any setup needed (starting a server, seeding data, etc.)." Write the answer to `speed_loop/benchmark_plan.md` with: setup steps (if any), how to trigger one run, how to capture output, and what "done" looks like. If the file already exists from a previous loop, read it and confirm with the user it's still correct.

5. **Web Research**: Search for optimization techniques specific to the detected stack — `"[database] query optimization"`, `"[language] [bottleneck type] performance"` — before writing the commandments.

6. **Create The 10 Optimization Commandments**: The commandments are **engineering principles** — not optimization ideas. They are general best practices for building fast systems on this tech stack, drawn from systems design knowledge and web research. They guide *how to think* about every loop, not *what to do* in this loop. Don't be specifc and focus on high level principles.

   Read `references/10_optimization_commandments_example.md` as a model of the format and depth. Using the sub-agent's findings and your web research, write 10 principles that answer: "What are the fundamental truths about building fast [tech stack] systems?" Write to `speed_loop/10_optimization_commandments.md`. These will be cited in every phase.

7. **Review the Framework**: Read these documents — you will cite them throughout every phase:
   - `references/sacred_rules.md` — the 7 inviolable rules
   - `speed_loop/10_optimization_commandments.md` — your project commandments

8. **Start**: Follow `references/phase_rules/01_understand.md`.
