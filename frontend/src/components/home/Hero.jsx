import heroBg from "../../assets/products/homepage.png"
import { Link } from "react-router-dom"
import { Sparkles, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#1D3B1D]/5">
      <div
        className="
          relative
          min-h-[82vh]
          sm:min-h-[88vh]
          md:min-h-[95vh]
          flex items-center
          bg-cover
          bg-no-repeat
          bg-[85%_center]
          sm:bg-[90%_center]
          md:bg-right-center
          lg:bg-[95%_center]
          xl:bg-[98%_center]
          transition-all
          duration-300
        "
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >
        {/* MULTI-LAYER GRADIENT OVERLAY FOR PERFECT CONTRAST ON ALL DEVICES */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#FAF7F2]
            via-[#FAF7F2]/95
            to-[#FAF7F2]/20
            md:from-[#FAF7F2]
            md:via-[#FAF7F2]/90
            md:to-[#FAF7F2]/10
            lg:from-[#FAF7F2]
            lg:via-[#FAF7F2]/80
            lg:to-transparent
          "
        />
        
        {/* Soft left shade box to ensure readability even on ultrawide screens */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[45%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/30 to-transparent pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl pt-16 md:pt-24 pb-16 md:pb-24">
              
              {/* BRAND TAG */}
              <div className="inline-flex items-center gap-2.5 bg-[#1D3B1D]/10 backdrop-blur-sm border border-[#1D3B1D]/5 px-4.5 py-2 rounded-full mb-8 md:mb-10">
                <Sparkles className="w-3.5 h-3.5 text-[#2F7C1F] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[2.5px] text-[#1D3B1D] uppercase pl-0.5">
                  Natural Dehydrated Nutrition
                </span>
              </div>

              {/* HEADING */}
              <h1
                className="
                  text-[42px]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[76px]
                  xl:text-[84px]
                  font-black
                  text-[#1D3B1D]
                  leading-[0.95]
                  sm:leading-[0.98]
                  md:leading-[1]
                  tracking-tight
                  mb-6
                  md:mb-8
                "
              >
                Pure Nutrition.
                <br />
                <span className="text-[#2F7C1F] bg-clip-text">Nothing Artificial.</span>
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  lg:text-[19px]
                  leading-relaxed
                  md:leading-[1.8]
                  text-[#4B5563]
                  max-w-[280px]
                  sm:max-w-lg
                  md:max-w-xl
                  mb-10
                  md:mb-12
                "
              >
                Transform your daily routine with export-quality freeze-dried fruits, vegetables, and herbs. Utilizing low-temperature moisture extraction, we lock in 100% of the natural vitamins, dietary fiber, and pure organic flavor.
              </p>

              {/* ACTION PILLS */}
              <div
                className="
                  flex flex-col
                  sm:flex-row
                  gap-4
                  w-full
                  sm:w-auto
                "
              >
                {/* PRIMARY CTA */}
                <Link
                  to="/shop"
                  onClick={() => window.scrollTo(0, 0)}
                  className="
                    h-14
                    md:h-16
                    px-8
                    md:px-10
                    rounded-2xl
                    bg-[#1D3B1D]
                    hover:bg-[#2F7C1F]
                    transition-all
                    duration-300
                    text-[#FAF7F2]
                    font-black
                    text-base
                    flex items-center justify-center
                    gap-2.5
                    shadow-lg shadow-[#1D3B1D]/15
                    hover:shadow-xl hover:shadow-[#1D3B1D]/20
                    transform hover:-translate-y-0.5 active:scale-[0.98]
                  "
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* SECONDARY CTA */}
                <Link
                  to="/about"
                  onClick={() => window.scrollTo(0, 0)}
                  className="
                    h-14
                    md:h-16
                    px-8
                    md:px-10
                    rounded-2xl
                    border-2
                    border-[#1D3B1D]/15
                    bg-white/40
                    backdrop-blur-sm
                    hover:bg-white/90
                    hover:border-[#1D3B1D]
                    transition-all
                    duration-300
                    text-[#1D3B1D]
                    font-bold
                    text-base
                    flex items-center justify-center
                    transform hover:-translate-y-0.5 active:scale-[0.98]
                  "
                >
                  Learn More
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}