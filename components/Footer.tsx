import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-white pt-5 pb-3 mt-5" style={{ backgroundColor: '#1a3c6e' }}>
      <div className="container">
        <div className="row g-4">
          {/* Brand & About */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-taxi-front-fill" style={{ color: '#f5c518', fontSize: '2rem' }}></i>
              <h5 className="mb-0 fw-bold">
                Rana <span style={{ color: '#f5c518' }}>Travels</span>
              </h5>
            </div>
            <p style={{ color: '#adb5bd', fontSize: '0.95rem' }}>
              Your trusted cab partner for safe, reliable, and affordable travel.
              Available 24/7 for local rides, outstation trips, and airport transfers.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              <a href="https://www.instagram.com/ranatravels_gujarat?igsh=MTZ3OG5kczVzN2poeg==" target="_blank" rel="noopener noreferrer" className="fs-4" title="Instagram" style={{ color: '#adb5bd' }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fs-4" title="Facebook" style={{ color: '#adb5bd' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@ranatravels88" target="_blank" rel="noopener noreferrer" className="fs-4" title="Youtube" style={{ color: '#adb5bd' }}>
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_SAMPLE_MSG ?? '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                title="WhatsApp"
                style={{ color: '#adb5bd' }}
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-6">
            <h6 className="fw-bold mb-3" style={{ color: '#f5c518' }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="footer-link"><i className="bi bi-chevron-right me-1" style={{ fontSize: '0.75rem' }}></i>Home</Link></li>
              <li className="mb-2"><Link href="/cabs" className="footer-link"><i className="bi bi-chevron-right me-1" style={{ fontSize: '0.75rem' }}></i>Our Cabs</Link></li>
              <li className="mb-2"><Link href="/services" className="footer-link"><i className="bi bi-chevron-right me-1" style={{ fontSize: '0.75rem' }}></i>Services</Link></li>
              <li className="mb-2"><Link href="/book" className="footer-link"><i className="bi bi-chevron-right me-1" style={{ fontSize: '0.75rem' }}></i>Book a Cab</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 col-6">
            <h6 className="fw-bold mb-3" style={{ color: '#f5c518' }}>Our Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}><i className="bi bi-geo-alt me-2" style={{ color: '#f5c518' }}></i>Local Rides</li>
              <li className="mb-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}><i className="bi bi-arrow-right-circle me-2" style={{ color: '#f5c518' }}></i>One Way Trips</li>
              <li className="mb-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}><i className="bi bi-arrow-repeat me-2" style={{ color: '#f5c518' }}></i>Round Trips</li>
              <li className="mb-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}><i className="bi bi-airplane me-2" style={{ color: '#f5c518' }}></i>Airport Transfers</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3" style={{ color: '#f5c518' }}>Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start gap-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                <i className="bi bi-telephone-fill mt-1" style={{ color: '#f5c518' }}></i>
                <span>+ {process.env.NEXT_PUBLIC_PHONE_NUMBER}</span>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                <i className="bi bi-envelope-fill mt-1" style={{ color: '#f5c518' }}></i>
                <span>info@ranatravels.com</span>
              </li>
              <li className="mb-2 d-flex align-items-start gap-2" style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                <i className="bi bi-geo-alt-fill mt-1" style={{ color: '#f5c518' }}></i>
                <span>Gujarat-India</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_SAMPLE_MSG ?? '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-2 px-4 py-2 fw-semibold rounded-pill"
              style={{ backgroundColor: '#25d366', color: '#fff', border: 'none' }}
            >
              <i className="bi bi-whatsapp me-2"></i>WhatsApp Us
            </a>
          </div>
        </div>

        <hr style={{ borderColor: '#2a5298', marginTop: '2rem' }} />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small style={{ color: '#6c757d' }}>
              &copy; {new Date().getFullYear()} Rana Travels. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <small style={{ color: '#6c757d' }}>
              Safe &bull; Reliable &bull; Affordable
            </small>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #adb5bd !important;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #f5c518 !important;
        }
      `}</style>
    </footer>
  )
}
