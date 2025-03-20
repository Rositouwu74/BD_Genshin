import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Genshin Guide',
  description: 'Tu guía completa de Genshin Impact',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}