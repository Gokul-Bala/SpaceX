import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: 'AuraX',
    template: '%s | AuraX',
  },
  description: 'Dive into AuraX, an interactive 3D model of our solar system. Explore planets, moons, and the sun in stunning detail. A beautiful and educational astronomical journey powered by Next.js and Three.js.',
  keywords: ['AuraX', 'solar system', '3d model', 'interactive', 'space', 'planets', 'astronomy', 'cosmos', 'universe', 'education', 'science', '3D visualization', 'webgl'],
  authors: [{ name: 'Firebase Studio' }],
  creator: 'Firebase Studio',
  publisher: 'Firebase Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
