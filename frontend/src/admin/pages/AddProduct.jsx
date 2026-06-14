import API_BASE_URL from "../../services/api"
import { useState } from "react"

import axios from "axios"

import {
  // eslint-disable-next-line no-unused-vars
  Upload,
  Save
} from "lucide-react"

export default function AddProduct() {

  const [name, setName] = useState("")

  const [category, setCategory] = useState("")

  const [customCategory, setCustomCategory] = useState("")

  const [price100g, setPrice100g] = useState("")
  const [mrp100g, setMrp100g] = useState("")
  const [price250g, setPrice250g] = useState("")
  const [mrp250g, setMrp250g] = useState("")
  const [price500g, setPrice500g] = useState("")
  const [mrp500g, setMrp500g] = useState("")

  const [nutritionFacts, setNutritionFacts] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [howToUse, setHowToUse] = useState("")

  const [stock, setStock] = useState("")

  const [shortDescription, setShortDescription] =
    useState("")

  const [fullDescription, setFullDescription] =
    useState("")

  const [benefits, setBenefits] =
    useState("")

  const [images, setImages] =
    useState(["", "", "", "", ""])

  const [isBestSeller, setIsBestSeller] =
    useState(false)

  const [loading, setLoading] =
    useState(false)



  // SAVE PRODUCT
  const saveProduct = async (status) => {

  const finalCategory = category === "Other" ? customCategory : category;

  if (
    status === "published" &&
    (
      !name ||
      !finalCategory ||
      (!price100g && !price250g && !price500g) ||
      !stock ||
      !shortDescription ||
      !benefits ||
      !images[0]
    )
  ) {

    alert(
      "Please fill all required fields before publishing product (including at least one pricing packaging and the main Product Image 1)."
    )

    return
  }

  try {

      setLoading(true)



      await axios.post(
        `${API_BASE_URL}/api/products`,

        {

          name,
          category: finalCategory,
          price: price250g || price100g || price500g || "",
          size: "250g",
          stock,
          short_description: shortDescription,
          full_description: fullDescription,
          benefits,
          image: images.filter(url => url.trim() !== "").join(","),
          is_best_seller: isBestSeller,
          status,
          price_100g: price100g || null,
          mrp_100g: mrp100g || null,
          price_250g: price250g || null,
          mrp_250g: mrp250g || null,
          price_500g: price500g || null,
          mrp_500g: mrp500g || null,
          nutrition_facts: nutritionFacts || null,
          ingredients: ingredients || null,
          how_to_use: howToUse || null

        }

      )



      alert(

        status === "published"
          ? "Product Published"
          : "Draft Saved"

      )



      // RESET
      setName("")
      setCategory("")
      setCustomCategory("")
      setPrice100g("")
      setMrp100g("")
      setPrice250g("")
      setMrp250g("")
      setPrice500g("")
      setMrp500g("")
      setStock("")
      setShortDescription("")
      setFullDescription("")
      setBenefits("")
      setNutritionFacts("")
      setIngredients("")
      setHowToUse("")
      setImages(["", "", "", "", ""])
      setIsBestSeller(false)

    } catch (error) {

      console.log(error)

      alert("Failed to save product")

    } finally {

      setLoading(false)

    }
  }
  return (

    <div>

      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">

            Add Product

          </h1>

          <p className="text-[#6b7280] mt-2">

            Add new products for website.

          </p>

        </div>

      </div>



      {/* FORM */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-5 sm:p-8">

       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* NAME */}
            <div>

              <label className="font-semibold text-[#111827]">

                Product Name

              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter product name"
                className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
              />

            </div>



            {/* CATEGORY */}
            <div>

              <label className="font-semibold text-[#111827]">

                Category

              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
              >

                <option value="">
                  Select Category
                </option>

                <option>
                  Fruit Powders
                </option>

                <option>
                  Vegetable Powders
                </option>

                <option>
                  Herbs Powders
                </option>

                <option>
                  Smoothie Mixes
                </option>

                <option>
                  Cooking Ingredients
                </option>

                <option>
                  Other
                </option>

              </select>

            </div>

            {category === "Other" && (
              <div>
                <label className="font-semibold text-[#111827]">
                  Custom Category Name *
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. Spices, Protein Blends, Freeze Dried Snacks"
                  className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
                />
              </div>
            )}



            {/* MANUAL PRICING SYSTEM */}
            <div className="border border-[#edf1e8] rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-[#111827] text-lg">Manual Pricing & Offers (INR)</h3>
              <p className="text-xs text-[#6b7280]">Enter the selling price and MRP for each size. Leave blank if not offering that size.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 100g */}
                <div className="p-4 bg-[#fafaf9] rounded-xl border border-gray-100 space-y-3">
                  <span className="font-black text-[#2d5a2d] text-sm block border-b border-gray-200/60 pb-1">100g Packaging</span>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Sell Price</label>
                    <input
                      type="number"
                      value={price100g}
                      onChange={(e) => setPrice100g(e.target.value)}
                      placeholder="e.g. 100"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Original MRP</label>
                    <input
                      type="number"
                      value={mrp100g}
                      onChange={(e) => setMrp100g(e.target.value)}
                      placeholder="e.g. 120"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                </div>

                {/* 250g */}
                <div className="p-4 bg-[#fafaf9] rounded-xl border border-gray-100 space-y-3">
                  <span className="font-black text-[#2d5a2d] text-sm block border-b border-gray-200/60 pb-1">250g Packaging</span>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Sell Price</label>
                    <input
                      type="number"
                      value={price250g}
                      onChange={(e) => setPrice250g(e.target.value)}
                      placeholder="e.g. 230"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Original MRP</label>
                    <input
                      type="number"
                      value={mrp250g}
                      onChange={(e) => setMrp250g(e.target.value)}
                      placeholder="e.g. 270"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                </div>

                {/* 500g */}
                <div className="p-4 bg-[#fafaf9] rounded-xl border border-gray-100 space-y-3">
                  <span className="font-black text-[#2d5a2d] text-sm block border-b border-gray-200/60 pb-1">500g Packaging</span>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Sell Price</label>
                    <input
                      type="number"
                      value={price500g}
                      onChange={(e) => setPrice500g(e.target.value)}
                      placeholder="e.g. 425"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Original MRP</label>
                    <input
                      type="number"
                      value={mrp500g}
                      onChange={(e) => setMrp500g(e.target.value)}
                      placeholder="e.g. 500"
                      className="mt-1 w-full h-[40px] rounded-lg border border-[#dbe3ea] px-3 text-sm outline-none focus:border-[#ff7a00]"
                    />
                  </div>
                </div>
              </div>
            </div>



            {/* STOCK */}
            <div>

              <label className="font-semibold text-[#111827]">

                Stock

              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                placeholder="50"
                className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
              />

            </div>



            {/* SHORT DESC */}
            <div>

              <label className="font-semibold text-[#111827]">

                Short Description

              </label>

              <textarea
                rows="4"
                value={shortDescription}
                onChange={(e) =>
                  setShortDescription(e.target.value)
                }
                placeholder="Enter short description"
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />

            </div>

            {/* FULL DESC */}
            <div>

              <label className="font-semibold text-[#111827]">

                Full Description

              </label>

              <textarea
                rows="8"
                value={fullDescription}
                onChange={(e) =>
                  setFullDescription(e.target.value)
                }
                placeholder="Write product details..."
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />

            </div>

            {/* BENEFITS */}
            <div>

              <label className="font-semibold text-[#111827]">

                Benefits

              </label>

              <textarea
                rows="4"
                value={benefits}
                onChange={(e) =>
                  setBenefits(e.target.value)
                }
                placeholder="List key product benefits..."
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />

            </div>

            {/* NUTRITION FACTS */}
            <div>
              <label className="font-semibold text-[#111827]">
                Nutrition Facts (Manual Entry)
              </label>
              <textarea
                rows="5"
                value={nutritionFacts}
                onChange={(e) => setNutritionFacts(e.target.value)}
                placeholder="Energy (Kcal): 348&#10;Carbohydrates (g): 78.4&#10;Dietary Fiber (g): 9.2&#10;Natural Sugar (g): 42.0&#10;Proteins (g): 4.8&#10;Fat (g): 0.6"
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />
            </div>

            {/* INGREDIENTS */}
            <div>
              <label className="font-semibold text-[#111827]">
                Ingredients
              </label>
              <textarea
                rows="3"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. 100% Dehydrated Pure Spinach"
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />
            </div>

            {/* HOW TO USE */}
            <div>
              <label className="font-semibold text-[#111827]">
                How to Use Instructions
              </label>
              <textarea
                rows="4"
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
                placeholder="e.g. Take 1-2 teaspoons daily. Mix into shakes, smoothies or batters."
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />
            </div>

            {/* BEST SELLER */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) =>
                  setIsBestSeller(e.target.checked)
                }
              />

              <label className="font-semibold text-[#111827]">

                Mark as Best Seller

              </label>

            </div>

          </div>



          {/* RIGHT */}
          <div>

            <label className="font-semibold text-[#111827]">
              Product Images (up to 5)
            </label>

            <div className="mt-3 border border-[#edf1e8] rounded-2xl p-5 bg-white shadow-sm">
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index}>
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider block mb-2">
                      Image URL {index + 1} {index === 0 && "*"}
                    </label>
                    <input
                      type="text"
                      value={images[index]}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = e.target.value;
                        setImages(newImages);
                      }}
                      placeholder={`https://example.com/image${index + 1}.jpg`}
                      className="w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] transition text-sm"
                    />
                  </div>
                ))}

                <p className="text-[#6b7280] text-xs leading-relaxed mt-2">
                  Provide hosted image links (e.g. from Imgur, PostImages, or other cloud storage). Directly uploading files is disabled to ensure images persist across system deployments on Vercel and Render.
                </p>

                {images.some(img => img.trim() !== "") && (
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider block mb-2">
                      Previews
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {images.map((img, idx) => img.trim() !== "" && (
                        <div key={idx} className="relative group border border-[#edf1e8] rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`preview ${idx + 1}`}
                            className="w-full h-16 object-cover"
                          />
                          <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center py-0.5 font-bold">
                            {idx === 0 ? "Main" : `#${idx + 1}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>



        {/* BUTTONS */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mt-10 border-t border-[#edf1e8] pt-8">

          <button
            onClick={() =>
              saveProduct("draft")
            }
            className="
w-full sm:w-auto
h-[50px]
px-7
rounded-xl
border border-[#dbe3ea]
font-semibold
text-[#111827]
"
          >

            Save Draft

          </button>



          <button
            onClick={() =>
              saveProduct("published")
            }
            disabled={loading}
            className="
w-full sm:w-auto
h-[50px]
px-8
rounded-xl
bg-[#ff7a00]
hover:bg-[#e96f00]
transition
text-white
font-semibold
flex items-center justify-center gap-3
"   >

            <Save size={18} />

            {
              loading
                ? "Saving..."
                : "Publish Product"
            }

          </button>

        </div>

      </div>

    </div>

  )

}