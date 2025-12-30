/**
 * Unsplash API client wrapper
 * Centralizes photo fetching logic and API initialization
 */
import { createApi } from "unsplash-js";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Full as UnsplashPhoto } from "unsplash-js/dist/methods/photos/types";

export type UnsplashPhotoResponse = ApiResponse<UnsplashPhoto> | null;

// Cache the API instance to avoid recreating it
let unsplashApi: ReturnType<typeof createApi> | null = null;
const photoCache = new Map<string, UnsplashPhotoResponse>();

function getUnsplashApi() {
  if (!unsplashApi) {
    unsplashApi = createApi({
      accessKey: process.env.UNSPLASH_KEY as string,
    });
  }
  return unsplashApi;
}

/**
 * Fetches photo metadata from Unsplash
 * Non-critical data that can be streamed to the client using Suspense boundaries
 */
export async function fetchPhotoMetadata(
  photoId: string | null
): Promise<UnsplashPhotoResponse> {
  if (!photoId) {
    return null;
  }

  if (photoCache.has(photoId)) {
    return photoCache.get(photoId) ?? null;
  }

  try {
    const api = getUnsplashApi();
    const response = await api.photos.get({ photoId });
    photoCache.set(photoId, response);
    return response;
  } catch {
    photoCache.set(photoId, null);
    return null;
  }
}

/**
 * Generates Unsplash image URL with specific parameters
 */
export function buildUnsplashImageUrl(
  baseUrl: string | undefined,
  format: "webp" | "jpg" = "jpg",
  width?: number,
  quality: number = 80
): string | null {
  if (!baseUrl) return null;

  const params = new URLSearchParams({
    fm: format,
    q: String(quality),
  });

  if (width) {
    params.append("w", String(width));
  }

  return `${baseUrl}&${params.toString()}`;
}
