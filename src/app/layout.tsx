import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Inter({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
    <html lang="en" className={poppins.variable}>
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
        <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}

