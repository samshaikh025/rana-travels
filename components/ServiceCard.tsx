'use client'

import { Service } from '../types'

const serviceIcons: Record<string, string> = {
  'Local Ride': 'bi-geo-alt-fill',
  'One Way Trip': 'bi-arrow-right-circle-fill',
  'Round Trip': 'bi-arrow-repeat',
  'Airport Transfer': 'bi-airplane-fill',
}

const serviceGradients: Record<string, string> = {
  'Local Ride': 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)',
  'One Way Trip': 'linear-gradient(135deg, #6f42c1 0%, #9b59b6 100%)',
  'Round Trip': 'linear-gradient(135deg, #198754 0%, #2ecc71 100%)',
  'Airport Transfer': 'linear-gradient(135deg, #d63384 0%, #e91e8c 100%)',
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const icon = serviceIcons[service.name] ?? 'bi-car-front-fill'
  const gradient = serviceGradients[service.name] ?? 'linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)'

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    img.style.display = 'none'
    const placeholder = img.nextSibling as HTMLElement | null
    if (placeholder) placeholder.style.display = 'flex'
  }

  return (
    <div className="card h-100 text-center">
      {/* Image or Gradient Placeholder */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={service.imageUrl}
          alt={service.name}
          onError={handleImgError}
          style={{ height: '180px', objectFit: 'cover', width: '100%' }}
        />
        <div
          style={{
            display: 'none',
            height: '180px',
            width: '100%',
            background: gradient,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.85)' }}></i>
        </div>
      </div>

      <div className="card-body p-4">
        {/* Icon Badge */}
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: '52px',
            height: '52px',
            background: gradient,
            marginTop: '-26px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: '1.4rem', color: '#fff' }}></i>
        </div>
        <h6 className="card-title fw-bold mb-2" style={{ color: '#1a3c6e' }}>{service.name}</h6>
        <p className="card-text text-muted" style={{ fontSize: '0.875rem' }}>
          {service.description}
        </p>
      </div>
    </div>
  )
}
