import { Link } from "react-router-dom"

import fruitImg from '../../assets/products/sbc1.png'
import vegetableImg from '../../assets/products/sbc2.jpeg'
import smoothieImg from '../../assets/products/herbs.jpeg'
import cookingImg from '../../assets/products/sbc4.jpeg'

export default function ShopByCategory() {

  const categories = [
    {
      id: 1,
      name: 'Fruit Powders',
      description: 'Natural fruit powders for drinks & smoothies',
      image: fruitImg,
      bg: 'bg-[#fdeceb]',
      link: '/shop?category=Fruit'
    },
    {
      id: 2,
      name: 'Vegetable Powders',
      description: 'Nutrient-rich powders for everyday cooking',
      image: vegetableImg,
      bg: 'bg-[#edf6df]',
      link: '/shop?category=Vegetable'
    },
    {
      id: 3,
      name: 'Herbs Powders',
      description: 'Natural herbal blends for wellness & healthy living',
      image: smoothieImg,
      bg: 'bg-[#fff2cf]',
      link: '/shop?category=Superfood'
    },
    {
      id: 4,
      name: 'Cooking Ingredients',
      description: 'Perfect for soups, sauces, baking & more',
      image: cookingImg,
      bg: 'bg-[#f6e6f7]',
      link: '/shop?category=All'
    }
  ]

  return (

    <section className="py-12 bg-[#fafaf7]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">

          <h2 className="text-4xl md:text-5xl font-bold text-[#1c2b1d]">
            Shop by Category
          </h2>

          <p className="text-gray-500 mt-2 text-base">
            Explore our wide range of healthy options
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {categories.map((category) => (

            <div
              key={category.id}
              className={`${category.bg} rounded-[28px] p-3 flex flex-col justify-start transition duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[360px]`}
            >

              {/* Image */}
              <div className="rounded-3xl overflow-hidden">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[160px] object-cover"
                />

              </div>

              {/* Content */}
              <div className="flex flex-col pt-4">

                <h3 className="text-xl font-bold text-[#1c2b1d]">
                  {category.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mt-2">
                  {category.description}
                </p>

                {/* Button */}
                <Link
                  to={category.link}
                  onClick={() => window.scrollTo(0, 0)}
                  className="mt-2 border border-[#2d5a2d] text-[#2d5a2d] py-2 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition font-medium text-sm text-center"
                >

                  Shop Now

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}