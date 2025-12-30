import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('/blog', './routes/blog/articles.tsx'),

  route('/about', './routes/about/about.tsx'),
  layout('./routes/blog/layout.tsx', [
    route('/blog/:articleId', './routes/blog/article.tsx'),
  ]),
  route('/rss.xml', './routes/rss.tsx'),
  route('/robots.txt', './routes/robots.tsx'),
  route('/sitemap.xml', './routes/sitemap.tsx'),
  route('/llms.txt', './routes/llms.tsx'),
] satisfies RouteConfig
