export type OptimizedImageProps = {
  image: {
    sources: Record<'type' | 'srcset' | 'sizes', string>
    img: {
      src: string
      width: number
      height: number
    }
  }
  alt: string
  className?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  alt,
  className,
}) => {
  const sourcesArray = Object.entries(image.sources).map(
    ([format, srcset]) => ({
      type: `image/${format}`,
      srcset: srcset,
    }),
  )

  return (
    <picture>
      {sourcesArray.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcset} />
      ))}
      <img
        src={image.img.src}
        alt={alt}
        width={image.img.width}
        height={image.img.height}
        className={className}
        loading="lazy"
      />
    </picture>
  )
}
