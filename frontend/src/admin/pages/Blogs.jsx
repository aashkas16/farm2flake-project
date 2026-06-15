import API_BASE_URL from "../../services/api"
import {
  Search,
  Trash2,
  Plus,
  Pencil
} from "lucide-react"

import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function Blogs() {

  const [blogs, setBlogs] = useState([])

  const [search, setSearch] = useState("")

  const [loading, setLoading] =
    useState(true)

  // EDIT STATE
  const [editingBlog, setEditingBlog] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editShortDescription, setEditShortDescription] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editImage, setEditImage] = useState("")
  const [editStatus, setEditStatus] = useState("published")
  const [editMetaTitle, setEditMetaTitle] = useState("")
  const [editMetaDescription, setEditMetaDescription] = useState("")
  const [productCategories, setProductCategories] = useState([])

  // Load product categories for the blog category selector
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        const categories = response.data
          .map((p) => p.category)
          .filter((cat) => cat && typeof cat === "string" && cat.trim() !== "")
          .map((cat) => cat.trim());
        const uniqueCategories = Array.from(new Set(categories)).sort();
        setProductCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };
    if (editingBlog) {
      fetchProductCategories();
    }
  }, [editingBlog]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog)
    setEditTitle(blog.title || "")
    setEditCategory(blog.category || "")
    setEditShortDescription(blog.short_description || "")
    setEditContent(blog.content || "")
    setEditImage(blog.image || "")
    setEditStatus(blog.status || "published")
    setEditMetaTitle(blog.meta_title || "")
    setEditMetaDescription(blog.meta_description || "")
  }

  const handleSaveBlogChanges = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_BASE_URL}/api/blogs/${editingBlog.id}`, {
        title: editTitle,
        category: editCategory,
        short_description: editShortDescription,
        content: editContent,
        image: editImage,
        status: editStatus,
        meta_title: editMetaTitle || null,
        meta_description: editMetaDescription || null
      })
      alert("Blog updated successfully!")
      setEditingBlog(null)
      fetchBlogs()
    } catch (error) {
      console.log(error)
      alert("Failed to update blog")
    }
  }

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        `${API_BASE_URL}/api/blogs`
      )

      setBlogs(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    fetchBlogs()

  }, [])

  // DELETE BLOG
  const deleteBlog = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this blog?"
      )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `${API_BASE_URL}/api/blogs/${id}`
      )

      fetchBlogs()

    } catch (error) {

      console.log(error)

      alert("Failed to delete blog")

    }

  }

  // FILTER BLOGS
  const filteredBlogs = blogs.filter((blog) =>

    (blog.title || "")
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

  )

  return (

    <div>

      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#111827]">

            Blogs Management

          </h1>

          <p className="text-[#6b7280] mt-2">

            Manage all website blogs and articles.

          </p>

        </div>

        <Link
          to="/admin/add-blog"
          className="
            w-full sm:w-auto
            h-[48px]
            px-6
            rounded-xl
            bg-[#ff7a00]
            hover:bg-[#e96f00]
            transition
            text-white
            font-semibold
            flex items-center justify-center gap-3
          "
        >

          <Plus size={18} />

          Add New Blog

        </Link>

      </div>

      {/* SEARCH */}
      <div className="mt-8 bg-white rounded-[24px] border border-[#edf1e8] p-5">

        <div className="w-full sm:w-[320px] h-[46px] bg-[#f5f7fb] rounded-xl px-4 flex items-center gap-3">

          <Search
            size={18}
            color="#6b7280"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search blogs..."
            className="bg-transparent outline-none flex-1 text-sm"
          />

        </div>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8 text-center text-[#6b7280]">

          Loading blogs...

        </div>

      )}

      {/* EMPTY */}
      {!loading &&
        filteredBlogs.length === 0 && (

          <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-10 text-center">

            <h3 className="text-xl font-semibold text-[#111827]">

              No Blogs Found

            </h3>

            <p className="text-[#6b7280] mt-2">

              Create your first blog.

            </p>

          </div>

        )}

      {/* MOBILE CARDS */}
      {!loading &&
        filteredBlogs.length > 0 && (

          <div className="md:hidden mt-6 space-y-4">

            {filteredBlogs.map(
              (blog) => (

                <div
                  key={blog.id}
                  className="
                    bg-white
                    rounded-3xl
                    border border-[#edf1e8]
                    p-5
                    shadow-sm
                  "
                >

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="
                      w-full
                      h-[180px]
                      object-cover
                      rounded-2xl
                    "
                  />

                  <h2 className="mt-4 font-bold text-[#111827] text-lg">

                    {blog.title}

                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <span className="px-3 py-1 rounded-full bg-[#f5f7fb] text-sm">

                      {blog.category}

                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold

                      ${
                        blog.status === "published"
                          ? "bg-[#dcfce7] text-[#166534]"
                          : "bg-[#fef3c7] text-[#92400e]"
                      }`}
                    >

                      {blog.status}

                    </span>

                  </div>

                  <p className="text-sm text-[#6b7280] mt-4">

                    {
                      new Date(
                        blog.created_at
                      ).toLocaleDateString()
                    }

                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleEditClick(blog)}
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
                      onClick={() => deleteBlog(blog.id)}
                      className="
                        w-[48px]
                        h-[48px]
                        rounded-xl
                        bg-[#fee2e2]
                        text-[#dc2626]
                        hover:bg-[#fecaca]
                        transition
                        flex items-center justify-center
                      "
                      title="Delete Blog"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>

              )
            )}

          </div>

      )}

            {/* DESKTOP GRID */}
      {!loading &&
        filteredBlogs.length > 0 && (

          <div className="hidden md:block mt-6 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-12 bg-[#f8fafc] px-6 py-4 border-b border-[#edf1e8] text-[13px] font-semibold text-[#6b7280] uppercase tracking-wide">

              <div className="col-span-5">

                Blog

              </div>

              <div className="col-span-2">

                Category

              </div>

              <div className="col-span-2">

                Status

              </div>

              <div className="col-span-2">

                Date

              </div>

              <div className="col-span-1 text-center">

                Action

              </div>

            </div>

            {/* ROWS */}
            {filteredBlogs.map((blog) => (

              <div
                key={blog.id}
                className="
                  grid
                  grid-cols-12
                  items-center
                  px-6
                  py-5
                  border-b
                  border-[#edf1e8]
                  hover:bg-[#fafafa]
                  transition
                "
              >

                {/* BLOG */}
                <div className="col-span-5 flex items-center gap-4">

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="
                      w-[70px]
                      h-[55px]
                      rounded-xl
                      object-cover
                    "
                  />

                  <div>

                    <h2 className="font-semibold text-[#111827] text-[15px]">

                      {blog.title}

                    </h2>

                  </div>

                </div>

                {/* CATEGORY */}
                <div className="col-span-2 text-[14px] text-[#374151]">

                  {blog.category}

                </div>

                {/* STATUS */}
                <div className="col-span-2">

                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold

                    ${
                      blog.status === "published"
                        ? "bg-[#dcfce7] text-[#166534]"
                        : "bg-[#fef3c7] text-[#92400e]"
                    }`}
                  >

                    {blog.status}

                  </span>

                </div>

                {/* DATE */}
                <div className="col-span-2 text-[14px] text-[#6b7280]">

                  {
                    new Date(
                      blog.created_at
                    ).toLocaleDateString()
                  }

                </div>

                <div className="col-span-1 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="
                      w-9 h-9
                      rounded-xl
                      border border-[#dbe3ea]
                      text-[#2d5a2d]
                      flex items-center justify-center
                      hover:bg-[#f3f6f3]
                      transition
                    "
                    title="Edit Blog"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-[#fee2e2]
                      text-[#dc2626]
                      flex
                      items-center
                      justify-center
                    "
                    title="Delete Blog"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

              </div>

            ))}

          </div>

      )}

      {/* EDIT BLOG MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-4xl overflow-hidden shadow-2xl border border-[#edf1e8] animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-[#f8faf8] border-b border-[#edf1e8] flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-[#183818]">Edit Blog: {editingBlog.title}</h2>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-[#7d877d] hover:text-[#183818] transition font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveBlogChanges} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* LEFT COLUMN: Title, Category, Status, Image */}
                <div className="space-y-4">
                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Blog Title *</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
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
                        {productCategories.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>

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
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Image URL *</label>
                    <input
                      type="text"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      required
                      className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Meta Title</label>
                    <input
                      type="text"
                      value={editMetaTitle}
                      onChange={(e) => setEditMetaTitle(e.target.value)}
                      placeholder="SEO Title"
                      className="mt-1.5 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Meta Description</label>
                    <textarea
                      value={editMetaDescription}
                      onChange={(e) => setEditMetaDescription(e.target.value)}
                      rows={3}
                      placeholder="SEO Description"
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-none"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Short Description and Main Content */}
                <div className="space-y-4">
                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Short Description *</label>
                    <textarea
                      value={editShortDescription}
                      onChange={(e) => setEditShortDescription(e.target.value)}
                      required
                      rows={3}
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-sm text-[#111827]">Blog Content *</label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      required
                      rows={9}
                      className="mt-1.5 w-full rounded-xl border border-[#dbe3ea] p-3 outline-none focus:border-[#ff7a00] text-sm resize-y"
                    />
                  </div>
                </div>

              </div>

              {/* Footer Buttons inside Scroll Form */}
              <div className="border-t border-[#edf1e8] pt-4 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
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