import type { LoaderFunction } from "@remix-run/node";
import { MAIN_URL } from "~/utilities/constants";
import type { PostProperties } from "~/utilities/read-posts.server";
import { getAllArticles } from "~/utilities/read-posts.server";

export const loader: LoaderFunction = async () => {
  const slugs = await getAllArticles();

  return new Response(renderXML(slugs), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
    },
  });
};

const renderXML = (slugs: PostProperties[]) => {
  const url = `${MAIN_URL}/blog`;

  const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${slugs
      .filter(Boolean)
      .map(
        (item) => `<url>
      <loc>${url}/${item.slug}</loc>
      <lastmod>${new Date(
        Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(item.date))
      ).toISOString()}</lastmod>
    </url>`
      )
      .join("")}
  </urlset>`;

  return sourceXML;
};
