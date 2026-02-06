"use server";

import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { marked } from "marked";
import { NotionToMarkdown } from "notion-to-md";
import { setupNotionTransformers } from "./notion-transformers";

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

export type PostGeneratedProps = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  formattedDate: string;
  content: string;
  linkToShareTwitter: string;
  linkToShareLinkedin: string;
  linkToShareBluesky: string;
};

export type PostContent = {
  content: PostGeneratedProps;
};

marked.setOptions({
  breaks: true,
  gfm: true,
});

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });
setupNotionTransformers(n2m);

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

    const page = response.results.find(
      (result): result is PageObjectResponse => result.object === "page",
    );

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

    const mdblocks = await n2m.pageToMarkdown(metaData.id);

    const mdString = n2m.toMarkdownString(mdblocks);
    const htmlContent = marked(mdString.parent) as string;

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

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page",
    );

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

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page",
    );

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
  options?: { includePhotos?: boolean },
): Promise<ArticleMetadata[]> {
  try {
    const response = await queryArticlesWithSearch(
      notion,
      process.env.NOTION_DATABASE as string,
      q,
      undefined,
    );

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page",
    );

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

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page",
    );

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
