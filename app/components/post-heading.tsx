import type {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostText } from "./post-text";

export type PostHeadingProps = {
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse;
};

export const PostHeading = ({ block }: PostHeadingProps) => {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="mt-12 text-5xl tracking-wide text-primary-700 dark:text-white font-semibold">
          {block.heading_1.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-3xl text-primary-700 dark:text-secondary-400 tracking-tighter">
          {block.heading_2.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h2>
      );
    case "heading_3":
    default:
      return (
        <h3 className="text-4xl text-gray-700 dark:text-white tracking-tighter mt-2 mb-4">
          {block.heading_3.rich_text.map((item, index) => (
            <PostText key={`${block.id}-${index}`} text={item} />
          ))}
        </h3>
      );
  }
};
