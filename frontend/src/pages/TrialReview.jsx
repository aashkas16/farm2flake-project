import { Link } from "react-router-dom"

import { useTrial } from "../components/context/TrialContext"

export default function TrialReview() {

  const { trialItems } =
    useTrial()

  const deliveryFee = 199



  return (

    <section className="bg-[#fafaf7] min-h-screen py-10 md:py-14 overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <h1 className="text-[34px] sm:text-4xl md:text-5xl font-bold text-[#183818] text-center leading-tight">

          Review Trial Pack

        </h1>



        {/* BOX */}
        <div className="mt-10 md:mt-14 bg-white rounded-[24px] sm:rounded-[30px] border border-[#edf1e8] p-5 sm:p-8 md:p-10">

          {/* PRODUCTS */}
          <div className="space-y-6 sm:space-y-8">

            {trialItems.map((item) => (

              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-[#edf1e8] pb-6"
              >

                {/* LEFT */}
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[75px] h-[75px] sm:w-[90px] sm:h-[90px] object-contain bg-[#f8f8f5] rounded-xl p-2 shrink-0"
                  />



                  <div className="min-w-0">

                    <h2 className="font-bold text-lg sm:text-xl text-[#183818] break-words">

                      {item.name}

                    </h2>



                    <p className="text-[#667166] mt-2 text-sm sm:text-base">

                      50g Trial Pack

                    </p>

                  </div>

                </div>



                {/* RIGHT */}
                <div className="text-[#2d5a2d] font-bold text-lg sm:text-xl sm:text-right">

                  FREE

                </div>

              </div>

            ))}

          </div>



          {/* TOTALS */}
          <div className="mt-8 sm:mt-10 space-y-5 border-t border-[#edf1e8] pt-8">

            <div className="flex items-center justify-between text-[15px] sm:text-lg gap-4">

              <span className="text-[#667166]">

                Trial Products

              </span>



              <span className="font-semibold whitespace-nowrap">

                FREE

              </span>

            </div>



            <div className="flex items-center justify-between text-[15px] sm:text-lg gap-4">

              <span className="text-[#667166]">

                Delivery Fee

              </span>



              <span className="font-semibold whitespace-nowrap">

                ₹{deliveryFee}

              </span>

            </div>



            <div className="flex items-center justify-between border-t border-[#edf1e8] pt-6 gap-4">

              <span className="text-2xl sm:text-3xl font-bold text-[#183818]">

                Total

              </span>



              <span className="text-3xl sm:text-4xl font-bold text-[#183818] whitespace-nowrap">

                ₹{deliveryFee}

              </span>

            </div>

          </div>



          {/* BUTTON */}
          <Link
            to="/checkout?type=trial"
            onClick={() =>
              window.scrollTo(0, 0)
            }
            className="mt-8 sm:mt-10 block w-full text-center bg-[#183818] hover:bg-[#102810] text-white py-4 rounded-xl font-semibold text-base sm:text-lg transition"
          >

            Proceed To Checkout

          </Link>

        </div>

      </div>

    </section>

  )

}