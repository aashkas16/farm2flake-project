import { useState } from "react"

import { Link } from "react-router-dom"

import {

  Search,
  Heart,
  ShoppingCart,
  Menu,
  X

} from "lucide-react"

import { useWishlist } from "../context/WishlistContext"

import { useCart } from "../context/CartContext"

export default function Header() {

  const { wishlistItems } =
    useWishlist()

  const { cartItems } =
    useCart()

  const [mobileMenu, setMobileMenu] =
    useState(false)



  const navLinks = [

    {
      name: "HOME",
      path: "/"
    },

    {
      name: "SHOP",
      path: "/shop"
    },

    {
      name: "ABOUT",
      path: "/about"
    },

    {
      name: "FAQ",
      path: "/faq"
    },

    {
      name: "BLOG",
      path: "/blog"
    },

    {
      name: "TRIAL PACK",
      path: "/trial"
    }

  ]



  return (

    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-[9999]">

      <div className="max-w-7xl mx-auto px-3 sm:px-5 h-[72px] flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="lg:hidden text-[#1d1d1d]"
          >

            {

              mobileMenu

                ? <X size={26} />

                : <Menu size={26} />

            }

          </button>



          {/* LOGO */}
          <div className="leading-none">

            <h1 className="text-[18px] sm:text-[26px] md:text-[34px] font-bold text-[#275227]">

              <Link to="/">

                Farm2Flake

              </Link>

            </h1>



            <p className="hidden sm:block text-[11px] text-[#5f7a5f] mt-1">

              Rich Fruits. Real Goodness.

            </p>

          </div>

        </div>



        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#1d1d1d]">

          {navLinks.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              className="hover:text-[#2d5a2d] transition"
            >

              {item.name}

            </Link>

          ))}

        </nav>



        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#1f1f1f]">

          {/* SEARCH */}
          <button className="hover:text-[#2d5a2d] transition">

            <Search
              size={22}
              strokeWidth={2.2}
            />

          </button>



          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="relative hover:text-[#2d5a2d] transition"
          >

            <Heart
              size={22}
              strokeWidth={2.2}
            />



            <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">

              {wishlistItems.length}

            </span>

          </Link>



          {/* CART */}
          <Link
            to="/cart"
            className="relative hover:text-[#2d5a2d] transition"
          >

            <ShoppingCart
              size={24}
              strokeWidth={2.2}
            />



            <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">

              {cartItems.length}

            </span>

          </Link>

        </div>

      </div>



      {/* MOBILE NAVIGATION */}
      {mobileMenu && (

        <div className="lg:hidden bg-white border-t border-gray-100 shadow-md px-5 py-5 flex flex-col gap-5">

          {navLinks.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              onClick={() =>
                setMobileMenu(false)
              }
              className="text-[15px] font-medium text-[#1d1d1d] hover:text-[#2d5a2d] transition"
            >

              {item.name}

            </Link>

          ))}

        </div>

      )}

    </header>

  )

}