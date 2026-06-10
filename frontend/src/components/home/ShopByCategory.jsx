import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"
import fruitImg from "../../assets/products/sbc1.png"
import vegetableImg from "../../assets/products/sbc2.jpeg"
import smoothieImg from "../../assets/products/herbs.jpeg"
import cookingImg from "../../assets/products/sbc4.jpeg"
import { ArrowRight } from "lucide-react"

export default function ShopByCategory() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://farm2flake-backend.onrender.com/api/products")
        const products = response.data || []
        
        // Group by category to find unique category names
        const uniqueCategoryNames = [...new Set(products.map(p => p.category).filter(Boolean))]
        
        // Map unique names to their respective visual settings
        const standardCategoriesInfo = {
          "Fruit Powders": {
            image: fruitImg,
            bg: "bg-[#FDECEB]"
          },
          "Vegetable Powders": {
            image: vegetableImg,
            bg: "bg-[#EDF6DF]"
          },
          "Herbs Powders": {
            image: smoothieImg,
            bg: "bg-[#FFF2CF]"
          },
          "Cooking Ingredients": {
            image: cookingImg,
            bg: "bg-[#F6E6F7]"
          }
        }
        
        const pastelColors = [
          "bg-[#FDECEB]",
          "bg-[#EDF6DF]",
          "bg-[#FFF2CF]",
          "bg-[#F6E6F7]",
          "bg-[#E6F7F2]",
          "bg-[#F7F6E6]",
          "bg-[#E6EEF7]"
        ]
        
        const dynamicCategories = uniqueCategoryNames.map((name, index) => {
          // Find standard info or assign dynamic info
          const isStandard = name in standardCategoriesInfo
          const standardInfo = standardCategoriesInfo[name]
          
          // Image fallback: first product in that category
          const categoryProducts = products.filter(p => p.category === name)
          const fallbackImg = categoryProducts.length > 0 ? categoryProducts[0].image : cookingImg
          
          return {
            id: index + 1,
            name: name,
            image: isStandard ? standardInfo.image : fallbackImg,
            bg: isStandard ? standardInfo.bg : pastelColors[index % pastelColors.length],
            link: `/shop?category=${encodeURIComponent(name)}`
          }
        })
        
        setCategories(dynamicCategories)
      } catch (error) {
        console.error("Failed to fetch products for categories:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

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

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-12 text-gray-400 font-semibold text-sm">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-400 font-semibold text-sm">
            No categories found.
          </div>
        ) : (
          /* CATEGORY CARDS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${category.bg} rounded-[32px] p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 min-h-[340px] group border border-black/[0.01]`}
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
                <div className="flex flex-col flex-1 pt-6 justify-between">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1D3B1D] leading-snug group-hover:text-[#2F7C1F] transition-colors mb-4">
                    {category.name}
                  </h3>

                  {/* BUTTON */}
                  <Link
                    to={category.link}
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-auto border-2 border-[#1D3B1D]/15 text-[#1D3B1D] bg-white/40 backdrop-blur-sm py-3 rounded-xl hover:bg-[#1D3B1D] hover:text-[#FAF7F2] hover:border-transparent transition-all duration-300 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Products</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}