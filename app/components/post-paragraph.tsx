import { PostText } from "./post-text";
import type { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type PostParagraphProps = {
  block: ParagraphBlockObjectResponse;
};

export const PostParagraph = ({ block }: PostParagraphProps) => {
  return (
    <p className="my-2 font-light">
      {block.paragraph.rich_text.map((item, index) => (
        <PostText key={`${block.id}-${index}`} text={item} />
      ))}
    </p>
  );
};
