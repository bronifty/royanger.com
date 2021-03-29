import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
   host: process.env.MAIL_HOST,
   port: 25,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
})

async function sendEmail({ name, email, phone, message }) {
   console.log('Options:', name, email, phone, message)
   const emailOptions = {
      from: `${name} <${email}>`,
      to: 'roy@royanger.com',
      subject: `Contact - ${name}`,
      html: `
         <p>This message is from the contact form on roy@royanger.com</p>

         <p>Name: ${name}</p>
         <p>Email: ${email}</p>
         <p>Phone: ${phone}</p>
         <br />
         <p>Message: ${message}</p>
      `,
   }

   console.table(emailOptions)
   return transporter.sendMail(emailOptions)
}

export default async function handler(req, res) {
   if (req.method === 'POST') {
      console.log(req.body)
      const emailRes = await sendEmail(req.body)
      if (emailRes.messageId) {
         return res.status(200).json({ message: `Email sent successfuly` })
      }

      return res.status(400).json({ message: 'Error sending email' })
   }

   return res
      .status(400)
      .json({ message: `Incorrect method: ${req.method}. Did you mean POST?` })
}
