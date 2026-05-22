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

    <section className="min-h-screen bg-[#fafaf7] py-14">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[15px] text-[#6b7280] mb-8">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-[#2d5a2d] font-semibold">
            Wishlist
          </span>

        </div>


        {/* Heading */}
        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-5xl font-bold text-[#183818]">
              My Wishlist
            </h1>

            <p className="text-[#667166] mt-3 text-lg">
              Your favorite saved products.
            </p>

          </div>

          <div className="bg-[#edf7df] text-[#2d5a2d] px-5 py-3 rounded-2xl font-semibold">

            {wishlistItems.length} Items

          </div>

        </div>


        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (

          <div className="bg-white rounded-[30px] border border-[#edf1e8] py-28 text-center">

            <div className="text-7xl mb-6">
              🤍
            </div>

            <h2 className="text-3xl font-bold text-[#183818]">

              Your Wishlist is Empty

            </h2>

            <p className="text-[#667166] mt-4 text-lg">

              Save products you love for later.

            </p>

            <Link to="/shop">

              <button className="mt-8 bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-8 py-4 rounded-2xl font-semibold">

                Explore Products

              </button>

            </Link>

          </div>

        ) : (

          /* PRODUCTS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {wishlistItems.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-[28px] overflow-hidden border border-[#edf1e8] hover:shadow-xl transition duration-300"
              >

                {/* Image */}
                <div className="relative p-5">

                  {/* Remove */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                  >

                    ❤️

                  </button>


                  <div className="bg-[#f8f8f5] rounded-[22px] overflow-hidden">

                    <img
                      src={product.image || product.image_url}
                      alt={product.name}
                      className="w-full h-[230px] object-contain p-4"
                    />

                  </div>

                </div>


                {/* Content */}
                <div className="px-5 pb-5">

                  <h2 className="text-[22px] font-bold text-[#183818]">

                    {product.name}

                  </h2>

                  <p className="text-[#667166] mt-2">

                    {product.subtitle || "100% Natural"}

                  </p>

                  <div className="mt-4 flex items-end gap-1">

                    <span className="text-3xl font-bold text-[#183818]">
                      ₹{product.price}
                    </span>

                    <span className="text-[#9ca3af] text-sm mb-1">
                      (100g)
                    </span>

                  </div>


                  {/* Add To Cart */}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-6 w-full bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
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