import { Link } from "react-router-dom"

import { useState } from "react"

import axios from "axios"

import {

  Mail,
  Phone,
  MapPin,
  Clock

} from "lucide-react"

export default function Contact() {

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [subject, setSubject] =
    useState("")

  const [message, setMessage] =
    useState("")

  const [loading, setLoading] =
    useState(false)



  // FORM VALIDATION
  const isFormValid =

    name &&
    email &&
    phone &&
    subject &&
    message



  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)



      await axios.post(

        "https://farm2flake-backend.onrender.com/api/contact",

        {

          name,
          email,
          phone,
          subject,
          message

        }

      )



      alert(
        "Query submitted successfully!"
      )



      setName("")
      setEmail("")
      setPhone("")
      setSubject("")
      setMessage("")

    } catch (error) {

      console.log(error)



      alert(
        "Failed to submit query"
      )

    } finally {

      setLoading(false)

    }

  }



  return (

    <section className="bg-[#fafaf7] min-h-screen py-10 md:py-14 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-3 text-[14px] sm:text-[15px] text-[#6b7280] mb-8 flex-wrap">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >

            Home

          </Link>



          <span>

            ›

          </span>



          <span className="text-[#2d5a2d] font-semibold">

            Contact Us

          </span>

        </div>



        {/* MAIN BOX */}
        <div className="bg-white rounded-[24px] md:rounded-[30px] border border-[#edf1e8] shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#edf1e8]">

              <h1 className="text-[34px] sm:text-[42px] md:text-[48px] leading-[1.15] font-bold text-[#183818]">

                We'd Love to Hear

                <br />

                From You!

              </h1>



              <p className="mt-5 md:mt-6 text-[#667166] text-[15px] sm:text-[17px] leading-7 sm:leading-[1.9] max-w-[500px]">

                Have questions or feedback?
                We’re here to help.

              </p>



              {/* CONTACT INFO */}
              <div className="mt-10 md:mt-12 space-y-8 md:space-y-10">

                {/* EMAIL */}
                <div className="flex items-start gap-4 sm:gap-5">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d] shrink-0">

                    <Mail size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-base sm:text-lg">

                      Email

                    </h3>



                    <p className="text-[#667166] mt-2 text-sm sm:text-base break-all">

                      farm2flake@gmail.com

                    </p>

                  </div>

                </div>



                {/* PHONE */}
                <div className="flex items-start gap-4 sm:gap-5">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d] shrink-0">

                    <Phone size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-base sm:text-lg">

                      Phone

                    </h3>



                    <p className="text-[#667166] mt-2 text-sm sm:text-base">

                      +91 8866177704

                    </p>

                  </div>

                </div>



                {/* ADDRESS */}
                <div className="flex items-start gap-4 sm:gap-5">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d] shrink-0">

                    <MapPin size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-base sm:text-lg">

                      Address

                    </h3>



                    <p className="text-[#667166] mt-2 text-sm sm:text-base">

                      Vadodara, Gujarat, India

                    </p>

                  </div>

                </div>



                {/* HOURS */}
                <div className="flex items-start gap-4 sm:gap-5">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d] shrink-0">

                    <Clock size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-base sm:text-lg">

                      Working Hours

                    </h3>



                    <p className="text-[#667166] mt-2 text-sm sm:text-base leading-7">

                      Monday - Saturday

                      <br />

                      9:00 AM - 7:00 PM

                    </p>

                  </div>

                </div>

              </div>

            </div>



            {/* RIGHT FORM */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-14">

              <h2 className="text-[28px] sm:text-[34px] font-bold text-[#183818]">

                Send Us a Message

              </h2>



              <p className="mt-4 text-[#667166] text-[15px] sm:text-[16px] leading-7">

                Fill out the form below and our team will get back to you shortly.

              </p>



              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* NAME */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] text-sm sm:text-base"
                />



                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] text-sm sm:text-base"
                />



                {/* PHONE */}
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] text-sm sm:text-base"
                />



                {/* SUBJECT */}
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] text-sm sm:text-base"
                />



                {/* MESSAGE */}
                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  className="w-full border border-[#dfe5d8] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] text-sm sm:text-base resize-none"
                />



                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full bg-[#2d5a2d] hover:bg-[#1f431f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition text-sm sm:text-base"
                >

                  {

                    loading

                      ? "Submitting..."

                      : "Submit Query"

                  }

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}