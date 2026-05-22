import { useEffect, useState } from "react"

import axios from "axios"

import { Link } from "react-router-dom"

export default function Testimonials() {

  const [reviews, setReviews] = useState([])



  // FETCH APPROVED REVIEWS
  const fetchReviews = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/reviews"
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

    <section className="py-14 bg-[#fafaf7]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold text-[#1d3b1d]">

            What Our Customers Say

          </h2>

        </div>



        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {reviews.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[22px] border border-[#f0f0f0] p-6 shadow-sm"
            >

              {/* User */}
              <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#e8f3cc] flex items-center justify-center text-[#1d3b1d] font-bold text-xl shrink-0">

                  {
                    item.name?.charAt(0)
                  }

                </div>



                <div>

                  <p className="text-gray-700 text-[15px] leading-relaxed">

                    "{item.review}"

                  </p>



                  {/* Stars */}
                  <div className="flex gap-1 mt-4 text-[#f4c430] text-sm">

                    {
                      "★".repeat(item.rating)
                    }

                  </div>



                  <p className="text-gray-500 text-sm mt-2">

                    — {item.name}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>



        {/* Empty State */}
        {
          reviews.length === 0 && (

            <div className="text-center text-gray-500 mt-10">

              No customer reviews yet.

            </div>

          )
        }



        {/* Bottom Banner */}
        <div className="mt-8 bg-[#e8f3cc] rounded-2xl px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div className="text-5xl">

              📦

            </div>



            <div>

              <h3 className="text-[#1d3b1d] font-bold text-2xl">

                Free Shipping on Orders Above ₹999

              </h3>



              <p className="text-gray-600 text-sm mt-1">

                Delivered fresh to your doorstep

              </p>

            </div>

          </div>



          <Link
            to="/shop"
            className="bg-[#1f6b1f] hover:bg-[#195719] transition text-white px-8 py-3 rounded-xl font-semibold text-sm"
            onClick={() => window.scrollTo(0, 0)}
          >

            Shop Now →

          </Link>

        </div>

      </div>

    </section>

  )

}