import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rana Travels - Safe & Reliable Cab Service',
  description: 'Book reliable cabs with Rana Travels. We offer local rides, one way trips, round trips, and airport transfers at affordable prices.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_SAMPLE_MSG ?? '')}`}
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc4s9bIOgUxi8T/jzmBFoVBUKOQRh7C9g0oHnCJUZvfC"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
