import { getLatestArticles } from "./app/utils/read-posts.server";
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    let popularArticles = await getLatestArticles();
    const PopularArticlesPages = popularArticles.map(
      (product) => `/blog/${product.slug}`,
    );

    return ["/", "/about", "/blog", "/about/blog", ...PopularArticlesPages];
  },
} satisfies Config;
