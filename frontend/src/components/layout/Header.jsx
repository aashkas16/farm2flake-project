import { motion, AnimatePresence } from "framer-motion"

import { useState, useEffect } from "react"

import { Link, useLocation } from "react-router-dom"

import {
  ShoppingCart,
  Menu,
  X
} from "lucide-react"

import { useWishlist } from "../context/WishlistContext"

import { useCart } from "../context/CartContext"

import {
  navbarAnimation
} from "../../animations/variants"

export default function Header() {

  const { wishlistItems } =
    useWishlist()

  const { cartItems } =
    useCart()

  const [mobileMenu, setMobileMenu] =
    useState(false)

  const location =
    useLocation()

  const [scrolled, setScrolled] =
  useState(false)

  useEffect(() => {

    setMobileMenu(false)

  }, [location.pathname])

  useEffect(() => {

  const handleScroll = () => {

    setScrolled(window.scrollY > 20)

  }

  window.addEventListener(
    "scroll",
    handleScroll
  )

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    )

}, [])

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
      {/* HEADER */}
      <motion.header initial="hidden"

animate="visible"

variants={navbarAnimation}

className={`

w-full

sticky top-0

z-[9999]

transition-all duration-500

${
  scrolled

    ? "bg-white/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-b border-black/[0.04]"

    : "bg-transparent border-transparent"
}
`}>

        <div className="max-w-7xl mx-auto h-[68px] md:h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-2 min-w-0 flex-1">

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setMobileMenu(true)
              }
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f5f5f2] transition shrink-0"
            >

              <Menu
                size={20}
                strokeWidth={2.3}
                className="text-[#111827]"
              />

            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="leading-none min-w-0"
            >

              <h1 className="text-[22px] sm:text-[28px] md:text-[34px] font-extrabold tracking-[-1px] text-[#275227] leading-none truncate">

                Farm2Flake

              </h1>

              <p className="text-[10px] sm:text-[11px] text-[#6b7280] mt-1 tracking-[0.3px] truncate">

                Rich Fruits. Real Goodness.

              </p>

            </Link>

          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#1f2937]">

            {navLinks.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                className="
                  relative
                  hover:text-[#2d5a2d]
                  transition
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:w-0
                  after:bg-[#2d5a2d]
                  after:transition-all
                  hover:after:w-full
                "
              >

                {item.name}

              </Link>

            ))}

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-0 shrink-0">

            {/* CART */}
            <Link
              to="/cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f5f5f2] transition"
            >

              <ShoppingCart
                size={20}
                strokeWidth={2.2}
                className="text-[#111827]"
              />

              <span className="absolute top-[3px] right-[2px] bg-[#79b84a] text-white text-[8px] min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center font-bold">

                {cartItems.length}

              </span>

            </Link>

          </div>

        </div>

      </motion.header>

      {/* MOBILE MENU OVERLAY */}
       <AnimatePresence>

  {mobileMenu && (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      transition={{ duration: 0.25 }}

      className="fixed inset-0 z-[10000] lg:hidden bg-black/40 backdrop-blur-sm"

    >

      {/* DRAWER */}
      <motion.div

        initial={{ x: "-100%" }}

        animate={{ x: 0 }}

        exit={{ x: "-100%" }}

        transition={{
          type: "spring",
          damping: 26,
          stiffness: 260
        }}

        className="
          absolute top-0 left-0 h-full w-[84%]
          max-w-[340px]
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          flex flex-col
        "

      >

        {/* TOP */}
        <div className="h-[74px] px-5 border-b border-[#eef2e7] flex items-center justify-between">

          <div>

            <h2 className="text-[24px] font-extrabold tracking-[-1px] text-[#275227] leading-none">

              Farm2Flake

            </h2>

            <p className="text-[10px] text-[#6b7280] mt-1">

              Rich Fruits. Real Goodness.

            </p>

          </div>

          {/* CLOSE */}
          <button
            onClick={() =>
              setMobileMenu(false)
            }
            className="w-9 h-9 rounded-full hover:bg-[#f5f5f2] flex items-center justify-center transition"
          >

            <X
              size={21}
              className="text-[#111827]"
            />

          </button>

        </div>

        {/* NAVIGATION */}
        <motion.div

          initial="hidden"

          animate="visible"

          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}

          className="flex flex-col px-5 py-4"

        >

          {navLinks.map((item) => (

            <motion.div

              key={item.name}

              variants={{
                hidden: {
                  opacity: 0,
                  x: -20
                },

                visible: {
                  opacity: 1,
                  x: 0
                }
              }}

            >

              <Link
                to={item.path}
                className="
                  py-5
                  border-b
                  border-[#f1f3ed]
                  text-[15px]
                  font-semibold
                  tracking-[0.4px]
                  text-[#1f2937]
                  hover:text-[#2d5a2d]
                  transition
                "
              >

                {item.name}

              </Link>

            </motion.div>

          ))}

          {/* WISHLIST */}
          <motion.div

            variants={{
              hidden: {
                opacity: 0,
                x: -20
              },

              visible: {
                opacity: 1,
                x: 0
              }
            }}

          >

            <Link
              to="/wishlist"
              className="
                py-5
                border-b
                border-[#f1f3ed]
                text-[15px]
                font-semibold
                tracking-[0.4px]
                text-[#1f2937]
                hover:text-[#2d5a2d]
                transition
              "
            >

              WISHLIST ({wishlistItems.length})

            </Link>

          </motion.div>

        </motion.div>

        {/* BOTTOM BUTTON */}
        <div className="mt-auto p-5 border-t border-[#eef2e7]">

          <Link
            to="/shop"
            className="
              w-full
              h-[54px]
              rounded-xl
              bg-[#2d5a2d]
              hover:bg-[#234723]
              transition
              text-white
              font-semibold
              flex items-center justify-center
              shadow-[0_10px_30px_rgba(45,90,45,0.15)]
            "
          >

            Shop Products

          </Link>

        </div>

      </motion.div>

      {/* BACKDROP */}
      <div
        className="w-full h-full"
        onClick={() =>
          setMobileMenu(false)
        }
      />

    </motion.div>

  )}

</AnimatePresence>
    </>
  )
}