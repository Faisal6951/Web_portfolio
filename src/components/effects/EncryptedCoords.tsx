"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface EncryptedCoordsProps {
  className?: string;
}

function randomCoord() {
  const lat = (Math.random() * 180 - 90).toFixed(4);
  const lng = (Math.random() * 360 - 180).toFixed(4);
  return `${lat}°N ${lng}°E`;
}

export function EncryptedCoords({ className }: EncryptedCoordsProps) {
  const [coord, setCoord] = useState("ACQUIRING SIGNAL...");

  useEffect(() => {
    const interval = setInterval(() => {
      setCoord(randomCoord());
    }, 2000);
    setCoord(randomCoord());
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={cn("font-mono text-[10px] text-text-muted tracking-widest", className)}>
      {coord}
    </span>
  );
}

export function HUDOverlay() {
  const [coords, setCoords] = useState({ lat: "0.0000", lng: "0.0000" });
  const [scanPercent, setScanPercent] = useState(0);

  useEffect(() => {
    const coordInterval = setInterval(() => {
      setCoords({
        lat: (Math.random() * 180 - 90).toFixed(4),
        lng: (Math.random() * 360 - 180).toFixed(4),
      });
    }, 3000);

    const scanInterval = setInterval(() => {
      setScanPercent((p) => (p >= 100 ? 0 : p + 1));
    }, 50);

    return () => {
      clearInterval(coordInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10" aria-hidden="true">
      {/* Top-left corner bracket */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-blood-red/20" />
      {/* Top-right corner bracket */}
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-blood-red/20" />
      {/* Bottom-left corner bracket */}
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-blood-red/20" />
      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-blood-red/20" />

      {/* Top-left data */}
      <div className="absolute top-8 left-20 flex flex-col gap-0.5">
        <span className="font-mono text-[9px] text-blood-red/60 tracking-widest">
          LAT {coords.lat}°N
        </span>
        <span className="font-mono text-[9px] text-blood-red/60 tracking-widest">
          LNG {coords.lng}°E
        </span>
      </div>

      {/* Top-right data */}
      <div className="absolute top-8 right-20 flex flex-col items-end gap-0.5">
        <span className="font-mono text-[9px] text-blood-red/60 tracking-widest">
          SCAN {scanPercent.toString().padStart(3, "0")}%
        </span>
        <span className="font-mono text-[9px] text-text-muted/40 tracking-widest">
          ARCHIVE ZERO
        </span>
      </div>
    </div>
  );
}
