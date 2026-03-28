import type { Metadata } from 'next'
import ServiceCard from '../../components/ServiceCard'
import services from '../../data/services.json'
import Link from 'next/link'
import { Service } from '../../types'

export const metadata: Metadata = {
  title: 'Services - Rana Travels',
  description: 'Explore our travel services including local rides, one way trips, round trips, and airport transfers.',
}

interface Highlight {
  icon: string
  label: string
  color: string
}

const highlights: Highlight[] = [
  { icon: 'bi-shield-check-fill', label: 'Safe & Insured', color: '#1a3c6e' },
  { icon: 'bi-clock-fill', label: '24/7 Available', color: '#f5c518' },
  { icon: 'bi-currency-rupee', label: 'Best Prices', color: '#198754' },
  { icon: 'bi-headset', label: 'Live Support', color: '#6f42c1' },
]

interface HowItWorksStep {
  step: string
  icon: string
  title: string
  desc: string
}

const howItWorks: HowItWorksStep[] = [
  { step: '01', icon: 'bi-phone-fill', title: 'Choose Your Service', desc: 'Select from local, one way, round trip, or airport transfer.' },
  { step: '02', icon: 'bi-car-front-fill', title: 'Pick Your Cab', desc: 'Choose the vehicle that best fits your group size and budget.' },
  { step: '03', icon: 'bi-calendar-check-fill', title: 'Fill Booking Form', desc: 'Enter your details and send a booking request via WhatsApp.' },
  { step: '04', icon: 'bi-check-circle-fill', title: 'Confirmed & Travel', desc: 'Get confirmation and enjoy your comfortable journey.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero text-center">
        <div className="container">
          <i className="bi bi-briefcase-fill mb-3" style={{ fontSize: '2.5rem', color: '#f5c518' }}></i>
          <h1 className="fw-bold mb-2">Our Services</h1>
          <p className="mb-0" style={{ opacity: 0.85, maxWidth: '540px', margin: '0 auto' }}>
            Comprehensive travel solutions tailored to suit your every journey need
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: '#f5c518', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Highlights Bar */}
      <div style={{ background: '#f5c518' }}>
        <div className="container py-3">
          <div className="row justify-content-center text-center g-3">
            {highlights.map((h, i) => (
              <div key={i} className="col-6 col-sm-3">
                <i className={`bi ${h.icon} me-2`} style={{ color: '#1a3c6e' }}></i>
                <span className="fw-semibold" style={{ color: '#1a3c6e', fontSize: '0.9rem' }}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What We Offer</h2>
            <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '520px' }}>
              From quick city rides to long outstation trips, we have a service that fits your travel plan perfectly.
            </p>
          </div>
          <div className="row g-4">
            {(services as Service[]).map((svc) => (
              <div key={svc.id} className="col-sm-6 col-lg-3">
                <ServiceCard service={svc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="row g-4 text-center">
            {howItWorks.map((item, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div className="card border-0 h-100 p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle fw-bold"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)',
                      color: '#fff',
                      fontSize: '1.1rem',
                    }}
                  >
                    {item.step}
                  </div>
                  <i className={`bi ${item.icon} mb-2`} style={{ fontSize: '1.6rem', color: '#f5c518' }}></i>
                  <h6 className="fw-bold mb-2" style={{ color: '#1a3c6e' }}>{item.title}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/book" className="btn btn-book btn-lg rounded-pill px-5 py-3">
              <i className="bi bi-calendar-check me-2"></i>Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
