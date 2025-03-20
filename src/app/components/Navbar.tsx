'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Links de navegación con los nuevos botones
const navigationLinks = [
  { href: '/characters', label: 'Personajes' },
  { href: '/artifacts', label: 'Artefactos' },
  { href: '/builds', label: 'Builds' },
  { href: '/domains', label: 'Dominios' },
  { href: '/reporte1', label: 'Reporte1' }, // Nuevo botón
  { href: '/reporte2', label: 'Reporte2' }, // Nuevo botón
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Cierra el menú móvil cuando cambia la ruta
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
            <span className="text-xl font-bold">Genshin Guides</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors ${isActive(
                  link.href
                )}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Register Button */}
          <div className="hidden md:flex">
            <Link
              href="/register"
              className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              ¡Regístrate!
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors ${isActive(
                link.href
              )}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            ¡Regístrate!
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
