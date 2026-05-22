import { Link } from "react-router-dom"

import {
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react"

import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

export default function Header() {

  const { wishlistItems } = useWishlist()
  const { cartItems } = useCart()

  return (

    <header className="w-full bg-white border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">

        {/* LEFT */}
        <div>

          <h1 className="text-[34px] font-bold text-[#275227] leading-none">

            <Link to="/">
              Farm2Flake
            </Link>

          </h1>

          <p className="text-[12px] text-[#5f7a5f] mt-1">
            Rich Fruits. Real Goodness.
          </p>

        </div>


        {/* CENTER NAV */}
        <nav className="hidden lg:flex items-center gap-7 text-[16px] font-medium text-[#1d1d1d]">

          <Link to="/" className="hover:text-[#2d5a2d] transition">
            HOME
          </Link>

          <Link to="/shop" className="hover:text-[#2d5a2d] transition">
            SHOP
          </Link>

          <Link to="/about" className="hover:text-[#2d5a2d] transition">
            ABOUT
          </Link>

          <Link to="/faq" className="hover:text-[#2d5a2d] transition">
            FAQ
          </Link>

          <Link to="/blog" className="hover:text-[#2d5a2d] transition">
            BLOG
          </Link>

          <Link to="/trial" className="hover:text-[#2d5a2d] transition">
            TRIAL PACK
          </Link>

        </nav>


        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 text-[#1f1f1f] flex-shrink-0">

          {/* Search */}
          <button className="hover:text-[#2d5a2d] transition">

            <Search size={25} strokeWidth={2.2} />

          </button>


          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative hover:text-[#2d5a2d] transition"
          >

            <Heart size={25} strokeWidth={2.2} />

            <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">

              {wishlistItems.length}

            </span>

          </Link>


          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-[#2d5a2d] transition"
          >

            <ShoppingCart size={27} strokeWidth={2.2} />

            <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">

              {cartItems.length}

            </span>

          </Link>

        </div>

      </div>

    </header>

  )

}