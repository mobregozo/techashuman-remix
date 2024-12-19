import type { LoaderFunction } from "react-router";
import { getAllArticles, PostProperties } from "../utils/read-posts.server";
import { MAIN_URL } from "../utils/constants";

export const loader: LoaderFunction = async () => {
  const slugs = await getAllArticles();

  return new Response(renderXML(slugs), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
};

const renderXML = (articles: PostProperties[]) => {
  const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
        <title>Tech as Human</title>
        <link>${MAIN_URL}</link>
        <description>Welcome to Tech as Human! A blog where I uncover the often overlooked human aspect of the IT world.</description>
        ${articles.filter(Boolean).map(renderItem).join("")}
    </channel>
  </rss>`;

  return sourceXML;
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return c;
    }
  });
}

const renderItem = (article: PostProperties) => {
  const link = `${MAIN_URL}/blog/${article.slug}`;
  return `
        <item>
            <title>${escapeXml(article.title)}</title>
            <link>${escapeXml(link)}</link>
            <description>${escapeXml(article.subtitle)}</description>
            <guid isPermaLink="true">${escapeXml(link)}</guid>
            <pubDate>${new Date(
              Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(article.date)),
            ).toISOString()}</pubDate>
            ${
              article.photoWebpThumb
                ? `<enclosure url="${escapeXml(
                    article.photoWebpThumb,
                  )}" type="image/jpeg" />`
                : ""
            }
        </item>`;
};
