import { getTopArtists } from '../../lib/spotify'

export default async function handler(_, res) {
   const response = await getTopArtists()
   const { items } = await response.json()

   const artists = items.slice(0, 10).map(artist => ({
      artist: artist.name,
      genre: artist.genres,
      image: artist.images[0],
      artistUrl: artist.external_urls.spotify,
   }))

   return res.status(200).json({ artists })
}
