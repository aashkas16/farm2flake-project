import { useState } from "react"

import axios from "axios"

export default function ShareExperience() {

  const [name, setName] = useState("")

  const [rating, setRating] = useState(5)

  const [review, setReview] = useState("")

  const [loading, setLoading] = useState(false)



  const submitReview = async () => {

    if (!name || !review) {

      alert("Please fill all fields")

      return

    }



    try {

      setLoading(true)



      await axios.post(
        "http://localhost:5000/api/reviews",

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

    <section className="min-h-screen bg-[#fafaf7] py-20">

      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-[32px] p-10 border border-[#edf1e8] shadow-sm">

          <h1 className="text-5xl font-bold text-[#183818]">

            Share Your Experience

          </h1>



          <p className="mt-4 text-[#667166] text-lg leading-[1.8]">

            We'd love to hear your thoughts about Farm2Flake products.

          </p>



          {/* NAME */}
          <div className="mt-10">

            <label className="font-semibold text-[#111827]">

              Your Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
              className="mt-3 w-full h-[56px] rounded-2xl border border-[#dbe3ea] px-5 outline-none focus:border-[#2d5a2d]"
            />

          </div>



          {/* RATING */}
          <div className="mt-8">

            <label className="font-semibold text-[#111827]">

              Rating

            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
              className="mt-3 w-full h-[56px] rounded-2xl border border-[#dbe3ea] px-5 outline-none focus:border-[#2d5a2d]"
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
          <div className="mt-8">

            <label className="font-semibold text-[#111827]">

              Your Experience

            </label>

            <textarea
              rows="7"
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              placeholder="Write your experience..."
              className="mt-3 w-full rounded-2xl border border-[#dbe3ea] px-5 py-5 outline-none resize-none focus:border-[#2d5a2d]"
            />

          </div>



          {/* BUTTON */}
          <button
            onClick={submitReview}
            disabled={loading}
            className="mt-10 w-full h-[58px] rounded-2xl bg-[#2d5a2d] hover:bg-[#214421] transition text-white font-semibold text-lg"
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