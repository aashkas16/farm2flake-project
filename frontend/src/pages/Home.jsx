import Hero from "../components/home/Hero"
import TrustBadges from "../components/home/TrustBadges"
import BestSellers from "../components/home/BestSellers"
import HowItWorks from "../components/home/HowItWorks" // Refactored as Why Choose Farm2Flake
import ShopByCategory from "../components/home/ShopByCategory"
import RealIngredients from "../components/home/RealIngredients"
import BulkExport from "../components/home/BulkExport"
import Testimonials from "../components/home/Testimonials"
import FeaturedBlogs from "../components/home/FeaturedBlogs"
import Reveal from "../animations/Reveal"

function Home() {
  return (
    <div className="bg-[#FAF7F2] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="w-full">
        <Reveal>
          <Hero />
        </Reveal>
      </section>

      {/* 2. TRUST BADGE SECTION */}
      <section className="w-full">
        <Reveal delay={0.05}>
          <TrustBadges />
        </Reveal>
      </section>

      {/* 3. BEST SELLING PRODUCTS */}
      <section className="w-full">
        <Reveal delay={0.1}>
          <BestSellers />
        </Reveal>
      </section>

      {/* 4. WHY CHOOSE FARM2FLAKE (How It Works Refactored) */}
      <section className="w-full">
        <Reveal delay={0.15}>
          <HowItWorks />
        </Reveal>
      </section>

      {/* 5. SHOP BY CATEGORY */}
      <section className="w-full">
        <Reveal delay={0.2}>
          <ShopByCategory />
        </Reveal>
      </section>

      {/* 6. REAL INGREDIENTS SECTION */}
      <section className="w-full">
        <Reveal delay={0.25}>
          <RealIngredients />
        </Reveal>
      </section>

      {/* 7. BULK & EXPORT SECTION */}
      <section className="w-full">
        <Reveal delay={0.3}>
          <BulkExport />
        </Reveal>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="w-full">
        <Reveal delay={0.35}>
          <Testimonials />
        </Reveal>
      </section>

      {/* 9. FEATURED BLOGS */}
      <section className="w-full pb-10">
        <Reveal delay={0.4}>
          <FeaturedBlogs />
        </Reveal>
      </section>
    </div>
  )
}

export default Home