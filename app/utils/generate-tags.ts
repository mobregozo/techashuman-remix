import type { MetaDescriptor } from "react-router";
import {
  HOME_OG_IMAGE_URL,
  SEO_DESCRIPTION,
  TWITTER_ID,
  TWITTER_USER,
} from "./constants";

type GenerateMetaArgs = {
  title: string;
  description?: string;
  siteUrl: string;
  image?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
};

/**
 * Generate SEO-optimized meta tags for routes
 * Follows React Router v7 best practices
 */
export function generateMeta({
  title,
  description = SEO_DESCRIPTION,
  siteUrl,
  image = HOME_OG_IMAGE_URL,
  canonicalUrl,
  type = "website",
  publishedTime,
  author = "Manuel Obregozo",
}: GenerateMetaArgs): MetaDescriptor[] {
  const fullTitle = `${title} | TechAsHuman`;

  const meta: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },

    // Open Graph
    { property: "og:type", content: type },
    { property: "og:url", content: canonicalUrl || siteUrl },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:site_name", content: "Tech as Human" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: TWITTER_USER },
    { name: "twitter:site", content: TWITTER_USER },
    { name: "twitter:creator:id", content: TWITTER_ID },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },

    // Author and other metadata
    { name: "author", content: author },
  ];

  // Add article-specific meta
  if (type === "article" && publishedTime) {
    meta.push(
      { property: "article:published_time", content: publishedTime },
      { property: "article:author", content: author }
    );
  }

  // Add canonical URL if provided
  if (canonicalUrl) {
    meta.push({ tagName: "link", rel: "canonical", href: canonicalUrl });
  }

  return meta.filter((descriptor) => {
    // Filter out empty content
    if ("content" in descriptor && !descriptor.content) {
      return false;
    }
    return true;
  });
}

/**
 * Generate JSON-LD structured data for better SEO
 */
export function generateArticleStructuredData({
  title,
  description,
  image,
  url,
  datePublished,
  author = "Manuel Obregozo",
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    author: {
      "@type": "Person",
      name: author,
      url: "https://www.techashuman.com/about",
    },
    publisher: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Generate JSON-LD structured data for website/homepage
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tech as Human",
    url: "https://techashuman.com",
    description: SEO_DESCRIPTION,
    publisher: {
      "@type": "Person",
      name: "Manuel Obregozo",
    },
  };
}
