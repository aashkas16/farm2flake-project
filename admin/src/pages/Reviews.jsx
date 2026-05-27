import { useEffect, useState } from "react"

import axios from "axios"

import {
  Check,
  Trash2
} from "lucide-react"

export default function Reviews() {

  const [reviews, setReviews] = useState([])



  // FETCH REVIEWS
  const fetchReviews = async () => {

    try {

      const response = await axios.get(
        "https://farm2flake-backend.onrender.com/api/admin-reviews"
      )



      setReviews(response.data)

    } catch (error) {

      console.log(error)

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

        <h1 className="text-4xl font-bold text-[#111827]">

          Customer Reviews

        </h1>

        <p className="text-[#6b7280] mt-2">

          Approve or manage customer experiences.

        </p>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

              <tr>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Customer

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

                  {/* NAME */}
                  <td className="px-6 py-5 font-semibold text-[#111827]">

                    {review.name}

                  </td>



                  {/* RATING */}
                  <td className="px-6 py-5">

                    {"⭐".repeat(review.rating)}

                  </td>



                  {/* REVIEW */}
                  <td className="px-6 py-5 text-[#374151] max-w-[400px]">

                    {review.review}

                  </td>



                  {/* STATUS */}
                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold

                      ${
                        review.status === "approved"
                          ? "bg-[#e8f7e8] text-[#1e7a1e]"
                          : "bg-[#fff4e8] text-[#ff7a00]"
                      }`}
                    >

                      {review.status}

                    </span>

                  </td>



                  {/* ACTIONS */}
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

    </div>

  )

}