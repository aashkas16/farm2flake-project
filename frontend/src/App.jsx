import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

// Storefront components & layouts
import ClientLayout from "./components/layout/ClientLayout"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import FAQ from "./pages/FAQ"
import Blog from "./pages/Blog"
import Trial from "./pages/trial"
import BlogDetails from "./pages/BlogDetails"
import Contact from "./pages/Contact"
import Wishlist from "./pages/Wishlist"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import TrialSelection from "./pages/TrialSelection"
import TrialReview from "./pages/TrialReview"
import ShareExperience from "./pages/ShareExperience"
import Preloader from "./components/ui/Preloader"

// Admin module components, layouts & pages
import AdminProtectedRoute from "./admin/components/ProtectedRoute"
import AdminLayout from "./admin/layout/AdminLayout"
import AdminLogin from "./admin/pages/Login"
import AdminDashboard from "./admin/pages/Dashboard"
import AdminProducts from "./admin/pages/Products"
import AdminAddProduct from "./admin/pages/AddProduct"
import AdminBlogs from "./admin/pages/Blogs"
import AdminAddBlog from "./admin/pages/AddBlog"
import AdminReviews from "./admin/pages/Reviews"
import AdminOrders from "./admin/pages/Orders"
import AdminContacts from "./admin/pages/ContactMessages"
import AdminManagement from "./admin/pages/AdminManagement"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader loading={loading} />
      <BrowserRouter>
        <Routes>
          {/* STOREFRONT CUSTOMER PAGES (With customer header/footer) */}
          <Route element={<ClientLayout />}>
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
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* ADMIN LOGIN PAGE (Without customer header/footer) */}
          <Route
            path="/admin"
            element={
              sessionStorage.getItem("admin") ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin />
              )
            }
          />

          {/* ADMIN SECURE DASHBOARD MODULE (Without customer header/footer) */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="add-blog" element={<AdminAddBlog />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="admin-management" element={<AdminManagement />} />
            {/* Redirect any unmatched admin sub-route to dashboard */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App