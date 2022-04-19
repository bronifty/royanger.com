// import nodemailer from 'nodemailer'
import AWS from 'aws-sdk'

// because of the way the aws-ask handles the promise, next throws a false warning
// disable that false warning
export const config = {
   api: {
      externalResolver: true,
   },
}

AWS.config.update({
   region: process.env.AWS_EMAIL_REGION,
   accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY,
   secretAccessKey: process.env.AWS_EMAIL_ACCESS_SECRET,
})

async function sendEmail({ name, email, phone, message }) {
   const msg = `This is an email submitted from https://royanger.dev\n\nName: ${name}\n${phone}\n${email}\n\nMessage:\n${message}`

   const params = {
      Destination: {
         ToAddresses: ['hey@royanger.dev'],
      },
      Message: {
         Body: {
            Text: {
               Charset: 'UTF-8',
               Data: msg,
            },
         },
         Subject: {
            Charset: 'UTF-8',
            Data: `Contact from ${name}`,
         },
      },
      Source: 'hey@royanger.dev',
      ReplyToAddresses: [email],
   }

   // Create the promise and SES service object
   var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(params)
      .promise()

   // Handle promise's fulfilled/rejected states
   sendPromise
      .then(async function (data) {
         console.log('succcess', data.MessageId)

         return await data.MessageId
      })
      .catch(function (err) {
         console.error(err, err.stack)
      })
}

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const msg = `This is an email submitted from https://royanger.dev\n\nName: ${req.query.name}\n${req.query.phone}\n${req.query.email}\n\nMessage:\n${req.query.message}`

      const params = {
         Destination: {
            ToAddresses: ['hey@royanger.dev'],
         },
         Message: {
            Body: {
               Text: {
                  Charset: 'UTF-8',
                  Data: msg,
               },
            },
            Subject: {
               Charset: 'UTF-8',
               Data: `[test] Contact from ${req.query.name}`,
            },
         },
         Source: 'hey@royanger.dev',
         ReplyToAddresses: [req.query.email],
      }

      // Create the promise and SES service object
      var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
         .sendEmail(params)
         .promise()

      // Handle promise's fulfilled/rejected states
      sendPromise
         .then(async function (data) {
            console.log('succcess', data.MessageId)

            return res
               .status(200)
               .json({ message: `Email sent successfully ${data.MessageId}` })
         })
         .catch(function (err) {
            console.log('error')

            console.error(err, err.stack)
            return res.status(200).json({ message: `Email sent successfully` })
         })
   } else {
      return res.status(400).json({
         message: `Incorrect method: ${req.method}. Did you mean POST?`,
      })
   }
}
