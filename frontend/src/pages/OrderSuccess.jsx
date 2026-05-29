/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { CheckCircle2 } from "lucide-react"

import { useCart } from "../components/context/CartContext"

import { useWishlist } from "../components/context/WishlistContext"

import { useTrial } from "../components/context/TrialContext"

export default function OrderSuccess() {

  const navigate = useNavigate()

  const [seconds, setSeconds] =
    useState(6)



  const { clearCart } =
    useCart()

  const { clearWishlist } =
    useWishlist()

  const { clearTrialItems } =
    useTrial()
    

   useEffect(() => {

  const timer = setTimeout(() => {

    window.location.href = "/"

  }, 2500)

  return () => clearTimeout(timer)

}, [])


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

      setSeconds(

        (prev) => prev - 1

      )

    }, 1000)



    return () => clearTimeout(timer)

  }, [seconds])



  return (

    <section className="min-h-screen bg-[#fafaf7] flex items-center justify-center px-4 sm:px-6 py-10 overflow-hidden">

      <div className="bg-white border border-[#edf1e8] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-14 max-w-2xl w-full text-center shadow-sm">

        {/* ICON */}
        <div className="flex justify-center">

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf7df] flex items-center justify-center">

            <CheckCircle2
              size={55}
              className="text-[#2d5a2d] sm:w-[70px] sm:h-[70px]"
            />

          </div>

        </div>



        {/* TITLE */}
        <h1 className="mt-8 sm:mt-10 text-[32px] sm:text-4xl md:text-5xl leading-tight font-bold text-[#183818]">

          Order Placed Successfully

        </h1>



        {/* TEXT */}
        <p className="mt-5 sm:mt-6 text-[#667166] text-[15px] sm:text-lg leading-7 sm:leading-[1.9]">

          Thank you for shopping with Farm2Flake.

          <br className="hidden sm:block" />

          Your order has been received and is being processed.

        </p>



        {/* ORDER ID */}
        <div className="mt-8 inline-flex items-center justify-center bg-[#f5f8f2] px-5 sm:px-6 py-3 rounded-full text-[#2d5a2d] font-semibold text-sm sm:text-base break-all max-w-full">

          Order ID : #F2F2026

        </div>



        {/* REDIRECT */}
        <p className="mt-8 sm:mt-10 text-[#8b928b] text-sm sm:text-base leading-7">

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
          className="mt-8 w-full sm:w-auto bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-7 sm:px-8 py-4 rounded-xl font-semibold text-sm sm:text-base"
        >

          Continue Shopping

        </button>

      </div>

    </section>

  )

}