# Case Study Template — Speed Loop Series

Use this template for each loop summary. Every phrase must earn its place.

---

## 10 Copywriting Principles

1. **Lead with the outcome.** Title and first line state the result, not the process.
2. **One insight per section.** If it takes more than 4 sentences, split or cut.
3. **Numbers over adjectives.** "-28.7%" beats "significant improvement." Every claim needs a metric.
4. **Consistent structure.** Identical headings, table formats, and section order across all entries.
5. **Hypothesis-result pairing.** State what you expected, then what happened. The gap is the insight.
6. **Explain failures honestly.** Rejected experiments build credibility. "Why it didn't work" is often the most valuable section.
7. **Cumulative narrative.** Each entry connects to the arc — where we started, where we are, how this fits.
8. **Accessible technical depth.** Describe techniques conceptually. Technical readers get the approach; non-technical readers get the tradeoff.
9. **Uniform voice and tense.** Past tense for completed work, present for explanations. No first person. No filler.
10. **Scannable layout.** Bold the status/delta. Tables for data. Blockquote for cumulative impact. Headings + bold text alone should tell the full story.

---

## File naming

`loop-{NN}.md` (e.g., `loop-01.md`)

## Frontmatter

```markdown
---
title: "Loop {NN}: {Short Title}"
loop: {NN}
status: "approved" | "rejected" | "in-progress"
improvement: "{X}%" or "none" or "~0%" or "pending"
baseline_ms: {number}
result_ms: {number or null}
date: "YYYY-MM-DD"
tags: ["query", "caching", "algorithm", "infrastructure"]
---
```

## Structure

```markdown
# Loop {NN}: {Short Title}

**Status:** Approved / Rejected / In progress
**Improvement:** -X% (Xms saved) | No measurable gain

## What changed

One paragraph. The optimization technique at a conceptual level — not code, not implementation details.

## Why we expected it to work

2-3 sentences. The hypothesis. What bottleneck did this target?

## Results

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Mean response time | Xms | Xms | -X% |
| Min response time | Xms | Xms | -X% |
| Max response time | Xms | Xms | -X% |

Include at least mean. Add min/max when available. Add pipeline metrics when relevant.

## Why it worked

OR

## Why it didn't work

2-4 sentences. Root cause of the gain or the lack of one. Technical insight, not narration.

## Cumulative impact

> Original: X,XXXms → After Loop {NN}: XXXms (XX% total reduction)
```

## Style rules

- No filler phrases ("In this loop we decided to...", "It's worth noting that...", "Interestingly...")
- Lead with the result, not the process
- Use data, not adjectives — "28.7% reduction" not "significant improvement"
- Keep tables tight — only include rows that matter
- One insight per section
- Do not disclose file paths, function names, or variable names from the source code
- Do not include code snippets or SQL syntax — describe techniques abstractly
- Refer to "the system" or "the pipeline" rather than specific product names
- Spell out abbreviations on first use (e.g., "common table expression (CTE)")
- Use `→` not `->` in cumulative impact lines
- Past tense for completed work, present tense for explanations
- No first person ("we" is acceptable for the hypothesis section only)
