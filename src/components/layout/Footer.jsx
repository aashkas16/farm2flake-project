import { Link } from "react-router-dom";
export default function Footer() {

  return (

    <footer className="bg-gradient-to-r from-[#022d02] via-[#0b4d0b] to-[#022d02] text-white pt-10 pb-5 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr_1.5fr] gap-10 items-start">

          {/* Left Section */}
          <div>

            <h2 className="text-[30px] font-bold leading-none">
              Farm2Flake
            </h2>

            <p className="text-gray-200 text-[15px] leading-9 mt-5 max-w-[240px]">
              We bring you the best of nature in every spoon.
              Rich Fruits. Real Goodness.
            </p>


          </div>

          {/* Quick Links */}
<div>

  <h3 className="font-bold text-[18px] mb-6">
    Quick Links
  </h3>

  <ul className="space-y-4 text-[15px] text-gray-100">

    <li>
      <Link to="/shop" className="hover:text-[#9be26a] transition" onClick={() => window.scrollTo(0, 0)}>
        Shop All
      </Link>
    </li>


    <li>
      <Link to="/blog" className="hover:text-[#9be26a] transition" onClick={() => window.scrollTo(0, 0)}>
        Blog
      </Link>
    </li>

  </ul>

</div>


{/* Customer Care */}
<div>

  <h3 className="font-bold text-[18px] mb-6">
    Customer Care
  </h3>

  <ul className="space-y-4 text-[15px] text-gray-100">

    <li>
      <Link to="/about" className="hover:text-[#9be26a] transition" onClick={() => window.scrollTo(0, 0)}>
        About Us
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-[#9be26a] transition" onClick={() => window.scrollTo(0, 0)}>
        Contact Us
      </Link>
    </li>

    <li>
      <Link to="/faq" className="hover:text-[#9be26a] transition" onClick={() => window.scrollTo(0, 0)}>
        FAQs
      </Link>
    </li>

  </ul>

</div>


{/* Legal */}
<div>

  <h3 className="font-bold text-[18px] mb-6">
    Legal
  </h3>

  <ul className="space-y-4 text-[15px] text-gray-100">

    <li>
      <Link to="/terms" className="hover:text-[#9be26a] transition">
        Terms & Conditions
      </Link>
    </li>

    <li>
      <Link to="/privacy" className="hover:text-[#9be26a] transition">
        Privacy Policy
      </Link>
    </li>

  </ul>

</div>
          {/* Newsletter */}
          <div className="w-full">

            <h3 className="font-bold text-[18px] mb-6">
              Stay Connected
            </h3>

            <p className="text-[15px] text-gray-100 leading-8">
              Subscribe to get updates on
              new products & offers.
            </p>

            {/* Input */}
            <div className="mt-6 flex items-center bg-[#3b6b24] rounded-xl overflow-hidden w-full">

  <input
    type="email"
    placeholder="Enter your email"
    className="bg-transparent px-5 py-3 w-full outline-none text-sm placeholder:text-gray-300"
  />

  <button className="bg-[#6aae3c] hover:bg-[#7bc248] px-5 py-3 transition">
    ➜
  </button>

</div>

          </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-[#2d5c2d] mt-10 pt-5 text-gray-300 text-sm flex justify-between items-center">
<center>
          <div>
            
            © 2024 Farm2Flake. All Rights Reserved.
            
          </div>
          </center>

    

        </div>

    

    </footer>

  );

  }
