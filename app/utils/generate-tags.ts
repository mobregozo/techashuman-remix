import {
  SEO_DESCRIPTION,
} from "./constants";

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
