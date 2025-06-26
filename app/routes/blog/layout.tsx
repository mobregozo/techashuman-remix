import { Footer } from '@/components/footer'
import { PostPreview } from '@/components/post-preview'
import { getLatestArticles } from '@/utils/read-posts.server'
import { ChevronRight } from 'lucide-react'
import { Link, Outlet } from 'react-router'
import { Route } from './+types/layout'

export async function loader({ params }: Route.LoaderArgs) {
  const latestPosts = await getLatestArticles(params.articleId!)

  return { latestPosts }
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { latestPosts } = loaderData

  const postPreviews = latestPosts.map((post) => (
    <div key={post.slug} className="mb-12">
      <PostPreview post={post} />
    </div>
  ))

  return (
    <>
      <article>
        <Outlet />
        <div>
          <div className="my-10">
            <Footer />
          </div>
          <h2 className="mt-16 font-semibold text-2xl text-primary-600 tracking-tighter md:text-5xl dark:text-white">
            Other articles
          </h2>
          <div className="divide-y divide-gray-300 md:mt-12 md:divide-y-0 dark:divide-gray-800">
            {postPreviews}
          </div>
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
            >
              View all articles
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
