/**
 * Notion database queries
 * Centralizes query building and execution to reduce duplication
 */
import type { Client } from "@notionhq/client";

export async function queryArticleBySlug(
  client: Client,
  databaseId: string,
  slug: string
) {
  return client.databases.query({
    database_id: databaseId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });
}

export async function queryPublishedArticles(
  client: Client,
  databaseId: string,
  options?: {
    excludeSlug?: string;
    pageSize?: number;
  }
) {
  return client.databases.query({
    database_id: databaseId,
    page_size: options?.pageSize ?? 5,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        ...(options?.excludeSlug
          ? [
              {
                property: "slug",
                rich_text: {
                  does_not_equal: options.excludeSlug,
                },
              },
            ]
          : []),
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
        direction: "descending" as const,
      },
    ],
  });
}

export async function queryArticlesBySlugs(
  client: Client,
  databaseId: string,
  slugs: string[]
) {
  const orSlugs = slugs.map((slug) => ({
    property: "slug",
    rich_text: {
      contains: slug,
    },
  }));

  return client.databases.query({
    database_id: databaseId,
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
        direction: "descending" as const,
      },
    ],
  });
}

export async function queryArticlesWithSearch(
  client: Client,
  databaseId: string,
  query?: string | null
) {
  return client.databases.query({
    database_id: databaseId,
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
        ...(query
          ? [
              {
                or: [
                  {
                    property: "title",
                    rich_text: {
                      contains: query,
                    },
                  },
                  {
                    property: "subtitle",
                    rich_text: {
                      contains: query,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending" as const,
      },
    ],
  });
}
