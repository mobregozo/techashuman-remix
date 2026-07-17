import { FeaturedArticle } from "@/components/featured-articles";
import { PopularArticles } from "@/components/popular-articles";
import {
  HOME_OG_IMAGE_URL,
  MAIN_URL,
  SEO_DESCRIPTION,
  TWITTER_ID,
  TWITTER_USER,
} from "@/utils/constants";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Intro } from "../components/intro";
import { PostPreview } from "../components/post-preview";
import { generateWebsiteStructuredData } from "../utils/generate-tags";
import {
  type ArticleMetadata,
  getArticlesBySlugs,
  getLatestArticles,
} from "../utils/read-posts.server";
import type { Route } from "./+types/home";

export function headers() {
  return { "Cache-Control": "public, max-age=300, s-maxage=3600" };
}

export const meta = () => {
  const title = "Home | TechAsHuman";
  const canonicalUrl = MAIN_URL;

  return [
    { title },
    { name: "description", content: SEO_DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: SEO_DESCRIPTION },
    { property: "og:image", content: HOME_OG_IMAGE_URL },
    { property: "og:site_name", content: "Tech as Human" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: TWITTER_USER },
    { name: "twitter:site", content: TWITTER_USER },
    { name: "twitter:creator:id", content: TWITTER_ID },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: SEO_DESCRIPTION },
    { name: "twitter:image", content: HOME_OG_IMAGE_URL },
    { name: "author", content: "Manuel Obregozo" },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { "script:ld+json": generateWebsiteStructuredData() },
  ];
};

type PopularArticlesSlug = {
  results: { page: string }[];
};

export const loader = async () => {
  const latestArticles = await getLatestArticles();
  let popularArticles: ArticleMetadata[] = [];

  try {
    const response = await fetch(
      "https://plausible.io/api/v1/stats/breakdown?site_id=techashuman.com&property=event:page&limit=5&period=12mo&filters=event:page==/blog/*",
      {
        headers: {
          Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
        },
      },
    );

    if (response.ok) {
      const popularArticlesSlug: PopularArticlesSlug = await response.json();
      const slugs = popularArticlesSlug.results.map((item: { page: string }) =>
        item.page.replace("/blog/", ""),
      );
      popularArticles = await getArticlesBySlugs(slugs);
    }
  } catch {
    popularArticles = [];
  }

  const lastArticle = latestArticles.shift();

  return {
    latestArticles,
    popularArticles,
    lastArticle,
  };
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { latestArticles, popularArticles, lastArticle } = loaderData;

  const latestArticlesPreviews = latestArticles.map((post: ArticleMetadata) => (
    <div key={post.slug} className="mb-16">
      <PostPreview post={post as ArticleMetadata} />
    </div>
  ));

  return (
    <>
      <Intro />
      <div className="mt-10 grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="lg:col-start-1 lg:row-start-1">
          {lastArticle ? (
            <FeaturedArticle article={lastArticle as ArticleMetadata} />
          ) : null}
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <PopularArticles articles={popularArticles as ArticleMetadata[]} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <h2 className="mt-8 mb-10 font-medium text-3xl text-primary-600 tracking-tight md:text-5xl lg:mt-16 lg:mb-12 dark:text-white">
            Previously shared
          </h2>
          <div className="mb-20 max-w-2xl md:mt-8 dark:divide-gray-800">
            {latestArticlesPreviews}
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-zinc-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
          >
            View all articles
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </>
  );
}
