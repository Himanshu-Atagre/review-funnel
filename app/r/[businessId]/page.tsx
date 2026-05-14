"use client"

import { use, useState } from "react"
import { ArrowLeft, CircleUserRound, Info, Star } from "lucide-react"

/* -------------------------------------------------- */
/*  BUSINESS CONFIG                                    */
/*                                                     */
/*  HOW TO GET A CORRECT GOOGLE REVIEW URL:            */
/*  1. Open Google Maps on desktop                     */
/*  2. Search your business name                       */
/*  3. Click "Write a review"                          */
/*  4. Copy the full URL from the address bar          */
/*  It will look like:                                 */
/*  https://search.google.com/local/writereview        */
/*        ?placeid=ChIJXXXXXXXXXXXXXXXXXX             */
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
    // ⚠️ Replace — old URL was a hotel booking link, not a review link
    googleReviewUrl: "https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TMutSi_ONrI0YLRSNagwTkoxSTY3TExNNTA2TrSwtDKoSDI0SjM3MUwzMEo0TDQzTvGSysgvSc1RKM5Mz0ssKS1KVcjMy1PIS0wvKC0CAOfIGbQ&q=hotel+signature+inn+nagpur&rlz=1C1CHBF_enIN1038IN1038&oq=hotel+signature&gs_lcrp=EgZjaHJvbWUqGQgBEC4YrwEYxwEYkQIYgAQYigUYmAUYmQUyCQgAEEUYORiABDIZCAEQLhivARjHARiRAhiABBiKBRiYBRiZBTINCAIQLhivARjHARiABDITCAMQLhivARjHARiABBiYBRiZBTIQCAQQLhivARjHARiABBiYBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDg2MjBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x3bd4c71aee033a89:0xb12f741f02a1a63d,3,,,,",
  },
  "hotel-prime": {
    name: "Hotel Prime",
    // ⚠️ Replace — old URL was a hotel booking link, not a review link
    googleReviewUrl: "https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TDdMqTLJsjQ3YLRSNagwTkoxSTY3TExLTEk2MDI3tzKoMDcxMTFKM0pLSTVMTks1MPISysgvSc1RKCjKzE1VyEtMLygtAgARzxaD&q=hotel+prime+nagpur&rlz=1C1CHBF_enIN1038IN1038&oq=hotel+prime&gs_lcrp=EgZjaHJvbWUqGQgDEC4YrwEYxwEYkQIYgAQYigUYmAUYmQUyGQgAEC4YrwEYxwEYkQIYgAQYigUYmAUYmQUyBggBEEUYOTINCAIQABiRAhiABBiKBTIZCAMQLhivARjHARiRAhiABBiKBRiYBRiZBTIHCAQQABiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDg2NDRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#lrd=0x3bd4c71afadc0277:0x74442f2fde1cfe02,3,,,,",
  },
  "regenta-central-hotel": {
    name: "Regenta Central Hotel",
    // ⚠️ Replace — old URL was a hotel booking link, not a review link
    googleReviewUrl: "https://www.google.com/search?q=regenta-central-hotel&rlz=1C1CHBF_enIN1038IN1038&oq=regenta-central-hotel&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQABgeMgkIAhAAGB4YkgMyBggDEAAYHjIGCAQQABgeMgYIBRAAGB4yBggGEAAYHjIGCAcQRRg80gEINDYyNGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x3bd4c7ab11ba3647:0x43057e4cb0eb6be5,3,,,,",
  },
  "tadka-house-family-garden-restaurant": {
    name: "Tadka House Family Garden Restaurant",
    googleReviewUrl: "https://www.google.com/search?newwindow=1&sca_esv=cc91047a17fc1aa0&rlz=1C1CHBF_enIN1038IN1038&sxsrf=ANbL-n5CayHLV-vkV5KZaoBjcvZD3zhqDw:1778752882898&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOfFspoKgPfabBPJMQBJAgknlB0EFlDM5qoRrNy5koNbM4LtVhwYVGBeTnTGKwKJSwDSLHJvk0H5zvMOyfLourrdzC8D95oxAX1zofFIeEuPj_EGUlbxGi8ZN5TFugpDbplViXLg%3D&q=Tadka+House+Family+Garden+Restaurant+Reviews&sa=X&ved=2ahUKEwiRxOntwriUAxXXr1YBHRo3MSQQ0bkNegQIMRAF&biw=1280&bih=585&dpr=1.5#lrd=0x3bd4bfb680accf3b:0xb52b0dcd564983da,3,,,,",
  },
  "tipsy-turk": {
    name: "Tipsy Turk",
    googleReviewUrl: "https://www.google.com/search?newwindow=1&sca_esv=a059850cea61b84d&rlz=1C1CHBF_enIN1038IN1038&sxsrf=ANbL-n4AKm1xKU7unxT2xFP5zyGvqslQUg:1778750082596&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOc7ZsEauOZYubR3ueCro9U8eFJ2wmBbtte9lMZ6VZ-3CKbDJ8LbdkVJRjYFTk7w-2GV65EuJ0-6sMfwah9eQXyJOU-Lc&q=Tipsy+Turk+Reviews&sa=X&ved=2ahUKEwjF0MS2uLiUAxXk7TgGHdm8L8oQ0bkNegQIRhAH#lrd=0x3bd4c141e643b58b:0xf5f4fdca8a4454b4,3,,,,",
  },
  "angel-n-devil-restro-lounge-bar": {
    name: "Angel's N Devil's Restro, Lounge & Bar",
    googleReviewUrl: "https://www.google.com/search?newwindow=1&sca_esv=cc91047a17fc1aa0&rlz=1C1CHBF_enIN1038IN1038&sxsrf=ANbL-n4JWbSy4udFAt2Llqq0eux9_stLEQ:1778753001428&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOTKFqPSQZFg8sNjExbrzJFjfaUd84-ykE4AyE8vg0uUSWA0Sg0VK9FDU57uiLvvzqywokniEO58iES3jYE8l40O4zFfTUPaPo5lrffpQ_BHboZRNxGWURE5_PETorE8eQu2Uxd60gOSRRozieYvhfvmtKl8XSQgJJJQ7uaNVxMBAy5V6JG7XYigKAYopf5oe__M3CJO0eZuvI-mmPhJMPDUW8NBU_1u0VQyLi6AyN1u59ZlSvA%3D%3D&q=Angel%27s+N+Devil%27s+Restro,+Lounge+%26+Bar+-+Best+Family+Restaurant+%7C+Highway+Restaurant+%7C+Dining+Restaurant+In+Nagpur+Reviews&sa=X&ved=2ahUKEwjAiKymw7iUAxUarlYBHS-pBxgQ0bkNegQIQhAF&biw=1280&bih=585&dpr=1.5#lrd=0x3bd4c1e9d0831595:0x89ddd54431366e00,3,,,,",
  },
  "revola-skin-and-hair-clinic": {
    name: "Revola Skin And Hair Clinic",
    googleReviewUrl: "https://www.google.com/search?newwindow=1&sca_esv=cc91047a17fc1aa0&rlz=1C1CHBF_enIN1038IN1038&sxsrf=ANbL-n7GvdybEZ5cd7NIk6Wp9Qrb_0t77Q:1778753062568&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUxJwWx-3fkJg2BXaQ61t197eSff0fRPhxhqU4kZVBPRys3CywEytNeVZC56md95vpgdhq52TMi3aghXv0CCG-2-xlHf-c1IDY67PA59o4yEppaZJAvhaxn-URHHWYjPa9WdNpeSb4JzaepAnJZkpMLCL505&q=Revola+Skin+And+Hair+Clinic+in+Bajaj+Nagar,Nagpur+Reviews&sa=X&ved=2ahUKEwj42b_Dw7iUAxVbUOsIHecpHhwQ0bkNegQIOxAH&biw=1280&bih=585&dpr=1.5#lrd=0x3bd4c164c5612bd7:0xfaa5683b4c90bb07,3,,,,",
  },
  "vishal-chadha-skin-and-hair-clinic": {
    name: "Dr. Vishal Chadha's Skin & Hair Clinic",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJvUVAU6nB1DsRphwHbsPlZCk",
  },
}

/* -------------------------------------------------- */
/*  PAGE                                               */
/* -------------------------------------------------- */

export default function ReviewPage({
  params,
}: {
  // FIX 1: In Next.js 15+, params is a Promise — not a plain object.
  // The old type { businessId: string } silently made businessId
  // undefined, breaking every business lookup.
  params: Promise<{ businessId: string }>
}) {
  // FIX 2: use() is the correct way to unwrap async params
  // inside a Client Component in Next.js 15+.
  const { businessId } = use(params)
  const business = businesses[businessId]

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)
    if (value >= 4 && business?.googleReviewUrl) {
      window.location.href = business.googleReviewUrl
    }
  }

  const handleSubmit = async () => {
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
    }
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Business Not Found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center">
      <div className="w-full max-w-md bg-[#f5f5f5] min-h-screen">

        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-5 border-b bg-white">
          <ArrowLeft className="w-7 h-7 text-gray-700" />
          <h1 className="text-[20px] font-normal text-gray-800">
            {business.name}
          </h1>
        </div>

        {/* User Section */}
        <div className="px-5 pt-8 flex items-start gap-4">
          <CircleUserRound className="w-14 h-14 text-gray-400" />
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
        <div className="flex justify-center gap-2 mt-12 px-4">
          {[1, 2, 3, 4, 5].map((star) => (
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
                minWidth: "56px",
                minHeight: "56px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <Star
                strokeWidth={1.5}
                style={{ pointerEvents: "none" }}
                className={`w-12 h-12 transition-all duration-200 ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Negative Feedback Form */}
        {rating > 0 && rating <= 3 && (
          <div className="px-5 mt-10 pb-10">
            <div className="border border-gray-400 rounded-xl bg-white p-4">
              <textarea
                placeholder="Share details of your own experience at this place"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ fontSize: "16px" }}
                className="w-full outline-none resize-none text-black placeholder:text-gray-400"
              />
            </div>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: "16px" }}
              className="w-full mt-5 border border-gray-300 rounded-xl bg-white px-4 py-4 text-black outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ fontSize: "16px" }}
              className="w-full mt-4 border border-gray-300 rounded-xl bg-white px-4 py-4 text-black outline-none"
            />

            <button
              type="button"
              onPointerDown={handleSubmit}
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
              className="w-full mt-6 bg-[#1a73e8] text-white py-4 rounded-full text-[18px] font-medium"
            >
              Submit Feedback
            </button>

            {submitted && (
              <p className="text-green-600 text-center mt-4 font-medium">
                ✓ Feedback submitted successfully
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  )
}