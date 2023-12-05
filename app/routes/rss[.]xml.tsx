import type { LoaderFunction } from "@remix-run/node";
import { MAIN_URL } from "~/utilities/constants";
import type { BlogMetaData } from "~/utilities/read-posts.server";
import { getAllArticles } from "~/utilities/read-posts.server";

export const loader: LoaderFunction = async () => {
  const slugs = await getAllArticles();

  return new Response(renderXML(slugs), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
};

const renderXML = (articles: BlogMetaData[]) => {
  const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
        <title>Tech as Huma</title>
        <link>${MAIN_URL}</link>
        <atom:link href="${MAIN_URL}/rss.xml" rel="self" type="application/rss+xml" />
        <description>Welcome to Tech as Human! A blog where I uncover the often overlooked human aspect of the IT world.</description>
        ${articles.filter(Boolean).map(renderItem).join("")}
    </channel>
  </rss>`;

  return sourceXML;
};

const renderItem = (article: BlogMetaData) => {
  const link = `${MAIN_URL}/blog/${article.slug}`;
  return `
        <item>
            <title>${article.title}</title>
            <link>${link}</link>
            <description>${article.subtitle}</description>
            <guid isPermaLink="true">${link}</guid>
            <pubDate>${new Date(
              Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(article.date))
            ).toISOString()}</pubDate>
        </item>`;
};
