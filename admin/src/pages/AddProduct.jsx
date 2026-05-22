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

  const [price, setPrice] = useState("")

  const [size, setSize] = useState("")

  const [stock, setStock] = useState("")

  const [shortDescription, setShortDescription] =
    useState("")

  const [fullDescription, setFullDescription] =
    useState("")

  const [benefits, setBenefits] =
    useState("")

  const [image, setImage] =
    useState("")

  const [isBestSeller, setIsBestSeller] =
    useState(false)

  const [uploading, setUploading] =
    useState(false)

  const [loading, setLoading] =
    useState(false)



  // UPLOAD IMAGE
  const uploadImage = async (e) => {

    try {

      const file = e.target.files[0]

      if (!file) return

      setUploading(true)

      const formData = new FormData()

      formData.append("image", file)



      const response = await axios.post(

        "http://localhost:5000/api/upload-blog-image",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }

      )



      setImage(response.data.imageUrl)

    } catch (error) {

      console.log(error)

      alert("Image upload failed")

    } finally {

      setUploading(false)

    }

  }



  // SAVE PRODUCT
  const saveProduct = async (status) => {

    try {

      setLoading(true)



      await axios.post(
        "http://localhost:5000/api/products",

        {

          name,
          category,
          price,
          size,
          stock,
          short_description: shortDescription,
          full_description: fullDescription,
          benefits,
          image,
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
      setPrice("")
      setSize("")
      setStock("")
      setShortDescription("")
      setFullDescription("")
      setBenefits("")
      setImage("")
      setIsBestSeller(false)

    } catch (error) {

      console.log(error)

      alert("Failed to save product")

    } finally {

      setLoading(false)

    }
    // VALIDATIONS
if (

  !name ||
  !category ||
  !price ||
  !size ||
  !stock ||
  !shortDescription ||
  !benefits ||
  !image

) {

  alert(

    "Please fill all required fields before publishing product."

  )

  return

}

  }



  return (

    <div>

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#111827]">

            Add Product

          </h1>

          <p className="text-[#6b7280] mt-2">

            Add new products for website.

          </p>

        </div>

      </div>



      {/* FORM */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

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
                  Cooking Ingredients
                </option>

              </select>

            </div>



            {/* PRICE + SIZE */}
            <div className="grid grid-cols-2 gap-5">

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

              Product Image

            </label>



            <div className="mt-3 border-2 border-dashed border-[#dbe3ea] rounded-2xl p-6 text-center">

              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="hidden"
                id="productImage"
              />



              <label
                htmlFor="productImage"
                className="cursor-pointer inline-block px-6 py-3 rounded-xl bg-[#ff7a00] hover:bg-[#e96f00] transition text-white font-semibold"
              >

                {
                  uploading
                    ? "Uploading..."
                    : "Choose Image"
                }

              </label>



              <p className="text-[#6b7280] text-sm mt-3">

                PNG, JPG or JPEG allowed

              </p>



              {
                image && (

                  <img
                    src={image}
                    alt="preview"
                    className="mt-6 w-full h-[350px] object-cover rounded-2xl border border-[#edf1e8]"
                  />

                )
              }

            </div>

          </div>

        </div>



        {/* BUTTONS */}
        <div className="flex items-center justify-end gap-4 mt-10 border-t border-[#edf1e8] pt-8">

          <button
            onClick={() =>
              saveProduct("draft")
            }
            className="h-[50px] px-7 rounded-xl border border-[#dbe3ea] font-semibold text-[#111827]"
          >

            Save Draft

          </button>



          <button
            onClick={() =>
              saveProduct("published")
            }
            disabled={loading}
            className="h-[50px] px-8 rounded-xl bg-[#ff7a00] hover:bg-[#e96f00] transition text-white font-semibold flex items-center gap-3"
          >

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