import type {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

export type PostHeadingProps = {
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
}

export const PostHeading = ({ block }: PostHeadingProps) => {
  switch (block.type) {
    case 'heading_1':
      return (
        <h1 className="mt-12 font-semibold text-5xl text-primary-700 tracking-wide dark:text-white">
          {block.heading_1.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="font-semibold text-4xl text-primary-700 tracking-tight dark:text-secondary-400">
          {block.heading_2.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h2>
      )
    case 'heading_3':
    default:
      return (
        <h3 className="mt-2 mb-4 text-4xl text-gray-700 tracking-tighter dark:text-white">
          {block.heading_3.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h3>
      )
  }
}
