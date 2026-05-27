import { useState } from "react"

import axios from "axios"

export default function ShareExperience() {

  const [name, setName] =
    useState("")

  const [rating, setRating] =
    useState(5)

  const [review, setReview] =
    useState("")

  const [loading, setLoading] =
    useState(false)



  const submitReview = async () => {

    if (!name || !review) {

      alert("Please fill all fields")

      return

    }



    try {

      setLoading(true)



      await axios.post(

        "https://farm2flake-backend.onrender.com/api/reviews",

        {

          name,
          rating,
          review

        }

      )



      alert(

        "Thank you! Your review has been submitted for approval."

      )



      setName("")

      setRating(5)

      setReview("")

    } catch (error) {

      console.log(error)

      alert("Failed to submit review")

    } finally {

      setLoading(false)

    }

  }



  return (

    <section className="min-h-screen bg-[#fafaf7] py-10 md:py-20 overflow-hidden">

      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#edf1e8] shadow-sm">

          {/* HEADING */}
          <h1 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#183818] leading-tight">

            Share Your Experience

          </h1>



          {/* SUBTEXT */}
          <p className="mt-4 text-[#667166] text-[15px] sm:text-lg leading-7 sm:leading-[1.8]">

            We'd love to hear your thoughts about Farm2Flake products.

          </p>



          {/* NAME */}
          <div className="mt-8 sm:mt-10">

            <label className="font-semibold text-[#111827] text-sm sm:text-base">

              Your Name

            </label>



            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              className="mt-3 w-full h-[54px] sm:h-[56px] rounded-2xl border border-[#dbe3ea] px-5 outline-none focus:border-[#2d5a2d] text-sm sm:text-base"
            />

          </div>



          {/* RATING */}
          <div className="mt-7 sm:mt-8">

            <label className="font-semibold text-[#111827] text-sm sm:text-base">

              Rating

            </label>



            <select
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
              className="mt-3 w-full h-[54px] sm:h-[56px] rounded-2xl border border-[#dbe3ea] px-5 outline-none focus:border-[#2d5a2d] text-sm sm:text-base bg-white"
            >

              <option value="5">

                ⭐⭐⭐⭐⭐ Excellent

              </option>



              <option value="4">

                ⭐⭐⭐⭐ Very Good

              </option>



              <option value="3">

                ⭐⭐⭐ Good

              </option>



              <option value="2">

                ⭐⭐ Average

              </option>



              <option value="1">

                ⭐ Poor

              </option>

            </select>

          </div>



          {/* REVIEW */}
          <div className="mt-7 sm:mt-8">

            <label className="font-semibold text-[#111827] text-sm sm:text-base">

              Your Experience

            </label>



            <textarea
              rows="7"
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              placeholder="Write your experience..."
              className="mt-3 w-full rounded-2xl border border-[#dbe3ea] px-5 py-5 outline-none resize-none focus:border-[#2d5a2d] text-sm sm:text-base leading-7"
            />

          </div>



          {/* BUTTON */}
          <button
            onClick={submitReview}
            disabled={loading}
            className="mt-8 sm:mt-10 w-full h-[56px] sm:h-[58px] rounded-2xl bg-[#2d5a2d] hover:bg-[#214421] transition text-white font-semibold text-base sm:text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >

            {

              loading

                ? "Submitting..."

                : "Submit Review"

            }

          </button>

        </div>

      </div>

    </section>

  )

}