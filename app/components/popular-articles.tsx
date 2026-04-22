import type { ArticleMetadata } from "@/utils/read-posts.server";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router";

interface PopularArticlesProps {
  articles: ArticleMetadata[];
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  return (
    <div className="lg:mt-0 lg:w-[288px]">
      <div className="mb-10 flex items-center lg:mb-6">
        <TrendingUp className="mr-2 h-8 w-8 text-gray-600 dark:text-gray-200" />
        <h2 className="font-medium text-3xl text-gray-600 dark:text-gray-200">
          Popular Articles
        </h2>
      </div>
      <ul className="space-y-8 lg:space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="mb-5">
            <Link to={`/blog/${article.slug}`} viewTransition className="group">
              <article
                key={article.slug}
                className="relative flex gap-4 hover:opacity-80"
              >
                <div>
                  <h3
                    className="mb-1 line-clamp-2 text-gray-600 text-xl lg:font-medium lg:text-xl dark:text-zinc-400"
                    style={{
                      viewTransitionName: `popular-${article.slug}-title`,
                    }}
                  >
                    <span className="inline pr-4 lg:hidden">&bull;</span>
                    {article.title}
                  </h3>
                  <div className="hidden items-center text-gray-500 text-sm lg:flex dark:text-gray-300">
                    {article.readingTime} min read
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
