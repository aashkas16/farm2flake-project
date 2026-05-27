import { useEffect, useState } from "react"

import {
  
  useLocation
} from "react-router-dom"

import {
  ChevronRight,
  Star,
  Heart,
  SlidersHorizontal
} from "lucide-react"

import axios from "axios"

import heroImg from "../assets/products/hpppp.png"

import { useWishlist } from "../components/context/WishlistContext"

import { useCart } from "../components/context/CartContext"

export default function Shop() {

  const location = useLocation()

  const params = new URLSearchParams(location.search)

  const categoryFromURL =
    params.get("category") || "All"



  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromURL)

  const [maxPrice, setMaxPrice] =
    useState(2000)

  const [sortOption, setSortOption] =
    useState("featured")

  const [selectedBenefits] =
    useState([])

  const [selectedPackSizes] =
    useState([])

  const [products, setProducts] =
    useState([])

  const [showFilters, setShowFilters] =
    useState(false)



  const {
    wishlistItems,
    toggleWishlist
  } = useWishlist()



  const {
    cartItems,
    toggleCart
  } = useCart()



  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(

          "https://farm2flake-backend.onrender.com/api/products"

        )



      setProducts(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchProducts()

  }, [])



  // FILTER PRODUCTS
  const filteredProducts = products

    .filter((product) => {

      const categoryMatch =

        selectedCategory === "All" ||

        product.category === selectedCategory



      const priceMatch =
        product.price <= maxPrice



      const benefitMatch =

        selectedBenefits.length === 0 ||

        selectedBenefits.some((benefit) =>

          product.benefits?.includes(benefit)

        )



      const sizeMatch =

        selectedPackSizes.length === 0 ||

        selectedPackSizes.includes(product.size)



      return (

        categoryMatch &&
        priceMatch &&
        benefitMatch &&
        sizeMatch

      )

    })



    .sort((a, b) => {

      if (sortOption === "low") {

        return a.price - b.price

      }



      if (sortOption === "high") {

        return b.price - a.price

      }



      return 0

    })



  return (

    <section className="bg-[#f8f8f5] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="bg-[#f4f0ea]">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="px-4 sm:px-6 md:px-10 py-12 md:py-16">

            <h1 className="text-[38px] sm:text-[48px] md:text-[58px] font-bold text-[#123312] leading-tight">

              Shop Our Products

            </h1>



            <div className="flex items-center gap-3 mt-6 text-gray-700 font-medium text-sm sm:text-base">

              <span>

                <a href="/">

                  Home

                </a>

              </span>



              <ChevronRight size={18} />



              <span>

                Shop

              </span>

            </div>

          </div>



          {/* RIGHT */}
          <div className="overflow-hidden">

            <img
              src={heroImg}
              alt=""
              className="w-full h-[220px] sm:h-[300px] md:h-[320px] object-cover object-right scale-110 md:scale-125"
            />

          </div>

        </div>

      </section>



      {/* SHOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">

        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden mb-5">

          <button
            onClick={() =>
              setShowFilters(!showFilters)
            }
            className="w-full bg-[#2f7c1f] text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-3"
          >

            <SlidersHorizontal size={18} />

            Filters

          </button>

        </div>



        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* SIDEBAR */}
          <aside
            className={`${

              showFilters
                ? "block"
                : "hidden"

            } lg:block space-y-6`}
          >

            {/* CATEGORY */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[20px] text-[#1c2b1d] mb-6">

                CATEGORIES

              </h3>



              <div className="space-y-5 text-[15px] sm:text-[16px]">

                <button
                  onClick={() => {

                    setSelectedCategory("All")

                    setShowFilters(false)

                  }}
                  className={`flex items-center gap-3 font-semibold ${

                    selectedCategory === "All"

                      ? "text-[#4c8d2b]"

                      : "text-black"

                  }`}
                >

                  <SlidersHorizontal size={18} />

                  All Products

                </button>



                {[
                  "Fruit Powders",
                  "Vegetable Powders",
                  "Herbs Powders"
                ].map((category) => (

                  <button
                    key={category}
                    onClick={() => {

                      setSelectedCategory(category)

                      setShowFilters(false)

                    }}
                    className={`block hover:text-[#4c8d2b] ${

                      selectedCategory === category

                        ? "text-[#4c8d2b] font-semibold"

                        : ""

                    }`}
                  >

                    {category}

                  </button>

                ))}

              </div>

            </div>



            {/* PRICE */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[20px] text-[#1c2b1d] mb-6">

                FILTER BY

              </h3>



              <p className="font-semibold mb-4">

                Price Range

              </p>



              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full accent-green-700"
              />



              <div className="flex justify-between text-sm mt-3 text-gray-600">

                <span>

                  ₹0

                </span>



                <span>

                  ₹{maxPrice}

                </span>

              </div>

            </div>

          </aside>



          {/* PRODUCTS */}
          <div>

            {/* TOP */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

              <p className="text-gray-700 text-sm sm:text-[15px]">

                Showing {filteredProducts.length} products

              </p>



              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-sm outline-none cursor-pointer w-full sm:w-auto"
              >

                <option value="featured">

                  Sort by: Featured

                </option>



                <option value="low">

                  Price Low to High

                </option>



                <option value="high">

                  Price High to Low

                </option>

              </select>

            </div>



            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative bg-[#fafaf7] p-5">

                    {product.is_best_seller && (

                      <span className="absolute top-4 left-4 bg-[#3c9b2d] text-white text-[11px] px-3 py-1 rounded-full font-bold">

                        BEST SELLER

                      </span>

                    )}



                    {/* WISHLIST */}
                    <button
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition z-10"
                    >

                      <Heart
                        size={18}
                        fill={

                          wishlistItems.find(
                            (item) =>
                              item.id === product.id
                          )

                            ? "red"

                            : "transparent"

                        }
                        className={

                          wishlistItems.find(
                            (item) =>
                              item.id === product.id
                          )

                            ? "text-red-500"

                            : "text-gray-400"

                        }
                      />

                    </button>



                    <img
                      src={`https://farm2flake-backend.onrender.com/${product.image}`}
                      alt={product.name}
                      className="w-full h-[180px] sm:h-[220px] object-contain"
                    />

                  </div>



                  {/* CONTENT */}
                  <div className="p-5 text-center">

                    <h3 className="font-bold text-[17px] sm:text-[18px] text-[#1f1f1f] leading-snug min-h-[52px]">

                      {product.name}

                    </h3>



                    {/* STARS */}
                    <div className="flex justify-center items-center gap-1 mt-2 text-yellow-400">

                      <Star size={15} fill="currentColor" />
                      <Star size={15} fill="currentColor" />
                      <Star size={15} fill="currentColor" />
                      <Star size={15} fill="currentColor" />
                      <Star size={15} fill="currentColor" />



                      <span className="text-gray-500 text-sm ml-1">

                        ({product.reviews})

                      </span>

                    </div>



                    {/* PRICE */}
                    <p className="mt-3 text-[18px] font-semibold text-[#1c2b1d]">

                      ₹{product.price}.00

                    </p>



                    {/* CART */}
                    <button
                      onClick={() =>
                        toggleCart(product)
                      }
                      className={`mt-5 w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm sm:text-base

                      ${

                        cartItems.find(
                          (item) =>
                            item.id === product.id
                        )

                          ? "bg-[#183818] text-white scale-[1.02]"

                          : "bg-[#2f7c1f] hover:bg-[#256718] text-white"

                      }`}
                    >

                      {

                        cartItems.find(
                          (item) =>
                            item.id === product.id
                        )

                          ? "✓ ADDED"

                          : "ADD TO CART"

                      }

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </section>

  )

}