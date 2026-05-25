import glass1 from "../../assets/products/gl.png"

import glass2 from "../../assets/products/g2.png"

import glass3 from "../../assets/products/g3.png"

export default function HowItWorks() {

  const steps = [

    {

      id: 1,

      image: glass1,

      title: "Add Powder",

      desc: "Add 2-3 teaspoons of Farm2Flake powder"

    },



    {

      id: 2,

      image: glass2,

      title: "Add Water or Milk",

      desc: "Pour your choice of water, milk or any beverage"

    },



    {

      id: 3,

      image: glass3,

      title: "Shake & Enjoy",

      desc: "Stir, shake or blend and enjoy real nutrition instantly!"

    }

  ]



  return (

    <section className="py-16 md:py-24 bg-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-12">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a]">

            How It Works

          </h2>



          <p className="text-gray-500 mt-3 text-sm sm:text-base">

            Easy as 1-2-3!

          </p>

        </div>



        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 items-center">

          {steps.map((step, index) => (

            <div
              key={step.id}
              className="relative flex flex-col items-center text-center"
            >

              {/* STEP NUMBER */}
              <div className="absolute top-0 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 w-10 h-10 rounded-full bg-[#2d5a2d] text-white flex items-center justify-center font-bold shadow-md z-20">

                {step.id}

              </div>



              {/* IMAGE CARD */}
              <div className="bg-[#f8f7f2] rounded-3xl p-6 sm:p-8 w-full max-w-[240px] shadow-sm">

                <img
                  src={step.image}
                  alt={step.title}
                  className="h-32 sm:h-40 w-full object-cover scale-125 sm:scale-150"
                />

              </div>



              {/* TEXT */}
              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-[#0f172a]">

                {step.title}

              </h3>



              <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-[240px]">

                {step.desc}

              </p>



              {/* ARROW */}
              {index !== 2 && (

                <div className="hidden md:block absolute top-28 -right-10 text-[#2d5a2d] text-4xl">

                  →

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}