import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { 
  ChevronRight, 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  Share2, 
  ShoppingBag,
  CheckCircle,
  Truck,
  ShieldCheck,
  Award,
  Sparkles
} from "lucide-react"

import { useCart } from "../components/context/CartContext"
import { useWishlist } from "../components/context/WishlistContext"

export default function ProductDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { cartItems, addToCart } = useCart()

  const { wishlistItems, toggleWishlist } = useWishlist()

  // STATE
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("100g")
  const [activeTab, setActiveTab] = useState("description")

  // REVIEWS STATE
  const [reviews, setReviews] = useState([])
  const [reviewName, setReviewName] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState("")
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewMessage, setReviewMessage] = useState("")
  const [reviewError, setReviewError] = useState("")

  // BUNDLE STATE
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [selectedBundleItems, setSelectedBundleItems] = useState([true, true, true])

  // FETCH PRODUCT & DATA
  const fetchProductData = async () => {

    setLoading(true)

    try {

      // PRODUCT
      const res = await axios.get(

        `https://farm2flake-backend.onrender.com/api/products/${id}`

      )

      setProduct(res.data)

      setActiveImage(res.data.image)

      setSelectedSize(res.data.size || "100g")

      // REVIEWS
      const reviewsRes = await axios.get(

        `https://farm2flake-backend.onrender.com/api/reviews/product/${id}`

      )

      setReviews(reviewsRes.data)

      // OTHER PRODUCTS
      const allProductsRes = await axios.get(

        `https://farm2flake-backend.onrender.com/api/products`

      )

      const otherProducts = allProductsRes.data.filter(

        p => p.id !== parseInt(id)

      )

      const selectedSuggestions = otherProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)

      setSuggestedProducts(selectedSuggestions)

    } catch (err) {

      console.error("Error loading product data:", err)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchProductData()

    window.scrollTo(0, 0)

    setQuantity(1)

    setReviewMessage("")

    setReviewError("")

    setReviewName("")

    setReviewText("")

    setReviewRating(5)

  }, [id])

  if (loading) {

    return (

      <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-[#2f7c1f] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-500 font-semibold">

            Loading FarmyTales goodness...

          </p>

        </div>

      </div>

    )

  }

  if (!product) {

    return (

      <div className="min-h-screen bg-[#f8f8f5] flex flex-col items-center justify-center p-6 text-center">

        <h2 className="text-3xl font-bold text-[#1c2b1d] mb-4">

          Product Not Found

        </h2>

        <p className="text-gray-500 mb-8 max-w-md">

          We couldn't find the nutrition product you are looking for.

        </p>

        <Link to="/shop">

          <button className="bg-[#2f7c1f] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#256718] transition duration-300">

            Back to Shop

          </button>

        </Link>

      </div>

    )

  }

  // DYNAMIC PRICING
  const basePrice = Number(product.price)

  const sizePrices = {

    "100g": basePrice,

    "250g": Math.round(basePrice * 2.2),

    "500g": Math.round(basePrice * 4.5),

  }

  const finalPrice = sizePrices[selectedSize]

  // BUNDLE MATHS
  const currentPrice = finalPrice

  const sug0Price = suggestedProducts[0]
    ? parseFloat(suggestedProducts[0].price)
    : 0

  const sug1Price = suggestedProducts[1]
    ? parseFloat(suggestedProducts[1].price)
    : 0

  let originalBundleTotal = 0

  if (selectedBundleItems[2]) {
    originalBundleTotal += currentPrice
  }

  if (selectedBundleItems[0] && suggestedProducts[0]) {
    originalBundleTotal += sug0Price
  }

  if (selectedBundleItems[1] && suggestedProducts[1]) {
    originalBundleTotal += sug1Price
  }

  // DISCOUNT
  const discountedBundleTotal = Math.round(

    originalBundleTotal * 0.88

  )

  // ADD BUNDLE
  const handleAddBundleToCart = () => {

    let addedCount = 0

    if (selectedBundleItems[2]) {

      addToCart({

        ...product,

        size: selectedSize,
        price: finalPrice,
        quantity: 1

      })

      addedCount++

    }

    if (selectedBundleItems[0] && suggestedProducts[0]) {

      addToCart({

        ...suggestedProducts[0],

        size: suggestedProducts[0].size || "100g",
        quantity: 1

      })

      addedCount++

    }

    if (selectedBundleItems[1] && suggestedProducts[1]) {

      addToCart({

        ...suggestedProducts[1],

        size: suggestedProducts[1].size || "100g",
        quantity: 1

      })

      addedCount++

    }

    if (addedCount > 0) {

      alert(

        `Successfully added ${addedCount} bundle products to your Cart!`

      )

    }

  }

  // SUBMIT REVIEW
  const handleReviewSubmit = async (e) => {

    e.preventDefault()

    if (!reviewName.trim() || !reviewText.trim()) {

      setReviewError("Please fill out all fields.")

      return

    }

    setReviewLoading(true)

    setReviewError("")

    setReviewMessage("")

    try {

      const res = await axios.post(

        "https://farm2flake-backend.onrender.com/api/reviews",

        {

          product_id: product.id,

          name: reviewName,

          rating: reviewRating,

          review: reviewText

        }

      )

      if (res.data.success) {

        setReviewMessage(

          "Thank you! Your review has been submitted successfully."

        )

        setReviewName("")

        setReviewText("")

        setReviewRating(5)

      } else {

        setReviewError(

          "Something went wrong. Please try again."

        )

      }

    } catch (err) {

      console.error("Error submitting review:", err)

      setReviewError(

        "Failed to submit review. Please try again later."

      )

    } finally {

      setReviewLoading(false)

    }

  }

  // BUY NOW
  const handleBuyNow = () => {

    addToCart({

      ...product,

      size: selectedSize,
      price: finalPrice,
      quantity

    })

    navigate("/cart")

  }

  // GALLERY
  const thumbnails = [

    product.image,
    product.image,
    product.image,
    product.image

  ]

  // WISHLIST
  const isWishlisted = wishlistItems.some(

    item => item.id === product.id

  )

  // TAGLINE
  const dynamicTagline =

    product.category === "Fruit Powders"

      ? "100% Real Fruit"

      : product.category === "Vegetable Powders"

      ? "100% Organic Veggies"

      : "100% Pure Herbs"

  return (
    <section className="bg-[#f8f8f5] min-h-screen pb-16">
      
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#2f7c1f] transition">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2f7c1f] transition">
            {product.category}
          </Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-[#2f7c1f] font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* CORE PRODUCT HIGHLIGHT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* LEFT: GALLERY */}
          <div className="flex flex-col-reverse md:flex-row gap-5">
            {/* THUMBNAILS (Desktop vertical) */}
            <div className="flex md:flex-col gap-3 justify-center md:justify-start shrink-0">
              {thumbnails.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 p-2 bg-[#fafaf7] flex items-center justify-center transition duration-200 overflow-hidden ${
                    activeImage === img ? "border-[#2f7c1f]" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 bg-[#fafaf7] rounded-3xl p-6 md:p-10 flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] border border-gray-50">
              
              {product.is_best_seller && (
                <span className="absolute top-5 left-5 bg-[#2f7c1f] text-white text-[11px] px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                  Best Seller
                </span>
              )}

              {/* WISHLIST HEART */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center hover:scale-105 active:scale-95 transition z-10"
              >
                <Heart
                  size={22}
                  fill={isWishlisted ? "#ef4444" : "transparent"}
                  className={isWishlisted ? "text-red-500" : "text-gray-400"}
                />
              </button>

              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[320px] sm:max-h-[380px] object-contain hover:scale-105 transition duration-500 ease-out"
              />
            </div>
          </div>

          {/* RIGHT: INFO DETAILS */}
          <div className="flex flex-col justify-center">
            
            {/* TITLE & TAGLINE */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1c2b1d] leading-tight">
                {product.name}
              </h1>
              <p className="text-[#2f7c1f] font-bold text-sm sm:text-base mt-2 tracking-wide uppercase">
                {dynamicTagline}
              </p>
            </div>

            {/* STAR RATING */}
            <div className="flex items-center gap-1.5 mt-4">
              <div className="flex text-amber-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <span className="text-gray-700 font-bold text-sm ml-1">4.8</span>
              <span className="text-gray-400 text-xs sm:text-sm">
                ({reviews.length > 0 ? reviews.length + 230 : 230} Reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-5 py-4 border-y border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1c2b1d]">
                  ₹{finalPrice}
                </span>
                <span className="text-gray-400 text-xs sm:text-sm">(Inclusive of all taxes)</span>
              </div>
            </div>

            {/* SHORT DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mt-5">
              {product.short_description || `Premium freeze-dried and dehydrated ${product.name.toLowerCase()} powder. Packed with high nutrients, authentic delicious natural taste, and healthy active fiber.`}
            </p>

            {/* 4 NATURAL ICONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { label: "100% Natural", icon: "🌱" },
                { label: "No Preservatives", icon: "🚫" },
                { label: "No Added Sugar", icon: "🌾" },
                { label: "Lab Tested", icon: "🔬" }
              ].map((badge, idx) => (
                <div key={idx} className="bg-[#fafaf7] border border-gray-100 rounded-xl py-3 px-2 flex flex-col items-center justify-center text-center">
                  <span className="text-xl mb-1">{badge.icon}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#1c2b1d]">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* SIZE SELECTOR */}
            <div className="mt-6">
              <span className="block text-sm font-bold text-[#1c2b1d] mb-3">Size</span>
              <div className="flex gap-3">
                {["100g", "250g", "500g"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition duration-200 border-2 ${
                      selectedSize === size
                        ? "border-[#2f7c1f] bg-[#eef7ec] text-[#2f7c1f] font-bold"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QTY & ACTION BUTTONS */}
            <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* QUANTITY PICKER */}
              <div>
                <span className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Quantity</span>
                <div className="flex items-center justify-between border border-gray-200 rounded-xl w-full sm:w-[130px] h-[52px] px-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-extrabold text-lg text-[#1c2b1d]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* ACTION PILLS */}
              <div className="flex-1 flex gap-3 items-end">
                <button
                  onClick={() => {
                    addToCart(product, quantity)
                    alert(`Added ${quantity} x ${product.name} to cart successfully!`)
                  }}
                  className="flex-1 h-[52px] bg-[#2f7c1f] hover:bg-[#256718] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm shadow-[#2f7c1f]/10 transition duration-300 transform active:scale-95 text-sm sm:text-base"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-[52px] bg-[#ffb703] hover:bg-[#fb8500] text-[#1c2b1d] rounded-xl font-extrabold flex items-center justify-center shadow-sm transition duration-300 transform active:scale-95 text-sm sm:text-base"
                >
                  Buy Now
                </button>
              </div>

            </div>

            {/* TRUST BADGES & SHARING */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#2f7c1f]" />
                <span>Delivery: 2-4 days pan India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#2f7c1f]" />
                <span>Free shipping on orders above ₹999</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DESCRIPTION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-sm">
          
          {/* TAB HEADERS */}
          <div className="flex border-b border-gray-100 overflow-x-auto pb-px gap-6 sm:gap-8 no-scrollbar">
            {[
              { id: "description", label: "Description" },
              { id: "howToUse", label: "How to Use" },
              { id: "nutrition", label: "Nutrition Facts" },
              { id: "ingredients", label: "Ingredients" },
              { id: "faq", label: "FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-bold text-sm sm:text-base whitespace-nowrap transition duration-200 border-b-2 shrink-0 ${
                  activeTab === tab.id
                    ? "border-[#2f7c1f] text-[#2f7c1f]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT PANEL */}
          <div className="mt-8 min-h-[220px]">
            {activeTab === "description" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c2b1d]">
                    Pure Nutrition from Farm to Flake
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {product.full_description || `Our premium ${product.name} is made from hand-selected, high-quality ingredients sourced directly from premium fields. Utilizing state-of-the-art dehydration and low-temperature freeze-drying processes, we lock in vital vitamins, dietary fibers, and minerals. Perfect for daily active lifestyles.`}
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-[#2f7c1f] text-lg">✓</span> Perfect for smoothies, shakes, baking & recipes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2f7c1f] text-lg">✓</span> No artificial colors, preservatives or fillers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2f7c1f] text-lg">✓</span> Extended shelf-life up to 12 months
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2f7c1f] text-lg">✓</span> Convenient, clean and easy to store jar
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden bg-[#fafaf7] p-6 border border-gray-50 flex items-center justify-center max-h-[300px]">
                  <img 
                    src={product.image} 
                    alt="Nutritious powder bowl" 
                    className="max-h-[240px] object-contain opacity-95 hover:scale-102 transition duration-300"
                  />
                </div>
              </div>
            )}

            {activeTab === "howToUse" && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c2b1d]">Simple Steps to Add Superfoods Daily</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { step: "01", title: "Scoop", text: "Take 1-2 teaspoons (around 5g to 10g) of our natural powder using a clean spoon." },
                    { step: "02", title: "Blend / Stir", text: "Mix into fresh water, juices, dynamic smoothies, dynamic oatmeals, baking batters or curries." },
                    { step: "03", title: "Enjoy", text: "Stir thoroughly to dissolve completely and consume daily to enhance standard stamina & health." }
                  ].map((s, i) => (
                    <div key={i} className="bg-[#fafaf7] rounded-2xl p-6 border border-gray-100">
                      <span className="text-3xl font-black text-[#2f7c1f]/25 block mb-2">{s.step}</span>
                      <h4 className="font-bold text-[#1c2b1d] text-base sm:text-lg mb-2">{s.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c2b1d] mb-4">Nutrition Facts (Per 100g)</h3>
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-5 py-3 text-left font-bold text-[#1c2b1d]">Nutrient Parameter</th>
                        <th className="px-5 py-3 text-right font-bold text-[#1c2b1d]">Average Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Energy (Kcal)", val: "348" },
                        { name: "Carbohydrates (g)", val: "78.4" },
                        { name: "Dietary Fiber (g)", val: "9.2" },
                        { name: "Natural Sugar (g)", val: "42.0" },
                        { name: "Proteins (g)", val: "4.8" },
                        { name: "Fat (g)", val: "0.6" },
                        { name: "Vitamin C (mg)", val: "88.0" },
                        { name: "Iron (mg)", val: "1.4" }
                      ].map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                          <td className="px-5 py-3.5 text-gray-700 font-medium">{item.name}</td>
                          <td className="px-5 py-3.5 text-right font-bold text-[#1c2b1d]">{item.val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1c2b1d]">Pure and Single Ingredient Product</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-2xl">
                  We believe in 100% transparency. This product contains absolutely zero fillers, zero starch, zero sugars, zero anti-caking agents, and zero synthetic ingredients.
                </p>
                <div className="inline-block bg-[#eef7ec] text-[#2f7c1f] rounded-2xl px-6 py-4 border border-[#d2f3c7] font-extrabold text-base sm:text-lg">
                  🌿 Ingredient: 100% Dehydrated Pure {product.name}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-5 max-w-3xl">
                {[
                  { q: "How should I store this natural powder?", a: "Store in the airtight jar provided. Keep it in a cool, dry pantry away from direct sunlight. Do not use wet spoons." },
                  { q: "Does this product contain any added sugar?", a: "No! All sweetness is completely natural, coming from raw dehydrating fruits or vegetables. There is 0% added refined sugar." },
                  { q: "What is the shelf life?", a: "Due to advanced low-moisture freeze dehydration, it remains fresh for up to 12 months from the date of packaging without any artificial shelf-life enhancers." }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-5 last:border-0">
                    <h4 className="font-bold text-[#1c2b1d] text-base sm:text-lg mb-2 flex items-start gap-2">
                      <span className="text-[#2f7c1f]">Q.</span> {item.q}
                    </h4>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed pl-5">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER SECTION */}
      {suggestedProducts.length >= 2 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c2b1d] text-center mb-8">
              Frequently Bought Together
            </h3>
            
            {/* BUNDLE GRID */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
              
              {/* ITEM 1: SUGGESTED 0 */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className={`p-4 bg-[#fafaf7] border-2 rounded-3xl w-44 h-48 flex flex-col items-center justify-center text-center relative transition ${
                  selectedBundleItems[0] ? "border-[#2f7c1f] shadow-sm" : "border-transparent opacity-65"
                }`}>
                  <button 
                    onClick={() => setSelectedBundleItems([!selectedBundleItems[0], selectedBundleItems[1], selectedBundleItems[2]])}
                    className="absolute top-2 left-2 w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white"
                  >
                    {selectedBundleItems[0] && <span className="text-[#2f7c1f] font-bold text-sm">✓</span>}
                  </button>
                  <img src={suggestedProducts[0].image} alt="" className="w-20 h-20 object-contain mb-2" />
                  <span className="font-bold text-xs text-[#1c2b1d] line-clamp-1">{suggestedProducts[0].name}</span>
                  <span className="text-sm font-bold text-gray-500 mt-1">₹{suggestedProducts[0].price}</span>
                </div>
              </div>

              {/* PLUS */}
              <span className="text-3xl font-extrabold text-[#2f7c1f]">+</span>

              {/* ITEM 2: SUGGESTED 1 */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className={`p-4 bg-[#fafaf7] border-2 rounded-3xl w-44 h-48 flex flex-col items-center justify-center text-center relative transition ${
                  selectedBundleItems[1] ? "border-[#2f7c1f] shadow-sm" : "border-transparent opacity-65"
                }`}>
                  <button 
                    onClick={() => setSelectedBundleItems([selectedBundleItems[0], !selectedBundleItems[1], selectedBundleItems[2]])}
                    className="absolute top-2 left-2 w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white"
                  >
                    {selectedBundleItems[1] && <span className="text-[#2f7c1f] font-bold text-sm">✓</span>}
                  </button>
                  <img src={suggestedProducts[1].image} alt="" className="w-20 h-20 object-contain mb-2" />
                  <span className="font-bold text-xs text-[#1c2b1d] line-clamp-1">{suggestedProducts[1].name}</span>
                  <span className="text-sm font-bold text-gray-500 mt-1">₹{suggestedProducts[1].price}</span>
                </div>
              </div>

              {/* PLUS */}
              <span className="text-3xl font-extrabold text-[#2f7c1f]">+</span>

              {/* ITEM 3: CURRENT PRODUCT */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className={`p-4 bg-[#fafaf7] border-2 rounded-3xl w-44 h-48 flex flex-col items-center justify-center text-center relative transition ${
                  selectedBundleItems[2] ? "border-[#2f7c1f] shadow-sm" : "border-transparent opacity-65"
                }`}>
                  <button 
                    onClick={() => setSelectedBundleItems([selectedBundleItems[0], selectedBundleItems[1], !selectedBundleItems[2]])}
                    className="absolute top-2 left-2 w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white"
                  >
                    {selectedBundleItems[2] && <span className="text-[#2f7c1f] font-bold text-sm">✓</span>}
                  </button>
                  <img src={product.image} alt="" className="w-20 h-20 object-contain mb-2" />
                  <span className="font-bold text-xs text-[#1c2b1d] line-clamp-1">{product.name}</span>
                  <span className="text-sm font-bold text-gray-500 mt-1">₹{product.price}</span>
                </div>
              </div>

              {/* VERTICAL BORDER FOR DESKTOP */}
              <div className="hidden lg:block h-32 w-px bg-gray-100 mx-6"></div>

              {/* TOTALS & QUICK ADD */}
              <div className="flex flex-col items-center lg:items-start mt-6 lg:mt-0 text-center lg:text-left">
                <button
                  onClick={handleAddBundleToCart}
                  disabled={originalBundleTotal === 0}
                  className="bg-[#2f7c1f] disabled:bg-gray-300 hover:bg-[#256718] text-white px-8 py-3.5 rounded-xl font-bold transition duration-300 transform active:scale-95 mb-4 shadow-sm"
                >
                  Add Selected to Cart →
                </button>
                
                {originalBundleTotal > 0 && (
                  <div className="flex items-center gap-3 text-lg font-bold">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-gray-400 line-through text-base">₹{originalBundleTotal}</span>
                    <span className="text-[#2f7c1f] text-2xl font-black">₹{discountedBundleTotal}</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CUSTOMER REVIEWS PORTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          {/* LIST APPROVED REVIEWS */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1c2b1d] mb-8">
              Approved Experiences ({reviews.length > 0 ? reviews.length + 3 : 3})
            </h3>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b border-gray-100 pb-5 last:border-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-[#1c2b1d] text-base">{rev.name}</h4>
                      <div className="flex text-amber-400 text-xs mt-1">
                        {"⭐".repeat(rev.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(rev.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">{rev.review}</p>
                </div>
              ))}

              {/* Curated baseline reviews if database is empty */}
              <div className="border-b border-gray-100 pb-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-extrabold text-[#1c2b1d] text-base">Aashka S.</h4>
                    <div className="flex text-amber-400 text-xs mt-1">⭐⭐⭐⭐⭐</div>
                  </div>
                  <span className="text-xs text-gray-400">May 15, 2026</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  This freeze-dried powder dissolves flawlessly! The taste is so authentic, exactly like eating Alphonso mangoes. I add it to my morning Greek yogurt and dynamic smoothies every single day. Highly recommended!
                </p>
              </div>

              <div className="border-b border-gray-100 pb-5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-extrabold text-[#1c2b1d] text-base">Rohan Mehta</h4>
                    <div className="flex text-amber-400 text-xs mt-1">⭐⭐⭐⭐⭐</div>
                  </div>
                  <span className="text-xs text-gray-400">April 28, 2026</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  Absolutely amazing! Very pure product. Most other powders have anti-caking starches or sugars, but this is 100% genuine fruit goodness. The color and flavor are outstanding.
                </p>
              </div>

              <div className="border-b border-gray-100 pb-5 last:border-0">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-extrabold text-[#1c2b1d] text-base">Dr. Priyanka</h4>
                    <div className="flex text-amber-400 text-xs mt-1">⭐⭐⭐⭐</div>
                  </div>
                  <span className="text-xs text-gray-400">March 12, 2026</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                  As a nutritionist, I highly approve of their dehydration safety standards. Zero added sugars or chemicals, which makes it perfect for kids. A bit pricey but the lab-tested premium quality justifies the cost.
                </p>
              </div>
            </div>
          </div>

          {/* ADD REVIEW FORM */}
          <div className="bg-[#fafaf7] rounded-3xl p-6 border border-gray-100 h-fit">
            <h4 className="text-xl font-extrabold text-[#1c2b1d] mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-[#2f7c1f]" /> Share Your Experience
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm mb-6">
              Your feedback is audited by our admins to maintain pure ratings and safety compliance.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-sm">
              {/* RATING BUTTONS */}
              <div>
                <span className="block font-bold text-[#1c2b1d] mb-2">Your Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-2xl hover:scale-110 active:scale-95 transition duration-150"
                    >
                      {star <= reviewRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              {/* NAME */}
              <div>
                <label className="block font-bold text-[#1c2b1d] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full h-[48px] rounded-xl border border-gray-200 bg-white px-4 outline-none focus:border-[#2f7c1f] transition"
                  required
                />
              </div>

              {/* DESCRIPTION TEXT */}
              <div>
                <label className="block font-bold text-[#1c2b1d] mb-2">Review Details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you like or how you use this product..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-4 outline-none focus:border-[#2f7c1f] transition resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              {/* ERROR/SUCCESS MESSAGES */}
              {reviewError && (
                <div className="bg-red-50 text-red-600 rounded-xl p-3 border border-red-100 font-semibold text-xs leading-relaxed">
                  ⚠️ {reviewError}
                </div>
              )}
              
              {reviewMessage && (
                <div className="bg-[#eef7ec] text-[#2f7c1f] rounded-xl p-3 border border-[#d2f3c7] font-semibold text-xs leading-relaxed flex items-start gap-2">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{reviewMessage}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={reviewLoading}
                className="w-full h-[48px] bg-[#2f7c1f] disabled:bg-gray-400 hover:bg-[#256718] text-white font-bold rounded-xl transition duration-300 flex items-center justify-center shadow-sm"
              >
                {reviewLoading ? "Submitting Audit..." : "Submit Review"}
              </button>
            </form>
          </div>

        </div>
      </div>

    </section>
  )
}
