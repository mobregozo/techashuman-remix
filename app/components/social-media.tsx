export const SocialMedia = () => (
  <ul className="space-y-3">
    <li className="flex">
      <a
        className="group items-center flex text-sm font-medium text-zinc-800 transition hover:text-primary-600 dark:text-zinc-200 dark:hover:text-primary-600"
        href="https://www.linkedin.com/in/manuelobregozo/?locale=en_US"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary-600"
        >
          <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
        </svg>
        <span className="ml-4">Follow on Linkedin</span>
      </a>
    </li>
    <li className="flex">
      <a
        className="group items-center flex text-sm font-medium text-zinc-800 transition hover:text-primary-600 dark:text-zinc-200 dark:hover:text-primary-600"
        href="https://techashuman.substack.com/"
      >
        <svg
          role="img"
          viewBox="0 0 16 18"
          fill="white"
          strokeWidth="1.8"
          stroke="none"
          className="h-6 w-6 p-0.5 flex-none fill-zinc-500 transition group-hover:fill-primary-700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M16 4H0V6H16V4Z"></path>
            <path d="M0 8V18L7.9993 13.534L16 18V8H0Z"></path>
            <path d="M16 0H0V2H16V0Z"></path>
          </g>
        </svg>
        <span className="ml-4">Follow on Substack</span>
      </a>
    </li>
    <li className="flex">
      <a
        className="group items-center flex text-sm font-medium text-zinc-800 transition hover:text-primary-600 dark:text-zinc-200 dark:hover:text-primary-600"
        href="https://bsky.app/profile/techashuman.com"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 p-0.5 flex-none fill-zinc-500 transition group-hover:fill-primary-700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.33525 3.34624C8.6282 5.3013 11.0944 9.26553 12 11.3927C12.9056 9.26553 15.3718 5.3013 17.6648 3.34624C19.3192 1.93553 22 0.844029 22 4.31729C22 5.01097 21.6498 10.1444 21.4444 10.9779C20.7305 13.8754 18.1291 14.6144 15.815 14.1671C19.8599 14.949 20.8889 17.5388 18.6667 20.1285C14.4462 25.0471 12.6007 18.8945 12.1279 17.318C12.0412 17.029 12.0006 16.8937 12 17.0087C11.9994 16.8937 11.9588 17.029 11.8721 17.318C11.3993 18.8945 9.55377 25.0471 5.33334 20.1285C3.11113 17.5388 4.14007 14.949 8.18497 14.1671C5.87088 14.6144 3.26947 13.8754 2.55556 10.9779C2.35018 10.1444 2 5.01097 2 4.31729C2 0.844029 4.68077 1.93553 6.33525 3.34624Z" />
        </svg>

        <span className="ml-4">Follow on BlueSky</span>
      </a>
    </li>
  </ul>
);
