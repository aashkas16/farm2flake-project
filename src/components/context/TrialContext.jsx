import {
  createContext,
  useContext,
  useState
} from "react"

const TrialContext = createContext()

export const TrialProvider = ({ children }) => {

  const [trialItems, setTrialItems] = useState([])


  const toggleTrialItem = (product) => {

    const exists = trialItems.find(
      (item) => item.id === product.id
    )

    if (exists) {

      setTrialItems(
        trialItems.filter(
          (item) => item.id !== product.id
        )
      )

    } else {

      if (trialItems.length >= 3) {
        return
      }

      setTrialItems([
        ...trialItems,
        {
          ...product,
          trialWeight: "50g",
          price: 0
        }
      ])

    }

  }


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