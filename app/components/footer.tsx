export const Footer = () => {
  return (
    <div className="text-gray-600 dark:text-gray-400 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Written by Manu</h2>
          <p className="text-sm mt-2">
            I'm a full-stack developer with a passion for sharing my experience
            in the IT world, from a human-centered perspective.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Follow Me</h2>
          <div className="mt-2">
            <button className="h-6 w-6">
              <a
                href="https://www.linkedin.com/in/manuelobregozo/?locale=en_US"
                target="blank"
              >
                <IconLinkedIn className="h-6 w-6 hover:opacity-80 text-gray-800 dark:text-gray-500" />
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm">
        <h2 className="text-lg font-semibold">Stay up to date</h2>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <a href="https://techashuman.substack.com/" target="blank">
            Subscribe to newsletter
          </a>
        </button>
      </div>
    </div>
  );
};

function IconLinkedIn({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      viewBox="0 0 512 512"
      //   stroke="currentColor"
    >
      <title>Logo Linkedin</title>
      <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
    </svg>
  );
}
