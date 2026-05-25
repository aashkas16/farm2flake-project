import { useState } from "react"

export default function Newsletter() {

  const [email, setEmail] =
    useState("")



  const handleSubmit = (e) => {

    e.preventDefault()

    alert(`Subscribed with ${email}`)

    setEmail("")

  }



  return (

    <section className="bg-farm-green text-white py-10 sm:py-12 px-4 sm:px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto text-center">

        {/* HEADING */}
        <h2 className="text-[28px] sm:text-3xl md:text-4xl font-bold leading-tight mb-4">

          Free Shipping on Orders Above ₹359

        </h2>



        {/* SUBTEXT */}
        <p className="mb-8 text-[15px] sm:text-lg leading-7 max-w-2xl mx-auto text-white/90">

          Subscribe to get exclusive offers and nutrition tips!

        </p>



        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >

          {/* INPUT */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="flex-1 px-4 py-4 rounded-xl text-gray-800 outline-none text-sm sm:text-base min-w-0"
            required
          />



          {/* BUTTON */}
          <button
            type="submit"
            className="bg-farm-accent text-white px-6 sm:px-7 py-4 rounded-xl hover:bg-orange-600 font-semibold transition whitespace-nowrap text-sm sm:text-base"
          >

            Subscribe

          </button>

        </form>

      </div>

    </section>

  )

}