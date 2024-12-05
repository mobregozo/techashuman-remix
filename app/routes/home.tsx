import { Link, useLoaderData } from "react-router";
import { Intro } from "../components/intro";
import { PostPreview } from "../components/post-preview";
import { generateTags } from "../utils/generate-tags";
import {
  getArticlesBySlugs,
  getLatestArticles,
} from "../utils/read-posts.server";
import type { PostProperties } from "../utils/read-posts.server";
import { ChevronRight } from "lucide-react";
import type { Route } from "./+types/home";
import { FeaturedArticle } from "@/components/featured-articles";
import { PopularArticles } from "@/components/popular-articles";

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "Home", siteUrl });
  return tags;
};

type PopularArticlesSlug = {
  results: { page: string }[];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const response = await fetch(
    "https://plausible.io/api/v1/stats/breakdown?site_id=techashuman.com&property=event:page&limit=3&period=12mo&filters=event:page==/blog/*",
    {
      headers: {
        Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular links");
  }
  const latestArticles = await getLatestArticles();

  const popularArticlesSlug: PopularArticlesSlug = await response.json();
  const slugs = popularArticlesSlug.results.map((item: { page: string }) =>
    item.page.replace("/blog/", ""),
  );
  const popularArticles = await getArticlesBySlugs(slugs);
  const lastArticle = latestArticles.shift();

  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return {
    latestArticles,
    popularArticles,
    lastArticle,
    siteUrl,
  };
};

export default function Index() {
  const { latestArticles, popularArticles, lastArticle } =
    useLoaderData<typeof loader>();

  const latestArticlesPreviews = latestArticles.map((post) => (
    <div key={post.slug} className="mb-16">
      <PostPreview post={post as PostProperties} />
    </div>
  ));

  return (
    <>
      <Intro />
      <div className="mt-10 items-stretch justify-between lg:flex lg:gap-16">
        <FeaturedArticle article={lastArticle as PostProperties} />
        <PopularArticles articles={popularArticles as PostProperties[]} />
      </div>
      <div>
        <h2 className="text-primary-600 mt-20 mb-10 text-3xl font-semibold tracking-tight md:text-4xl lg:mt-28 lg:mb-12 dark:text-white">
          Previously shared
        </h2>
        <div className="mb-20 md:mt-8 dark:divide-gray-800">
          {latestArticlesPreviews}
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            View all articles
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </>
  );
}
