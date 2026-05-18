"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Copy, Loader2, Check } from "lucide-react";

import { getBusinessById } from "@/lib/businesses";

export default function ReviewSuggestionsPage() {
  const params = useParams();
  const router = useRouter();
  
  const businessId = params.businessId as string;
  const business = getBusinessById(businessId);

  const [reviews, setReviews] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState("");
  const [loading, setLoading] = useState(true);

  // Generate AI Reviews
  useEffect(() => {
    if (business) {
      generateReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateReviews = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: business?.name,
          keywords: business?.keywords,
          rating: 5,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Execute Sync
  const handleExecuteSync = async () => {
    if (!selectedReview) return;

    try {
      await navigator.clipboard.writeText(selectedReview);
      
      alert("Review copied successfully. Paste it into Google Review.");
      
      window.location.href = business?.googleReviewUrl || "/";
    } catch (error) {
      console.error(error);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-[#f4f2fa] flex flex-col items-center pt-10 sm:pt-16 p-6 w-full">
        <div className="bg-white w-full max-w-2xl px-10 py-8 rounded-3xl shadow-sm text-center mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">Business Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    // Exact same wrapper constraints as page 1: center-top aligned, w-full
    <div className="min-h-screen bg-[#f4f2fa] flex flex-col items-center justify-start pt-10 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-200 w-full">
      {/* Exact same max-w-2xl inner constraint to prevent shifting */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Top Stars Header */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 w-full" title="Click to change rating">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <button
              key={i}
              onClick={() => router.back()}
              className="outline-none transition-transform duration-300 hover:scale-110 focus-visible:scale-110 active:scale-95 cursor-pointer"
              aria-label="Change rating"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <Star className="w-10 h-10 sm:w-12 sm:h-12 fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]" />
            </button>
          ))}
        </div>

        {/* Excellence Badge */}
        <div className="flex justify-center mb-6 w-full">
          <div className="bg-[#fcf5eb] border border-[#f5e3cc] text-[#d97706] px-6 sm:px-8 py-2.5 rounded-full font-bold tracking-[0.25em] text-xs sm:text-sm uppercase shadow-sm">
            Elite Excellence
          </div>
        </div>

        {/* Page Titles added from screenshot request */}
        <div className="text-center mb-5 w-full px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">Choose Your Review</h1>
          <p className="text-gray-500 text-sm font-medium">Select a narrative, edit if needed, then sync to Google.</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 text-purple-600 space-y-6 w-full">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
            <p className="text-lg sm:text-xl font-medium tracking-wide animate-pulse text-gray-600">
              Generating AI Narratives...
            </p>
          </div>
        )}

        {/* Reviews List & Flow - ADDED max-w-xl HERE TO MAKE BOXES COMPACT */}
        {!loading && (
          <div className="w-full max-w-xl space-y-10 sm:space-y-13 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Narrative Cards */}
            {reviews.map((review, index) => {
              const isSelected = selectedReview === review;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedReview(review)}
                  className={`group w-full cursor-pointer rounded-3xl p-4 sm:p-5 transition-all duration-300 border-2 
                    ${isSelected 
                      ? "bg-white border-purple-500 shadow-[0_8px_30px_rgb(147,51,234,0.12)] -translate-y-1" 
                      : "bg-white/60 border-transparent shadow-sm hover:bg-white hover:shadow-md hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    
                    {/* Custom Radio Icon */}
                    <div className="shrink-0 mt-0.5">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${isSelected 
                          ? "bg-purple-600 border-purple-600 text-white scale-110 shadow-md shadow-purple-500/30" 
                          : "border-gray-300 text-transparent group-hover:border-purple-300"
                        }`}
                      >
                        <Check strokeWidth={3} className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold tracking-[0.15em] text-[11px] sm:text-xs mb-2 uppercase transition-colors truncate
                        ${isSelected ? "text-purple-600" : "text-purple-600/70 group-hover:text-purple-600"}`}
                      >
                        GBP Narrative {index + 1}
                      </h3>
                      
                      {/* Readability optimizations - slightly smaller text for compact boxes */}
                      <p className={`text-gray-800 text-[15px] sm:text-base leading-relaxed italic font-light transition-all
                        ${isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                      >
                        {review}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Calibration Panel */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden w-full
              ${selectedReview ? "max-h-screen opacity-100 pt-6 sm:pt-8" : "max-h-0 opacity-0 pt-0"}`}
            >
              <h2 className="text-gray-400 tracking-[0.2em] font-bold text-[11px] sm:text-xs uppercase mb-4 text-center">
                Calibration Panel (Optional Edit)
              </h2>

              <div className="relative group w-full">
                <textarea
                  value={selectedReview}
                  onChange={(e) => setSelectedReview(e.target.value)}
                  rows={5}
                  className="w-full min-h-36 bg-white rounded-3xl p-4 sm:p-5 text-[15px] sm:text-base leading-relaxed text-gray-800 border-2 border-gray-100 outline-none resize-none shadow-sm transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-300"
                />
              </div>

              {/* Sync Button */}
              <button
                onClick={handleExecuteSync}
                className="w-full mt-5 mb-8 bg-purple-600 hover:bg-purple-700 text-white h-14 sm:h-15 rounded-full text-[15px] sm:text-base font-bold tracking-[0.2em] shadow-[0_8px_25px_rgb(147,51,234,0.3)] hover:shadow-[0_12px_35px_rgb(147,51,234,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                EXECUTE SYNC
              </button>
              
              {/* Footer text */}
              <div className="text-center pb-8 w-full">
                <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  Encrypted via GBP Hub V4.0
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}