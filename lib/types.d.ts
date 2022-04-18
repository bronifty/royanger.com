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
