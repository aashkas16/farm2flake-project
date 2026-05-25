import { Link } from "react-router-dom"

export default function FAQ() {

  const faqData = [

    {
      question: "What is Farm2Flake?",
      answer:
        "Farm2Flake is a premium wellness brand offering freeze-dried fruit and vegetable powders made from real farm-fresh ingredients. Our products are crafted to deliver natural nutrition with convenience."
    },

    {
      question: "Are your powders 100% natural?",
      answer:
        "Yes. All Farm2Flake products are made using real fruits and vegetables without artificial colors, preservatives, or added sugar."
    },

    {
      question: "How do I use the powders?",
      answer:
        "Simply mix one scoop with water, milk, smoothies, yogurt, or recipes. They are perfect for shakes, breakfast bowls, desserts, and healthy cooking."
    },

    {
      question: "Do you offer bulk orders?",
      answer:
        "Yes, we provide bulk and B2B orders for cafes, wellness brands, gyms, retailers, and private labeling businesses. Minimum bulk order starts from 3kg."
    },

    {
      question: "Can I order a trial pack?",
      answer:
        "Absolutely. Customers can request trial packs before placing bulk orders. Trial pack delivery charges are paid by the customer."
    },

    {
      question: "How are the powders preserved?",
      answer:
        "We use advanced freeze-drying technology that helps retain nutrients, flavor, color, and freshness naturally."
    },

    {
      question: "Do you ship across India?",
      answer:
        "Yes, we deliver pan India with safe packaging and fast shipping support."
    },

    {
      question: "Are the products suitable for kids?",
      answer:
        "Yes, our products are made from natural ingredients and can be consumed by children and adults as part of a balanced diet."
    }

  ]



  return (

    <section className="bg-[#fafaf7] min-h-screen overflow-hidden">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#edf7df] to-[#f8f8f1] py-14 sm:py-16 md:py-20 border-b border-[#e5e7db]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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

              FAQ

            </span>

          </div>



          <div className="max-w-3xl">

            <p className="text-[#5f7a5f] font-medium mb-4 tracking-wide uppercase text-sm sm:text-base">

              Frequently Asked Questions

            </p>



            <h1 className="text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] font-bold text-[#163616]">

              Everything You Need

              <br />

              To Know About

              <br />

              Farm2Flake

            </h1>



            <p className="mt-6 sm:mt-7 text-[15px] sm:text-[18px] leading-8 sm:leading-[1.9] text-[#4b5563] max-w-2xl">

              Discover answers about our freeze-dried fruit powders,
              delivery process, bulk orders, trial packs, nutrition,
              ingredients, and product usage.

            </p>

          </div>

        </div>

      </div>



      {/* FAQ SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

        <div className="space-y-5 sm:space-y-6">

          {faqData.map((faq, index) => (

            <details
              key={index}
              className="group bg-white rounded-[20px] sm:rounded-[24px] border border-[#ebefe3] shadow-sm overflow-hidden transition"
            >

              <summary className="flex items-center justify-between cursor-pointer list-none px-5 sm:px-8 py-5 sm:py-7 gap-4">

                <h2 className="text-[18px] sm:text-[22px] leading-snug font-semibold text-[#183818]">

                  {faq.question}

                </h2>



                <div className="min-w-[38px] sm:min-w-[42px] h-[38px] sm:h-[42px] rounded-full bg-[#edf7df] flex items-center justify-center text-[#2d5a2d] text-xl sm:text-2xl font-light group-open:rotate-45 transition duration-300 shrink-0">

                  +

                </div>

              </summary>



              <div className="px-5 sm:px-8 pb-6 sm:pb-8">

                <div className="h-[1px] bg-[#eef2e6] mb-5 sm:mb-6"></div>



                <p className="text-[15px] sm:text-[17px] leading-7 sm:leading-[1.9] text-[#4b5563]">

                  {faq.answer}

                </p>

              </div>

            </details>

          ))}

        </div>



        {/* SUPPORT BOX */}
        <div className="mt-14 md:mt-20 bg-gradient-to-r from-[#0d3b0d] to-[#145214] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-14 text-white relative overflow-hidden">

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">

            <div>

              <p className="text-[#d4e7c7] uppercase tracking-widest text-xs sm:text-sm mb-4">

                Need More Help?

              </p>



              <h2 className="text-[30px] sm:text-[38px] md:text-[42px] leading-[1.2] font-bold">

                Still Have Questions?

              </h2>



              <p className="mt-5 text-[#e5efe0] text-[15px] sm:text-[17px] leading-7 sm:leading-[1.9] max-w-2xl">

                Our support team is here to help you with orders,
                trial packs, shipping, product guidance, and bulk enquiries.

              </p>

            </div>



            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 sm:gap-5">

              <Link
                className="border border-white hover:bg-white hover:text-[#1d4d1d] transition px-6 sm:px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg text-center"
                to="/contact"
                onClick={() =>
                  window.scrollTo(0, 0)
                }
              >

                Contact Us

              </Link>



              <button className="border border-white hover:bg-white hover:text-[#1d4d1d] transition px-6 sm:px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg">

                Bulk Orders

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}