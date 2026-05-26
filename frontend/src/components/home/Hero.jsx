import heroBg from "../../assets/products/homepage.png"

import { Link } from "react-router-dom"

export default function Hero() {

  return (

    <section className="relative overflow-hidden">

      <section
        className="
          relative
          min-h-[72vh]
          sm:min-h-[82vh]
          md:min-h-[90vh]
          flex items-center
          bg-cover
          bg-no-repeat
          bg-[72%_center]
          sm:bg-center
        "
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >

        {/* OVERLAY */}
        <div className="
          absolute inset-0

          bg-gradient-to-r
          from-[#f7f4ea]/[0.97]
          via-[#f7f4ea]/[0.88]
          to-[#f7f4ea]/[0.38]

          sm:from-[#f7f4ea]/[0.82]
          sm:via-[#f7f4ea]/[0.50]
          sm:to-transparent
        " />

        {/* CONTENT */}
        <div className="relative z-10 w-full">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

            <div className="max-w-[320px] sm:max-w-2xl pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-24">

              {/* SUBTEXT */}
              <p className="
                text-[11px]
                sm:text-sm
                uppercase
                tracking-[2.5px]
                text-[#5f7a5f]
                font-semibold
                mb-5
              ">

                Natural Freeze Dried Nutrition

              </p>

              {/* HEADING */}
              <h1 className="
                text-[42px]
                leading-[0.95]
                tracking-[-2.4px]
                font-extrabold
                text-[#0f172a]

                sm:text-5xl
                md:text-6xl
                lg:text-[62px]
                lg:leading-[1]
              ">

                Turn Real
                <br />
                Fruits
                <br />
                into Instant
                <br />
                Nutrition

              </h1>

              {/* DESCRIPTION */}
              <p className="
                mt-6
                sm:mt-7
                text-[15px]
                sm:text-lg
                leading-7
                sm:leading-8
                text-[#1f2937]
                max-w-[290px]
                sm:max-w-xl
              ">

                Transform your natural fruits &
                vegetables powders into instant
                nutrition. Pure ingredients,
                real benefits.

              </p>

              {/* BUTTONS */}
              <div className="
                mt-8
                flex flex-col sm:flex-row
                gap-3 sm:gap-5
                w-full sm:w-auto
              ">

                {/* SHOP NOW */}
                <Link
                  to="/shop"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="
                    h-[54px]
                    sm:h-[58px]

                    px-6 sm:px-9

                    rounded-xl

                    bg-[#2d5a2d]
                    hover:bg-[#234723]

                    transition-all duration-300

                    text-white
                    font-semibold
                    text-[15px]
                    sm:text-base

                    flex items-center justify-center

                    shadow-[0_10px_30px_rgba(45,90,45,0.18)]
                  "
                >

                  Shop Now

                </Link>

                {/* EXPERIENCE */}
                <Link
                  to="/share-experience"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="
                    h-[54px]
                    sm:h-[58px]

                    px-6 sm:px-9

                    rounded-xl

                    border border-[#d7dfcf]
                    bg-white/75
                    backdrop-blur-sm

                    hover:bg-white

                    transition-all duration-300

                    text-[#183818]
                    font-semibold
                    text-[15px]
                    sm:text-base

                    flex items-center justify-center
                  "
                >

                  Share Experience

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </section>

  )
}