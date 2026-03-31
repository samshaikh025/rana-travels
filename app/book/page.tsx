'use client'

import { useState, useEffect, Suspense, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import cabs from '../../data/cabs.json'
import { Cab, FormState, FormErrors } from '../../types'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

const tripTypes = [
  { value: '', label: '-- Select Trip Type --' },
  { value: 'One Way Trip', label: 'One Way Trip' },
  { value: 'Round Trip', label: 'Round Trip' },
  { value: 'Local Ride', label: 'Local Ride' },
  { value: 'Airport Transfer', label: 'Airport Transfer' },
]

const initialForm: FormState = {
  name: '',
  phone: '',
  tripType: '',
  cabId: '',
  pickup: '',
  drop: '',
  date: '',
  time: '',
  notes: '',
}

function BookForm() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [todayStr, setTodayStr] = useState<string>('')
  const [timeHour, setTimeHour] = useState<string>('')
  const [timeMin, setTimeMin] = useState<string>('')
  const [timePeriod, setTimePeriod] = useState<string>('')

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    const cabParam = searchParams.get('cab')
    if (cabParam) {
      const matchedCab = (cabs as Cab[]).find(
        (c) => c.name.toLowerCase() === decodeURIComponent(cabParam).toLowerCase()
      )
      if (matchedCab) {
        setForm((prev) => ({ ...prev, cabId: String(matchedCab.id) }))
      }
    }
  }, [searchParams])

  const handleTimeChange = (hour: string, min: string, period: string) => {
    const combined = hour && min && period ? `${hour}:${min} ${period}` : ''
    setForm((prev) => ({ ...prev, time: combined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number'
    if (!form.tripType) errs.tripType = 'Please select a trip type'
    if (!form.cabId) errs.cabId = 'Please select a cab'
    if (!form.pickup.trim()) errs.pickup = 'Pickup location is required'
    if (!form.drop.trim()) errs.drop = 'Drop location is required'
    if (!form.date) errs.date = 'Travel date is required'
    return errs
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const selectedCab = (cabs as Cab[]).find((c) => String(c.id) === form.cabId)
    const cabName = selectedCab ? selectedCab.name : 'N/A'
    const pricePerKm = selectedCab ? `\u20b9${selectedCab.pricePerKm}` : 'N/A'

    const message = `Hello Rana Travels,\nI want to book a cab.\n\nName: ${form.name}\nPhone: ${form.phone}\nTrip: ${form.tripType}\nCab: ${cabName} (${pricePerKm}/km approx)\nPickup: ${form.pickup}\nDrop: ${form.drop}\nDate: ${form.date}${form.time ? `\nTime: ${form.time}` : ''}${form.notes ? `\nNotes: ${form.notes}` : ''}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    setSubmitted(true)
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
    }, 300)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
    setTimeHour('')
    setTimeMin('')
    setTimePeriod('')
  }

  const selectedCab = (cabs as Cab[]).find((c) => String(c.id) === form.cabId)

  return (
    <>
      {/* Success Message */}
      {submitted && (
        <div className="alert border-0 mb-4 rounded-3 p-4" style={{ background: '#d1fae5', color: '#065f46' }} role="alert">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-check-circle-fill" style={{ fontSize: '2rem', color: '#059669' }}></i>
            <div>
              <h6 className="fw-bold mb-1">Booking Request Sent!</h6>
              <p className="mb-2">WhatsApp is opening with your booking details. Our team will confirm shortly.</p>
              <button className="btn btn-sm rounded-pill px-3" style={{ background: '#059669', color: '#fff', border: 'none' }} onClick={handleReset}>
                Book Another Cab
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card border-0 rounded-4" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #1a3c6e, #2a5298)' }}
            >
              <i className="bi bi-taxi-front-fill text-white" style={{ fontSize: '1.3rem' }}></i>
            </div>
            <div>
              <h4 className="fw-bold mb-0" style={{ color: '#1a3c6e' }}>Cab Booking Form</h4>
              <small className="text-muted">All fields marked * are required</small>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Full Name <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-person-fill" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Phone Number <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-telephone-fill" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>

              {/* Trip Type */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Trip Type <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-map-fill" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <select
                    name="tripType"
                    className={`form-select ${errors.tripType ? 'is-invalid' : ''}`}
                    value={form.tripType}
                    onChange={handleChange}
                    style={{ borderLeft: 'none' }}
                  >
                    {tripTypes.map((t) => (
                      <option key={t.value} value={t.value} disabled={t.value === ''}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.tripType && <div className="invalid-feedback">{errors.tripType}</div>}
                </div>
              </div>

              {/* Select Cab */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Select Cab <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-car-front-fill" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <select
                    name="cabId"
                    className={`form-select ${errors.cabId ? 'is-invalid' : ''}`}
                    value={form.cabId}
                    onChange={handleChange}
                    style={{ borderLeft: 'none' }}
                  >
                    <option value="" disabled>-- Select a Cab --</option>
                    {(cabs as Cab[]).map((cab) => (
                      <option key={cab.id} value={String(cab.id)}>
                        {cab.name} ({cab.type}) — ₹{cab.pricePerKm}/km, {cab.seats} seats
                      </option>
                    ))}
                  </select>
                  {errors.cabId && <div className="invalid-feedback">{errors.cabId}</div>}
                </div>
              </div>

              {/* Pickup */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Pickup Location <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-geo-alt-fill" style={{ color: '#198754' }}></i>
                  </span>
                  <input
                    type="text"
                    name="pickup"
                    className={`form-control ${errors.pickup ? 'is-invalid' : ''}`}
                    placeholder="Enter pickup address"
                    value={form.pickup}
                    onChange={handleChange}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.pickup && <div className="invalid-feedback">{errors.pickup}</div>}
                </div>
              </div>

              {/* Drop */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Drop Location <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-geo-fill" style={{ color: '#dc3545' }}></i>
                  </span>
                  <input
                    type="text"
                    name="drop"
                    className={`form-control ${errors.drop ? 'is-invalid' : ''}`}
                    placeholder="Enter drop address"
                    value={form.drop}
                    onChange={handleChange}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.drop && <div className="invalid-feedback">{errors.drop}</div>}
                </div>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Travel Date <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef', borderRight: 'none' }}>
                    <i className="bi bi-calendar3" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <input
                    type="date"
                    name="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    value={form.date}
                    onChange={handleChange}
                    min={todayStr}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>
              </div>

              {/* Time */}
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Pickup Time <span className="text-muted fw-normal">(optional)</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: '#e9ecef' }}>
                    <i className="bi bi-clock-fill" style={{ color: '#1a3c6e' }}></i>
                  </span>
                  <select
                    className="form-select"
                    value={timeHour}
                    onChange={(e) => { setTimeHour(e.target.value); handleTimeChange(e.target.value, timeMin, timePeriod) }}
                  >
                    <option value="">HH</option>
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => (
                      <option key={h} value={String(h)}>{String(h).padStart(2, '0')}</option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    value={timeMin}
                    onChange={(e) => { setTimeMin(e.target.value); handleTimeChange(timeHour, e.target.value, timePeriod) }}
                  >
                    <option value="">MM</option>
                    {['00', '15', '30', '45'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    value={timePeriod}
                    onChange={(e) => { setTimePeriod(e.target.value); handleTimeChange(timeHour, timeMin, e.target.value) }}
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="col-12">
                <label className="form-label fw-semibold" style={{ color: '#1a3c6e' }}>
                  Additional Notes <span className="text-muted fw-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  className="form-control"
                  rows={3}
                  placeholder="Any special requirements, number of luggage, preferred time, etc."
                  value={form.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Selected Cab Preview */}
              {selectedCab && (
                <div className="col-12">
                  <div className="rounded-3 p-3 d-flex align-items-center gap-3" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <i className="bi bi-car-front-fill" style={{ fontSize: '2rem', color: '#1a3c6e' }}></i>
                    <div>
                      <div className="fw-bold" style={{ color: '#1a3c6e' }}>{selectedCab.name}</div>
                      <small className="text-muted">{selectedCab.type} &bull; {selectedCab.seats} seats &bull; &#x20b9;{selectedCab.pricePerKm}/km</small>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="col-12 pt-2">
                <button
                  type="submit"
                  className="btn btn-book w-100 py-3 rounded-3 fw-bold fs-5"
                  disabled={submitted}
                >
                  <i className="bi bi-whatsapp me-2" style={{ fontSize: '1.2rem' }}></i>
                  {submitted ? 'Opening WhatsApp...' : 'Send Booking via WhatsApp'}
                </button>
                <p className="text-center text-muted mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
                  <i className="bi bi-lock-fill me-1"></i>
                  Your details are only shared with us via WhatsApp. No data is stored.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default function BookPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero text-center">
        <div className="container">
          <i className="bi bi-calendar-check-fill mb-3" style={{ fontSize: '2.5rem', color: '#f5c518' }}></i>
          <h1 className="fw-bold mb-2">Book a Cab</h1>
          <p className="mb-0" style={{ opacity: 0.85 }}>
            Fill in your details and we will confirm your booking via WhatsApp
          </p>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb justify-content-center mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: '#f5c518', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">Book a Cab</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Booking Form Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <Suspense fallback={
                <div className="text-center py-5">
                  <div className="spinner-border" style={{ color: '#1a3c6e' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }>
                <BookForm />
              </Suspense>

              {/* Info Cards */}
              <div className="row g-3 mt-3">
                <div className="col-sm-4">
                  <div className="card border-0 text-center p-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                    <i className="bi bi-clock-fill mb-2" style={{ fontSize: '1.5rem', color: '#f5c518' }}></i>
                    <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '0.85rem' }}>Quick Response</div>
                    <small className="text-muted">Within 15 minutes</small>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card border-0 text-center p-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                    <i className="bi bi-shield-fill-check mb-2" style={{ fontSize: '1.5rem', color: '#198754' }}></i>
                    <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '0.85rem' }}>Safe Travel</div>
                    <small className="text-muted">Verified drivers</small>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card border-0 text-center p-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                    <i className="bi bi-currency-rupee mb-2" style={{ fontSize: '1.5rem', color: '#1a3c6e' }}></i>
                    <div className="fw-bold" style={{ color: '#1a3c6e', fontSize: '0.85rem' }}>Best Price</div>
                    <small className="text-muted">No hidden charges</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
