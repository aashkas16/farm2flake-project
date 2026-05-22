/* eslint-disable no-undef */
 
const nodemailer = require("nodemailer")

 
const PDFDocument = require("pdfkit")



const sendInvoiceEmail = async (

  order,

  products

) => {

  try {

    // TRANSPORTER
    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        }

      })



    // PDF
    const doc = new PDFDocument()

    const buffers = []



    doc.on(

      "data",

      buffers.push.bind(buffers)

    )



    const pdfPromise =
      new Promise((resolve) => {

        doc.on("end", () => {

          resolve(Buffer.concat(buffers))

        })

      })



    // PDF CONTENT
    doc.fontSize(24)
      .text("Farm2Flake Invoice", {

        align: "center"

      })



    doc.moveDown()



    doc.fontSize(14)
      .text(`Order ID: ${order.order_id}`)

    doc.text(`Customer: ${order.customer_name}`)

    doc.text(`Phone: ${order.phone}`)

    doc.text(`Email: ${order.email}`)

    doc.text(`City: ${order.city}`)



    doc.moveDown()

    doc.text("Products:")



    products.forEach((item) => {

      doc.moveDown(0.5)

      doc.text(

        `${item.product_name}
Qty: ${item.quantity}
Price: ₹${item.price}`

      )

    })



    doc.moveDown()

    doc.fontSize(18)
      .text(

        `Total Amount: ₹${order.total_amount}`,

        {

          align: "right"

        }

      )



    doc.end()



    const pdfBuffer =
      await pdfPromise



    // EMAIL
    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: order.email,

      subject: `Farm2Flake Order Confirmation - ${order.order_id}`,



      html: `

      <div style="font-family: Arial; padding: 20px;">

        <h1 style="color:#2d5a2d;">

          Thank You For Your Order 🌿

        </h1>



        <p>

          Hi ${order.customer_name},

        </p>



        <p>

          Your order has been successfully placed.

        </p>



        <h3>

          Order ID:
          ${order.order_id}

        </h3>



        <p>

          Your invoice PDF is attached below.

        </p>



        <p>

          Team Farm2Flake ❤️

        </p>

      </div>

      `,



      attachments: [

        {

          filename: `${order.order_id}.pdf`,

          content: pdfBuffer

        }

      ]

    })



    console.log(

      "Invoice email sent"

    )

  } catch (error) {

    console.log(error)

  }

}



module.exports =
  sendInvoiceEmail