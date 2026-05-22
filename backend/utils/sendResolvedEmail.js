// eslint-disable-next-line no-undef
const nodemailer = require("nodemailer")



const sendResolvedEmail = async (

  email,

  name,

  date

) => {

  try {

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          // eslint-disable-next-line no-undef
          user: process.env.EMAIL_USER,

          // eslint-disable-next-line no-undef
          pass: process.env.EMAIL_PASS

        }

      })



    await transporter.sendMail({

      // eslint-disable-next-line no-undef
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Farm2Flake Query Resolved",



      html: `

      <div style="font-family: Arial; padding:20px;">

        <h1 style="color:#2d5a2d;">

          Query Resolved ✅

        </h1>



        <p>

          Hi ${name},

        </p>



        <p>

          Your query submitted on
          ${date}
          has been resolved successfully.

        </p>



        <p>

          Thank you for contacting Farm2Flake 🌿

        </p>

      </div>

      `

    })

  } catch (error) {

    console.log(error)

  }

}



// eslint-disable-next-line no-undef
module.exports =
  sendResolvedEmail