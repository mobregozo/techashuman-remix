import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostParagraph } from "./post-paragraph";
import { PostHeading } from "./post-heading";
import { PostQuote } from "./post-quote";
import { PostList } from "./post-list";
import { PostCode } from "./post-code";
import { PostVideo } from "./post-video";
import { PostEmbed } from "./post-embed";
import { PostImage } from "./post-image";

export const Block = ({
  block,
}: {
  block: PartialBlockObjectResponse | BlockObjectResponse;
}) => {
  if ("type" in block) {
    const blockObject = block as BlockObjectResponse;
    switch (blockObject.type) {
      case "paragraph":
        return <PostParagraph block={blockObject} />;
      case "quote":
        return <PostQuote block={blockObject} />;
      case "heading_1":
      case "heading_2":
      case "heading_3":
        return <PostHeading block={blockObject} />;
      case "bulleted_list_item":
      case "numbered_list_item":
        return <PostList block={blockObject} />;
      case "video":
        return <PostVideo block={blockObject} />;
      case "code":
        return <PostCode block={blockObject} />;
      case "embed":
        return <PostEmbed block={blockObject} />;
      case "image":
        return <PostImage block={blockObject} />;
      default:
        return <></>;
    }
  } else {
    return <></>;
  }
};
