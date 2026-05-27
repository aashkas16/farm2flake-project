import { Link } from "react-router-dom"

import fruitImg from "../../assets/products/sbc1.png"

import vegetableImg from "../../assets/products/sbc2.jpeg"

import smoothieImg from "../../assets/products/herbs.jpeg"

import cookingImg from "../../assets/products/sbc4.jpeg"

export default function ShopByCategory() {

  const categories = [

    {

      id: 1,

      name: "Fruit Powders",

      description:
        "Natural fruit powders for drinks & smoothies",

      image: fruitImg,

      bg: "bg-[#fdeceb]",

      link: "/shop?category=Fruit Powders"

    },



    {

      id: 2,

      name: "Vegetable Powders",

      description:
        "Nutrient-rich powders for everyday cooking",

      image: vegetableImg,

      bg: "bg-[#edf6df]",

      link: "/shop?category=Vegetable Powders"

    },



    {

      id: 3,

      name: "Herbs Powders",

      description:
        "Natural herbal blends for wellness & healthy living",

      image: smoothieImg,

      bg: "bg-[#fff2cf]",

      link: "/shop?category=Herbs Powders"

    },



    {

      id: 4,

      name: "Cooking Ingredients",

      description:
        "Perfect for soups, sauces, baking & more",

      image: cookingImg,

      bg: "bg-[#f6e6f7]",

      link: "/shop?category=All"

    }

  ]



  return (

    <section className="py-14 md:py-16 bg-[#fafaf7] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b1d] leading-tight">

            Shop by Category

          </h2>



          <p className="text-gray-500 mt-3 text-sm sm:text-base">

            Explore our wide range of healthy options

          </p>

        </div>



        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {categories.map((category) => (

            <div
              key={category.id}
              className={`${category.bg} rounded-[28px] p-4 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[340px]`}
            >

              {/* IMAGE */}
              <div className="rounded-3xl overflow-hidden">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[190px] sm:h-[180px] object-cover"
                />

              </div>



              {/* CONTENT */}
              <div className="flex flex-col flex-1 pt-5">

                <h3 className="text-[22px] font-bold text-[#1c2b1d] leading-snug">

                  {category.name}

                </h3>



                <p className="text-gray-600 text-sm leading-relaxed mt-3 flex-1">

                  {category.description}

                </p>



                {/* BUTTON */}
                <Link
                  to={category.link}
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="mt-5 border border-[#2d5a2d] text-[#2d5a2d] py-3 rounded-xl hover:bg-[#2d5a2d] hover:text-white transition font-medium text-sm text-center"
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