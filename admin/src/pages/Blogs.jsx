import {
  Search,
  Trash2,
  Plus
} from "lucide-react"

import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function Blogs() {

  const [blogs, setBlogs] = useState([])

  const [search, setSearch] = useState("")

  const [loading, setLoading] =
    useState(true)

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        "https://farm2flake-backend.onrender.com/api/blogs"
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
        `https://farm2flake-backend.onrender.com/api/blogs/${id}`
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
          to="/add-blog"
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

                  <button
                    onClick={() =>
                      deleteBlog(
                        blog.id
                      )
                    }
                    className="
                      mt-5
                      w-full
                      h-[48px]
                      rounded-xl
                      bg-[#fee2e2]
                      text-[#dc2626]
                      font-medium
                      hover:bg-[#fecaca]
                      transition
                      flex items-center justify-center gap-2
                    "
                  >

                    <Trash2 size={18} />

                    Delete Blog

                  </button>

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

                {/* DELETE */}
                <div className="col-span-1 flex justify-center">

                  <button
                    onClick={() =>
                      deleteBlog(
                        blog.id
                      )
                    }
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
                  >

                    <Trash2 size={17} />

                  </button>

                </div>

              </div>

            ))}

          </div>

      )}

    </div>

  )

}