export default function NotFound() {
  return (
    <div className="text-center p-8">
      <p className="font-semibold text-primary-600 text-3xl">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Article not found!
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find the articke you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/blog"
          className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Go back home
        </a>
      </div>
    </div>

    // <div className="text-gray-600 dark:text-gray-400">
    //   <h1 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
    //     Article not found!
    //   </h1>
    //   <p className=" text-xl font-medium">
    //     The article you are trying to access doesn&apos;t exist, please check
    //     the URL and try again.
    //   </p>

    //   <div className="mt-6 dark:text-gray-400 ">
    //     Get back to the main
    //     <a
    //       href="/blog"
    //       className="text-primary-700 px-1 dark:text-primary-500 font-semibold hover:underline"
    //     >
    //       Articles
    //     </a>
    //     pages
    //   </div>
    // </div>
  );
}
