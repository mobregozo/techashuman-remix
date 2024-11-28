import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("/blog", "./routes/blog/articles.tsx"),
  route("/blog/:articleId", "./routes/blog/article.tsx"),
  route("/about", "./routes/about/about.tsx"),
  route("/about/blog", "./routes/about/blog.tsx"),
] satisfies RouteConfig;