import { NavLink } from "@remix-run/react";
import type { PostProperties } from "../utilities/read-posts.server";

type PostPreviewProps = {
  post: PostProperties;
};

export const PostPreview = ({ post }: PostPreviewProps) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(post.date));
  return (
    <NavLink to={`/blog/${post.slug}`} prefetch="intent" viewTransition>
      {({ isTransitioning }) => (
        <>
          <article
            key={post.slug}
            className="relative isolate flex flex-col gap-8 md:flex-row py-8"
          >
            {post.photoURL && (
              <div className="hidden md:block relative aspect-[16/9] md:aspect-square h-48 md:shrink-0">
                <img
                  src={post.photoURL}
                  alt=""
                  style={
                    isTransitioning
                      ? { viewTransitionName: "blog-img" }
                      : undefined
                  }
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
            )}
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time
                  dateTime={formattedDate}
                  className="text-gray-700 dark:text-gray-500"
                >
                  {formattedDate}
                </time>
              </div>
              <div className="group relative flex flex-col justify-between flex-1">
                <h3 className="mt-3 text-2xl font-semibold leading-6 text-secondary-700 dark:text-secondary-500 group-hover:opacity-70">
                  <span className="absolute inset-0" />
                  <span className="tracking-tighter">#{post.number}&nbsp;</span>
                  {post.title}
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-1">
                  {post.subtitle}
                </p>
                <div className="flex items-center mt-2 tracking-tighter">
                  <div className="text-sm text-primary-700 dark:text-primary-500 group-hover:underline">
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
        </>
      )}
    </NavLink>
  );
};
