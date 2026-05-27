import { useEffect, useState } from "react"

import axios from "axios"

import { Link } from "react-router-dom"

export default function Testimonials() {

  const [reviews, setReviews] =
    useState([])



  // FETCH APPROVED REVIEWS
  const fetchReviews = async () => {

    try {

      const response =
        await axios.get(

          "https://farm2flake-backend.onrender.com/api/reviews"

        )



      setReviews(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchReviews()

  }, [])



  return (

    <section className="py-14 md:py-16 bg-[#fafaf7] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d3b1d] leading-tight">

            What Our Customers Say

          </h2>

        </div>



        {/* TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

          {reviews.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[22px] border border-[#f0f0f0] p-5 sm:p-6 shadow-sm hover:shadow-md transition"
            >

              {/* USER */}
              <div className="flex items-start gap-4">

                {/* AVATAR */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#e8f3cc] flex items-center justify-center text-[#1d3b1d] font-bold text-lg sm:text-xl shrink-0">

                  {

                    item.name?.charAt(0)

                  }

                </div>



                <div className="flex-1">

                  {/* REVIEW */}
                  <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed break-words">

                    "{item.review}"

                  </p>



                  {/* STARS */}
                  <div className="flex gap-1 mt-4 text-[#f4c430] text-sm">

                    {

                      "★".repeat(item.rating)

                    }

                  </div>



                  {/* NAME */}
                  <p className="text-gray-500 text-sm mt-2">

                    — {item.name}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>



        {/* EMPTY STATE */}
        {

          reviews.length === 0 && (

            <div className="text-center text-gray-500 mt-10">

              No customer reviews yet.

            </div>

          )

        }



        {/* BOTTOM BANNER */}
        <div className="mt-10 bg-[#e8f3cc] rounded-3xl px-5 sm:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          {/* LEFT */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full">

            {/* ICON */}
            <div className="text-4xl sm:text-5xl">

              📦

            </div>



            {/* TEXT */}
            <div>

              <h3 className="text-[#1d3b1d] font-bold text-xl sm:text-2xl leading-snug">

                Free Shipping on Orders Above ₹999

              </h3>



              <p className="text-gray-600 text-sm mt-2">

                Delivered fresh to your doorstep

              </p>

            </div>

          </div>



          {/* BUTTON */}
          <Link
            to="/shop"
            onClick={() =>
              window.scrollTo(0, 0)
            }
            className="w-full sm:w-fit bg-[#1f6b1f] hover:bg-[#195719] transition text-white px-8 py-3 rounded-xl font-semibold text-sm text-center whitespace-nowrap"
          >

            Shop Now →

          </Link>

        </div>

      </div>

    </section>

  )

}