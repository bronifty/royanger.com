import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
   host: process.env.MAIL_HOST,
   port: 25,
   auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
   },
})

async function sendEmail({ name, email }) {
   console.log('sendEmail function running')
   const emailOptions = {
      from: 'Vercel Serverless Functions Demo <vsf-demo@example.com>',
      to: `royanger@gmail.com`,
      subject: 'Demo Email',
      html: `<h2>Email sent from a Serverless Function</h2>`,
   }

   console.table(emailOptions)

   return transporter.sendMail(emailOptions)
}

export default async function handler(req, res) {
   console.log('ATTEMPTING TO SEND EMAIL')
   console.log(process.env.MAIL_HOST)
   console.log(process.env.MAIL_USER)
   console.log(process.env.MAIL_PASS)
   if (req.method === 'POST') {
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
