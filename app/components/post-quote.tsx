import { PostText } from "./post-text";
import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type PostQuoteProps = {
  block: QuoteBlockObjectResponse;
};

export const PostQuote = ({ block }: PostQuoteProps) => {
  return (
    <p className="border-l-4 border-primary-700 dark:border-primary-500 pl-4 text-gray-700 dark:text-gray-400">
      {block.quote.rich_text.map((item, index) => (
        <PostText key={`${block.id}-${index}`} text={item} />
      ))}
    </p>
  );
};
