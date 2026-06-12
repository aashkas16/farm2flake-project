import API_BASE_URL from "../../services/api"
import { useEffect, useState } from "react"

import axios from "axios"

import * as XLSX from "xlsx"

export default function ContactMessages() {

  const [messages, setMessages] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [selectedMessage, setSelectedMessage] =
    useState(null)

  // FETCH
  const fetchMessages = async () => {

    try {

      const response =
        await axios.get(
          `${API_BASE_URL}/api/contact-messages`
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

        `${API_BASE_URL}/api/contact-messages/${id}`,

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
              onClick={() => setSelectedMessage(item)}

              className="
                bg-white
                rounded-3xl
                border border-[#edf1e8]
                p-5
                shadow-sm
                cursor-pointer
                hover:shadow-md
                transition-all
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

                <p className="text-[#374151] mt-2 leading-relaxed line-clamp-3">

                  {item.message || "No message available"}

                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <button

                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(
                      item.id,
                      "resolved"
                    );
                  }}

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

                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(
                      item.id,
                      "deleted"
                    );
                  }}

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
                    Message
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
                    onClick={() => setSelectedMessage(item)}

                    className="border-b border-[#edf1e8] hover:bg-[#fcfdfc] cursor-pointer transition-colors"

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

                    <td className="px-6 py-5 max-w-sm text-sm text-[#4b5563] truncate">

                      {item.message}

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

                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(
                              item.id,
                              "resolved"
                            );
                          }}

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

                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(
                              item.id,
                              "deleted"
                            );
                          }}

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

      {/* MODAL DIALOG */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[28px] border border-[#edf1e8] w-full max-w-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#f8faf8] border-b border-[#edf1e8] flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#183818]">Contact Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-[#7d877d] hover:text-[#183818] transition font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Client Name</span>
                  <span className="text-base text-[#111827] font-medium mt-1 block">{selectedMessage.name}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Email Address</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-base text-[#2d5a2d] hover:underline font-medium mt-1 block break-all">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Contact Number</span>
                  <span className="text-base text-[#111827] font-medium mt-1 block">{selectedMessage.phone || "Not provided"}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Submission Date</span>
                  <span className="text-base text-[#111827] font-medium mt-1 block">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#edf1e8] pt-4">
                <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Subject</span>
                <span className="text-base text-[#111827] font-semibold mt-1 block">{selectedMessage.subject}</span>
              </div>

              <div className="border-t border-[#edf1e8] pt-4">
                <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Message</span>
                <p className="text-sm text-[#374151] mt-2 leading-relaxed bg-[#f9faf9] p-4 rounded-2xl border border-[#edf1e8] whitespace-pre-wrap break-words">
                  {selectedMessage.message || "No message content."}
                </p>
              </div>

              <div className="border-t border-[#edf1e8] pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7d877d] font-semibold block">Status</span>
                  <span className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-semibold ${selectedMessage.status === 'pending' ? 'bg-[#fff4e8] text-[#ff7a00]' : 'bg-[#e8f7e8] text-[#1e7a1e]'}`}>
                    {selectedMessage.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#f8faf8] border-t border-[#edf1e8] flex items-center justify-end gap-3">
              {selectedMessage.status === "pending" && (
                <button
                  onClick={() => {
                    updateStatus(selectedMessage.id, "resolved");
                    setSelectedMessage(prev => prev ? { ...prev, status: "resolved" } : null);
                  }}
                  className="bg-[#2d5a2d] hover:bg-[#1f431f] text-white px-5 py-2.5 rounded-xl font-medium transition text-sm shadow-sm"
                >
                  Mark as Resolved
                </button>
              )}
              <button
                onClick={() => {
                  updateStatus(selectedMessage.id, "deleted");
                  setSelectedMessage(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition text-sm shadow-sm"
              >
                Delete Message
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] px-5 py-2.5 rounded-xl font-medium transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  )

}