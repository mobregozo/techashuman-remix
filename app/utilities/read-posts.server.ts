import { createApi } from "unsplash-js";
import { TWITTER_USER, MAIN_URL, POST_PATH } from "./constants";
import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export type PostProperties = {
  slug: string;
  title: string;
  date: string;
  photoId?: string;
  photoURL?: string;
  subtitle: string;
  number: string;
};

export type PostGeneratedProps = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  formattedDate: string;
  photoURL: string;
  authorProfileURL: string;
  content: string;
  linkToShareTwitter: string;
  linkToShareLinkedin: string;
  photoAuthor: string;
  blueskyId: string | undefined;
};

export type PostContent = {
  content: PostGeneratedProps;
  blocks: BlockObjectResponse[];
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
        photoURL: photo ? photo.response?.urls.small : null,
        title: blog.properties.title.title[0].plain_text,
        slug: blog.properties.slug.rich_text[0].plain_text,
        date: blog.properties.date.date.start,
        subtitle: blog.properties.subtitle.rich_text[0].plain_text,
        number: blog.properties.number.number,
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

  if (page) {
    const pageId = page.results[0].id;
    const pageData: any = await notion.pages.retrieve({
      page_id: pageId,
    });

    const content = await notion.blocks.children.list({
      block_id: pageId,
    });

    const photoId =
      pageData.properties.photoId?.rich_text[0]?.plain_text ?? null;

    try {
      let photo = null;

      if (photoId) {
        const serverApi = createApi({
          accessKey: process.env.UNSPLASH_KEY as string,
        });

        photo = await serverApi.photos.get({
          photoId,
        });
      }

      return {
        content: {
          readingTime: pageData.properties.readingTime.formula.number,
          formattedDate: Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeStyle: undefined,
          }).format(new Date(pageData.properties.date.date.start)),
          authorProfileURL: photo
            ? `https://unsplash.com/${photo.response?.user.username}?utm_source=blog&utm_medium=referral`
            : null,
          photoAuthor: photo ? photo.response?.user.username : null,
          title: pageData.properties.title.title[0].plain_text,
          slug: pageData.properties.slug.rich_text[0].plain_text,
          subtitle: pageData.properties.subtitle.rich_text[0].plain_text,
          number: pageData.properties.number.number,
          blueskyId:
            pageData.properties.blueskyId?.rich_text[0]?.plain_text ??
            undefined,
          photoURL: photo ? photo.response?.urls.regular : null,
          linkToShareLinkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${MAIN_URL}/${POST_PATH}/${pageData.properties.slug.rich_text[0].plain_text}&text="${pageData.properties.title.title[0].plain_text}"`,
          linkToShareTwitter: `http://twitter.com/share/?text="${pageData.properties.title.title[0].plain_text}" by ${TWITTER_USER} - &url=${MAIN_URL}/${POST_PATH}/${pageData.properties.slug.rich_text[0].plain_text}`,
        },
        blocks: content.results,
      };
    } catch (error) {
      return null;
    }
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

export async function getAllArticles() {
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
