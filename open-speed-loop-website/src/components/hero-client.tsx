"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/copy-button";

const INSTALL_COMMAND =
  "npx skills add https://github.com/toomingos/open_speed_optimization_loop --skill speed-loop";

export function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <span>{displayed}</span>;
}

export function InstallCommand() {
  return (
    <div className="not-prose w-full max-w-2xl">
      <div className="flex mt-1 items-center gap-2 bg-background border border-border p-2 text-sm">
        <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-foreground font-mono">
          {INSTALL_COMMAND}
        </div>
        <CopyButton text={INSTALL_COMMAND} />
      </div>
    </div>
  );
}
