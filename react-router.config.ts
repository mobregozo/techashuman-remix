import type { Config } from "@react-router/dev/config";
import { getAllArticles } from "./app/utils/read-posts.server";

export default {
  ssr: true,
  splitRouteModules: true,
  async prerender() {
    const allArticles = await getAllArticles();
    const allArticlesPages = allArticles.map(
      (article) => `/blog/${article.slug}`,
    );

    return [
      "/",
      "/about",
      "/robots.txt",
      "/llms.txt",
      ...allArticlesPages,
    ];
  },
} satisfies Config;
