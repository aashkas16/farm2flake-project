import { useEffect, useState } from "react"

import axios from "axios"

import * as XLSX from "xlsx"

export default function ContactMessages() {

  const [messages, setMessages] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  // FETCH
  const fetchMessages = async () => {

    try {

      const response =
        await axios.get(
          "https://farm2flake-backend.onrender.com/api/contact-messages"
        )

      setMessages(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#183818]">

            Contact Messages

          </h1>

          <p className="text-[#7d877d] mt-2">

            Manage customer support queries.

          </p>

        </div>

        <button
          onClick={exportExcel}
          className="
            w-full sm:w-auto

            bg-[#2d5a2d]
            hover:bg-[#1f431f]

            transition

            text-white

            px-6 py-3

            rounded-xl

            font-semibold
          "
        >

          Export Excel

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-8 text-center text-[#6b7280]">

          Loading messages...

        </div>

      )}

      {/* EMPTY */}

      {!loading && messages.length === 0 && (

        <div className="mt-8 bg-white rounded-[28px] border border-[#edf1e8] p-10 text-center">

          <h3 className="text-xl font-semibold text-[#111827]">

            No Messages Found

          </h3>

          <p className="text-[#6b7280] mt-2">

            Customer messages will appear here.

          </p>

        </div>

      )}

      {/* MOBILE CARDS */}

      {!loading && messages.length > 0 && (

        <div className="md:hidden mt-6 space-y-4">

          {messages.map((item) => (

            <div

              key={item.id}

              className="
                bg-white
                rounded-3xl
                border border-[#edf1e8]
                p-5
                shadow-sm
              "

            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h3 className="font-bold text-lg text-[#111827]">

                    {item.name}

                  </h3>

                  <p className="text-sm text-[#6b7280] mt-1 break-all">

                    {item.email}

                  </p>

                </div>

                <span

                  className={`

                    px-4 py-2
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      item.status === "pending"

                        ? "bg-[#fff4e8] text-[#ff7a00]"

                        : "bg-[#e8f7e8] text-[#1e7a1e]"
                    }

                  `}
                >

                  {item.status}

                </span>

              </div>

              <div className="mt-5">

                <p className="text-xs uppercase text-[#7d877d]">

                  Subject

                </p>

                <p className="font-medium text-[#111827] mt-1">

                  {item.subject}

                </p>

              </div>

              <div className="mt-5">

                <p className="text-xs uppercase text-[#7d877d]">

                  Message

                </p>

                <p className="text-[#374151] mt-2 leading-relaxed">

                  {item.message || "No message available"}

                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <button

                  onClick={() =>
                    updateStatus(
                      item.id,
                      "resolved"
                    )
                  }

                  className="
                    flex-1

                    h-[48px]

                    rounded-xl

                    bg-[#2d5a2d]

                    text-white

                    font-medium

                    hover:bg-[#1f431f]

                    transition
                  "
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

                  className="
                    flex-1

                    h-[48px]

                    rounded-xl

                    bg-red-500

                    text-white

                    font-medium

                    hover:bg-red-600

                    transition
                  "
                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

            {/* DESKTOP TABLE */}

      {!loading && messages.length > 0 && (

        <div className="hidden md:block mt-8 bg-white rounded-[28px] border border-[#edf1e8] overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#f8faf8] border-b border-[#edf1e8]">

                <tr>

                  <th className="px-6 py-5 text-left font-semibold">

                    Name

                  </th>

                  <th className="px-6 py-5 text-left font-semibold">

                    Email

                  </th>

                  <th className="px-6 py-5 text-left font-semibold">

                    Subject

                  </th>

                  <th className="px-6 py-5 text-left font-semibold">

                    Status

                  </th>

                  <th className="px-6 py-5 text-left font-semibold">

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

                        className={`

                          px-4 py-2

                          rounded-full

                          text-xs

                          font-semibold

                          ${
                            item.status === "pending"

                              ? "bg-[#fff4e8] text-[#ff7a00]"

                              : "bg-[#e8f7e8] text-[#1e7a1e]"
                          }

                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex gap-3">

                        <button

                          onClick={() =>
                            updateStatus(
                              item.id,
                              "resolved"
                            )
                          }

                          className="
                            bg-[#2d5a2d]

                            hover:bg-[#1f431f]

                            transition

                            text-white

                            px-4 py-2

                            rounded-lg

                            text-sm
                          "
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

                          className="
                            bg-red-500

                            hover:bg-red-600

                            transition

                            text-white

                            px-4 py-2

                            rounded-lg

                            text-sm
                          "
                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  )

}