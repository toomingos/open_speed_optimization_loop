# Speed Loop Start

Optimize data processing systems through structured, one-optimization-at-a-time loops. Follow instructions precisely — discipline at every step.

## Getting Started

0. Before you start, if the user hasn't defined what flow is to imporved, stop and ask.

1. **Set These Tasks** 
   - #1 Explore the flow (sub-agent)
   - #2 Setup speed_loop/ directory
   - #3 Confirm git is clean
   - #4 Define benchmark plan
   - #5 Web research for stack
   - #6 Write 10 Optimization Commandments
   - #7 Read framework documents
   - #8 Start Phase 1

2. **Explore the Flow**: Launch an Explore sub-agent for flow. Return: tech stack, main processing stages, entry points, and data flow (inputs, outputs, heavy operations). Do not read source files yourself — wait for the sub-agent.

3. **Setup**: If `speed_loop/` doesn't exist, create it and add to `.gitignore`. If it exists, read `speed_loop/loop_[last]/HANDOFF.md` and skip to step 7.

4. **Define Benchmark Plan**: Ask the user how to trigger one complete execution (command, request, script, setup needed). Write to `speed_loop/benchmark_plan.md`: setup steps, trigger command, output capture, and done criteria. If the file exists, confirm with the user it's still correct.

5. **Web Research**: Launch an agent to rssearch for general speed optimization techniques in data complex systems. The agent shouldn't have context of what the flow is. This is because the 10 Optimization Commandments need to be general and not specific to the libraries in the flow's stack or it's inner components. 

6. **Create 10 Optimization Commandments**: Engineering principles, not optimization ideas. High-level best practices for building fast systems on this stack — guiding *how to think*, not *what to do*. Read `references/10_optimization_commandments_example.md` as a model. Write to `speed_loop/10_optimization_commandments.md`.

7. **Review the Framework**: Read and cite throughout every phase:
   - `references/sacred_rules.md` — the 7 inviolable rules
   - `speed_loop/10_optimization_commandments.md` — project commandments

8. **Start**: Follow `references/phase_rules/01_understand.md`.
