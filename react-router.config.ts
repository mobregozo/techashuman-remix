import type { Config } from "@react-router/dev/config";
export default {
  ssr: true,
  async prerender() {
    return ["/", "/about", "/blog", "/rss.xml", "/robots.txt"];
  },
} satisfies Config;
