import type { EmbedBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

type PostVideoProps = {
  block: EmbedBlockObjectResponse
}

export const PostEmbed = ({ block }: PostVideoProps) => {
  const url = block.embed?.url

  if (url.includes('twitter')) {
    return (
      <iframe
        title={block.id}
        width={300}
        height={700}
        className="my-10 aspect-video mx-auto"
        src={block.embed?.url}
      ></iframe>
    )
  }

  return block.embed ? <a href={block.embed.url}>{block.embed.url}</a> : null
}
