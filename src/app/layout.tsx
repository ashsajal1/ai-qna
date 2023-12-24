import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI : Question answering',
  description: 'Ai tools to answer question of specific context.',
  openGraph: {
    title: 'AI : Question answering',
    description: 'Ai tools to answer question of specific context.',
    url: 'https://ai-qna-six.vercel.app',
    siteName: 'Next.js',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/opengraph-image.jpg',
        width: 1800,
        height: 1600,
        alt: 'Ai question answering.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
