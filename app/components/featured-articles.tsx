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
      <article className="relative overflow-hidden rounded-xl hover:opacity-50">
        <img
          src={article.photoWebp!}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="h-[400px] w-full object-cover"
          style={{ viewTransitionName: article.slug }}
        />
        <div className="absolute inset-0 bg-gra bg-gradient-to-t from-black to-transparent opacity-80" />
        <div className="absolute right-0 bottom-0 left-0 p-8">
          <h2
            className="mb-3 font-bold text-2xl text-white lg:text-2xl"
            style={{ viewTransitionName: `${article.slug}-title` }}
          >
            {article.title}
          </h2>
          <div className="mb-3 flex items-center text-gray-200 text-sm">
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
          <p className="text-gray-300">{article.subtitle}</p>
        </div>
      </article>
    </Link>
  );
}
