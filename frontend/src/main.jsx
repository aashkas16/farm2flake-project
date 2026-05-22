import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { WishlistProvider } from "./components/context/WishlistContext"
import { CartProvider } from "./components/context/CartContext"
import { TrialProvider } from "./components/context/TrialContext"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <TrialProvider>

  <CartProvider>

    <WishlistProvider>

      <App />

    </WishlistProvider>

  </CartProvider>

</TrialProvider>

  </React.StrictMode>

)