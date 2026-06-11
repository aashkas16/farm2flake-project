import API_BASE_URL from "../../services/api"
import { Save } from "lucide-react"

import { useState } from "react"

import axios from "axios"

//import ReactQuill from "react-quill"

//import "react-quill/dist/quill.snow.css"

export default function AddBlog() {

  const [title, setTitle] = useState("")

  const [category, setCategory] = useState("")

  const [shortDescription, setShortDescription] = useState("")

  const [content, setContent] = useState("")

  const [metaTitle, setMetaTitle] = useState("")

  const [metaDescription, setMetaDescription] = useState("")

  const [image, setImage] = useState("")

  const [loading, setLoading] = useState(false)


  // SAVE BLOG
  const saveBlog = async (status) => {
    const finalCategory = category === "Other" ? customCategory : category;

    if (
      status === "published" &&
      (
        !title ||
        !finalCategory ||
        !shortDescription ||
        !content ||
        !image
      )
    ) {

      alert("Please fill all required fields.")

      return

    }

    try {

      setLoading(true)

      await axios.post(

        `${API_BASE_URL}/api/blogs`,

        {
          title,
          category: finalCategory,
          short_description: shortDescription,
          content,
          image,
          status,
          meta_title: metaTitle,
          meta_description: metaDescription
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
      setCustomCategory("")
      setShortDescription("")
      setContent("")
      setImage("")
      setMetaTitle("")
      setMetaDescription("")

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

          Create and publish a professional blog article.

        </p>

      </div>

    </div>

    {/* FORM */}
    <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-5 sm:p-8">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6">

          {/* BLOG TITLE */}
          <div>

            <label className="text-[15px] font-semibold text-[#111827]">

              Blog Title *

            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter blog title"
              className="
                mt-3
                w-full
                h-[52px]
                rounded-xl
                border border-[#dbe3ea]
                px-4
                outline-none
                focus:border-[#ff7a00]
              "
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="text-[15px] font-semibold text-[#111827]">

              Category

            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                mt-3
                w-full
                h-[52px]
                rounded-xl
                border border-[#dbe3ea]
                px-4
                outline-none
                focus:border-[#ff7a00]
              "
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

              <option value="Other">

                Other

              </option>

            </select>

            {category === "Other" && (
              <div className="mt-4">
                <label className="text-[15px] font-semibold text-[#111827]">
                  Custom Category Name *
                </label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name"
                  className="
                    mt-3
                    w-full
                    h-[52px]
                    rounded-xl
                    border border-[#dbe3ea]
                    px-4
                    outline-none
                    focus:border-[#ff7a00]
                  "
                />
              </div>
            )}

          </div>

          {/* SHORT EXCERPT */}
          <div>

            <label className="text-[15px] font-semibold text-[#111827]">

              Short Excerpt

            </label>

            <textarea
              rows="4"
              value={shortDescription}
              onChange={(e) =>
                setShortDescription(
                  e.target.value
                )
              }
              placeholder="Brief summary of your blog"
              className="
                mt-3
                w-full
                rounded-xl
                border border-[#dbe3ea]
                px-4
                py-4
                outline-none
                resize-none
                focus:border-[#ff7a00]
              "
            />

          </div>

          {/* SEO SETTINGS */}
          <div className="border border-[#edf1e8] rounded-2xl p-5">

            <h3 className="font-bold text-[#111827] text-lg">

              SEO Settings

            </h3>

            <p className="text-sm text-[#6b7280] mt-1">

              Improve search engine visibility.

            </p>

            {/* META TITLE */}
            <div className="mt-5">

              <label className="font-semibold text-[#111827]">

                Meta Title

              </label>

              <input
                type="text"
                value={metaTitle}
                onChange={(e) =>
                  setMetaTitle(
                    e.target.value
                  )
                }
                placeholder="SEO Title"
                className="
                  mt-3
                  w-full
                  h-[52px]
                  rounded-xl
                  border border-[#dbe3ea]
                  px-4
                  outline-none
                  focus:border-[#ff7a00]
                "
              />

              <p className="text-xs text-[#6b7280] mt-2">

                {metaTitle.length}/60 characters

              </p>

            </div>

            {/* META DESCRIPTION */}
            <div className="mt-5">

              <label className="font-semibold text-[#111827]">

                Meta Description

              </label>

              <textarea
                rows="4"
                value={metaDescription}
                onChange={(e) =>
                  setMetaDescription(
                    e.target.value
                  )
                }
                placeholder="SEO Description"
                className="
                  mt-3
                  w-full
                  rounded-xl
                  border border-[#dbe3ea]
                  px-4
                  py-4
                  outline-none
                  resize-none
                  focus:border-[#ff7a00]
                "
              />

              <p className="text-xs text-[#6b7280] mt-2">

                {metaDescription.length}/160 characters

              </p>

            </div>

          </div>
                    {/* BLOG CONTENT */}
          <div>

            <label className="text-[15px] font-semibold text-[#111827]">

              Blog Content

            </label>

            <div className="mt-3">

              <textarea
  rows="14"
  value={content}
  onChange={(e) =>
    setContent(e.target.value)
  }
  placeholder="Write your blog content here..."
  className="
    mt-3
    w-full
    rounded-xl
    border border-[#dbe3ea]
    px-4
    py-4
    outline-none
    resize-none
    focus:border-[#ff7a00]
  "
/>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* FEATURED IMAGE */}
          <div className="border border-[#edf1e8] rounded-2xl p-5">

            <h3 className="font-bold text-[#111827]">

              Featured Image

            </h3>

            <p className="text-sm text-[#6b7280] mt-1">

              Paste the image URL for your blog article.

            </p>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full h-[52px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] transition"
              />

              <p className="text-[#6b7280] text-xs leading-relaxed">
                Provide a hosted image link (e.g. from Imgur, PostImages, or other cloud storage). Directly uploading files is disabled to ensure images persist across system deployments on Vercel and Render.
              </p>

              {
                image && (

                  <img
                    src={image}
                    alt="preview"
                    className="
                      mt-6
                      w-full
                      h-[240px]
                      object-cover
                      rounded-2xl
                      border border-[#edf1e8]
                    "
                  />

                )
              }

            </div>

          </div>

          {/* SEO PREVIEW */}
          <div className="border border-[#edf1e8] rounded-2xl p-5">

            <h3 className="font-bold text-[#111827]">

              SEO Preview

            </h3>

            <div className="mt-4">

              <p className="text-blue-700 text-lg font-medium">

                {
                  metaTitle ||
                  "Your Meta Title"
                }

              </p>

              <p className="text-green-700 text-sm mt-1">

                www.farm2flake.com/blog
              </p>

              <p className="text-[#6b7280] text-sm mt-2">

                {
                  metaDescription ||
                  "Your meta description will appear here."
                }

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mt-10 border-t border-[#edf1e8] pt-8">

        <button
          onClick={() =>
            saveBlog("draft")
          }
          disabled={loading}
          className="
            w-full
            sm:w-auto
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
            saveBlog("published")
          }
          disabled={loading}
          className="
            w-full
            sm:w-auto
            h-[50px]
            px-8
            rounded-xl
            bg-[#ff7a00]
            hover:bg-[#e96f00]
            transition
            text-white
            font-semibold
            flex items-center
            justify-center
            gap-3
          "
        >

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