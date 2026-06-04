import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function Blog() {
  const [blogs, setBlogs] = useState([])

  const handleImageError = (e, title) => {
    e.target.onerror = null;
    const lowerTitle = (title || "").toLowerCase();
    
    // Topic-based high-quality Unsplash fallbacks
    if (lowerTitle.includes("beetroot") || lowerTitle.includes("carrot") || lowerTitle.includes("red")) {
      e.target.src = "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop"; // Beetroot/root vegetables
    } else if (lowerTitle.includes("fruit") || lowerTitle.includes("berry") || lowerTitle.includes("mango")) {
      e.target.src = "https://images.unsplash.com/photo-1519996521430-02b798c1d881?q=80&w=800&auto=format&fit=crop"; // Fruits
    } else if (lowerTitle.includes("spinach") || lowerTitle.includes("green") || lowerTitle.includes("leaf") || lowerTitle.includes("herbs")) {
      e.target.src = "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop"; // Green leafy/spinach
    } else {
      e.target.src = "https://images.unsplash.com/photo-1490812978985-3aa01d713244?q=80&w=800&auto=format&fit=crop"; // General organic food/diet
    }
  }

  // FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://farm2flake-backend.onrender.com/api/blogs")
      
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
    fetchBlogs()
  }, [])

  return (
    <section className="min-h-[70vh] bg-[#FAF7F2] py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#6b7280] mb-8 flex-wrap">
          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >
            Home
          </Link>
          <span>›</span>
          <span className="text-[#2d5a2d] font-semibold">Blogs</span>
        </div>

        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] mb-5 tracking-tight">
          Our Health Insights
        </h1>

        <p className="text-gray-600 text-[15px] sm:text-lg leading-7 sm:leading-relaxed mb-10 md:mb-12 max-w-3xl">
          Read the latest nutrition tips, recipes, and Farm2Flake stories from our healthy living blog.
        </p>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-[#1D3B1D]/5 rounded-[28px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col h-full"
            >
              {/* IMAGE */}
              <div className="aspect-[16/10] overflow-hidden w-full bg-gray-150 relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  onError={(e) => handleImageError(e, blog.title)}
                  className="w-full h-full object-cover hover:scale-[1.03] transition duration-500"
                />
                <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1D3B1D]/90 backdrop-blur-sm text-[#FAF7F2] px-3.5 py-1 text-xs font-bold shadow-sm whitespace-nowrap">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                {/* TOP METADATA */}
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>By Farm2Flake</span>
                  </div>
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-black text-[#1c2b1d] mb-3 leading-snug hover:text-[#2F7C1F] transition min-h-[56px] line-clamp-2">
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
                    className="inline-flex items-center gap-1.5 text-[#1D3B1D] hover:text-[#2F7C1F] font-bold transition text-sm group py-2"
                  >
                    Read Article 
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition duration-200" />
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