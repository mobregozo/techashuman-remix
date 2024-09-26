import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostPreview } from "~/components/post-preview";
import { generateTags } from "~/utilities/generate-tags";
import type { PostProperties } from "~/utilities/read-posts.server";
import { getAllArticles } from "~/utilities/read-posts.server";

export async function loader() {
  const posts = await getAllArticles();
  return posts;
}

export const meta: MetaFunction = () => {
  const tags = generateTags("Articles");
  return tags;
};

export default function Index() {
  const files: PostProperties[] = useLoaderData();

  const postPreviews = files.map((post) => (
    <div key={post.slug}>
      <PostPreview post={post} />
    </div>
  ));

  return (
    <>
      <h2 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
        Articles
      </h2>
      <div className="mt-16 divide-y divide-gray-300 dark:divide-gray-800">
        {postPreviews}
      </div>
    </>
  );
}
