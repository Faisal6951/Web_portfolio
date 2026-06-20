"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/animations/variants";
import { type Project } from "@/types/project";

interface MissionDossierPageProps {
  project: Project;
  adjacent: { prev: Project | null; next: Project | null };
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "text-ancient-gold border-ancient-gold/40 bg-ancient-gold/5",
  ACTIVE: "text-blood-red border-blood-red/40 bg-blood-red/5",
  CLASSIFIED: "text-text-muted border-text-muted/30 bg-text-muted/5",
  COMPROMISED: "text-blood-red border-blood-red/30 bg-blood-red/5",
};

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="w-4 h-px bg-blood-red" />
      <span className="font-mono text-[9px] text-blood-red tracking-[0.4em]">{label}</span>
      <div className="flex-1 h-px bg-border-dark" />
    </div>
  );
}

export function MissionDossierPage({ project, adjacent }: MissionDossierPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex items-center gap-2 mb-10">
          <Link href="/archive" data-hover className="font-mono text-[10px] text-text-muted hover:text-blood-red transition-colors tracking-widest">
            ← MISSION ARCHIVE
          </Link>
          <span className="text-border-dark font-mono text-[10px]">/</span>
          <span className="font-mono text-[10px] text-text-muted tracking-widest">{project.missionId}</span>
        </motion.div>

        {/* Mission header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-12">
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-4">
            <span className="font-mono text-[10px] text-text-muted tracking-widest">{project.missionId}</span>
            <span className={`font-mono text-[9px] tracking-widest px-2 py-1 border ${STATUS_STYLES[project.status]}`}>
              {project.status}
            </span>
            <span className="font-mono text-[9px] text-text-muted tracking-widest border border-border-dark px-2 py-1">
              {project.year} — {project.duration}
            </span>
            <span className="font-mono text-[9px] text-ancient-gold/70 tracking-widest border border-ancient-gold/20 px-2 py-1">
              {project.category}
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="overflow-hidden">
            <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wider text-text-primary leading-none">
              {project.codename}
            </h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="font-inter text-text-muted mt-2 text-sm">
            {project.name}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Main content */}
          <motion.div
            variants={slideInLeft} initial="hidden" animate="visible"
            className="lg:col-span-2 flex flex-col gap-0">

            {/* Objective */}
            <div className="border border-border-dark bg-surface-1/30 p-6">
              <div className="font-mono text-[9px] text-blood-red tracking-[0.3em] mb-3">▸ MISSION OBJECTIVE</div>
              <p className="font-inter text-text-primary text-base leading-relaxed">{project.objective}</p>
            </div>

            <SectionDivider label="OPERATION BRIEF" />

            {/* Description */}
            <p className="font-inter text-text-muted text-sm leading-relaxed">{project.description}</p>

            <SectionDivider label="SYSTEM ARCHITECTURE" />

            {/* Architecture */}
            <div className="border border-border-dark bg-surface-1/20 p-6">
              <div className="flex items-center gap-3 mb-4 border-b border-border-dark pb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blood-red/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-ancient-gold/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                </div>
                <span className="font-mono text-[10px] text-text-muted tracking-widest">architecture.classified</span>
              </div>
              <p className="font-mono text-[11px] text-text-muted leading-relaxed">{project.architecture}</p>
            </div>

            <SectionDivider label="OPERATIONAL FEATURES" />

            {/* Features */}
            <ul className="flex flex-col gap-2">
              {project.features.map((feature, i) => (
                <motion.li key={i}
                  className="flex items-start gap-3 border border-border-dark p-3 bg-surface-1/10 hover:bg-surface-1/30 hover:border-blood-red/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}>
                  <span className="font-mono text-[9px] text-blood-red mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="font-mono text-[11px] text-text-muted">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <SectionDivider label="MISSION RESULTS" />

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.results.map((result, i) => (
                <div key={i}
                  className="border border-ancient-gold/20 bg-surface-1/10 p-4 flex items-start gap-3">
                  <span className="text-ancient-gold text-sm flex-shrink-0 mt-0.5">✓</span>
                  <span className="font-mono text-[10px] text-text-muted leading-relaxed">{result}</span>
                </div>
              ))}
            </div>

            <SectionDivider label="CLASSIFIED LESSONS" />

            {/* Lessons */}
            <div className="flex flex-col gap-3">
              {project.lessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[9px] text-blood-red/60 mt-0.5 flex-shrink-0">▸</span>
                  <p className="font-inter text-text-muted text-sm leading-relaxed italic">{lesson}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Metadata sidebar */}
          <motion.div
            variants={slideInRight} initial="hidden" animate="visible"
            className="lg:col-span-1 flex flex-col gap-4">

            {/* Mission stats */}
            <div className="border border-border-dark bg-surface-1/30 p-5">
              <div className="font-mono text-[9px] text-blood-red tracking-[0.3em] mb-4">▸ MISSION STATS</div>
              <div className="flex flex-col gap-4">
                {[
                  { label: "DIFFICULTY", value: project.difficulty },
                  { label: "THREAT LEVEL", value: `${project.threatLevel}/10` },
                  { label: "DURATION", value: project.duration },
                  { label: "YEAR", value: String(project.year) },
                  { label: "CATEGORY", value: project.category },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center border-b border-border-dark pb-3">
                    <span className="font-mono text-[8px] text-text-muted tracking-widest">{stat.label}</span>
                    <span className="font-mono text-[10px] text-text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="border border-border-dark bg-surface-1/20 p-5">
              <div className="font-mono text-[9px] text-blood-red tracking-[0.3em] mb-4">▸ TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t}
                    className="font-mono text-[9px] text-text-muted border border-border-dark px-2 py-1 tracking-wider hover:border-blood-red/30 hover:text-text-primary transition-all duration-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.liveUrl || project.repoUrl) && (
              <div className="border border-border-dark bg-surface-1/20 p-5 flex flex-col gap-3">
                <div className="font-mono text-[9px] text-blood-red tracking-[0.3em] mb-1">▸ ACCESS POINTS</div>
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-hover
                    className="group flex items-center justify-between border border-border-dark hover:border-blood-red/40 p-3 transition-all duration-300 hover:bg-blood-red/5">
                    <span className="font-mono text-[10px] text-text-muted group-hover:text-text-primary tracking-widest">LIVE DEPLOYMENT</span>
                    <span className="font-mono text-[10px] text-blood-red">↗</span>
                  </Link>
                )}
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-hover
                    className="group flex items-center justify-between border border-border-dark hover:border-ancient-gold/40 p-3 transition-all duration-300 hover:bg-ancient-gold/5">
                    <span className="font-mono text-[10px] text-text-muted group-hover:text-ancient-gold tracking-widest">SOURCE ARCHIVE</span>
                    <span className="font-mono text-[10px] text-ancient-gold">↗</span>
                  </Link>
                )}
              </div>
            )}

            {/* Classified stamp */}
            <div className="flex items-center justify-center py-4">
              <motion.div className="classified-stamp"
                initial={{ scale: 3, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: -6, opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.4, ease: [0.36, 0.07, 0.19, 0.97] }}>
                {project.status}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Navigation to adjacent missions */}
        <div className="mt-20 border-t border-border-dark pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {adjacent.prev ? (
            <Link href={`/archive/${adjacent.prev.slug}`} data-hover
              className="group border border-border-dark hover:border-blood-red/30 p-5 bg-surface-1/20 transition-all duration-300">
              <div className="font-mono text-[9px] text-text-muted tracking-widest mb-1">← PREVIOUS MISSION</div>
              <div className="font-bebas text-xl tracking-wider text-text-primary group-hover:text-blood-red transition-colors">
                {adjacent.prev.codename}
              </div>
              <div className="font-mono text-[9px] text-text-muted mt-1">{adjacent.prev.missionId}</div>
            </Link>
          ) : <div />}

          {adjacent.next && (
            <Link href={`/archive/${adjacent.next.slug}`} data-hover
              className="group border border-border-dark hover:border-blood-red/30 p-5 bg-surface-1/20 transition-all duration-300 text-right">
              <div className="font-mono text-[9px] text-text-muted tracking-widest mb-1">NEXT MISSION →</div>
              <div className="font-bebas text-xl tracking-wider text-text-primary group-hover:text-blood-red transition-colors">
                {adjacent.next.codename}
              </div>
              <div className="font-mono text-[9px] text-text-muted mt-1">{adjacent.next.missionId}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
