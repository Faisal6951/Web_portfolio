"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterLink = () => setIsHovering(true);
    const handleMouseLeaveLink = () => setIsHovering(false);

    const links = document.querySelectorAll("a, button, [data-hover]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink);
      link.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      curX = lerp(curX, mouseX, 0.12);
      curY = lerp(curY, mouseY, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX}px, ${curY}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink);
        link.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Crosshair outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-200"
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
          }}
        >
          {/* Crosshair lines */}
          <div
            className="absolute w-full h-px transition-colors duration-200"
            style={{ backgroundColor: isHovering ? "#D4A017" : "#C1121F", opacity: 0.8 }}
          />
          <div
            className="absolute w-px h-full transition-colors duration-200"
            style={{ backgroundColor: isHovering ? "#D4A017" : "#C1121F", opacity: 0.8 }}
          />
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors duration-200"
            style={{ borderColor: isHovering ? "#D4A017" : "#C1121F" }} />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-200"
            style={{ borderColor: isHovering ? "#D4A017" : "#C1121F" }} />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors duration-200"
            style={{ borderColor: isHovering ? "#D4A017" : "#C1121F" }} />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors duration-200"
            style={{ borderColor: isHovering ? "#D4A017" : "#C1121F" }} />
          {/* Center dot */}
          <div
            className="absolute w-0.5 h-0.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: isHovering ? "#D4A017" : "#C1121F",
              transform: isClicking ? "scale(2)" : "scale(1)",
            }}
          />
        </div>
      </div>
      {/* Dot trail */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: "#C1121F", opacity: 0.6 }}
        />
      </div>
    </>
  );
}
