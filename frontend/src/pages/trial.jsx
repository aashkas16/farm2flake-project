import { Link } from "react-router-dom"

export default function Trial() {

  return (

    <section className="min-h-[70vh] bg-white py-12 md:py-20 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b1d] mb-6 leading-tight">

          Trial Pack

        </h1>



        {/* SUBTEXT */}
        <p className="text-gray-600 text-[15px] sm:text-lg leading-7 sm:leading-relaxed mb-8 max-w-3xl">

          Try our premium cereal flakes with our special trial pack. Get a sample of our best-selling varieties at a discounted price.

        </p>



        {/* MAIN BOX */}
        <div className="bg-[#f8f9f8] p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[28px] border border-[#edf1e8]">

          {/* TITLE */}
          <h2 className="text-[26px] sm:text-3xl font-semibold text-[#275227] mb-6 leading-tight">

            What's Included

          </h2>



          {/* LIST */}
          <ul className="space-y-4 text-gray-700 text-[15px] sm:text-lg leading-7 sm:leading-relaxed">

            <li className="flex items-start gap-3">

              <span className="text-[#275227] mt-1">

                ✓

              </span>

              <span>

                3 sample packs of our most popular cereal flakes

              </span>

            </li>



            <li className="flex items-start gap-3">

              <span className="text-[#275227] mt-1">

                ✓

              </span>

              <span>

                Free shipping on your trial order

              </span>

            </li>



            <li className="flex items-start gap-3">

              <span className="text-[#275227] mt-1">

                ✓

              </span>

              <span>

                30-day money-back guarantee

              </span>

            </li>



            <li className="flex items-start gap-3">

              <span className="text-[#275227] mt-1">

                ✓

              </span>

              <span>

                Exclusive discount code for future purchases

              </span>

            </li>

          </ul>



          {/* BUTTON */}
          <Link
            to="/trial-selection"
            onClick={() =>
              window.scrollTo(0, 0)
            }
            className="inline-block mt-8 bg-[#275227] text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-[#1d3a1d] transition font-semibold text-sm sm:text-base w-full sm:w-auto text-center"
          >

            Order Trial Pack

          </Link>

        </div>

      </div>

    </section>

  )

}