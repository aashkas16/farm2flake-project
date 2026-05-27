import { Link } from "react-router-dom"

import {

  ShoppingCart

} from "lucide-react"

import { useWishlist } from "../components/context/WishlistContext"

import { useCart } from "../components/context/CartContext"

export default function Wishlist() {

  const {

    wishlistItems,
    toggleWishlist

  } = useWishlist()



  const {

    addToCart

  } = useCart()



  return (

    <section className="min-h-screen bg-[#fafaf7] py-10 md:py-14 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#6b7280] mb-8 flex-wrap">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >

            Home

          </Link>



          <span>

            ›

          </span>



          <span className="text-[#2d5a2d] font-semibold">

            Wishlist

          </span>

        </div>



        {/* HEADING */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10 md:mb-12">

          <div>

            <h1 className="text-[34px] sm:text-5xl font-bold text-[#183818] leading-tight">

              My Wishlist

            </h1>



            <p className="text-[#667166] mt-3 text-[15px] sm:text-lg">

              Your favorite saved products.

            </p>

          </div>



          <div className="bg-[#edf7df] text-[#2d5a2d] px-5 py-3 rounded-2xl font-semibold w-fit">

            {wishlistItems.length} Items

          </div>

        </div>



        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (

          <div className="bg-white rounded-[24px] sm:rounded-[30px] border border-[#edf1e8] py-16 sm:py-24 md:py-28 text-center px-5">

            <div className="text-6xl sm:text-7xl mb-6">

              🤍

            </div>



            <h2 className="text-2xl sm:text-3xl font-bold text-[#183818] leading-tight">

              Your Wishlist is Empty

            </h2>



            <p className="text-[#667166] mt-4 text-[15px] sm:text-lg leading-7">

              Save products you love for later.

            </p>



            <Link to="/shop">

              <button className="mt-8 bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-7 sm:px-8 py-4 rounded-2xl font-semibold w-full sm:w-auto">

                Explore Products

              </button>

            </Link>

          </div>

        ) : (

          /* PRODUCTS */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

            {wishlistItems.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#edf1e8] hover:shadow-xl transition duration-300"
              >

                {/* IMAGE */}
                <div className="relative p-4 sm:p-5">

                  {/* REMOVE */}
                  <button
                    onClick={() =>
                      toggleWishlist(product)
                    }
                    className="absolute top-4 sm:top-5 right-4 sm:right-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                  >

                    ❤️

                  </button>



                  <div className="bg-[#f8f8f5] rounded-[20px] sm:rounded-[22px] overflow-hidden">

                    <img
                      src={`https://farm2flake-backend.onrender.com${product.image || product.image_url}`}
                      alt={product.name}
                      className="w-full h-[220px] sm:h-[230px] object-contain p-4"
                    />

                  </div>

                </div>



                {/* CONTENT */}
                <div className="px-4 sm:px-5 pb-5">

                  <h2 className="text-[20px] sm:text-[22px] font-bold text-[#183818] leading-snug line-clamp-2 min-h-[58px]">

                    {product.name}

                  </h2>



                  <p className="text-[#667166] mt-2 text-sm sm:text-base">

                    {product.subtitle || "100% Natural"}

                  </p>



                  <div className="mt-4 flex items-end gap-1 flex-wrap">

                    <span className="text-[28px] sm:text-3xl font-bold text-[#183818]">

                      ₹{product.price}

                    </span>



                    <span className="text-[#9ca3af] text-sm mb-1">

                      (100g)

                    </span>

                  </div>



                  {/* ADD TO CART */}
                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    className="mt-6 w-full bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                  >

                    <ShoppingCart size={18} />

                    Add To Cart

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  )

}