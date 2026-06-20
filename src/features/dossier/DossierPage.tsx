'use client';

import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from '@/animations/variants';
import { RedactedText } from '@/components/effects/RedactedBlock';
import { TypewriterText } from '@/components/effects/TypewriterText';
import { type personal as PersonalType } from '@/data/personal';
import Image from 'next/image';

interface DossierPageProps {
  personal: typeof PersonalType;
}

export function DossierPage({ personal }: DossierPageProps) {
  return (
    <div className='min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        {/* Page header */}
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          animate='visible'
          className='mb-16'
        >
          <motion.div
            variants={fadeInUp}
            className='flex items-center gap-4 mb-4'
          >
            <div className='w-8 h-px bg-blood-red' />
            <span className='font-mono text-[10px] text-blood-red tracking-[0.4em]'>
              SYS-02 // OPERATIVE FILE
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className='font-bebas text-6xl md:text-8xl tracking-wider text-text-primary'
          >
            THE DOSSIER
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className='flex items-center gap-4 mt-2'
          >
            <span className='font-mono text-[10px] text-text-muted tracking-widest'>
              FILE: {personal.caseNumber}
            </span>
            <span className='text-border-dark'>|</span>
            <span className='font-mono text-[10px] text-text-muted tracking-widest'>
              STATUS: <span className='text-blood-red'>{personal.status}</span>
            </span>
            <span className='text-border-dark'>|</span>
            <span className='font-mono text-[10px] text-text-muted tracking-widest'>
              CLEARANCE: {personal.clearanceLevel}
            </span>
          </motion.div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* LEFT: Classified ID card */}
          <motion.div
            variants={slideInLeft}
            initial='hidden'
            animate='visible'
            className='lg:col-span-1'
          >
            <div className='border border-border-dark bg-surface-1/50 p-6 relative overflow-hidden'>
              {/* Classified stamp */}
              <div className='absolute top-4 right-4'>
                <motion.div
                  className='classified-stamp text-base'
                  initial={{ scale: 3, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: -8, opacity: 0.85 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4,
                    ease: [0.36, 0.07, 0.19, 0.97],
                  }}
                >
                  CLASSIFIED
                </motion.div>
              </div>

              {/* ID photo placeholder */}
              <div className='w-24 h-28 border border-border-dark bg-surface-2 mb-6 relative overflow-hidden flex items-center justify-center'>
                <span className='font-bebas text-5xl text-blood-red/30'>
                  <Image
                    src='/portfoliopic.jpg'
                    alt='Operative Photo'
                    width={96}
                    height={112}
                  />
                </span>
                <div
                  className='absolute inset-0'
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(193,18,31,0.04) 3px, rgba(193,18,31,0.04) 4px)',
                  }}
                />
                <div className='absolute bottom-0 left-0 right-0 bg-surface-3/80 py-1'>
                  <span className='font-mono text-[7px] text-text-muted block text-center tracking-widest'>
                    PHOTO ON FILE
                  </span>
                </div>
              </div>

              {/* ID fields */}
              <div className='flex flex-col gap-3'>
                {[
                  { label: 'OPERATIVE ID', value: personal.operativeId },
                  { label: 'DESIGNATION', value: personal.designation },
                  { label: 'SPECIALIZATION', value: personal.specialization },
                  { label: 'LOCATION', value: personal.location, redact: true },
                  {
                    label: 'NATIONALITY',
                    value: personal.nationality,
                    redact: true,
                  },
                  {
                    label: 'FILE DATE',
                    value: personal.fileDate,
                    redact: true,
                  },
                ].map((field) => (
                  <div
                    key={field.label}
                    className='border-b border-border-dark pb-3'
                  >
                    <div className='font-mono text-[8px] text-text-muted tracking-[0.3em] mb-0.5'>
                      {field.label}
                    </div>
                    {field.redact ? (
                      <RedactedText
                        text={field.value}
                        className='font-mono text-[10px] text-text-primary'
                      />
                    ) : (
                      <div className='font-mono text-[10px] text-text-primary'>
                        {field.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Barcode at bottom */}
              <div className='mt-6 flex flex-col items-center gap-1'>
                <div className='flex gap-0.5 h-6'>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className='bg-text-primary/60'
                      style={{
                        width: i % 3 === 0 ? '3px' : '1px',
                        height: '100%',
                      }}
                    />
                  ))}
                </div>
                <span className='font-mono text-[7px] text-text-muted tracking-widest'>
                  FA-7741-2024-CLASSIFIED
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Mission brief + bio + stats */}
          <motion.div
            variants={slideInRight}
            initial='hidden'
            animate='visible'
            className='lg:col-span-2 flex flex-col gap-6'
          >
            {/* Terminal bio */}
            <div className='border border-border-dark bg-surface-1/30 p-6'>
              <div className='flex items-center gap-3 mb-4 border-b border-border-dark pb-3'>
                <div className='flex gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-full bg-blood-red/70' />
                  <div className='w-2.5 h-2.5 rounded-full bg-ancient-gold/50' />
                  <div className='w-2.5 h-2.5 rounded-full bg-text-muted/30' />
                </div>
                <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                  OPERATIVE_BRIEF.classified
                </span>
              </div>
              <div className='flex flex-col gap-4'>
                <TypewriterText
                  text={`> ACCESSING FILE: ${personal.operativeId}`}
                  speed={25}
                  delay={200}
                  className='text-[11px] text-blood-red'
                  showCursor={false}
                />
                {personal.biography.map((para, i) => (
                  <motion.p
                    key={i}
                    className='font-inter text-text-muted text-sm leading-relaxed'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.3 }}
                  >
                    <span className='text-blood-red mr-2 font-mono text-[10px]'>
                      {'///'}
                    </span>
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className='border border-border-dark bg-surface-1/20 p-4 flex flex-col gap-1'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <span className='font-bebas text-3xl md:text-4xl text-blood-red'>
                    {stat.value}
                  </span>
                  <span className='font-mono text-[8px] text-text-muted tracking-[0.2em] leading-tight'>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Redacted facts */}
            <div className='border border-border-dark bg-surface-1/20 p-6'>
              <div className='font-mono text-[9px] text-blood-red tracking-[0.3em] mb-4'>
                ▸ RESTRICTED DATA — HOVER TO REVEAL PARTIAL INTEL
              </div>
              <div className='flex flex-col gap-3'>
                {personal.redactedFacts.map((fact, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-3 font-mono text-[11px] text-text-muted'
                  >
                    <span className='text-text-muted/40 text-[10px]'>
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <RedactedText text={fact} className='text-[11px]' />
                  </div>
                ))}
              </div>
            </div>

            {/* Open to */}
            <div className='border border-ancient-gold/20 bg-surface-1/20 p-6'>
              <div className='font-mono text-[9px] text-ancient-gold tracking-[0.3em] mb-4'>
                ▸ AVAILABLE FOR DEPLOYMENT
              </div>
              <div className='flex flex-wrap gap-3'>
                {personal.openTo.map((item) => (
                  <span
                    key={item}
                    className='font-mono text-[10px] text-ancient-gold border border-ancient-gold/30 px-3 py-1.5 tracking-widest'
                  >
                    {item.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
