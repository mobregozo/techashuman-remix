type VinylListItemProps = {
  album: {
    id: number
    artist: string
    album: string
    year: number
    cover: string
    country?: string
  }
}

export const VinylItem = ({ album }: VinylListItemProps) => {
  return (
    <div
      key={album.id}
      className="group mb-4 flex items-start gap-6 hover:opacity-70 sm:mb-0 sm:block sm:text-center"
      style={{ contentVisibility: 'auto' }}
    >
      <img
        src={album.cover}
        alt={`${album.album} by ${album.artist}`}
        className="aspect-square h-24 w-24 rounded-md object-cover shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-full sm:w-full"
        style={{ viewTransitionName: album.album }}
      />
      <div>
        <p className="text-lg font-semibold sm:mt-2 sm:text-sm dark:text-gray-200">
          {album.album} ({album.year})
        </p>
        <p className="text-md text-gray-600 sm:text-xs dark:text-gray-400">
          {album.artist}
        </p>
        {album.country && (
          <p className="text-md text-gray-800 sm:text-xs dark:text-gray-200">
            {album.country}
          </p>
        )}
      </div>
    </div>
  )
}
