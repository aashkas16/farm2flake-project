import { Link } from "react-router-dom"
import { Send, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-[#1D3B1D] pt-16 pb-8 border-t border-[#1D3B1D]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 items-start mb-12">
          
          {/* BRAND */}
          <div className="lg:col-span-1.5 flex flex-col justify-start">
            <h2 className="text-2xl font-black tracking-tight text-[#1D3B1D]">
              Farm2Flake
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-4 max-w-[280px]">
              We bring you the absolute best of nature in every spoon. Premium freeze-dried nutrition for active daily lifestyles.
            </p>
            
            {/* SOCIAL MEDIA */}
            <div className="flex gap-4 mt-6">
              {[
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5c0-.8.2-1 1-1h2V3h-3c-2.5 0-4 1.2-4 3.5V8z"/>
                    </svg>
                  ), 
                  link: "#" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.8l-5.3-7-6.1 7H1.3l7.6-8.7L.7 2.4h7l4.8 6.4 5.7-6.4zm-1.2 17.6h1.8L7.1 4.5H5.1l11.9 15.5z"/>
                    </svg>
                  ), 
                  link: "#" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ), 
                  link: "#" 
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="w-8 h-8 rounded-full border border-[#1D3B1D]/10 flex items-center justify-center text-gray-500 hover:text-[#2F7C1F] hover:border-[#2F7C1F] transition duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-extrabold text-[#111827] text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500">
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Shop Catalog
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Health Journal
                </Link>
              </li>
              <li>
                <Link to="/trial" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Trial Packs
                </Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="font-extrabold text-[#111827] text-sm uppercase tracking-wider mb-5">
              Categories
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500">
              <li>
                <Link to="/shop?category=Fruit Powders" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Fruit Powders
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Vegetable Powders" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Vegetable Powders
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Herbs Powders" onClick={() => window.scrollTo(0, 0)} className="hover:text-[#2F7C1F] transition-colors">
                  Herbs Powders
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="font-extrabold text-[#111827] text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-[#2F7C1F] shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone size={16} className="text-[#2F7C1F] shrink-0" />
                <span>+91 63592 25925</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="text-[#2F7C1F] shrink-0" />
                <span>care@farm2flake.com</span>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-extrabold text-[#111827] text-sm uppercase tracking-wider mb-5">
              Stay Connected
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Subscribe to get updates on new crop arrivals, recipes, and trade promotions.
            </p>
            
            <div className="mt-4 flex bg-white border border-[#1D3B1D]/10 rounded-xl overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent px-4 py-3 w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
              />
              <button className="bg-[#1D3B1D] hover:bg-[#2F7C1F] px-4 py-3 transition text-[#FAF7F2] flex items-center justify-center shrink-0">
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-[#1D3B1D]/5 pt-8 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Farm2Flake. All Rights Reserved. Made in India.
        </div>

      </div>
    </footer>
  )
}