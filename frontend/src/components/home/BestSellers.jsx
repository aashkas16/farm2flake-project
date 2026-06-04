import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Star, Heart, ArrowRight, ShoppingBag } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { getProductPriceAndSize } from "../../utils/price"

export default function BestSellers() {
  const [products, setProducts] = useState([])
  const { wishlistItems, toggleWishlist } = useWishlist()
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  const handleIncrease = (productId) => {
    increaseQuantity(productId, "250g")
  }

  const handleDecrease = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId && (item.selectedSize === "250g" || !item.selectedSize))
    if (cartItem && cartItem.quantity > 1) {
      decreaseQuantity(productId, "250g")
    } else {
      removeFromCart(productId, "250g")
    }
  }

  // FETCH PRODUCTS
  const fetchBestSellers = async () => {
    try {
      const response = await axios.get("https://farm2flake-backend.onrender.com/api/best-sellers")
      setProducts(response.data)
    } catch (error) {
      console.log("Error loading best sellers:", error)
    }
  }

  useEffect(() => {
    fetchBestSellers()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HEADING */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-2">
              Customer Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 font-bold text-[#2F7C1F] hover:text-[#1D3B1D] transition-colors group shrink-0"
          >
            <span>Explore Full Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistItems.some((item) => item.id === product.id)
            const price250g = getProductPriceAndSize(product, "250g")
            const isAddedToCart = cartItems.some(
              (item) => item.id === product.id && (item.selectedSize === "250g" || !item.selectedSize)
            )

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#1D3B1D]/5 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                {/* IMAGE AREA */}
                <div className="relative px-4 pt-4 bg-[#FAF7F2] m-2 rounded-2xl flex-1 flex items-center justify-center min-h-[180px] overflow-hidden">
                  
                  {/* BEST SELLER TAG (Safely evaluated without printing 0) */}
                  {(product.is_best_seller === 1 || product.is_best_seller === true) ? (
                    <div className="absolute top-3 left-3 bg-[#ff7a30] text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider z-10 shadow-sm">
                      Best Seller
                    </div>
                  ) : null}

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md border border-[#1D3B1D]/5 flex items-center justify-center hover:scale-105 active:scale-95 transition z-10"
                  >
                    <Heart
                      size={15}
                      fill={isWishlisted ? "#ef4444" : "transparent"}
                      className={isWishlisted ? "text-red-500" : "text-gray-400"}
                    />
                  </button>

                  {/* PRODUCT LINK IMAGE */}
                  <Link to={`/product/${product.id}`} className="w-full flex items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-[140px] sm:max-h-[160px] object-contain group-hover:scale-103 transition duration-300"
                    />
                  </Link>
                </div>

                {/* CONTENT AREA */}
                <div className="px-5 pb-5 pt-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#2F7C1F] uppercase">
                      {product.category}
                    </span>
                    <h3 className="text-base font-black text-[#111827] leading-snug min-h-[44px] mt-1 group-hover:text-[#2F7C1F] transition-colors">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    
                    {/* STARS */}
                    <div className="flex items-center gap-1 mt-2 text-amber-400">
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <span className="text-gray-400 text-[10px] font-medium ml-1">({product.reviews || 42})</span>
                    </div>
                  </div>

                  {/* PRICE & BUTTON */}
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-[#111827]">₹{price250g}</span>
                      <span className="text-gray-400 text-xs">(250g)</span>
                    </div>

                    {isAddedToCart ? (
                      <div className="mt-4 flex items-center justify-between border-2 border-[#1D3B1D]/10 bg-[#FAF7F2] rounded-xl h-[44px] overflow-hidden w-full px-2">
                        <button
                          onClick={() => handleDecrease(product.id)}
                          className="w-10 h-full flex items-center justify-center text-[#1D3B1D] hover:bg-black/5 transition font-black text-sm"
                        >
                          -
                        </button>
                        <span className="font-extrabold text-xs sm:text-sm text-[#1D3B1D]">
                          {cartItems.find(item => item.id === product.id && (item.selectedSize === "250g" || !item.selectedSize))?.quantity || 1} Qty
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
                        onClick={() => addToCart(product, 1, "250g", price250g)}
                        className="mt-4 w-full h-[44px] rounded-xl font-bold bg-[#2F7C1F] hover:bg-[#1D3B1D] text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm shadow-[#2F7C1F]/10 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <ShoppingBag size={14} />
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* BOTTOM FEATURES BAR */}
        <div className="mt-12 bg-[#FAF7F2] border border-[#1D3B1D]/5 rounded-[32px] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "☀️", title: "Low-Temp Dehydration", text: "Locking in organic nutrition" },
            { icon: "🌿", title: "Zero Synthetic Sugars", text: "100% natural, active purity" },
            { icon: "🧪", title: "Independently Lab-Tested", text: "Inspected for chemical safety" },
            { icon: "🇮🇳", title: "Direct Farmer Sourcing", text: "Harvested locally with care" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-black/[0.01]">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <h4 className="font-extrabold text-[#111827] text-xs sm:text-sm">{item.title}</h4>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}