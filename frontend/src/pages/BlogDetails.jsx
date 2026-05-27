import { useParams, Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function BlogDetails() {

  const { id } = useParams()

  const [blog, setBlog] =
    useState(null)

  const [blogs, setBlogs] =
    useState([])



  // FETCH BLOG
  const fetchBlog = async () => {

    try {

      const response =
        await axios.get(

          "https://farm2flake-backend.onrender.com/api/blogs"

        )



      const publishedBlogs =
        response.data.filter(

          (item) =>
            item.status === "published"

        )



      setBlogs(publishedBlogs)



      const selectedBlog =
        publishedBlogs.find(

          (item) =>
            item.id === Number(id)

        )



      setBlog(selectedBlog)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchBlog()



    window.scrollTo({

      top: 0,
      behavior: "smooth"

    })

  }, [id])



  // BLOG NOT FOUND
  if (!blog) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl sm:text-4xl font-bold px-4 text-center">

        Blog Not Found

      </div>

    )

  }



  return (

    <section className="bg-[#fafaf7] w-full min-h-screen py-10 md:py-16 relative z-10 overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">

        {/* CATEGORY */}
        <span className="bg-[#edf7df] text-[#2d5a2d] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold inline-block">

          {blog.category}

        </span>



        {/* TITLE */}
        <h1 className="mt-6 sm:mt-8 text-[32px] sm:text-[42px] md:text-[52px] leading-[1.2] font-bold text-[#183818] break-words">

          {blog.title}

        </h1>



        {/* DATE */}
        <p className="mt-4 sm:mt-5 text-[#6b7280] text-sm sm:text-lg">

          Published on {

            new Date(blog.created_at)

              .toLocaleDateString()

          }

        </p>



        {/* IMAGE */}
        <div className="mt-8 sm:mt-12 rounded-[24px] sm:rounded-[30px] shadow-lg overflow-hidden">

          <img
             src={blog.image}
            alt={blog.title}
            className="w-full h-[240px] sm:h-[380px] md:h-[500px] object-cover"
          />

        </div>



        {/* CONTENT */}
        <div className="mt-10 sm:mt-14 bg-white rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 lg:p-14 shadow-sm border border-[#edf1e8]">

          <p className="text-[15px] sm:text-[18px] md:text-[19px] leading-8 sm:leading-[2] text-[#4b5563] whitespace-pre-line break-words">

            {blog.content}

          </p>

        </div>

      </div>



      {/* RELATED BLOGS */}
      <div className="mt-2 sm:mt-6">

        {/* HEADING */}
        <div className="text-center mb-10 px-4">

          <h2 className="text-[30px] sm:text-[36px] md:text-[40px] font-bold text-[#183818] leading-tight">

            More Articles

          </h2>



          <p className="text-[#667166] mt-3 text-[15px] sm:text-lg max-w-[600px] mx-auto leading-7">

            Continue exploring wellness & nutrition insights.

          </p>

        </div>



        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6">

          {blogs
            .filter(
              (item) =>
                item.id !== blog.id
            )
            .slice(0, 3)
            .map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#edf1e8] hover:shadow-xl transition duration-300 hover:-translate-y-1"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[220px] sm:h-[260px] object-cover hover:scale-105 transition duration-500"
                  />

                </div>



                {/* CONTENT */}
                <div className="p-5 sm:p-6">

                  <span className="bg-[#edf7df] text-[#2d5a2d] px-4 py-1 rounded-full text-xs sm:text-sm font-medium inline-block">

                    {item.category}

                  </span>



                  <h3 className="mt-5 text-[20px] sm:text-[24px] leading-[1.4] font-bold text-[#1c2b1d] line-clamp-2 min-h-[68px]">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-[#667166] leading-7 sm:leading-[1.8] text-sm sm:text-[15px] line-clamp-3">

                    {

                      item.short_description?.slice(0, 90)

                    }...

                  </p>



                  <Link
                    to={`/blog/${item.id}`}
                    onClick={() =>
                      window.scrollTo(0, 0)
                    }
                    className="inline-block mt-6 text-[#2d5a2d] font-semibold hover:translate-x-1 transition text-sm sm:text-base"
                  >

                    Read Article →

                  </Link>

                </div>

              </div>

            ))}

        </div>

      </div>



      <div className="h-14 md:h-20"></div>

    </section>

  )

}