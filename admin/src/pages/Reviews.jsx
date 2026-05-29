import { useEffect, useState } from "react"

import axios from "axios"

import {
Check,
Trash2
} from "lucide-react"

export default function Reviews() {

const [reviews, setReviews] =
useState([])

const [loading, setLoading] =
useState(true)

// FETCH REVIEWS
const fetchReviews = async () => {

try {

  const response =
    await axios.get(
      "https://farm2flake-backend.onrender.com/api/admin-reviews"
    )

  setReviews(response.data)

} catch (error) {

  console.log(error)

} finally {

  setLoading(false)

}

}

useEffect(() => {

fetchReviews()

}, [])

// APPROVE REVIEW
const approveReview = async (id) => {

try {

  await axios.put(
    `https://farm2flake-backend.onrender.com/api/reviews/${id}/approve`
  )

  fetchReviews()

} catch (error) {

  console.log(error)

}

}

// DELETE REVIEW
const deleteReview = async (id) => {

const confirmDelete =
  window.confirm(
    "Delete this review?"
  )

if (!confirmDelete) return

try {

  await axios.delete(
    `https://farm2flake-backend.onrender.com/api/reviews/${id}`
  )

  fetchReviews()

} catch (error) {

  console.log(error)

}

}

return (

<div>

  {/* TOP */}
  <div>

    <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">

      Customer Reviews

    </h1>

    <p className="text-[#6b7280] mt-2">

      Approve or manage customer experiences.

    </p>

  </div>

  {/* LOADING */}
  {loading && (

    <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8 text-center text-[#6b7280]">

      Loading reviews...

    </div>

  )}

  {/* EMPTY */}
  {!loading && reviews.length === 0 && (

    <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-10 text-center">

      <h3 className="text-xl font-semibold text-[#111827]">

        No Reviews Found

      </h3>

      <p className="text-[#6b7280] mt-2">

        Customer reviews will appear here.

      </p>

    </div>

  )}

  {/* MOBILE CARDS */}
  {!loading && reviews.length > 0 && (

    <div className="md:hidden mt-6 space-y-4">

      {reviews.map((review) => (

        <div

          key={review.id}

          className="
            bg-white
            rounded-3xl
            border border-[#edf1e8]
            p-5
            shadow-sm
          "

        >

          <div className="flex items-start justify-between gap-3">

            <div>

              <h3 className="font-bold text-[#111827] text-lg">

                {review.name}

              </h3>

              <p className="text-sm text-[#6b7280] mt-1">

                {review.product_name || "Unknown Product"}

              </p>

            </div>

            <span
  className={`
    px-4 py-2
    rounded-full
    text-xs
    font-semibold

    ${
      review.status === "approved"
        ? "bg-[#e8f7e8] text-[#1e7a1e]"
        : "bg-[#fff4e8] text-[#ff7a00]"
    }
  `}
>
  {review.status}
</span>

          </div>

          <div className="mt-4 text-lg">

            {"⭐".repeat(review.rating)}

          </div>

          <p className="mt-4 text-[#374151] leading-relaxed">

            {review.review}

          </p>

          <div className="flex gap-3 mt-5">

            {
              review.status !== "approved" && (

                <button

                  onClick={() =>
                    approveReview(review.id)
                  }

                  className="
                    flex-1
                    h-[48px]
                    rounded-xl
                    border border-[#d6f5d6]
                    text-green-600
                    hover:bg-[#f3fff3]
                    flex items-center justify-center gap-2
                  "
                >

                  <Check size={18} />

                  Approve

                </button>

              )
            }

            <button

              onClick={() =>
                deleteReview(review.id)
              }

              className="
                flex-1
                h-[48px]
                rounded-xl
                border border-[#ffd6d6]
                text-red-500
                hover:bg-[#fff5f5]
                flex items-center justify-center gap-2
              "
            >

              <Trash2 size={18} />

              Delete

            </button>

          </div>

        </div>

      ))}

    </div>

  )}

  {/* DESKTOP TABLE */}
  {!loading && reviews.length > 0 && (

    <div className="hidden md:block mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

            <tr>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Customer

              </th>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Product

              </th>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Rating

              </th>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Review

              </th>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Status

              </th>

              <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr
                key={review.id}
                className="border-b border-[#edf1e8]"
              >

                <td className="px-6 py-5 font-semibold text-[#111827]">

                  {review.name}

                </td>

                <td className="px-6 py-5 text-[#374151] font-medium">

                  {review.product_name || "Unknown Product"}

                </td>

                <td className="px-6 py-5">

                  {"⭐".repeat(review.rating)}

                </td>

                <td className="px-6 py-5 text-[#374151] max-w-[400px]">

                  {review.review}

                </td>

                <td className="px-6 py-5">

                 <span
  className={`px-4 py-2 rounded-full text-xs font-semibold ${
    review.status === "approved"
      ? "bg-[#e8f7e8] text-[#1e7a1e]"
      : "bg-[#fff4e8] text-[#ff7a00]"
  }`}
>
  {review.status}
</span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    {
                      review.status !== "approved" && (

                        <button
                          onClick={() =>
                            approveReview(review.id)
                          }
                          className="w-10 h-10 rounded-lg border border-[#d6f5d6] text-green-600 flex items-center justify-center hover:bg-[#f3fff3]"
                        >

                          <Check size={18} />

                        </button>

                      )
                    }

                    <button
                      onClick={() =>
                        deleteReview(review.id)
                      }
                      className="w-10 h-10 rounded-lg border border-[#ffd6d6] text-red-500 flex items-center justify-center hover:bg-[#fff5f5]"
                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )}

</div>

)

}
