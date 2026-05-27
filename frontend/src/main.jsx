import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import Lenis from "@studio-freight/lenis"

import { WishlistProvider } from "./components/context/WishlistContext"
import { CartProvider } from "./components/context/CartContext"
import { TrialProvider } from "./components/context/TrialContext"

const lenis = new Lenis({

  duration: 1.2,

  smoothWheel: true,

  smoothTouch: false,

  touchMultiplier: 2

})

function raf(time) {

  lenis.raf(time)

  requestAnimationFrame(raf)

}

requestAnimationFrame(raf)

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