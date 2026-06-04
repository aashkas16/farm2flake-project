import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react"
import { getProductPriceAndSize } from "../../utils/price"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  // LOAD FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // TOAST NOTIFICATION STATE
  const [toast, setToast] = useState(null)
  const [toastTimer, setToastTimer] = useState(null)

  const showToast = (message) => {
    if (toastTimer) clearTimeout(toastTimer)
    setToast(message)
    const timer = setTimeout(() => {
      setToast(null)
    }, 3500)
    setToastTimer(timer)
  }

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // ADD TO CART WITH SIZE & PRICE AUTO-SCALING
  const addToCart = (product, quantity = 1, size = "250g", price = null) => {
    const itemPrice = price || getProductPriceAndSize(product, size)
    
    const exists = cartItems.find(
      (item) => item.id === product.id && (item.selectedSize === size || (!item.selectedSize && size === "250g"))
    )

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && (item.selectedSize === size || (!item.selectedSize && size === "250g"))
            ? {
                ...item,
                price: itemPrice, // Keep updated price
                quantity: item.quantity + quantity
              }
            : item
        )
      )
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          selectedSize: size,
          price: itemPrice,
          quantity: quantity
        }
      ])
    }
    showToast(`Added ${quantity} x ${product.name} (${size}) to Cart! 🌿`)
  }

  // INCREASE QUANTITY
  const increaseQuantity = (id, size = "250g") => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && (item.selectedSize === size || (!item.selectedSize && size === "250g"))
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  // DECREASE QUANTITY
  const decreaseQuantity = (id, size = "250g") => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && (item.selectedSize === size || (!item.selectedSize && size === "250g"))
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1
            }
          : item
      )
    )
  }

  // REMOVE PRODUCT
  const removeFromCart = (id, size = "250g") => {
    setCartItems(
      cartItems.filter(
        (item) => !(item.id === id && (item.selectedSize === size || (!item.selectedSize && size === "250g")))
      )
    )
  }

  // CLEAR CART
  const clearCart = () => {
    setCartItems([])
  }

  // TOGGLE CART
  const toggleCart = (product, size = "250g", price = null) => {
    const itemPrice = price || getProductPriceAndSize(product, size)
    const exists = cartItems.find(
      (item) => item.id === product.id && (item.selectedSize === size || (!item.selectedSize && size === "250g"))
    )

    if (exists) {
      setCartItems(
        cartItems.filter(
          (item) => !(item.id === product.id && (item.selectedSize === size || (!item.selectedSize && size === "250g")))
        )
      )
      showToast(`Removed ${product.name} from Cart`)
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          selectedSize: size,
          price: itemPrice,
          quantity: 1
        }
      ])
      showToast(`Added ${product.name} (${size}) to Cart! 🌿`)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        toggleCart,
        clearCart,
        showToast
      }}
    >
      {children}

      {/* PREMIUM FLOATING TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[99999] max-w-sm w-full px-4 animate-fade-in pointer-events-none">
          <div className="bg-[#1D3B1D] text-[#FAF7F2] p-4 rounded-2xl shadow-xl flex items-center justify-between border border-[#2F7C1F]/20 backdrop-blur-md pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌿</span>
              <p className="text-sm font-bold tracking-wide">{toast}</p>
            </div>
            <button 
              className="text-[#FAF7F2]/60 hover:text-white font-bold text-xs shrink-0 ml-4 p-1" 
              onClick={() => setToast(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}