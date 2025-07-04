import { VinylItem } from '@/components/vinyl-item'
import { MAIN_URL } from '@/utils/constants'
import { generateTags } from '@/utils/generate-tags'
import { useState } from 'react'
import { Route } from './+types/vinyls'

export const meta = ({ data }: Route.MetaArgs) => {
  const tags = generateTags({
    title: 'My Vinyl Collection',
    siteUrl: `${data?.baseUrl}/about/vinyls`,
    image: `${data?.baseUrl}/assets/vinyl-og.png`,
  })

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'My Vinyl Collection',
    url: `${MAIN_URL}/about/vinyls`,
    description:
      "A collection of vinyl records from Manuel Obregozo's personal music collection, showcasing musical taste and influences.",
  }

  return [
    ...tags,
    {
      'script:ld+json': structuredData,
    },
  ]
}

type Release = {
  id: number
  basic_information: {
    artists: { name: string; anv: string }[]
    title: string
    year: string
    thumb: string
  }
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = process.env.DISCOGS_API_TOKEN
  const username = process.env.DISCOGS_USERNAME
  const baseUrl = process.env.BASE_URL || new URL(request.url).origin

  if (!token || !username) {
    throw new Error('Discogs token or username is not provided.')
  }

  // Discogs API URL to fetch the user's collection from the default folder (folder_id=0)
  const discogsApiUrl = `https://api.discogs.com/users/${username}/collection/folders/0/releases?token=${token}&page=1&per_page=100`

  const response = await fetch(discogsApiUrl)

  if (!response.ok) {
    throw new Error('Error fetching collection from Discogs')
  }

  const data = (await response.json()) as { releases: Release[] }

  const albums = data.releases.map((release) => {
    return {
      id: release.id,
      artist: release.basic_information.artists[0].anv
        ? release.basic_information.artists[0].anv
        : release.basic_information.artists[0].name,
      album: release.basic_information.title,
      year: parseInt(release.basic_information.year),
      cover: release.basic_information.thumb,
    }
  })

  return { albums, baseUrl }
}

// Decade quick filters
const decades = [
  { label: '70s', filter: (year: number) => year >= 1970 && year < 1980 },
  { label: '80s', filter: (year: number) => year >= 1980 && year < 1990 },
  { label: '90s', filter: (year: number) => year >= 1990 && year < 2000 },
  { label: '00+', filter: (year: number) => year >= 2000 },
]

export default function Vinyls({ loaderData }: Route.ComponentProps) {
  const { albums } = loaderData

  const [artistFilter, setArtistFilter] = useState('')
  const [albumFilter, setAlbumFilter] = useState('')
  const [activeDecades, setActiveDecades] = useState<string[]>([])

  const toggleDecade = (decade: string) => {
    setActiveDecades((prev) =>
      prev.includes(decade)
        ? prev.filter((d) => d !== decade)
        : [...prev, decade],
    )
  }

  const filteredAlbums = albums.filter((album) => {
    const matchesArtist = album.artist
      .toLowerCase()
      .includes(artistFilter.toLowerCase())
    const matchesAlbum = album.album
      .toLowerCase()
      .includes(albumFilter.toLowerCase())
    const matchesDecade =
      activeDecades.length === 0 ||
      activeDecades.some((decade) =>
        decades.find((d) => d.label === decade)?.filter(album.year),
      )
    return matchesArtist && matchesAlbum && matchesDecade
  })

  return (
    <div className="mx-auto w-full space-y-6 dark:text-gray-100">
      <div className="group mt-4 mb-12 flex items-center gap-4 font-bold text-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="512"
          height="512"
          viewBox="0 0 512 512"
          className="h-14 w-14 transition-transform duration-300 ease-in-out group-hover:animate-spin"
          enableBackground="new 0 0 512 512"
        >
          <g id="vinyl_record">
            <g>
              <path
                fill="#434A54"
                d="M256,0C114.609,0,0,114.617,0,256c0,141.375,114.609,256,256,256c141.375,0,256-114.625,256-256    C512,114.617,397.375,0,256,0z M256,266.664c-5.891,0-10.672-4.773-10.672-10.664s4.781-10.664,10.672-10.664    s10.656,4.773,10.656,10.664S261.891,266.664,256,266.664z"
              ></path>
            </g>
            <g>
              <path
                fill="#656D78"
                d="M197.875,118.391c18.391-7.781,37.953-11.727,58.125-11.727c5.891,0,10.656-4.773,10.656-10.664    S261.891,85.336,256,85.336c-94.266,0-170.672,76.406-170.672,170.664c0,5.891,4.781,10.664,10.672,10.664    s10.656-4.773,10.656-10.664c0-20.172,3.953-39.727,11.734-58.117c7.516-17.781,18.297-33.758,32.016-47.477    S180.094,125.914,197.875,118.391z"
              ></path>
              <path
                fill="#656D78"
                d="M314.109,393.609c-18.391,7.781-37.938,11.734-58.109,11.734c-5.891,0-10.672,4.766-10.672,10.656    s4.781,10.656,10.672,10.656c94.25,0,170.656-76.406,170.656-170.656c0-5.891-4.766-10.664-10.656-10.664    s-10.672,4.773-10.672,10.664c0,20.172-3.938,39.719-11.719,58.125c-7.531,17.781-18.297,33.75-32.016,47.469    S331.891,386.094,314.109,393.609z"
              ></path>
              <path
                fill="#656D78"
                d="M181.266,79.078C204.922,69.07,230.062,64,256,64c5.891,0,10.656-4.773,10.656-10.664    S261.891,42.664,256,42.664C138.172,42.664,42.656,138.18,42.656,256c0,5.891,4.781,10.664,10.672,10.664S64,261.891,64,256    c0-25.93,5.062-51.07,15.078-74.727c9.672-22.859,23.516-43.398,41.156-61.039S158.406,88.75,181.266,79.078z"
              ></path>
              <path
                fill="#656D78"
                d="M256,149.336c5.891,0,10.656-4.781,10.656-10.672S261.891,128,256,128l0,0c-70.703,0-128,57.305-128,128    c0,5.891,4.766,10.664,10.656,10.664s10.672-4.773,10.672-10.664c0-28.492,11.094-55.281,31.234-75.422    c20.156-20.148,46.938-31.242,75.422-31.242H256z"
              ></path>
              <path
                fill="#656D78"
                d="M245.328,373.344c0,5.875,4.781,10.656,10.672,10.656c70.688,0,128-57.312,128-128    c0-5.891-4.781-10.664-10.672-10.664s-10.672,4.773-10.672,10.664c0,28.5-11.094,55.281-31.234,75.422    S284.484,362.656,256,362.656C250.109,362.656,245.328,367.438,245.328,373.344z"
              ></path>
              <path
                fill="#656D78"
                d="M458.656,245.336c-5.891,0-10.656,4.773-10.656,10.664c0,25.938-5.078,51.062-15.078,74.719    c-9.672,22.875-23.516,43.406-41.156,61.047s-38.188,31.484-61.047,41.156C307.062,442.938,281.922,448,256,448    c-5.891,0-10.672,4.781-10.672,10.656c0,5.906,4.781,10.688,10.672,10.688c117.812,0,213.328-95.531,213.328-213.344    C469.328,250.109,464.547,245.336,458.656,245.336z"
              ></path>
            </g>
            <path
              fill="#ED5564"
              d="M256,181.336c-41.172,0-74.672,33.492-74.672,74.664s33.5,74.656,74.672,74.656   s74.656-33.484,74.656-74.656S297.172,181.336,256,181.336z M256,266.664c-5.891,0-10.672-4.773-10.672-10.664   s4.781-10.664,10.672-10.664s10.656,4.773,10.656,10.664S261.891,266.664,256,266.664z"
            ></path>
            <path
              fill="#DA4453"
              d="M256,170.664c-47.125,0-85.344,38.211-85.344,85.336s38.219,85.344,85.344,85.344   s85.328-38.219,85.328-85.344S303.125,170.664,256,170.664z M256,320c-35.297,0-64-28.719-64-64c0-35.289,28.703-64,64-64   c35.281,0,64,28.711,64,64C320,291.281,291.281,320,256,320z"
            ></path>
          </g>
        </svg>
        <h1 className="font-medium text-4xl text-primary-700 tracking-tight md:text-6xl dark:text-white">
          My vinyl collection
        </h1>
      </div>
      <p>
        Music has always been a window into who we are, and my vinyl collection
        is no exception. Each record in my collection tells a story—of artists
        who inspire me, genres I adore, and moments tied to unforgettable
        memories.
      </p>
      <blockquote>
        <p>
          <span className="font-semibold italic">
            "You can tell a lot about a person by what's on their playlist."
          </span>{' '}
          – Begin Again.
        </p>
      </blockquote>
      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="artist"
            className="mb-2 block font-bold text-gray-300 text-sm"
          >
            Artist
          </label>
          <input
            id="artist"
            placeholder="Filter by artist..."
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="album"
            className="mb-2 block font-bold text-gray-300 text-sm"
          >
            Album
          </label>
          <input
            id="album"
            placeholder="Filter by album name..."
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="dark:text-gray-300">Filter by decade</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {decades.map((decade) => (
            <span
              key={decade.label}
              className={`cursor-pointer rounded-md border px-2.5 py-0.5 font-semibold text-xs transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                activeDecades.includes(decade.label)
                  ? 'bg-white text-gray-600'
                  : 'focus:outline-none'
              } `}
              onClick={() => toggleDecade(decade.label)}
            >
              {decade.label}
            </span>
          ))}
          <span
            className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-white px-2.5 py-0.5 font-semibold text-gray-600 text-xs shadow transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:hover:bg-gray-400"
            onClick={() => setActiveDecades([])}
          >
            {' '}
            Clear{' '}
          </span>
        </div>
      </div>

      <div className="grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:grid">
        {filteredAlbums.map((album) => (
          <div key={album.id}>
            <VinylItem album={album} />
          </div>
        ))}
      </div>
    </div>
  )
}
