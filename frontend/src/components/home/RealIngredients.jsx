import { Link } from "react-router-dom"

import bannerImg from "../../assets/products/realingredients.png"

export default function RealIngredients() {

  return (

    <section className="py-10 sm:py-12 md:py-14 bg-[#fafaf7] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div
          className="
            relative
            overflow-hidden

            rounded-[28px]

            min-h-[420px]
            sm:min-h-[390px]
            md:min-h-[320px]
            lg:h-[260px]

            bg-cover
            bg-center
            flex items-center

            before:absolute
            before:inset-0

            before:bg-gradient-to-r

            before:from-[#f7f4ea]/95
            before:via-[#f7f4ea]/78
            before:to-[#f7f4ea]/28

            sm:before:from-[#f7f4ea]/88
            sm:before:via-[#f7f4ea]/58
            sm:before:to-[#f7f4ea]/18

            before:z-[1]
          "
          style={{
            backgroundImage: `url(${bannerImg})`
          }}
        >

          {/* EXTRA SOFT DARK LAYER */}
          <div className="absolute inset-0 bg-black/[0.04] z-[1]" />

          {/* CONTENT */}
          <div className="relative z-[2] w-full flex justify-center md:justify-end px-6 sm:px-10 py-10 sm:py-12">

            <div className="w-full md:w-[48%] lg:w-[38%] flex flex-col justify-center text-center md:text-left">

              {/* HEADING */}
              <h2
                className="
                  text-[32px]
                  sm:text-4xl
                  lg:text-[30px]

                  leading-[1.1]

                  font-bold

                  tracking-[-1px]

                  text-[#173617]
                "
              >

                Real Ingredients.

                <br />

                Real Results.

              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  text-[#374151]

                  text-[14px]
                  sm:text-[15px]

                  leading-7

                  mt-4

                  max-w-[320px]
                  sm:max-w-[420px]

                  mx-auto
                  md:mx-0
                "
              >

                Boost your daily nutrition with the
                goodness of real fruits & vegetables.

              </p>

              {/* BUTTON */}
              <Link
                to="/shop"
                onClick={() =>
                  window.scrollTo(0, 0)
                }
                className="
                  mt-6

                  w-full
                  sm:w-fit

                  h-[52px]

                  bg-[#1f6b1f]
                  hover:bg-[#195719]

                  transition-all
                  duration-300

                  text-white

                  px-6

                  rounded-xl

                  font-semibold

                  text-[14px]
                  sm:text-[15px]

                  shadow-[0_10px_30px_rgba(31,107,31,0.18)]

                  flex items-center justify-center
                "
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