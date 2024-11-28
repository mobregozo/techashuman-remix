import { NavLink } from "@remix-run/react";
import { Loader } from "./loader";
import { ThemeSwitch } from "./theme-switch";

const Header = () => {
  return (
    <div className=" bg-primary-700 dark:bg-primary-900 sticky top-0 z-50">
      <div className="container py-3 max-w-3xl lg:max-w-5xl mx-auto px-5">
        <div className="text-sm font-bold spaci mx-auto tracking-tight justify-between flex">
          <div
            id="nav-bar"
            className="flex items-center justify-end space-x-4 mr-2 text-white"
          >
            <NavLink
              prefetch="intent"
              to="/"
              className={({ isActive }) =>
                isActive ? "" : "hover:opacity-50 text-gray-500"
              }
            >
              HOME
            </NavLink>
            <NavLink
              prefetch="intent"
              to="/blog"
              className={({ isActive }) =>
                isActive ? "" : "hover:opacity-50 text-gray-500"
              }
            >
              ARTICLES
            </NavLink>
            <NavLink
              prefetch="intent"
              to="/about"
              className={({ isActive }) =>
                isActive ? "" : "hover:opacity-50 text-gray-500"
              }
            >
              ABOUT
            </NavLink>
          </div>
          <div className="text-white flex items-center space-x-4">
            <button className="hover:opacity-60">
              <a href="/rss.xml">
                <img className="h-5 w-5" alt="rss" src="/assets/logo-rss.svg" />
              </a>
            </button>
            <ThemeSwitch />
          </div>
        </div>
      </div>
      <Loader />
    </div>
  );
};

export default Header;
