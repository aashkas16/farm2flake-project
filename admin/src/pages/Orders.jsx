import { useEffect, useState } from "react"

import axios from "axios"

import * as XLSX from "xlsx"

import jsPDF from "jspdf"

import autoTable from "jspdf-autotable"

export default function Orders() {

  const [orders, setOrders] = useState([])



  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/orders"
      )



      setOrders(response.data)

    } catch (error) {

      console.log(error)

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

        `http://localhost:5000/api/orders/${id}`,

        {

          status

        }

      )



      fetchOrders()

    } catch (error) {

      console.log(error)

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
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#111827]">

            Orders

          </h1>

          <p className="text-[#6b7280] mt-2">

            Manage customer orders & deliveries.

          </p>

        </div>



        {/* EXPORT BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={exportExcel}
            className="bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-6 py-3 rounded-xl font-semibold"
          >

            Export Excel

          </button>



          <button
            onClick={exportPDF}
            className="bg-[#ff7a00] hover:bg-[#e56d00] transition text-white px-6 py-3 rounded-xl font-semibold"
          >

            Export PDF

          </button>

        </div>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

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

              </tr>

            </thead>



            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-[#edf1e8]"
                >

                  <td className="px-6 py-5 font-semibold text-[#183818]">

                    {order.order_id}

                  </td>



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



                  <td className="px-6 py-5 text-[#374151]">

                    {order.city}

                  </td>



                  <td className="px-6 py-5 font-semibold text-[#111827]">

                    ₹{order.total_amount}

                  </td>



                  <td className="px-6 py-5">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="border border-[#dbe3ea] rounded-lg px-3 py-2 outline-none"
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



                  <td className="px-6 py-5 text-[#6b7280]">

                    {
                      new Date(order.created_at)
                      .toLocaleDateString()
                    }

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}