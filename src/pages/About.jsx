import {
  Leaf,
  FlaskConical,
  Heart,
  ShieldCheck,
  BadgeCheck,
  Factory,
  Award,
} from "lucide-react"

import farmersImg from "../assets/products/farmers.png"
import { Link } from "react-router-dom"

export default function About() {

  return (

    <section className="bg-[#f7f7f2] min-h-screen pb-20">

      {/* TOP SPACE */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center gap-2">

          <Link
    to="/"
    className="hover:text-[#2d5a2d] transition"
  >
    Home
  </Link>

          <span>/</span>

          <span className="text-[#2d5a2d] font-semibold">
    About
  </span>

        </div>

        {/* MAIN CARD */}
        <div className="mt-8 bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-[42px] font-bold text-[#173617]">

                About Farm2Flake

              </h1>

              <p className="mt-5 text-[17px] text-gray-600 leading-8">

                At Farm2Flake, we believe real nutrition comes from real ingredients.

              </p>

              <p className="mt-5 text-[17px] text-gray-600 leading-8">

                We source the best fruits & vegetables from trusted farms and use advanced freeze-drying technology to preserve their natural goodness.

              </p>

            </div>

            {/* RIGHT IMAGE */}
            <div>

              <img
                src={farmersImg}
                alt=""
                className="w-full h-[340px] object-cover rounded-[28px]"
              />

            </div>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {/* CARD 1 */}
            <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">

              <div className="w-14 h-14 rounded-full bg-[#edf7ea] flex items-center justify-center mx-auto">

                <Leaf className="text-[#2d5a2d]" size={28} />

              </div>

              <h3 className="mt-5 font-bold text-[#173617] text-lg">
                Real Ingredients
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Direct from farms
              </p>

            </div>

            {/* CARD 2 */}
            <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">

              <div className="w-14 h-14 rounded-full bg-[#edf7ea] flex items-center justify-center mx-auto">

                <FlaskConical className="text-[#2d5a2d]" size={28} />

              </div>

              <h3 className="mt-5 font-bold text-[#173617] text-lg">
                Advanced Tech
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Freeze-Drying
              </p>

            </div>

            {/* CARD 3 */}
            <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">

              <div className="w-14 h-14 rounded-full bg-[#edf7ea] flex items-center justify-center mx-auto">

                <ShieldCheck className="text-[#2d5a2d]" size={28} />

              </div>

              <h3 className="mt-5 font-bold text-[#173617] text-lg">
                No Preservatives
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                No Compromise
              </p>

            </div>

            {/* CARD 4 */}
            <div className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">

              <div className="w-14 h-14 rounded-full bg-[#edf7ea] flex items-center justify-center mx-auto">

                <Heart className="text-[#2d5a2d]" size={28} />

              </div>

              <h3 className="mt-5 font-bold text-[#173617] text-lg">
                Healthy You
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Happy Planet
              </p>

            </div>

          </div>

          {/* MISSION & VISION */}
          <div className="grid lg:grid-cols-2 gap-8 mt-16">

            {/* Mission */}
            <div className="bg-[#f8f8f3] rounded-3xl p-10 text-center">

              <h2 className="text-[30px] font-bold text-[#173617]">

                Our Mission

              </h2>

              <p className="mt-5 text-gray-600 leading-8 text-[16px]">

                To make healthy eating easy, natural & accessible for everyone.

              </p>

            </div>

            {/* Vision */}
            <div className="bg-[#f8f8f3] rounded-3xl p-10 text-center">

              <h2 className="text-[30px] font-bold text-[#173617]">

                Our Vision

              </h2>

              <p className="mt-5 text-gray-600 leading-8 text-[16px]">

                To be India’s most trusted brand for natural, freeze-dried nutrition.

              </p>

            </div>

          </div>

          {/* BOTTOM FEATURES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t border-gray-200 pt-10">

            <div className="flex items-center gap-3 justify-center">

              <Leaf size={20} className="text-[#2d5a2d]" />

              <span className="text-gray-700 font-medium">
                Sustainably Sourced
              </span>

            </div>

            <div className="flex items-center gap-3 justify-center">

              <Award size={20} className="text-[#2d5a2d]" />

              <span className="text-gray-700 font-medium">
                Quality Assured
              </span>

            </div>

            <div className="flex items-center gap-3 justify-center">

              <BadgeCheck size={20} className="text-[#2d5a2d]" />

              <span className="text-gray-700 font-medium">
                Lab Tested
              </span>

            </div>

            <div className="flex items-center gap-3 justify-center">

              <Factory size={20} className="text-[#2d5a2d]" />

              <span className="text-gray-700 font-medium">
                Made in India
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}