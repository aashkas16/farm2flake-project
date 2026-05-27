import Hero from "../components/home/Hero"

import HowItWorks from "../components/home/HowItWorks"

import ShopByCategory from "../components/home/ShopByCategory"

import BestSellers from "../components/home/BestSellers"

import RealIngredients from "../components/home/RealIngredients"

import Testimonials from "../components/home/Testimonials"

import Reveal from "../animations/Reveal"

function Home() {

  return (

    <div className="bg-white overflow-x-hidden">

  {/* HERO */}
  <section className="w-full">

    <Reveal>

      <Hero />

    </Reveal>

  </section>



  {/* HOW IT WORKS */}
  <section className="w-full">

    <Reveal delay={0.1}>

      <HowItWorks />

    </Reveal>

  </section>



  {/* SHOP CATEGORY */}
  <section className="w-full px-4 sm:px-6 lg:px-0">

    <Reveal delay={0.15}>

      <ShopByCategory />

    </Reveal>

  </section>



  {/* BEST SELLERS */}
  <section className="w-full px-4 sm:px-6 lg:px-0">

    <Reveal delay={0.2}>

      <BestSellers />

    </Reveal>

  </section>



  {/* INGREDIENTS */}
  <section className="w-full px-4 sm:px-6 lg:px-0">

    <Reveal delay={0.25}>

      <RealIngredients />

    </Reveal>

  </section>



  {/* TESTIMONIALS */}
  <section className="w-full px-4 sm:px-6 lg:px-0 pb-6">

    <Reveal delay={0.3}>

      <Testimonials />

    </Reveal>

  </section>

</div>

  )

}

export default Home