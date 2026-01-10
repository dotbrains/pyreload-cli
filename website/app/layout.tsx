import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Pyreload - Auto-Restart Python Apps with Polling Support',
  description: 'Automatically restart Python applications when file changes are detected. Full support for Docker, Vagrant, and mounted filesystems via polling mode.',
  keywords: ['python', 'file monitoring', 'hot reload', 'docker', 'vagrant', 'development tools', 'polling'],
  authors: [{ name: 'dotbrains' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Pyreload - Python File Monitor with Polling',
    description: 'Automatically restart Python apps on file changes. Perfect for Docker and Vagrant development.',
    url: 'https://dotbrains.github.io/pyreload-cli',
    siteName: 'Pyreload',
    type: 'website',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'Pyreload - Auto-Restart Python Apps with Polling',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pyreload - Python File Monitor',
    description: 'Auto-restart Python apps with polling support for Docker and Vagrant',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
