import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='border-t border-border-dark bg-void mt-auto'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
          <div className='flex flex-col gap-1'>
            <span className='font-mono text-[9px] text-text-muted tracking-[0.3em]'>
              ARCHIVE ZERO — BUILD {year}.06
            </span>
            <span className='font-mono text-[9px] text-text-muted tracking-[0.3em]'>
              CLEARANCE: LEVEL 5 — CLASSIFIED
            </span>
          </div>
          <div className='flex items-center gap-6'>
            <Link
              href='https://github.com/Faisal6951'
              target='_blank'
              rel='noopener noreferrer'
              className='font-mono text-[10px] text-text-muted hover:text-blood-red transition-colors tracking-widest'
              data-hover
            >
              [GITHUB]
            </Link>
            <Link
              href='https://profile.indeed.com/?hl=en_PK&co=PK&from=gnav-jobseeker-profile--profile-one-frontend'
              target='_blank'
              rel='noopener noreferrer'
              className='font-mono text-[10px] text-text-muted hover:text-blood-red transition-colors tracking-widest'
              data-hover
            >
              [INDEED]
            </Link>
            <Link
              href='/transmission'
              className='font-mono text-[10px] text-text-muted hover:text-blood-red transition-colors tracking-widest'
              data-hover
            >
              [CONTACT]
            </Link>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <span className='font-mono text-[9px] text-blood-red tracking-[0.3em]'>
              ● OPERATIVE ACTIVE
            </span>
            <span className='font-mono text-[9px] text-text-muted tracking-[0.3em]'>
              FA-7741 // DO NOT DISTRIBUTE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
