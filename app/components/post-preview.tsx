export const PostPreview = (props) => {
  return (
    <section>
      <div className="my-4 p-4 rounded-md group border border-secondary-700 dark:border-gray-600 hover:opacity-75">
        <a href={`/blog/${props.slug}`}>
          <h2 className="text-secondary-700 font-semibold text-xl md:text-2xl dark:text-secondary-500 tracking-tighter leading-tighter">
            <span className="font-bold">#{props.number}</span> {props.title}
          </h2>
          <p className="mt-0">
            <span className="text-primary-700 uppercase font-bold dark:text-white">
              {props.date}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-400 font-semibold">
            {props.subtitle}
          </p>
          <div className="flex items-center mt-2 ">
            <div className="text-sm font-semibold text-primary-700 group-hover:underline">
              Read full article
            </div>
            <svg
              className="h-4 w-4 stroke-primary-700"
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
