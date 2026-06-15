/* eslint-disable no-undef */
const nodemailer = require("nodemailer")
const PDFDocument = require("pdfkit")

const sendInvoiceEmail = async (order, products) => {
  try {
    // TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // PDF
    const doc = new PDFDocument({ margin: 40, size: "A4" })
    const buffers = []

    doc.on("data", buffers.push.bind(buffers))

    const pdfPromise = new Promise((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers))
      })
    })

    // 1. TOP GREEN BARS (Brand Identity Accent)
    doc.rect(40, 40, 515, 6).fill("#2D5A2D")

    // 2. COMPANY / LOGO HEADER (Left)
    doc.fillColor("#1D3B1D")
       .font("Helvetica-Bold")
       .fontSize(28)
       .text("Farm2Flake", 40, 55)

    doc.fillColor("#6B7280")
       .font("Helvetica-Oblique")
       .fontSize(9.5)
       .text("Crafted by Nature, Perfected by Process", 40, 88)

    // 3. COMPANY DETAILS (Right-aligned)
    doc.fillColor("#111827")
       .font("Helvetica-Bold")
       .fontSize(9)
       .text("GSTIN: 24AALFF3107A1Z4", 320, 55, { align: "right", width: 235 })

    doc.font("Helvetica").fontSize(8).fillColor("#4B5563")
    doc.text("Shop No. 4/23, Fateh Sagar Complex,", 320, 68, { align: "right", width: 235 })
    doc.text("Opp. MGVCL Office, Fatehgunj,", 320, 78, { align: "right", width: 235 })
    doc.text("Vadodara - 390002, Gujarat, India", 320, 88, { align: "right", width: 235 })
    doc.text("Ph: +91 8866177704, 8866177703", 320, 98, { align: "right", width: 235 })
    doc.text("Email: farm2flake@gmail.com", 320, 108, { align: "right", width: 235 })
    doc.text("Web: www.farm2flake.com", 320, 118, { align: "right", width: 235 })

    // 4. DIVIDER
    doc.moveTo(40, 135)
       .lineTo(555, 135)
       .strokeColor("#E5E7EB")
       .lineWidth(1)
       .stroke()

    // 5. INVOICE INFO & BILL TO
    // Left: Customer details (Bill To)
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#9CA3AF").text("BILL TO:", 40, 150)
    doc.font("Helvetica-Bold").fontSize(11.5).fillColor("#111827").text(order.customer_name || "Valued Customer", 40, 163)
    
    doc.font("Helvetica").fontSize(9).fillColor("#4B5563")
    doc.text(`Phone: ${order.phone || "N/A"}`, 40, 178)
    doc.text(`Email: ${order.email || "N/A"}`, 40, 190)
    
    const addressPieces = [order.address, order.landmark, `${order.city || ""}` + (order.pincode ? ` - ${order.pincode}` : "")].filter(Boolean)
    const fullAddress = addressPieces.join(", ")
    doc.text(`Address: ${fullAddress || "Gujarat, India"}`, 40, 202, { width: 250 })

    // Right: Invoice Metadata
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#9CA3AF").text("INVOICE DETAILS:", 320, 150, { align: "right", width: 235 })
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#1D3B1D").text(`Invoice No: ${order.order_id}`, 320, 163, { align: "right", width: 235 })
    
    const orderDateStr = order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
    doc.font("Helvetica").fontSize(9).fillColor("#4B5563").text(`Date: ${orderDateStr}`, 320, 178, { align: "right", width: 235 })
    doc.text("Payment Mode: Cash on Delivery", 320, 190, { align: "right", width: 235 })
    doc.font("Helvetica-Bold").fillColor("#D97706").text("Status: Pending Delivery", 320, 202, { align: "right", width: 235 })

    // 6. PRODUCTS TABLE HEADER
    doc.rect(40, 235, 515, 20).fill("#2D5A2D")
    doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(9)
    doc.text("Product Description", 45, 241)
    doc.text("Qty", 320, 241, { width: 50, align: "center" })
    doc.text("Unit Price", 370, 241, { width: 90, align: "right" })
    doc.text("Total", 460, 241, { width: 95, align: "right" })

    // 7. PRODUCTS TABLE ROWS
    let yVal = 255
    products.forEach((item, idx) => {
      // Row Background
      if (idx % 2 === 0) {
        doc.rect(40, yVal, 515, 22).fill("#F4F8F4")
      }

      const qty = parseFloat(item.quantity) || 1
      const totalPrice = parseFloat(item.price) || 0
      const unitPrice = totalPrice / qty

      doc.fillColor("#111827").font("Helvetica-Bold").fontSize(8.5)
      doc.text(item.product_name, 45, yVal + 6, { width: 270, height: 12, ellipsis: true })

      doc.font("Helvetica").fontSize(8.5).fillColor("#374151")
      doc.text(qty.toString(), 320, yVal + 6, { width: 50, align: "center" })
      doc.text(`₹${unitPrice.toFixed(2)}`, 370, yVal + 6, { width: 90, align: "right" })

      doc.font("Helvetica-Bold").fillColor("#111827")
      doc.text(`₹${totalPrice.toFixed(2)}`, 460, yVal + 6, { width: 95, align: "right" })

      // Bottom Row Border
      doc.moveTo(40, yVal + 22).lineTo(555, yVal + 22).strokeColor("#E5E7EB").lineWidth(0.5).stroke()
      yVal += 22
    })

    // 8. GRAND TOTAL BOX
    yVal += 12
    doc.rect(320, yVal, 235, 26).fill("#FAF7F2")
    doc.strokeColor("#2D5A2D").lineWidth(1.2).rect(320, yVal, 235, 26).stroke()

    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(10.5).text("Grand Total:", 330, yVal + 8)
    
    const formattedTotal = parseFloat(order.total_amount) || 0
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(12).text(`₹${formattedTotal.toFixed(2)}`, 330, yVal + 7, { width: 215, align: "right" })

    // 9. BOTTOM TERMS & SIGN-OFF (Positioned fixed near page bottom)
    doc.moveTo(40, 730).lineTo(555, 730).strokeColor("#2D5A2D").lineWidth(0.7).stroke()
    
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(10.5).text("Thank you for shopping with us! Pure • Clean • Honest", 40, 742, { align: "center" })
    
    doc.fillColor("#6B7280").font("Helvetica").fontSize(8)
    doc.text("If you have any questions about this invoice, please contact us at farm2flake@gmail.com", 40, 757, { align: "center" })
    doc.text("Visit us at www.farm2flake.com | Follow on Instagram: @farm2flake_official", 40, 769, { align: "center" })

    doc.end()

    const pdfBuffer = await pdfPromise

    // EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: `Farm2Flake Order Confirmation - ${order.order_id}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #edf1e8; border-radius: 12px; background-color: #fafaf7;">
        <h1 style="color: #2D5A2D; font-size: 24px; text-align: center; border-bottom: 2px solid #2D5A2D; padding-bottom: 10px; margin-bottom: 20px;">
          Thank You For Your Order! 🌿
        </h1>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          Hi <strong>${order.customer_name}</strong>,
        </p>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          Your order has been successfully received and is being processed. Below are your invoice details:
        </p>
        <div style="background-color: #F4F8F4; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px dashed #2D5A2D;">
          <p style="margin: 5px 0; font-size: 14px; color: #111;"><strong>Order ID:</strong> ${order.order_id}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #111;"><strong>Total Amount:</strong> ₹${formattedTotal.toFixed(2)}</p>
        </div>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          We have attached a beautifully formatted PDF invoice to this email for your records.
        </p>
        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          If you have any questions or would like to modify your order details, please reach out to us at <a href="mailto:farm2flake@gmail.com" style="color: #2D5A2D; text-decoration: none; font-weight: bold;">farm2flake@gmail.com</a>.
        </p>
        <hr style="border: 0; border-top: 1px solid #edf1e8; margin: 30px 0;" />
        <p style="font-size: 12px; color: #777; text-align: center; font-style: italic;">
          Stay Healthy, Stay Natural!<br />
          <strong>Team Farm2Flake ❤️</strong>
        </p>
      </div>
      `,
      attachments: [
        {
          filename: `Invoice_${order.order_id}.pdf`,
          content: pdfBuffer
        }
      ]
    })

    console.log("Invoice email sent")
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendInvoiceEmail