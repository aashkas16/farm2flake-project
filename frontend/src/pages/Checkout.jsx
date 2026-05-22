import { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useTrial } from "../components/context/TrialContext"
import { ShieldCheck } from "lucide-react"
import { useCart } from "../components/context/CartContext"

export default function Checkout() {
  const location = useLocation()
  const isTrialOrder = new URLSearchParams(location.search).get("type") === "trial"
  const { trialItems } = useTrial()
  const { cartItems } = useCart()

  // FORM STATES
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [landmark, setLandmark] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")

  const products = isTrialOrder ? trialItems : cartItems

  const totalPrice = isTrialOrder
    ? 199
    : cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // VALIDATION
  const isFormValid = fullName && phone && email && address && city && pincode

  const handlePlaceOrder = async () => {
    try {
      // SAVE ORDER IN DATABASE
      const response = await axios.post("http://localhost:5000/api/orders", {
        customer_name: fullName,
        phone,
        email,
        address,
        landmark,
        city,
        pincode,
        total_amount: totalPrice,
        products
      })

      const orderId = response.data.orderId

      // PRODUCT TEXT
      const productText = products.map(
        (item) => `• ${item.name}\nQty: ${item.quantity}\nPrice: ₹${item.price * item.quantity}`
      ).join("\n\n")

      // WHATSAPP MESSAGE
      const message = `
🛒 *NEW ORDER RECEIVED*
🆔 *Order ID*: ${orderId}

👤 *Customer Details*
Name: ${fullName}
Phone: ${phone}
Email: ${email}
Address: ${address}
Landmark: ${landmark || "N/A"}
City: ${city}
Pincode: ${pincode}

📦 *Order Summary*
${productText}

💰 *Total Amount*: ₹${totalPrice}
`

      // WHATSAPP URL (Change to your main operational number)
      const whatsappUrl = `https://wa.me/916359225925?text=${encodeURIComponent(message)}`

      // OPEN WHATSAPP
      window.open(whatsappUrl, "_blank")

      // CLEAR CART
      localStorage.removeItem("cartItems")

      // SUCCESS POPUP
      alert(`Order placed successfully!\n\nOrder ID: ${orderId}`)

      // REDIRECT
      window.location.href = "/order-success"
    } catch (error) {
      console.log(error)
      alert("Failed to place order")
    }
  }

  return (
    <section className="min-h-screen bg-[#fafaf7] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-[#edf1e8] rounded-[28px] p-10">
          <div className="grid lg:grid-cols-[1.2fr_0.7fr] gap-10">
            
            {/* LEFT: FORM */}
            <div>
              <h1 className="text-[32px] font-bold text-[#183818] mb-10">
                Delivery Information
              </h1>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                />

                <textarea
                  placeholder="Address"
                  rows="4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                />

                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY */}
            <div>
              <div className="border border-[#edf1e8] rounded-[24px] p-8 sticky top-10">
                <h2 className="text-[28px] font-bold text-[#183818] mb-8">
                  Order Summary
                </h2>

                <div className="space-y-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="bg-[#f8f8f5] rounded-xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[75px] h-[75px] object-contain p-2"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-[#183818]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#667166] mt-1">
                          Qty : {product.quantity}
                        </p>
                      </div>

                      <div className="font-semibold text-[#183818]">
                        ₹{product.price * product.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#edf1e8] mt-8 pt-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#667166]">Subtotal</span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>

                  {/* PLACE ORDER BUTTON */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-[#2d5a2d] hover:bg-[#1e3d1e] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition duration-200"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Place Order via WhatsApp
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
