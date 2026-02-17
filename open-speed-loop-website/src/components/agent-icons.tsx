"use client";

import ClaudeColor from "@lobehub/icons/es/Claude/components/Color";
import CursorMono from "@lobehub/icons/es/Cursor/components/Mono";
import OpenAIMono from "@lobehub/icons/es/OpenAI/components/Mono";
import GeminiColor from "@lobehub/icons/es/Gemini/components/Color";

const agents = [
  { Icon: ClaudeColor, label: "Claude Code" },
  { Icon: CursorMono, label: "Cursor" },
  { Icon: OpenAIMono, label: "Codex" },
  { Icon: GeminiColor, label: "Gemini" },
];

export function AgentIcons() {
  return (
    <div className="flex items-center gap-2">
      {agents.map((agent) => (
        <div
          key={agent.label}
          className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center"
          title={agent.label}
        >
          <agent.Icon size={14} />
        </div>
      ))}
      <span className="text-muted-foreground text-xs ml-1">& more</span>
    </div>
  );
}
