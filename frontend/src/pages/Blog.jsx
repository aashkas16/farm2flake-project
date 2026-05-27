import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function Blog() {

  const [blogs, setBlogs] =
    useState([])



  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const response =
        await axios.get(

          "https://farm2flake-backend.onrender.com/api/blogs"

        )



      // ONLY PUBLISHED BLOGS
      const publishedBlogs =
        response.data.filter(

          (blog) =>
            blog.status === "published"

        )



      setBlogs(publishedBlogs)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchBlogs()

  }, [])



  return (

    <section className="min-h-[70vh] bg-white py-12 md:py-20 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#6b7280] mb-8 flex-wrap">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >

            Home

          </Link>



          <span>

            ›

          </span>



          <span className="text-[#2d5a2d] font-semibold">

            Blogs

          </span>

        </div>



        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b1d] mb-5 leading-tight">

          Blog

        </h1>



        <p className="text-gray-600 text-[15px] sm:text-lg leading-7 sm:leading-relaxed mb-10 md:mb-12 max-w-3xl">

          Read the latest nutrition tips, recipes, and Farm2Flake stories from our healthy living blog.

        </p>



        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {blogs.map((blog) => (

            <article
              key={blog.id}
              className="bg-white border border-gray-200 rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={`https://farm2flake-backend.onrender.com/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-[220px] sm:h-[240px] object-cover hover:scale-105 transition duration-500"
                />

              </div>



              {/* CONTENT */}
              <div className="p-5 sm:p-6">

                {/* TOP */}
                <div className="flex flex-wrap items-center gap-3 mb-4">

                  <span className="bg-[#edf7df] text-[#2d5a2d] px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap">

                    {blog.category}

                  </span>



                  <span className="text-gray-500 text-xs sm:text-sm">

                    {

                      new Date(blog.created_at)

                        .toLocaleDateString()

                    }

                  </span>

                </div>



                {/* TITLE */}
                <h2 className="text-[20px] sm:text-xl font-semibold text-[#1c2b1d] mb-3 leading-snug line-clamp-2 min-h-[58px]">

                  {blog.title}

                </h2>



                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm sm:text-[15px] leading-7 mb-5 line-clamp-3">

                  {blog.short_description}

                </p>



                {/* BUTTON */}
                <Link
                  to={`/blog/${blog.id}`}
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="inline-flex items-center gap-2 text-[#275227] font-semibold hover:text-[#1d3a1d] transition text-sm sm:text-base"
                >

                  Read More →

                </Link>

              </div>

            </article>

          ))}

        </div>



        {/* EMPTY STATE */}
        {blogs.length === 0 && (

          <div className="text-center py-16 text-gray-500 text-lg">

            No blogs available yet.

          </div>

        )}

      </div>

    </section>

  )

}