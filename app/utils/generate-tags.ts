import {
  HOME_OG_IMAGE_URL,
  SEO_DESCRIPTION,
  TWITTER_ID,
  TWITTER_USER,
} from "./constants";

import type { MetaDescriptor } from "react-router";

type CustomMetaArgs = {
  title: string;
  description?: string;
  siteUrl?: string;
  image?: string;
} & { additionalMeta?: MetaDescriptor[] };

export const generateTags = ({
  title,
  description = SEO_DESCRIPTION,
  siteUrl,
  image = HOME_OG_IMAGE_URL,
  additionalMeta,
}: CustomMetaArgs) => {
  return [
    { title: `${title} | TechAsHuman` },
    { name: "description", content: description },
    { property: "og:url", content: siteUrl },
    { property: "og:title", content: `${title} | TechAsHuman` },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: TWITTER_USER },
    { name: "twitter:site", content: TWITTER_USER },
    { name: "twitter:creator:id", content: TWITTER_ID },
    { name: "twitter:title", content: `${title} | TechAsHuman` },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    ...(additionalMeta ?? []),
  ].filter((v) => {
    if ("content" in v) {
      return !!v.content;
    }
    return true;
  });
};
