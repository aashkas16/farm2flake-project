import API_BASE_URL from "../services/api"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function BlogDetails() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
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

  // FETCH BLOG
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs`)
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
    <section className="bg-[#FAF7F2] w-full min-h-screen py-10 md:py-16 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
        {/* CATEGORY */}
        <span className="bg-[#eef7ec] text-[#2F7C1F] px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold inline-block">
          {blog.category}
        </span>

        {/* TITLE */}
        <h1 className="mt-6 sm:mt-8 text-[32px] sm:text-[42px] md:text-[52px] leading-[1.2] font-black text-[#1D3B1D] break-words tracking-tight">
          {blog.title}
        </h1>

        {/* DATE */}
        <div className="flex items-center gap-4 text-[#6b7280] text-sm sm:text-base mt-4 sm:mt-5">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{new Date(blog.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={16} />
            <span>By Farm2Flake</span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="mt-8 sm:mt-12 rounded-[28px] shadow-sm overflow-hidden aspect-[16/9] w-full bg-gray-150 relative border border-[#1D3B1D]/5">
          <img
            src={blog.image}
            alt={blog.title}
            onError={(e) => handleImageError(e, blog.title)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-10 sm:mt-14 bg-white rounded-[28px] p-6 sm:p-10 lg:p-14 shadow-sm border border-[#1D3B1D]/5">
          <p className="text-[15px] sm:text-[18px] md:text-[19px] leading-8 sm:leading-[2] text-gray-600 whitespace-pre-line break-words">
            {blog.content}
          </p>
        </div>
      </div>

      {/* RELATED BLOGS */}
      <div className="mt-2 sm:mt-6 border-t border-[#1D3B1D]/5 pt-16">
        {/* HEADING */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-[30px] sm:text-[36px] md:text-[40px] font-black text-[#1D3B1D] leading-tight tracking-tight">
            More Articles
          </h2>
          <p className="text-gray-500 mt-3 text-[15px] sm:text-lg max-w-[600px] mx-auto leading-relaxed">
            Continue exploring wellness & nutrition insights.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {blogs
            .filter((item) => item.id !== blog.id)
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[28px] overflow-hidden border border-[#1D3B1D]/5 hover:shadow-lg transition duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* IMAGE */}
                <div className="aspect-[16/10] overflow-hidden w-full bg-gray-150 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => handleImageError(e, item.title)}
                    className="w-full h-full object-cover hover:scale-[1.03] transition duration-500"
                  />
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1D3B1D]/90 backdrop-blur-sm text-[#FAF7F2] px-3.5 py-1 text-xs font-bold shadow-sm whitespace-nowrap">
                    {item.category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  {/* TOP METADATA */}
                  <div className="flex items-center gap-4 text-gray-400 text-xs mb-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      <span>By Farm2Flake</span>
                    </div>
                  </div>

                  <h3 className="text-xl leading-[1.4] font-black text-[#1c2b1d] line-clamp-2 min-h-[56px] hover:text-[#2F7C1F] transition mb-3">
                    <Link to={`/blog/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-gray-500 leading-relaxed text-sm mb-6 line-clamp-3 flex-1">
                    {item.short_description}
                  </p>

                  <Link
                    to={`/blog/${item.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1.5 text-[#1D3B1D] hover:text-[#2F7C1F] font-bold transition text-sm group py-2"
                  >
                    Read Article 
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition duration-200" />
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