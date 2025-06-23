import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

type PostParagraphProps = {
  block: ParagraphBlockObjectResponse
}

export const PostParagraph = ({ block }: PostParagraphProps) => {
  return (
    <p className="lead my-2 font-light">
      {block.paragraph.rich_text.map((item, index) => (
        <PostText key={`${block.id}-${index}`} text={item} />
      ))}
    </p>
  )
}
