/**
 * Social share URL generators
 */
import { BLUESKY_ID, MAIN_URL, POST_PATH, TWITTER_USER } from "./constants";

export interface ShareUrls {
  twitter: string;
  linkedin: string;
  bluesky: string;
}

/**
 * Generates social media share URLs for a blog post
 */
export function generateShareUrls(
  title: string,
  slug: string
): ShareUrls {
  const postUrl = `${MAIN_URL}/${POST_PATH}/${slug}`;

  return {
    twitter: `http://twitter.com/share/?text="${title}" by ${TWITTER_USER} - &url=${postUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}&text="${title}"`,
    bluesky: `https://bsky.app/intent/compose?text=${title} by @${BLUESKY_ID} - ${postUrl}`,
  };
}
