import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Loader } from "~/components/loader";
import type {
  PostContent,
  PostProperties,
} from "~/utilities/read-posts.server";
import {
  getArticleContent,
  getLatestArticles,
} from "~/utilities/read-posts.server";
import { PostPreview } from "~/components/post-preview";
import { generateTags } from "~/utilities/generate-tags";
import NotFound from "~/utilities/not-found";
import { Footer } from "~/components/footer";
import { Block } from "~/components/post-block";

export async function loader({ params }: LoaderFunctionArgs) {
  let post = null;
  if (params.articleId) {
    post = await getArticleContent(params.articleId);
  }
  const latestPosts = await getLatestArticles(params.articleId!);

  return { latestPosts, post };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const tags = generateTags(
    data?.post?.content.title,
    data?.post?.content.subtitle,
    data?.post?.content.photoURL ?? undefined
  );

  return tags;
};

export default function Index() {
  const { post, latestPosts } = useLoaderData<{
    post: PostContent;
    latestPosts: PostProperties[];
  }>();

  const postPreviews = latestPosts.map((post) => (
    <div key={post.slug} className="my-8">
      <PostPreview {...post} />
    </div>
  ));

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <Loader />
      <article>
        <h1 className="text-4xl md:text-6xl mb-8 font-bold tracking-tighter text-secondary-700 dark:text-secondary-500">
          {post.content.title}
        </h1>
        <div className="flex font-bold text-gray-700 dark:text-gray-500">
          <span>{post.content.readingTime} min read</span>
          <span className="px-2">&bull;</span>
          <time
            dateTime={post.content.formattedDate}
            className="text-primary-700 uppercase dark:text-primary-500"
          >
            {post.content.formattedDate}
          </time>
        </div>
        <a
          type="button"
          href={post.content.linkToshare}
          className="text-white mt-4 bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 17"
          >
            <path
              fillRule="evenodd"
              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
              clipRule="evenodd"
            />
          </svg>
          Share on Twitter
        </a>
        {post.content.photoURL && post.content.authorProfileURL ? (
          <div className="my-4">
            <img
              className="rounded-m object-center object-cover w-full h-56 sm:h-96"
              src={post.content.photoURL}
              alt="fix me"
              width={400}
              height={300}
            />
            <blockquote className="mt-2 text-xs border-l-4 border-primary-700">
              <p className="text-gray-700 dark:text-gray-500 mt-0 py-1 px-2">
                Photo by{" "}
                <a
                  className="text-primary-600 hover:underline"
                  href={post.content.authorProfileURL}
                >
                  {post.content.photoAuthor}
                </a>{" "}
                on{" "}
                <a
                  className="text-primary-600 hover:underline"
                  href="https://unsplash.com/?utm_source=blog&utm_medium=referral"
                >
                  Unsplash
                </a>
              </p>
            </blockquote>
          </div>
        ) : null}
        <div className="prose dark:prose-invert container max-w-3xl mx-auto mb-8">
          {post.blocks.map((block) => (
            <Block block={block} key={block.id} />
          ))}
        </div>
        <div className="font-semibold text-gray-600 dark:text-gray-400 my-12">
          Thanks for reading ❤️
        </div>
        <div>
          <hr className="border-gray-300 dark:border-gray-700 border-t-1" />
          <Footer />
          <h2 className="text-primary-700 text-2xl md:text-4xl mt-8 md:mt-10 mb-4 font-semibold dark:text-white tracking-tighter">
            Other articles
          </h2>
          <div className="mt-12">{postPreviews}</div>
          <div className="mt-8">
            <a
              href="/blog"
              className="text-primary-700 dark:text-primary-600 hover:opacity-70 font-bold hover:underline"
            >
              VIEW ALL ARTICLES
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
