import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostPreview } from "~/components/post-preview";
import { generateTags } from "~/utilities/generate-tags";
import type { PostProperties } from "~/utilities/read-posts.server";
import { getAllArticles } from "~/utilities/read-posts.server";

export async function loader() {
  const posts = await getAllArticles();
  return posts;
}

export const meta: MetaFunction = () => {
  const tags = generateTags("Articles");
  return tags;
};

export default function Index() {
  const files: PostProperties[] = useLoaderData();

  const postPreviews = files.map((post) => (
    <div key={post.slug}>
      <PostPreview {...post} />
    </div>
  ));

  return (
    <>
      <h2 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
        Articles
      </h2>
      {/* <span className="text-gray-700 dark:text-white">
        If you would like to stay up to date with my latest posts, please
      </span> */}
      <div className="mt-16">
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-6 w-6 flex-none"
          >
            <path
              d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
              className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            ></path>
            <path
              d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
              className="stroke-zinc-400 dark:stroke-zinc-500"
            ></path>
          </svg>
          <span className="ml-3">Stay up to date</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Get notified when I publish something new, and unsubscribe at any
          time.
        </p>
        <div className="mt-6">
          <button
            className="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 flex-none"
            type="button"
          >
            <a href="https://techashuman.substack.com/" target="blank">
              Subscribe
            </a>
          </button>
        </div>
      </div>

      <div className="mt-16 divide-y divide-gray-300 dark:divide-gray-800">
        {postPreviews}
      </div>
    </>
  );
}
