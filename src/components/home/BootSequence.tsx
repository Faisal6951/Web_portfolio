'use client';

import { useBootSequence } from '@/hooks/useBootSequence';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENCRYPTED_SYMBOLS = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθ01█▓▒░▄▀■□▪▫';
const BOOT_LINES = [
  'INITIALIZING SECURE CONNECTION...',
  'LOADING ENCRYPTED ARCHIVE...',
  'VERIFYING CLEARANCE LEVEL 5...',
  'DECRYPTING MISSION FILES...',
  'BYPASSING FIREWALL PROTOCOLS...',
  'ARCHIVE ZERO — ACCESS GRANTED',
];

function randomSymbols(length: number) {
  return Array.from(
    { length },
    () =>
      ENCRYPTED_SYMBOLS[Math.floor(Math.random() * ENCRYPTED_SYMBOLS.length)],
  ).join('');
}

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const { stage, hasBooted } = useBootSequence();
  const [symbols, setSymbols] = useState('');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (stage === 'complete') {
      const timer = setTimeout(onComplete, 1400);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  useEffect(() => {
    if (stage === 'decrypting') {
      const interval = setInterval(() => {
        setSymbols(randomSymbols(60));
      }, 80);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'booting' || stage === 'decrypting') {
      if (lineIndex < BOOT_LINES.length) {
        const timer = setTimeout(() => {
          setBootLines((prev) => [...prev, BOOT_LINES[lineIndex]]);
          setLineIndex((i) => i + 1);
        }, 220);
        return () => clearTimeout(timer);
      }
    }
  }, [stage, lineIndex]);

  if (hasBooted && stage === 'complete') return null;

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className='fixed inset-0 z-[9990] bg-void flex flex-col items-center justify-center overflow-hidden'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Scanline sweep */}
          {stage === 'scanning' && (
            <motion.div
              className='absolute left-0 right-0 h-0.5 bg-blood-red'
              style={{ boxShadow: '0 0 20px #C1121F, 0 0 60px #C1121F40' }}
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 0.8, ease: 'linear' }}
            />
          )}

          {/* CRT scanlines overlay */}
          <div
            className='absolute inset-0 pointer-events-none opacity-20'
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
            }}
          />

          {/* Center content */}
          <div className='relative z-10 flex flex-col items-center gap-8 px-6 max-w-lg w-full'>
            {/* Archive symbol */}
            <div className='relative flex items-center justify-center'>
              <div
                className='w-20 h-20 rounded-full border border-blood-red/30 flex items-center justify-center'
                style={{ boxShadow: '0 0 30px #C1121F20' }}
              >
                <motion.div
                  className='w-14 h-14 rounded-full border border-blood-red/50 flex items-center justify-center'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <span className='font-bebas text-2xl text-blood-red'>Ω</span>
                </motion.div>
              </div>
              {/* Outer rotating ring */}
              <motion.div
                className='absolute w-28 h-28 rounded-full border border-dashed border-blood-red/20'
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Encrypted symbols during decryption */}
            {stage === 'decrypting' && (
              <div className='font-mono text-xs text-blood-red/60 text-center tracking-widest leading-loose break-all'>
                {symbols}
              </div>
            )}

            {/* Boot log lines */}
            <div className='w-full flex flex-col gap-1'>
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  className='flex items-center gap-3'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className='text-blood-red font-mono text-xs'>
                    {'>'}
                  </span>
                  <span
                    className={`font-mono text-xs tracking-wider ${
                      i === bootLines.length - 1
                        ? 'text-ancient-gold'
                        : 'text-text-muted'
                    }`}
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className='w-full h-px bg-border-dark relative overflow-hidden'>
              <motion.div
                className='absolute top-0 left-0 h-full bg-blood-red'
                style={{ boxShadow: '0 0 8px #C1121F' }}
                initial={{ width: '0%' }}
                animate={{
                  width:
                    stage === 'scanning'
                      ? '25%'
                      : stage === 'decrypting'
                        ? '60%'
                        : stage === 'unlocking'
                          ? '80%'
                          : '100%',
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            <div className='font-mono text-[10px] text-text-muted tracking-[0.4em] uppercase'>
              {stage === 'scanning' && 'SCANNING PERIMETER...'}
              {stage === 'decrypting' && 'DECRYPTING PAYLOAD...'}
              {stage === 'unlocking' && 'ARCHIVE UNLOCKED'}
              {stage === 'booting' && 'SYSTEM BOOT SEQUENCE'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
