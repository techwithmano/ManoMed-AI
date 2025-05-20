// src/app/layout.tsx (or wherever RootLayout lives)
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import {
  FaHeartbeat,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaStethoscope,
} from 'react-icons/fa';
import { useState } from 'react';

// Toggle this flag to hide/show navigation
const COMING_SOON_MODE = false;

const inter = Inter({ subsets: ['latin'] });

const navItems = [
  { href: '/', icon: <FaHome />, label: 'Home' },
  { href: '/about', icon: <FaInfoCircle />, label: 'About' },
  { href: '/contact', icon: <FaEnvelope />, label: 'Contact' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-background text-foreground`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            {/* Header (hidden in Coming Soon mode) */}
            {!COMING_SOON_MODE && (
              <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                  <Link href="/" className="flex items-center space-x-2" aria-label="ManoMed AI Home">
                    <FaHeartbeat className="text-blue-600 text-2xl" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ManoMed AI
                    </span>
                  </Link>

                  {/* Desktop Nav */}
                  <nav className="hidden sm:flex items-center space-x-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/ManoMedai"
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
                    >
                      ManoMed-AI
                    </Link>
                    <ThemeSwitcher />
                  </nav>

                  {/* Mobile Toggle */}
                  <div className="sm:hidden flex items-center space-x-3">
                    <ThemeSwitcher />
                    <button
                      aria-label="Toggle menu"
                      onClick={toggleMenu}
                      className="p-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                  </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/30 z-40"
                      onClick={closeMenu}
                      aria-hidden="true"
                    />
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md animate-slideDown z-50">
                      <div className="flex flex-col space-y-4 p-6">
                        {navItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                        <Link
                          href="/ManoMedai"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded-full transition"
                        >
                          <FaStethoscope />
                          <span>ManoMed-AI</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </header>
            )}

            {/* Main Content */}
            <main className="pt-20">
              {children}
            </main>

            {/* Footer */}
            <footer className="mt-12 py-6 bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-600 dark:text-gray-400">
              © 2025 ManoMed AI. All rights reserved.
            </footer>

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
