import heroBg from "../../assets/products/homepage.png"

import { Link } from "react-router-dom"

export default function Hero() {

  return (

    <section className="relative overflow-hidden">

      {/* HERO */}
      <section
        className="relative min-h-[85vh] md:min-h-[90vh] bg-cover bg-center flex items-center"
        style={{

          backgroundImage: `url(${heroBg})`

        }}
      >

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#f7f4ea]/20"></div>



        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">

          <div className="max-w-3xl py-16 md:py-24">

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold leading-[1.15] text-[#0f172a]">

              Turn Real Fruits

              <br />

              into Instant

              <br />

              Nutrition

            </h1>



            {/* DESCRIPTION */}
            <p className="mt-6 md:mt-8 text-[16px] sm:text-lg md:text-xl text-black leading-relaxed max-w-xl">

              Transform your natural fruits & vegetables

              powders into instant nutrition.

              <br className="hidden sm:block" />

              Pure ingredients, real benefits.

            </p>



            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">

              {/* SHOP */}
              <Link
                to="/shop"
                onClick={() =>
                  window.scrollTo(0, 0)
                }
                className="bg-[#2d5a2d] hover:bg-green-800 transition text-white px-6 sm:px-10 py-4 rounded-2xl font-semibold text-[15px] sm:text-lg shadow-xl text-center"
              >

                Shop Now

              </Link>



              {/* EXPERIENCE */}
              <Link
                to="/share-experience"
                onClick={() =>
                  window.scrollTo(0, 0)
                }
                className="bg-[#2d5a2d] hover:bg-green-800 transition text-white px-6 sm:px-10 py-4 rounded-2xl font-semibold text-[15px] sm:text-lg shadow-xl text-center"
              >

                Share Your Experience

              </Link>

            </div>

          </div>

        </div>

      </section>

    </section>

  )

}