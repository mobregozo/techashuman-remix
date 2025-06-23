import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

type PostParagraphProps = {
  block: Array<RichTextItemResponse>
}

export const RichText = ({ block }: PostParagraphProps) => {
  return (
    <p className="lead my-2 whitespace-pre-line font-light">
      {block.map((item, index) => (
        <PostText key={index} text={item} />
      ))}
    </p>
  )
}
