import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme-provider"
import ThemeSwitcher from "@/components/ThemeSwitcher";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ManoMed AI',
  description: 'AI-powered medical expert system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
        
          <div className="absolute top-4 right-4">
          <ThemeSwitcher />
          </div>
        
        {children}
              <footer className="flex items-center justify-center w-full py-4 text-sm text-gray-500">
                  © 2025 ManoMed AI. All rights reserved.
              </footer>
        <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}

