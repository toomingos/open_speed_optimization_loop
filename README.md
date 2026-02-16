# Speed Loop Framework

A systematic framework for optimizing complex data processing systems through iterative speed loops.

## Installation

```bash
npx skills add toomingos/open_speed_optimization_loop --skill speed-loop
```

Or visit: https://skills.sh/toomingos/open_speed_optimization_loop/speed-loop

## For AI Agents

This skill is designed for AI coding agents (Claude Code, Cursor, Windsurf, etc.). When installed, the agent will automatically have access to:

- **SKILL.md** - The main skill definition with overview and flow
- **references/** - Framework files the agent can read

### Quick Start

1. Agent reads `references/start.txt` for instructions
2. Agent creates `speed_loop/10_optimization_commandments.md` for your codebase
3. Agent follows the six phases in `references/phase_rules/`

## Framework Structure

```
├── SKILL.md                 # Skill definition (what AI agents see)
├── README.md                # This file
└── references/             # Framework files
    ├── start.txt           # Agent instructions
    ├── sacred_rules.md     # Inviolable rules
    ├── 10_optimization_commandments_example.md  # Example principles
    └── phase_rules/       # Six phases
        ├── 01_understand.md
        ├── 02_decompose.md
        ├── 03_analyze.md
        ├── 04_implement.md
        ├── 05_verify.md
        └── 06_integrate.md
```

## The Speed Loop

```
START → Read start.txt → Create 10 Optimization Commandments → 
Read sacred_rules + phase_rules → Enter Speed Loop

SPEED LOOP (repeat):
Phase1 Understand → Phase2 Decompose → Phase3 Analyze → 
Phase4 Implement → Phase5 Verify → Phase6 Integrate → REPEAT
```

Each iteration = ONE optimization → Measure → Verify → Integrate

## Key Principles

- **Correctness First**: Same inputs must produce same outputs
- **One Optimization Per Iteration**: Isolate variables to understand impact
- **Measure Everything**: Quantitative evidence required for all improvements
- **Verify Before Integrating**: Test in isolation before main codebase changes

## Framework Agnostic

Works with any:
- Programming language
- Web framework
- Database or storage system
- Data processing pipeline

## License

MIT
