import { getTopTracks } from '../../lib/api/spotify'

export default async function handler(_, res) {
   const response = await getTopTracks()
   const { items } = await response.json()

   const tracks = items.slice(0, 10).map(track => ({
      artist: track.artists.map(_artist => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      album: {
         name: track.album.name,
         albumUrl: track.album.external_urls.spotify,
      },
      image: track.album.images[0],
   }))

   return res.status(200).json({ tracks })
}
