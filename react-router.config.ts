import { getLatestArticles } from "./app/utils/read-posts.server";
import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true,
  presets: [vercelPreset()],
  async prerender() {
    let popularArticles = await getLatestArticles();
    const PopularArticlesPages = popularArticles.map(
      (product) => `/blog/${product.slug}`,
    );

    return ["/", "/about", "/blog", "/about/blog", ...PopularArticlesPages];
  },
} satisfies Config;
