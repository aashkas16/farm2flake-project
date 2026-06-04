import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { WishlistProvider } from "./components/context/WishlistContext"
import { CartProvider } from "./components/context/CartContext"
import { TrialProvider } from "./components/context/TrialContext"

// Native smooth scrolling is enabled via CSS in index.css (html { scroll-behavior: smooth; })
// Disabled JS smooth scrolling interceptor (Lenis) to eliminate input lag and rendering stutters.

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