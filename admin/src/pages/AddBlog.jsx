import {
  Save
} from "lucide-react"

import { useState } from "react"

import axios from "axios"

export default function AddBlog() {

  const [title, setTitle] = useState("")

  const [category, setCategory] = useState("")

  const [shortDescription, setShortDescription] = useState("")

  const [content, setContent] = useState("")

  const [image, setImage] = useState("")

  const [loading, setLoading] = useState(false)

  const [uploading, setUploading] = useState(false)

  // UPLOAD IMAGE
const uploadImage = async (e) => {

  try {

    const file = e.target.files[0]

    if (!file) return

    setUploading(true)

    const formData = new FormData()

    formData.append("image", file)



    const response = await axios.post(

      "https://farm2flake-backend.onrender.com/api/upload-blog-image",

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


  // SAVE BLOG
  const saveBlog = async (status) => {

    try {

      setLoading(true)

      await axios.post(

        "https://farm2flake-backend.onrender.com/api/blogs",

        {
          title,
          category,
          short_description: shortDescription,
          content,
          image,
          status
        }

      )

      alert(

        status === "published"
          ? "Blog Published Successfully!"
          : "Draft Saved Successfully!"
      )



      // RESET FORM
      setTitle("")
      setCategory("")
      setShortDescription("")
      setContent("")
      setImage("")

    } catch (error) {

      console.log(error)

      alert("Something went wrong")

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

            Add New Blog

          </h1>

          <p className="text-[#6b7280] mt-2">

            Create and publish a new blog for the website.

          </p>

        </div>

      </div>


      {/* FORM */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-5 sm:p-8">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* TITLE */}
            <div>

              <label className="text-[15px] font-semibold text-[#111827]">

                Blog Title

              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="mt-3 w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00]"
              />

            </div>


            {/* CATEGORY */}
            <div>

              <label className="text-[15px] font-semibold text-[#111827]">

                Category

              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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


            {/* SHORT DESC */}
            <div>

              <label className="text-[15px] font-semibold text-[#111827]">

                Short Description

              </label>

              <textarea
                rows="4"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Enter short description"
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />

            </div>


            {/* CONTENT */}
            <div>

              <label className="text-[15px] font-semibold text-[#111827]">

                Full Blog Content

              </label>

              <textarea
                rows="8"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write full blog content..."
                className="mt-3 w-full rounded-xl border border-[#dbe3ea] px-4 py-4 outline-none resize-none focus:border-[#ff7a00]"
              />

            </div>

          </div>


          {/* RIGHT */}
          <div className="space-y-6">

            {/* IMAGE */}
<div>

  <label className="text-[15px] font-semibold text-[#111827]">

    Thumbnail Image

  </label>


  <div className="mt-3 border-2 border-dashed border-[#dbe3ea] rounded-2xl p-6 text-center">

    <input
      type="file"
      accept="image/*"
      onChange={uploadImage}
      className="hidden"
      id="blogImage"
    />


    <label
      htmlFor="blogImage"
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
          className="mt-6 w-full h-[220px] sm:h-[260px] object-cover rounded-2xl border border-[#edf1e8]"
        />

      )
    }

  </div>

</div>

          </div>

        </div>


        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mt-10 border-t border-[#edf1e8] pt-8">

          <button
            onClick={() => saveBlog("draft")}
            disabled={loading}
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
            onClick={() => saveBlog("published")}
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
" >

            <Save size={18} />

            {
              loading
                ? "Publishing..."
                : "Publish Blog"
            }

          </button>

        </div>

      </div>

    </div>

  )

}