'use client'

import Link from 'next/link'
import { Cab } from '../types'

const typeColors: Record<string, string> = {
  Hatchback: '#1a3c6e',
  MPV: '#6f42c1',
  SUV: '#198754',
}

interface CabCardProps {
  cab: Cab
}

export default function CabCard({ cab }: CabCardProps) {
  const badgeColor = typeColors[cab.type] ?? '#1a3c6e'
  const basePath = process.env.NODE_ENV === 'production' ? '/rana-travels' : '';
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    img.style.display = 'none'
    const placeholder = img.nextSibling as HTMLElement | null
    if (placeholder) placeholder.style.display = 'flex'
  }

  return (
    <div className="card h-100">
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#e9ecef' }}>
        <img
          src={basePath + cab.imageUrl}
          alt={cab.name}
          className="cab-img"
          onError={handleImgError}
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
        />
        {/* Placeholder shown when image fails */}
        <div
          style={{
            display: 'none',
            height: '200px',
            width: '100%',
            background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#6c757d',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <i className="bi bi-car-front" style={{ fontSize: '3rem', color: '#adb5bd' }}></i>
          <small className="mt-2">Image coming soon</small>
        </div>
        {/* Type Badge */}
        <span
          className="badge position-absolute"
          style={{
            top: '12px',
            right: '12px',
            backgroundColor: badgeColor,
            color: '#fff',
            fontSize: '0.78rem',
            padding: '6px 12px',
            borderRadius: '20px',
          }}
        >
          {cab.type}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title fw-bold mb-2" style={{ color: '#1a3c6e' }}>{cab.name}</h5>
        <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem', flexGrow: 1 }}>
          {cab.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="d-flex align-items-center gap-1" style={{ color: '#495057', fontSize: '0.9rem' }}>
            <i className="bi bi-people-fill" style={{ color: '#1a3c6e' }}></i>
            <strong>{cab.seats}</strong> Seats
          </span>
          <span className="d-flex align-items-center gap-1" style={{ color: '#495057', fontSize: '0.9rem' }}>
            <i className="bi bi-currency-rupee" style={{ color: '#f5c518' }}></i>
            <strong style={{ color: '#1a3c6e', fontSize: '1.05rem' }}>{cab.pricePerKm}</strong>
            <span className="text-muted">/km</span>
          </span>
        </div>

        <Link
          href={`/book?cab=${encodeURIComponent(cab.name)}`}
          className="btn btn-book w-100 rounded-pill py-2"
        >
          <i className="bi bi-calendar-check me-2"></i>Book This Cab
        </Link>
      </div>
    </div>
  )
}
