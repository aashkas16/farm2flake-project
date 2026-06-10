import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Send, Mail, Phone, MapPin, ChevronDown } from "lucide-react"
import axios from "axios"

export default function Footer() {
  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    categories: false,
    contact: false,
  })

  const [categories, setCategories] = useState(["Fruit Powders", "Vegetable Powders", "Herbs Powders"])

  useEffect(() => {
    axios.get("https://farm2flake-backend.onrender.com/api/products")
      .then(res => {
        const unique = [...new Set(res.data.map(p => p.category).filter(Boolean))]
        if (unique.length > 0) {
          setCategories(unique)
        }
      })
      .catch(err => console.log("Failed to fetch footer categories:", err))
  }, [])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <footer className="bg-[#FAF7F2] text-[#1D3B1D] pt-10 md:pt-16 pb-6 md:pb-8 border-t border-[#1D3B1D]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start mb-8 md:mb-12">
          
          {/* BRAND */}
          <div className="lg:col-span-1.5 flex flex-col justify-start">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1D3B1D]">
              Farm2Flake
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-3 max-w-[280px]">
              We bring you the absolute best of nature in every spoon. Premium freeze-dried nutrition for active daily lifestyles.
            </p>
            
            {/* SOCIAL MEDIA */}
            <div className="flex gap-4 mt-5">
              {[
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5c0-.8.2-1 1-1h2V3h-3c-2.5 0-4 1.2-4 3.5V8z"/>
                    </svg>
                  ), 
                  link: "https://www.facebook.com/share/1FqWRt7hhK/" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ), 
                  link: "https://www.instagram.com/farm2flake_official?igsh=MWJqMDU0Y2JoMjU2MQ==" 
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#1D3B1D]/10 flex items-center justify-center text-gray-500 hover:text-[#2F7C1F] hover:border-[#2F7C1F] transition duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="border-b border-[#1D3B1D]/5 md:border-none pb-3 md:pb-0">
            <button
              onClick={() => toggleSection("quickLinks")}
              className="w-full md:cursor-default flex items-center justify-between md:block text-left py-1 md:py-0"
            >
              <h3 className="font-extrabold text-[#111827] text-xs sm:text-sm uppercase tracking-wider md:mb-5">
                Quick Links
              </h3>
              <ChevronDown 
                size={16} 
                className={`text-[#1D3B1D]/50 transition-transform duration-300 md:hidden ${openSections.quickLinks ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`mt-2 md:mt-0 transition-all duration-300 overflow-hidden md:max-h-none ${openSections.quickLinks ? "max-h-[160px] opacity-100" : "max-h-0 opacity-0 md:opacity-100"}`}>
              <ul className="space-y-2 md:space-y-3 text-xs sm:text-sm text-gray-500 pt-1 md:pt-0">
                <li>
                  <Link to="/shop" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors py-1 block">
                    Shop Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors py-1 block">
                    Health Journal
                  </Link>
                </li>
                <li>
                  <Link to="/trial" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors py-1 block">
                    Trial Packs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="border-b border-[#1D3B1D]/5 md:border-none pb-3 md:pb-0">
            <button
              onClick={() => toggleSection("categories")}
              className="w-full md:cursor-default flex items-center justify-between md:block text-left py-1 md:py-0"
            >
              <h3 className="font-extrabold text-[#111827] text-xs sm:text-sm uppercase tracking-wider md:mb-5">
                Categories
              </h3>
              <ChevronDown 
                size={16} 
                className={`text-[#1D3B1D]/50 transition-transform duration-300 md:hidden ${openSections.categories ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`mt-2 md:mt-0 transition-all duration-300 overflow-hidden md:max-h-none ${openSections.categories ? "max-h-[160px] opacity-100" : "max-h-0 opacity-0 md:opacity-100"}`}>
              <ul className="space-y-2 md:space-y-3 text-xs sm:text-sm text-gray-500 pt-1 md:pt-0">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link to={`/shop?category=${encodeURIComponent(cat)}`} onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors py-1 block">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="border-b border-[#1D3B1D]/5 md:border-none pb-3 md:pb-0">
            <button
              onClick={() => toggleSection("contact")}
              className="w-full md:cursor-default flex items-center justify-between md:block text-left py-1 md:py-0"
            >
              <h3 className="font-extrabold text-[#111827] text-xs sm:text-sm uppercase tracking-wider md:mb-5">
                Contact
              </h3>
              <ChevronDown 
                size={16} 
                className={`text-[#1D3B1D]/50 transition-transform duration-300 md:hidden ${openSections.contact ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`mt-2 md:mt-0 transition-all duration-300 overflow-hidden md:max-h-none ${openSections.contact ? "max-h-[160px] opacity-100" : "max-h-0 opacity-0 md:opacity-100"}`}>
              <ul className="space-y-2.5 md:space-y-3 text-xs sm:text-sm text-gray-500 pt-1 md:pt-0">
                <li className="flex gap-2.5 items-start py-0.5">
                  <MapPin size={16} className="text-[#2F7C1F] shrink-0 mt-0.5" />
                  <span>Gujarat, India</span>
                </li>
                <li className="flex gap-2.5 items-center py-0.5">
                  <Phone size={16} className="text-[#2F7C1F] shrink-0" />
                  <span>+91 8866177704</span>
                </li>
                <li className="flex gap-2.5 items-center py-0.5">
                  <Mail size={16} className="text-[#2F7C1F] shrink-0" />
                  <span>farm2flake@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="pt-2 md:pt-0">
            <h3 className="font-extrabold text-[#111827] text-xs sm:text-sm uppercase tracking-wider mb-3 md:mb-5">
              Stay Connected
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Subscribe to get updates on new crop arrivals, recipes, and promotions.
            </p>
            
            <div className="mt-4 flex bg-white border border-[#1D3B1D]/10 rounded-xl overflow-hidden shadow-sm max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent px-4 py-2.5 w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
              />
              <button className="bg-[#1D3B1D] hover:bg-[#2F7C1F] px-4 py-2.5 transition text-[#FAF7F2] flex items-center justify-center shrink-0">
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-[#1D3B1D]/5 pt-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Farm2Flake. All Rights Reserved. Made in India.
        </div>

      </div>
    </footer>
  )
}