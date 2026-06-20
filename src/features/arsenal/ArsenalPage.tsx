"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, staggerContainerFast, scaleIn } from "@/animations/variants";
import { type Skill } from "@/types/skill";

interface ArsenalPageProps {
  skills: Skill[];
}

const CATEGORY_LABELS: Record<string, string> = {
  SUMMONING: "SUMMONING ARTS",
  PORTAL: "PORTAL MASTERY",
  PROTOCOL: "PROTOCOL SCIENCES",
  SIGIL: "SIGIL CRAFT",
  CONJURATION: "KINETIC CONJURATION",
  ARCHIVE: "ARCHIVE LORE",
};

const CLEARANCE_COLORS: Record<string, string> = {
  OPERATIVE: "text-text-muted border-text-muted/30",
  AGENT: "text-ancient-gold/70 border-ancient-gold/20",
  SPECIALIST: "text-ancient-gold border-ancient-gold/40",
  MASTER: "text-blood-red border-blood-red/40",
  GRANDMASTER: "text-blood-red border-blood-red/60",
};

function RuneCircle({ rune }: { rune: string }) {
  return (
    <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-blood-red/10 rune-ring" />
      {/* Middle ring with dashes */}
      <div className="absolute inset-1 rounded-full border border-dashed border-blood-red/20 rune-ring-reverse" />
      {/* Rune symbol */}
      <span className="relative z-10 font-bebas text-3xl text-blood-red"
        style={{ textShadow: "0 0 20px rgba(193,18,31,0.4)" }}>
        {rune}
      </span>
    </div>
  );
}

function PowerMeter({ power }: { power: number }) {
  const bars = 10;
  const filled = Math.round((power / 100) * bars);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i}
            className="h-2 transition-all duration-300"
            style={{
              width: "12px",
              backgroundColor: i < filled
                ? i >= bars - 2 ? "#C1121F" : i >= bars - 4 ? "#D4A017" : "#C1121F66"
                : "#202020",
              boxShadow: i < filled ? "0 0 4px #C1121F40" : "none",
            }} />
        ))}
      </div>
      <span className="font-mono text-[9px] text-text-muted">{power}%</span>
    </div>
  );
}

function ArcaneSkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.01 }}
      className="group relative border border-border-dark hover:border-blood-red/30 bg-surface-1/30 hover:bg-surface-1/60 p-6 transition-all duration-500 overflow-hidden">

      {/* Background rune watermark */}
      <div className="absolute -right-4 -bottom-4 font-bebas text-[8rem] text-text-primary/[0.02] select-none pointer-events-none leading-none">
        {skill.rune}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle at 0% 100%, #C1121F06 0%, transparent 70%)" }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <RuneCircle rune={skill.rune} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <div className="font-mono text-[8px] text-text-muted tracking-[0.3em] mb-0.5">
                  {CATEGORY_LABELS[skill.category]}
                </div>
                <h3 className="font-bebas text-2xl md:text-3xl tracking-wider text-text-primary group-hover:text-blood-red transition-colors duration-300">
                  {skill.name}
                </h3>
                <div className="font-mono text-[9px] text-ancient-gold/70 tracking-widest">
                  {skill.arcaneTitle}
                </div>
              </div>
              <span className={`font-mono text-[7px] tracking-widest px-2 py-1 border flex-shrink-0 ${CLEARANCE_COLORS[skill.clearanceLevel]}`}>
                {skill.clearanceLevel}
              </span>
            </div>
            <PowerMeter power={skill.power} />
          </div>
        </div>

        {/* Classification */}
        <div className="font-mono text-[9px] text-blood-red/60 tracking-widest mb-3">
          {skill.classification}
        </div>

        {/* Description */}
        <p className="font-inter text-text-muted text-sm leading-relaxed mb-5">
          {skill.description}
        </p>

        {/* Capabilities */}
        <div className="border-t border-border-dark pt-4">
          <div className="font-mono text-[8px] text-text-muted tracking-[0.3em] mb-3">
            ▸ CAPABILITIES
          </div>
          <ul className="flex flex-col gap-1.5">
            {skill.capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <span className="w-3 h-px bg-blood-red/40 flex-shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-blood-red transition-all duration-700" />
      {/* Index label */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-text-muted/30 group-hover:text-text-muted/60 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export function ArsenalPage({ skills }: ArsenalPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Page header */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16">
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-blood-red" />
            <span className="font-mono text-[10px] text-blood-red tracking-[0.4em]">
              SYS-03 // CAPABILITIES MANIFEST
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp}
            className="font-bebas text-6xl md:text-8xl tracking-wider text-text-primary">
            ARCANE ARSENAL
          </motion.h1>
          <motion.p variants={fadeInUp}
            className="font-inter text-text-muted text-sm max-w-xl mt-4 leading-relaxed">
            Each instrument forged through operational deployment. Not collected — mastered.
            Tools become extensions of intent. Power is meaningless without precision.
          </motion.p>

          {/* Divider with sigil */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-border-dark" />
            <span className="font-bebas text-2xl text-blood-red/30">Ω</span>
            <div className="flex-1 h-px bg-border-dark" />
          </motion.div>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <ArcaneSkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-border-dark" />
            <span className="font-mono text-[9px] text-text-muted tracking-[0.3em]">
              ALL CAPABILITIES VERIFIED IN ACTIVE DEPLOYMENT
            </span>
            <div className="w-12 h-px bg-border-dark" />
          </div>
          <span className="font-mono text-[9px] text-text-muted/40 tracking-widest">
            CLEARANCE REQUIRED: LEVEL 3+
          </span>
        </motion.div>
      </div>
    </div>
  );
}
