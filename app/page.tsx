'use client'

import Link from 'next/link'
import CabCard from '../components/CabCard'
import ServiceCard from '../components/ServiceCard'
import cabs from '../data/cabs.json'
import services from '../data/services.json'
import { Cab, Service } from '../types'

interface Feature {
  icon: string
  title: string
  desc: string
  color: string
}

const features: Feature[] = [
  {
    icon: 'bi-clock-fill',
    title: 'Time Perfection',
    desc: 'We value your time. Our drivers are always punctual and ensure on-time pickups and drops.',
    color: '#1a3c6e',
  },
  {
    icon: 'bi-currency-rupee',
    title: 'Affordable Pricing',
    desc: 'Transparent pricing with no hidden charges. Get the best rates for every km you travel.',
    color: '#f5c518',
  },
  {
    icon: 'bi-emoji-smile-fill',
    title: 'Customer Satisfaction',
    desc: 'Thousands of happy customers trust us for safe and comfortable journeys every day.',
    color: '#198754',
  },
  {
    icon: 'bi-chat-dots-fill',
    title: 'Good Communication',
    desc: 'Stay in touch with your driver throughout the journey. Quick support via call or WhatsApp.',
    color: '#6f42c1',
  },
]

interface CarouselSlide {
  gradient: string
  heading: string
  subtext: string
  btn: { label: string; href: string }
}

const carouselSlides: CarouselSlide[] = [
  {
    gradient: 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 60%, #1565c0 100%)',
    heading: 'Safe & Reliable Cab Service',
    subtext: 'Experienced drivers, well-maintained vehicles, 24/7 availability.',
    btn: { label: 'Book a Cab', href: '/book' },
  },
  {
    gradient: 'linear-gradient(135deg, #4a0e8f 0%, #6f42c1 60%, #9b59b6 100%)',
    heading: 'Outstation & Round Trips',
    subtext: 'Plan your outstation journey with comfort and the best pricing available.',
    btn: { label: 'Explore Services', href: '/services' },
  },
  {
    gradient: 'linear-gradient(135deg, #145a32 0%, #1e8449 60%, #27ae60 100%)',
    heading: 'Airport Transfers Made Easy',
    subtext: 'Never miss a flight. Our drivers track your schedule for timely pickup.',
    btn: { label: 'See Our Cabs', href: '/cabs' },
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide hero-carousel"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-indicators">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {carouselSlides.map((slide, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <div
                className="slide-bg d-flex align-items-center justify-content-center text-white"
                style={{ background: slide.gradient, minHeight: '480px' }}
              >
                <div className="container text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-taxi-front-fill" style={{ fontSize: '3rem', color: '#f5c518' }}></i>
                  </div>
                  <h1 className="display-5 fw-bold mb-3">{slide.heading}</h1>
                  <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px', opacity: 0.9 }}>
                    {slide.subtext}
                  </p>
                  <Link href={slide.btn.href} className="btn btn-book btn-lg rounded-pill px-5 py-3">
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    {slide.btn.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Why Choose Us */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '560px' }}>
              Rana Travels has been providing trusted cab services with a focus on safety, comfort, and affordability.
            </p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div className="card h-100 text-center p-4 border-0" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                  <div
                    className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '64px', height: '64px', background: `${f.color}15` }}
                  >
                    <i className={`bi ${f.icon}`} style={{ fontSize: '1.8rem', color: f.color }}></i>
                  </div>
                  <h6 className="fw-bold mb-2" style={{ color: '#1a3c6e' }}>{f.title}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cabs */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Fleet</h2>
            <p className="text-muted mt-3">Choose from our well-maintained, comfortable vehicles</p>
          </div>
          <div className="row g-4">
            {(cabs as Cab[]).map((cab) => (
              <div key={cab.id} className="col-md-6 col-lg-4">
                <CabCard cab={cab} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/cabs" className="btn btn-outline-primary rounded-pill px-5 py-2 fw-semibold" style={{ borderColor: '#1a3c6e', color: '#1a3c6e' }}>
              <i className="bi bi-grid me-2"></i>View All Cabs
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Services</h2>
            <p className="text-muted mt-3">Tailored travel solutions for every need</p>
          </div>
          <div className="row g-4">
            {(services as Service[]).map((svc) => (
              <div key={svc.id} className="col-sm-6 col-lg-3">
                <ServiceCard service={svc} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/services" className="btn btn-outline-primary rounded-pill px-5 py-2 fw-semibold" style={{ borderColor: '#1a3c6e', color: '#1a3c6e' }}>
              <i className="bi bi-grid me-2"></i>Explore Trip Plans
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-5 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)' }}
      >
        <div className="container">
          <i className="bi bi-taxi-front-fill mb-3" style={{ fontSize: '2.5rem', color: '#f5c518' }}></i>
          <h2 className="fw-bold mb-3">Ready to Travel?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '500px', opacity: 0.9 }}>
            Book your cab now and experience safe, comfortable, and affordable travel with Rana Travels.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link href="/book" className="btn btn-book btn-lg rounded-pill px-5 py-3">
              <i className="bi bi-calendar-check me-2"></i>Book Now
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_SAMPLE_MSG ?? '')}`}
              className="btn btn-outline-light btn-lg rounded-pill px-5 py-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp me-2"></i>WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
