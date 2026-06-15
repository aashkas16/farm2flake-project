/* eslint-disable no-undef */
const nodemailer = require("nodemailer")
const PDFDocument = require("pdfkit")
const fs = require("fs")
const path = require("path")
const https = require("https")
const http = require("http")

// Helper function to fetch remote URLs as a Buffer
const fetchUrlBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http
    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to load image, status code: ${res.statusCode}`))
        return
      }
      const data = []
      res.on("data", (chunk) => data.push(chunk))
      res.on("end", () => resolve(Buffer.concat(data)))
    }).on("error", (err) => reject(err))
  })
}

// Helper function to load local file or fetch remote image
const getLocalOrRemoteImage = async (imgUrl) => {
  if (!imgUrl) return null
  
  // 1. Try local filesystem if it contains uploads path
  try {
    const uploadIndex = imgUrl.indexOf("uploads/")
    if (uploadIndex !== -1) {
      const relativePath = imgUrl.substring(uploadIndex)
      const localPath = path.join(__dirname, "..", relativePath)
      if (fs.existsSync(localPath)) {
        return fs.readFileSync(localPath)
      }
    }
  } catch (err) {
    console.log("Local image read error:", err.message)
  }

  // 2. Fetch remote if it is a valid HTTP URL
  if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
    try {
      return await fetchUrlBuffer(imgUrl)
    } catch (err) {
      console.log(`Failed to fetch remote image (${imgUrl}):`, err.message)
    }
  }
  return null
}

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

    // PDF SETUP (A4 Dimensions: 595.28 x 841.89 points)
    const doc = new PDFDocument({ margin: 40, size: "A4" })
    const buffers = []

    doc.on("data", buffers.push.bind(buffers))

    const pdfPromise = new Promise((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers))
      })
    })

    // 1. HEADER BRANDING BAND (Natural Green Color Palette)
    doc.rect(40, 40, 515, 6).fill("#2D5A2D")

    // 2. LOGO IMAGE & COMPANY TITLE (Left Column)
    const logoPath = path.join(__dirname, "../logo.jpeg")
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 40, 55, { width: 50, height: 50 })
      doc.fillColor("#1D3B1D")
         .font("Helvetica-Bold")
         .fontSize(22)
         .text("Farm2Flake", 100, 60)
    } else {
      doc.fillColor("#1D3B1D")
         .font("Helvetica-Bold")
         .fontSize(22)
         .text("Farm2Flake", 40, 60)
    }

    doc.fillColor("#6B7280")
       .font("Helvetica-Oblique")
       .fontSize(8.5)
       .text("Crafted by Nature, Perfected by Process", logoPath ? 100 : 40, 85)

    // 3. COMPANY CONTACT DETAILS (Right Column)
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
    doc.moveTo(40, 134)
       .lineTo(555, 134)
       .strokeColor("#E5E7EB")
       .lineWidth(1)
       .stroke()

    // 5. CUSTOMER INFORMATION & ADDRESS CARDS (Parallel layouts with soft gray borders)
    const cardY = 145
    const cardHeight = 90

    // Card 1: Bill & Invoice To
    doc.rect(40, cardY, 250, cardHeight).fillAndStroke("#FAF7F2", "#E5E7EB")
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(8.5).text("BILL & INVOICE TO:", 50, cardY + 10)
    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(10.5).text(order.customer_name || "Valued Customer", 50, cardY + 23)
    doc.font("Helvetica").fontSize(8.5).fillColor("#4B5563")
    doc.text(`Phone: ${order.phone || "N/A"}`, 50, cardY + 39)
    doc.text(`Email: ${order.email || "N/A"}`, 50, cardY + 51)
    doc.text(`City: ${order.city || "Gujarat, India"}`, 50, cardY + 63)

    // Card 2: Shipping Destination
    doc.rect(305, cardY, 250, cardHeight).fillAndStroke("#FAF7F2", "#E5E7EB")
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(8.5).text("SHIPPING DESTINATION:", 315, cardY + 10)
    
    const addressPieces = [order.address, order.landmark, `${order.city || ""}` + (order.pincode ? ` - ${order.pincode}` : "")].filter(Boolean)
    const fullAddress = addressPieces.join(", ")
    
    doc.fillColor("#111827").font("Helvetica").fontSize(8.5)
    doc.text(order.customer_name || "Valued Customer", 315, cardY + 23)
    doc.fillColor("#4B5563")
    doc.text(fullAddress || "Gujarat, India", 315, cardY + 39, { width: 230, height: 40 })

    // 6. INVOICE META BAR (Card styled layout with background fill)
    const metaY = 243
    doc.rect(40, metaY, 515, 38).fillAndStroke("#F4F8F4", "#E5E7EB")

    // Invoice ID
    doc.fillColor("#4B5563").font("Helvetica").fontSize(8.5).text("Invoice Number", 50, metaY + 8)
    doc.fillColor("#1D3B1D").font("Helvetica-Bold").fontSize(9.5).text(order.order_id, 50, metaY + 20)

    // Date
    const orderDateStr = order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
    doc.fillColor("#4B5563").font("Helvetica").fontSize(8.5).text("Invoice Date", 210, metaY + 8)
    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(9.5).text(orderDateStr, 210, metaY + 20)

    // Order Status (Styled Badge)
    doc.fillColor("#4B5563").font("Helvetica").fontSize(8.5).text("Order Status", 350, metaY + 8)
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(9.5).text("Confirmed", 350, metaY + 20)

    // Payment Info
    doc.fillColor("#4B5563").font("Helvetica").fontSize(8.5).text("Payment Method", 460, metaY + 8)
    doc.fillColor("#D97706").font("Helvetica-Bold").fontSize(9.5).text("COD / Cash", 460, metaY + 20)

    // 7. PRODUCT CATALOG TABLE HEADER
    doc.rect(40, 292, 515, 20).fill("#2D5A2D")
    doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(8.5)
    doc.text("Product", 45, 298)
    doc.text("Variant", 320, 298, { width: 60, align: "center" })
    doc.text("Qty", 380, 298, { width: 40, align: "center" })
    doc.text("Unit Price", 420, 298, { width: 65, align: "right" })
    doc.text("Total", 490, 298, { width: 60, align: "right" })

    // 8. PRODUCT ROWS WITH DYNAMIC THUMBNAILS
    let yVal = 312
    for (let i = 0; i < products.length; i++) {
      const item = products[i]

      // Alternating row color
      if (i % 2 === 0) {
        doc.rect(40, yVal, 515, 30).fill("#F4F8F4")
      }

      // Load Product Thumbnail Buffer (local/remote)
      let imgBuffer = null
      try {
        imgBuffer = await getLocalOrRemoteImage(item.image)
      } catch (err) {
        console.log("Image load error:", err.message)
      }

      // Render Image Thumbnail
      if (imgBuffer) {
        try {
          doc.image(imgBuffer, 45, yVal + 3, { width: 24, height: 24 })
        } catch (err) {
          // Draw a natural placeholder leaf box on image parsing error
          doc.roundedRect(45, yVal + 3, 24, 24, 4).fill("#FAF7F2")
          doc.roundedRect(45, yVal + 3, 24, 24, 4).strokeColor("#2D5A2D").lineWidth(0.5).stroke()
          doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(7).text("🌿", 52, yVal + 9)
        }
      } else {
        // Draw leaf placeholder
        doc.roundedRect(45, yVal + 3, 24, 24, 4).fill("#FAF7F2")
        doc.roundedRect(45, yVal + 3, 24, 24, 4).strokeColor("#2D5A2D").lineWidth(0.5).stroke()
        doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(7).text("🌿", 52, yVal + 9)
      }

      // Product Details Text
      doc.fillColor("#111827").font("Helvetica-Bold").fontSize(8.5)
      doc.text(item.product_name, 75, yVal + 10, { width: 240, height: 15, ellipsis: true })

      doc.font("Helvetica").fontSize(8.5).fillColor("#4B5563")
      doc.text(item.size || "100g", 320, yVal + 10, { width: 60, align: "center" })
      doc.text(item.quantity.toString(), 380, yVal + 10, { width: 40, align: "center" })

      const qty = parseFloat(item.quantity) || 1
      const totalVal = parseFloat(item.price) || 0
      const unitVal = totalVal / qty

      doc.text(`₹${unitVal.toFixed(2)}`, 420, yVal + 10, { width: 65, align: "right" })
      
      doc.font("Helvetica-Bold").fillColor("#111827")
      doc.text(`₹${totalVal.toFixed(2)}`, 490, yVal + 10, { width: 60, align: "right" })

      // Bottom Row Border
      doc.moveTo(40, yVal + 30).lineTo(555, yVal + 30).strokeColor("#E5E7EB").lineWidth(0.5).stroke()
      yVal += 30
    }

    // 9. SUMMARY AREA & QR CODE VERIFICATION
    const bottomSectionY = yVal + 15

    // Fetch Authenticity QR Code
    let qrBuffer = null
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("Order ID: " + order.order_id + "\nVerification: Authentic Farm2Flake Order")}`
      qrBuffer = await fetchUrlBuffer(qrUrl)
    } catch (err) {
      console.log("QR Code load error:", err.message)
    }

    // Left Column: QR Code
    if (qrBuffer) {
      try {
        doc.image(qrBuffer, 40, bottomSectionY, { width: 75, height: 75 })
        doc.fillColor("#9CA3AF").font("Helvetica").fontSize(6.5)
        doc.text("Scan to verify invoice authenticity", 40, bottomSectionY + 80, { width: 120 })
      } catch (err) {
        console.log("QR draw failed:", err.message)
      }
    }

    // Center Column: Payment Details Card
    doc.roundedRect(130, bottomSectionY, 175, 75, 4).fillAndStroke("#F4F8F4", "#E5E7EB")
    doc.fillColor("#1D3B1D").font("Helvetica-Bold").fontSize(8.5).text("PAYMENT INFORMATION", 140, bottomSectionY + 8)
    doc.font("Helvetica").fontSize(7.5).fillColor("#4B5563")
    doc.text("Method:", 140, bottomSectionY + 22)
    doc.font("Helvetica-Bold").fillColor("#111827").text("Cash on Delivery (COD)", 140, bottomSectionY + 31)
    doc.font("Helvetica").fillColor("#4B5563").text("Status:", 140, bottomSectionY + 45)
    doc.font("Helvetica-Bold").fillColor("#2D5A2D").text("Pending Delivery verification", 140, bottomSectionY + 54)

    // Right Column: Summary Calculation Card
    doc.roundedRect(320, bottomSectionY, 235, 75, 4).fillAndStroke("#FAF7F2", "#2D5A2D")
    doc.fillColor("#1D3B1D").font("Helvetica-Bold").fontSize(8.5).text("ORDER SUMMARY", 330, bottomSectionY + 8)

    doc.font("Helvetica").fontSize(7.5).fillColor("#4B5563")
    doc.text("Subtotal:", 330, bottomSectionY + 22)
    
    const formattedTotal = parseFloat(order.total_amount) || 0
    doc.text(`₹${formattedTotal.toFixed(2)}`, 330, bottomSectionY + 22, { width: 215, align: "right" })

    doc.text("Shipping & Handling:", 330, bottomSectionY + 32)
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").text("FREE", 330, bottomSectionY + 32, { width: 215, align: "right" })

    doc.font("Helvetica").fillColor("#4B5563").text("Estimated GST:", 330, bottomSectionY + 42)
    doc.text("₹0.00", 330, bottomSectionY + 42, { width: 215, align: "right" })

    // Total divider
    doc.moveTo(330, bottomSectionY + 52).lineTo(545, bottomSectionY + 52).strokeColor("#2D5A2D").lineWidth(0.5).stroke()

    doc.fillColor("#111827").font("Helvetica-Bold").fontSize(9.5).text("Grand Total:", 330, bottomSectionY + 58)
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(11).text(`₹${formattedTotal.toFixed(2)}`, 330, bottomSectionY + 57, { width: 215, align: "right" })

    // 10. BRAND FOOTER SIGN-OFF (Positioned fixed near page bottom)
    doc.moveTo(40, 730).lineTo(555, 730).strokeColor("#2D5A2D").lineWidth(0.7).stroke()
    
    doc.fillColor("#2D5A2D").font("Helvetica-Bold").fontSize(10).text("Thank you for supporting organic agriculture! Pure • Clean • Honest", 40, 742, { align: "center" })
    
    doc.fillColor("#6B7280").font("Helvetica").fontSize(8)
    doc.text("If you have any questions about this invoice, please contact us at farm2flake@gmail.com", 40, 757, { align: "center" })
    doc.text("Visit us at www.farm2flake.com | Instagram: @farm2flake_official", 40, 769, { align: "center" })

    doc.end()

    const pdfBuffer = await pdfPromise

    // EMAIL SEND
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