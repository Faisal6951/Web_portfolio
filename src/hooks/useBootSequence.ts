"use client";

import { useState, useEffect } from "react";

export type BootStage =
  | "idle"
  | "scanning"
  | "decrypting"
  | "unlocking"
  | "booting"
  | "complete";

const BOOT_STAGES: { stage: BootStage; duration: number }[] = [
  { stage: "scanning", duration: 800 },
  { stage: "decrypting", duration: 1200 },
  { stage: "unlocking", duration: 800 },
  { stage: "booting", duration: 600 },
  { stage: "complete", duration: 0 },
];

export function useBootSequence() {
  const [stage, setStage] = useState<BootStage>("idle");
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyBooted = sessionStorage.getItem("archive-booted");
    if (alreadyBooted) {
      setStage("complete");
      setHasBooted(true);
      return;
    }

    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_STAGES.forEach(({ stage: s, duration }, i) => {
      const timer = setTimeout(() => {
        setStage(s);
        if (s === "complete") {
          sessionStorage.setItem("archive-booted", "1");
          setHasBooted(true);
        }
      }, elapsed);
      timers.push(timer);
      elapsed += duration;
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return { stage, hasBooted };
}
