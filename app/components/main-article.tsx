import { PostProperties } from "@/utils/read-posts.server";
import { Link } from "react-router";

type MainArticleProps = {
  post: PostProperties;
};

export const MainArticle = ({ post }: MainArticleProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(post.date));
  return (
    <Link to={`/blog/${post.slug}`} viewTransition>
      <article
        key={post.slug}
        className="group relative isolate flex flex-col gap-8 md:flex-row"
      >
        <div className="flex flex-col justify-between">
          <h3 className="text-2xl mb-2 md:text-4xl font-semibold leading-7 text-secondary-700 dark:text-secondary-500 group-hover:opacity-70">
            <span className="absolute inset-0" />
            <span className="tracking-tighter">#{post.number}&nbsp;</span>
            <span style={{ viewTransitionName: `${post.slug}-title` }}> </span>
            {post.title}
          </h3>
          <div className="relative flex flex-col justify-between flex-1">
            {post.photoURL && (
              <div className="mt-3 relative aspect-[16/9] h-56 max-w-md md:h-48 lg:h-64 md:shrink-0">
                <img
                  src={post.photoURL}
                  alt=""
                  style={{ viewTransitionName: post.slug }}
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover group-hover:opacity-70 transition-opacity duration-200"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            )}
            <time
              dateTime={formattedDate}
              className="text-gray-700 dark:text-gray-300 my-2.5"
            >
              {formattedDate}
            </time>
            <p className="text-xl lg:text-sm leading-6 text-gray-600 dark:text-gray-400 flex-1 max-w-lg">
              {post.subtitle}
            </p>
            <div className="flex items-center mt-2 tracking-tighter">
              <div className="lg:text-sm font-semibold text-primary-700 dark:text-primary-500 group-hover:underline">
                Read full article
              </div>
              <svg
                className="h-4 w-4 stroke-primary-700 dark:stroke-primary-500"
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
