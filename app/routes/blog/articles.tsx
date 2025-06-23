import { PostPreview } from '@/components/post-preview'
import { generateTags } from '@/utils/generate-tags'
import { getAllArticles } from '@/utils/read-posts.server'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { href } from 'react-router'
import type { Route } from './+types/articles'

export async function loader() {
  const posts = await getAllArticles()

  return { posts }
}

export const meta = () => {
  const tags = generateTags({
    title: 'Articles',
    siteUrl: href('/blog'),
  })
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles',
    url: href('/blog'),
    description:
      'A collection of articles on Tech as Human, exploring the intersection of technology and human life.',
  }

  return [
    ...tags,
    {
      'script:ld+json': structuredData,
    },
  ]
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData

  const POSTS_PER_PAGE = 10
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + POSTS_PER_PAGE)
  }

  const visiblePosts = posts.slice(0, visibleCount)

  return (
    <>
      <h2 className="mb-24 font-medium text-4xl text-primary-700 tracking-tight md:text-6xl dark:text-white">
        Articles
      </h2>
      <div className="mt-16">
        {visiblePosts.map((post) => (
          <div key={post.slug} className="mb-20">
            <PostPreview post={post} />
          </div>
        ))}
        {visibleCount < posts.length && (
          <div className="flex items-center justify-center">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
            >
              Load More
              <ChevronDown className="ml-2 h-6 w-6 animate-bounce duration-100 group-hover:animate-none" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
