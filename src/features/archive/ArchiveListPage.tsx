"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { staggerContainer, fadeInUp, staggerContainerFast } from "@/animations/variants";
import { type Project } from "@/types/project";

interface ArchiveListPageProps {
  projects: Project[];
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETED: "text-ancient-gold border-ancient-gold/40",
  ACTIVE: "text-blood-red border-blood-red/40",
  CLASSIFIED: "text-text-muted border-text-muted/30",
  COMPROMISED: "text-blood-red-dim border-blood-red-dim/30",
};

const DIFF_STYLES: Record<string, { bar: string; label: string }> = {
  LOW:        { bar: "w-1/5",  label: "text-text-muted" },
  MODERATE:   { bar: "w-2/5",  label: "text-ancient-gold/70" },
  HIGH:       { bar: "w-3/5",  label: "text-ancient-gold" },
  EXTREME:    { bar: "w-4/5",  label: "text-blood-red" },
  CLASSIFIED: { bar: "w-full", label: "text-blood-red" },
};

function ThreatBar({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-1.5"
          style={{
            width: "8px",
            backgroundColor: i < level
              ? i >= 8 ? "#C1121F" : i >= 6 ? "#D4A017" : "#C1121F40"
              : "#202020",
          }} />
      ))}
    </div>
  );
}

function MissionFolder({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="mission-folder group border border-border-dark hover:border-blood-red/30 bg-surface-1/20 relative overflow-hidden"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>

      {/* Folder tab */}
      <div className="absolute top-0 left-0 w-20 h-0.5 bg-blood-red/40 group-hover:bg-blood-red transition-colors duration-300" />

      {/* Main folder body */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Left metadata */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] text-text-muted tracking-widest">{project.missionId}</span>
            <h2 className="font-bebas text-2xl md:text-3xl tracking-wider text-text-primary group-hover:text-blood-red transition-colors duration-300">
              {project.codename}
            </h2>
            <span className="font-inter text-text-muted text-xs">{project.name}</span>
          </div>

          {/* Right meta */}
          <div className="flex flex-col items-end gap-2">
            <span className={`font-mono text-[9px] tracking-widest px-2 py-1 border ${STATUS_STYLES[project.status]}`}>
              {project.status}
            </span>
            <span className="font-mono text-[9px] text-text-muted tracking-widest">{project.year}</span>
          </div>
        </div>

        {/* Objective */}
        <p className="font-inter text-text-muted text-sm leading-relaxed mb-5 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {project.objective}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 5).map(t => (
            <span key={t} className="font-mono text-[8px] text-text-muted border border-border-dark px-2 py-0.5 tracking-wider">
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="font-mono text-[8px] text-text-muted/50">+{project.tech.length - 5} MORE</span>
          )}
        </div>

        {/* Threat & difficulty */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-text-muted tracking-widest">THREAT LEVEL</span>
            <ThreatBar level={project.threatLevel} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-text-muted tracking-widest">DIFFICULTY</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1 bg-border-dark relative">
                <div className={`absolute top-0 left-0 h-full bg-blood-red ${DIFF_STYLES[project.difficulty].bar}`} />
              </div>
              <span className={`font-mono text-[8px] tracking-widest ${DIFF_STYLES[project.difficulty].label}`}>
                {project.difficulty}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-text-muted tracking-widest">DURATION</span>
            <span className="font-mono text-[9px] text-text-primary">{project.duration}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-text-muted tracking-widest">CATEGORY</span>
            <span className="font-mono text-[9px] text-ancient-gold">{project.category}</span>
          </div>
        </div>

        {/* Hover-revealed action */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden">
              <div className="mt-5 pt-4 border-t border-border-dark flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.results.slice(0, 2).map((r, i) => (
                    <span key={i} className="font-mono text-[8px] text-ancient-gold/70 border border-ancient-gold/20 px-2 py-0.5">
                      ✓ {r.substring(0, 40)}{r.length > 40 ? "..." : ""}
                    </span>
                  ))}
                </div>
                <Link href={`/archive/${project.slug}`} data-hover
                  className="font-mono text-[10px] text-blood-red tracking-widest hover:text-ancient-gold transition-colors flex items-center gap-2 flex-shrink-0">
                  ACCESS DOSSIER →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-blood-red transition-all duration-700" />

      {/* Index */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-text-muted/20 group-hover:text-text-muted/50 transition-colors">
        {String(index + 1).padStart(2, "0")} / {String(4).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export function ArchiveListPage({ projects }: ArchiveListPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16">
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-blood-red" />
            <span className="font-mono text-[10px] text-blood-red tracking-[0.4em]">
              SYS-04 // CLASSIFIED OPERATIONS
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp}
            className="font-bebas text-6xl md:text-8xl tracking-wider text-text-primary">
            MISSION ARCHIVE
          </motion.h1>

          {/* Stats row */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 mt-6">
            {[
              { label: "TOTAL MISSIONS", value: String(projects.length).padStart(2,"0") },
              { label: "COMPLETED", value: String(projects.filter(p => p.status === "COMPLETED").length).padStart(2,"0") },
              { label: "ACTIVE", value: String(projects.filter(p => p.status === "ACTIVE").length).padStart(2,"0") },
              { label: "CLASSIFIED", value: String(projects.filter(p => p.status === "CLASSIFIED").length).padStart(2,"0") },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3 border border-border-dark px-4 py-2">
                <span className="font-bebas text-2xl text-blood-red">{stat.value}</span>
                <span className="font-mono text-[8px] text-text-muted tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-border-dark" />
            <span className="font-mono text-[9px] text-text-muted/40 tracking-widest">
              HOVER FOLDERS TO REVEAL INTEL
            </span>
            <div className="flex-1 h-px bg-border-dark" />
          </motion.div>
        </motion.div>

        {/* Mission folders */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <MissionFolder key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
