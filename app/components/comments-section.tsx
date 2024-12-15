import { useState } from "react";
import { Link } from "react-router";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Thread } from "@/routes/blog/article";
import {
  isThreadViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

type CommentSectionProps = {
  thread: Thread;
  postURL: string;
};

export const CommentSection = ({ thread, postURL }: CommentSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(3);


  if (!thread.replies || thread.replies.length === 0) {
    return <p className="my-4"> No comments yet</p>;
  }

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const sortedReplies = thread.replies.sort(sortByLikes);

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold text-gray-700 md:text-4xl dark:text-gray-200">
        Comments
      </h2>
      <Link to={postURL} target="_blank">
        <p className="my-4 flex items-center gap-2 hover:underline">
          <span className="flex items-center">
            <Heart className="size-5" />

            <span className="ml-1">{thread.post.likeCount ?? 0} likes</span>
          </span>
          <span className="flex items-center">
            <Repeat2 className="size-5" />
            <span className="ml-1">{thread.post.repostCount ?? 0} reposts</span>
          </span>
          <span className="flex items-center">
            <MessageCircle className="size-5" />
            <span className="ml-1">{thread.post.replyCount ?? 0} replies</span>
          </span>
        </p>
      </Link>
      <p className="mt-2 text-sm">
        Reply on Bluesky{" "}
        <Link
          to={postURL}
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </Link>{" "}
        to join the conversation.
      </p>
      <hr className="mt-2 border-gray-600 dark:border-gray-500" />
      <div className="mt-2 space-y-8">
        {sortedReplies.slice(0, visibleCount).map((reply) => {
          if (!isThreadViewPost(reply)) return null;
          return <Comment key={reply.post.uri} comment={reply} />;
        })}
        {visibleCount < sortedReplies.length && (
          <button
            onClick={showMore}
            className="mt-2 text-sm text-blue-500 underline"
          >
            Show more comments
          </button>
        )}
      </div>
    </div>
  );
};

const Comment = ({ comment }: { comment: any }) => {
  const author = comment.post.author;
  const avatarClassName = "h-4 w-4 shrink-0 rounded-full bg-gray-300";

  if (!comment.post.record) return null;

  return (
    <div className="my-4 text-sm">
      <div className="flex max-w-xl flex-col gap-2">
        <Link
          className="flex flex-row items-center gap-2 hover:underline"
          to={`https://bsky.app/profile/${author.did}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {author.avatar ? (
            <img
              src={comment.post.author.avatar}
              alt="avatar"
              className={avatarClassName}
            />
          ) : (
            <div className={avatarClassName} />
          )}
          <p className="line-clamp-1">
            {author.displayName ?? author.handle}{" "}
            <span className="text-gray-500">@{author.handle}</span>
          </p>
        </Link>
        <Link
          to={`https://bsky.app/profile/${author.did}/post/${comment.post.uri
            .split("/")
            .pop()}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <p>{comment.post.record.text as string}</p>
          <Actions post={comment.post} />
        </Link>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-l-2 border-gray-600 pl-2 dark:border-gray-700">
          {comment.replies.sort(sortByLikes).map((reply) => {
            if (!isThreadViewPost(reply)) return null;
            return <Comment key={reply.post.uri} comment={reply} />;
          })}
        </div>
      )}
    </div>
  );
};

const Actions = ({ post }: { post: PostView }) => (
  <div className="mt-2 flex w-full max-w-[150px] flex-row items-center justify-between opacity-60">
    <div className="flex flex-row items-center gap-1.5">
      <MessageCircle className="size-4" />
      <p className="text-xs">{post.replyCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <Repeat2 className="size-4" />
      <p className="text-xs">{post.repostCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <Heart className="size-4" />
      <p className="text-xs">{post.likeCount ?? 0}</p>
    </div>
  </div>
);

const sortByLikes = (a: unknown, b: unknown) => {
  if (!isThreadViewPost(a) || !isThreadViewPost(b)) {
    return 0;
  }
  return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0);
};
