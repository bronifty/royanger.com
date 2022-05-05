import { NextApiRequest, NextApiResponse } from 'next'
import { getTweets } from '../../../lib/api/twitter'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const tweets = await getTweets([req.query.id])
   return res.status(200).json(tweets)
}
