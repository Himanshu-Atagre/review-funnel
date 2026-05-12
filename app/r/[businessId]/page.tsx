"use client"

import { useState } from "react"
import { ArrowLeft, CircleUserRound, Info, Star } from "lucide-react"

export default function ReviewPage() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const [submitted, setSubmitted] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)

    // Positive Review Redirect
    if (value >= 4) {
      window.location.href =
        "https://g.page/r/CeJcPxHZnxvUEBM/review"
    }
  }

  const handleSubmit = async () => {
    try {
      const YOUR_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwIKC1z0cIG-ZDugSQNxDa_3ilqg-TEwGb82LGnhXCXp609nBqMFFmwQcc5Yrt6u4tu/exec"

      await fetch(YOUR_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          rating: String(rating),
          name: name,
          phone: phone,
          message: message,
        }).toString(),
      })

      setSubmitted(true)
      setName("")
      setPhone("")
      setMessage("")
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center">
      <div className="w-full max-w-md bg-[#f5f5f5] min-h-screen">

        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-5 border-b bg-white">
          <ArrowLeft className="w-7 h-7 text-gray-700" />

          <h1 className="text-[20px] font-normal text-gray-800">
            Cosmetic Palace Nagpur
          </h1>
        </div>

        {/* User Section */}
        <div className="px-5 pt-8 flex items-start gap-4">

          <div>
            <CircleUserRound className="w-14 h-14 text-gray-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-medium text-gray-800">
                Posting publicly
              </h2>

              <Info className="w-5 h-5 text-gray-500" />
            </div>

            <p className="text-gray-500 text-[15px]">
              Share your experience with this place
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-4 mt-12 px-4">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition"
            >
              <Star
                strokeWidth={1.5}
                className={`w-12 h-12 transition-all duration-200 ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feedback Form Only For <=3 */}
        {rating > 0 && rating <= 3 && (
          <div className="px-5 mt-10 pb-10">

            <div className="border border-gray-400 rounded-xl bg-white p-4">

              <textarea
                placeholder="Share details of your own experience at this place"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full outline-none resize-none text-[18px] text-black placeholder:text-gray-400"
              />

            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-5 border border-gray-300 rounded-xl bg-white px-4 py-4 text-[17px] text-black outline-none"
            />

            {/* Phone */}
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-4 border border-gray-300 rounded-xl bg-white px-4 py-4 text-[17px] text-black outline-none"
            />

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-[#1a73e8] text-white py-4 rounded-full text-[18px] font-medium"
            >
              Submit Feedback
            </button>

            {submitted && (
              <p className="text-green-600 text-center mt-4 font-medium">
                Feedback submitted successfully
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}