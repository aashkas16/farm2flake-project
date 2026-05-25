import { Link } from "react-router-dom"

import {
  Minus,
  Plus,
  X
} from "lucide-react"

import { useCart } from "../components/context/CartContext"

export default function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart()



  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0

  )



  return (

    <section className="min-h-screen bg-[#fafaf7] py-10 md:py-14 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#6b7280] mb-8 md:mb-10 flex-wrap">

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

            Cart

          </span>

        </div>



        {/* MAIN BOX */}
        <div className="bg-white rounded-[24px] md:rounded-[28px] border border-[#edf1e8] p-5 sm:p-7 md:p-10">

          {/* HEADING */}
          <h1 className="text-[28px] sm:text-[34px] font-bold text-[#183818] mb-8 md:mb-10 leading-tight">

            Your Cart



            <span className="block sm:inline text-[#667166] text-lg sm:text-xl font-medium sm:ml-2 mt-2 sm:mt-0">

              ({cartItems.length} Items)

            </span>

          </h1>



          {cartItems.length === 0 ? (

            <div className="py-16 md:py-24 text-center">

              <div className="text-5xl md:text-6xl mb-5">

                🛒

              </div>



              <h2 className="text-2xl sm:text-3xl font-bold text-[#183818]">

                Your Cart is Empty

              </h2>



              <Link to="/shop">

                <button className="mt-8 bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition w-full sm:w-auto">

                  Continue Shopping

                </button>

              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.7fr] gap-8 md:gap-10">

              {/* LEFT */}
              <div>

                {/* DESKTOP HEAD */}
                <div className="hidden md:grid grid-cols-4 pb-5 border-b border-[#edf1e8] text-[#667166] font-semibold text-sm">

                  <span>

                    Product

                  </span>



                  <span className="text-center">

                    Price

                  </span>



                  <span className="text-center">

                    Quantity

                  </span>



                  <span className="text-right">

                    Subtotal

                  </span>

                </div>



                {/* PRODUCTS */}
                <div>

                  {cartItems.map((product) => (

                    <div
                      key={product.id}
                      className="py-6 border-b border-[#edf1e8]"
                    >

                      {/* MOBILE */}
                      <div className="flex flex-col sm:flex-row gap-5 md:hidden">

                        {/* IMAGE */}
                        <div className="bg-[#f8f8f5] rounded-xl overflow-hidden w-full sm:w-[120px] flex items-center justify-center">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[110px] h-[110px] object-contain p-2"
                          />

                        </div>



                        {/* CONTENT */}
                        <div className="flex-1">

                          <div className="flex justify-between gap-4">

                            <div>

                              <h2 className="font-semibold text-[#183818] text-[16px] leading-snug">

                                {product.name}

                              </h2>



                              <p className="text-sm text-[#667166] mt-1">

                                (100g)

                              </p>

                            </div>



                            <button
                              onClick={() =>
                                removeFromCart(product.id)
                              }
                              className="text-[#667166] hover:text-red-500 transition h-fit"
                            >

                              <X size={18} />

                            </button>

                          </div>



                          <p className="mt-4 font-semibold text-[#183818]">

                            ₹{product.price}

                          </p>



                          {/* QUANTITY */}
                          <div className="mt-4 flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden w-fit">

                            <button
                              onClick={() =>
                                decreaseQuantity(product.id)
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f5] transition"
                            >

                              <Minus size={15} />

                            </button>



                            <span className="w-10 text-center text-sm font-semibold">

                              {product.quantity}

                            </span>



                            <button
                              onClick={() =>
                                increaseQuantity(product.id)
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f5] transition"
                            >

                              <Plus size={15} />

                            </button>

                          </div>



                          <p className="mt-4 font-bold text-[#183818]">

                            Subtotal: ₹{product.price * product.quantity}

                          </p>

                        </div>

                      </div>



                      {/* DESKTOP */}
                      <div className="hidden md:grid grid-cols-4 items-center">

                        {/* PRODUCT */}
                        <div className="flex items-center gap-4">

                          <div className="bg-[#f8f8f5] rounded-xl overflow-hidden">

                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-[90px] h-[90px] object-contain p-2"
                            />

                          </div>



                          <div>

                            <h2 className="font-semibold text-[#183818] text-[17px]">

                              {product.name}

                            </h2>



                            <p className="text-sm text-[#667166] mt-1">

                              (100g)

                            </p>

                          </div>

                        </div>



                        {/* PRICE */}
                        <div className="text-center font-semibold text-[#183818]">

                          ₹{product.price}

                        </div>



                        {/* QUANTITY */}
                        <div className="flex justify-center">

                          <div className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden">

                            <button
                              onClick={() =>
                                decreaseQuantity(product.id)
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f5] transition"
                            >

                              <Minus size={15} />

                            </button>



                            <span className="w-10 text-center text-sm font-semibold">

                              {product.quantity}

                            </span>



                            <button
                              onClick={() =>
                                increaseQuantity(product.id)
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f5] transition"
                            >

                              <Plus size={15} />

                            </button>

                          </div>

                        </div>



                        {/* SUBTOTAL */}
                        <div className="flex items-center justify-end gap-6">

                          <span className="font-semibold text-[#183818]">

                            ₹{product.price * product.quantity}

                          </span>



                          <button
                            onClick={() =>
                              removeFromCart(product.id)
                            }
                            className="text-[#667166] hover:text-red-500 transition"
                          >

                            <X size={18} />

                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>



              {/* RIGHT SUMMARY */}
              <div>

                <div className="border border-[#edf1e8] rounded-[22px] p-6 sm:p-8 lg:sticky lg:top-8">

                  <h2 className="text-[24px] sm:text-[26px] font-bold text-[#183818] mb-8">

                    Order Summary

                  </h2>



                  <div className="space-y-5">

                    <div className="flex items-center justify-between">

                      <span className="text-[#667166]">

                        Subtotal

                      </span>



                      <span className="font-semibold text-[#183818]">

                        ₹{totalPrice}

                      </span>

                    </div>



                    <div className="flex items-center justify-between">

                      <span className="text-[#667166]">

                        Shipping

                      </span>



                      <span className="font-semibold text-[#2d5a2d]">

                        FREE

                      </span>

                    </div>

                  </div>



                  <div className="border-t border-[#edf1e8] mt-8 pt-6 flex items-center justify-between">

                    <span className="text-[22px] sm:text-[24px] font-bold text-[#183818]">

                      Total

                    </span>



                    <span className="text-[28px] sm:text-[30px] font-bold text-[#183818]">

                      ₹{totalPrice}

                    </span>

                  </div>



                  {/* CHECKOUT */}
                  <Link to="/checkout">

                    <button className="mt-8 w-full bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white py-4 rounded-xl font-semibold">

                      Proceed to Checkout

                    </button>

                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>



        {/* BOTTOM FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">

          {[
            {
              icon: "🔒",
              title: "100% Secure Payment"
            },

            {
              icon: "↩️",
              title: "Easy Returns"
            },

            {
              icon: "✅",
              title: "Quality Guaranteed"
            }

          ].map((item) => (

            <div
              key={item.title}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#edf1e8]"
            >

              <div className="w-14 h-14 rounded-full bg-[#edf7df] flex items-center justify-center text-2xl shrink-0">

                {item.icon}

              </div>



              <div>

                <h3 className="font-bold text-[#183818]">

                  {item.title}

                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}