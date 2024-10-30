export const SocialMedia = () => (
  <ul>
    <li className="flex mb-3">
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
  </ul>
);
