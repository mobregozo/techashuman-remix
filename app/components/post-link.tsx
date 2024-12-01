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
        className="sm:whitespace-pre mt-2 text-sm tracking-tighter flex items-center font-semibold leading-6 text-secondary-700 dark:text-secondary-500 hover:opacity-70 transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <TrendingUp size={20} className="mr-2" />
        {post.title}
      </h3>
    </NavLink>
  );
};
