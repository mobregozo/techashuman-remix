import type { ArticleMetadata } from "@/utils/read-posts.server";
import { Clock, MousePointerClickIcon, TrendingUp } from "lucide-react";
import { Link } from "react-router";

interface PopularArticlesProps {
  articles: ArticleMetadata[];
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  return (
    <div className="mt-20 lg:mt-0 lg:w-[288px]">
      <div className="mb-10 flex items-center lg:mb-6">
        <TrendingUp className="mr-2 h-8 w-8 text-gray-500 dark:text-white" />
        <h2 className="font-bold text-3xl text-gray-500 lg:text-2xl dark:text-gray-200">
          Popular Articles
        </h2>
      </div>
      <div className="space-y-10 lg:space-y-6">
        {articles.map((article) => (
          <div key={article.slug}>
            <Link to={`/blog/${article.slug}`} viewTransition className="group">
              <article
                key={article.slug}
                className="relative flex gap-4 hover:opacity-80"
              >
                <div className="absolute inset-0 z-40 hidden h-24 w-24 items-center justify-center lg:flex">
                  <MousePointerClickIcon className="h-6 w-6 transform rounded-lg object-cover text-white opacity-0 transition-transform duration-300 ease-out group-hover:scale-200 group-hover:opacity-100 dark:text-gray-400" />
                </div>
                <img
                  src={article.photoWebpThumb!}
                  alt={article.title}
                  className="h-30 w-30 rounded-lg object-cover lg:h-24 lg:w-24"
                  style={{ viewTransitionName: `popular-${article.slug}` }}
                />
                <div>
                  <h3
                    className="mb-1 line-clamp-2 font-semibold text-gray-500 text-xl lg:text-base dark:text-gray-300"
                    style={{
                      viewTransitionName: `popular-${article.slug}-title`,
                    }}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="mr-1 h-4 w-4" />
                    {article.readingTime} min read
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
