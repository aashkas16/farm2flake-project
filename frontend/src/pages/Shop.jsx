import { useEffect, useState } from "react"

import {
  
  useLocation,
  Link
} from "react-router-dom"

import { getProductPriceAndSize } from "../utils/price"

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
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart()

  const handleIncrease = (productId) => {
    increaseQuantity(productId, "250g")
  }

  const handleDecrease = (productId) => {
    const cartItem = cartItems.find(
      (item) =>
        item.id === productId &&
        (item.selectedSize === "250g" || !item.selectedSize)
    )
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(productId, "250g")
    } else {
      removeFromCart(productId, "250g")
    }
  }



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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full"
                >

                  {/* IMAGE */}
                  <div className="relative bg-[#fafaf7] p-3 sm:p-5 aspect-square flex items-center justify-center">

                    {Number(product.is_best_seller) === 1 && (

                      <span className="absolute top-2 left-2 bg-[#2d5a2d] text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">

                        Best Seller

                      </span>

                    )}

                    {/* WISHLIST */}
                    <button
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition z-10"
                    >

                      <Heart
                        size={16}
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

                    <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300 cursor-pointer"
                      />
                    </Link>

                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-5 flex flex-col flex-1 text-center">

                    <h3 className="font-bold text-sm sm:text-base text-[#1c2b1d] leading-snug min-h-[40px] sm:min-h-[48px] hover:text-[#2f7c1f] transition line-clamp-2">

                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>

                    </h3>

                    {/* STARS */}
                    <div className="flex justify-center items-center gap-0.5 mt-1 text-amber-400">

                      <Star size={12} fill="currentColor" className="shrink-0" />
                      <Star size={12} fill="currentColor" className="shrink-0" />
                      <Star size={12} fill="currentColor" className="shrink-0" />
                      <Star size={12} fill="currentColor" className="shrink-0" />
                      <Star size={12} fill="currentColor" className="shrink-0" />

                      <span className="text-gray-400 text-[10px] sm:text-xs ml-1 font-semibold">

                        ({product.reviews})

                      </span>

                    </div>

                    {/* PRICE */}
                    <p className="mt-2 text-sm sm:text-base font-black text-[#1c2b1d]">

                      ₹{getProductPriceAndSize(product, "250g")}
                      <span className="text-gray-400 text-[10px] sm:text-xs font-bold ml-1 uppercase">(250g)</span>

                    </p>

                    {cartItems.some(
                      (item) =>
                        item.id === product.id &&
                        (item.selectedSize === "250g" || !item.selectedSize)
                    ) ? (
                      <div className="mt-auto flex items-center justify-between border-2 border-[#1D3B1D]/10 bg-[#FAF7F2] rounded-xl h-[40px] sm:h-[44px] overflow-hidden w-full px-2">
                        <button
                          onClick={() => handleDecrease(product.id)}
                          className="w-10 h-full flex items-center justify-center text-[#1D3B1D] hover:bg-black/5 transition font-black text-sm"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-xs sm:text-sm text-[#1D3B1D]">
                          {cartItems.find(
                            (item) =>
                              item.id === product.id &&
                              (item.selectedSize === "250g" || !item.selectedSize)
                          )?.quantity || 1}{" "}
                          Qty
                        </span>
                        <button
                          onClick={() => handleIncrease(product.id)}
                          className="w-10 h-full flex items-center justify-center text-[#1D3B1D] hover:bg-black/5 transition font-black text-sm"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart(
                            product,
                            1,
                            "250g",
                            getProductPriceAndSize(product, "250g")
                          )
                        }
                        className="mt-auto w-full py-2.5 sm:py-3 rounded-xl font-bold bg-[#2f7c1f] hover:bg-[#256718] text-white shadow-sm shadow-[#2f7c1f]/10 transition duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Add to Cart
                      </button>
                    )}

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