export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <p className="font-semibold text-3xl text-primary-600">404</p>
      <h1 className="mt-4 font-bold text-3xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
        Article not found!
      </h1>
      <p className="mt-6 text-base text-gray-600 leading-7 dark:text-gray-400">
        Sorry, we couldn't find the articke you're looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/blog"
          className="rounded-md bg-primary-600 px-3.5 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600 focus-visible:outline-offset-2"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}
