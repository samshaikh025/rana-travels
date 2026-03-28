'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string): boolean => pathname === path

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#1a3c6e' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
          <i className="bi bi-taxi-front-fill" style={{ color: '#f5c518', fontSize: '1.6rem' }}></i>
          <span style={{ color: '#fff' }}>Rana <span style={{ color: '#f5c518' }}>Travels</span></span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/') ? 'active fw-semibold' : ''}`} href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/cabs') ? 'active fw-semibold' : ''}`} href="/cabs">
                Our Cabs
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/services') ? 'active fw-semibold' : ''}`} href="/services">
                Services
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link className="btn btn-book px-4 py-2 rounded-pill" href="/book">
                <i className="bi bi-calendar-check me-1"></i> Book Now
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
