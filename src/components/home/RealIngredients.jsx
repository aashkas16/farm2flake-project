import bannerImg from '../../assets/products/realingredients.png'

export default function RealIngredients() {

  return (

    <section className="py-10 bg-[#fafaf7]">

      <div className="max-w-7xl mx-auto px-6">

        <div
          className="relative overflow-hidden rounded-[10px] h-[260px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url(${bannerImg})`
          }}
        >

          {/* Overlay Content */}
          <div className="ml-auto w-[38%] pr-12 flex flex-col justify-center">

  <h2 className="text-[30px] leading-[1.15] font-bold text-[#173617]">
    Real Ingredients.
    <br />
    Real Results.
  </h2>

  <p className="text-gray-700 text-[15px] leading-relaxed mt-4">
    Boost your daily nutrition with the <br/>
    goodness of real fruits & vegetables.
  </p>

  <button className="mt-5 w-fit bg-[#1f6b1f] hover:bg-[#195719] transition text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md">
    Shop Now →
  </button>

</div>

        </div>

      </div>

    </section>

  )
}