import { PostPreview } from '@/components/post-preview'
import { generateTags } from '@/utils/generate-tags'
import { getAllArticles } from '@/utils/read-posts.server'
import { ChevronDown, LoaderCircle, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Form, href, useNavigation, useSubmit } from 'react-router'
import type { Route } from './+types/articles'

const POSTS_PER_PAGE = 10

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const posts = await getAllArticles(q)

  return { posts, q }
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
  const { posts, q } = loaderData
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q])

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + POSTS_PER_PAGE)
  }

  const visiblePosts = posts.slice(0, visibleCount)

  return (
    <>
      <h2 className="mb-10 font-medium text-4xl text-primary-700 tracking-tight md:mb-24 md:text-6xl dark:text-white">
        Articles
      </h2>
      <div>
        <div className="flex items-center gap-2 py-4">
          <Form
            id="search-form"
            role="search"
            className="relative flex-1"
            onChange={(event) => {
              const isFirstSearch = q === null
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              })
            }}
          >
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search articles by title or content"
              type="search"
              name="q"
              defaultValue={q || ''}
              className={
                `relative h-12 w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-400` +
                (searching ? ' bg-none' : 'apearance-none')
              }
            />
            {!searching && (
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-gray-400" />
            )}
            {searching && (
              <LoaderCircle className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 animate-spin text-gray-400" />
            )}
          </Form>
        </div>
      </div>
      <div className="mt-10 md:mt-16">
        {visiblePosts.length ? (
          visiblePosts.map((post) => (
            <div key={post.slug} className="mb-20">
              <PostPreview post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No articles found</div>
        )}
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
