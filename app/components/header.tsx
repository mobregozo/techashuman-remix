import { useLocation } from "@remix-run/react";
import { Theme, useTheme } from "remix-themes";
import { Loader } from "./loader";

const Header = () => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useTheme();

  const resolvedTheme = theme ? theme : "dark";

  return (
    <div className=" bg-primary-700 dark:bg-primary-900 sticky top-0 z-50">
      <div className="container py-3 max-w-3xl lg:max-w-5xl mx-auto px-5">
        <div className="text-sm font-bold spaci mx-auto tracking-tight justify-between flex">
          <div
            id="nav-bar"
            className="flex items-center justify-end space-x-4 mr-2 text-white"
          >
            <a
              href="/"
              className={
                pathname === "/" ? "" : "hover:opacity-50 text-gray-500"
              }
            >
              HOME
            </a>
            <a
              href="/blog"
              className={
                pathname.includes("/blog")
                  ? ""
                  : "hover:opacity-50 text-gray-500"
              }
            >
              ARTICLES
            </a>
            <a
              href="/about"
              className={
                pathname === "/about" ? "" : "hover:opacity-50 text-gray-500"
              }
            >
              ABOUT
            </a>
          </div>
          <div className="text-white flex items-center space-x-4">
            <button className="hover:opacity-60">
              <a href="/rss.xml">
                <img className="h-5 w-5" alt="rss" src="/assets/logo-rss.svg" />
              </a>
            </button>
            <button
              className="hover:opacity-60"
              hidden={resolvedTheme === "light"}
              onClick={() => setTheme(Theme.LIGHT)}
              aria-label="Switch to light mode"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>
            <button
              className="hover:opacity-60 "
              onClick={() => setTheme(Theme.DARK)}
              aria-label="Switch to dark mode"
              hidden={resolvedTheme === "dark"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default Header;
