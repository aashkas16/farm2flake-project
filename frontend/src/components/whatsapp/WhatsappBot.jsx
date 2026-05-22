import { useState } from "react"

import {

  MessageCircle,
  X

} from "lucide-react"

import { Link } from "react-router-dom"

export default function WhatsappBot() {

  const [open, setOpen] = useState(false)

  const [selectedAnswer, setSelectedAnswer] =
    useState("")



  const questions = [

    {

      question: "Shipping Information",

      answer:
        "Shipping usually takes 3-5 business days across India."

    },



    {

      question: "Bulk Orders",

      answer:
        "Yes, we accept bulk and wholesale orders. Please continue on WhatsApp."

    },



    {

      question: "Payment Help",

      answer:
        "Currently we accept direct WhatsApp order confirmations and manual payment assistance."

    },



    {

      question: "Product Information",

      answer:
        "All products are made using real fruit & vegetable powders with no harmful additives."

    },



    {

      question: "Order Support",

      answer:
        "For order related help, please continue chatting on WhatsApp."

    }

  ]



  const whatsappLink =
    "https://wa.me/919428428672"



  return (

    <>

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
      >

        {

          open

            ? <X size={28} />

            : <MessageCircle size={30} />

        }

      </button>



      {/* CHAT BOX */}
      {open && (

        <div className="fixed bottom-28 right-6 w-[360px] max-w-[90vw] bg-white rounded-[28px] shadow-2xl overflow-hidden z-50 border border-[#e5e7eb]">

          {/* TOP */}
          <div className="bg-[#25D366] px-6 py-5 text-white">

            <h2 className="text-xl font-bold">

              Farm2Flake Assistant

            </h2>



            <p className="text-sm mt-1 text-white/90">

              How can we help you today?

            </p>

          </div>



          {/* BODY */}
          <div className="p-5">

            <div className="flex flex-col gap-3">

              {questions.map((item, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedAnswer(
                      item.answer
                    )
                  }
                  className="text-left border border-[#e5e7eb] hover:border-[#25D366] hover:bg-[#f0fff4] transition rounded-xl px-4 py-3 text-[15px] font-medium text-[#1f2937]"
                >

                  {item.question}

                </button>

              ))}

            </div>



            {/* ANSWER */}
            {selectedAnswer && (

              <div className="mt-5 bg-[#f6fff8] border border-[#d1fadf] rounded-2xl p-4">

                <p className="text-[15px] text-[#1f2937] leading-relaxed">

                  {selectedAnswer}

                </p>

              </div>

            )}



            {/* INVALID QUESTION */}
            <div className="mt-5 text-sm text-[#6b7280] leading-relaxed">

              Ask relevant questions from the options above
              or contact support directly.

            </div>



            {/* BUTTONS */}
            <div className="mt-6 flex flex-col gap-3">

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebe5d] transition text-white text-center py-3 rounded-xl font-semibold"
              >

                Continue on WhatsApp

              </a>



              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="border border-[#d1d5db] hover:bg-[#f9fafb] transition text-center py-3 rounded-xl font-semibold text-[#111827]"
              >

                Contact Us

              </Link>

            </div>

          </div>

        </div>

      )}

    </>

  )

}