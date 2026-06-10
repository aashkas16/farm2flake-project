import { motion, AnimatePresence } from "framer-motion"

import { useState, useEffect } from "react"

import { Link, useLocation } from "react-router-dom"

import {
  ShoppingCart,
  Heart,
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

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {

    setMobileMenu(false)
    setIsAdmin(!!sessionStorage.getItem("admin"))

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
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navbarAnimation}
        className={`

          w-full
          sticky top-0
          z-[9999]

          transition-all duration-500

          ${

            scrolled

              ? "bg-[#FAF7F2]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(29,59,29,0.06)] border-b border-[#1D3B1D]/5"

              : "bg-transparent border-transparent"

          }
        `}
      >

        <div className="max-w-7xl mx-auto h-[68px] md:h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-2 min-w-0 flex-1">

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setMobileMenu(true)
              }
              className="
                lg:hidden

                w-10 h-10

                rounded-full

                flex items-center justify-center

                hover:bg-black/5

                transition-all duration-300

                shrink-0
              "
            >

              <Menu
                size={22}
                strokeWidth={2}
                className="text-[#111827]"
              />

            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="leading-none min-w-0 flex flex-col justify-center"
            >

              <h1 className="text-2xl sm:text-3xl font-black tracking-[-1.5px] text-[#1D3B1D] leading-none">

                Farm2Flake

              </h1>

              <p className="text-[10px] text-gray-500 font-medium tracking-[1.5px] uppercase mt-0.5">

                Freeze-Dried Superfoods

              </p>

            </Link>

          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-bold tracking-wider text-[#111827]">

            {navLinks.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                className="
                  relative
                  hover:text-[#2F7C1F]
                  transition-colors duration-300
                  after:absolute
                  after:left-1/2
                  after:-translate-x-1/2
                  after:-bottom-1.5
                  after:h-[3px]
                  after:w-0
                  after:rounded-full
                  after:bg-[#2F7C1F]
                  after:transition-all
                  hover:after:w-4
                "
              >

                {item.name}

              </Link>

            ))}

          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-0 shrink-0">

            {/* WISHLIST */}
<Link
  to="/wishlist"
  className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f5f5f2] transition"
>

  <Heart
    size={20}
    strokeWidth={2.2}
    className="text-[#111827]"
  />

  <span className="absolute top-[3px] right-[2px] bg-[#79b84a] text-white text-[8px] min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center font-bold">

    {wishlistItems.length}

  </span>

</Link>

            {/* CART */}
            <Link
              to="/cart"
              className="
                relative

                w-10 h-10

                rounded-full

                flex items-center justify-center

                hover:bg-white/60

                transition-all duration-300
              "
            >

              <ShoppingCart
                size={21}
                strokeWidth={2.2}
                className="text-[#111827]"
              />

              <span className="absolute top-[4px] right-[3px] bg-[#79b84a] text-white text-[8px] min-w-[15px] h-[15px] px-1 rounded-full flex items-center justify-center font-bold">

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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10000] lg:hidden bg-black/40"
            onClick={() => setMobileMenu(false)}
          >

            {/* DRAWER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ willChange: "transform" }}
              onClick={(e) => e.stopPropagation()}
              className="
                absolute top-0 left-0 h-full w-[85%]
                max-w-[320px]
                bg-[#FAF7F2]
                border-r border-[#1D3B1D]/5
                shadow-[0_10px_50px_rgba(29,59,29,0.08)]
                flex flex-col
              "
            >

              {/* TOP */}
              <div className="h-[82px] px-6 border-b border-white/20 flex items-center justify-between">

                <div>

                  <h2 className="text-[25px] font-extrabold tracking-[-1px] text-[#275227] leading-none">

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
                  className="
                    w-10 h-10

                    rounded-full

                    bg-white/30

                    hover:bg-white/50

                    backdrop-blur-xl

                    flex items-center justify-center

                    transition-all duration-300
                  "
                >

                  <X
                    size={22}
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

                className="flex flex-col px-6 py-8 gap-4"
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
                      onClick={() => setMobileMenu(false)}
                      className="
                        w-full

                        px-5
                        py-[18px]

                        rounded-2xl

                        bg-white/28
                        backdrop-blur-xl

                        border border-white/20

                        text-[16px]
                        font-semibold

                        tracking-[0.5px]

                        text-[#1f2937]

                        flex items-center

                        hover:bg-white/45

                        transition-all
                        duration-300

                        active:scale-[0.98]

                        shadow-[0_8px_30px_rgba(255,255,255,0.08)]
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
                      w-full

                      px-5
                      py-[18px]

                      rounded-2xl

                      bg-white/28
                      backdrop-blur-xl

                      border border-white/20

                      text-[16px]
                      font-semibold

                      tracking-[0.5px]

                      text-[#1f2937]

                      flex items-center

                      hover:bg-white/45

                      transition-all
                      duration-300

                      active:scale-[0.98]

                      shadow-[0_8px_30px_rgba(255,255,255,0.08)]
                    "
                  >

                    WISHLIST ({wishlistItems.length})

                  </Link>

                </motion.div>

                {isAdmin && (
                  <>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileMenu(false)}
                        className="
                          w-full
                          px-5
                          py-[18px]
                          rounded-2xl
                          bg-green-50/80
                          backdrop-blur-xl
                          border border-green-200/50
                          text-[16px]
                          font-bold
                          tracking-[0.5px]
                          text-[#2d5a2d]
                          flex items-center
                          hover:bg-green-100/80
                          transition-all
                          duration-300
                          active:scale-[0.98]
                        "
                      >
                        ADMIN PANEL
                      </Link>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <button
                        onClick={() => {
                          sessionStorage.clear()
                          setIsAdmin(false)
                          setMobileMenu(false)
                          window.location.href = "/admin"
                        }}
                        className="
                          w-full
                          px-5
                          py-[18px]
                          rounded-2xl
                          bg-red-50/80
                          backdrop-blur-xl
                          border border-red-200/50
                          text-[16px]
                          font-bold
                          tracking-[0.5px]
                          text-red-600
                          flex items-center
                          hover:bg-red-100/80
                          transition-all
                          duration-300
                          active:scale-[0.98]
                          text-left
                        "
                      >
                        LOGOUT
                      </button>
                    </motion.div>
                  </>
                )}

              </motion.div>

              {/* BOTTOM BUTTON */}
              <div className="mt-auto p-6 border-t border-white/20">

                <Link
                  to="/shop"
                  className="
                    w-full
                    h-[58px]

                    rounded-2xl

                    bg-[#2d5a2d]
                    hover:bg-[#234723]

                    transition-all duration-300

                    text-white
                    font-semibold
                    text-[16px]

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