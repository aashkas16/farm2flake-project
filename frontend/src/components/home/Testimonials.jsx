import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Star, Quote, ArrowRight, MessageSquareCheck } from "lucide-react"

export default function Testimonials() {
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://farm2flake-backend.onrender.com/api/reviews")
      setReviews(response.data)
    } catch (error) {
      console.log("Error loading reviews:", error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HEADING */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-2">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] tracking-tight">
            Customer Testimonials
          </h2>
          <p className="text-gray-500 mt-4 text-xs sm:text-sm leading-relaxed">
            Real feedback from health-conscious snackers, bakers, and nutritionists.
          </p>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF7F2] rounded-3xl border border-[#1D3B1D]/5 p-6 sm:p-8 flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#2F7C1F]/10" />

              <div>
                {/* STARS */}
                <div className="flex text-amber-400 gap-0.5 mb-4">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="stroke-none" />
                  ))}
                </div>

                {/* REVIEW TEXT */}
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed italic">
                  "{item.review}"
                </p>

                {/* USER PROFILE */}
                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-[#1D3B1D]/5">
                  <div className="w-10 h-10 rounded-full bg-[#1D3B1D] text-[#FAF7F2] flex items-center justify-center font-extrabold text-sm uppercase shrink-0">
                    {item.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#111827] text-sm sm:text-base">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>

              {/* ADMIN REPLY BLOCK */}
              {item.admin_reply && (
                <div className="mt-6 bg-white border border-[#2F7C1F]/15 rounded-2xl p-4 shadow-sm relative">
                  <div className="flex items-center gap-2 text-[#2F7C1F] mb-1.5">
                    <MessageSquareCheck size={16} />
                    <span className="font-bold text-xs uppercase tracking-wide">
                      Official Reply
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.admin_reply}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-2 text-right">
                    — Farm2Flake Team
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {reviews.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-medium text-sm">
            No customer reviews available yet. Be the first to share your experience!
          </div>
        )}

        {/* PROMO SHIPPING BAR */}
        <div className="mt-14 bg-[#1D3B1D] text-[#FAF7F2] rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(29,59,29,0.12)]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-4xl">🚚</span>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl leading-snug">
                Free Shipping on Orders Above ₹999
              </h3>
              <p className="text-[#FAF7F2]/75 text-xs sm:text-sm mt-1">
                Delivered fresh, pure, and securely sealed to your doorstep pan India.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            onClick={() => window.scrollTo(0, 0)}
            className="w-full md:w-auto bg-[#2F7C1F] hover:bg-white hover:text-[#1D3B1D] transition-all duration-300 text-white px-8 py-4 rounded-xl font-bold text-sm text-center whitespace-nowrap"
          >
            Shop Collection →
          </Link>
        </div>

      </div>
    </section>
  )
}