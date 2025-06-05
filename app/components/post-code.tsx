import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type PostCodeProps = {
  block: CodeBlockObjectResponse
}

export const PostCode = ({ block }: PostCodeProps) => {
  let code = ''
  for (let index = 0; index < block.code.rich_text.length; index++) {
    const element = block.code.rich_text[index]
    code += element.plain_text
  }

  return (
    <pre className="p-4 rounded-md bg-gray-800">
      <code className={`language-${block.code.language}`}>{code}</code>
    </pre>
  )
}
