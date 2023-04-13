'use client'
import '@/styles/app.css'
import '@/styles/gradient.css'
import '@/styles/periphery.css'
import { Raleway } from '@next/font/google'
import { Inter as FontSans } from '@next/font/google'
import localFont from '@next/font/local'
import classNames from 'clsx'

import { NetworkStatus } from '@/components/blockchain/network-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import RootProvider from '@/components/providers/root-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const sfPro = localFont({
  src: '../assets/fonts/SF-Pro-Display-Medium.otf',
  variable: '--font-sf',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
})

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: any) {
  const classes = classNames('GeneralLayout', 'bg-gradient-dark min-h-[100vh] flex flex-col pb-10 lg:pb-12')
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50', fontSans.variable)}>
          <style jsx global>
            {`
              :root {
                --sfPro-font: ${sfPro.style.fontFamily};
                --raleway-font: ${raleway.style.fontFamily};
              }
            `}
          </style>
          <RootProvider>
            <>
              <div className={classes}>
                <Header />
                <main className="flex-center my-32 flex flex-1 flex-col md:px-10">{children}</main>
                <div className="fixed bottom-6 left-6">
                  <NetworkStatus />
                </div>
                <div className="fixed bottom-6 right-6 flex items-center">
                  <WalletConnect />
                </div>
                <Footer />
              </div>
              {/* TODO: Add position controls */}
              <Toaster />
            </>
          </RootProvider>
        </body>
      </html>
    </>
  )
}
