"use client";

import { useState, useCallback } from "react";
import { BootSequence } from "@/components/home/BootSequence";
import { HeroSection } from "@/components/home/HeroSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      <BootSequence onComplete={handleBootComplete} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* HERO */}
        <HeroSection />

        {/* MISSION PREVIEW */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-blood-red tracking-[0.4em]">SYS-04 // RECENT OPERATIONS</span>
                <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text-primary">MISSION ARCHIVE</h2>
              </div>
              <Link href="/archive" data-hover
                className="hidden md:flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-blood-red transition-colors tracking-widest border border-border-dark hover:border-blood-red/40 px-4 py-2">
                VIEW ALL MISSIONS →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((project, i) => (
                <Link key={project.id} href={`/archive/${project.slug}`} data-hover
                  className="group relative border border-border-dark hover:border-blood-red/30 bg-surface-1/30 hover:bg-surface-1/60 p-6 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 0% 0%, #C1121F06 0%, transparent 60%)" }} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="font-mono text-[9px] text-text-muted tracking-widest">{project.missionId}</span>
                        <h3 className="font-bebas text-2xl tracking-wider text-text-primary group-hover:text-blood-red transition-colors mt-0.5">
                          {project.codename}
                        </h3>
                      </div>
                      <span className={`font-mono text-[9px] tracking-widest px-2 py-1 border ${
                        project.status === "COMPLETED" ? "border-ancient-gold/40 text-ancient-gold" :
                        project.status === "ACTIVE" ? "border-blood-red/40 text-blood-red" :
                        "border-text-muted/40 text-text-muted"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="font-inter text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.objective}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map(t => (
                        <span key={t} className="font-mono text-[9px] text-text-muted border border-border-dark px-2 py-0.5 tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-blood-red transition-all duration-700" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ARSENAL PREVIEW */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border-dark bg-surface-1/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-blood-red tracking-[0.4em]">SYS-03 // CAPABILITIES</span>
                <h2 className="font-bebas text-4xl md:text-6xl tracking-wider text-text-primary">ARCANE ARSENAL</h2>
              </div>
              <Link href="/arsenal" data-hover
                className="hidden md:flex items-center gap-2 font-mono text-[11px] text-text-muted hover:text-blood-red transition-colors tracking-widest border border-border-dark hover:border-blood-red/40 px-4 py-2">
                FULL ARSENAL →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.id}
                  className="group border border-border-dark hover:border-blood-red/30 bg-surface-1/30 p-4 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bebas text-2xl text-blood-red">{skill.rune}</span>
                    <span className="font-mono text-[8px] text-text-muted">{skill.power}%</span>
                  </div>
                  <div className="font-bebas text-lg tracking-wider text-text-primary group-hover:text-blood-red transition-colors">
                    {skill.name}
                  </div>
                  <div className="font-mono text-[8px] text-ancient-gold/70 tracking-widest mt-0.5">
                    {skill.arcaneTitle}
                  </div>
                  <div className="mt-3 h-0.5 bg-border-dark relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-blood-red transition-all duration-1000 group-hover:shadow-[0_0_8px_#C1121F]"
                      style={{ width: `${skill.power}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSMISSION CTA */}
        <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-border-dark">
          <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-8">
            <div className="w-16 h-px bg-blood-red mx-auto" />
            <div>
              <span className="font-mono text-[10px] text-blood-red tracking-[0.4em] block mb-4">
                SYS-05 // OPEN CHANNEL
              </span>
              <h2 className="font-bebas text-5xl md:text-7xl tracking-wider text-text-primary">
                INITIATE TRANSMISSION
              </h2>
            </div>
            <p className="font-inter text-text-muted max-w-md text-sm leading-relaxed">
              Secure channel available. Encrypted communication protocols active.
              Deploy your mission briefing — response within 24 hours.
            </p>
            <Link href="/transmission" data-hover
              className="group relative inline-flex items-center gap-4 border border-blood-red/60 hover:border-blood-red px-8 py-4 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-blood-red opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="w-2 h-2 rounded-full bg-blood-red animate-pulse-red" />
              <span className="font-bebas text-xl tracking-widest text-text-primary">OPEN SECURE CHANNEL</span>
              <span className="font-mono text-[10px] text-text-muted">→</span>
            </Link>
          </div>
        </section>
      </motion.div>
    </>
  );
}
