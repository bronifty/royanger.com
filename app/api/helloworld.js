// simple function to test Serverless Functions

import { red } from 'tailwindcss/colors'

export default function helloworld(req, res) {
   res.statusCode = 200
   red.json({ Hello: 'World!' })
}
