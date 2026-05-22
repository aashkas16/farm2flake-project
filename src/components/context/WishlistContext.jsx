import {
  createContext,
  useContext,
  useState
} from "react"

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {

  const [wishlistItems, setWishlistItems] = useState([])


  // TOGGLE WISHLIST
  const toggleWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    )

    if (exists) {

      setWishlistItems(

        wishlistItems.filter(
          (item) => item.id !== product.id
        )

      )

    } else {

      setWishlistItems([
        ...wishlistItems,
        product
      ])

    }

  }


  // CLEAR WISHLIST
  const clearWishlist = () => {

    setWishlistItems([])

  }


  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        clearWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  )

}


// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {

  return useContext(WishlistContext)

}