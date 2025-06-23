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
        className="mx-auto my-10 aspect-video"
        src={block.embed?.url}
      ></iframe>
    )
  }

  return block.embed ? <a href={block.embed.url}>{block.embed.url}</a> : null
}
