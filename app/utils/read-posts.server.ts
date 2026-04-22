"use server";

import { Marked, type Tokens } from "marked";
import { codeToHtml } from "shiki";
import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";

import { generateShareUrls } from "./social-share-urls";
import {
  getStringProperty,
  getNumberProperty,
  getDateProperty,
  formatDate,
} from "./notion-properties";
import {
  queryArticleBySlug,
  queryPublishedArticles,
  queryArticlesBySlugs,
  queryArticlesWithSearch,
} from "./notion-queries";

export type ArticleMetadata = {
  title: string;
  slug: string;
  date: string;
  subtitle: string;
  number: number;
  readingTime: number;
};

export type ArticlesPage = {
  articles: ArticleMetadata[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type Heading = { id: string; text: string };

export type PostGeneratedProps = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  formattedDate: string;
  content: string;
  headings: Heading[];
  linkToShareTwitter: string;
  linkToShareLinkedin: string;
  linkToShareBluesky: string;
};

export type PostContent = {
  content: PostGeneratedProps;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * Fetches metadata for multiple articles and enriches with photo URLs
 */
function getArticlesMetaData(articles: PageObjectResponse[]) {
  const results = articles.map((blog: PageObjectResponse) => {
    return {
      title: getStringProperty(blog.properties, "title") ?? "",
      slug: getStringProperty(blog.properties, "slug") ?? "",
      date: getDateProperty(blog.properties, "date") ?? "",
      subtitle: getStringProperty(blog.properties, "subtitle") ?? "",
      number: getNumberProperty(blog.properties, "number") ?? 0,
      readingTime: getNumberProperty(blog.properties, "readingTime") ?? 0,
    };
  });

  return results;
}

/**
 * Fetches article metadata by slug
 */
export async function getArticleMetaData(slug: string) {
  try {
    const response = await queryArticleBySlug(
      notion,
      process.env.NOTION_DATABASE as string,
      slug,
    );

    const page = response.results.find(isFullPage);

    if (!page) {
      return null;
    }

    const pageData = page.properties;
    const dateString = getDateProperty(pageData, "date");

    return {
      id: page.id,
      readingTime: getNumberProperty(pageData, "readingTime"),
      formattedDate: dateString ? formatDate(dateString) : null,
      title: getStringProperty(pageData, "title"),
      slug: getStringProperty(pageData, "slug"),
      subtitle: getStringProperty(pageData, "subtitle"),
      number: getNumberProperty(pageData, "number"),
      blueskyId: getStringProperty(pageData, "blueskyId"),
    };
  } catch (error) {
    console.error("Error getting article meta data", error);
    return null;
  }
}

/**
 * Fetches complete article content with deferred photo metadata
 */
export async function getArticleContent(slug: string) {
  const metaData = await getArticleMetaData(slug);

  if (!metaData) {
    return null;
  }

  try {
    const title = metaData.title ?? "";
    const pageSlug = metaData.slug ?? "";

    const mdResponse = await notion.pages.retrieveMarkdown({
      page_id: metaData.id,
    });

    const cleanMarkdown = mdResponse.markdown
      .replace(/<empty-block\/>/g, "")
      .split(/(```[\s\S]*?```)/g)
      .map((part, i) => (i % 2 === 0 ? part.replace(/(?<!\n)\n(?!\n)/g, "\n\n") : part))
      .join("");

    const codeCache = new Map<string, string>();
    const headings: Heading[] = [];

    const instance = new Marked({
      async: true,
      walkTokens: async (token) => {
        if (token.type === "code") {
          const codeToken = token as Tokens.Code;
          codeCache.set(
            codeToken.text,
            await codeToHtml(codeToken.text, {
              lang: codeToken.lang || "text",
              theme: "github-dark",
            }),
          );
        }
        if (token.type === "heading" && (token as Tokens.Heading).depth === 2) {
          const text = (token as Tokens.Heading).text.replace(/<[^>]*>/g, "");
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/^-+|-+$/g, "");
          headings.push({ id, text });
        }
      },
      renderer: {
        heading({ text, depth }: Tokens.Heading) {
          if (depth === 2) {
            const cleanText = text.replace(/<[^>]*>/g, "");
            const id = cleanText
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/^-+|-+$/g, "");
            return `<h2 id="${id}">${text}</h2>`;
          }
          return false;
        },
        code({ text }: Tokens.Code) {
          return codeCache.get(text) ?? `<pre><code>${text}</code></pre>`;
        },
      },
    });
    const htmlContent = await instance.parse(cleanMarkdown);

    const shareUrls = generateShareUrls(title, pageSlug);

    return {
      post: {
        readingTime: metaData.readingTime ?? 0,
        formattedDate: metaData.formattedDate ?? "",
        title,
        slug: pageSlug,
        subtitle: metaData.subtitle ?? "",
        number: metaData.number ?? 0,
        blueskyId: metaData.blueskyId,
        content: htmlContent,
        headings,
        linkToShareBluesky: shareUrls.bluesky,
        linkToShareLinkedin: shareUrls.linkedin,
        linkToShareTwitter: shareUrls.twitter,
      },
    };
  } catch (error) {
    console.error("Error getting article content:", error);
    return null;
  }
}

/**
 * Fetches the 5 most recent published articles (excluding one)
 */
export async function getLatestArticles(slug?: string) {
  try {
    const response = await queryPublishedArticles(
      notion,
      process.env.NOTION_DATABASE as string,
      { excludeSlug: slug, pageSize: 5 },
    );

    const pages = response.results.filter(isFullPage);

    return getArticlesMetaData(pages);
  } catch (error) {
    console.error("Error getting latest articles:", error);
    return [];
  }
}

/**
 * Fetches articles by multiple slugs
 */
export async function getArticlesBySlugs(slugs: string[]) {
  try {
    const response = await queryArticlesBySlugs(
      notion,
      process.env.NOTION_DATABASE as string,
      slugs,
    );

    const pages = response.results.filter(isFullPage);

    return getArticlesMetaData(pages);
  } catch (error) {
    console.error("Error getting articles by slugs:", error);
    return [];
  }
}

/**
 * Fetches all published articles with optional search query
 */
export async function getAllArticles(
  q?: string | null,
): Promise<ArticleMetadata[]> {
  try {
    const response = await queryArticlesWithSearch(
      notion,
      process.env.NOTION_DATABASE as string,
      q,
      undefined,
    );

    const pages = response.results.filter(isFullPage);

    return getArticlesMetaData(pages);
  } catch (error) {
    console.error("Error getting all articles:", error);
    return [];
  }
}

/**
 * Fetches a single page of articles using Notion cursor pagination
 */
export async function getArticlesPage(
  q?: string | null,
  options?: { startCursor?: string | null; pageSize?: number },
): Promise<ArticlesPage> {
  try {
    const response = await queryArticlesWithSearch(
      notion,
      process.env.NOTION_DATABASE as string,
      q,
      {
        startCursor: options?.startCursor ?? null,
        pageSize: options?.pageSize,
      },
    );

    const pages = response.results.filter(isFullPage);

    return {
      articles: getArticlesMetaData(pages),
      nextCursor: response.next_cursor ?? null,
      hasMore: response.has_more,
    };
  } catch (error) {
    console.error("Error getting paged articles:", error);
    return { articles: [], nextCursor: null, hasMore: false };
  }
}
