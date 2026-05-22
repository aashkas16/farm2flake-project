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

    <section className="min-h-screen bg-[#fafaf7] py-14">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[15px] text-[#6b7280] mb-10">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-[#2d5a2d] font-semibold">
            Cart
          </span>

        </div>


        {/* MAIN BOX */}
        <div className="bg-white rounded-[28px] border border-[#edf1e8] p-10">

          {/* Heading */}
          <h1 className="text-[34px] font-bold text-[#183818] mb-10">

            Your Cart

            <span className="text-[#667166] text-xl font-medium ml-2">

              ({cartItems.length} Items)

            </span>

          </h1>


          {cartItems.length === 0 ? (

            <div className="py-24 text-center">

              <div className="text-6xl mb-5">
                🛒
              </div>

              <h2 className="text-3xl font-bold text-[#183818]">

                Your Cart is Empty

              </h2>

              <Link to="/shop">

                <button className="mt-8 bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-8 py-4 rounded-xl font-semibold transition">

                  Continue Shopping

                </button>

              </Link>

            </div>

          ) : (

            <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-10">

              {/* LEFT */}
              <div>

                {/* TABLE HEAD */}
                <div className="grid grid-cols-4 pb-5 border-b border-[#edf1e8] text-[#667166] font-semibold text-sm">

                  <span>Product</span>

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
                      className="grid grid-cols-4 items-center py-7 border-b border-[#edf1e8]"
                    >

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

                          {/* MINUS */}
                          <button
                            onClick={() => decreaseQuantity(product.id)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-[#f5f5f5] transition"
                          >

                            <Minus size={15} />

                          </button>


                          {/* QUANTITY */}
                          <span className="w-10 text-center text-sm font-semibold">

                            {product.quantity}

                          </span>


                          {/* PLUS */}
                          <button
                            onClick={() => increaseQuantity(product.id)}
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


                        {/* REMOVE */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#667166] hover:text-red-500 transition"
                        >

                          <X size={18} />

                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* RIGHT SUMMARY */}
              <div>

                <div className="border border-[#edf1e8] rounded-[22px] p-8">

                  <h2 className="text-[26px] font-bold text-[#183818] mb-8">

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

                    <span className="text-[24px] font-bold text-[#183818]">

                      Total

                    </span>

                    <span className="text-[30px] font-bold text-[#183818]">

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#edf7df] flex items-center justify-center text-2xl">

              🔒

            </div>

            <div>

              <h3 className="font-bold text-[#183818]">

                100% Secure Payment

              </h3>

            </div>

          </div>


          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#edf7df] flex items-center justify-center text-2xl">

              ↩️

            </div>

            <div>

              <h3 className="font-bold text-[#183818]">

                Easy Returns

              </h3>

            </div>

          </div>


          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#edf7df] flex items-center justify-center text-2xl">

              ✅

            </div>

            <div>

              <h3 className="font-bold text-[#183818]">

                Quality Guaranteed

              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}