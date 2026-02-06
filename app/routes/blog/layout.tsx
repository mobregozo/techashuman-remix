import { Footer } from "@/components/footer";
import { PostPreview } from "@/components/post-preview";
import { getLatestArticles } from "@/utils/read-posts.server";
import { ChevronRight } from "lucide-react";
import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ params }: Route.LoaderArgs) {
  const latestPosts = await getLatestArticles(params.articleId!);

  return { latestPosts };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { latestPosts } = loaderData;

  const postPreviews = latestPosts.map((post) => (
    <div key={post.slug} className="mb-12 pb-4">
      <PostPreview post={post} />
    </div>
  ));

  return (
    <>
      <article>
        <Outlet />
        <div>
          <div className="my-10">
            <Footer />
          </div>
          <h2 className="mt-16 mb-8 font-medium text-4xl text-primary-600 tracking-tight md:mt-24 md:mb-18 md:text-5xl dark:text-white">
            Other articles
          </h2>
          <div className="md:mt-12">{postPreviews}</div>
          <div className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-base text-zinc-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-700"
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
