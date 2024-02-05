import type { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type PostVideoProps = {
  block: VideoBlockObjectResponse;
};

export const PostVideo = ({ block }: PostVideoProps) => {
  return block.video.type === "external" ? (
    <iframe
      title={block.id}
      className="w-full aspect-video my-10"
      src={block.video.external.url}
    ></iframe>
  ) : null;
};
