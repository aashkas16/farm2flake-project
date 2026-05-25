import { Link } from "react-router-dom"

import bannerImg from "../../assets/products/realingredients.png"

export default function RealIngredients() {

  return (

    <section className="py-10 md:py-14 bg-[#fafaf7] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div
          className="relative overflow-hidden rounded-[28px] min-h-[420px] md:min-h-[320px] lg:h-[260px] bg-cover bg-center flex items-center"
          style={{

            backgroundImage: `url(${bannerImg})`

          }}
        >

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/10"></div>



          {/* CONTENT */}
          <div className="relative z-10 w-full flex justify-center md:justify-end px-6 sm:px-10 py-10">

            <div className="w-full md:w-[48%] lg:w-[38%] flex flex-col justify-center text-center md:text-left">

              {/* HEADING */}
              <h2 className="text-3xl sm:text-4xl lg:text-[30px] leading-[1.2] font-bold text-[#173617]">

                Real Ingredients.

                <br />

                Real Results.

              </h2>



              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mt-4">

                Boost your daily nutrition with the

                <br className="hidden sm:block" />

                goodness of real fruits & vegetables.

              </p>



              {/* BUTTON */}
              <Link
                to="/shop"
                onClick={() =>
                  window.scrollTo(0, 0)
                }
                className="mt-6 w-full sm:w-fit bg-[#1f6b1f] hover:bg-[#195719] transition text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md text-center"
              >

                Shop Now →

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}