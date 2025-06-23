import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { PostText } from './post-text'

export type PostListProps = {
  block:
    | NumberedListItemBlockObjectResponse
    | BulletedListItemBlockObjectResponse
}

export const PostList = ({ block }: PostListProps) => {
  let list_item: {
    rich_text: Array<RichTextItemResponse>
  }

  switch (block.type) {
    case 'bulleted_list_item':
      list_item = block.bulleted_list_item
      break
    case 'numbered_list_item':
      list_item = block.numbered_list_item
      break
  }

  return (
    <ul className="lead my-2 list-inside pl-0">
      {list_item.rich_text.map((item, index) => (
        <li
          className="m-0 marker:m-0 dark:marker:text-white"
          key={`${block.id}-${index}`}
        >
          <PostText text={item} />
        </li>
      ))}
    </ul>
  )
}
