import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function Blog() {

  const [blogs, setBlogs] = useState([])

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://images.unsplash.com/photo-1610970881699-44a5587caaec?q=80&w=800&auto=format&fit=crop";
  }



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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <article
              key={blog.id}
              className="bg-white border border-[#1D3B1D]/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col h-full"
            >

              {/* IMAGE */}
              <div className="aspect-[16/10] overflow-hidden w-full bg-gray-100 relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover hover:scale-[1.03] transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">

                {/* TOP METADATA */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="bg-[#eef7ec] text-[#2F7C1F] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    {blog.category}
                  </span>

                  <span className="text-gray-400 text-xs font-medium">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-black text-[#1D3B1D] mb-3 leading-snug hover:text-[#2F7C1F] transition min-h-[56px] line-clamp-2">
                  <Link to={`/blog/${blog.id}`} onClick={() => window.scrollTo(0, 0)}>
                    {blog.title}
                  </Link>
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.short_description}
                </p>

                {/* BUTTON */}
                <div className="mt-auto">
                  <Link
                    to={`/blog/${blog.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1.5 text-[#1D3B1D] hover:text-[#2F7C1F] font-bold transition text-sm group"
                  >
                    Read Article 
                    <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
                  </Link>
                </div>

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