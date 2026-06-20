"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/effects/GlitchText";
import { ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void flex flex-col items-center justify-center p-6 relative overflow-hidden scanlines noise">
      {/* Absolute HUD grid elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      
      {/* Scanner red sweeping laser line */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] bg-blood-red opacity-30 shadow-[0_0_10px_#C1121F]"
        style={{
          animation: "scanLine 6s linear infinite"
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 px-4 border border-blood-red/30 bg-surface-1/50 backdrop-blur-md p-8 rounded-none glow-red">
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-4 bg-blood-red/10 border border-blood-red/40 rounded-none inline-flex items-center justify-center"
            style={{
              animation: "pulseRed 2.5s infinite"
            }}
          >
            <ShieldAlert className="w-12 h-12 text-blood-red" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs text-blood-red tracking-[0.25em] uppercase block">
            Security Status: Compromised
          </span>
          <h1 className="font-bebas text-5xl md:text-6xl tracking-wider text-text-primary">
            <GlitchText text="ACCESS DENIED" intensity="high" />
          </h1>
          <p className="font-mono text-[11px] text-text-muted max-w-sm mx-auto leading-relaxed">
            CRITICAL ERROR: The dossier you are attempting to retrieve has been redacted, deleted, or relocated to another server sector.
          </p>
        </div>

        {/* Technical metadata log block */}
        <div className="bg-void border border-border p-4 text-left font-mono text-[9px] text-text-muted space-y-1 select-none">
          <div>&gt; SYSTEM_ERR: RESOLVE_ROUTE_FAILED [404]</div>
          <div>&gt; HOST: ARCHIVE_ZERO_PRIMARY</div>
          <div>&gt; STATUS_CODE: 0x00000194</div>
          <div className="text-blood-red animate-pulse">&gt; ALERT: DEPLOYING ANTI-INTRUDER PROTOCOLS</div>
        </div>

        <div>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block w-full text-center bg-transparent border border-blood-red text-blood-red hover:bg-blood-red/10 px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-none hover:shadow-[0_0_15px_rgba(193,18,31,0.4)]"
            >
              Return to Safe Sector
            </motion.span>
          </Link>
        </div>
      </div>
    </main>
  );
}
