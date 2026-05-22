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

  const [name, setName] = useState("")

  const [email, setEmail] = useState("")

  const [phone, setPhone] = useState("")

  const [subject, setSubject] = useState("")

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)



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

        "http://localhost:5000/api/contact",

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

    <section className="bg-[#fafaf7] min-h-screen py-14">

      <div className="max-w-7xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[15px] text-[#6b7280] mb-8">

          <Link
            to="/"
            className="hover:text-[#2d5a2d] transition"
          >

            Home

          </Link>

          <span>›</span>

          <span className="text-[#2d5a2d] font-semibold">

            Contact Us

          </span>

        </div>



        {/* Main Box */}
        <div className="bg-white rounded-[30px] border border-[#edf1e8] shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT */}
            <div className="p-10 lg:p-14 border-r border-[#edf1e8]">

              <h1 className="text-[48px] leading-[1.1] font-bold text-[#183818]">

                We'd Love to Hear
                <br />

                From You!

              </h1>



              <p className="mt-6 text-[#667166] text-[17px] leading-[1.9] max-w-[500px]">

                Have questions or feedback?
                We’re here to help.

              </p>



              {/* Contact Info */}
              <div className="mt-12 space-y-10">

                {/* Email */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d]">

                    <Mail size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-lg">

                      Email

                    </h3>

                    <p className="text-[#667166] mt-2">

                      hello@farm2flake.com

                    </p>

                  </div>

                </div>



                {/* Phone */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d]">

                    <Phone size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-lg">

                      Phone

                    </h3>

                    <p className="text-[#667166] mt-2">

                      +91 98765 43210

                    </p>

                  </div>

                </div>



                {/* Address */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d]">

                    <MapPin size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-lg">

                      Address

                    </h3>

                    <p className="text-[#667166] mt-2">

                      Vadodara, Gujarat, India

                    </p>

                  </div>

                </div>



                {/* Timing */}
                <div className="flex items-start gap-5">

                  <div className="w-12 h-12 rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d]">

                    <Clock size={22} />

                  </div>



                  <div>

                    <h3 className="font-bold text-[#1d1d1d] text-lg">

                      Working Hours

                    </h3>

                    <p className="text-[#667166] mt-2">

                      Mon - Sat : 9AM - 7PM

                    </p>

                  </div>

                </div>

              </div>

            </div>



            {/* RIGHT */}
            <div className="p-10 lg:p-14">

              <h2 className="text-[36px] font-bold text-[#183818]">

                Send Us a Message

              </h2>



              <p className="mt-4 text-[#667166] text-[16px] leading-[1.8]">

                Fill out the form below and our team will contact you shortly.

              </p>



              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="mt-10 space-y-7"
              >

                {/* Name */}
                <div>

                  <label className="block text-[#1d1d1d] font-medium mb-3">

                    Your Name

                  </label>



                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full border border-[#dce5d2] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />

                </div>



                {/* Email */}
                <div>

                  <label className="block text-[#1d1d1d] font-medium mb-3">

                    Email Address

                  </label>



                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full border border-[#dce5d2] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />

                </div>



                {/* Phone */}
                <div>

                  <label className="block text-[#1d1d1d] font-medium mb-3">

                    Phone Number

                  </label>



                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="w-full border border-[#dce5d2] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />

                </div>



                {/* Subject */}
                <div>

                  <label className="block text-[#1d1d1d] font-medium mb-3">

                    Subject

                  </label>



                  <input
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) =>
                      setSubject(e.target.value)
                    }
                    className="w-full border border-[#dce5d2] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d]"
                  />

                </div>



                {/* Message */}
                <div>

                  <label className="block text-[#1d1d1d] font-medium mb-3">

                    Your Message

                  </label>



                  <textarea
                    rows="6"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    className="w-full border border-[#dce5d2] rounded-xl px-5 py-4 outline-none focus:border-[#2d5a2d] resize-none"
                  />

                </div>



                {/* Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg shadow-md transition

                  ${
                    isFormValid
                      ? "bg-[#2d5a2d] hover:bg-[#1f451f] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >

                  {
                    loading
                      ? "Sending..."
                      : "Send Message"
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