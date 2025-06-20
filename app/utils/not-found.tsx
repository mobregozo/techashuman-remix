export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <p className="text-primary-600 text-3xl font-semibold">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        Article not found!
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the articke you're looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/blog"
          className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-offset-2"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}
