import { useEffect, useState } from "react"

import axios from "axios"

import * as XLSX from "xlsx"

export default function ContactMessages() {

  const [messages, setMessages] = useState([])



  // FETCH
  const fetchMessages = async () => {

    try {

      const response = await axios.get(
        "https://farm2flake-backend.onrender.com/api/contact-messages"
      )



      setMessages(response.data)

    } catch (error) {

      console.log(error)

    }

  }



  useEffect(() => {

    fetchMessages()

  }, [])



  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(

        `https://farm2flake-backend.onrender.com/api/contact-messages/${id}`,

        {

          status

        }

      )



      fetchMessages()

    } catch (error) {

      console.log(error)

    }

  }



  // EXPORT EXCEL
  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(messages)



    const workbook =
      XLSX.utils.book_new()



    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      "ContactMessages"

    )



    XLSX.writeFile(

      workbook,

      "ContactMessages.xlsx"

    )

  }



  return (

    <div>

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#183818]">

            Contact Messages

          </h1>



          <p className="text-[#7d877d] mt-2">

            Manage customer support queries.

          </p>

        </div>



        <button
          onClick={exportExcel}
          className="bg-[#2d5a2d] hover:bg-[#1f431f] transition text-white px-6 py-3 rounded-xl font-semibold"
        >

          Export Excel

        </button>

      </div>



      {/* TABLE */}
      <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

              <tr>

                <th className="px-6 py-5 text-left">

                  Name

                </th>

                <th className="px-6 py-5 text-left">

                  Email

                </th>

                <th className="px-6 py-5 text-left">

                  Subject

                </th>

                <th className="px-6 py-5 text-left">

                  Status

                </th>

                <th className="px-6 py-5 text-left">

                  Actions

                </th>

              </tr>

            </thead>



            <tbody>

              {messages.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-[#edf1e8]"
                >

                  <td className="px-6 py-5">

                    {item.name}

                  </td>



                  <td className="px-6 py-5">

                    {item.email}

                  </td>



                  <td className="px-6 py-5">

                    {item.subject}

                  </td>



                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold

                      ${
                        item.status === "pending"
                          ? "bg-[#fff4e8] text-[#ff7a00]"
                          : "bg-[#e8f7e8] text-[#1e7a1e]"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>



                  <td className="px-6 py-5 flex gap-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "resolved"
                        )
                      }
                      className="bg-[#2d5a2d] text-white px-4 py-2 rounded-lg text-sm"
                    >

                      Resolve

                    </button>



                    <button
                      onClick={() =>
                        updateStatus(
                          item.id,
                          "deleted"
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                    >

                      Delete

                    </button>

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