const nodemailer = require("nodemailer")

const sendOrderStatusEmail = async (order, status) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    let subject = ""
    let htmlContent = ""

    if (status === "confirmed") {
      subject = `Farm2Flake Order Confirmed - ${order.order_id}`
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #edf1e8; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 40px;">🌿</span>
          </div>
          <h1 style="color: #1D3B1D; text-align: center; font-size: 24px;">Your Order is Confirmed!</h1>
          <p style="font-size: 16px; line-height: 1.5;">Hi ${order.customer_name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Great news! Your order <strong>#${order.order_id}</strong> has been officially confirmed by our team. We are preparing your order of premium freeze-dried nutrition ingredients with care.</p>
          <p style="font-size: 16px; line-height: 1.5;">We will send you another update once your package has been shipped and is on its way to you.</p>
          <hr style="border: 0; border-top: 1px solid #edf1e8; margin: 20px 0;" />
          <p style="font-size: 14px; color: #666; text-align: center;">Thank you for choosing Farm2Flake.<br/>Pure Nutrition, Direct from Nature.</p>
        </div>
      `
    } else if (status === "delivered") {
      subject = `Farm2Flake Order Delivered - ${order.order_id}`
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #edf1e8; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 40px;">🎉</span>
          </div>
          <h1 style="color: #1D3B1D; text-align: center; font-size: 24px;">Your Order Has Been Delivered!</h1>
          <p style="font-size: 16px; line-height: 1.5;">Hi ${order.customer_name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Your order <strong>#${order.order_id}</strong> has been successfully delivered to your shipping address.</p>
          <p style="font-size: 16px; line-height: 1.5;">We hope you love your 100% pure freeze-dried fruits, vegetables, and herbs! If you have a moment, we would highly appreciate it if you could share your feedback and experience by leaving a review on our storefront.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://farm2flake.onrender.com" style="background-color: #2F7C1F; color: #FAF7F2; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Share Your Review</a>
          </div>
          <hr style="border: 0; border-top: 1px solid #edf1e8; margin: 20px 0;" />
          <p style="font-size: 14px; color: #666; text-align: center;">Thank you for choosing Farm2Flake.<br/>Pure Nutrition, Direct from Nature.</p>
        </div>
      `
    } else {
      return
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.email,
      subject: subject,
      html: htmlContent
    })

    console.log(`Order status email for ${status} sent to ${order.email}`)
  } catch (error) {
    console.error("Order status email error:", error)
  }
}

module.exports = sendOrderStatusEmail
