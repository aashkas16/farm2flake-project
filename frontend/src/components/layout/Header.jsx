import { useState, useEffect } from "react"

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



  // PREVENT BODY SCROLL
  useEffect(() => {

    if (mobileMenu) {

      document.body.style.overflow = "hidden"

    } else {

      document.body.style.overflow = "auto"

    }



    return () => {

      document.body.style.overflow = "auto"

    }

  }, [mobileMenu])



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

    <>

      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex-shrink-0">

            <h1 className="text-[24px] sm:text-[30px] md:text-[34px] font-bold text-[#275227] leading-none">

              <Link
                to="/"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                Farm2Flake

              </Link>

            </h1>



            <p className="hidden md:block text-[12px] text-[#5f7a5f] mt-1">

              Rich Fruits. Real Goodness.

            </p>

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



          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#1f1f1f] flex-shrink-0">

            {/* SEARCH */}
            <button className="hover:text-[#2d5a2d] transition hidden sm:flex">

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



              <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[9px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">

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



              <span className="absolute -top-2 -right-2 bg-[#79b84a] text-white text-[9px] sm:text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">

                {cartItems.length}

              </span>

            </Link>



            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="lg:hidden flex items-center justify-center"
            >

              {

                mobileMenu

                  ? <X size={28} />

                  : <Menu size={28} />

              }

            </button>

          </div>

        </div>

      </header>



      {/* OVERLAY */}
      <div
        onClick={() =>
          setMobileMenu(false)
        }
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 lg:hidden ${
          mobileMenu
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>



      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[82%] max-w-[340px] bg-white z-50 shadow-2xl transition-transform duration-300 lg:hidden flex flex-col ${
          mobileMenu
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* TOP */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">

          <div>

            <h2 className="text-[26px] font-bold text-[#275227]">

              Farm2Flake

            </h2>



            <p className="text-[11px] text-[#5f7a5f] mt-1">

              Rich Fruits. Real Goodness.

            </p>

          </div>



          <button
            onClick={() =>
              setMobileMenu(false)
            }
          >

            <X size={28} />

          </button>

        </div>



        {/* NAV LINKS */}
        <div className="flex flex-col px-5 py-6">

          {navLinks.map((item) => (

            <Link
              key={item.name}
              to={item.path}
              onClick={() =>
                setMobileMenu(false)
              }
              className="py-4 border-b border-gray-100 text-[16px] font-medium text-[#1d1d1d] hover:text-[#2d5a2d] transition"
            >

              {item.name}

            </Link>

          ))}

        </div>



        {/* BOTTOM */}
        <div className="mt-auto px-5 pb-8">

          <div className="bg-[#edf7df] rounded-2xl p-5">

            <h3 className="font-bold text-[#183818] text-lg">

              Natural Wellness 🌿

            </h3>



            <p className="text-[#5f7a5f] text-sm leading-6 mt-2">

              Explore healthy freeze-dried fruit & vegetable powders.

            </p>



            <Link
              to="/shop"
              onClick={() =>
                setMobileMenu(false)
              }
            >

              <button className="mt-4 w-full bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white py-3 rounded-xl font-semibold">

                Shop Now

              </button>

            </Link>

          </div>

        </div>

      </div>

    </>

  )

}