import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import fruitImg from "../../assets/products/sbc1.png"
import vegetableImg from "../../assets/products/sbc2.jpeg"
import smoothieImg from "../../assets/products/herbs.jpeg"
import cookingImg from "../../assets/products/sbc4.jpeg"
import { ArrowRight } from "lucide-react"

export default function ShopByCategory() {
  const categories = [
    {
      id: 1,
      name: "Fruit Powders",
      description: "Natural fruit powders for drinks, baking & smoothies",
      image: fruitImg,
      bg: "bg-[#FDECEB]",
      link: "/shop?category=Fruit Powders"
    },
    {
      id: 2,
      name: "Vegetable Powders",
      description: "Nutrient-rich powders for everyday home cooking",
      image: vegetableImg,
      bg: "bg-[#EDF6DF]",
      link: "/shop?category=Vegetable Powders"
    },
    {
      id: 3,
      name: "Herbs Powders",
      description: "Natural herbal blends for wellness & clean living",
      image: smoothieImg,
      bg: "bg-[#FFF2CF]",
      link: "/shop?category=Herbs Powders"
    },
    {
      id: 4,
      name: "Cooking Ingredients",
      description: "Perfect for organic soups, sauces, batters & more",
      image: cookingImg,
      bg: "bg-[#F6E6F7]",
      link: "/shop?category=All"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HEADING */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-2">
            Catalog Categories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 mt-4 text-xs sm:text-sm leading-relaxed">
            Discover single-ingredient freeze-dried powders crafted for nutrition, convenience, and freshness.
          </p>
        </div>

        {/* CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${category.bg} rounded-[32px] p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 min-h-[380px] group border border-black/[0.01]`}
            >
              {/* IMAGE WITH SCROLL & HOVER MIXING PARALLAX ANIMATION */}
              <div className="rounded-[24px] overflow-hidden relative">
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-full h-[190px] sm:h-[180px] overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </motion.div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 pt-6">
                <h3 className="text-xl sm:text-2xl font-black text-[#1D3B1D] leading-snug group-hover:text-[#2F7C1F] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5 flex-1">
                  {category.description}
                </p>

                {/* BUTTON */}
                <Link
                  to={category.link}
                  onClick={() => window.scrollTo(0, 0)}
                  className="mt-6 border-2 border-[#1D3B1D]/15 text-[#1D3B1D] bg-white/40 backdrop-blur-sm py-3 rounded-xl hover:bg-[#1D3B1D] hover:text-[#FAF7F2] hover:border-transparent transition-all duration-300 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}