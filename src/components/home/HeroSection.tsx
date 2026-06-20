'use client';

import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import Link from 'next/link';
import { fadeInUp, staggerContainer, maskReveal } from '@/animations/variants';

const TAGLINES = [
  'ARCHITECT OF INTERACTIVE SYSTEMS',
  'KEEPER OF FORBIDDEN INTERFACES',
  'DIGITAL ASSASSIN',
  'ENGINEER OF SILENT EXPERIENCES',
];

const quickLinks = [
  {
    label: 'VIEW DOSSIER',
    href: '/dossier',
    code: 'SYS-02',
    desc: 'OPERATIVE FILE',
  },
  {
    label: 'ENTER ARCHIVE',
    href: '/archive',
    code: 'SYS-04',
    desc: 'MISSION LOG',
  },
  {
    label: 'OPEN ARSENAL',
    href: '/arsenal',
    code: 'SYS-03',
    desc: 'CAPABILITIES',
  },
  {
    label: 'TRANSMISSION',
    href: '/transmission',
    code: 'SYS-05',
    desc: 'CONTACT',
  },
];

export function HeroSection() {
  const tagline = useTypewriter(TAGLINES, 60, 2500);

  return (
    <section className='relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20'>
      {/* Background grid */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage:
            'linear-gradient(#EAEAEA 1px, transparent 1px), linear-gradient(90deg, #EAEAEA 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent line */}
      <div
        className='absolute top-0 right-[20%] w-px h-full bg-blood-red/10'
        style={{ transform: 'skewX(-5deg)' }}
      />

      {/* Content — asymmetric left alignment */}
      <motion.div
        className='relative z-10 max-w-7xl w-full'
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
      >
        {/* Pre-title classification label */}
        <motion.div
          variants={fadeInUp}
          className='flex items-center gap-4 mb-6'
        >
          <div className='w-8 h-px bg-blood-red' />
          <span className='font-mono text-[11px] text-blood-red tracking-[0.4em]'>
            ARCHIVE ZERO // OPERATIVE FILE FK-7741
          </span>
          <div className='w-8 h-px bg-blood-red' />
        </motion.div>

        {/* FAISAL */}
        <motion.div variants={maskReveal} className='overflow-hidden'>
          <h1 className='font-bebas text-[clamp(5rem,18vw,18rem)] leading-none text-text-primary tracking-tight'>
            FAISAL
          </h1>
        </motion.div>

        {/* Adnan — offset right with red accent */}
        <motion.div
          variants={maskReveal}
          className='overflow-hidden flex items-end gap-6 md:gap-12 -mt-4 md:-mt-8'
        >
          <div
            className='w-24 md:w-40 h-1 md:h-1.5 bg-blood-red flex-shrink-0 mb-4 md:mb-10'
            style={{ boxShadow: '0 0 20px #C1121F60' }}
          />
          <h1 className='font-bebas text-[clamp(5rem,18vw,18rem)] leading-none text-text-primary tracking-tight'>
            Adnan
          </h1>
        </motion.div>

        {/* Tagline — typewriter */}
        <motion.div
          variants={fadeInUp}
          className='mt-4 md:mt-8 flex items-center gap-4 ml-0 md:ml-4'
        >
          <span className='font-mono text-sm md:text-base text-ancient-gold tracking-[0.3em] h-6'>
            {tagline}
            <span className='animate-blink text-blood-red ml-1'>▋</span>
          </span>
        </motion.div>

        {/* Descriptor row */}
        <motion.div
          variants={fadeInUp}
          className='mt-6 md:mt-10 flex flex-wrap items-center gap-6 ml-0 md:ml-4'
        >
          <p className='font-inter text-text-muted text-sm max-w-sm leading-relaxed'>
            Every interface is a system. Every system is a mission.{' '}
            <span className='text-text-primary'>Precision over noise.</span>{' '}
            Built with intent. Engineered for impact.
          </p>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-blood-red animate-pulse-red' />
              <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                STATUS: OPERATIVE
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-ancient-gold' />
              <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                CLEARANCE: LEVEL 5
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-text-muted' />
              <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                AVAILABLE FOR HIRE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick navigation links */}
        <motion.div
          variants={fadeInUp}
          className='mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 ml-0'
        >
          {quickLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              data-hover
              className='group relative flex flex-col gap-1.5 p-4 border border-border-dark hover:border-blood-red/40 transition-all duration-300 bg-surface-1/50 hover:bg-surface-2/80 overflow-hidden'
            >
              {/* Hover glow */}
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, #C1121F08 0%, transparent 70%)',
                }}
              />
              <span className='font-mono text-[9px] text-text-muted tracking-widest'>
                {link.code}
              </span>
              <span className='font-bebas text-base tracking-wider text-text-primary group-hover:text-blood-red transition-colors duration-300'>
                {link.label}
              </span>
              <span className='font-mono text-[9px] text-text-muted/70 tracking-widest'>
                {link.desc}
              </span>
              {/* Bottom accent */}
              <div className='absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-blood-red transition-all duration-500' />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className='font-mono text-[9px] text-text-muted tracking-widest'>
          SCROLL TO INFILTRATE
        </span>
        <div className='w-px h-10 bg-gradient-to-b from-blood-red/60 to-transparent' />
      </motion.div>
    </section>
  );
}
