import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type PostCodeProps = {
  block: CodeBlockObjectResponse;
};

export const PostCode = ({ block }: PostCodeProps) => {
  let code = "";
  for (let index = 0; index < block.code.rich_text.length; index++) {
    const element = block.code.rich_text[index];
    code += element.plain_text;
  }

  return (
    <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md whitespace-pre-line">
      {code}
    </p>
  );
};
