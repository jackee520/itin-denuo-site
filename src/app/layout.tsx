import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RefTracker from '@/components/RefTracker'

export const metadata: Metadata = {
  title: '德诺商务服务 | ITIN代办 · 美国税号 · 专业中文服务',
  description: '专业ITIN个人纳税识别号代办服务，为华人提供美国税号申请、税务咨询、推荐奖励等一站式服务。快速、安全、值得信赖。',
  keywords: 'ITIN, 美国税号, 个人纳税识别号, ITIN代办, 美国税务, 华人服务, 推荐奖励, 德诺商务',
  authors: [{ name: '德诺商务服务' }],
  openGraph: {
    title: '德诺商务服务 | ITIN代办 · 美国税号 · 专业中文服务',
    description: '专业ITIN个人纳税识别号代办服务，为华人提供美国税号申请、税务咨询、推荐奖励等一站式服务。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '德诺商务服务',
  },
  twitter: {
    card: 'summary_large_image',
    title: '德诺商务服务 | ITIN代办',
    description: '专业ITIN个人纳税识别号代办服务',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://itin.denuo.site',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="min-h-screen flex flex-col">
        <RefTracker />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
