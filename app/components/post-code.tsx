import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type PostCodeProps = {
  block: CodeBlockObjectResponse;
};

export const PostCode = ({ block }: PostCodeProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [block]);

  let code = "";
  for (let index = 0; index < block.code.rich_text.length; index++) {
    const element = block.code.rich_text[index];
    code += element.plain_text;
  }

  return (
    <pre className="bg-gray-800 p-4 rounded-md">
      <code ref={codeRef} className={`language-${block.code.language}`}>
        {code}
      </code>
    </pre>
  );
};
