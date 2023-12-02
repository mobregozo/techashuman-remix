import {
  HOME_OG_IMAGE_URL,
  SEO_DESCRIPTION,
  TWITTER_ID,
  TWITTER_USER,
} from "./constants";

export const generateTags = (
  title: string,
  description = SEO_DESCRIPTION,
  img = HOME_OG_IMAGE_URL
) => {
  return [
    {
      title: `${title} | TechAsHuman`,
    },
    {
      property: "og:title",
      content: `${title} | TechAsHuman`,
    },
    { name: "description", description },
    { "og:description": description },
    { "og:image": img },
    { "og:type": "article" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_USER },
    { name: "twitter:creator", content: TWITTER_USER },
    { name: "twitter:creator:id", content: TWITTER_ID },
    { name: "twitter:image", content: img },
  ];
};
