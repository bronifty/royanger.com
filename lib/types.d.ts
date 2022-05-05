import { BooleanArray } from 'aws-sdk/clients/rdsdataservice'

export type TopTracks = {
   tracks: Tracks[]
}

export type TopArtists = {
   artists: Artists[]
}

export type Current = {
   title: string
   album: string
   artist: string
   image: Image
   isPlaying: boolean
   songUrl: string
}

type Tracks = {
   title: string
   artist: string
   songUrl: string
   album: Album
   image: Image
}

type Artists = {
   artist: string
   artistUrl: string
   genre: string[]
   image: Image
}

export type Artist = {
   artist: string
   artistUrl: string
   genre: string[]
   image: Image
   index: number
}

export type Track = {
   title: string
   artist: string
   songUrl: string
   album: Album
   image: Image
   index: number
}

type Album = {
   albumUrl: string
   name: string
}

type Image = {
   url: string
   height: number
   width: number
}

export type Tweet = {
   id: string
   author_id: string
   created_at: string
   text: string
   author: TweetAuthor
   public_metrics: TweetPublicMetrics
   media: TweetMedia[]
   referenced_tweets: TweetReferencedTweets[]
}

type TweetAuthor = {
   id: string
   verified: boolean
   username: string
   url: string
   protected: boolean
   name: string
   profile_image_url: string
}

type TweetPublicMetrics = {
   retweet_count: number
   reply_count: number
   like_count: number
   quote_count: number
}

type TweetMedia = {
   media_key: string
   type: string
   width: number
   height: number
   url: string
}

type TweetReferencedTweets = {
   type: string
   author: TweetAuthor
   public_metrics: TweetPublicMetrics
   text: string
   id: string
   created_at: string
}
