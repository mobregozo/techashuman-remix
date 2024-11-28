import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { PostPreview } from "../../components/post-preview";
import { generateTags } from "../../utils/generate-tags";
import type { PostProperties } from "../../utils/read-posts.server";
import { getAllArticles } from "../../utils/read-posts.server";

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
    <div key={post.slug} className="mb-20">
      <PostPreview post={post} />
    </div>
  ));

  return (
    <>
      <h2 className="text-primary-700 text-4xl md:text-6xl mb-8 font-semibold dark:text-white tracking-tighter">
        Articles
      </h2>
      <div className="mt-16">
        {postPreviews}
      </div>
    </>
  );
}
