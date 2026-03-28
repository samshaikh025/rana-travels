import type { Metadata } from 'next'
import CabCard from '../../components/CabCard'
import cabs from '../../data/cabs.json'
import Link from 'next/link'
import { Cab } from '../../types'

export const metadata: Metadata = {
  title: 'Our Cabs - Rana Travels',
  description: 'Browse our fleet of comfortable and affordable cabs available for booking.',
}

export default function CabsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero text-center">
        <div className="container">
          <i className="bi bi-car-front-fill mb-3" style={{ fontSize: '2.5rem', color: '#f5c518' }}></i>
          <h1 className="fw-bold mb-2">Our Fleet</h1>
          <p className="mb-0" style={{ opacity: 0.85, maxWidth: '520px', margin: '0 auto' }}>
            Choose from our range of well-maintained, comfortable vehicles for any trip type
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: '#f5c518', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Our Cabs</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#f5c518' }}>
        <div className="container py-3">
          <div className="row text-center g-3">
            <div className="col-4">
              <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '1.4rem' }}>{cabs.length}+</div>
              <small style={{ color: '#1a3c6e', fontWeight: 500 }}>Cab Models</small>
            </div>
            <div className="col-4">
              <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '1.4rem' }}>24/7</div>
              <small style={{ color: '#1a3c6e', fontWeight: 500 }}>Availability</small>
            </div>
            <div className="col-4">
              <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '1.4rem' }}>100%</div>
              <small style={{ color: '#1a3c6e', fontWeight: 500 }}>Verified Drivers</small>
            </div>
          </div>
        </div>
      </div>

      {/* Cabs Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {(cabs as Cab[]).map((cab) => (
              <div key={cab.id} className="col-md-6 col-lg-4">
                <CabCard cab={cab} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-5 p-4 rounded-3 text-center"
            style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', border: '1px solid #dee2e6' }}
          >
            <i className="bi bi-telephone-fill mb-2" style={{ fontSize: '1.8rem', color: '#1a3c6e' }}></i>
            <h5 className="fw-bold mb-2" style={{ color: '#1a3c6e' }}>Not sure which cab to choose?</h5>
            <p className="text-muted mb-3">Contact us and we will help you pick the best option for your trip.</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Link href="/book" className="btn btn-book rounded-pill px-4 py-2">
                <i className="bi bi-calendar-check me-2"></i>Book Now
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_SAMPLE_MSG ?? '')}`}
                className="btn rounded-pill px-4 py-2 fw-semibold"
                style={{ background: '#25d366', color: '#fff', border: 'none' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp me-2"></i>Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
