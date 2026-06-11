import API_BASE_URL from "../../services/api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ArrowRight, Calendar, User } from "lucide-react"

export default function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([])

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blogs`)
      const published = response.data
        .filter((blog) => blog.status === "published")
        .slice(0, 3) // Get latest 3
      setBlogs(published)
    } catch (error) {
      console.log("Error loading featured blogs:", error)
    }
  }

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

  useEffect(() => {
    fetchFeaturedBlogs()
  }, [])

  if (blogs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] overflow-hidden border-t border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-2">
              From Our Journal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] tracking-tight">
              Latest Health Insights
            </h2>
          </div>
          <Link
            to="/blog"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 font-bold text-[#2F7C1F] hover:text-[#1D3B1D] transition-colors group shrink-0"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-[#1D3B1D]/5 rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(29,59,29,0.02)] flex flex-col group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="overflow-hidden relative h-52 sm:h-56 bg-gray-150 shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  onError={(e) => handleImageError(e, blog.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1D3B1D]/90 backdrop-blur-sm text-[#FAF7F2] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide z-10">
                  {blog.category}
                </span>
              </div>

              {/* DETAILS */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>By Farm2Flake</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-[#111827] mb-2 leading-snug line-clamp-2 hover:text-[#2F7C1F] transition-colors">
                  <Link to={`/blog/${blog.id}`} onClick={() => window.scrollTo(0, 0)}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {blog.short_description}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1D3B1D] hover:text-[#2F7C1F] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
