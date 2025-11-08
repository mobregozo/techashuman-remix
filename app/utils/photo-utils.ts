/**
 * Photo URL extraction utilities.
 * This file contains no server-only dependencies and is safe to import from client components.
 */

import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Full as UnsplashPhoto } from "unsplash-js/dist/methods/photos/types";

export type PhotoUrls = {
  authorProfileURL: string;
  photoAuthor: string;
  photoURL: string;
  photoURLSmall: string;
  photoURLThumb: string;
  photoWebp: string;
} | null;

/**
 * Extracts and formats photo URLs from Unsplash API response
 * Returns null if photo data is not available
 */
export function extractPhotoUrls(
  photo: ApiResponse<UnsplashPhoto> | null
): PhotoUrls {
  if (!photo || photo.type !== "success" || !photo.response) {
    return null;
  }

  const { response } = photo;

  return {
    authorProfileURL: `https://unsplash.com/${response.user.username}?utm_source=blog&utm_medium=referral`,
    photoAuthor: response.user.username,
    photoURL: response.urls.raw + "&w=1200&h=630&fit=crop&fm=jpg",
    photoURLSmall: response.urls.small,
    photoURLThumb: response.urls.thumb,
    photoWebp: response.urls.raw + "&fm=webp&q=100&w=800",
  };
}
