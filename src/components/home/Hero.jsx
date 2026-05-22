import heroBg from '../../assets/products/homepage.png'
import { Link } from 'react-router-dom'

export default function Hero() {

  return (

    <section className="relative overflow-hidden">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#f7f4ea]/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">

          <div className="max-w-3xl">

            <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold leading-tight text-[#0f172a]">

              Turn Real Fruits
              <br />

              into Instant
              <br />

              Nutrition

            </h1>

            <p className="mt-8 text-lg md:text-xl text-black leading-relaxed max-w-xl">

              Transform your natural fruits & vegetables
              <br />

              powders into instant nutrition.
              <br />

              Pure ingredients, real benefits.

            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-5">

              <Link to="/shop" className="bg-[#2d5a2d] hover:bg-green-800 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl" onClick={() => window.scrollTo(0, 0)}>

                Shop Now

              </Link>

              <Link to="/share-experience"
    className="bg-[#2d5a2d] hover:bg-green-800 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl" onClick={() => window.scrollTo(0, 0)}>

    Share Your Experience

  </Link>

            </div>

          </div>

        </div>

      </section>

    </section>

  )
}