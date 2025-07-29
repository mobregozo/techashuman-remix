type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={`markdown-content ${className || ""}`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
