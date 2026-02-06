import { PostPreview } from "@/components/post-preview";
import {
  HOME_OG_IMAGE_URL,
  MAIN_URL,
  SEO_DESCRIPTION,
  TWITTER_ID,
  TWITTER_USER,
} from "@/utils/constants";
import { getArticlesPage } from "@/utils/read-posts.server";
import { ChevronDown, LoaderCircle, Search } from "lucide-react";
import { useRef } from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/articles";

const POSTS_PER_PAGE = 10;

export const meta = () => {
  const title = "Articles | TechAsHuman";
  const description =
    "Explore articles on Tech as Human, covering technology, software engineering, and human perspectives.";
  const canonicalUrl = `${MAIN_URL}/blog`;
  const image = HOME_OG_IMAGE_URL;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles - Tech as Human",
    url: canonicalUrl,
    description:
      "A collection of articles exploring the intersection of technology and human life.",
  };

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_USER },
    { name: "twitter:creator", content: TWITTER_USER },
    { name: "twitter:creator:id", content: TWITTER_ID },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    {
      "script:ld+json": structuredData,
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const cursor = url.searchParams.get("cursor");

  const page = await getArticlesPage(q, {
    pageSize: POSTS_PER_PAGE,
    startCursor: cursor,
  });

  return {
    posts: page.articles,
    q,
    nextCursor: page.nextCursor,
    hasMore: page.hasMore,
  };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts, hasMore, nextCursor } = loaderData;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const isSearching =
    navigation.state !== "idle" &&
    !!navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  const isLoadingMore =
    navigation.state !== "idle" &&
    !!navigation.location &&
    new URLSearchParams(navigation.location.search).has("cursor");

  return (
    <>
      <h2 className="mb-10 font-medium text-4xl text-primary-700 tracking-tight md:mb-24 md:text-6xl dark:text-white">
        Articles
      </h2>
      <div className="flex max-w-3xl items-center gap-2 py-4">
        <Form
          id="search-form"
          role="search"
          className="relative flex-1"
          method="GET"
        >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search articles by title or content"
            type="search"
            name="q"
            defaultValue={query}
            className={
              `relative h-12 w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-400` +
              (isSearching ? " bg-none" : "apearance-none")
            }
          />
          {!isSearching && (
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-gray-400" />
          )}
          {isSearching && (
            <LoaderCircle className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 animate-spin text-gray-400" />
          )}
        </Form>
        {query ? (
          <Link
            to="/blog"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 px-4 font-medium text-gray-700 text-sm hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-gray-200 dark:focus:ring-gray-800 dark:hover:bg-gray-800"
          >
            Clear
          </Link>
        ) : null}
      </div>
      <div className="mt-10 max-w-3xl md:mt-16">
        {posts.length ? (
          posts.map((post) => (
            <div key={post.slug} className="mb-20">
              <PostPreview post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No articles found</div>
        )}
        {hasMore && nextCursor && (
          <div className="flex items-center justify-center">
            <Link
              to={
                query
                  ? `/blog?q=${encodeURIComponent(query)}&cursor=${encodeURIComponent(
                      nextCursor
                    )}`
                  : `/blog?cursor=${encodeURIComponent(nextCursor)}`
              }
              className="group inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
              aria-busy={isLoadingMore}
            >
              {isLoadingMore ? "Loading" : "Load More"}
              <ChevronDown className="ml-2 h-6 w-6 animate-bounce duration-100 group-hover:animate-none" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
