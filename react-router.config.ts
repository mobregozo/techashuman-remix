import type { Config } from '@react-router/dev/config'
import { getAllArticles } from './app/utils/read-posts.server'

export default {
  ssr: true,
  async prerender() {
    const allArticles = await getAllArticles()
    const allArticlesPages = allArticles.map(
      (article) => `/blog/${article.slug}`,
    )

    return [
      '/',
      '/about',
      '/blog',
      '/about/blog',
      '/robots.txt',
      '/sitemap.xml',
      '/rss.xml',
      '/llms.txt',
      ...allArticlesPages,
    ]
  },
} satisfies Config
