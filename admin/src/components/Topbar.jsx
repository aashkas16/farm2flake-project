import {
  Bell,
  Search
} from "lucide-react"

export default function Topbar() {

  return (

    <header className="h-[78px] bg-white border-b border-[#e8edf3] px-6 flex items-center justify-between flex-shrink-0">

      {/* LEFT */}
      <div>

        <h1 className="text-[28px] font-bold text-[#111827]">

          Dashboard

        </h1>

        <p className="text-[13px] text-[#6b7280] mt-1">

          Welcome back, Admin

        </p>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="w-[260px] h-[42px] bg-[#f5f7fb] rounded-xl px-4 flex items-center gap-2">

          <Search size={16} color="#6b7280" />

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

          <div>

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