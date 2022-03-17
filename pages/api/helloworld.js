// simple function to test Serverless Functions

export default function helloworld(req, res) {
   res.statusCode = 200
   res.json({ Hello: 'World!' })
}
