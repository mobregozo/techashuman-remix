import { Link, href } from "react-router";
import type { ArticleMetadata } from "../utils/read-posts.server";

type PostPreviewProps = {
  post: ArticleMetadata;
};

export const PostPreview = ({ post }: PostPreviewProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(post.date));
  return (
    <Link
      to={href("/blog/:articleId", {
        articleId: post.slug,
      })}
      viewTransition
    >
      <article
        key={post.slug}
        className='group relative isolate flex flex-col gap-8 md:flex-row'
      >
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-x-4 text-sm">
            <time
              dateTime={formattedDate}
              className="text-gray-700 dark:text-gray-400"
            >
              {formattedDate}
            </time>
          </div>
          <div className="relative flex flex-1 flex-col justify-between">
            <h3 className="mt-3 font-medium text-2xl text-secondary-700 leading-6 group-hover:opacity-70 dark:text-secondary-500">
              <span className="absolute inset-0" />
              <span className="tracking-tighter">#{post.number}&nbsp;</span>
              <span style={{ viewTransitionName: `${post.slug}-title` }}>
                {" "}
              </span>
              {post.title}
            </h3>
            <p className="mt-5 flex-1 text-gray-600 leading-6 dark:text-gray-400">
              {post.subtitle}
            </p>
            <div className="mt-2 flex items-center tracking-tighter">
              <div className="font-medium text-primary-700 text-sm group-hover:underline dark:text-primary-500">
                Read full article
              </div>
              <svg
                className="h-6 w-6 translate-x-0 rotate-0 transform stroke-primary-700 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 dark:stroke-primary-500"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.75 5.75 9.25 8l-2.5 2.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
