import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMissionId(): string {
  const prefix = ["ICA", "ARC", "OPS", "SHD", "PHX"][Math.floor(Math.random() * 5)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${num}`;
}

export function encryptString(str: string): string {
  return str
    .split("")
    .map((char) => {
      if (Math.random() > 0.7) {
        return String.fromCharCode(0x0391 + Math.floor(Math.random() * 48));
      }
      return char;
    })
    .join("");
}
