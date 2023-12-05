export default function NotFound() {
  return (
    <div className="text-gray-600 dark:text-gray-400">
      <h1 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
        Article not found!
      </h1>
      <p className=" text-xl font-medium">
        The article you are trying to access doesn&apos;t exist, please check
        the URL and try again.
      </p>

      <div className="mt-6 dark:text-gray-400 ">
        Get back to the main
        <a
          href="/blog"
          className="text-primary-700 px-1 dark:text-primary-500 font-semibold hover:underline"
        >
          Articles
        </a>
        pages
      </div>
    </div>
  );
}
