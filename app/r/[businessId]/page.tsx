"use client"

import { useState } from "react"

export default function ReviewPage() {
  const [rating, setRating] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const googleReviewUrl = "https://www.google.com"

  const handleRating = (value: number) => {
    setRating(value)
    if (value >= 4) {
      window.location.href = googleReviewUrl
    } else {
      setShowForm(true)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId: "test123", rating, name, phone, message }),
      })
      const data = await response.json()
      console.log(data)
      setSubmitted(true)
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
        <div className="w-full max-w-md text-center">
          <div className="mb-4 text-6xl">🙏</div>
          <h2 className="text-3xl font-bold">Thank You!</h2>
          <p className="mt-3 text-gray-400">Your feedback has been received.</p>
        </div>
      </div>
    )
  }

  const activeIndex = hovered ?? rating ?? 0

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight">Review Funnel</h1>
        <p className="mt-3 text-lg text-gray-400">How was your experience?</p>

        <div className="mt-8 flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Rate ${star} stars`}
              onPointerDown={() => handleRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                minWidth: "56px",
                minHeight: "56px",
                background: "none",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  lineHeight: 1,
                  pointerEvents: "none",
                  color: star <= activeIndex ? "#facc15" : "#4b5563",
                  transition: "color 0.15s ease",
                  userSelect: "none",
                }}
              >
                {star <= activeIndex ? "★" : "☆"}
              </span>
            </button>
          ))}
        </div>

        {rating && !showForm && (
          <p className="mt-5 text-sm text-gray-400">
            You selected{" "}
            <span className="font-semibold text-white">
              {rating} star{rating > 1 ? "s" : ""}
            </span>
            {rating >= 4 ? " — redirecting…" : ""}
          </p>
        )}

        {showForm && (
          <div className="mt-8 space-y-3 text-left">
            <p className="mb-4 text-center text-sm text-gray-400">
              We're sorry to hear that. Tell us what happened.
            </p>

            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: "16px" }}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none focus:border-white/30"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ fontSize: "16px" }}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none focus:border-white/30"
            />

            <textarea
              placeholder="Your Feedback *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              style={{ fontSize: "16px" }}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none focus:border-white/30"
            />

            <button
              type="button"
              onPointerDown={handleSubmit}
              disabled={submitting || !name.trim() || !message.trim()}
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                fontSize: "16px",
              }}
              className="w-full rounded-lg bg-white p-3 font-semibold text-black transition-opacity active:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting…" : "Submit Feedback"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}