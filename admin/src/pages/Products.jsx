import { useEffect, useState } from "react"

import axios from "axios"

import {
  Pencil,
  Trash2,
  Plus
} from "lucide-react"

import { Link } from "react-router-dom"

export default function Products() {

  const [products, setProducts] = useState([])



  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      )



      setProducts(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()

  }, [])



  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this product?"

      )



    if (!confirmDelete) return



    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      )



      fetchProducts()

    } catch (error) {

      console.log(error)

      alert("Failed to delete product")

    }

  }



  return (

    <div>

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#111827]">

            Products

          </h1>

          <p className="text-[#6b7280] mt-2">

            Manage all website products.

          </p>

        </div>



        <Link
          to="/add-product"
          className="h-[52px] px-7 rounded-xl bg-[#ff7a00] hover:bg-[#e96f00] transition text-white font-semibold flex items-center gap-3"
        >

          <Plus size={18} />

          Add Product

        </Link>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

              <tr>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Product

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Category

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Price

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Size

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Stock

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Status

                </th>

                <th className="text-left px-6 py-5 text-sm font-bold text-[#111827]">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b border-[#edf1e8]"
                >

                  {/* PRODUCT */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#edf1e8]"
                      />



                      <div>

                        <h3 className="font-semibold text-[#111827]">

                          {product.name}

                        </h3>



                        <p className="text-sm text-[#6b7280] mt-1">

                          {product.short_description?.slice(0, 40)}...

                        </p>

                      </div>

                    </div>

                  </td>



                  {/* CATEGORY */}
                  <td className="px-6 py-5 text-[#374151]">

                    {product.category}

                  </td>



                  {/* PRICE */}
                  <td className="px-6 py-5 font-semibold text-[#111827]">

                    ₹{product.price}

                  </td>



                  {/* SIZE */}
                  <td className="px-6 py-5 text-[#374151]">

                    {product.size}

                  </td>



                  {/* STOCK */}
                  <td className="px-6 py-5 text-[#374151]">

                    {product.stock}

                  </td>



                  {/* STATUS */}
                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold

                      ${
                        product.status === "published"
                          ? "bg-[#e8f7e8] text-[#1e7a1e]"
                          : "bg-[#fff4e8] text-[#ff7a00]"
                      }`}
                    >

                      {product.status}

                    </span>

                  </td>



                  {/* ACTIONS */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <button
                        className="w-10 h-10 rounded-lg border border-[#dbe3ea] flex items-center justify-center hover:bg-[#f8faf8]"
                      >

                        <Pencil size={18} />

                      </button>



                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="w-10 h-10 rounded-lg border border-[#ffd6d6] text-red-500 flex items-center justify-center hover:bg-[#fff5f5]"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

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