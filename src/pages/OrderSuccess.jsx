/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { CheckCircle2 } from "lucide-react"

import { useCart } from "../components/context/CartContext"
import { useWishlist } from "../components/context/WishlistContext"

import { useTrial } from "../components/context/TrialContext"

export default function OrderSuccess() {

  const navigate = useNavigate()

  const [seconds, setSeconds] = useState(6)

  const { clearCart } = useCart()

  const { clearWishlist } = useWishlist()

  const { clearTrialItems } = useTrial()


  // CLEAR ONLY ONCE
  useEffect(() => {

    clearCart()
    clearWishlist()
    clearTrialItems()

  }, [])


  // COUNTDOWN
  useEffect(() => {

    if (seconds <= 0) {

      navigate("/")

      window.scrollTo(0, 0)

      return

    }

    const timer = setTimeout(() => {

      setSeconds((prev) => prev - 1)

    }, 1000)

    return () => clearTimeout(timer)

  }, [seconds])


  return (

    <section className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-6">

      <div className="bg-white border border-[#edf1e8] rounded-[32px] p-14 max-w-2xl w-full text-center shadow-sm">

        {/* ICON */}
        <div className="flex justify-center">

          <div className="w-28 h-28 rounded-full bg-[#edf7df] flex items-center justify-center">

            <CheckCircle2
              size={70}
              className="text-[#2d5a2d]"
            />

          </div>

        </div>


        {/* TITLE */}
        <h1 className="mt-10 text-5xl font-bold text-[#183818]">

          Order Placed Successfully

        </h1>


        {/* TEXT */}
        <p className="mt-6 text-[#667166] text-lg leading-[1.9]">

          Thank you for shopping with Farm2Flake.

          <br />

          Your order has been received and is being processed.

        </p>


        {/* ORDER ID */}
        <div className="mt-8 inline-flex items-center bg-[#f5f8f2] px-6 py-3 rounded-full text-[#2d5a2d] font-semibold">

          Order ID : #F2F2026

        </div>


        {/* REDIRECT */}
        <p className="mt-10 text-[#8b928b] text-sm">

          Redirecting to homepage in{" "}

          <span className="font-bold text-[#183818]">

            {seconds}

          </span>{" "}

          seconds...

        </p>


        {/* BUTTON */}
        <button
          onClick={() => {

            navigate("/")

            window.scrollTo(0, 0)

          }}
          className="mt-8 bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-8 py-4 rounded-xl font-semibold"
        >

          Continue Shopping

        </button>

      </div>

    </section>

  )

}