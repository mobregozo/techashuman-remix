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
          <h3 className="text-secondary-700 dark:text-secondary-500 mb-2 text-2xl leading-7 font-semibold group-hover:opacity-70 md:text-4xl">
            <span className="absolute inset-0" />
            <span className="tracking-tighter">#{post.number}&nbsp;</span>
            <span style={{ viewTransitionName: `${post.slug}-title` }}> </span>
            {post.title}
          </h3>
          <div className="relative flex flex-1 flex-col justify-between">
            {post.photoURL && (
              <div className="relative mt-3 aspect-[16/9] h-56 max-w-md md:h-48 md:shrink-0 lg:h-64">
                <img
                  src={post.photoURL}
                  alt=""
                  style={{ viewTransitionName: post.slug }}
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-200 group-hover:opacity-70"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
              </div>
            )}
            <time
              dateTime={formattedDate}
              className="my-2.5 text-gray-700 dark:text-gray-300"
            >
              {formattedDate}
            </time>
            <p className="max-w-lg flex-1 text-xl leading-6 text-gray-600 lg:text-sm dark:text-gray-400">
              {post.subtitle}
            </p>
            <div className="mt-2 flex items-center tracking-tighter">
              <div className="text-primary-700 dark:text-primary-500 font-semibold group-hover:underline lg:text-sm">
                Read full article
              </div>
              <svg
                className="stroke-primary-700 dark:stroke-primary-500 h-4 w-4"
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
