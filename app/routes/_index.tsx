import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Intro } from "~/components/intro";
import { PostPreview } from "~/components/post-preview";
import { generateTags } from "~/utilities/generate-tags";
import type { PostProperties } from "~/utilities/read-posts.server";
import { getLatestArticles } from "~/utilities/read-posts.server";

export const meta: MetaFunction = () => {
  const tags = generateTags("Home");
  return tags;
};

export async function loader() {
  const posts = await getLatestArticles();
  return posts;
}

export default function Index() {
  const files: PostProperties[] = useLoaderData();

  const postPreviews = files.map((post) => (
    <div key={post.slug} className="mb-4">
      <PostPreview {...post} />
    </div>
  ));

  return (
    <>
      <Intro />
      <h2 className="text-primary-600 text-2xl md:text-3xl mt-10 font-bold dark:text-white tracking-tighter">
        Latest articles
      </h2>
      <div className="md:mt-8 mb-20 divide-y divide-gray-300 dark:divide-gray-800 md:divide-y-0">
        {postPreviews}
      </div>
      <div>
        <a
          href="/blog"
          className="text-xl text-primary-700 dark:text-primary-600 text-center block hover:opacity-70 font-bold hover:underline"
        >
          VIEW ALL ARTICLES
        </a>
      </div>
    </>
  );
}
