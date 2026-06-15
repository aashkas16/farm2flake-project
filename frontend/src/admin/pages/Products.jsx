import API_BASE_URL from "../../services/api"
import { useEffect, useState } from "react"
import axios from "axios"

import {
  Trash2,
  Plus,
  Pencil
} from "lucide-react"

import { Link } from "react-router-dom"

export default function Products() {

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // EDIT STATE
  const [editingProduct, setEditingProduct] = useState(null)
  const [editName, setEditName] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editCustomCategory, setEditCustomCategory] = useState("")
  const [editPrice100g, setEditPrice100g] = useState("")
  const [editMrp100g, setEditMrp100g] = useState("")
  const [editPrice250g, setEditPrice250g] = useState("")
  const [editMrp250g, setEditMrp250g] = useState("")
  const [editPrice500g, setEditPrice500g] = useState("")
  const [editMrp500g, setEditMrp500g] = useState("")
  const [editNutritionFacts, setEditNutritionFacts] = useState("")
  const [editIngredients, setEditIngredients] = useState("")
  const [editHowToUse, setEditHowToUse] = useState("")
  const [editStock, setEditStock] = useState("")
  const [editShortDescription, setEditShortDescription] = useState("")
  const [editFullDescription, setEditFullDescription] = useState("")
  const [editBenefits, setEditBenefits] = useState("")
  const [editImages, setEditImages] = useState(["", "", "", "", ""])
  const [editIsBestSeller, setEditIsBestSeller] = useState(false)
  const [editStatus, setEditStatus] = useState("published")

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setEditName(product.name || "")
    const mainCategories = ["Fruit Powders", "Vegetable Powders", "Herbs Powders", "Smoothie Mixes", "Cooking Ingredients"]
    if (product.category && mainCategories.includes(product.category)) {
      setEditCategory(product.category)
      setEditCustomCategory("")
    } else {
      setEditCategory("Other")
      setEditCustomCategory(product.category || "")
    }
    setEditPrice100g(product.price_100g || "")
    setEditMrp100g(product.mrp_100g || "")
    setEditPrice250g(product.price_250g || "")
    setEditMrp250g(product.mrp_250g || "")
    setEditPrice500g(product.price_500g || "")
    setEditMrp500g(product.mrp_500g || "")
    setEditNutritionFacts(product.nutrition_facts || "")
    setEditIngredients(product.ingredients || "")
    setEditHowToUse(product.how_to_use || "")
    setEditStock(product.stock || "")
    setEditShortDescription(product.short_description || "")
    setEditFullDescription(product.full_description || "")
    setEditBenefits(product.benefits || "")
    
    const imgArray = (product.image || "").split(",")
    const filledImgs = ["", "", "", "", ""]
    for (let i = 0; i < 5; i++) {
      if (imgArray[i]) filledImgs[i] = imgArray[i]
    }
    setEditImages(filledImgs)
    setEditIsBestSeller(product.is_best_seller === 1 || product.is_best_seller === true)
    setEditStatus(product.status || "published")
  }

  const handleSaveProductChanges = async (e) => {
    e.preventDefault()
    const finalCategory = editCategory === "Other" ? editCustomCategory : editCategory
    try {
      await axios.put(`${API_BASE_URL}/api/products/${editingProduct.id}`, {
        name: editName,
        category: finalCategory,
        price: editPrice250g || editPrice100g || editPrice500g || "",
        size: "250g",
        stock: editStock,
        short_description: editShortDescription,
        full_description: editFullDescription,
        benefits: editBenefits,
        image: editImages.filter(url => url.trim() !== "").join(","),
        is_best_seller: editIsBestSeller ? 1 : 0,
        status: editStatus,
        price_100g: editPrice100g || null,
        mrp_100g: editMrp100g || null,
        price_250g: editPrice250g || null,
        mrp_250g: editMrp250g || null,
        price_500g: editPrice500g || null,
        mrp_500g: editMrp500g || null,
        nutrition_facts: editNutritionFacts || null,
        ingredients: editIngredients || null,
        how_to_use: editHowToUse || null
      })
      alert("Product updated successfully!")
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.log(error)
      alert("Failed to update product")
    }
  }

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(

          `${API_BASE_URL}/api/products`

        )

      setProducts(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

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

        `${API_BASE_URL}/api/products/${id}`

      )

      fetchProducts()

    } catch (error) {

      console.log(error)

      alert("Failed to delete product")

    }

  }

  return (

    <div>

      {/* TOP SECTION */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">

            Products

          </h1>

          <p className="text-[#6b7280] mt-2">

            Manage all website products.

          </p>

        </div>

        <Link
          to="/admin/add-product"
          className="
            h-[52px]

            px-6

            rounded-xl

            bg-[#ff7a00]

            hover:bg-[#e96f00]

            transition

            text-white

            font-semibold

            flex items-center justify-center gap-3

            w-full sm:w-auto
          "
        >

          <Plus size={18} />

          Add Product

        </Link>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8 text-center text-[#6b7280]">

          Loading products...

        </div>

      )}

      {/* EMPTY STATE */}

      {!loading && products.length === 0 && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-12 text-center">

          <h3 className="text-xl font-semibold text-[#111827]">

            No Products Found

          </h3>

          <p className="text-[#6b7280] mt-2">

            Add your first product to get started.

          </p>

        </div>

      )}

      {/* MOBILE CARDS */}

      {!loading && products.length > 0 && (

        <div className="md:hidden mt-6 space-y-4">

          {products.map((product) => (

            <div

              key={product.id}

              className="
                bg-white

                rounded-3xl

                border border-[#edf1e8]

                p-4

                shadow-sm
              "
            >

              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full

                  h-[220px]

                  object-cover

                  rounded-2xl

                  border border-[#edf1e8]
                "
              />

              <div className="mt-4">

                <h3 className="text-lg font-bold text-[#111827]">

                  {product.name}

                </h3>

                <p className="text-sm text-[#6b7280] mt-2 leading-relaxed">

                  {product.short_description}

                </p>

                <div className="grid grid-cols-2 gap-4 mt-5">

                  <div>

                    <span className="text-xs text-[#6b7280] uppercase">

                      Category

                    </span>

                    <p className="font-semibold text-[#111827] mt-1">

                      {product.category}

                    </p>

                  </div>

                  <div>

                    <span className="text-xs text-[#6b7280] uppercase">

                      Price

                    </span>

                    <p className="font-semibold text-[#111827] mt-1">

                      ₹{product.price}

                    </p>

                  </div>

                  <div>

                    <span className="text-xs text-[#6b7280] uppercase">

                      Size

                    </span>

                    <p className="font-semibold text-[#111827] mt-1">

                      {product.size}

                    </p>

                  </div>

                  <div>

                    <span className="text-xs text-[#6b7280] uppercase">

                      Stock

                    </span>

                    <p className="font-semibold text-[#111827] mt-1">

                      {product.stock}

                    </p>

                  </div>

                </div>

                <div className="mt-5">

                  <span

                    className={`

                      px-4 py-2

                      rounded-full

                      text-xs

                      font-semibold

                      ${
                        product.status === "published"

                          ? "bg-[#e8f7e8] text-[#1e7a1e]"

                          : "bg-[#fff4e8] text-[#ff7a00]"
                      }

                    `}
                  >

                    {product.status}

                  </span>

                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="
                      flex-1
                      h-[48px]
                      rounded-xl
                      border border-[#2d5a2d]
                      text-[#2d5a2d]
                      flex items-center justify-center gap-2
                      hover:bg-[#f3f6f3]
                      transition
                      font-semibold
                      text-sm
                    "
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="
                      w-[48px]
                      h-[48px]
                      rounded-xl
                      border border-[#ffd6d6]
                      text-red-500
                      flex items-center justify-center
                      hover:bg-[#fff5f5]
                      transition
                    "
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

            {/* DESKTOP TABLE */}

      {!loading && products.length > 0 && (

        <div className="hidden md:block mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

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

                          className="
                            w-16 h-16

                            rounded-xl

                            object-cover

                            border border-[#edf1e8]
                          "

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

                        className={`

                          px-4 py-2

                          rounded-full

                          text-xs

                          font-semibold

                          ${
                            product.status === "published"

                              ? "bg-[#e8f7e8] text-[#1e7a1e]"

                              : "bg-[#fff4e8] text-[#ff7a00]"
                          }

                        `}
                      >

                        {product.status}

                      </span>

                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="
                            w-10 h-10
                            rounded-lg
                            border border-[#dbe3ea]
                            text-[#2d5a2d]
                            flex items-center justify-center
                            hover:bg-[#f3f6f3]
                            transition
                          "
                          title="Edit Product"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="
                            w-10 h-10
                            rounded-lg
                            border border-[#ffd6d6]
                            text-red-500
                            flex items-center justify-center
                            hover:bg-[#fff5f5]
                            transition
                          "
                          title="Delete Product"
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

      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-4xl overflow-hidden shadow-2xl border border-[#edf1e8] animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-[#f8faf8] border-b border-[#edf1e8] flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-[#183818]">Edit Product: {editingProduct.name}</h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-[#7d877d] hover:text-[#183818] transition font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProductChanges} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* LEFT COLUMN: Basic Info & Description */}
                <div className="space-y-4">
                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Product Name *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-sm text-[#111827]">Category *</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        required
                        className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-3 outline-none focus:border-[#ff7a00] text-sm"
                      >
                        <option value="">Select Category</option>
                        <option>Fruit Powders</option>
                        <option>Vegetable Powders</option>
                        <option>Herbs Powders</option>
                        <option>Smoothie Mixes</option>
                        <option>Cooking Ingredients</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-sm text-[#111827]">Stock *</label>
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        required
                        className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                      />
                    </div>
                  </div>

                  {editCategory === "Other" && (
                    <div>
                      <label className="font-semibold text-sm text-[#111827]">Custom Category Name *</label>
                      <input
                        type="text"
                        value={editCustomCategory}
                        onChange={(e) => setEditCustomCategory(e.target.value)}
                        required
                        placeholder="e.g. Spices, Snacks"
                        className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-sm text-[#111827]">Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-3 outline-none focus:border-[#ff7a00] text-sm"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-6 pl-2">
                      <input
                        type="checkbox"
                        id="editIsBestSeller"
                        checked={editIsBestSeller}
                        onChange={(e) => setEditIsBestSeller(e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="editIsBestSeller" className="ml-2 font-semibold text-sm text-[#111827] cursor-pointer">
                        Best Seller
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Short Description *</label>
                    <textarea
                      value={editShortDescription}
                      onChange={(e) => setEditShortDescription(e.target.value)}
                      required
                      rows={2}
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Full Description</label>
                    <textarea
                      value={editFullDescription}
                      onChange={(e) => setEditFullDescription(e.target.value)}
                      rows={3}
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Benefits</label>
                    <textarea
                      value={editBenefits}
                      onChange={(e) => setEditBenefits(e.target.value)}
                      rows={2}
                      placeholder="e.g. Rich in Fiber, 100% Organic (separated by comma)"
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-none"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Sizing Prices, Tabs, and Images */}
                <div className="space-y-4">
                  {/* Custom Sizing Prices */}
                  <div className="border border-[#edf1e8] bg-[#fdfdfd] p-4 rounded-2xl space-y-3">
                    <span className="font-bold text-xs text-[#2d5a2d] uppercase tracking-wider block border-b pb-1">Sizing & Pricing</span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 block text-center">100g Price</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={editPrice100g}
                          onChange={(e) => setEditPrice100g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                        <input
                          type="number"
                          placeholder="MRP"
                          value={editMrp100g}
                          onChange={(e) => setEditMrp100g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-gray-500 block text-center">250g Price</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={editPrice250g}
                          onChange={(e) => setEditPrice250g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                        <input
                          type="number"
                          placeholder="MRP"
                          value={editMrp250g}
                          onChange={(e) => setEditMrp250g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-gray-500 block text-center">500g Price</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={editPrice500g}
                          onChange={(e) => setEditPrice500g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                        <input
                          type="number"
                          placeholder="MRP"
                          value={editMrp500g}
                          onChange={(e) => setEditMrp500g(e.target.value)}
                          className="mt-1 w-full h-[36px] rounded-lg border border-[#dbe3ea] px-2 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="font-semibold text-[11px] text-gray-500">Nutrition Facts</label>
                      <textarea
                        value={editNutritionFacts}
                        onChange={(e) => setEditNutritionFacts(e.target.value)}
                        rows={3}
                        placeholder="Nutrition details"
                        className="mt-1 w-full rounded-lg border border-[#dbe3ea] p-2 outline-none text-xs resize-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[11px] text-gray-500">Ingredients</label>
                      <textarea
                        value={editIngredients}
                        onChange={(e) => setEditIngredients(e.target.value)}
                        rows={3}
                        placeholder="Ingredients details"
                        className="mt-1 w-full rounded-lg border border-[#dbe3ea] p-2 outline-none text-xs resize-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[11px] text-gray-500">How to Use</label>
                      <textarea
                        value={editHowToUse}
                        onChange={(e) => setEditHowToUse(e.target.value)}
                        rows={3}
                        placeholder="Usage details"
                        className="mt-1 w-full rounded-lg border border-[#dbe3ea] p-2 outline-none text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Images (5 URLs) */}
                  <div className="border border-[#edf1e8] bg-[#fdfdfd] p-4 rounded-2xl space-y-2">
                    <span className="font-bold text-xs text-[#2d5a2d] uppercase tracking-wider block border-b pb-1">Product Images (URLs)</span>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {editImages.map((imgUrl, index) => (
                        <input
                          key={index}
                          type="text"
                          value={imgUrl}
                          onChange={(e) => {
                            const newImgs = [...editImages]
                            newImgs[index] = e.target.value
                            setEditImages(newImgs)
                          }}
                          placeholder={`Image URL ${index + 1}`}
                          className="w-full h-[32px] rounded-lg border border-[#dbe3ea] px-3 outline-none text-xs"
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Buttons inside Scroll Form */}
              <div className="border-t border-[#edf1e8] pt-4 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] px-5 py-2.5 rounded-xl font-medium transition text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}