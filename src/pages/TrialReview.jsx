import { Link } from "react-router-dom"

import { useTrial } from "../components/context/TrialContext"

export default function TrialReview() {

  const { trialItems } = useTrial()

  const deliveryFee = 199


  return (

    <section className="bg-[#fafaf7] min-h-screen py-14">

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADING */}
        <h1 className="text-5xl font-bold text-[#183818] text-center">

          Review Trial Pack

        </h1>


        {/* BOX */}
        <div className="mt-14 bg-white rounded-[30px] border border-[#edf1e8] p-10">

          {/* PRODUCTS */}
          <div className="space-y-8">

            {trialItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between border-b border-[#edf1e8] pb-6"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90px] h-[90px] object-contain bg-[#f8f8f5] rounded-xl p-2"
                  />


                  <div>

                    <h2 className="font-bold text-xl text-[#183818]">

                      {item.name}

                    </h2>


                    <p className="text-[#667166] mt-2">

                      50g Trial Pack

                    </p>

                  </div>

                </div>


                <div className="text-[#2d5a2d] font-bold text-xl">

                  FREE

                </div>

              </div>

            ))}

          </div>


          {/* TOTALS */}
          <div className="mt-10 space-y-5 border-t border-[#edf1e8] pt-8">

            <div className="flex items-center justify-between text-lg">

              <span className="text-[#667166]">

                Trial Products

              </span>

              <span className="font-semibold">

                FREE

              </span>

            </div>


            <div className="flex items-center justify-between text-lg">

              <span className="text-[#667166]">

                Delivery Fee

              </span>

              <span className="font-semibold">

                ₹{deliveryFee}

              </span>

            </div>


            <div className="flex items-center justify-between border-t border-[#edf1e8] pt-6">

              <span className="text-3xl font-bold text-[#183818]">

                Total

              </span>

              <span className="text-4xl font-bold text-[#183818]">

                ₹{deliveryFee}

              </span>

            </div>

          </div>


          {/* BUTTON */}
          <Link
            to="/checkout?type=trial"
            onClick={() => window.scrollTo(0, 0)}
            className="mt-10 block w-full text-center bg-[#183818] hover:bg-[#102810] text-white py-4 rounded-xl font-semibold text-lg transition"
          >

            Proceed To Checkout

          </Link>

        </div>

      </div>

    </section>

  )

}