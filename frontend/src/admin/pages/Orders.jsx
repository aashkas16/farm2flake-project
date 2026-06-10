import { useEffect, useState } from "react"

import axios from "axios"

import * as XLSX from "xlsx"

import jsPDF from "jspdf"

import autoTable from "jspdf-autotable"

export default function Orders() {

  const [orders, setOrders] = useState([])

  const [loading, setLoading] =
    useState(true)

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        "https://farm2flake-backend.onrender.com/api/orders"
      )

      setOrders(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchOrders()

  }, [])

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(

        `https://farm2flake-backend.onrender.com/api/orders/${id}`,

        {
          status
        }

      )

      fetchOrders()

    } catch (error) {

      console.log(error)

    }

  }

  // DELETE ORDER
  const deleteOrder = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `https://farm2flake-backend.onrender.com/api/orders/${id}`
      )

      fetchOrders()

    } catch (error) {

      console.log(error)

      alert("Failed to delete order")

    }

  }

  // EXPORT EXCEL
  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(

        orders.map((order) => ({

          OrderID: order.order_id,

          Customer: order.customer_name,

          Phone: order.phone,

          City: order.city,

          Amount: order.total_amount,

          Status: order.status,

          Date: new Date(
            order.created_at
          ).toLocaleDateString()

        }))

      )

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Orders"
    )

    XLSX.writeFile(
      workbook,
      "Farm2FlakeOrders.xlsx"
    )

  }

  // EXPORT PDF
  const exportPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(20)

    doc.text(
      "Farm2Flake Orders Report",
      14,
      20
    )

    autoTable(doc, {

      startY: 35,

      head: [[
        "Order ID",
        "Customer",
        "Phone",
        "City",
        "Amount",
        "Status"
      ]],

      body: orders.map((order) => ([

        order.order_id,

        order.customer_name,

        order.phone,

        order.city,

        `₹${order.total_amount}`,

        order.status

      ]))

    })

    doc.save(
      "Farm2FlakeOrders.pdf"
    )

  }

  return (

    <div>

      {/* TOP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">

            Orders

          </h1>

          <p className="text-[#6b7280] mt-2">

            Manage customer orders & deliveries.

          </p>

        </div>

        {/* EXPORT BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={exportExcel}
            className="
              w-full sm:w-auto
              bg-[#2d5a2d]
              hover:bg-[#1f431f]
              transition
              text-white
              px-6 py-3
              rounded-xl
              font-semibold
            "
          >

            Export Excel

          </button>

          <button
            onClick={exportPDF}
            className="
              w-full sm:w-auto
              bg-[#ff7a00]
              hover:bg-[#e56d00]
              transition
              text-white
              px-6 py-3
              rounded-xl
              font-semibold
            "
          >

            Export PDF

          </button>

        </div>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8 text-center text-[#6b7280]">

          Loading orders...

        </div>

      )}

      {/* EMPTY */}
      {!loading &&
        orders.length === 0 && (

          <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-10 text-center">

            <h3 className="text-xl font-semibold text-[#111827]">

              No Orders Found

            </h3>

            <p className="text-[#6b7280] mt-2">

              Customer orders will appear here.

            </p>

          </div>

      )}

      {/* MOBILE CARDS */}
      {!loading &&
        orders.length > 0 && (

          <div className="md:hidden mt-6 space-y-4">

            {orders.map((order) => (

              <div
                key={order.id}
                className="
                  bg-white
                  rounded-3xl
                  border border-[#edf1e8]
                  p-5
                  shadow-sm
                "
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h3 className="font-bold text-[#111827]">

                      {order.customer_name}

                    </h3>

                    <p className="text-sm text-[#6b7280] mt-1">

                      {order.phone}

                    </p>

                  </div>

                  <span className="text-sm font-semibold text-[#183818]">

                    #{order.order_id}

                  </span>

                </div>

                <div className="mt-4 space-y-2">

                  <p className="text-[#374151]">

                    <strong>City:</strong> {order.city}

                  </p>

                  <p className="text-[#374151]">

                    <strong>Amount:</strong> ₹{order.total_amount}

                  </p>

                  <p className="text-[#6b7280] text-sm">

                    {
                      new Date(
                        order.created_at
                      ).toLocaleDateString()
                    }

                  </p>

                </div>

                <div className="mt-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      border border-[#dbe3ea]
                      rounded-xl
                      px-4 py-3
                      outline-none
                    "
                  >

                    <option value="pending">

                      Pending

                    </option>

                    <option value="confirmed">

                      Confirmed

                    </option>

                    <option value="delivered">

                      Delivered

                    </option>

                  </select>

                </div>

                <button
                  onClick={() =>
                    deleteOrder(order.id)
                  }
                  className="
                    mt-4
                    w-full
                    h-[48px]
                    rounded-xl
                    bg-red-500
                    hover:bg-red-600
                    transition
                    text-white
                    font-medium
                  "
                >

                  Delete Order

                </button>

              </div>

            ))}

          </div>

      )}

            {/* DESKTOP TABLE */}
      {!loading &&
        orders.length > 0 && (

          <div className="hidden md:block mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

                  <tr>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Order ID

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Customer

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      City

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Amount

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Status

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Date

                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold text-[#111827]">

                      Actions

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-[#edf1e8]"
                    >

                      {/* ORDER ID */}
                      <td className="px-6 py-5 font-semibold text-[#183818]">

                        {order.order_id}

                      </td>

                      {/* CUSTOMER */}
                      <td className="px-6 py-5">

                        <div>

                          <h3 className="font-semibold text-[#111827]">

                            {order.customer_name}

                          </h3>

                          <p className="text-sm text-[#6b7280] mt-1">

                            {order.phone}

                          </p>

                        </div>

                      </td>

                      {/* CITY */}
                      <td className="px-6 py-5 text-[#374151]">

                        {order.city}

                      </td>

                      {/* AMOUNT */}
                      <td className="px-6 py-5 font-semibold text-[#111827]">

                        ₹{order.total_amount}

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          className="
                            border border-[#dbe3ea]
                            rounded-lg
                            px-3 py-2
                            outline-none
                          "
                        >

                          <option value="pending">

                            Pending

                          </option>

                          <option value="confirmed">

                            Confirmed

                          </option>

                          <option value="delivered">

                            Delivered

                          </option>

                        </select>

                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-[#6b7280]">

                        {
                          new Date(
                            order.created_at
                          ).toLocaleDateString()
                        }

                      </td>

                      {/* DELETE */}
                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            deleteOrder(order.id)
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            transition
                            text-white
                            px-4 py-2
                            rounded-lg
                            text-sm
                            font-medium
                          "
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

      )}

    </div>

  )

}