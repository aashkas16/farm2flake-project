import {

  createContext,
  useContext,
  useState,
  useEffect

} from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

  // LOAD FROM LOCAL STORAGE
  const [cartItems, setCartItems] =
    useState(() => {

      const savedCart = localStorage.getItem("cartItems")

      return savedCart
        ? JSON.parse(savedCart)
        : []

    })



  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(

      "cartItems",

      JSON.stringify(cartItems)

    )

  }, [cartItems])



  // ADD TO CART
  const addToCart = (product) => {

    const exists = cartItems.find(

      (item) =>
        item.id === product.id

    )



    if (exists) {

      setCartItems(

        cartItems.map((item) =>

          item.id === product.id

            ? {

                ...item,
                quantity: item.quantity + 1

              }

            : item

        )

      )

    } else {

      setCartItems([

        ...cartItems,

        {

          ...product,
          quantity: 1

        }

      ])

    }

  }



  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {

              ...item,
              quantity: item.quantity + 1

            }

          : item

      )

    )

  }



  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:

                item.quantity > 1

                  ? item.quantity - 1

                  : 1

            }

          : item

      )

    )

  }



  // REMOVE PRODUCT
  const removeFromCart = (id) => {

    setCartItems(

      cartItems.filter(

        (item) =>
          item.id !== id

      )

    )

  }



  // CLEAR CART
  const clearCart = () => {

    setCartItems([])

  }



  // TOGGLE CART
  const toggleCart = (product) => {

    const exists = cartItems.find(

      (item) =>
        item.id === product.id

    )



    if (exists) {

      setCartItems(

        cartItems.filter(

          (item) =>
            item.id !== product.id

        )

      )

    } else {

      setCartItems([

        ...cartItems,

        {

          ...product,
          quantity: 1

        }

      ])

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
        clearCart

      }}
    >

      {children}

    </CartContext.Provider>

  )

}



// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {

  return useContext(CartContext)

}