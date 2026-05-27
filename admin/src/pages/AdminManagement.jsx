import { useEffect, useState } from "react"

import axios from "axios"

export default function AdminManagement() {

  const [admins, setAdmins] = useState([])

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [role, setRole] = useState("staff")



  const currentAdmin =
    JSON.parse(

      sessionStorage.getItem("admin")

    )



  // FETCH ADMINS
  const fetchAdmins = async () => {

    try {

      const response =
        await axios.get(

          "https://farm2flake-backend.onrender.com/api/admins"

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

        "https://farm2flake-backend.onrender.com/api/admins",

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

    try {

      await axios.delete(

        `https://farm2flake-backend.onrender.com/api/admins/${id}`

      )



      fetchAdmins()

    } catch (error) {

      console.log(error)

    }

  }



  // STAFF BLOCK
  if (

    currentAdmin.role !==

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
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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
          className="mt-6 bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-8 py-4 rounded-xl font-semibold disabled:bg-gray-300"
        >

          Create Admin

        </button>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

        <div className="overflow-x-auto">

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

                    {admin.id !== 1 && (

                      <button
                        onClick={() =>
                          deleteAdmin(
                            admin.id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                      >

                        Delete

                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}