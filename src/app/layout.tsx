import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: 'Interactive 3D Solar System',
    template: '%s | Interactive 3D Solar System',
  },
  description: 'Explore the solar system with an interactive 3D model. Discover planets, moons, and the sun with detailed information and realistic visuals.',
  keywords: ['solar system', '3d model', 'interactive', 'space', 'planets', 'astronomy'],
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
