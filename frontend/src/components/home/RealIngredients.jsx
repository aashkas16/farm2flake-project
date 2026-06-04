import { Link } from "react-router-dom"
import bannerImg from "../../assets/products/realingredients.png"
import { ArrowRight } from "lucide-react"

export default function RealIngredients() {
  return (
    <section className="py-12 md:py-16 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            min-h-[460px]
            sm:min-h-[380px]
            md:min-h-[320px]
            lg:h-[300px]
            bg-cover
            bg-center
            flex items-center
            border border-[#1D3B1D]/5
            shadow-[0_15px_50px_rgba(29,59,29,0.03)]
            before:absolute
            before:inset-0
            before:bg-gradient-to-r
            before:from-[#FAF7F2]/96
            before:via-[#FAF7F2]/80
            before:to-[#FAF7F2]/10
            sm:before:from-[#FAF7F2]/90
            sm:before:via-[#FAF7F2]/60
            sm:before:to-transparent
            before:z-[1]
          "
          style={{
            backgroundImage: `url(${bannerImg})`
          }}
        >
          {/* CONTENT */}
          <div className="relative z-[2] w-full flex justify-start px-8 sm:px-14 py-12">
            <div className="w-full md:w-[50%] lg:w-[42%] flex flex-col justify-center text-left">
              
              <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-3">
                Traceable Sourcing
              </span>
              
              {/* HEADING */}
              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-black
                  tracking-tight
                  text-[#1D3B1D]
                  leading-[1.1]
                "
              >
                Real Ingredients.
                <br />
                <span className="text-[#2F7C1F]">Real Results.</span>
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  text-gray-600
                  text-sm
                  sm:text-base
                  leading-relaxed
                  mt-4
                  max-w-[320px]
                  sm:max-w-[420px]
                "
              >
                Unlock raw cellular vitality with nutrient-dense superfood powders harvested at peak ripeness and dehydrated inside sterile local mills.
              </p>

              {/* BUTTON */}
              <Link
                to="/shop"
                onClick={() => window.scrollTo(0, 0)}
                className="
                  mt-8
                  w-full
                  sm:w-fit
                  h-[52px]
                  bg-[#1D3B1D]
                  hover:bg-[#2F7C1F]
                  transition-all
                  duration-300
                  text-[#FAF7F2]
                  px-8
                  rounded-xl
                  font-bold
                  text-sm
                  shadow-[0_8px_30px_rgba(29,59,29,0.12)]
                  flex items-center justify-center
                  gap-2
                "
              >
                <span>Shop Collection</span>
                <ArrowRight size={16} />
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}