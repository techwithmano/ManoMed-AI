import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ManoMed AI',
  description: 'AI-powered medical expert system',
  icons: {
    icon: '/icon.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="text-lg font-semibold">
              ManoMed AI
            </Link>
            <div className="flex items-center gap-4">
              {/* Add nav links if needed */}
              <Link href="/about" className="text-sm hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
              <ThemeSwitcher />
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="flex items-center justify-center w-full py-4 text-sm text-gray-500">
            © 2025 ManoMed AI. All rights reserved.
          </footer>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
