/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        "surface-1": "#0D0D0D",
        "surface-2": "#121212",
        "surface-3": "#191919",
        "blood-red": "#C1121F",
        "blood-red-dim": "#8B0D15",
        "ancient-gold": "#D4A017",
        "ancient-gold-dim": "#9A7410",
        "text-primary": "#EAEAEA",
        "text-muted": "#7A7A7A",
        "border-dark": "#202020",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        "scan-line": "scanLine 3s linear infinite",
        "glitch-1": "glitch1 0.3s infinite",
        "glitch-2": "glitch2 0.3s infinite",
        flicker: "flicker 4s linear infinite",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
        "rune-spin": "runeSpin 20s linear infinite",
        "rune-spin-reverse": "runeSpin 15s linear infinite reverse",
        "data-stream": "dataStream 2s linear infinite",
        blink: "blink 1s step-end infinite",
        "stamp-in": "stampIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        reveal: "reveal 0.8s cubic-bezier(0.77, 0, 0.18, 1) forwards",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch1: {
          "0%, 100%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-2px, 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(1px, 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(3px, 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(-1px, 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(2px, 0)" },
        },
        glitch2: {
          "0%, 100%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)" },
          "20%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-3px, 0)" },
          "40%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(1px, 0)" },
          "60%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(-2px, 0)" },
          "80%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(3px, 0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 4px #C1121F40" },
          "50%": { boxShadow: "0 0 12px #C1121F80, 0 0 24px #C1121F30" },
        },
        runeSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        dataStream: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        stampIn: {
          "0%": { transform: "scale(3) rotate(-12deg)", opacity: "0" },
          "50%": { transform: "scale(0.9) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        reveal: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)",
        "scanline-overlay": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
      },
    },
  },
  plugins: [],
};
