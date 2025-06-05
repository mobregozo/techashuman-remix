import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export const PostText = ({ text }: { text: RichTextItemResponse }) => {
  if (text.type === 'text') {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text: { content, link },
    } = text
    const className = [
      bold ? 'font-bold' : '',
      code ? '' : '',
      italic ? 'italic' : '',
      strikethrough ? 'line-through' : '',
      underline ? 'underline' : '',
    ].join(' ')

    if (link !== null) {
      return (
        <a
          href={link.url}
          className={`${className} text-primary-700 dark:text-primary-500 font-medium hover:underline`}
        >
          {content}
        </a>
      )
    } else {
      return <span className={className}>{content}</span>
    }
  }

  return <></>
}
