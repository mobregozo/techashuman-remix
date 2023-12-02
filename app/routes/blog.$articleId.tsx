import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Loader } from "~/components/loader";
import Markdown from "markdown-to-jsx";
import type { Article, BlogMetaData } from "~/utilities/read-posts.server";
import {
  getArticleContent,
  getLatestArticles,
} from "~/utilities/read-posts.server";
import logoTwitter from "../../public/assets/logo-twitter.svg";
import { PostPreview } from "~/components/post-preview";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  let post = null;
  if (params.articleId) {
    post = await getArticleContent(params.articleId);
  }
  const latestPosts = await getLatestArticles();

  return { latestPosts, post };
}

export default function Index() {
  const { post, latestPosts } = useLoaderData<{
    post: Article;
    latestPosts: BlogMetaData[];
  }>();

  const postPreviews = latestPosts.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Loader />
      <article className="mb-8">
        <h1 className="text-4xl md:text-6xl mb-8 font-bold tracking-tighter text-secondary-700 dark:text-secondary-500">
          {post.data.title}
        </h1>
        <div className="flex font-bold">
          <span>{post.readingTime} min read</span>
          <span className="px-2">&bull;</span>
          <span className="text-primary-700 uppercase dark:text-primary-500">
            {post.formattedDate}
          </span>
          <span className="px-2">&bull;</span>
          <a
            rel="noreferrer"
            href={post.linkToshare}
            className="z-0 text-white flex items-center w-fit duration-200 transition-transform-opacity transform hover:-translate-y-0.5 ease-in-out hover:shadow-md hover:opacity-80"
            target="_blank"
          >
            <img
              width="24"
              height="24"
              src={logoTwitter}
              alt="share article on twitter"
            />
          </a>
        </div>
        {post.photoURL && post.authorProfileURL ? (
          <div className="my-4">
            <img
              className="rounded-m object-center object-cover w-full h-56 sm:h-96"
              src={post.photoURL}
              alt="fix me"
              width={400}
              height={300}
            />
            <blockquote className="mt-2 text-xs border-l-4 border-primary-700">
              <p className="text-gray700 dark:text-gray-500 mt-0 py-1 px-2">
                Photo by{" "}
                <a
                  className="text-primary-600 hover:underline"
                  href={post.authorProfileURL}
                >
                  {post.data.photoAuthor}
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
          <Markdown
            options={{
              overrides: {
                a: {
                  props: {
                    className:
                      "text-primary-700 font-semibold hover:underline dark:text-primary-500",
                  },
                },
                pre: {
                  props: {
                    className:
                      "bg-gray-100 dark:bg-gray-800 p-4 rounded-md whitespace-pre-line",
                  },
                },
                h3: {
                  props: {
                    className:
                      "text-2xl text-primary-700 dark:text-white tracking-tighter",
                  },
                },
                h2: {
                  props: {
                    className:
                      "text-3xl text-primary-700 dark:text-secondary-400 tracking-tighter",
                  },
                },
                h1: {
                  props: {
                    className:
                      "mt-12 text-5xl tracking-wide text-primary-700 dark:text-white font-semibold",
                  },
                },
                p: {
                  props: {
                    className: "my-2",
                  },
                },
                blockquote: {
                  props: {
                    className:
                      "border-l-4 border-primary-700 dark:border-primary-500 pl-4 text-gray-700 dark:text-gray-400",
                  },
                },
                strong: {
                  props: {
                    className: "text-gray-700 dark:text-gray-400 font-bold",
                  },
                },
                ul: {
                  props: {
                    className: "list-disc list-inside my-4",
                  },
                },
                li: {
                  props: {
                    className: "mb-2",
                  },
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
      <div className="font-semibold text-gray-600 dark:text-gray-400 my-12">
        Thanks for reading ❤️
      </div>
      <hr className="border-gray-300 dark:border-gray-700 border-t-1" />
      <h2 className="text-primary-700 text-2xl md:text-4xl mt-16 mb-4 font-semibold dark:text-white tracking-tighter">
        Other articles
      </h2>
      {postPreviews}
      <div className="mt-8">
        <a
          href="/blog"
          className="text-primary-700 dark:text-primary-600 hover:opacity-70 font-bold hover:underline"
        >
          VIEW ALL ARTICLES
        </a>
      </div>
    </>
  );
}
