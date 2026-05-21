type MarkdownContentProps = {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <article
      className={[
        'scroll-transform-prose prose prose-lg md:prose-xl mx-0 w-full max-w-screen font-light',
        'prose-img:mx-auto prose-img:rounded-lg',
        'prose-video:mx-auto prose-video:my-6 prose-video:w-full prose-video:rounded-lg',
        'prose-table:border-collapse',
        'prose-td:border prose-td:border-gray-600',
        'prose-th:border prose-th:border-gray-600 prose-th:bg-gray-800',
        'prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-700',
        'prose-code:text-amber-600 dark:prose-code:text-amber-400',
        'prose-blockquote:my-2 prose-blockquote:w-full prose-blockquote:border-primary-500 prose-blockquote:border-l-4 prose-blockquote:bg-gray-100 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-gray-400 dark:prose-blockquote:bg-gray-800',
        'prose-a:text-primary-600',
        'prose-headings:text-gray-100',
        'prose-h2:scroll-mt-32 prose-h2:font-medium prose-h2:text-4xl prose-h2:text-primary-600 prose-h2:tracking-tight dark:prose-h2:text-primary-500',
        'prose-h3:text-2xl prose-h3:text-secondary-500 dark:prose-h3:text-secondary-400',
        'prose-p:whitespace-break-spaces prose-p:text-[var(--color-body-copy)] dark:prose-p:text-[var(--color-body-copy-dark)] [&_p]:my-3',
        'prose-strong:font-medium prose-strong:text-[var(--color-body-copy-strong)] dark:prose-strong:text-[var(--color-body-copy-strong)]',
        'prose-ol:text-[var(--color-body-copy)] dark:prose-ol:text-[var(--color-body-copy-dark)]',
        'prose-ul:my-1 prose-ul:text-[var(--color-body-copy)] dark:prose-ul:text-[var(--color-body-copy-dark)]',
        'prose-li:my-0',
        'prose-[br]:my-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
