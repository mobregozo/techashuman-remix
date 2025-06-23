import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

type PostQuoteProps = {
  block: QuoteBlockObjectResponse
}

export const PostQuote = ({ block }: PostQuoteProps) => {
  return (
    <p className="lead prose-blockquote border-primary-700 border-l-4 pl-4 dark:border-primary-500">
      {block.quote.rich_text.map((item, index) => (
        <PostText key={`${block.id}-${index}`} text={item} />
      ))}
    </p>
  )
}
