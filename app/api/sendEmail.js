export default function sendEmail(req, res) {
   const MAIL_API = process.env.MAIL_API
   res.status(200)
   res.JSON({ mail_key: MAIL_API })
}
