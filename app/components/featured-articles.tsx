import type { ArticleMetadata } from "@/utils/read-posts.server";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router";

type FeaturedArticleProps = {
  article: ArticleMetadata;
};

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(article.date));

  return (
    <Link to={`/blog/${article.slug}`} viewTransition className="flex-1">
      <article className='h-full rounded-xl border border-gray-200 p-8 hover:opacity-80 dark:border-gray-700'>
        <h2
          className="mb-3 font-bold text-3xl text-secondary-700 dark:text-secondary-500"
          style={{ viewTransitionName: `${article.slug}-title` }}
        >
          {article.title}
        </h2>
        <div className="mb-3 flex items-center text-gray-500 text-sm dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {formattedDate}
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {article.readingTime} min read
          </div>
        </div>
        <p className='text-gray-600 text-lg dark:text-gray-300'>{article.subtitle}</p>
      </article>
    </Link>
  );
}
