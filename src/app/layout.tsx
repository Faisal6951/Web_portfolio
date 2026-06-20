import type { Metadata, Viewport } from 'next';
import { bebasNeue, inter, spaceMono } from '@/lib/fonts';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { HUDOverlay } from '@/components/effects/EncryptedCoords';
// @ts-ignore - allow CSS side-effect import without explicit type declarations
import './globals.css';

// export const metadata = {
//   title: "Portfolio",
//   icons: {
//     icon: "/favicon.svg",
//   },
// };

export const metadata: Metadata = {
  title: {
    default: 'Faisal Adnan — Architect of Interactive Systems',
    template: '%s | Faisal Adnan',
  },
  description:
    'Classified digital archive of Faisal Adnan — Frontend Operative. Architect of interactive systems, engineer of silent experiences. Precision over noise.',
  keywords: [
    'frontend developer',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
  ],
  authors: [{ name: 'Faisal Adnan' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://faisaladnan.dev',
    title: 'Faisal Adnan — Architect of Interactive Systems',
    description:
      'Classified digital archive. Frontend Operative. Architect of interactive systems.',
    siteName: 'Archive Zero',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faisal Adnan — Architect of Interactive Systems',
    description: 'Classified digital archive. Frontend Operative.',
  },
  icons: {
    icon: [{ url: '/icons/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className='bg-void text-text-primary font-inter scanlines noise min-h-screen flex flex-col'>
        <SmoothScrollProvider>
          <CustomCursor />
          <HUDOverlay />
          <Navigation />
          <main className='flex-1'>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
