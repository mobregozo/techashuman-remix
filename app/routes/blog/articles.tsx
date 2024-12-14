import React, { useState } from "react";
import { PostPreview } from "@/components/post-preview";
import { generateTags } from "@/utils/generate-tags";
import { getAllArticles } from "@/utils/read-posts.server";
import type { Route } from "./+types/articles";
import { ChevronDown } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  const posts = await getAllArticles();
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { posts, siteUrl };
}

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "Articles", siteUrl });
  return tags;
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  const POSTS_PER_PAGE = 10;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + POSTS_PER_PAGE);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <h2 className="text-primary-700 mb-24 text-4xl font-medium tracking-tight md:text-6xl dark:text-white">
        Articles
      </h2>
      <div className="mt-16">
        {visiblePosts.map((post) => (
          <div key={post.slug} className="mb-20">
            <PostPreview post={post} />
          </div>
        ))}
        {visibleCount < posts.length && (
          <div className="flex items-center justify-center">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Load More
              <ChevronDown className="ml-2 h-6 w-6 animate-bounce duration-100 group-hover:animate-none" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
