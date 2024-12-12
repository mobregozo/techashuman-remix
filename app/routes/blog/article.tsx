import { Link } from "react-router";
import {
  getArticleContent,
  getLatestArticles,
} from "../../utils/read-posts.server";
import { PostPreview } from "../../components/post-preview";
import { generateTags } from "../../utils/generate-tags";
import NotFound from "../../utils/not-found";
import { Footer } from "../../components/footer";
import { Block } from "../../components/post-block";
import { ChevronRight } from "lucide-react";
import { CommentSection } from "../../components/comments-section";
import { Route } from "./+types/article";

export async function loader({ params, request }: Route.LoaderArgs) {
  let post = null;
  if (params.articleId) {
    post = await getArticleContent(params.articleId);
  }
  const latestPosts = await getLatestArticles(params.articleId!);

  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { latestPosts, post, siteUrl };
}

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;

  const tags = generateTags({
    title: data?.post?.content.title,
    description: data?.post?.content.subtitle,
    image: data?.post?.content.photoURL ?? undefined,
    siteUrl,
  });

  return tags;
};

export default function Index({ loaderData }: Route.ComponentProps) {
  const { post, latestPosts } = loaderData;

  const postPreviews = latestPosts.map((post) => (
    <div key={post.slug} className="mb-12">
      <PostPreview post={post} />
    </div>
  ));

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <article>
        <h1
          className="text-secondary-700 dark:text-secondary-500 mb-8 text-4xl font-semibold tracking-tighter md:text-6xl"
          style={{ viewTransitionName: `${post.content.slug}-title` }}
        >
          {post.content.title}
        </h1>
        <div className="flex font-bold text-gray-700 dark:text-gray-300">
          <span>{post.content.readingTime} min read</span>
          <span className="px-2">&bull;</span>
          <time
            dateTime={post.content.formattedDate}
            className="text-primary-700 dark:text-primary-500 uppercase"
          >
            {post.content.formattedDate}
          </time>
        </div>
        <div className="md:space-x-3">
          <a
            type="button"
            href={post.content.linkToShareTwitter}
            className="mt-4 mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:ring-4 focus:outline-none md:w-auto"
          >
            <svg
              className="me-2 h-4 w-4"
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
          <a
            type="button"
            href={post.content.linkToShareLinkedin}
            className="mt-2 mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:ring-4 focus:outline-none md:mt-4 md:w-auto"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="me-2 h-4 w-4 fill-white"
            >
              <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
            </svg>
            Share on Linkedin
          </a>
          <a
            type="button"
            href={post.content.linkToShareBluesky}
            className="mt-2 mb-2 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80 focus:ring-4 focus:outline-none md:mt-4 md:w-auto"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="me-2 h-4 w-4 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.33525 3.34624C8.6282 5.3013 11.0944 9.26553 12 11.3927C12.9056 9.26553 15.3718 5.3013 17.6648 3.34624C19.3192 1.93553 22 0.844029 22 4.31729C22 5.01097 21.6498 10.1444 21.4444 10.9779C20.7305 13.8754 18.1291 14.6144 15.815 14.1671C19.8599 14.949 20.8889 17.5388 18.6667 20.1285C14.4462 25.0471 12.6007 18.8945 12.1279 17.318C12.0412 17.029 12.0006 16.8937 12 17.0087C11.9994 16.8937 11.9588 17.029 11.8721 17.318C11.3993 18.8945 9.55377 25.0471 5.33334 20.1285C3.11113 17.5388 4.14007 14.949 8.18497 14.1671C5.87088 14.6144 3.26947 13.8754 2.55556 10.9779C2.35018 10.1444 2 5.01097 2 4.31729C2 0.844029 4.68077 1.93553 6.33525 3.34624Z" />
            </svg>
            Share on Bluesky
          </a>
        </div>
        {post.content.photoURL && post.content.authorProfileURL ? (
          <div className="my-4">
            <img
              className="rounded-m h-56 w-full object-cover object-center sm:h-96"
              src={post.content.photoURLSmall!}
              width={400}
              height={300}
              style={{ viewTransitionName: post.content.slug }}
            />
            <blockquote className="border-primary-700 mt-2 border-l-4 text-xs">
              <p className="mt-0 px-2 py-1 text-gray-700 dark:text-gray-500">
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
        <div className="prose dark:prose-invert mx-auto mb-8 max-w-3xl lg:max-w-4xl">
          {post.blocks.map((block) => (
            <Block block={block} key={block.id} />
          ))}
        </div>
        <div className="prose dark:prose-invert lead my-12 text-gray-600 dark:text-gray-300">
          <span className="text-xl font-bold">Thanks for reading!</span>
        </div>
        <div>
          <div className="my-10">
            <Footer />
          </div>
          {post.content.blueskyId && (
            <CommentSection postId={post.content.blueskyId} />
          )}
          <hr className="my-12 border-t-1 border-gray-300 dark:border-gray-700" />
          <h2 className="text-primary-600 mt-8 text-2xl font-semibold tracking-tighter md:text-5xl dark:text-white">
            Other articles
          </h2>
          <div className="divide-y divide-gray-300 md:mt-12 md:divide-y-0 dark:divide-gray-800">
            {postPreviews}
          </div>
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              View all articles
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
