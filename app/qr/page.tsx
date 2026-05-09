"use client"

import QRCode from "react-qr-code"

export default function QRPage() {
  const reviewUrl = "https://katia-unappointable-witchingly.ngrok-free.dev/r/test123"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-6 text-4xl font-bold">
        QR Code
      </h1>

      <div className="bg-white p-4 rounded">
        <QRCode
            value={reviewUrl}
            size={256}
            bgColor="white"
            fgColor="black"
        />
      </div>

      <p className="mt-6">
        {reviewUrl}
      </p>
    </div>
  )
}