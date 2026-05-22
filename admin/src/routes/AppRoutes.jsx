import {

  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom"

import AdminLayout from "../layout/AdminLayout"

import ProtectedRoute from "../components/ProtectedRoute"

import Dashboard from "../pages/Dashboard"

import Products from "../pages/Products"

import AddProduct from "../pages/AddProduct"

import Blogs from "../pages/Blogs"

import AddBlog from "../pages/AddBlog"

import Reviews from "../pages/Reviews"

import Orders from "../pages/Orders"

import ContactMessages from "../pages/ContactMessages"

import Login from "../pages/Login"

import AdminManagement from "../pages/AdminManagement"

export default function AppRoutes() {

  const admin =
    sessionStorage.getItem("admin")



  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={

            admin

              ? <Navigate to="/" />

              : <Login />

          }
        />



        {/* PROTECTED */}
        <Route
          path="/"
          element={

            <ProtectedRoute>

              <AdminLayout />

            </ProtectedRoute>

          }
        >

          <Route
            index
            element={<Dashboard />}
          />



          <Route
            path="products"
            element={<Products />}
          />



          <Route
            path="add-product"
            element={<AddProduct />}
          />



          <Route
            path="blogs"
            element={<Blogs />}
          />



          <Route
            path="add-blog"
            element={<AddBlog />}
          />



          <Route
            path="reviews"
            element={<Reviews />}
          />



          <Route
            path="orders"
            element={<Orders />}
          />



          <Route
            path="contacts"
            element={<ContactMessages />}
          />



          <Route
            path="admin-management"
            element={<AdminManagement />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}