import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import StyledComponentsRegistry from '@/lib/antd.registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yumy Shop',
  description: 'Yumy Shop, Cu Chi, TPHCM, Viet Nam'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
