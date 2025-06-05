import type { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

type PostQuoteProps = {
  block: QuoteBlockObjectResponse
}

export const PostQuote = ({ block }: PostQuoteProps) => {
  return (
    <p className="border-primary-700 dark:border-primary-500 lead prose-blockquote border-l-4 pl-4">
      {block.quote.rich_text.map((item, index) => (
        <PostText key={`${block.id}-${index}`} text={item} />
      ))}
    </p>
  )
}
