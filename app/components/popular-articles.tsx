import type { ArticleMetadata } from '@/utils/read-posts.server'
import { TrendingUp } from 'lucide-react'
import { Link } from 'react-router'

interface PopularArticlesProps {
  articles: ArticleMetadata[]
}

export function PopularArticles({ articles }: PopularArticlesProps) {
  return (
    <div className="mt-20 lg:mt-0 lg:w-[288px]">
      <div className="mb-10 flex items-center lg:mb-6">
        <TrendingUp className="mr-2 h-8 w-8 text-gray-600 dark:text-gray-200" />
        <h2 className='font-medium text-3xl text-gray-600 dark:text-gray-200'>
          Popular Articles
        </h2>
      </div>
      <div className="space-y-10 lg:space-y-6">
        {articles.map((article) => (
          <div key={article.slug}>
            <Link to={`/blog/${article.slug}`} viewTransition className="group">
              <article
                key={article.slug}
                className="relative flex gap-4 hover:opacity-80"
              >
                <div>
                  <h3
                    className="mb-1 line-clamp-2 font-medium text-gray-600 text-xl lg:text-base dark:text-gray-200"
                    style={{
                      viewTransitionName: `popular-${article.slug}-title`,
                    }}
                  >
                    {article.title}
                  </h3>
                  <div className='flex items-center text-gray-500 text-sm dark:text-gray-400'>
                    {article.readingTime} min read
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
