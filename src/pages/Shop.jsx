import { useEffect, useState } from "react"

import {
  Link,
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

  const [maxPrice, setMaxPrice] = useState(2000)

  const [sortOption, setSortOption] =
    useState("featured")

  const [selectedBenefits, setSelectedBenefits] =
    useState([])

  const [selectedPackSizes, setSelectedPackSizes] =
    useState([])

  const [products, setProducts] = useState([])



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

    const response = await axios.get(
      "http://localhost:5000/api/products"
    )

    console.log(response.data)

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

    <section className="bg-[#f8f8f5] min-h-screen">

      {/* HERO */}
      <section className="bg-[#f4f0ea]">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="px-10 py-16">

            <h1 className="text-[58px] font-bold text-[#123312] leading-tight">

              Shop Our Products

            </h1>

            <div className="flex items-center gap-3 mt-6 text-gray-700 font-medium">

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
              className="w-full h-[320px] object-cover object-right scale-125"
            />

          </div>

        </div>

      </section>



      {/* SHOP */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-[280px_1fr] gap-8">

          {/* SIDEBAR */}
          <aside className="space-y-6">

            {/* CATEGORY */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[20px] text-[#1c2b1d] mb-6">

                CATEGORIES

              </h3>

              <div className="space-y-5 text-[16px]">

                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`flex items-center gap-3 font-semibold ${
                    selectedCategory === "All"
                      ? "text-[#4c8d2b]"
                      : "text-black"
                  }`}
                >

                  <SlidersHorizontal size={18} />

                  All Products

                </button>



                <button
                  onClick={() =>
                    setSelectedCategory(
                      "Fruit Powders"
                    )
                  }
                  className={`block hover:text-[#4c8d2b] ${
                    selectedCategory ===
                    "Fruit Powders"
                      ? "text-[#4c8d2b] font-semibold"
                      : ""
                  }`}
                >

                  Fruit Powders

                </button>



                <button
                  onClick={() =>
                    setSelectedCategory(
                      "Vegetable Powders"
                    )
                  }
                  className={`block hover:text-[#4c8d2b] ${
                    selectedCategory ===
                    "Vegetable Powders"
                      ? "text-[#4c8d2b] font-semibold"
                      : ""
                  }`}
                >

                  Vegetable Powders

                </button>



                <button
                  onClick={() =>
                    setSelectedCategory(
                      "Herbs Powders"
                    )
                  }
                  className={`block hover:text-[#4c8d2b] ${
                    selectedCategory ===
                    "Herbs Powders"
                      ? "text-[#4c8d2b] font-semibold"
                      : ""
                  }`}
                >

                  Herbs Powders

                </button>

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

                <span>₹0</span>

                <span>₹{maxPrice}</span>

              </div>

            </div>



            {/* BENEFITS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[20px] text-[#1c2b1d] mb-6">

                Benefits

              </h3>

              <div className="space-y-4 text-[15px]">

                {[
                  "Immunity",
                  "Antioxidants",
                  "Gut",
                  "Detox",
                  "Energy",
                ].map((benefit) => (

                  <label
                    key={benefit}
                    className="flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={selectedBenefits.includes(benefit)}
                      onChange={(e) => {

                        if (e.target.checked) {

                          setSelectedBenefits([
                            ...selectedBenefits,
                            benefit,
                          ])

                        } else {

                          setSelectedBenefits(

                            selectedBenefits.filter(
                              (item) =>
                                item !== benefit
                            )

                          )

                        }

                      }}
                    />

                    {benefit}

                  </label>

                ))}

              </div>

            </div>



            {/* PACK SIZE */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[20px] text-[#1c2b1d] mb-6">

                Pack Size

              </h3>

              <div className="space-y-4 text-[15px]">

                {[
                  "100g",
                  "200g",
                  "500g",
                  "1kg"
                ].map((size) => (

                  <label
                    key={size}
                    className="flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={selectedPackSizes.includes(size)}
                      onChange={(e) => {

                        if (e.target.checked) {

                          setSelectedPackSizes([
                            ...selectedPackSizes,
                            size,
                          ])

                        } else {

                          setSelectedPackSizes(

                            selectedPackSizes.filter(
                              (item) =>
                                item !== size
                            )

                          )

                        }

                      }}
                    />

                    {size}

                  </label>

                ))}

              </div>

            </div>



            {/* BULK ORDER */}
            <div className="bg-[#f3f5ef] rounded-2xl p-6 border border-gray-200">

              <h3 className="font-bold text-[22px] text-[#1c2b1d] leading-snug">

                Bulk Orders / Private Label

              </h3>

              <p className="text-gray-600 text-sm leading-7 mt-4">

                Get in touch for custom packaging and bulk pricing.

              </p>

              <Link
                to="/trial"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-6 inline-block w-full text-center bg-[#2f7c1f] hover:bg-[#256718] text-white py-3 rounded-lg font-semibold transition"
              >

                ENQUIRE NOW

              </Link>

            </div>

          </aside>



          {/* PRODUCTS */}
          <div>

            {/* TOP */}
            <div className="flex justify-between items-center mb-8">

              <p className="text-gray-700 text-[15px]">

                Showing {filteredProducts.length} products

              </p>

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-sm outline-none cursor-pointer"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      onClick={() => toggleWishlist(product)}
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
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[220px] object-contain"
                    />

                  </div>



                  {/* CONTENT */}
                  <div className="p-5 text-center">

                    <h3 className="font-bold text-[18px] text-[#1f1f1f]">

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
                      onClick={() => toggleCart(product)}
                      className={`mt-5 w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden

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