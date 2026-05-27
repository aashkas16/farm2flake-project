import { useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()



  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")



  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault()



    try {

      setLoading(true)

      setError("")



      const response =
        await axios.post(

          "https://farm2flake-backend.onrender.com/api/admin/login",

          {

            email,

            password

          }

        )



      // SAVE SESSION
      sessionStorage.setItem(

        "token",

        response.data.token

      )



      sessionStorage.setItem(

        "admin",

        JSON.stringify(

          response.data.admin

        )

      )



      navigate("/")

    } catch (error) {

      console.log(error)



      setError(

        "Invalid email or password"

      )

    } finally {

      setLoading(false)

    }

  }



  return (

    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6">

      <div className="w-full max-w-[460px] bg-white rounded-[32px] p-10 border border-[#edf1e8] shadow-sm">

        {/* TOP */}
        <div className="text-center">

          <div className="w-16 h-16 rounded-2xl bg-[#ff7a00] text-white text-2xl font-bold flex items-center justify-center mx-auto">

            F

          </div>



          <h1 className="text-4xl font-bold text-[#111827] mt-6">

            Admin Login

          </h1>



          <p className="text-[#6b7280] mt-3">

            Login to access Farm2Flake dashboard.

          </p>

        </div>



        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="block text-sm font-semibold text-[#111827] mb-3">

              Email Address

            </label>



            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-[#dbe3ea] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
            />

          </div>



          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-semibold text-[#111827] mb-3">

              Password

            </label>



            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-[#dbe3ea] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
            />

          </div>



          {/* ERROR */}
          {error && (

            <div className="bg-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">

              {error}

            </div>

          )}



          {/* BUTTON */}
          <button
            type="submit"
            disabled={

              !email ||

              !password ||

              loading

            }
            className="w-full bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white py-4 rounded-xl font-semibold disabled:bg-gray-300"
          >

            {

              loading

                ? "Logging in..."

                : "Login"

            }

          </button>

        </form>

      </div>

    </div>

  )

}