import { useParams, Link } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

export default function BlogDetails() {

  const { id } = useParams()

  const [blog, setBlog] = useState(null)

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://images.unsplash.com/photo-1610970881699-44a5587caaec?q=80&w=800&auto=format&fit=crop";
  }

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
        <div className="mt-8 sm:mt-12 rounded-[24px] sm:rounded-[30px] shadow-lg overflow-hidden aspect-[16/9] w-full bg-gray-100 relative">
          <img
            src={blog.image}
            alt={blog.title}
            onError={handleImageError}
            className="w-full h-full object-cover"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">

          {blogs
            .filter(
              (item) =>
                item.id !== blog.id
            )
            .slice(0, 3)
            .map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#1D3B1D]/5 hover:shadow-lg transition duration-300 hover:-translate-y-1 flex flex-col h-full"
              >

                {/* IMAGE */}
                <div className="aspect-[16/10] overflow-hidden w-full bg-gray-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover hover:scale-[1.03] transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">

                  <span className="bg-[#eef7ec] text-[#2F7C1F] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-xl leading-[1.4] font-black text-[#1c2b1d] line-clamp-2 min-h-[56px] hover:text-[#2F7C1F] transition">
                    <Link to={`/blog/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-gray-500 leading-relaxed text-sm line-clamp-3 flex-1">
                    {item.short_description}
                  </p>

                  <Link
                    to={`/blog/${item.id}`}
                    onClick={() =>
                      window.scrollTo(0, 0)
                    }
                    className="inline-flex items-center gap-1.5 mt-5 text-[#1D3B1D] hover:text-[#2F7C1F] font-bold transition text-sm group"
                  >
                    Read Article 
                    <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
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