import type { EmbedBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type PostVideoProps = {
  block: EmbedBlockObjectResponse;
};

export const PostEmbed = ({ block }: PostVideoProps) => {
  return block.embed ? <a href={block.embed.url}>{block.embed.url}</a> : null;
};
