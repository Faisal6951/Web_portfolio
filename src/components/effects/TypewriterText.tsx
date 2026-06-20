"use client";

import { useStaticTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  prefix?: string;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className,
  showCursor = true,
  prefix = "",
}: TypewriterTextProps) {
  const displayed = useStaticTypewriter(text, speed, delay);

  return (
    <span className={cn("font-mono", className)}>
      {prefix && (
        <span className="text-blood-red mr-2">{prefix}</span>
      )}
      {displayed}
      {showCursor && (
        <span className="animate-blink ml-0.5 text-blood-red">▋</span>
      )}
    </span>
  );
}
