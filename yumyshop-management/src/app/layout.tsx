import DashboardLayout from '@/components/DashboardLayout';
import StyledComponentsRegistry from '@/lib/antd.registry';
import theme from '@/theme/themeConfig';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ConfigProvider } from 'antd';
import './globals.css';

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
