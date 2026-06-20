'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'HOME', href: '/', code: 'SYS-01', clearance: 'OPEN' },
  { label: 'DOSSIER', href: '/dossier', code: 'SYS-02', clearance: 'LEVEL 3' },
  { label: 'ARSENAL', href: '/arsenal', code: 'SYS-03', clearance: 'LEVEL 4' },
  { label: 'ARCHIVE', href: '/archive', code: 'SYS-04', clearance: 'LEVEL 5' },
  {
    label: 'TRANSMISSION',
    href: '/transmission',
    code: 'SYS-05',
    clearance: 'SECURE',
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-void/90 backdrop-blur-md border-b border-border-dark'
          : 'bg-transparent',
      )}
    >
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Logo / ID */}
        <Link href='/' className='group flex flex-col' data-hover>
          <span className='font-bebas text-2xl text-text-primary tracking-widest leading-none group-hover:text-blood-red transition-colors duration-300'>
            FA
          </span>
          <span className='font-mono text-[9px] text-text-muted tracking-[0.3em] leading-none'>
            OPERATIVE-7741
          </span>
        </Link>

        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-8'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-hover
                className={cn(
                  'group relative flex flex-col items-center gap-0.5 transition-all duration-300',
                  isActive
                    ? 'text-blood-red'
                    : 'text-text-muted hover:text-text-primary',
                )}
              >
                <span className='font-mono text-[9px] tracking-[0.2em] text-text-muted group-hover:text-blood-red transition-colors'>
                  {item.code}
                </span>
                <span className='font-bebas text-sm tracking-[0.15em]'>
                  {item.label}
                </span>
                {isActive && (
                  <div className='absolute -bottom-1 left-0 right-0 h-px bg-blood-red' />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: time + clearance */}
        <div className='hidden md:flex items-center gap-4'>
          <div className='flex flex-col items-end'>
            <span className='font-mono text-[10px] text-blood-red tracking-widest animate-flicker'>
              {time}
            </span>
            <span className='font-mono text-[8px] text-text-muted tracking-[0.2em]'>
              SECURE CHANNEL
            </span>
          </div>
          <div className='w-1.5 h-1.5 rounded-full bg-blood-red animate-pulse-red' />
        </div>

        {/* Mobile menu button */}
        <button
          className='md:hidden flex flex-col gap-1 p-2'
          onClick={() => setMenuOpen(!menuOpen)}
          data-hover
          aria-label='Toggle menu'
        >
          <span
            className={cn(
              'block w-6 h-px bg-text-primary transition-all duration-300',
              menuOpen && 'rotate-45 translate-y-1.5',
            )}
          />
          <span
            className={cn(
              'block w-4 h-px bg-blood-red transition-all duration-300',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-6 h-px bg-text-primary transition-all duration-300',
              menuOpen && '-rotate-45 -translate-y-1.5',
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-500 bg-surface-1/95 backdrop-blur-md border-b border-border-dark',
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className='px-6 py-6 flex flex-col gap-4'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                data-hover
                className={cn(
                  'flex items-center justify-between py-2 border-b border-border-dark',
                  isActive ? 'text-blood-red' : 'text-text-muted',
                )}
              >
                <div className='flex items-center gap-4'>
                  <span className='font-mono text-[10px] text-text-muted'>
                    {item.code}
                  </span>
                  <span className='font-bebas text-xl tracking-widest'>
                    {item.label}
                  </span>
                </div>
                <span className='font-mono text-[9px] text-text-muted'>
                  {item.clearance}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
