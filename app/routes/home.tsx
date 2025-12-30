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

export const meta = () => {
  const structuredData = generateWebsiteStructuredData();

  return [
    {
      "script:ld+json": structuredData,
    },
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
      "https://plausible.io/api/v1/stats/breakdown?site_id=techashuman.com&property=event:page&limit=3&period=12mo&filters=event:page==/blog/*",
      {
        headers: {
          Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (response.ok) {
      const popularArticlesSlug: PopularArticlesSlug = await response.json();
      const slugs = popularArticlesSlug.results.map((item: { page: string }) =>
        item.page.replace("/blog/", "")
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

  const title = "Home | TechAsHuman";
  const description = SEO_DESCRIPTION;
  const image = HOME_OG_IMAGE_URL;

  const latestArticlesPreviews = latestArticles.map((post) => (
    <div key={post.slug} className="mb-16">
      <PostPreview post={post as ArticleMetadata} />
    </div>
  ));

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={MAIN_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Tech as Human" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_USER} />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:creator:id" content={TWITTER_ID} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Other */}
      <meta name="author" content="Manuel Obregozo" />
      <link rel="canonical" href={MAIN_URL} />

      <Intro />
      <div className="mt-10 items-stretch justify-between lg:flex lg:gap-16">
        <FeaturedArticle article={lastArticle as ArticleMetadata} />
        <PopularArticles articles={popularArticles as ArticleMetadata[]} />
      </div>
      <div>
        <h2 className="mt-20 mb-10 font-semibold text-3xl text-primary-600 tracking-tight md:text-4xl lg:mt-28 lg:mb-12 dark:text-white">
          Previously shared
        </h2>
        <div className='mb-20 max-w-2xl md:mt-8 dark:divide-gray-800'>
          {latestArticlesPreviews}
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <Link
            to="/blog"
            className='inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-zinc-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700'
          >
            View all articles
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </div>
    </>
  );
}
