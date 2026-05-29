import {
  Bell,
  Search,
  Menu
} from "lucide-react"

import { useLocation } from "react-router-dom"

export default function Topbar({

  setMobileOpen

}) {

  const location =
    useLocation()

  const titles = {

    "/": "Dashboard",

    "/products": "Products",

    "/add-product": "Add Product",

    "/orders": "Orders",

    "/blogs": "Blogs",

    "/add-blog": "Add Blog",

    "/reviews": "Reviews",

    "/contacts": "Contacts",

    "/admin-management": "Admins"

  }

  const pageTitle =
    titles[location.pathname] ||
    "Dashboard"

  return (

    <header
      className="
        h-[72px]
        lg:h-[78px]

        bg-white

        border-b border-[#e8edf3]

        px-4
        sm:px-6

        flex items-center justify-between

        flex-shrink-0
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-3">

        <button

          onClick={() =>
            setMobileOpen(true)
          }

          className="
            lg:hidden

            w-10 h-10

            rounded-xl

            bg-[#f5f7fb]

            flex items-center justify-center
          "
        >

          <Menu size={20} />

        </button>

        <div>

          <h1 className="text-[22px] lg:text-[28px] font-bold text-[#111827]">

            {pageTitle}

          </h1>

          <p className="hidden sm:block text-[13px] text-[#6b7280] mt-1">

            Welcome back, Admin

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        {/* SEARCH */}

        <div className="hidden lg:flex w-[260px] h-[42px] bg-[#f5f7fb] rounded-xl px-4 items-center gap-2">

          <Search
            size={16}
            color="#6b7280"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-[14px] flex-1"
          />

        </div>

        {/* BELL */}

        <button className="w-[42px] h-[42px] rounded-xl bg-[#f5f7fb] flex items-center justify-center">

          <Bell size={18} />

        </button>

        {/* PROFILE */}

        <div className="h-[42px] bg-[#f5f7fb] rounded-xl px-3 flex items-center gap-3">

          <div className="w-8 h-8 rounded-full bg-[#183818] text-white flex items-center justify-center text-sm font-bold">

            A

          </div>

          <div className="hidden sm:block">

            <h3 className="text-[13px] font-semibold text-[#111827] leading-none">

              Admin

            </h3>

            <p className="text-[11px] text-[#6b7280] mt-1">

              Super Admin

            </p>

          </div>

        </div>

      </div>

    </header>

  )

}