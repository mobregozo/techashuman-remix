import { PostPreview } from "@/components/post-preview";
import { generateTags } from "@/utils/generate-tags";
import { getAllArticles } from "@/utils/read-posts.server";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/articles";

export async function loader({ request }: Route.LoaderArgs) {
  const posts = await getAllArticles();
  const requestUrl = new URL(request.url);
  const siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { posts, siteUrl };
}

export const meta = ({ data }: Route.MetaArgs) => {
  const { siteUrl } = data;
  const tags = generateTags({ title: "Articles", siteUrl });
  return tags;
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  const postPreviews = posts.map((post) => (
    <div key={post.slug} className="mb-20">
      <PostPreview post={post} />
    </div>
  ));

  return (
    <>
      <h2 className="text-primary-700 mb-24 text-4xl font-medium tracking-tight md:text-6xl dark:text-white">
        Articles
      </h2>
      <div className="mt-16">{postPreviews}</div>
    </>
  );
}
