import {

  createContext,
  useContext,
  useState,
  useEffect

} from "react"

const TrialContext = createContext()

export const TrialProvider = ({ children }) => {

  // LOAD FROM LOCAL STORAGE
  const [trialItems, setTrialItems] =
    useState(() => {

      const savedTrialItems =
        localStorage.getItem("trialItems")

      return savedTrialItems
        ? JSON.parse(savedTrialItems)
        : []

    })



  // SAVE TO LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(

      "trialItems",

      JSON.stringify(trialItems)

    )

  }, [trialItems])



  // TOGGLE TRIAL ITEM
  const toggleTrialItem = (product) => {

    const exists = trialItems.find(

      (item) =>
        item.id === product.id

    )



    if (exists) {

      setTrialItems(

        trialItems.filter(

          (item) =>
            item.id !== product.id

        )

      )

    } else {

      // LIMIT = 3
      if (trialItems.length >= 3) {

        return

      }



      setTrialItems([

        ...trialItems,

        {

          ...product,
          trialWeight: "50g",
          quantity: 1,
          price: 0

        }

      ])

    }

  }



  // CLEAR
  const clearTrialItems = () => {

    setTrialItems([])

  }



  return (

    <TrialContext.Provider
      value={{

        trialItems,
        toggleTrialItem,
        clearTrialItems

      }}
    >

      {children}

    </TrialContext.Provider>

  )

}



// eslint-disable-next-line react-refresh/only-export-components
export const useTrial = () => {

  return useContext(TrialContext)

}