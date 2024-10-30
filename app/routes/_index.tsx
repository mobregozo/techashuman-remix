import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Intro } from "../components/intro";
import { PostLink } from "../components/post-link";
import { PostPreview } from "../components/post-preview";
import { generateTags } from "../utilities/generate-tags";
import {
  getArticlesBySlugs,
  getLatestArticles,
} from "../utilities/read-posts.server";
import type { PostProperties } from "../utilities/read-posts.server";

export const meta: MetaFunction = () => {
  const tags = generateTags("Home");
  return tags;
};

type PopularArticlesSlug = {
  results: { page: string }[];
};

export const loader = async () => {
  const response = await fetch(
    "https://plausible.io/api/v1/stats/breakdown?site_id=techashuman.com&property=event:page&limit=5&period=12mo&filters=event:page==/blog/*",
    {
      headers: {
        Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular links");
  }
  const latestArticles = await getLatestArticles();

  const popularArticlesSlug: PopularArticlesSlug = await response.json();
  const slugs = popularArticlesSlug.results.map((item: { page: string }) =>
    item.page.replace("/blog/", "")
  );
  const popularArticles = await getArticlesBySlugs(slugs);
  return {
    latestArticles,
    popularArticles,
  };
};
export default function Index() {
  const { latestArticles, popularArticles } = useLoaderData<typeof loader>();

  const latestArticlesPreviews = latestArticles.map((post) => (
    <div key={post.slug} className="mb-4">
      <PostPreview post={post as PostProperties} />
    </div>
  ));

  const popularArticlesPreviews = popularArticles.map((post) => (
    <div key={post.slug} className="mb-4">
      <PostLink post={post as PostProperties} />
    </div>
  ));

  return (
    <>
      <Intro />
      <div className="mt-10 lg:flex lg:gap-8">
        <div>
          <h2 className="text-primary-600 text-2xl md:text-3xl font-bold dark:text-white tracking-tighter">
            Latest articles
          </h2>
          <div className="md:mt-8 mb-20 divide-y divide-gray-300 dark:divide-gray-800 md:divide-y-0">
            {latestArticlesPreviews}
          </div>
        </div>
        <div>
          <h2 className="text-primary-600 text-xl md:text-2xl font-bold dark:text-white tracking-tighter">
            Popular articles
          </h2>
          <div className="md:mt-8 mb-20 divide-y divide-gray-300 dark:divide-gray-800 md:divide-y-0">
            {popularArticlesPreviews}
          </div>
        </div>
      </div>
      <div className="grow">
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
