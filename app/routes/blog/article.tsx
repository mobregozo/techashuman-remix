import { MarkdownContent } from '@/components/markdown-content'
import { NewsletterSignup } from '@/components/newsletter-signup'
import {
  MAIN_URL,
  POST_PATH,
  TWITTER_ID,
  TWITTER_USER,
} from '@/utils/constants'
import { generateArticleStructuredData } from '@/utils/generate-tags'
import NotFound from '@/utils/not-found'
import { getArticleContent } from '@/utils/read-posts.server'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Route } from './+types/article'

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getArticleContent(params.articleId)

  if (!result?.post) {
    throw new Response('Not Found', { status: 404 })
  }

  return {
    post: result.post,
  }
}

export const meta = ({ loaderData, params }: Route.MetaArgs) => {
  const canonicalUrl = `${MAIN_URL}/${POST_PATH}/${params.articleId}`
  const post = loaderData?.post

  // Handle 404 case - still need meta export for structured data
  if (!post) {
    return []
  }

  // Generate structured data
  const structuredData = generateArticleStructuredData({
    title: post.title,
    description: post.subtitle,
    image: post.photo?.photoURL,
    url: canonicalUrl,
    datePublished: post.formattedDate
      ? new Date(post.formattedDate).toISOString()
      : undefined,
  })

  return [
    {
      'script:ld+json': structuredData,
    },
  ]
}

export default function Index({ loaderData, params }: Route.ComponentProps) {
  const { post } = loaderData

  const title = `${post.title} | TechAsHuman`
  const canonicalUrl = `${MAIN_URL}/${POST_PATH}/${params.articleId}`
  const publishedTime = post.formattedDate
    ? new Date(post.formattedDate).toISOString()
    : undefined

  return (
    <article className="space-y-10">
      <title>{title}</title>
      <meta name="description" content={post.subtitle} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={post.subtitle} />
      {post.photo?.photoURL && (
        <meta property="og:image" content={post.photo.photoURL} />
      )}
      <meta property="og:site_name" content="Tech as Human" />
      {publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content="Manuel Obregozo" />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_USER} />
      <meta name="twitter:site" content={TWITTER_USER} />
      <meta name="twitter:creator:id" content={TWITTER_ID} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={post.subtitle} />
      {post.photo?.photoURL && (
        <meta name="twitter:image" content={post.photo.photoURL} />
      )}

      {/* Other */}
      <meta name="author" content="Manuel Obregozo" />
      <link rel="canonical" href={canonicalUrl} />

      <header className="space-y-6 border-0 bg-white/70 py-6 shadow-none backdrop-blur dark:bg-zinc-900/60">
        <h1
          className="font-medium text-4xl text-secondary-700 tracking-tight md:text-6xl dark:text-secondary-500"
          style={{ viewTransitionName: `${post.slug}-title` }}
        >
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-medium text-gray-600 text-sm dark:text-gray-300">
          <span>{post.readingTime} min read</span>
          <span className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500" />
          <time
            dateTime={post.formattedDate}
            className="text-primary-700 uppercase tracking-wide dark:text-primary-400"
          >
            {post.formattedDate}
          </time>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            type="button"
            href={post.linkToShareTwitter}
            aria-label="Share on X"
            className="inline-flex items-center justify-center rounded-lg border-0 border-gray-200 px-3 py-2.5 text-center font-medium text-sm text-zinc-500 hover:opacity-80 focus:outline-none focus:ring-4 md:border md:px-5 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className='size-6 fill-current md:size-3'
              viewBox="0 0 16 16"
            >
              <path
                d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                strokeWidth="1"
              ></path>
            </svg>
            <span className="ml-2 hidden md:inline-flex">Share on X</span>
          </a>
          <a
            type="button"
            href={post.linkToShareLinkedin}
            aria-label="Share on Linkedin"
            className="inline-flex items-center justify-center rounded-lg border-0 border-gray-200 px-3 py-2.5 text-center font-medium text-sm text-zinc-500 hover:opacity-80 focus:outline-none focus:ring-4 md:border md:px-5 dark:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6 fill-zinc-500 md:size-4 dark:fill-white"
            >
              <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
            </svg>

            <span className="ml-2 hidden md:inline-flex">
              Share on Linkedin
            </span>
          </a>
          <a
            type="button"
            href={post.linkToShareBluesky}
            aria-label="Share on Bluesky"
            className="inline-flex items-center justify-center rounded-lg border-0 border-gray-200 px-3 py-2.5 text-center font-medium text-sm text-zinc-500 hover:opacity-80 focus:outline-none focus:ring-4 md:border md:px-5 dark:text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 fill-zinc-500 md:size-4 dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.33525 3.34624C8.6282 5.3013 11.0944 9.26553 12 11.3927C12.9056 9.26553 15.3718 5.3013 17.6648 3.34624C19.3192 1.93553 22 0.844029 22 4.31729C22 5.01097 21.6498 10.1444 21.4444 10.9779C20.7305 13.8754 18.1291 14.6144 15.815 14.1671C19.8599 14.949 20.8889 17.5388 18.6667 20.1285C14.4462 25.0471 12.6007 18.8945 12.1279 17.318C12.0412 17.029 12.0006 16.8937 12 17.0087C11.9994 16.8937 11.9588 17.029 11.8721 17.318C11.3993 18.8945 9.55377 25.0471 5.33334 20.1285C3.11113 17.5388 4.14007 14.949 8.18497 14.1671C5.87088 14.6144 3.26947 13.8754 2.55556 10.9779C2.35018 10.1444 2 5.01097 2 4.31729C2 0.844029 4.68077 1.93553 6.33525 3.34624Z" />
            </svg>

            <span className="ml-2 hidden md:inline-flex">Share on Bluesky</span>
          </a>
        </div>
      </header>
      <MarkdownContent content={post.content || ''} className="mb-24" />
      <NewsletterSignup />
    </article>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <title>Article Not Found - Tech as Human</title>
        <meta
          name="description"
          content="The article you are looking for does not exist. Explore more articles on Tech as Human."
        />
        <NotFound />
      </>
    )
  }

  throw error
}
