"use client"

import { use, useState } from "react"
import {
  ArrowLeft,
  CircleUserRound,
  Info,
  Star,
  CheckCircle2,
} from "lucide-react"
import { useRouter } from "next/navigation"

/* -------------------------------------------------- */
/* BUSINESS CONFIG — unchanged                        */
/* -------------------------------------------------- */

const businesses: Record<
  string,
  { name: string; googleReviewUrl: string }
> = {
  "cosmetic-palace": {
    name: "Cosmetic Palace Nagpur",
    googleReviewUrl: "https://g.page/r/CeJcPxHZnxvUEBM/review",
  },
  "hotel-signature-inn": {
    name: "Hotel Signature Inn",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11fmzgsk29",
  },
  "hotel-prime": {
    name: "Hotel Prime",
    googleReviewUrl: "https://www.google.com/maps?cid=8377873089452375554",
  },
  "regenta-central-hotel": {
    name: "Regenta Central Hotel",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11fj9hspmz",
  },
  "tadka-house-family-garden-restaurant": {
    name: "Tadka House Family Garden Restaurant",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11w55gcl_c",
  },
  "tipsy-turk": {
    name: "Tipsy Turk",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11txdy4x8z",
  },
  "angel-n-devil-restro-lounge-bar": {
    name: "Angel's N Devil's Restro, Lounge & Bar",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11mw0n6dhl",
  },
  "revola-skin-and-hair-clinic": {
    name: "Revola Skin And Hair Clinic",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=/g/11l359n5y_",
  },
  "vishal-chadha-skin-and-hair-clinic": {
    name: "Dr. Vishal Chadha's Skin & Hair Clinic",
    googleReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJvUVAU6nB1DsRphwHbsPlZCk",
  },
}

/* -------------------------------------------------- */
/* PAGE                                               */
/* -------------------------------------------------- */

export default function ReviewPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const router = useRouter()
  const { businessId } = use(params)
  const business = businesses[businessId]

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* — all logic unchanged — */
  const handleRating = (value: number) => {
    setRating(value)
    if (value >= 4 && business?.googleReviewUrl) {
      setTimeout(() => {
        router.push(`/review-suggestions/${businessId}`)
      }, 300)
    }
  }

  const handleSubmit = async () => {
    if (!message.trim() || !name.trim()) return
    setIsSubmitting(true)
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwIKC1z0cIG-ZDugSQNxDa_3ilqg-TEwGb82LGnhXCXp609nBqMFFmwQcc5Yrt6u4tu/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            businessId,
            businessName: business.name,
            rating: String(rating),
            name,
            phone,
            message,
          }).toString(),
        }
      )
      setSubmitted(true)
      setName("")
      setPhone("")
      setMessage("")
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#f4f1fb] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm px-8 py-10 text-center max-w-sm w-full border border-gray-100">
          <p className="text-gray-500 text-sm">Business not found. The link may be incorrect.</p>
        </div>
      </div>
    )
  }

  const activeIndex = hover || rating
  const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"]

  return (
    /* 
      FIX: min-h-screen with items-start + pt-8 sm:pt-12
      — content starts from the top, not floating in the middle 
    */
    <div className="min-h-screen bg-[#f4f1fb] flex flex-col items-center justify-start pt-8 sm:pt-12 pb-16 px-4">
      <div className="w-full max-w-md">

        {/* ── Top nav bar ── */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-md transition-all border border-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-600 truncate">{business.name}</span>
        </div>

        {/* ── Main card ── */}
        <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(109,40,217,0.08)] border border-purple-50 overflow-hidden">

          {/* Identity strip */}
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-50/60 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
              <CircleUserRound className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-800">Posting publicly</span>
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Share your experience with others</p>
            </div>
          </div>

          {/* Rating body */}
          <div className="px-6 sm:px-10 pt-10 pb-8 text-center">

            <span className="inline-block text-xs font-bold tracking-[0.22em] text-purple-500 uppercase mb-5">
              Rate Your Visit
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-2">
              How was your experience?
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              Tap a star to share your feedback
            </p>

            {/* Stars */}
            <div className="flex justify-center items-center gap-1 sm:gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= activeIndex
                return (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                    onPointerDown={() => handleRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                      minWidth: "52px",
                      minHeight: "52px",
                    }}
                    className="flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95"
                  >
                    <Star
                      style={{ pointerEvents: "none" }}
                      className={`w-11 h-11 sm:w-12 sm:h-12 transition-all duration-200 ${
                        isActive
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.45)]"
                          : "text-gray-200 hover:text-gray-300"
                      }`}
                      strokeWidth={isActive ? 0 : 1.5}
                    />
                  </button>
                )
              })}
            </div>

            {/* Dynamic label */}
            <div className="h-6 flex items-center justify-center">
              {rating > 0 && (
                <span className={`text-sm font-semibold px-3 py-0.5 rounded-full ${
                  rating >= 4
                    ? "bg-green-50 text-green-600"
                    : rating === 3
                    ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-500"
                }`}>
                  {ratingLabels[rating]}
                </span>
              )}
            </div>

          </div>

          {/* ── Negative feedback form ── */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            rating > 0 && rating <= 3 ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="px-6 sm:px-10 pt-6 pb-8 border-t border-gray-100 bg-gray-50/40">

              <p className="text-sm font-semibold text-gray-700 mb-4">How can we improve?</p>

              <div className="space-y-3">
                <textarea
                  placeholder="Tell us what went wrong..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ fontSize: "16px" }}
                  className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none resize-none transition-all placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/10"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ fontSize: "16px" }}
                    className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/10"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ fontSize: "16px" }}
                    className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/10"
                  />
                </div>
              </div>

              {!submitted ? (
                <button
                  type="button"
                  onPointerDown={handleSubmit}
                  disabled={isSubmitting || !message.trim() || !name.trim()}
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  className="w-full mt-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-xl text-sm font-semibold tracking-wide shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.4)] hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Feedback"}
                </button>
              ) : (
                <div className="mt-5 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Feedback received</p>
                    <p className="text-xs text-green-600 mt-0.5">Thank you for helping us improve.</p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Footer */}
          <div className="py-3 border-t border-gray-50 text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-300">
              Powered by Review Funnel
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}