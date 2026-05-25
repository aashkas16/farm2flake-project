import Hero from "../components/home/Hero"

import HowItWorks from "../components/home/HowItWorks"

import ShopByCategory from "../components/home/ShopByCategory"

import BestSellers from "../components/home/BestSellers"

import RealIngredients from "../components/home/RealIngredients"

import Testimonials from "../components/home/Testimonials"

function Home() {

  return (

    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="w-full">

        <Hero />

      </section>



      {/* HOW IT WORKS */}
      <section className="w-full">

        <HowItWorks />

      </section>



      {/* SHOP CATEGORY */}
      <section className="w-full px-4 sm:px-6 lg:px-0">

        <ShopByCategory />

      </section>



      {/* BEST SELLERS */}
      <section className="w-full px-4 sm:px-6 lg:px-0">

        <BestSellers />

      </section>



      {/* INGREDIENTS */}
      <section className="w-full px-4 sm:px-6 lg:px-0">

        <RealIngredients />

      </section>



      {/* TESTIMONIALS */}
      <section className="w-full px-4 sm:px-6 lg:px-0 pb-6">

        <Testimonials />

      </section>

    </div>

  )

}

export default Home