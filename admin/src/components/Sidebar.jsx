import {
  LayoutDashboard,
  Package,
  PlusSquare,
  FileText,
  MessageSquare,
  Star,
  ShoppingBag,
  Shield,
  LogOut,
  X
} from "lucide-react"

import {
  NavLink,
  useNavigate
} from "react-router-dom"

export default function Sidebar({

  mobileOpen,
  setMobileOpen

}) {

  const navigate = useNavigate()

  const admin =
    JSON.parse(
      sessionStorage.getItem("admin")
    )

  const handleLogout = () => {

    sessionStorage.clear()

    navigate("/login")

  }

  const menuItems = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/"
    },

    {
      name: "Orders",
      icon: <ShoppingBag size={18} />,
      path: "/orders"
    },

    {
      name: "Products",
      icon: <Package size={18} />,
      path: "/products"
    },

    {
      name: "Add Product",
      icon: <PlusSquare size={18} />,
      path: "/add-product"
    },

    {
      name: "Blogs",
      icon: <FileText size={18} />,
      path: "/blogs"
    },

    {
      name: "Add Blog",
      icon: <PlusSquare size={18} />,
      path: "/add-blog"
    },

    {
      name: "Reviews",
      icon: <Star size={18} />,
      path: "/reviews"
    },

    {
      name: "Contacts",
      icon: <MessageSquare size={18} />,
      path: "/contacts"
    }

  ]

  if (
    admin?.role ===
    "super_admin"
  ) {

    menuItems.push({

      name: "Admins",

      icon: <Shield size={18} />,

      path: "/admin-management"

    })

  }

  return (

    <>
      {/* MOBILE OVERLAY */}

      <div

        onClick={() =>
          setMobileOpen(false)
        }

        className={`
          fixed inset-0 z-40
          bg-black/40
          backdrop-blur-sm
          lg:hidden
          transition-all duration-300

          ${
            mobileOpen

              ? "opacity-100 visible"

              : "opacity-0 invisible"
          }
        `}
      />

      {/* SIDEBAR */}

      <aside

        className={`

          fixed lg:relative

          top-0 left-0

          z-50 lg:z-auto

          w-[280px]
          lg:w-[245px]

          h-screen

          bg-[#0d1520]

          text-white

          flex flex-col

          flex-shrink-0

          transition-transform duration-300 ease-out

          ${
            mobileOpen

              ? "translate-x-0"

              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* MOBILE CLOSE */}

        <button

          onClick={() =>
            setMobileOpen(false)
          }

          className="
            lg:hidden

            absolute
            top-5
            right-4

            w-9 h-9

            rounded-lg

            bg-white/10

            flex items-center justify-center
          "
        >

          <X size={18} />

        </button>

        {/* LOGO */}

        <div className="h-[74px] px-5 border-b border-white/5 flex items-center">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-xl bg-[#2d5a2d] flex items-center justify-center text-white font-bold text-[16px]">

              F

            </div>

            <div>

              <h1 className="text-[18px] font-semibold leading-none">

                Farm2Flake

              </h1>

              <p className="text-[10px] text-[#7f8b99] mt-[5px] uppercase tracking-[2px]">

                Admin Panel

              </p>

            </div>

          </div>

        </div>

        {/* MENU */}

        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">

          {menuItems.map((item) => (

            <NavLink

              key={item.name}

              to={item.path}

              onClick={() =>
                setMobileOpen(false)
              }

              className={({ isActive }) =>

                `h-[46px] px-4 rounded-lg flex items-center gap-3 text-[14px] font-medium transition-all duration-200

                ${
                  isActive

                    ? "bg-[#2d5a2d] text-white"

                    : "text-[#d5dde7] hover:bg-white/[0.04] hover:text-white"
                }`
              }

            >

              <span className="opacity-90 flex-shrink-0">

                {item.icon}

              </span>

              <span className="truncate">

                {item.name}

              </span>

            </NavLink>

          ))}

        </div>

        {/* LOGOUT */}

        <div className="p-3 border-t border-white/5">

          <button

            onClick={handleLogout}

            className="w-full h-[44px] rounded-lg text-[#d5dde7] hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-3 text-[14px] font-medium"

          >

            <LogOut size={17} />

            Logout

          </button>

        </div>

      </aside>

    </>

  )

}