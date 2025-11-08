"use server";

import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { marked } from "marked";
import { NotionToMarkdown } from "notion-to-md";
import { setupNotionTransformers } from "./notion-transformers";
import {
  fetchPhotoMetadata,
  type UnsplashPhotoResponse,
} from "./unsplash-client";
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
import { extractPhotoUrls } from "./photo-utils";

export type { UnsplashPhotoResponse };

export type ArticleMetadata = {
  photoWebp: string | null;
  photoWebpSmall: string | null;
  photoWebpThumb: string | null;
  title: string;
  slug: string;
  date: string;
  subtitle: string;
  number: number;
  readingTime: number;
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
async function getArticlesMetaData(articles: PageObjectResponse[]) {
  const results = await Promise.all(
    articles.map(async (blog: PageObjectResponse) => {
      const photoId = getStringProperty(blog.properties, "photoId");
      let photo = null;

      if (photoId) {
        photo = await fetchPhotoMetadata(photoId);
      }

      const photoUrls = extractPhotoUrls(photo);

      return {
        photoWebp: photoUrls?.photoWebp ?? null,
        photoWebpSmall: photoUrls?.photoWebp?.replace("w=800", "w=200") ?? null,
        photoWebpThumb: photoUrls?.photoWebp?.replace("w=800", "w=100") ?? null,
        title: getStringProperty(blog.properties, "title") ?? "",
        slug: getStringProperty(blog.properties, "slug") ?? "",
        date: getDateProperty(blog.properties, "date") ?? "",
        subtitle: getStringProperty(blog.properties, "subtitle") ?? "",
        number: getNumberProperty(blog.properties, "number") ?? 0,
        readingTime: getNumberProperty(blog.properties, "readingTime") ?? 0,
      };
    })
  );

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
      slug
    );

    const page = response.results.find(
      (result): result is PageObjectResponse => result.object === "page"
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
      photoId: getStringProperty(pageData, "photoId"),
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

    // Fetch markdown and photo metadata in PARALLEL at build time
    const [mdblocks, photoMetadata] = await Promise.all([
      n2m.pageToMarkdown(metaData.id),
      fetchPhotoMetadata(metaData.photoId),
    ]);

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
        photo: extractPhotoUrls(photoMetadata),
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
      { excludeSlug: slug, pageSize: 5 }
    );

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page"
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
      slugs
    );

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page"
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
  q?: string | null
): Promise<ArticleMetadata[]> {
  try {
    const response = await queryArticlesWithSearch(
      notion,
      process.env.NOTION_DATABASE as string,
      q
    );

    const pages = response.results.filter(
      (result): result is PageObjectResponse => result.object === "page"
    );

    return getArticlesMetaData(pages);
  } catch (error) {
    console.error("Error getting all articles:", error);
    return [];
  }
}
