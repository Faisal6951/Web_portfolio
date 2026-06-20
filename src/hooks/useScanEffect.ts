"use client";

import { useEffect, useRef } from "react";

export function useScanEffect(active: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    el.style.setProperty("--scan-opacity", "1");
    return () => {
      el.style.setProperty("--scan-opacity", "0");
    };
  }, [active]);

  return ref;
}
