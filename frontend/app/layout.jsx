import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Syncrade - Market Intelligence System',
  description: 'Market Intelligence System - Judgment Object Engine',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="grid-overlay" aria-hidden="true"></div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

