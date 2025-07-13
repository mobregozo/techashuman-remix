type MarkdownContentProps = {
  content: string
  className?: string
}

export function MarkdownContent({
  content,
  className = '',
}: MarkdownContentProps) {
  return (
    <div
      className={`prose mx-0 prose-img:mx-auto prose-video:mx-auto prose-video:my-6 prose-video:w-full w-full max-w-screen prose-table:border-collapse prose-img:rounded-lg prose-pre:rounded-lg prose-video:rounded-lg prose-pre:border prose-td:border prose-th:border prose-blockquote:border-primary-500 prose-pre:border-gray-700 prose-td:border-gray-600 prose-th:border-gray-600 prose-blockquote:border-l-4 prose-blockquote:bg-gray-800 prose-th:bg-gray-800 prose-a:text-primary-400 prose-blockquote:text-gray-400 prose-h2:text-primary-400 prose-h3:text-secondary-400 prose-headings:text-gray-100 prose-ol:text-gray-300 prose-p:text-gray-300 prose-strong:text-gray-100 prose-ul:text-gray-300 ${className}`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}
