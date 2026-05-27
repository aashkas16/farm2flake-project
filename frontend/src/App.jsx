import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Trial from "./pages/trial";
import BlogDetails from "./pages/BlogDetails"
import Contact from "./pages/Contact"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess";

import TrialSelection from "./pages/TrialSelection"
import TrialReview from "./pages/TrialReview"
import ShareExperience from "./pages/ShareExperience"


import WhatsappBot from "./components/whatsapp/WhatsappBot"

import { useEffect, useState } from "react"
import Preloader from "./components/ui/Preloader"

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {

  const timer = setTimeout(() => {

    setLoading(false)

  }, 4500)

  return () => clearTimeout(timer)

  }, [])

 return (

  <>

    <Preloader loading={loading} />

    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/trial-selection" element={<TrialSelection />} />
        <Route path="/trial-review" element={<TrialReview />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/trial" element={<Trial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>

      <WhatsappBot />

      <Footer />

    </BrowserRouter>

  </>

)
}

export default App