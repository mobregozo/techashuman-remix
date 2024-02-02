import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const PostText = ({ text }: { text: RichTextItemResponse }) => {
  if (text.type === "text") {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text: { content, link },
    } = text;
    const className = [
      bold ? "text-gray-700 dark:text-gray-400 font-bold" : "",
      code ? "" : "",
      italic ? "italic" : "",
      strikethrough ? "line-through" : "",
      underline ? "underline" : "",
    ].join(" ");

    if (link !== null) {
      return (
        <a
          href={link.url}
          className={`${className} text-primary-700 font-semibold hover:underline dark:text-primary-500`}
        >
          {content}
        </a>
      );
    } else {
      return (
        <span className={className} data-testid="text-component">
          {content}
        </span>
      );
    }
  }

  return <></>;
};
