import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostPreview } from "~/components/post-preview";
import { generateTags } from "~/utilities/generate-tags";
import type { BlogMetaData } from "~/utilities/read-posts.server";
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
  const files: BlogMetaData[] = useLoaderData();

  const postPreviews = files.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <h2 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
        Articles
      </h2>
      <p className="text-gray-700 text-justify dark:text-gray-300 mb-2">
        <strong className="font-bold text-gray-800 dark:text-white">
          Opinions are my own!
        </strong>
      </p>
      <span className="text-gray-700 dark:text-white">
        If you would like to stay up to date with my latest posts, please
      </span>
      <a
        href="https://techashuman.substack.com/"
        className="pl-1 font-bold underline md:no-underline hover:underline text-primary-700 dark:text-primary-500"
      >
        subscribe.
      </a>
      <div className="mb-8">{postPreviews}</div>
    </>
  );
}
