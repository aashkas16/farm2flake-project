import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function Blog() {

  const [blogs, setBlogs] = useState([])



  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/blogs"
      )



      // ONLY PUBLISHED BLOGS
      const publishedBlogs = response.data.filter(

        (blog) => blog.status === "published"

      )



      setBlogs(publishedBlogs)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs()

  }, [])



  return (

    <section className="min-h-[70vh] bg-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[15px] text-[#6b7280] mb-8">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-[#2d5a2d] font-semibold">
            Blogs
          </span>

        </div>


        <h1 className="text-4xl font-bold text-[#1c2b1d] mb-6">

          Blog

        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-12">

          Read the latest nutrition tips, recipes, and Farm2Flake stories from our healthy living blog.

        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <article
              key={blog.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />


              <div className="p-6">

                <div className="flex items-center gap-2 mb-3">

                  <span className="bg-[#edf7df] text-[#2d5a2d] px-3 py-1 rounded-full text-xs font-semibold">

                    {blog.category}

                  </span>

                  <span className="text-gray-500 text-sm">

                    {
                      new Date(blog.created_at)
                      .toLocaleDateString()
                    }

                  </span>

                </div>


                <h2 className="text-xl font-semibold text-[#1c2b1d] mb-3 overflow-hidden text-ellipsis">

                  {blog.title}

                </h2>


                <p className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis">

                  {blog.short_description}

                </p>


                <Link
                  to={`/blog/${blog.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-[#275227] font-medium hover:text-[#1d3a1d] transition"
                >

                  Read More →

                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>

  )

}