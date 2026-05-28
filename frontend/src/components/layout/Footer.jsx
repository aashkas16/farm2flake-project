import { Link } from "react-router-dom"

export default function Footer() {

  return (

    <footer className="bg-gradient-to-r from-[#022d02] via-[#0b4d0b] to-[#022d02] text-white pt-10 sm:pt-14 pb-5 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.5fr] gap-x-6 gap-y-8 items-start">

          {/* BRAND */}
          <div className="col-span-2 lg:col-span-1 text-center sm:text-left">

            <h2 className="text-[24px] sm:text-[30px] font-bold leading-none">

              Farm2Flake

            </h2>

            <p className="text-gray-200 text-[14px] sm:text-[15px] leading-7 mt-4 max-w-[280px] mx-auto sm:mx-0">

              We bring you the best of nature in every spoon.
              Rich Fruits. Real Goodness.

            </p>

          </div>

          {/* QUICK LINKS */}
          <div className="text-left">

            <h3 className="font-bold text-[16px] sm:text-[18px] mb-4">

              Quick Links

            </h3>

            <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-gray-100">

              <li>

                <Link
                  to="/shop"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="hover:text-[#9be26a] transition"
                >

                  Shop All

                </Link>

              </li>

              <li>

                <Link
                  to="/blog"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="hover:text-[#9be26a] transition"
                >

                  Blog

                </Link>

              </li>

            </ul>

          </div>

          {/* CUSTOMER CARE */}
          <div className="text-left">

            <h3 className="font-bold text-[16px] sm:text-[18px] mb-4">

              Customer Care

            </h3>

            <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-gray-100">

              <li>

                <Link
                  to="/about"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="hover:text-[#9be26a] transition"
                >

                  About Us

                </Link>

              </li>

              <li>

                <Link
                  to="/contact"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="hover:text-[#9be26a] transition"
                >

                  Contact Us

                </Link>

              </li>

              <li>

                <Link
                  to="/faq"
                  onClick={() =>
                    window.scrollTo(0, 0)
                  }
                  className="hover:text-[#9be26a] transition"
                >

                  FAQs

                </Link>

              </li>

            </ul>

          </div>

          {/* LEGAL */}
          <div className="text-left">

            <h3 className="font-bold text-[16px] sm:text-[18px] mb-4">

              Legal

            </h3>

            <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-gray-100">

              <li>

                <Link
                  to="/terms"
                  className="hover:text-[#9be26a] transition"
                >

                  Terms & Conditions

                </Link>

              </li>

              <li>

                <Link
                  to="/privacy"
                  className="hover:text-[#9be26a] transition"
                >

                  Privacy Policy

                </Link>

              </li>

            </ul>

          </div>

          {/* NEWSLETTER */}
          <div className="col-span-2 lg:col-span-1 w-full text-left">

            <h3 className="font-bold text-[16px] sm:text-[18px] mb-4">

              Stay Connected

            </h3>

            <p className="text-[14px] sm:text-[15px] text-gray-100 leading-7">

              Subscribe to get updates on
              new products & offers.

            </p>

            {/* INPUT */}
            <div className="mt-5 flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden w-full">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 w-full outline-none text-sm placeholder:text-gray-300"
              />

              <button className="bg-[#6aae3c] hover:bg-[#7bc248] px-5 py-3 transition flex items-center justify-center">

                ➜

              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#2d5c2d] mt-8 pt-4 text-gray-300 text-[13px] sm:text-sm text-center">

          © 2024 Farm2Flake. All Rights Reserved.

        </div>

      </div>

    </footer>

  )

}