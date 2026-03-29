'use client'

import { Service } from '../types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const basePath = process.env.NODE_ENV === 'production' ? '/rana-travels' : '';

  return (
    <div className="card h-100">
      <img
        src={basePath + service.imageUrl}
        alt={service.name}
        style={{ height: '180px', objectFit: 'cover', width: '100%', borderRadius: '8px 8px 0 0' }}
      />
      <div className="card-body p-4 text-center">
        <h6 className="card-title fw-bold mb-2" style={{ color: '#1a3c6e' }}>{service.name}</h6>
        <p className="card-text text-muted mb-0" style={{ fontSize: '0.875rem' }}>
          {service.description}
        </p>
      </div>
    </div>
  )
}
