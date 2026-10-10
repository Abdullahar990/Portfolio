import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { isIndexable, metadataBase, pageMetadata, site } from '@/lib/site';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.title,
    description: site.description,
    path: '/',
    imageSlug: 'home',
  }),
  metadataBase,
  authors: [{ name: site.name }],
  creator: site.name,
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: { telephone: false },
  robots: isIndexable
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : { index: false, follow: false },
};

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f3f2ed' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
