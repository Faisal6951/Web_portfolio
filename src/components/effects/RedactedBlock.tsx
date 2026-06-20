"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RedactedBlockProps {
  children: React.ReactNode;
  className?: string;
  revealOnHover?: boolean;
}

export function RedactedBlock({
  children,
  className,
  revealOnHover = true,
}: RedactedBlockProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={cn("relative inline-block cursor-crosshair", className)}
      onMouseEnter={() => revealOnHover && setRevealed(true)}
      onMouseLeave={() => revealOnHover && setRevealed(false)}
      data-hover
    >
      <span
        className={cn(
          "transition-opacity duration-300",
          revealed ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center",
          "transition-opacity duration-300",
          revealed ? "opacity-0" : "opacity-100"
        )}
      >
        <span
          className="inline-block bg-text-primary rounded-sm select-none"
          style={{ width: "100%", height: "1.1em" }}
        />
      </span>
    </span>
  );
}

export function RedactedText({ text, className }: { text: string; className?: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      className={cn(
        "relative inline cursor-crosshair group",
        className
      )}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      data-hover
    >
      <span className={cn("transition-opacity duration-200", revealed ? "opacity-100 text-ancient-gold" : "opacity-0")}>
        {text}
      </span>
      {!revealed && (
        <span className="absolute inset-0 inline-flex items-center">
          {"█".repeat(Math.ceil(text.length * 0.8))}
        </span>
      )}
    </span>
  );
}
