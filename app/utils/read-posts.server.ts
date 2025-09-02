import { Client } from "@notionhq/client";
import type {
  CodeBlockObjectResponse,
  EmbedBlockObjectResponse,
  QueryDatabaseResponse,
  VideoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { marked } from "marked";
import { NotionToMarkdown } from "notion-to-md";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { createApi } from "unsplash-js";
import { BLUESKY_ID, MAIN_URL, POST_PATH, TWITTER_USER } from "./constants";

marked.setOptions({
  breaks: true,
  gfm: true,
});

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("embed", (block) => {
  const { embed } = block as EmbedBlockObjectResponse;
  const url = embed?.url;

  if (url && url.includes("platform.twitter.com")) {
    return `<iframe title="twitter-embed" width="300" height="700" class="mx-auto my-10 aspect-video" src="${url}"></iframe>`;
  }

  return `[${url}](${url})`;
});

n2m.setCustomTransformer("code", async (block) => {
  const { code } = block as CodeBlockObjectResponse;
  const codeContent = code.rich_text.map((text) => text.plain_text).join("\n");
  const language = code.language || "text";

  const markdownCode = `\`\`\`${language}\n${codeContent}\n\`\`\``;

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false,
      defaultLang: "text",
    })
    .use(rehypeStringify)
    .process(markdownCode);

  return String(file);
});

n2m.setCustomTransformer("video", async (block) => {
  const { video } = block as VideoBlockObjectResponse;
  if (video.type === "external") {
    const url = video?.external?.url;
    if (url && (url.includes("youtube.com") || url.includes("youtu.be"))) {
      let videoId: string | null = null;
      try {
        const ytMatch = url.match(
          /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
        );
        videoId = ytMatch ? ytMatch[1] : null;
      } catch {
        videoId = null;
      }

      if (videoId) {
        return `<div class="video-container my-6"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full mx-auto rounded-lg shadow-lg"></iframe></div>`;
      }
    }
  }
  const url = video.type !== "external" ? video.file?.url : video.external?.url;
  return url ? `<video controls src="${url}"></video>` : "Video not available";
});

export type PostProperties = {
  slug: string;
  title: string;
  date: string;
  photoId?: string;
  photoWebp?: string | null;
  photoWebpSmall?: string | null;
  photoWebpThumb?: string | null;
  subtitle: string;
  number: string;
  readingTime: string;
};

export type PostGeneratedProps = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  formattedDate: string;
  photoWebp?: string | null;
  photoWebpSmall?: string | null;
  photoWebpThumb?: string | null;
  authorProfileURL: string;
  content: string;
  linkToShareTwitter: string;
  linkToShareLinkedin: string;
  linkToShareBluesky: string;
  photoAuthor: string;
  blueskyId: string | undefined;
};

export type PostContent = {
  content: PostGeneratedProps;
};

type QueryResult = Pick<QueryDatabaseResponse, "results">;

async function getArticlesMetaData(articles: QueryResult[]) {
  return Promise.all(
    articles.map(async (blog: any) => {
      const photoId = blog.properties.photoId?.rich_text[0]?.plain_text ?? null;

      let photo = null;

      try {
        if (photoId) {
          const serverApi = createApi({
            accessKey: process.env.UNSPLASH_KEY as string,
          });

          photo = await serverApi.photos.get({
            photoId,
          });
        }
      } catch {
        photo = null;
      }

      return {
        photoWebp: photo
          ? photo.response?.urls.raw + "&fm=webp&q=80&w=400"
          : null,
        photoWebpSmall: photo
          ? photo.response?.urls.raw + "&fm=webp&q=80&w=200"
          : null,
        photoWebpThumb: photo
          ? photo.response?.urls.raw + "&fm=webp&q=80&w=100"
          : null,
        title: blog.properties.title.title[0].plain_text,
        slug: blog.properties.slug.rich_text[0].plain_text,
        date: blog.properties.date.date.start,
        subtitle: blog.properties.subtitle.rich_text[0].plain_text,
        number: blog.properties.number.number,
        readingTime: blog.properties.readingTime.formula.number,
      };
    })
  );
}

export async function getArticleContent(slug: string) {
  const page = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (!page.results.length) {
    return null;
  }

  const pageId = page.results[0].id;
  const pageData: any = await notion.pages.retrieve({
    page_id: pageId,
  });

  try {
    // Convert Notion page to markdown
    const mdblocks = await n2m.pageToMarkdown(pageId);

    const mdString = n2m.toMarkdownString(mdblocks);

    // Convert markdown to HTML on the server
    const htmlContent = marked(mdString.parent) as string;

    const photoId =
      pageData.properties.photoId?.rich_text[0]?.plain_text ?? null;

    let photo = null;

    if (photoId) {
      const serverApi = createApi({
        accessKey: process.env.UNSPLASH_KEY as string,
      });

      photo = await serverApi.photos.get({
        photoId,
      });
    }

    const title = pageData.properties.title.title[0].plain_text;
    const slug = pageData.properties.slug.rich_text[0].plain_text;

    return {
      readingTime: pageData.properties.readingTime.formula.number,
      formattedDate: Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: undefined,
      }).format(new Date(pageData.properties.date.date.start)),
      authorProfileURL: photo
        ? `https://unsplash.com/${photo.response?.user.username}?utm_source=blog&utm_medium=referral`
        : null,
      photoAuthor: photo ? photo.response?.user.username : null,
      title,
      slug,
      subtitle: pageData.properties.subtitle.rich_text[0].plain_text,
      number: pageData.properties.number.number,
      blueskyId:
        pageData.properties.blueskyId?.rich_text[0]?.plain_text ?? undefined,
      photoURL: photo
        ? photo.response?.urls.raw + "&w=1200&h=630&fit=crop&fm=jpg"
        : null,
      photoURLSmall: photo ? photo.response?.urls.small : null,
      photoURLThumb: photo ? photo.response?.urls.thumb : null,
      photoWebp: photo
        ? photo.response?.urls.raw + "&fm=webp&q=100&w=800"
        : null,
      content: htmlContent,
      linkToShareBluesky: `https://bsky.app/intent/compose?text=${title} by @${BLUESKY_ID} - ${MAIN_URL}/${POST_PATH}/${slug}`,
      linkToShareLinkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${MAIN_URL}/${POST_PATH}/${slug}&text="${title}"`,
      linkToShareTwitter: `http://twitter.com/share/?text="${title}" by ${TWITTER_USER} - &url=${MAIN_URL}/${POST_PATH}/${slug}`,
    };
  } catch (error) {
    console.error("Error getting article content:", error);
    return null;
  }
}

export async function getLatestArticles(slug?: string) {
  const response: any = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    page_size: 5,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "slug",
          rich_text: {
            does_not_equal: slug ?? "",
          },
        },
        {
          property: "number",
          number: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return getArticlesMetaData(response.results);
}

export async function getArticlesBySlugs(slugs: string[]) {
  const orSlugs = slugs.map((slug) => ({
    property: "slug",
    rich_text: {
      contains: slug,
    },
  }));
  const response: any = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          or: orSlugs,
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return getArticlesMetaData(response.results);
}

export async function getAllArticles(
  q?: string | null
): Promise<PostProperties[]> {
  const response: any = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE as string,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "number",
          number: {
            is_not_empty: true,
          },
        },
        {
          or: [
            {
              property: "title",
              rich_text: {
                contains: q ?? "",
              },
            },
            {
              property: "subtitle",
              rich_text: {
                contains: q ?? "",
              },
            },
          ],
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return getArticlesMetaData(response.results);
}
