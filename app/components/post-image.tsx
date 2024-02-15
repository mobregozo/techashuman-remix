import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type PostVideoProps = {
  block: ImageBlockObjectResponse;
};

export const PostImage = ({ block }: PostVideoProps) => {
  const imageType = block.image.type;
  if (imageType === "file") {
    const captionText = block.image.caption[0].plain_text ?? "blog image";
    return (
      <div className="flex justify-center">
        <img
          className="aspect-auto dark:bg-gray-200 h-72 rounded-sm dark:shadow-gray-800"
          alt={captionText}
          src={block.image.file.url}
        />
      </div>
    );
  } else return null;
};
