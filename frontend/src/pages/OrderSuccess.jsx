/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CheckCircle2, MessageSquare } from "lucide-react"
import { useCart } from "../components/context/CartContext"
import { useWishlist } from "../components/context/WishlistContext"
import { useTrial } from "../components/context/TrialContext"

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { whatsappUrl, orderId } = location.state || {}

  const [seconds, setSeconds] = useState(whatsappUrl ? 3 : 6)

  const { clearCart } = useCart()
  const { clearWishlist } = useWishlist()
  const { clearTrialItems } = useTrial()

  // CLEAR ONCE ON LOAD
  useEffect(() => {
    clearCart()
    clearWishlist()
    clearTrialItems()
  }, [])

  // COUNTDOWN & AUTO-REDIRECT
  useEffect(() => {
    if (seconds <= 0) {
      if (whatsappUrl) {
        window.location.href = whatsappUrl
      } else {
        navigate("/")
        window.scrollTo(0, 0)
      }
      return
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [seconds, whatsappUrl])

  return (
    <section className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 sm:px-6 py-10 overflow-hidden">
      <div className="bg-white border border-[#edf1e8] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-14 max-w-2xl w-full text-center shadow-sm">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf7df] flex items-center justify-center animate-bounce">
            <CheckCircle2
              size={55}
              className="text-[#2d5a2d] sm:w-[70px] sm:h-[70px]"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-8 sm:mt-10 text-[32px] sm:text-4xl md:text-5xl leading-tight font-black text-[#1D3B1D]">
          Order Placed Successfully
        </h1>

        {/* TEXT */}
        <p className="mt-5 sm:mt-6 text-[#4B5563] text-[15px] sm:text-lg leading-7 sm:leading-[1.9]">
          Thank you for shopping with Farm2Flake.
          <br className="hidden sm:block" />
          Your order has been received and is being processed.
        </p>

        {/* ORDER ID */}
        <div className="mt-8 inline-flex items-center justify-center bg-[#f5f8f2] px-5 sm:px-6 py-3 rounded-full text-[#2d5a2d] font-bold text-sm sm:text-base break-all max-w-full">
          Order ID: #{orderId || "F2F2026"}
        </div>

        {/* REDIRECT COUNTDOWN MESSAGE */}
        <p className="mt-8 sm:mt-10 text-gray-500 text-sm sm:text-base leading-7">
          {whatsappUrl ? (
            <>
              Confirming order on WhatsApp in{" "}
              <span className="font-extrabold text-[#2d5a2d]">{seconds}</span> seconds...
            </>
          ) : (
            <>
              Redirecting to homepage in{" "}
              <span className="font-extrabold text-[#183818]">{seconds}</span> seconds...
            </>
          )}
        </p>

        {/* BUTTON ACTION GRID */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition duration-300"
            >
              <MessageSquare size={18} />
              Confirm on WhatsApp
            </a>
          )}
          
          <button
            onClick={() => {
              navigate("/")
              window.scrollTo(0, 0)
            }}
            className="w-full sm:w-auto bg-[#1D3B1D] hover:bg-[#152b15] text-[#FAF7F2] px-7 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition duration-300 shadow-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  )
}