import type { PostProperties } from "~/utilities/read-posts.server";

export const PostPreview = (props: PostProperties) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(props.date));
  return (
    // <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
    // {posts.map((post) => (
    <article
      key={props.slug}
      className="relative isolate flex flex-col gap-8 md:flex-row py-8"
    >
      {props.photoURL && (
        <div className="hidden md:block relative aspect-[16/9] md:aspect-square w-52 md:shrink-0">
          <img
            src={props.photoURL}
            alt=""
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time
            dateTime={formattedDate}
            className="text-gray-700 dark:text-gray-500"
          >
            {formattedDate}
          </time>
        </div>
        <div className="group relative flex flex-col justify-between flex-1">
          <h3 className="mt-3 text-2xl font-semibold leading-6 text-secondary-700 dark:text-secondary-500 group-hover:opacity-70">
            <a href={`/blog/${props.slug}`}>
              <span className="absolute inset-0" />
              <span className="tracking-tighter">#{props.number}&nbsp;</span>
              {props.title}
            </a>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400 flex-1 text-justify">
            {props.subtitle}
          </p>
          <div className="flex items-center mt-2 tracking-tighter">
            <div className="text-sm text-primary-700 dark:text-primary-500 group-hover:underline">
              Read full article
            </div>
            <svg
              className="h-4 w-4 stroke-primary-700 dark:stroke-primary-500"
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
  );
  //   ))}
  // );
};

{
  /* <section>
      <div className="p-4 rounded-md group border border-secondary-700 dark:border-gray-600 hover:opacity-75">
        <a href={`/blog/${props.slug}`}>
          <time
            dateTime={formattedDate}
            className="text-gray-700 dark:text-gray-500 text-sm"
          >
            {formattedDate}
          </time>
          <h2 className="text-secondary-700 font-semibold text-xl md:text-3xl dark:text-secondary-500 tracking-tighter leading-tighter">
            <span className="font-bold mr-2">#{props.number}</span>
            {props.title}
          </h2>
          <p className="text-gray-900 dark:text-gray-200 py-2">
            {props.subtitle}
          </p>
          <div className="flex items-center mt-2 ">
            <div className="text-sm font-semibold text-primary-700 dark:text-primary-500 group-hover:underline">
              Read full article
            </div>
            <svg
              className="h-4 w-4 stroke-primary-700 dark:stroke-primary-500"
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
        </a>
      </div>
    </section> */
}
