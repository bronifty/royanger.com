import { DisplayTweet } from './DisplayTweet'
import fetcher from '../../lib/api/fetcher'
import useSWR from 'swr'
import { Tweet } from '../../lib/types'

const Tweet = ({ id }) => {
   const { data } = useSWR<Tweet>(`/api/tweet/${id}`, fetcher)

   return <>{data && <DisplayTweet tweet={data[0]} />}</>
}

export default Tweet
