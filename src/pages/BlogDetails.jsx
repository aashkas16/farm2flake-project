import { useParams, Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function BlogDetails() {

  const { id } = useParams()

  const [blog, setBlog] = useState(null)

  const [blogs, setBlogs] = useState([])



  // FETCH SINGLE BLOG
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBlog = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/blogs"
      )



      const publishedBlogs = response.data.filter(

        (item) => item.status === "published"

      )



      setBlogs(publishedBlogs)



      const selectedBlog = publishedBlogs.find(

        (item) => item.id === Number(id)

      )



      setBlog(selectedBlog)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlog()

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }, [fetchBlog, id])



  // BLOG NOT FOUND
  if (!blog) {

    return (

      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">

        Blog Not Found

      </div>

    )

  }



  return (

    <section className="bg-[#fafaf7] w-full min-h-screen py-16 relative z-10">

      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* Category */}
        <span className="bg-[#edf7df] text-[#2d5a2d] px-5 py-2 rounded-full text-sm font-semibold">

          {blog.category}

        </span>


        {/* Title */}
        <h1 className="mt-8 text-[52px] leading-[1.15] font-bold text-[#183818]">

          {blog.title}

        </h1>


        {/* Date */}
        <p className="mt-5 text-[#6b7280] text-lg">

          Published on {

            new Date(blog.created_at)
            .toLocaleDateString()

          }

        </p>


        {/* Image */}
        <div className="mt-12 rounded-[30px] shadow-lg">

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[500px] object-cover"
          />

        </div>


        {/* Content */}
        <div className="mt-14 bg-white rounded-[30px] p-10 lg:p-14 shadow-sm border border-[#edf1e8]">

          <p className="text-[19px] leading-[2] text-[#4b5563] whitespace-pre-line">

            {blog.content}

          </p>

        </div>

      </div>



      {/* RELATED BLOGS */}
      <div className="mt-6">

        <div className="flex items-center justify-between mb-10">

          <div className="text-center mb-10 flex flex-col items-center justify-center">

            <h2 className="text-[40px] font-bold text-[#183818] leading-tight">

              More Articles

            </h2>

            <p className="text-[#667166] mt-2 text-lg max-w-[600px]">

              Continue exploring wellness & nutrition insights.

            </p>

          </div>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">

          {blogs
            .filter((item) => item.id !== blog.id)
            .slice(0, 3)
            .map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-[28px] overflow-hidden border border-[#edf1e8] hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[260px] object-cover"
                />



                {/* Content */}
                <div className="p-6">

                  <span className="bg-[#edf7df] text-[#2d5a2d] px-4 py-1 rounded-full text-sm font-medium">

                    {item.category}

                  </span>



                  <h3 className="mt-5 text-[24px] leading-[1.4] font-bold text-[#1c2b1d]">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-[#667166] leading-[1.8] text-[15px]">

                    {
                      item.short_description?.slice(0, 90)
                    }...

                  </p>



                  <Link
                    to={`/blog/${item.id}`}
                    className="inline-block mt-6 text-[#2d5a2d] font-semibold hover:translate-x-1 transition"
                  >

                    Read Article →

                  </Link>

                </div>

              </div>

            ))}

        </div>

      </div>

      <div className="h-20">
        
      </div>


    </section>

  )

}