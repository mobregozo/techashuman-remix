import { useEffect, useState } from "react";

const reactions = [
  {
    type: "inspiring",
    label: "Inspiring",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 text-primary-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>
    ),
  },
  {
    type: "spot-on",
    label: "Spot On",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    ),
  },
  {
    type: "could-be-better",
    label: "Could Be Better",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.867 19.125h.008v.008h-.008v-.008Z"
        />
      </svg>
    ),
  },
];

export const Reactions = ({ postSlug }: { postSlug: string }) => {
  const [reaction, setReaction] = useState<string | null>(null);

  useEffect(() => {
    const storedReaction = localStorage.getItem(`reaction-${postSlug}`);
    if (storedReaction) {
      setReaction(storedReaction);
    }
  }, [postSlug]);

  const handleReaction = (type: string) => {
    localStorage.setItem(`reaction-${postSlug}`, type);
    setReaction(type);
  };

  return (
    <div>
      <h3 className="text-xl font-bold">What did you think of this article?</h3>
      <div className="flex space-x-4 mt-4">
        {reactions.map((reactionItem) => (
          <button
            key={reactionItem.type}
            onClick={() => handleReaction(reactionItem.type)}
            className={`inline-flex items-center justify-center rounded-md py-2 px-3 text-sm mt-3 mb-2 outline-offset-2 transition active:transition-none font-semibold ${
              reaction === reactionItem.type
                ? "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-500 active:text-white/70"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-200 active:text-gray-800/70 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700 dark:active:text-gray-300/70"
            }`}
          >
            {reactionItem.icon}{" "}
            <span className="pl-2">{reactionItem.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
