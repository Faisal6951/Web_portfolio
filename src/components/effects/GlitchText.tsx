"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  intensity?: "low" | "medium" | "high";
}

export function GlitchText({
  text,
  className,
  as: Tag = "span",
  intensity = "medium",
}: GlitchTextProps) {
  return (
    <Tag
      className={cn("relative inline-block", className)}
      data-text={text}
      style={
        {
          "--glitch-text": `"${text}"`,
        } as React.CSSProperties
      }
    >
      {text}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 text-blood-red",
          intensity === "low" && "glitch-low",
          intensity === "medium" && "glitch-medium",
          intensity === "high" && "glitch-high"
        )}
        style={{
          animation: `glitch1 ${intensity === "high" ? "0.2s" : intensity === "medium" ? "0.35s" : "0.6s"} infinite`,
          content: `"${text}"`,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-ancient-gold"
        style={{
          animation: `glitch2 ${intensity === "high" ? "0.25s" : intensity === "medium" ? "0.4s" : "0.7s"} infinite`,
          animationDelay: "0.05s",
        }}
      >
        {text}
      </span>
    </Tag>
  );
}
