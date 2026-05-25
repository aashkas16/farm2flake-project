import { useEffect, useState } from "react"

import axios from "axios"

import { useWishlist } from "../context/WishlistContext"

import { useCart } from "../context/CartContext"

export default function BestSellers() {

  const [products, setProducts] =
    useState([])



  const {

    wishlistItems,
    toggleWishlist

  } = useWishlist()



  const {

    cartItems,
    toggleCart

  } = useCart()



  // FETCH PRODUCTS
  const fetchBestSellers = async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/best-sellers"

        )



      setProducts(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchBestSellers()

  }, [])



  return (

    <section className="py-14 md:py-16 bg-[#fafaf7] overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-8 md:mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b1d] leading-tight">

            Best Sellers

          </h2>



          <p className="text-gray-500 mt-3 text-sm sm:text-base">

            Loved by thousands of healthy snackers

          </p>

        </div>



        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-[26px] border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300"
            >

              {/* IMAGE AREA */}
              <div className="relative px-4 pt-4">

                {/* TAG */}
                <div className="absolute top-4 left-4 bg-[#ff7a30] text-white text-[10px] px-3 py-[4px] rounded-full font-semibold z-10">

                  Best Seller

                </div>



                {/* WISHLIST */}
                <button
                  onClick={() =>
                    toggleWishlist(product)
                  }
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition z-10"
                >

                  <span className="text-lg">

                    {

                      wishlistItems.find(

                        (item) =>
                          item.id === product.id

                      )

                        ? "❤️"

                        : "🤍"

                    }

                  </span>

                </button>



                {/* PRODUCT IMAGE */}
                <div className="bg-white rounded-2xl overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[220px] sm:h-[200px] lg:h-[180px] object-contain"
                  />

                </div>

              </div>



              {/* CONTENT */}
              <div className="px-4 pb-5 pt-2">

                <h3 className="text-[18px] font-bold text-[#1c2b1d] leading-tight min-h-[48px]">

                  {product.name}

                </h3>



                <p className="text-gray-500 text-sm mt-1">

                  {product.category}

                </p>



                {/* PRICE */}
                <div className="mt-4 flex items-end gap-1 flex-wrap">

                  <span className="text-2xl sm:text-3xl font-bold text-[#1c2b1d]">

                    ₹{product.price}

                  </span>



                  <span className="text-gray-400 text-sm mb-1">

                    ({product.size})

                  </span>

                </div>



                {/* BUTTON */}
                <button
                  onClick={() =>
                    toggleCart(product)
                  }
                  className={`mt-5 w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm sm:text-base

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



        {/* BOTTOM FEATURES */}
        <div className="mt-8 bg-[#f6f4ec] rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 sm:px-8 py-6">

          {/* FEATURE */}
          <div className="flex items-center gap-3">

            <span className="text-3xl">

              ☀️

            </span>



            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                Dehydrated

              </h4>



              <p className="text-gray-500 text-xs">

                Preserves nutrition & flavor

              </p>

            </div>

          </div>



          {/* FEATURE */}
          <div className="flex items-center gap-3">

            <span className="text-3xl">

              🌿

            </span>



            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                No Added Sugar

              </h4>



              <p className="text-gray-500 text-xs">

                Pure & Natural

              </p>

            </div>

          </div>



          {/* FEATURE */}
          <div className="flex items-center gap-3">

            <span className="text-3xl">

              🧪

            </span>



            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                Lab Tested

              </h4>



              <p className="text-gray-500 text-xs">

                For Purity & Safety

              </p>

            </div>

          </div>



          {/* FEATURE */}
          <div className="flex items-center gap-3">

            <span className="text-3xl">

              🇮🇳

            </span>



            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                Made in India

              </h4>



              <p className="text-gray-500 text-xs">

                With Love

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}