import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("/blog", "./routes/blog/articles.tsx"),
  route("/blog/:articleId", "./routes/blog/article.tsx"),
  route("/about", "./routes/about/about.tsx"),
  route("/about/blog", "./routes/about/blog.tsx"),
  route("/about/vinyls", "./routes/about/vinyls.tsx"),
  route("/rss.xml", "./routes/rss.tsx"),
  route("/robots.txt", "./routes/robots.tsx"),
  route("/sitemap.xml", "./routes/sitemap.tsx"),
] satisfies RouteConfig;
