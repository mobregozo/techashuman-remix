import type { PostProperties } from "~/utilities/read-posts.server";

export const PostPreview = (props: PostProperties) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: undefined,
  }).format(new Date(props.date));
  return (
    <section>
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
    </section>
  );
};
