import { useEffect, useState } from "react"

import axios from "axios"

import { useWishlist } from "../context/WishlistContext"

import { useCart } from "../context/CartContext"

export default function BestSellers() {

  const [products, setProducts] = useState([])



  const {
    wishlistItems,
    toggleWishlist
  } = useWishlist()



  const {
    cartItems,
    toggleCart
  } = useCart()



  // FETCH BEST SELLERS
  const fetchBestSellers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/best-sellers"
      )



      setProducts(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBestSellers()

  }, [])



  return (

    <section className="py-16 bg-[#fafaf7]">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-6">

          <h2 className="text-5xl font-bold text-[#1c2b1d]">

            Best Sellers

          </h2>

          <p className="text-gray-500 mt-2">

            Loved by thousands of healthy snackers

          </p>

        </div>



        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-[26px] border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300"
            >

              {/* Image Area */}
              <div className="relative px-4 pt-4">

                {/* Tag */}
                <div className="absolute top-4 left-4 bg-[#ff7a30] text-white text-[10px] px-3 py-[4px] rounded-full font-semibold z-10">

                  Best Seller

                </div>



                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
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



                {/* Product Image */}
                <div className="bg-white rounded-2xl overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[180px] object-contain"
                  />

                </div>

              </div>



              {/* Product Content */}
              <div className="px-4 pb-4 pt-2">

                <h3 className="text-[17px] font-bold text-[#1c2b1d] leading-tight">

                  {product.name}

                </h3>

                <p className="text-gray-500 text-sm mt-1">

                  {product.category}

                </p>



                {/* Price */}
                <div className="mt-3 flex items-end gap-1">

                  <span className="text-3xl font-bold text-[#1c2b1d]">

                    ₹{product.price}

                  </span>

                  <span className="text-gray-400 text-sm mb-1">

                    ({product.size})

                  </span>

                </div>



                {/* Button */}
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



        {/* Bottom Features */}
        <div className="mt-6 bg-[#f6f4ec] rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6">

          <div className="flex items-center gap-3">

            <span className="text-3xl">☀️</span>

            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                Dehydrated

              </h4>

              <p className="text-gray-500 text-xs">

                Preserves nutrition & flavor

              </p>

            </div>

          </div>



          <div className="flex items-center gap-3">

            <span className="text-3xl">🌿</span>

            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                No Added Sugar

              </h4>

              <p className="text-gray-500 text-xs">

                Pure & Natural

              </p>

            </div>

          </div>



          <div className="flex items-center gap-3">

            <span className="text-3xl">🧪</span>

            <div>

              <h4 className="font-bold text-[#1c2b1d] text-sm">

                Lab Tested

              </h4>

              <p className="text-gray-500 text-xs">

                For Purity & Safety

              </p>

            </div>

          </div>



          <div className="flex items-center gap-3">

            <span className="text-3xl">🇮🇳</span>

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