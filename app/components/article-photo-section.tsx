import { PhotoUrls } from "@/utils/photo-utils";
import type { UnsplashPhotoResponse } from "@/utils/read-posts.server";

type ArticlePhotoSectionProps = {
  photo: PhotoUrls;
  slug: string;
  title: string;
};

export function ArticlePhotoSection({
  photo,
  slug,
  title,
}: ArticlePhotoSectionProps) {
  return (
    <div className="my-4 hidden md:block">
      <picture>
        {photo.photoWebp && (
          <source srcSet={photo.photoWebp} type="image/webp" />
        )}
        <img
          className="aspect-auto h-56 w-full rounded-m object-cover object-center sm:h-96"
          src={photo.photoURL}
          width={400}
          height={300}
          style={{ viewTransitionName: slug }}
          loading="lazy"
          alt={title}
        />
      </picture>
      <blockquote className="mt-2 border-primary-700 border-l-4 text-xs">
        <p className="mt-0 px-2 py-1 text-gray-700 dark:text-gray-300">
          Photo by{" "}
          <a
            className="text-primary-800 hover:underline dark:text-primary-200"
            href={photo.authorProfileURL || "#"}
          >
            {photo.photoAuthor}
          </a>{" "}
          on{" "}
          <a
            className="text-primary-800 hover:underline dark:text-primary-200"
            href="https://unsplash.com/?utm_source=blog&utm_medium=referral"
          >
            Unsplash
          </a>
        </p>
      </blockquote>
    </div>
  );
}
