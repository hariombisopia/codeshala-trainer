import type { Metadata, Viewport } from 'next'
import './globals.css'
import { BottomNav } from '@/components/shared/BottomNav'
import { SeedProvider } from '@/components/providers/SeedProvider'

export const metadata: Metadata = {
  title: 'CodeShala Trainer',
  description: 'Your intelligent co-trainer for No-Code Development sessions',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Trainer',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#6c63ff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SeedProvider>
          <main className="page-container max-w-lg mx-auto">
            {children}
          </main>
          <BottomNav />
        </SeedProvider>
      </body>
    </html>
  )
}
