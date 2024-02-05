import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostText } from "./post-text";

export type PostListProps = {
  block:
    | NumberedListItemBlockObjectResponse
    | BulletedListItemBlockObjectResponse;
};

export const PostList = ({ block }: PostListProps) => {
  let list_item: {
    rich_text: Array<RichTextItemResponse>;
  };

  switch (block.type) {
    case "bulleted_list_item":
      list_item = block.bulleted_list_item;
      break;
    case "numbered_list_item":
      list_item = block.numbered_list_item;
      break;
  }

  return (
    <ul className="list-disc list-inside my-4 pl-0">
      <li className="mb-1 marker:m-0 dark:marker:text-white">
        {list_item.rich_text.map((item, index) => (
          <PostText key={`${block.id}-${index}`} text={item} />
        ))}
      </li>
    </ul>
  );
};
