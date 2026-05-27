import { useEffect, useState } from "react"

import axios from "axios"

import {

  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell

} from "recharts"

import DashboardCard from "../components/DashboardCard"

export default function Dashboard() {

  const [products, setProducts] = useState([])

  const [blogs, setBlogs] = useState([])

  const [reviews, setReviews] = useState([])

  const [orders, setOrders] = useState([])



  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {

    try {

      const [

        productsRes,

        blogsRes,

        reviewsRes,

        ordersRes

      ] = await Promise.all([

        axios.get(
          "https://farm2flake-backend.onrender.com/api/products"
        ),

        axios.get(
          "https://farm2flake-backend.onrender.com/api/blogs"
        ),

        axios.get(
          "https://farm2flake-backend.onrender.com/api/admin-reviews"
        ),

        axios.get(
          "https://farm2flake-backend.onrender.com/api/orders"
        )

      ])



      setProducts(productsRes.data)

      setBlogs(blogsRes.data)

      setReviews(reviewsRes.data)

      setOrders(ordersRes.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {
    fetchDashboardData()

  }, [])



  // TOTAL REVENUE
  const totalRevenue = orders.reduce(

    (total, order) =>

      total + Number(order.total_amount),

    0

  )



  // PENDING ORDERS
  const pendingOrders = orders.filter(

    (item) => item.status === "pending"

  ).length

  const revenueData = [

  {

    name: "Orders",

    revenue: totalRevenue

  }

]



const orderStatusData = [

  {

    name: "Pending",

    value: orders.filter(

      (o) => o.status === "pending"

    ).length

  },

  {

    name: "Confirmed",

    value: orders.filter(

      (o) => o.status === "confirmed"

    ).length

  },

  {

    name: "Delivered",

    value: orders.filter(

      (o) => o.status === "delivered"

    ).length

  }

]



  return (

    <div>

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#183818]">

            Dashboard Overview

          </h1>

          <p className="text-[#7d877d] mt-2">

            Monitor products, blogs, reviews and customer activities.

          </p>

        </div>

      </div>



      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-10">

        <DashboardCard
          title="Total Products"
          value={products.length}
          growth="+ Active Products"
        />



        <DashboardCard
          title="Total Blogs"
          value={blogs.length}
          growth="+ Published Blogs"
        />



        <DashboardCard
          title="Customer Reviews"
          value={reviews.length}
          growth="+ User Reviews"
        />



        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          growth={`₹${totalRevenue}`}
        />

      </div>



      {/* RECENT SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

        {/* RECENT PRODUCTS */}
        <div className="bg-white rounded-[28px] p-8 border border-[#edf1e8]">

          <h2 className="text-2xl font-bold text-[#183818]">

            Recent Products

          </h2>



          <div className="mt-6 flex flex-col gap-5">

            {products
              .slice(0, 5)
              .map((product) => (

                <div
                  key={product.id}
                  className="flex items-center justify-between border-b border-[#edf1e8] pb-4"
                >

                  <div>

                    <h3 className="font-semibold text-[#183818]">

                      {product.name}

                    </h3>



                    <p className="text-sm text-[#7d877d] mt-1">

                      {product.category}

                    </p>

                  </div>



                  <span className="text-[#2d5a2d] font-semibold">

                    ₹{product.price}

                  </span>

                </div>

              ))}

          </div>

        </div>



        {/* LATEST REVIEWS */}
        <div className="bg-white rounded-[28px] p-8 border border-[#edf1e8]">

          <h2 className="text-2xl font-bold text-[#183818]">

            Latest Reviews

          </h2>



          <div className="mt-6 flex flex-col gap-5">

            {reviews
              .slice(0, 5)
              .map((review) => (

                <div
                  key={review.id}
                  className="border-b border-[#edf1e8] pb-4"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-[#183818]">

                      {review.name}

                    </h3>



                    <span className="text-[#f4c430]">

                      {
                        "★".repeat(review.rating)
                      }

                    </span>

                  </div>



                  <p className="text-sm text-[#7d877d] mt-2 leading-relaxed">

                    {review.review}

                  </p>

                </div>

              ))}

          </div>

        </div>

      </div>



      {/* RECENT ORDERS */}
      <div className="mt-10 bg-white rounded-[28px] p-8 border border-[#edf1e8]">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-[#183818]">

            Recent Orders

          </h2>



          <div className="text-[#2d5a2d] font-semibold">

            Total Revenue:
            ₹{totalRevenue}

          </div>

        </div>



        <div className="mt-8 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[#edf1e8]">

                <th className="text-left py-4 text-sm font-bold text-[#111827]">

                  Order ID

                </th>

                <th className="text-left py-4 text-sm font-bold text-[#111827]">

                  Customer

                </th>

                <th className="text-left py-4 text-sm font-bold text-[#111827]">

                  Amount

                </th>

                <th className="text-left py-4 text-sm font-bold text-[#111827]">

                  Status

                </th>

              </tr>

            </thead>



            <tbody>

              {orders
                .slice(0, 5)
                .map((order) => (

                  <tr
                    key={order.id}
                    className="border-b border-[#edf1e8]"
                  >

                    <td className="py-5 font-semibold text-[#183818]">

                      {order.order_id}

                    </td>



                    <td className="py-5 text-[#374151]">

                      {order.customer_name}

                    </td>



                    <td className="py-5 font-semibold">

                      ₹{order.total_amount}

                    </td>



                    <td className="py-5">

                      <span
                        className={`px-4 py-2 rounded-full text-xs font-semibold

                        ${
                          order.status === "pending"
                            ? "bg-[#fff4e8] text-[#ff7a00]"
                            : order.status === "confirmed"
                            ? "bg-[#e8f3ff] text-[#2563eb]"
                            : "bg-[#e8f7e8] text-[#1e7a1e]"
                        }`}
                      >

                        {order.status}

                      </span>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* CHARTS */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

  {/* REVENUE CHART */}
  <div className="bg-white rounded-[28px] p-8 border border-[#edf1e8]">

    <h2 className="text-2xl font-bold text-[#183818] mb-8">

      Revenue Analytics

    </h2>



    <div className="h-[320px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={revenueData}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
            fill="#2d5a2d"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>



  {/* ORDER STATUS */}
  <div className="bg-white rounded-[28px] p-8 border border-[#edf1e8]">

    <h2 className="text-2xl font-bold text-[#183818] mb-8">

      Order Status

    </h2>



    <div className="h-[320px]">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={orderStatusData}
            dataKey="value"
            outerRadius={110}
            label
          >

            <Cell fill="#ff7a00" />

            <Cell fill="#2563eb" />

            <Cell fill="#1e7a1e" />

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

    </div>

  )

}