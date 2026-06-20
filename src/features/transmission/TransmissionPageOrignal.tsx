'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { personal } from '@/data/personal';

type FormState = 'idle' | 'transmitting' | 'sent' | 'error';

const FORM_FIELDS = [
  {
    id: 'callsign',
    label: 'CALLSIGN / NAME',
    placeholder: 'OPERATIVE_NAME',
    type: 'text',
  },
  {
    id: 'channel',
    label: 'SECURE CHANNEL / EMAIL',
    placeholder: 'operative@domain.com',
    type: 'email',
  },
  {
    id: 'subject',
    label: 'MISSION TYPE',
    placeholder: 'FREELANCE | CONTRACT | FULL-TIME',
    type: 'text',
  },
];

function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      className='flex items-center gap-2 font-mono text-[10px] text-text-muted'
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span className='text-blood-red'>{'>'}</span>
      <span>{text}</span>
    </motion.div>
  );
}

export function TransmissionPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [values, setValues] = useState({
    callsign: '',
    channel: '',
    subject: '',
    message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('transmitting');
    await new Promise((r) => setTimeout(r, 2800));
    setFormState('sent');
  };

  return (
    <div className='min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
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
              SYS-05 // ENCRYPTED COMMS
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className='font-bebas text-6xl md:text-8xl tracking-wider text-text-primary'
          >
            TRANSMISSION
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className='font-inter text-text-muted text-sm max-w-md mt-4 leading-relaxed'
          >
            Secure channel active. End-to-end encrypted. Deploy your briefing —
            all transmissions acknowledged within 24 operational hours.
          </motion.p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          {/* Terminal form */}
          <motion.div
            variants={fadeInUp}
            initial='hidden'
            animate='visible'
            className='lg:col-span-3'
          >
            <div className='border border-border-dark bg-surface-1/30 overflow-hidden'>
              {/* Terminal header */}
              <div className='border-b border-border-dark bg-surface-2/50 px-5 py-3 flex items-center justify-between'>
                <div className='flex gap-1.5'>
                  <div className='w-2.5 h-2.5 rounded-full bg-blood-red/70' />
                  <div className='w-2.5 h-2.5 rounded-full bg-ancient-gold/50' />
                  <div className='w-2.5 h-2.5 rounded-full bg-text-muted/30' />
                </div>
                <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                  SECURE_CHANNEL.enc — AES-256
                </span>
                <div className='flex items-center gap-2'>
                  <div className='w-1.5 h-1.5 rounded-full bg-blood-red animate-pulse-red' />
                  <span className='font-mono text-[9px] text-blood-red'>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Boot lines */}
              <div className='px-5 py-4 border-b border-border-dark flex flex-col gap-1'>
                <TerminalLine text='INITIALIZING SECURE CHANNEL...' delay={0} />
                <TerminalLine
                  text='ENCRYPTION PROTOCOL: AES-256-GCM'
                  delay={0.2}
                />
                <TerminalLine
                  text='RECIPIENT: FA-7741 // FAISAL ADNAN'
                  delay={0.4}
                />
                <TerminalLine text='STATUS: AWAITING INPUT...' delay={0.6} />
              </div>

              <AnimatePresence mode='wait'>
                {formState === 'sent' ? (
                  <motion.div
                    key='sent'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='px-5 py-12 flex flex-col items-center gap-6 text-center'
                  >
                    <div className='relative w-20 h-20 flex items-center justify-center'>
                      <div className='absolute inset-0 rounded-full border border-ancient-gold/30 animate-rune-spin' />
                      <span className='font-bebas text-3xl text-ancient-gold'>
                        ✓
                      </span>
                    </div>
                    <div>
                      <div className='font-bebas text-3xl tracking-wider text-ancient-gold mb-2'>
                        TRANSMISSION SENT
                      </div>
                      <p className='font-mono text-[11px] text-text-muted tracking-widest'>
                        SIGNAL RECEIVED // RESPONSE WITHIN 24H
                      </p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <TerminalLine text='TRANSMISSION: ACKNOWLEDGED' />
                      <TerminalLine text='ENCRYPTION: VERIFIED' />
                      <TerminalLine text='ETA: 24 OPERATIONAL HOURS' />
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key='form'
                    onSubmit={handleSubmit}
                    className='px-5 py-6 flex flex-col gap-5'
                  >
                    {FORM_FIELDS.map((field) => (
                      <div key={field.id} className='flex flex-col gap-2'>
                        <label
                          htmlFor={field.id}
                          className='font-mono text-[9px] text-blood-red tracking-[0.3em]'
                        >
                          {field.id === focused ||
                          values[field.id as keyof typeof values]
                            ? `▸ ${field.label}`
                            : `○ ${field.label}`}
                        </label>
                        <div
                          className={`border transition-colors duration-300 ${
                            focused === field.id
                              ? 'border-blood-red/60'
                              : 'border-border-dark'
                          }`}
                        >
                          <input
                            id={field.id}
                            type={field.type}
                            required
                            placeholder={field.placeholder}
                            value={values[field.id as keyof typeof values]}
                            onChange={(e) =>
                              setValues((v) => ({
                                ...v,
                                [field.id]: e.target.value,
                              }))
                            }
                            onFocus={() => setFocused(field.id)}
                            onBlur={() => setFocused(null)}
                            className='w-full bg-transparent px-4 py-3 font-mono text-[11px] text-text-primary placeholder-text-muted/40 outline-none tracking-wider'
                          />
                        </div>
                      </div>
                    ))}

                    {/* Message */}
                    <div className='flex flex-col gap-2'>
                      <label
                        htmlFor='message'
                        className='font-mono text-[9px] text-blood-red tracking-[0.3em]'
                      >
                        {focused === 'message' || values.message
                          ? '▸ MISSION BRIEFING'
                          : '○ MISSION BRIEFING'}
                      </label>
                      <div
                        className={`border transition-colors duration-300 ${
                          focused === 'message'
                            ? 'border-blood-red/60'
                            : 'border-border-dark'
                        }`}
                      >
                        <textarea
                          id='message'
                          required
                          rows={5}
                          placeholder='Describe your mission parameters, objectives, and timeline...'
                          value={values.message}
                          onChange={(e) =>
                            setValues((v) => ({
                              ...v,
                              message: e.target.value,
                            }))
                          }
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          className='w-full bg-transparent px-4 py-3 font-mono text-[11px] text-text-primary placeholder-text-muted/40 outline-none resize-none tracking-wider'
                        />
                      </div>
                    </div>

                    <button
                      type='submit'
                      disabled={formState === 'transmitting'}
                      data-hover
                      className='group relative overflow-hidden border border-blood-red/60 hover:border-blood-red py-4 font-bebas text-lg tracking-widest text-text-primary transition-all duration-300 disabled:opacity-60'
                    >
                      <div className='absolute inset-0 bg-blood-red opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
                      <AnimatePresence mode='wait'>
                        {formState === 'transmitting' ? (
                          <motion.span
                            key='transmitting'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='flex items-center justify-center gap-3'
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                              className='inline-block w-3 h-3 border border-blood-red/60 border-t-blood-red rounded-full'
                            />
                            ENCRYPTING & TRANSMITTING...
                          </motion.span>
                        ) : (
                          <motion.span
                            key='idle'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='flex items-center justify-center gap-3'
                          >
                            <span className='w-1.5 h-1.5 rounded-full bg-blood-red animate-pulse-red' />
                            INITIATE SECURE TRANSMISSION
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right info panel */}
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
            className='lg:col-span-2 flex flex-col gap-4'
          >
            {/* Direct contact */}
            <motion.div
              variants={fadeInUp}
              className='border border-border-dark bg-surface-1/20 p-5'
            >
              <div className='font-mono text-[9px] text-blood-red tracking-[0.3em] mb-4'>
                ▸ DIRECT ACCESS POINTS
              </div>
              <div className='flex flex-col gap-4'>
                {[
                  {
                    label: 'EMAIL CHANNEL',
                    value: personal.email,
                    href: `mailto:${personal.email}`,
                  },
                  {
                    label: 'GITHUB ARCHIVE',
                    value: 'github.com/Faisal6951',
                    href: personal.github,
                  },
                  {
                    label: 'INDEED NETWORK',
                    value: 'indeed.com/in/faisaladnan',
                    href: personal.indeed,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className='border-b border-border-dark pb-3'
                  >
                    <div className='font-mono text-[8px] text-text-muted tracking-widest mb-1'>
                      {item.label}
                    </div>
                    <a
                      href={item.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-hover
                      className='font-mono text-[10px] text-text-primary hover:text-blood-red transition-colors tracking-wider'
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              variants={fadeInUp}
              className='border border-ancient-gold/20 bg-surface-1/10 p-5'
            >
              <div className='font-mono text-[9px] text-ancient-gold tracking-[0.3em] mb-4'>
                ▸ DEPLOYMENT STATUS
              </div>
              <div className='flex flex-col gap-3'>
                {personal.openTo.map((item) => (
                  <div key={item} className='flex items-center gap-3'>
                    <div className='w-1.5 h-1.5 rounded-full bg-ancient-gold animate-pulse' />
                    <span className='font-mono text-[10px] text-text-muted tracking-widest'>
                      {item.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Response time */}
            <motion.div
              variants={fadeInUp}
              className='border border-border-dark bg-surface-1/10 p-5'
            >
              <div className='font-mono text-[9px] text-blood-red tracking-[0.3em] mb-4'>
                ▸ RESPONSE PROTOCOL
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-[9px] text-text-muted'>
                    EMAIL RESPONSE
                  </span>
                  <span className='font-mono text-[9px] text-text-primary'>
                    &lt; 24H
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-[9px] text-text-muted'>
                    PROJECT DISCUSSION
                  </span>
                  <span className='font-mono text-[9px] text-text-primary'>
                    48H
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-[9px] text-text-muted'>
                    OPERATIONAL START
                  </span>
                  <span className='font-mono text-[9px] text-ancient-gold'>
                    NEGOTIABLE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Signal strength */}
            <motion.div
              variants={fadeInUp}
              className='border border-border-dark bg-surface-1/10 p-5 flex items-center gap-4'
            >
              <div className='flex flex-col items-center gap-1'>
                <div className='flex items-end gap-0.5 h-6'>
                  {[2, 4, 6, 8, 10, 8, 10, 8, 6, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className='w-1 bg-blood-red'
                      animate={{ height: [h, h * 1.5, h] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className='font-mono text-[9px] text-text-muted tracking-widest'>
                  SIGNAL STRENGTH
                </div>
                <div className='font-mono text-[10px] text-blood-red'>
                  MAXIMUM — SECURE
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
