"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export default function ReviewPage() {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)

    // Redirect for positive reviews
    if (value >= 4) {
      window.location.href =
        "https://g.page/r/CeJcPxHZnxvUEBM/review"
    }
  }

  const handleSubmit = async () => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          name,
          phone,
          message,
        }),
      })

      setSubmitted(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white">

        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-6">
          <h1 className="text-3xl font-semibold text-center text-gray-900">
            Cosmetic Palace Nagpur
          </h1>

          <p className="text-center text-gray-500 mt-2 text-lg">
            Share your experience
          </p>
        </div>

        {/* Rating Section */}
        <div className="px-6 pt-12">
          <h2 className="text-center text-2xl font-medium text-gray-800">
            How was your experience?
          </h2>

          <div className="flex justify-center gap-3 mt-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
              >
                <Star
                  size={42}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Negative Feedback Form */}
        {rating > 0 && rating <= 3 && (
          <div className="px-6 mt-12 pb-10">

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

              <h3 className="text-2xl font-semibold text-gray-900">
                Tell us what went wrong
              </h3>

              <p className="text-gray-500 mt-2">
                Your feedback helps us improve.
              </p>

              <div className="mt-6 space-y-4">

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none text-lg"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none text-lg"
                />

                <textarea
                  placeholder="Please share your experience..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl p-4 outline-none text-lg"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold"
                >
                  Submit Feedback
                </button>

                {submitted && (
                  <p className="text-center text-green-600 font-medium">
                    Feedback submitted successfully.
                  </p>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}