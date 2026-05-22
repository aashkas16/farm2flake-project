import { Link } from "react-router-dom"

import {
  Check
} from "lucide-react"

import bananaImg from "../assets/products/banana.jpeg"
import beetrootImg from "../assets/products/beetroot.jpeg"
import amlaImg from "../assets/products/amla.jpeg"
import guavaImg from "../assets/products/guava.jpeg"
import carrotImg from "../assets/products/carrot.jpeg"

import { useTrial } from "../components/context/TrialContext"

export default function TrialSelection() {

  const {
    trialItems,
    toggleTrialItem
  } = useTrial()


  const products = [

    {
      id: 1,
      name: "Banana Powder",
      image: bananaImg
    },

    {
      id: 2,
      name: "Beetroot Powder",
      image: beetrootImg
    },

    {
      id: 3,
      name: "Amla Powder",
      image: amlaImg
    },

    {
      id: 4,
      name: "Guava Powder",
      image: guavaImg
    },

    {
      id: 5,
      name: "Carrot Powder",
      image: carrotImg
    }

  ]


  return (

    <section className="bg-[#fafaf7] min-h-screen py-14">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center">

          <h1 className="text-5xl font-bold text-[#183818]">

            Build Your Trial Pack

          </h1>

          <p className="mt-4 text-[#667166] text-lg">

            Select any 3 best-selling products.
            Each sample pack contains 50g.

          </p>


          {/* COUNTER */}
          <div className="mt-8 inline-flex items-center bg-[#edf7df] text-[#2d5a2d] px-6 py-3 rounded-full font-semibold text-lg">

            {trialItems.length}/3 Selected

          </div>

        </div>


        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {products.map((product) => {

            const selected = trialItems.find(
              (item) => item.id === product.id
            )

            const limitReached =
              trialItems.length >= 3 && !selected


            return (

              <div
                key={product.id}
                className="bg-white rounded-[28px] overflow-hidden border border-[#edf1e8]"
              >

                {/* IMAGE */}
                <div className="bg-[#f8f8f5] p-6 relative">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[220px] object-contain"
                  />


                  {/* LABEL */}
                  <div className="absolute top-4 left-4 bg-[#2d5a2d] text-white text-xs px-3 py-1 rounded-full font-semibold">

                    50g Trial Pack

                  </div>

                </div>


                {/* CONTENT */}
                <div className="p-6 text-center">

                  <h2 className="text-xl font-bold text-[#183818]">

                    {product.name}

                  </h2>


                  <p className="mt-3 text-[#667166]">

                    Trial Price : FREE

                  </p>


                  {/* BUTTON */}
                  <button
                    disabled={limitReached}
                    onClick={() => toggleTrialItem(product)}
                    className={`mt-6 w-full py-3 rounded-xl font-semibold transition

                    ${
                      selected
                        ? "bg-[#183818] text-white"
                        : limitReached
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#2d5a2d] hover:bg-[#1f431f] text-white"
                    }`}
                  >

                    {
                      selected
                        ? "✓ SELECTED"
                        : limitReached
                        ? "LIMIT REACHED"
                        : "SELECT"
                    }

                  </button>

                </div>

              </div>

            )

          })}

        </div>


        {/* REVIEW BUTTON */}
        <div className="flex justify-center mt-14">

          <Link
            to="/trial-review"
            onClick={() => window.scrollTo(0, 0)}
            className={`px-10 py-4 rounded-xl font-semibold text-lg transition flex items-center gap-3

            ${
              trialItems.length === 0
                ? "bg-gray-300 text-gray-500 pointer-events-none"
                : "bg-[#183818] hover:bg-[#102810] text-white"
            }`}
          >

            <Check size={22} />

            Review Trial Pack

          </Link>

        </div>

      </div>

    </section>

  )

}