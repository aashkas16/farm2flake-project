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

  const [price, setPrice] = useState("")

  const [size, setSize] = useState("")

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
      !price ||
      !size ||
      !stock ||
      !shortDescription ||
      !benefits ||
      !images[0]
    )
  ) {

    alert(
      "Please fill all required fields before publishing product (including the main Product Image 1)."
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
          price,
          size,
          stock,
          short_description: shortDescription,
          full_description: fullDescription,
          benefits,
          image: images.filter(url => url.trim() !== "").join(","),
          is_best_seller: isBestSeller,
          status

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
      setPrice("")
      setSize("")
      setStock("")
      setShortDescription("")
      setFullDescription("")
      setBenefits("")
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



            {/* PRICE + SIZE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold text-[#111827]">

                  Price

                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="399"
                  className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
                />

              </div>



              <div>

                <label className="font-semibold text-[#111827]">

                  Size

                </label>

                <input
                  type="text"
                  value={size}
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                  placeholder="100g"
                  className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
                />

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

              <input
                type="text"
                value={benefits}
                onChange={(e) =>
                  setBenefits(e.target.value)
                }
                placeholder="Immunity,Energy,Detox"
                className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
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