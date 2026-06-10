import { Outlet } from "react-router-dom"
import { useState } from "react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function AdminLayout() {

  const [mobileOpen, setMobileOpen] =
    useState(false)

  return (

    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        <Topbar
          setMobileOpen={setMobileOpen}
        />

        <main
          className="
            flex-1
            overflow-y-auto

            p-4
            sm:p-5
            lg:p-6
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  )

}