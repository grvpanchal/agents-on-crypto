import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Web3Provider } from '@/context/Web3Context';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agents on Crypto | Premium AI Agent Marketplace',
  description: 'Discover, collect, and trade AI agents on the blockchain',
  keywords: 'AI agents, marketplace, digital assets, blockchain, ethereum, crypto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agentsoncrypto.com',
    title: 'Agents on Crypto | Premium AI Agent Marketplace',
    description: 'Discover, collect, and trade AI agents on the blockchain',
    siteName: 'Agents on Crypto',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Web3Provider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </Web3Provider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}