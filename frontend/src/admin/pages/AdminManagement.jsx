import API_BASE_URL from "../../services/api"
import { useEffect, useState } from "react"

import axios from "axios"

export default function AdminManagement() {

  const [admins, setAdmins] = useState([])

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [role, setRole] = useState("staff")

  // PASSWORD RESET STATE
  const [resetAdmin, setResetAdmin] = useState(null)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [modalError, setModalError] = useState("")
  const [modalLoading, setModalLoading] = useState(false)

  const handleOpenResetFlow = (admin) => {
    setResetAdmin(admin)
    setShowVerifyModal(true)
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setModalError("")
  }

  const handleVerifyOldPassword = async (e) => {
    e.preventDefault()
    setModalLoading(true)
    setModalError("")
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admins/${resetAdmin.id}/verify-password`, {
        password: oldPassword
      })
      if (response.data.success) {
        setShowVerifyModal(false)
        setShowResetModal(true)
      }
    } catch (error) {
      console.log(error)
      setModalError(error.response?.data?.error || "Incorrect old password")
    } finally {
      setModalLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setModalError("Password must be at least 6 characters long")
      return
    }
    if (newPassword !== confirmPassword) {
      setModalError("New passwords do not match")
      return
    }
    setModalLoading(true)
    setModalError("")
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admins/${resetAdmin.id}/reset-password`, {
        password: newPassword
      })
      if (response.data.success) {
        alert("Password reset successfully!")
        setShowResetModal(false)
        setResetAdmin(null)
      }
    } catch (error) {
      console.log(error)
      setModalError("Failed to reset password")
    } finally {
      setModalLoading(false)
    }
  }



  const currentAdmin =
  JSON.parse(
    sessionStorage.getItem("admin") || "{}"
  )



  // FETCH ADMINS
  const fetchAdmins = async () => {

    try {

      const response =
        await axios.get(

          `${API_BASE_URL}/api/admins`

        )



      setAdmins(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchAdmins()

  }, [])



  // CREATE ADMIN
  const createAdmin = async () => {

    try {

      await axios.post(

        `${API_BASE_URL}/api/admins`,

        {

          email,

          password,

          role

        }

      )



      setEmail("")

      setPassword("")

      setRole("staff")



      fetchAdmins()

    } catch (error) {

      console.log(error)

    }

  }



  // DELETE ADMIN
  const deleteAdmin = async (id) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this admin?"
    )

  if (!confirmDelete) return

  try {

      await axios.delete(

        `${API_BASE_URL}/api/admins/${id}`

      )



      fetchAdmins()

    } catch (error) {

      console.log(error)

    }

  }



  // STAFF BLOCK
  if (

    currentAdmin?.role !==

    "super_admin"

  ) {

    return (

      <div className="bg-white rounded-2xl p-10 border border-[#edf1e8]">

        <h1 className="text-3xl font-bold text-red-500">

          Access Denied

        </h1>

      </div>

    )

  }



  return (

    <div>

      {/* TOP */}
      <div>

        <h1 className="text-4xl font-bold text-[#111827]">

          Admin Management

        </h1>



        <p className="text-[#6b7280] mt-2">

          Manage staff and super admins.

        </p>

      </div>



      {/* CREATE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-5 sm:p-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border border-[#dbe3ea] rounded-xl px-4 py-4 outline-none"
          />



          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border border-[#dbe3ea] rounded-xl px-4 py-4 outline-none"
          />



          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="border border-[#dbe3ea] rounded-xl px-4 py-4 outline-none"
          >

            <option value="staff">

              Staff

            </option>

            <option value="super_admin">

              Super Admin

            </option>

          </select>

        </div>



        <button
          onClick={createAdmin}
          disabled={

            !email ||

            !password

          }
          className="mt-6 w-full sm:w-auto bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-8 py-4 rounded-xl font-semibold disabled:bg-gray-300"
          //className="mt-6 bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-8 py-4 rounded-xl font-semibold disabled:bg-gray-300"
        >

          Create Admin

        </button>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

        <div className="overflow-x-auto">

          <div className="min-w-[700px]">

          <table className="w-full">

            <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

              <tr>

                <th className="px-6 py-5 text-left">

                  Email

                </th>

                <th className="px-6 py-5 text-left">

                  Role

                </th>

                <th className="px-6 py-5 text-left">

                  Date

                </th>

                <th className="px-6 py-5 text-left">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {admins.map((admin) => (

                <tr
                  key={admin.id}
                  className="border-b border-[#edf1e8]"
                >

                  <td className="px-6 py-5">

                    {admin.email}

                  </td>



                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold

                      ${
                        admin.role === "super_admin"
                          ? "bg-[#ffe8e8] text-red-500"
                          : "bg-[#edf7df] text-[#2d5a2d]"
                      }`}
                    >

                      {admin.role}

                    </span>

                  </td>



                  <td className="px-6 py-5">

                    {
                      new Date(admin.created_at)
                      .toLocaleDateString()
                    }

                  </td>



                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenResetFlow(admin)}
                        className="bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        Reset Password
                      </button>
                      {admin.id !== 1 && (
                        <button
                          onClick={() => deleteAdmin(admin.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          </div>

        </div>

      </div>

      {/* VERIFY PASSWORD MODAL */}
      {showVerifyModal && resetAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl border border-[#edf1e8] animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#f8faf8] border-b border-[#edf1e8] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#183818]">Verify Identity</h2>
              <button
                onClick={() => {
                  setShowVerifyModal(false)
                  setResetAdmin(null)
                }}
                className="text-[#7d877d] hover:text-[#183818] transition font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifyOldPassword} className="p-6 space-y-4">
              <p className="text-sm text-[#6b7280]">
                To change password of admin <strong>{resetAdmin.email}</strong>, please enter their current old password.
              </p>

              <div>
                <label className="font-semibold text-xs text-[#111827] uppercase tracking-wider block">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  placeholder="Enter current password"
                  className="mt-2 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                />
              </div>

              {modalError && (
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-2.5 rounded-xl border border-red-100">
                  {modalError}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3 border-t border-[#edf1e8]">
                <button
                  type="button"
                  onClick={() => {
                    setShowVerifyModal(false)
                    setResetAdmin(null)
                  }}
                  className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] px-4 py-2.5 rounded-xl font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm disabled:bg-gray-300"
                >
                  {modalLoading ? "Verifying..." : "Verify & Proceed"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetModal && resetAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl border border-[#edf1e8] animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#f8faf8] border-b border-[#edf1e8] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#183818]">Set New Password</h2>
              <button
                onClick={() => {
                  setShowResetModal(false)
                  setResetAdmin(null)
                }}
                className="text-[#7d877d] hover:text-[#183818] transition font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="p-6 space-y-4">
              <p className="text-sm text-[#6b7280]">
                Enter new credentials for <strong>{resetAdmin.email}</strong>.
              </p>

              <div>
                <label className="font-semibold text-xs text-[#111827] uppercase tracking-wider block">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password (min. 6 chars)"
                  className="mt-2 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-xs text-[#111827] uppercase tracking-wider block">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  className="mt-2 w-full h-[46px] rounded-xl border border-[#dbe3ea] px-4 outline-none focus:border-[#ff7a00] text-sm"
                />
              </div>

              {modalError && (
                <div className="text-red-500 text-xs font-semibold bg-red-50 p-2.5 rounded-xl border border-red-100">
                  {modalError}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3 border-t border-[#edf1e8]">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false)
                    setResetAdmin(null)
                  }}
                  className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] px-4 py-2.5 rounded-xl font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm disabled:bg-gray-300"
                >
                  {modalLoading ? "Saving..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  )

}
