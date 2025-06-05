import { Link, href } from 'react-router'
import type { PostProperties } from '../utils/read-posts.server'

type PostPreviewProps = {
  post: PostProperties
}

export const PostPreview = ({ post }: PostPreviewProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: undefined,
  }).format(new Date(post.date))
  return (
    <Link
      to={href('/blog/:articleId', {
        articleId: post.slug,
      })}
      viewTransition
    >
      <article
        key={post.slug}
        className="group relative isolate flex flex-col gap-8 md:flex-row"
      >
        {post.photoWebpSmall && (
          <div className="relative hidden aspect-[16/9] h-48 md:block md:shrink-0">
            <img
              src={post.photoWebpSmall!}
              alt=""
              style={{ viewTransitionName: post.slug }}
              className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-300 group-hover:rotate-1"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
          </div>
        )}
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-x-4 text-sm">
            <time
              dateTime={formattedDate}
              className="text-gray-700 dark:text-gray-400"
            >
              {formattedDate}
            </time>
          </div>
          <div className="relative flex flex-1 flex-col justify-between">
            <h3 className="text-secondary-700 dark:text-secondary-500 mt-3 text-2xl leading-6 font-semibold group-hover:opacity-70">
              <span className="absolute inset-0" />
              <span className="tracking-tighter">#{post.number}&nbsp;</span>
              <span style={{ viewTransitionName: `${post.slug}-title` }}>
                {' '}
              </span>
              {post.title}
            </h3>
            <p className="mt-5 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {post.subtitle}
            </p>
            <div className="mt-2 flex items-center tracking-tighter">
              <div className="text-primary-700 dark:text-primary-500 text-sm font-semibold group-hover:underline">
                Read full article
              </div>
              <svg
                className="stroke-primary-700 dark:stroke-primary-500 h-6 w-6 translate-x-0 rotate-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.75 5.75 9.25 8l-2.5 2.25"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
