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
    { "twitter:card": "summary_large_image" },
    { "twitter:site": TWITTER_USER },
    { "twitter:creator": TWITTER_USER },
    { "twitter:creator:id": TWITTER_ID },
  ];
};
