import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { createApi } from "unsplash-js";
import { TWITTER_USER, MAIN_URL, POST_PATH } from "./constants";
import { readingTime } from "./reading-time";

export type BlogMetaData = {
  slug: string;
  title: string;
  date: string;
  photoId: string;
  photoAuthor: string;
  subtitle: string;
  number: string;
};

export type Article = {
  data: BlogMetaData;
  readingTime: string;
  formattedDate: string;
  photoURL: string;
  authorProfileURL: string;
  content: string;
  linkToshare: string;
};

export async function getLatestArticles(): Promise<BlogMetaData[]> {
  const folder = "./app/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`./app/posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug: fileName.replace(".md", ""),
      title: matterResult.data.title,
      date: matterResult.data.date,
      photoId: matterResult.data.photoId,
      photoAuthor: matterResult.data.photoAuthor,
      subtitle: matterResult.data.subtitle,
      number: matterResult.data.number,
    };
  });

  return [
    ...posts.sort((a, b) => (Number(a.number) < Number(b.number) ? 1 : -1)),
  ].slice(0, 4);
}

export async function getAllArticles(): Promise<BlogMetaData[]> {
  const folder = "./app/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`./app/posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug: fileName.replace(".md", ""),
      title: matterResult.data.title,
      date: matterResult.data.date,
      photoId: matterResult.data.photoId,
      photoAuthor: matterResult.data.photoAuthor,
      subtitle: matterResult.data.subtitle,
      number: matterResult.data.number,
    };
  });

  return posts.sort((a, b) => (a.number < b.number ? 1 : -1));
}

export const getArticleContent = async (slug: string) => {
  const folder = path.join(process.cwd(), "./app/posts/");
  const file = `${folder}${slug}.md`;
  let content = null;

  try {
    content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);

    let photo = null;

    if (matterResult.data.photoId) {
      const serverApi = createApi({
        accessKey: process.env.UNSPLASH_KEY as string,
      });

      photo = await serverApi.photos.get({
        photoId: matterResult.data.photoId,
      });
    }

    return {
      ...matterResult,
      readingTime: readingTime(matterResult.content),
      formattedDate: Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(matterResult.data.date)),
      authorProfileURL: photo
        ? `https://unsplash.com/${photo.response?.user.username}?utm_source=blog&utm_medium=referral`
        : null,
      photoURL: photo ? photo.response?.urls.regular : null,
      linkToshare: `http://twitter.com/share/?text="${matterResult.data.title}" by ${TWITTER_USER} - &url=${MAIN_URL}/${POST_PATH}/${matterResult.data.slug}`,
    };
  } catch (error) {
    console.log("error");
    return null;
  }
};
