import { NavLink } from "react-router";
import type { PostProperties } from "../utils/read-posts.server";
import { TrendingUp } from "lucide-react";

type PostLinkProps = {
  post: PostProperties;
};

export const PostLink = ({ post }: PostLinkProps) => {
  return (
    <NavLink to={`/blog/${post.slug}`}>
      <h3
        key={post.slug}
        className="text-secondary-700 dark:text-secondary-500 mt-2 flex transform items-center text-sm leading-6 font-semibold tracking-tighter transition-transform duration-200 ease-in-out hover:scale-105 hover:opacity-70 sm:whitespace-pre"
      >
        <TrendingUp size={20} className="mr-2" />
        {post.title}
      </h3>
    </NavLink>
  );
};
