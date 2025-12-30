/**
 * Loading skeleton shown while photo metadata is being fetched in the Suspense boundary.
 * This provides visual feedback during the streaming/loading period.
 */
export function ArticlePhotoSkeleton() {
  return (
    <div className="my-4 hidden animate-pulse md:block">
      <div className="aspect-auto h-56 w-full rounded-m bg-gray-200 sm:h-96 dark:bg-gray-700" />
      <blockquote className="mt-2 border-primary-700 border-l-4 text-xs">
        <p className="mt-0 px-2 py-1">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
        </p>
      </blockquote>
    </div>
  );
}
