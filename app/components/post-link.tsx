import { NavLink } from "@remix-run/react";
import type { PostProperties } from "../utilities/read-posts.server";

type PostLinkProps = {
  post: PostProperties;
};

export const PostLink = ({ post }: PostLinkProps) => {
  return (
    <NavLink to={`/blog/${post.slug}`}>
      <h3
        key={post.slug}
        className="mt-3 flex items-center font-semibold leading-6 text-secondary-700 dark:text-secondary-500 hover:opacity-70 whitespace-pre transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-4 h-4 mr-2"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
        {post.title}
      </h3>
    </NavLink>
  );
};
